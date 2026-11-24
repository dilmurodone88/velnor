"use client";

import { images } from "@/lib/data";
import { useContent } from "@/i18n/I18nProvider";
import { Counter } from "@/components/ui/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { CloudConnection, Code, Cpu, Lock, ShieldTick, Wifi } from "@/components/ui/icons";
import { InViewPause } from "@/components/ui/InViewPause";
import { Orbit } from "@/components/ui/Orbit";
import { SpinRing } from "@/components/ui/SpinRing";

// Kollaj burchagidagi orbitada aylanadigan texnologiya ikonkalari (faqat bezak)
const ORBIT_ICONS = [Cpu, CloudConnection, Lock, Code, Wifi];

export function About() {
  const c = useContent();
  const { stats, whyUs } = c;
  const t = c.t.home.about;
  return (
    <section id="biz-haqimizda" className="relative py-24 md:py-28">
      <InViewPause className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Rasm kollaj */}
          <Reveal y={30}>
            <div className="relative grid h-[460px] grid-cols-5 grid-rows-6 gap-4 md:h-[540px]">
              <Photo w={900} id={images.team} alt={t.altTeam} sizes="(min-width:1024px) 30vw, 60vw" className="col-span-3 row-span-6 rounded-3xl border border-white/10" />
              <Photo w={900} id={images.technician} alt={t.altTechnician} sizes="(min-width:1024px) 20vw, 40vw" className="col-span-2 row-span-3 rounded-3xl border border-white/10" />
              <Photo w={900} id={images.serverRoom} alt={t.altServerRoom} sizes="(min-width:1024px) 20vw, 40vw" className="col-span-2 row-span-3 rounded-3xl border border-white/10" />
              {/* Burchak orbitasi — aylanuvchi ikonkalar */}
              <div aria-hidden className="pointer-events-none absolute -top-6 right-2 z-10 size-36 md:-top-10 md:-right-8 md:size-44">
                <SpinRing sizes={[64, 150]} duration={14} />
                <Orbit
                  radius={60}
                  duration={22}
                  items={ORBIT_ICONS.map((Icon, i) => (
                    <span key={i} className="flex size-8 items-center justify-center rounded-lg border border-brand-400/30 bg-[#0a0c16] text-brand-300 shadow-[0_8px_20px_-8px_rgba(63,109,255,0.8)]">
                      <Icon className="size-4" />
                    </span>
                  ))}
                />
                <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-[0_10px_30px_-8px_rgba(63,109,255,0.9)]">
                  <ShieldTick className="size-5" />
                </span>
              </div>
              <div className="glass absolute -bottom-5 left-6 flex items-center gap-4 rounded-2xl bg-[#0a0c16]/90 p-4 pr-6 shadow-2xl md:left-10">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
                  <SpinRing sizes={[64]} duration={8} />
                  <ShieldTick className="h-6 w-6" />
                </span>
                <div>
                  <div className="font-display text-2xl font-bold text-white">{t.badgeValue}</div>
                  <div className="text-xs text-white/55">{t.badgeLabel}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              center={false}
              className="mb-8"
              eyebrow={t.eyebrow}
              title={t.title}
              highlight={t.highlight}
              text={t.text}
            />
            <Stagger className="grid gap-3 sm:grid-cols-2">
              {whyUs.map((w) => (
                <StaggerItem key={w.title}>
                  <div className="group glass h-full rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-400/30">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition group-hover:bg-brand-500 group-hover:text-white">
                      <w.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-semibold text-white">{w.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{w.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2} className="mt-8">
              <Button href="/aloqa">{t.cta}</Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="relative overflow-hidden bg-[#07080f] p-6 text-center md:p-8">
              <SpinRing sizes={[118]} duration={26 + i * 4} className="opacity-60" />
              <Reveal delay={i * 0.08} y={16} className="relative">
                <div className="font-display text-4xl font-bold text-white md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-white/50">{s.label}</div>
              </Reveal>
            </div>
          ))}
        </div>
      </InViewPause>
    </section>
  );
}
