import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { InViewPause } from "./InViewPause";
import { WordReveal } from "./WordReveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  text,
  center = true,
  className,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  text?: string;
  center?: boolean;
  className?: string;
}) {
  const titleWords = title.split(/\s+/).filter(Boolean).length;
  return (
    <div className={cn("mb-14 max-w-3xl", center && "mx-auto text-center", className)}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-300">
          {/* Kichik aylanuvchi halqa (faqat transform; ekrandan tashqarida pauza) */}
          <InViewPause as="span" className="relative inline-flex size-3.5 shrink-0 items-center justify-center">
            <span
              className="wow-spin absolute inset-0 rounded-full border border-dashed border-brand-400/70"
              style={{ "--wow-dur": "6s" } as CSSProperties}
            />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_12px_#6690ff]" />
          </InViewPause>
          {eyebrow}
        </span>
      </Reveal>
      <h2
        aria-label={highlight ? `${title} ${highlight}` : title}
        className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
      >
        <WordReveal text={title} delay={0.08} />
        {highlight && (
          <>
            {" "}
            <WordReveal text={highlight} delay={0.08 + titleWords * 0.06} wordClassName="text-gradient" />
          </>
        )}
      </h2>
      {text && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">{text}</p>
        </Reveal>
      )}
    </div>
  );
}
