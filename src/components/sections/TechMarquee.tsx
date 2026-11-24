"use client";

import { clients, techMarquee } from "@/lib/data";
import { useContent } from "@/i18n/I18nProvider";
import { Marquee } from "@/components/ui/Marquee";
import { InViewPause } from "@/components/ui/InViewPause";
import { SpinRing } from "@/components/ui/SpinRing";

// Sarlavha yonidagi kichik aylanuvchi "atom" belgisi (faqat bezak)
function Atom() {
  return (
    <span aria-hidden className="relative inline-block size-6 shrink-0">
      <SpinRing sizes={[14, 24]} duration={4} dots />
      <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400" />
    </span>
  );
}

export function TechMarquee() {
  const c = useContent();
  const half = Math.ceil(techMarquee.length / 2);
  return (
    <InViewPause as="section" className="relative border-y border-white/5 bg-white/[0.015] py-10">
      <div className="mb-6 flex items-center justify-center gap-3 px-5">
        <Atom />
        <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-white/35">{c.t.home.tech.title}</p>
        <Atom />
      </div>
      <div className="space-y-4">
        <Marquee>
          {techMarquee.slice(0, half).map((t) => (
            <span key={t} className="glass whitespace-nowrap rounded-full px-6 py-2.5 font-display text-sm font-semibold text-white/70 transition hover:text-white">
              {t}
            </span>
          ))}
        </Marquee>
        <Marquee reverse>
          {[...techMarquee.slice(half), ...clients.slice(0, 4)].map((t) => (
            <span key={t} className="whitespace-nowrap rounded-full border border-white/5 px-6 py-2.5 font-display text-sm font-semibold text-white/45 transition hover:text-white">
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </InViewPause>
  );
}
