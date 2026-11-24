"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const fmt = (v: number) => Math.round(v).toLocaleString("ru-RU");

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    // Write straight to the DOM instead of re-rendering React every frame
    const c = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = fmt(v) + suffix;
      },
    });
    return () => c.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {fmt(0) + suffix}
    </span>
  );
}
