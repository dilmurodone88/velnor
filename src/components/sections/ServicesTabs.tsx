"use client";

import Link from "@/i18n/Link";
import { AnimatePresence, motion } from "motion/react";
import { useState, type CSSProperties } from "react";
import { ArrowRight, TickCircle } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { fmt } from "@/i18n/fmt";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InViewPause } from "@/components/ui/InViewPause";
import { RotatingBorder } from "@/components/ui/RotatingBorder";

export function ServicesTabs() {
  const c = useContent();
  const { directions } = c;
  const t = c.t.home.services;
  const [active, setActive] = useState(0);
  const d = directions[active];

  return (
    <section id="xizmatlar" className="relative py-28">
      <InViewPause className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={fmt(t.title, { n: directions.reduce((n, x) => n + x.items.length, 0) })} highlight={t.highlight} text={t.text} />

        <div className="mask-x -mx-5 mb-10 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
          <div className="mx-auto flex w-max gap-2 rounded-full border border-white/10 bg-white/[0.02] p-1.5">
            {directions.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${i === active ? "text-white" : "text-white/50 hover:text-white"}`}
              >
                {i === active && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${item.from}, ${item.to})` }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative flex h-4 w-4 items-center justify-center">
                  {i === active && (
                    <span
                      aria-hidden
                      className="wow-spin pointer-events-none absolute -inset-1.5 rounded-full border border-dashed border-white/70"
                      style={{ "--wow-dur": "5s" } as CSSProperties}
                    >
                      <span className="absolute top-0 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                    </span>
                  )}
                  <item.icon className="h-4 w-4" />
                </span>
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[1200px] sm:min-h-[1000px] lg:min-h-[640px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={d.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 lg:grid-cols-[1fr_2fr]"
          >
            <RotatingBorder speed={7} layerClassName="w-[300%]" panelClassName="relative overflow-hidden bg-[#0a0c16] p-8">
              <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(160deg, ${d.from}, transparent 60%)` }} />
              <div className="relative">
                <span className="font-mono text-sm text-white/40">{d.num} / 0{directions.length}</span>
                <h3 className="mt-3 font-display text-3xl font-bold text-white">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{d.headline}</p>
                <ul className="mt-6 space-y-3">
                  {d.features.map((f, i) => (
                    <motion.li key={f} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="flex items-center gap-3 text-sm text-white/80">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: `${d.from}33`, color: d.from }}>
                        <TickCircle className="h-3 w-3" />
                      </span>
                      {f}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                  {d.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-xl font-bold text-white">{s.value}</div>
                      <div className="text-[11px] leading-tight text-white/45">{s.label}</div>
                    </div>
                  ))}
                </div>
                <Link href={`/xizmatlar/${d.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all" style={{ color: d.from }}>
                  {t.directionPage} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </RotatingBorder>

            <div className="grid gap-4 sm:grid-cols-2">
              {d.items.map((it, i) => (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  className="group glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: `linear-gradient(90deg, ${d.from}, ${d.to})` }} />
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${d.from}26, ${d.to}26)`, color: d.from }}>
                      <it.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-white">{it.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{it.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </InViewPause>
    </section>
  );
}
