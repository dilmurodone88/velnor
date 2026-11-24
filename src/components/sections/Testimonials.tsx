"use client";

import { QuoteUp, Star } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { InViewPause } from "@/components/ui/InViewPause";
import { RotatingBorder } from "@/components/ui/RotatingBorder";

// Aylanuvchi chegara qatlami faqat hoverda aylanadi (yashirin holatda kompozitor ishlamaydi)
const HOVER_SPIN = "[&_.wow-spin]:[animation-play-state:paused]! hover:[&_.wow-spin]:[animation-play-state:running]!";

export function Testimonials() {
  const c = useContent();
  const b = c.t.blocks.testimonials;
  return (
    <section className="relative overflow-hidden py-28">
      <div className="container-x">
        <SectionHeading eyebrow={b.eyebrow} title={b.title} highlight={b.highlight} />
      </div>
      <InViewPause>
      <Marquee className="[--duration:60s]">
        {c.testimonials.map((t) => (
          <RotatingBorder key={t.name} active="hover" speed={5} className={`w-[340px] shrink-0 md:w-[420px] ${HOVER_SPIN}`} panelClassName="bg-surface bg-gradient-to-b from-white/[0.05] to-white/[0.015]">
          <figure className="h-full p-7">
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5 text-brand-400">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <QuoteUp className="h-8 w-8 text-white/10" />
            </div>
            <blockquote className="mt-5 text-[15px] leading-relaxed text-white/75">&ldquo;{t.text}&rdquo;</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-500 font-bold text-white">
                {t.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-xs text-white/45">{t.role}</div>
              </div>
            </figcaption>
          </figure>
          </RotatingBorder>
        ))}
      </Marquee>
      </InViewPause>
    </section>
  );
}
