"use client";

import { motion, useInView } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { Car, Danger, Notification, People, Scan } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { images } from "@/lib/data";
import { useContent } from "@/i18n/I18nProvider";
import { InViewPause } from "@/components/ui/InViewPause";

// Radar nur: STATIK konik gradient, faqat transform: rotate bilan aylanadi
const RADAR =
  "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(43,82,240,0.12) 320deg, rgba(102,144,255,0.32) 352deg, rgba(143,176,255,0.55) 360deg)";

const featureIcons = [Scan, Car, People, Danger];

const camStyles = [
  { c: "#8fb0ff", box: { l: "30%", t: "18%", w: "40%", h: "62%" } },
  { c: "#6690ff", box: { l: "20%", t: "45%", w: "60%", h: "30%" } },
  { c: "#8fb0ff", box: { l: "10%", t: "25%", w: "80%", h: "55%" } },
  { c: "#f87171", box: { l: "45%", t: "30%", w: "35%", h: "50%" } },
];

export function AiBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref, { margin: "100px" });
  const t = useContent().t.showcase.aiBanner;
  const features = t.features.map((f, i) => ({ ...f, icon: featureIcons[i] }));
  const cams = t.cams.map((cm, i) => ({ ...cm, ...camStyles[i] }));

  return (
    <section className="relative py-20">
      <div className="container-x" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a1030] via-[#080d22] to-[#070d1f] p-6 md:p-14"
        >
          <Photo id={images.videoWall} alt={t.photoAlt} tone="dark" w={900} sizes="(min-width:1024px) 80vw, 100vw" className="absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(43,82,240,0.48),transparent_70%)]" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(63,109,255,0.40),transparent_70%)]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300 ring-1 ring-brand-400/30">
                  <Notification className="h-3.5 w-3.5" /> {t.badge}
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                  {t.titleStart}<span className="text-gradient">{t.titleHighlight}</span>{t.titleEnd}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 text-white/60 md:text-lg">
                  {t.text}
                </p>
              </Reveal>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((f, i) => (
                  <Reveal key={f.title} delay={0.25 + i * 0.07}>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-white/10">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-500 text-white">
                        <f.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">{f.title}</div>
                        <div className="text-xs text-white/45">{f.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.5} className="mt-9">
                <Button href="/xizmatlar/ai-yechimlar">{t.cta}</Button>
              </Reveal>
            </div>

            {/* Kamera ekrani */}
            <motion.div
              initial={{ opacity: 0, rotateX: 8 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
              className="relative"
            >
              {/* Radar fon (kamera panjarasi ortida) */}
              <InViewPause className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2" >
                <div aria-hidden className="absolute inset-0 rounded-full border border-brand-400/15" />
                <div aria-hidden className="absolute inset-[16%] rounded-full border border-dashed border-brand-400/15" />
                <div aria-hidden className="absolute inset-[32%] rounded-full border border-brand-400/10" />
                <div aria-hidden className="absolute left-1/2 top-0 h-full w-px bg-brand-400/10" />
                <div aria-hidden className="absolute left-0 top-1/2 h-px w-full bg-brand-400/10" />
                <div
                  aria-hidden
                  className="wow-spin absolute inset-0 rounded-full"
                  style={{ "--wow-dur": "7s", backgroundImage: RADAR } as CSSProperties}
                >
                  <span className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-brand-200/70 to-transparent" />
                </div>
                <div aria-hidden className="wow-spin-rev absolute inset-[8%] rounded-full border border-dotted border-brand-300/20" style={{ "--wow-dur": "40s" } as CSSProperties}>
                  <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300" />
                </div>
              </InViewPause>
              <div className="relative grid grid-cols-2 gap-3">
                {cams.map((c, i) => (
                  <motion.div
                    key={c.cam}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6 }}
                    className="relative aspect-video overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_top,#1e293b,#020617)] ring-1 ring-white/10"
                  >
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <motion.div
                      className="absolute rounded border-2"
                      style={{ left: c.box.l, top: c.box.t, width: c.box.w, height: c.box.h, borderColor: c.c }}
                      animate={live ? { x: [0, 6, -4, 0], y: [0, -3, 2, 0] } : { x: 0, y: 0 }}
                      transition={live ? { duration: 4 + i, repeat: Infinity } : { duration: 0.3 }}
                    >
                      <span className="absolute left-0 top-0 whitespace-nowrap rounded-br px-1 font-mono text-[9px] font-bold text-black" style={{ background: c.c }}>
                        {c.label}
                      </span>
                    </motion.div>
                    <div className="pointer-events-none absolute inset-0 animate-scan" style={{ animationDelay: `${i * 0.7}s` }}><div className="h-px bg-gradient-to-r from-transparent via-brand-300/80 to-transparent" /></div>
                    <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-white/60">{c.cam}</span>
                    <span className="absolute right-2 top-1.5 flex items-center gap-1 font-mono text-[9px] font-bold text-red-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> {t.live}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="glass absolute -bottom-6 left-1/2 flex w-[88%] -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#0b0d1a]/95 p-3.5 shadow-2xl"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Notification className="h-5 w-5" />
                </span>
                <div className="flex-1 text-xs">
                  <div className="font-semibold text-white">{t.alertTitle}</div>
                  <div className="text-white/55">{t.alertText}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
