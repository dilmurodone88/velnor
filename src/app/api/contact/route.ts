import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { directions, extraServices } from "@/lib/data";
import { isLocale, type Locale } from "@/i18n/config";
import { toCyrillic } from "@/i18n/translit";

const MSG = {
  uz: {
    tooMany: "Juda ko'p so'rov. Birozdan so'ng urinib ko'ring.",
    invalid: "Ma'lumotlar noto'g'ri",
    name: "Ismni to'liq kiriting",
    phone: "Telefon raqam noto'g'ri",
    email: "Email noto'g'ri",
    service: "Xizmatni tanlang",
    busy: "Server vaqtincha band. Iltimos, telefon orqali bog'laning.",
  },
  ru: {
    tooMany: "Слишком много запросов. Попробуйте чуть позже.",
    invalid: "Неверные данные",
    name: "Введите имя полностью",
    phone: "Неверный номер телефона",
    email: "Неверный email",
    service: "Выберите услугу",
    busy: "Сервер временно занят. Пожалуйста, позвоните нам.",
  },
};
type MsgKey = keyof (typeof MSG)["uz"];
const msg = (l: Locale, k: MsgKey) => (l === "ru" ? MSG.ru[k] : l === "oz" ? toCyrillic(MSG.uz[k]) : MSG.uz[k]);

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2, "name").max(120),
  phone: z.string().trim().min(7, "phone").max(40).regex(/^[+\d\s()-]+$/, "phone"),
  email: z.union([z.literal(""), z.string().trim().email("email").max(160)]).optional(),
  company: z.string().trim().max(160).optional(),
  service: z.string().refine((s) => [...directions, ...extraServices].some((d) => d.slug === s), "service"),
  budget: z.string().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
  source: z.string().max(80).optional(),
  locale: z.string().optional(),
  consent: z.unknown().optional(),
});

// Oddiy IP bo'yicha cheklov (bitta pod ichida)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML" }),
  }).catch(() => undefined);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const body = await req.json().catch(() => null);
  const loc: Locale = isLocale(body?.locale) ? body.locale : "uz";
  if (limited(ip)) return NextResponse.json({ message: msg(loc, "tooMany") }, { status: 429 });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const key = parsed.error.issues[0]?.message as MsgKey;
    return NextResponse.json({ message: msg(loc, key in MSG.uz ? key : "invalid") }, { status: 400 });
  }
  const { email, locale: _l, consent: _c, ...rest } = parsed.data;
  const serviceTitle = [...directions, ...extraServices].find((d) => d.slug === rest.service)?.title ?? rest.service;

  try {
    const lead = await prisma.lead.create({ data: { ...rest, email: email || null, source: [rest.source, loc].filter(Boolean).join(" · ").slice(0, 80) } });
    await notifyTelegram(
      `🆕 <b>Yangi ariza #${lead.id}</b>\n👤 ${rest.name}\n📞 ${rest.phone}\n🧩 ${serviceTitle}` +
        (rest.company ? `\n🏢 ${rest.company}` : "") +
        (rest.budget ? `\n💰 ${rest.budget}` : "") +
        (rest.message ? `\n💬 ${rest.message}` : ""),
    );
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[contact] DB error:", err);
    return NextResponse.json({ message: msg(loc, "busy") }, { status: 503 });
  }
}
