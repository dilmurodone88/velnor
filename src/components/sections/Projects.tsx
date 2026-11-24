"use client";

import Link from "@/i18n/Link";
import { ArrowUpRight, TrendUp } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { InViewPause } from "@/components/ui/InViewPause";
import { RotatingBorder } from "@/components/ui/RotatingBorder";

// Aylanuvchi chegara qatlami faqat hoverda aylanadi (yashirin holatda kompozitor ishlamaydi)
const HOVER_SPIN = "[&_.wow-spin]:[animation-play-state:paused]! hover:[&_.wow-spin]:[animation-play-state:running]!";

export function Projects() {
  const c = useContent();
  const b = c.t.blocks.projects;
  return (
    <section id="loyihalar" className="relative py-24 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={b.eyebrow} title={b.title} highlight={b.highlight} text={b.text} />
        <InViewPause>
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.projects.map((p) => {
            const dir = c.directions.find((d) => d.slug === p.tag)!;
            return (
              <StaggerItem key={p.title} className="h-full">
                <Link href={`/xizmatlar/${p.tag}`} className="block h-full">
                  <SpotlightCard tilt={6} className={`group relative h-full rounded-3xl ${HOVER_SPIN}`}>
                    <RotatingBorder active="hover" speed={5} className="h-full" panelClassName="overflow-hidden bg-surface bg-gradient-to-b from-white/[0.05] to-white/[0.015]">
                    <div className="relative h-52 overflow-hidden">
                      <Photo w={800} id={p.image} alt={p.title} sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="absolute inset-0" imgClassName="transition duration-700 group-hover:scale-110" />
                      <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white">
                        <dir.icon className="h-4 w-4 text-brand-300" /> {dir.title}
                      </span>
                      <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="text-xs uppercase tracking-widest text-white/40">{p.client}</div>
                      <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white">{p.title}</h3>
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-200 ring-1 ring-brand-400/25">
                        <TrendUp className="h-3.5 w-3.5" /> {p.result}
                      </div>
                    </div>
                    </RotatingBorder>
                  </SpotlightCard>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
        </InViewPause>
      </div>
    </section>
  );
}
