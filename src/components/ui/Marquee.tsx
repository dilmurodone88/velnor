"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Cheksiz aylanuvchi lenta: chetlari gradient bilan, ekrandan tashqarida pauza qiladi
export function Marquee({ children, reverse, className }: { children: ReactNode; reverse?: boolean; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef<HTMLDivElement>(null);
  const [repeat, setRepeat] = useState(1);
  const repeatRef = useRef(1);

  // Pause the animation while off-screen (inline style only when paused so the hover-pause class keeps working)
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry.isIntersecting ? "" : "paused";
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // One half of the track must be at least as wide as the viewport for a seamless loop
  useEffect(() => {
    const wrap = wrapRef.current;
    const half = halfRef.current;
    if (!wrap || !half || typeof ResizeObserver === "undefined") return;
    const measure = () => {
      const base = half.offsetWidth / repeatRef.current;
      if (!base) return;
      const next = Math.max(1, Math.ceil(wrap.clientWidth / base));
      if (next !== repeatRef.current) {
        repeatRef.current = next;
        setRepeat(next);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  const copies = Array.from({ length: repeat }, (_, i) => <Fragment key={i}>{children}</Fragment>);

  return (
    <div ref={wrapRef} className={cn("group relative flex overflow-hidden", className)}>
      <div
        ref={trackRef}
        className={cn(
          "flex w-max shrink-0 will-change-transform group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-rev" : "animate-marquee",
        )}
      >
        <div ref={halfRef} className="flex shrink-0 gap-4 pr-4">
          {copies}
        </div>
        <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true">
          {copies}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[12%] bg-linear-to-r from-[#05060b] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12%] bg-linear-to-l from-[#05060b] to-transparent" />
    </div>
  );
}
