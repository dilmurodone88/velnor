"use client";

import Link from "@/i18n/Link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useContent } from "@/i18n/I18nProvider";
import { fmt } from "@/i18n/fmt";
import { ArrowRight, Call, ShieldTick, Speedometer, TickCircle } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InViewPause } from "@/components/ui/InViewPause";
import { RotatingBorder } from "@/components/ui/RotatingBorder";
import { cn } from "@/lib/utils";

export function Audit() {
  const c = useContent();
  const b = c.t.blocks.audit;
  const { site, images } = c;
  const { free, paid } = c.auditPlans;
  const [term, setTerm] = useState(paid.terms[1].key);
  const t = paid.terms.find((x) => x.key === term)!;

  return (
    <section id="audit" className="relative overflow-hidden py-24 md:py-28">
      <Photo id={images.security} alt={b.photoAlt} tone="dark" w={1200} className="absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060b] via-transparent to-[#05060b]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow={b.eyebrow}
          title={b.title}
          highlight={b.highlight}
          text={b.text}
        />

        <InViewPause className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2">
          {/* Bepul */}
          <Reveal className="h-full">
            <RotatingBorder
              active="hover"
              speed={7}
              layerClassName="w-[300%]"
              className="h-full"
              panelClassName="flex flex-col bg-[#0a0c16] bg-gradient-to-b from-white/[0.055] to-white/[0.02] p-7 md:p-9"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-brand-300 ring-1 ring-white/10">
                  <Speedometer className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{free.title}</h3>
                  <p className="text-sm text-white/50">{free.period}</p>
                </div>
              </div>
              <div className="mt-7 font-display text-5xl font-bold text-white">{free.price}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{free.desc}</p>
              <ul className="mt-7 space-y-3.5">
                {free.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm text-white/80">
                    <TickCircle className="mt-px h-5 w-5 shrink-0 text-brand-400" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-9">
                <Link href="/aloqa?xizmat=it-audit" className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10">
                  {b.freeCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </RotatingBorder>
          </Reveal>

          {/* Pulli muddatli */}
          <Reveal delay={0.1} className="h-full">
            <RotatingBorder
              speed={5}
              layerClassName="w-[300%]"
              className="h-full shadow-[0_30px_80px_-30px_rgba(63,109,255,0.6)]"
              panelClassName="flex flex-col overflow-hidden bg-[#0a0c16] bg-gradient-to-b from-brand-600/25 to-transparent p-7 md:p-9"
            >
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(63,109,255,0.48),transparent_70%)]" />
              <div className="relative flex flex-wrap items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white">
                  <ShieldTick className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{paid.title}</h3>
                  <p className="text-sm text-white/50">{b.chooseTerm}</p>
                </div>
                <span className="ml-auto inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">{b.recommended}</span>
              </div>

              <div className="relative mt-7 grid grid-cols-3 gap-1 rounded-2xl bg-black/30 p-1 ring-1 ring-white/10">
                {paid.terms.map((x) => (
                  <button key={x.key} onClick={() => setTerm(x.key)} className={cn("relative rounded-xl py-2.5 text-sm font-semibold transition-colors", term === x.key ? "text-white" : "text-white/50 hover:text-white")}>
                    {term === x.key && <motion.span layoutId="audit-term" className="absolute inset-0 rounded-xl bg-brand-500" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className="relative">{x.label}</span>
                  </button>
                ))}
              </div>

              <div className="relative mt-6 h-[76px]">
                <AnimatePresence mode="wait">
                  <motion.div key={t.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                    <div className="flex items-baseline gap-2">
                      {b.pricePrefix && <span className="text-sm text-white/50">{b.pricePrefix}</span>}
                      <span className="font-display text-5xl font-bold text-white">{t.price}</span>
                      <span className="text-sm text-white/50">{b.priceSuffix}</span>
                    </div>
                    <div className="mt-1 text-sm text-brand-200">{t.note}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="relative mt-2 text-sm leading-relaxed text-white/60">{paid.desc}</p>
              <ul className="relative mt-7 space-y-3.5">
                {paid.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm text-white/85">
                    <TickCircle className="mt-px h-5 w-5 shrink-0 text-brand-300" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="relative mt-auto pt-9">
                <Link href={`/aloqa?xizmat=it-audit&muddat=${t.key}`} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-4 text-sm font-semibold text-white shadow-[0_12px_40px_-10px_rgba(63,109,255,0.9)] transition hover:bg-brand-400">
                  {fmt(b.paidCta, { label: t.label })}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </RotatingBorder>
          </Reveal>
        </InViewPause>

        <Reveal delay={0.2}>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-white/50">
            {b.question}
            <a href={site.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-brand-300">
              <Call className="h-4 w-4" /> {site.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
