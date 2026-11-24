"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

type Center = { cx: number; cy: number };

export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const center = useRef<Center | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });

  // Measure once per hover; subtract the current offset so the centre never follows the element
  const measure = () => {
    const el = ref.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    center.current = { cx: r.left - sx.get() + r.width / 2, cy: r.top - sy.get() + r.height / 2 };
    return center.current;
  };
  const invalidate = () => {
    center.current = null;
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        measure();
        window.addEventListener("scroll", invalidate, { passive: true });
      }}
      onPointerMove={(e) => {
        // Touch / pen taps must not leave the button offset
        if (e.pointerType !== "mouse") return;
        const c = center.current ?? measure();
        if (!c) return;
        x.set((e.clientX - c.cx) * strength);
        y.set((e.clientY - c.cy) * strength);
      }}
      onPointerLeave={() => {
        window.removeEventListener("scroll", invalidate);
        center.current = null;
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
