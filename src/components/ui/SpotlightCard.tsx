"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Sichqoncha bilan 3D egiladigan va nur tushadigan kartochka
export function SpotlightCard({ children, className, tilt = 8 }: { children: ReactNode; className?: string; tilt?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  const last = useRef({ x: 0.5, y: 0.5 });
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), { stiffness: 180, damping: 18 });

  const invalidate = () => {
    rect.current = null;
  };

  // At most one style write per animation frame
  const flush = () => {
    frame.current = 0;
    const el = ref.current;
    if (!el) return;
    const { x, y } = last.current;
    px.set(x);
    py.set(y);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        // Cache the rect while the card is still flat
        rect.current = ref.current.getBoundingClientRect();
        window.addEventListener("scroll", invalidate, { passive: true });
      }}
      onPointerMove={(e) => {
        // No tilt / spotlight tracking on touch or pen
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = rect.current ?? (rect.current = ref.current.getBoundingClientRect());
        last.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
        if (!frame.current) frame.current = requestAnimationFrame(flush);
      }}
      onPointerLeave={() => {
        window.removeEventListener("scroll", invalidate);
        rect.current = null;
        if (frame.current) cancelAnimationFrame(frame.current);
        frame.current = 0;
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn("spotlight", className)}
    >
      {children}
    </motion.div>
  );
}
