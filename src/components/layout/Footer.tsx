"use client";

import Link from "@/i18n/Link";
import { Call, Clock, Location, Sms } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { Logo } from "@/components/ui/Logo";
import { InViewPause } from "@/components/ui/InViewPause";
import { SpinRing } from "@/components/ui/SpinRing";
import { InstagramIcon, TelegramIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const c = useContent();
  const { site, legal, legalDocs, directions, requisites } = c;
  const t = c.t.layout.footer;
  const docLabels: Record<string, string> = t.docs;
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/5 pt-20">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,82,240,0.32),transparent_70%)]" />
      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="relative inline-block">
              {/* Logo yonida sekin aylanuvchi halqa aksenti (faqat transform, ekrandan tashqarida pauza) */}
              <InViewPause className="pointer-events-none absolute left-0 top-1/2 size-10 -translate-y-1/2">
                <SpinRing sizes={[72, 112, 160]} duration={16} className="opacity-70" />
              </InViewPause>
              <div className="relative">
                <Logo intro={false} />
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">{site.description}</p>
            <div className="mt-6 flex gap-2">
              {[
                { href: site.socials.telegram, icon: TelegramIcon, label: "Telegram" },
                { href: site.socials.instagram, icon: InstagramIcon, label: "Instagram" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="glass flex h-10 w-10 items-center justify-center rounded-xl text-white/70 transition hover:-translate-y-1 hover:text-brand-300">
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">{t.directions}</h4>
            <ul className="space-y-3 text-sm text-white/55">
              {directions.map((d) => (
                <li key={d.slug}>
                  <Link href={`/xizmatlar/${d.slug}`} className="transition hover:text-brand-300">{d.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">{t.company}</h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li><Link href="/#biz-haqimizda" className="transition hover:text-brand-300">{t.about}</Link></li>
              <li><Link href="/#jarayon" className="transition hover:text-brand-300">{t.process}</Link></li>
              <li><Link href="/#loyihalar" className="transition hover:text-brand-300">{t.projects}</Link></li>
              <li><Link href="/#savollar" className="transition hover:text-brand-300">{t.faq}</Link></li>
              <li><Link href="/aloqa" className="transition hover:text-brand-300">{t.contactLink}</Link></li>
              <li><Link href="/huquqiy" className="transition hover:text-brand-300">{t.legal}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">{t.contact}</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href={site.phoneHref} className="flex items-center gap-3 text-lg font-semibold text-white transition hover:text-brand-300"><Call className="h-4 w-4 text-brand-400" />{site.phone}</a></li>
              <li><a href={site.socials.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-brand-300"><TelegramIcon className="h-4 w-4 text-brand-400" />{site.telegramHandle}</a></li>
              <li><a href={site.socials.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-brand-300"><InstagramIcon className="h-4 w-4 text-brand-400" />{site.instagramHandle}</a></li>
              <li><a href={`mailto:${site.email}`} className="flex items-center gap-3 transition hover:text-brand-300"><Sms className="h-4 w-4 text-brand-400" />{site.email}</a></li>
              <li className="flex items-center gap-3"><Location className="h-4 w-4 shrink-0 text-brand-400" />{site.address}</li>
              <li className="flex items-center gap-3"><Clock className="h-4 w-4 shrink-0 text-brand-400" />{site.workHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 select-none overflow-hidden text-center font-display text-[18vw] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] md:text-[13rem]">
          {site.name}
        </div>

        <div className="grid gap-6 border-t border-white/5 py-8 text-xs text-white/40 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-1.5">
            <p className="text-white/60">
              {legal.companyName} · {t.stir} {legal.stir}
              {legal.isTest && <span className="ml-2 rounded border border-white/15 px-1.5 py-px text-[10px] uppercase tracking-wider">{t.test}</span>}
            </p>
            <p>{requisites[1].label}: {legal.legalAddress}</p>
            <p>© {new Date().getFullYear()} {site.name} {site.suffix}. {t.rights}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalDocs.map((d) => (
              <Link key={d.slug} href={`/huquqiy/${d.slug}`} className="transition hover:text-white">
                {docLabels[d.slug] ?? d.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
