"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { useContent } from "@/i18n/I18nProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InViewPause } from "@/components/ui/InViewPause";

export function Process() {
  const c = useContent();
  const t = c.t.showcase.process;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="jarayon" className="relative overflow-x-clip py-28">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} highlight={t.highlight} text={t.text} />

        <InViewPause className="relative mx-auto max-w-4xl">
        <div ref={ref} className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2" />
          <motion.div style={{ scaleY }} className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-brand-400 via-brand-500 to-brand-500 md:left-1/2" />

          <div className="space-y-12">
            {c.process.map((p, i) => {
              const right = i % 2 === 1;
              return (
                <div key={p.title} className="relative flex items-center">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-display font-bold text-white shadow-[0_0_30px_rgba(63,109,255,0.6)] ring-4 ring-[#05060b] md:left-1/2"
                  >
                    {/* Aylanuvchi dashed halqa (faqat transform) */}
                    <span
                      aria-hidden
                      className={`${right ? "wow-spin-rev" : "wow-spin"} pointer-events-none absolute -inset-[9px] rounded-full border border-dashed border-brand-300/45`}
                      style={{ "--wow-dur": `${10 + i * 1.5}s` } as CSSProperties}
                    >
                      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200" />
                    </span>
                    {i + 1}
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, x: right ? 32 : -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`ml-16 w-full md:ml-0 md:w-[calc(50%-48px)] ${right ? "md:ml-auto" : ""}`}
                  >
                    <div className="group glass rounded-3xl p-6 transition hover:border-brand-400/30">
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-brand-300 ring-1 ring-white/10 transition group-hover:bg-brand-400 group-hover:text-black">
                          <p.icon className="h-5 w-5" />
                        </span>
                        <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/55">{p.desc}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        </InViewPause>
      </div>
    </section>
  );
}
