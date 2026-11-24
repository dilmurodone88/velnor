"use client";

import { useState } from "react";
import { Add } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InViewPause } from "@/components/ui/InViewPause";
import { RotatingBorder } from "@/components/ui/RotatingBorder";

// Yopiq savollarda aylanuvchi qatlam to'xtaydi, hoverda va ochiq savolda aylanadi
const IDLE_SPIN = "[&_.wow-spin]:[animation-play-state:paused]! hover:[&_.wow-spin]:[animation-play-state:running]!";

export function Faq() {
  const c = useContent();
  const b = c.t.blocks.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="savollar" className="relative py-28">
      <div className="container-x max-w-3xl">
        <SectionHeading eyebrow={b.eyebrow} title={b.title} highlight={b.highlight} />
        <InViewPause className="space-y-3">
          {c.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <RotatingBorder
                  radius="rounded-2xl"
                  speed={7}
                  active="hover"
                  className={isOpen ? "wow-border-active" : IDLE_SPIN}
                  panelClassName={`overflow-hidden bg-surface bg-gradient-to-b transition-colors ${isOpen ? "from-white/[0.07] to-white/[0.03]" : "from-white/[0.05] to-white/[0.015]"}`}
                >
                  <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                    <span className="font-semibold text-white md:text-lg">{f.q}</span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ${isOpen ? "rotate-45" : ""} ${isOpen ? "bg-brand-400 text-black" : "bg-white/10 text-white"}`}>
                      <Add className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    aria-hidden={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-relaxed text-white/60">{f.a}</p>
                    </div>
                  </div>
                </RotatingBorder>
              </Reveal>
            );
          })}
        </InViewPause>
      </div>
    </section>
  );
}
