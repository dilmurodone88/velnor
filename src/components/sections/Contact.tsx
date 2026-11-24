"use client";

import { Call, Clock, Location, Sms } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";
import { InViewPause } from "@/components/ui/InViewPause";
import { SpinRing } from "@/components/ui/SpinRing";
import { InstagramIcon, TelegramIcon } from "@/components/ui/SocialIcons";

export function Contact({ defaultService, defaultMessage, readQuery }: { defaultService?: string; defaultMessage?: string; readQuery?: boolean }) {
  const { site, t } = useContent();
  const tc = t.pages.contact;
  const items = [
    { icon: Call, label: tc.phone, value: site.phone, href: site.phoneHref },
    { icon: TelegramIcon, label: tc.telegram, value: site.telegramHandle, href: site.socials.telegram },
    { icon: InstagramIcon, label: tc.instagram, value: site.instagramHandle, href: site.socials.instagram },
    { icon: Sms, label: tc.email, value: site.email, href: `mailto:${site.email}` },
    { icon: Location, label: tc.address, value: site.address },
    { icon: Clock, label: tc.hours, value: site.workHours },
  ];
  return (
    <section id="aloqa" className="relative py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#080a14]">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(63,109,255,0.32),transparent_70%)]" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(43,82,240,0.32),transparent_70%)]" />
          <div className="relative grid gap-12 p-7 md:p-14 lg:grid-cols-[1fr_1.25fr]">
            <div>
              <Reveal>
                <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">
                  {tc.titleA} <span className="text-gradient">{tc.titleHi}</span> {tc.titleB}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-white/60 md:text-lg">{tc.text}</p>
              </Reveal>
              <div className="mt-10 space-y-3">
                {items.map((it, i) => {
                  const Inner = (
                    <div className="group flex items-center gap-4 rounded-2xl p-3 transition hover:bg-white/[0.04]">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-brand-300 ring-1 ring-white/10 transition group-hover:bg-brand-400 group-hover:text-black">
                        <it.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-white/40">{it.label}</div>
                        <div className="font-semibold text-white">{it.value}</div>
                      </div>
                    </div>
                  );
                  return (
                    <Reveal key={it.label} delay={0.15 + i * 0.05}>
                      {it.href ? <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{Inner}</a> : Inner}
                    </Reveal>
                  );
                })}
              </div>
            </div>
            <Reveal delay={0.15}>
              <div className="relative">
                {/* Forma ortida qarama-qarshi aylanuvchi halqalar (faqat transform, ekrandan tashqarida pauza) */}
                <InViewPause className="pointer-events-none absolute inset-0">
                  <SpinRing sizes={[460, 640, 840]} duration={26} />
                </InViewPause>
                <div className="glass relative rounded-3xl bg-[#090b16]/85 p-6 md:p-8">
                  <ContactForm defaultService={defaultService} defaultMessage={defaultMessage} readQuery={readQuery} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
