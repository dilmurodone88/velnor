"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Refresh, Send, ShieldTick, TickCircle } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { fmt } from "@/i18n/fmt";
import Link from "@/i18n/Link";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({ defaultService, defaultMessage, compact, readQuery }: { defaultService?: string; defaultMessage?: string; compact?: boolean; readQuery?: boolean }) {
  const { directions, extraServices, locale, t, site } = useContent();
  const isStatic = process.env.NEXT_PUBLIC_STATIC === "1";
  const tf = t.pages.form;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState(defaultService ?? directions[0].slug);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { auditPlans } = useContent();

  // ?xizmat=it-audit&muddat=3 — brauzerda o'qiladi (statik hostingda ham ishlaydi)
  useEffect(() => {
    if (!readQuery) return;
    const q = new URLSearchParams(window.location.search);
    const xizmat = q.get("xizmat");
    if (!xizmat || ![...directions, ...extraServices].some((d) => d.slug === xizmat)) return;
    setService(xizmat);
    if (xizmat === "it-audit" && messageRef.current && !messageRef.current.value) {
      const term = auditPlans.paid.terms.find((x) => x.key === q.get("muddat"));
      const ta = t.pages.aloqa;
      messageRef.current.value = term ? fmt(ta.paidAudit, { label: term.label, price: term.price }) : ta.freeAudit;
    }
  }, [readQuery, directions, extraServices, auditPlans, t]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    setError("");
    if (isStatic) {
      // Statik hosting (GitHub Pages): server yo'q — matnni nusxalab Telegram chatini ochamiz
      const svc = [...directions, ...extraServices].find((d) => d.slug === service)?.title ?? service;
      const lines = [tf.staticHeader, `${tf.name.replace(" *", "")}: ${data.name ?? ""}`, `Tel: ${data.phone ?? ""}`, `${tf.serviceLabel} ${svc}`];
      if (data.company) lines.push(`${tf.company}: ${data.company}`);
      if (data.email) lines.push(`Email: ${data.email}`);
      if (data.budget) lines.push(`${tf.budgetLabel}: ${data.budget}`);
      if (data.message) lines.push(String(data.message));
      try {
        await navigator.clipboard.writeText(lines.join("\n"));
      } catch {
        /* clipboard ruxsat berilmagan bo'lishi mumkin */
      }
      window.open(site.socials.telegram, "_blank", "noopener");
      setStatus("success");
      form.reset();
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent: data.consent === "on", service, locale, source: typeof window !== "undefined" ? window.location.pathname : "" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || tf.error);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : tf.error);
    }
  }

  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base md:text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(63,109,255,0.1)]";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} className="relative">
              <span className="absolute inset-0 rounded-full bg-brand-400/40 animate-pulse-ring" />
              <TickCircle className="relative h-20 w-20 text-brand-400" />
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-bold text-white">{isStatic ? tf.staticTitle : tf.successTitle}</h3>
            <p className="mt-2 max-w-sm text-white/60">{isStatic ? tf.staticText : tf.successText}</p>
            <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-brand-300 hover:underline">
              {tf.again}
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required minLength={2} maxLength={120} placeholder={tf.name} className={input} />
              <input name="phone" required type="tel" minLength={7} maxLength={40} placeholder={tf.phone} className={input} />
            </div>
            {!compact && (
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="company" maxLength={160} placeholder={tf.company} className={input} />
                <input name="email" type="email" maxLength={160} placeholder={tf.email} className={input} />
              </div>
            )}

            <div>
              <div className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">{tf.serviceLabel}</div>
              <div className="flex flex-wrap gap-2">
                {directions.map((d) => (
                  <button
                    type="button"
                    key={d.slug}
                    onClick={() => setService(d.slug)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition",
                      service === d.slug ? "border-transparent text-white" : "border-white/10 text-white/55 hover:border-white/25 hover:text-white",
                    )}
                    style={service === d.slug ? { background: `linear-gradient(135deg, ${d.from}, ${d.to})` } : undefined}
                  >
                    <d.icon className="h-3.5 w-3.5" />
                    {d.title}
                  </button>
                ))}
                {extraServices.map((x) => (
                  <button
                    type="button"
                    key={x.slug}
                    onClick={() => setService(x.slug)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition",
                      service === x.slug ? "border-transparent bg-brand-500 text-white" : "border-white/10 text-white/55 hover:border-white/25 hover:text-white",
                    )}
                  >
                    <ShieldTick className="h-3.5 w-3.5" />
                    {x.title}
                  </button>
                ))}
              </div>
            </div>

            {!compact && (
              <div>
                <div className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">{tf.budgetLabel}</div>
                <div className="flex flex-wrap gap-2">
                  {tf.budgets.map((b) => (
                    <label key={b} className="cursor-pointer">
                      <input type="radio" name="budget" value={b} className="peer sr-only" />
                      <span className="block rounded-full border border-white/10 px-3.5 py-2 text-xs text-white/55 transition peer-checked:border-brand-400 peer-checked:bg-brand-400/10 peer-checked:text-brand-200 hover:text-white">
                        {b}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <textarea ref={messageRef} name="message" defaultValue={defaultMessage} rows={compact ? 3 : 4} maxLength={2000} placeholder={tf.message} className={cn(input, "resize-none")} />

            <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/55">
              <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-brand-500" />
              <span>
                {tf.consentBefore}
                <Link href="/huquqiy/maxfiylik" target="_blank" className="font-medium text-brand-300 underline-offset-2 hover:underline">
                  {tf.consentLink}
                </Link>
                {tf.consentAfter}
              </span>
            </label>

            {status === "error" && <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300 ring-1 ring-red-400/20">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-400 via-brand-500 to-brand-500 bg-[length:200%_auto] py-4 font-semibold text-white transition-all duration-500 hover:bg-right disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {status === "loading" ? <Refresh className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              {status === "loading" ? tf.sending : tf.submit}
            </button>
            <p className="text-center text-xs text-white/35">{tf.privacyNote}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
