"use client";

import Link from "@/i18n/Link";
import { ArrowUpRight } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { fmt } from "@/i18n/fmt";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";
import { InViewPause } from "@/components/ui/InViewPause";
import { RotatingBorder } from "@/components/ui/RotatingBorder";
import { SpinRing } from "@/components/ui/SpinRing";

// Hover bo'lmaganda aylanuvchi qatlamlarni to'xtatib turadi (opacity 0 bo'lsa ham GPU ishlamasin)
const PAUSE_UNTIL_HOVER = "[&_.wow-spin]:[animation-play-state:paused] [&_.wow-spin-rev]:[animation-play-state:paused] hover:[&_.wow-spin]:[animation-play-state:running] hover:[&_.wow-spin-rev]:[animation-play-state:running]";

export function Directions() {
  const c = useContent();
  const { directions, groups } = c;
  const t = c.t.home.directions;
  return (
    <section id="yonalishlar" className="relative py-24 md:py-28">
      <InViewPause className="container-x">
        <SectionHeading
          eyebrow={fmt(t.eyebrow, { groups: groups.length, directions: directions.length })}
          title={t.title}
          highlight={t.highlight}
          text={t.text}
        />

        <div className="space-y-16 md:space-y-20">
          {groups.map((g) => (
            <div key={g.id} className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
              {/* Guruh sarlavhasi */}
              <Reveal x={-30} y={0}>
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-400/40 bg-brand-500/10 font-display text-sm font-bold text-brand-300">{g.num}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-brand-400/40 to-transparent" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white md:text-3xl">{g.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{g.desc}</p>
                  <div className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                    {fmt(t.groupCount, { directions: g.items.length, services: g.items.reduce((n, d) => n + d.items.length, 0) })}
                  </div>
                </div>
              </Reveal>

              {/* Kartalar */}
              <Stagger className={cn("grid gap-5 sm:grid-cols-2", g.items.length === 3 && "xl:grid-cols-3")}>
                {g.items.map((d) => (
                  <StaggerItem key={d.slug} className="h-full">
                    <Link href={`/xizmatlar/${d.slug}`} className="block h-full">
                      <RotatingBorder active="hover" speed={5} layerClassName="w-[300%]" panelClassName="bg-[#0a0c16]" className={cn("h-full", PAUSE_UNTIL_HOVER)}>
                      <SpotlightCard tilt={0} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-[#0a0c16]">
                        <div className="relative h-44 overflow-hidden">
                          <Photo w={800} id={d.image} alt={d.title} sizes="(min-width:1280px) 25vw, (min-width:640px) 45vw, 100vw" className="absolute inset-0" imgClassName="transition duration-700 group-hover:scale-110" />
                          <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow-[0_10px_30px_-8px_rgba(63,109,255,0.9)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                            <SpinRing sizes={[60, 78]} duration={6} className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <d.icon className="h-6 w-6" />
                          </span>
                          <span className="absolute right-5 top-5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[11px] text-white/80">{d.num}</span>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <h4 className="font-display text-xl font-bold text-white">{d.title}</h4>
                          <p className="mt-1.5 text-sm text-brand-200/80">{d.short}</p>
                          <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
                            {d.items.slice(0, 4).map((it) => (
                              <li key={it.title} className="flex items-center gap-3 text-sm text-white/70">
                                <it.icon className="h-[18px] w-[18px] shrink-0 text-brand-400" />
                                {it.title}
                              </li>
                            ))}
                            {d.items.length > 4 && <li className="pl-[30px] text-xs text-white/40">{fmt(t.more, { n: d.items.length - 4 })}</li>}
                          </ul>
                          <div className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-white">
                            {t.details}
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:ring-brand-400">
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </SpotlightCard>
                      </RotatingBorder>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </InViewPause>
    </section>
  );
}
