"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { useContent } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const HEX = "M32 3 L57.1 17.5 L57.1 46.5 L32 61 L6.9 46.5 L6.9 17.5 Z";
const HEX_IN = "M32 10 L51 21 L51 43 L32 54 L13 43 L13 21 Z";
// V — sxema chizig'i (VELNOR)
const N_PATH = "M20.5 22 L32 44 L43.5 22";
const nodes = [
  [20.5, 22],
  [32, 44],
  [43.5, 22],
];

/**
 * Animatsiyali logo belgisi.
 * intro — chizilib paydo bo'lish animatsiyasi (splash va navbar ochilishida)
 * loop  — doimiy impuls va orbita
 */
export function LogoMark({ className, intro = true, loop = true, delay = 0 }: { className?: string; intro?: boolean; loop?: boolean; delay?: number }) {
  const id = useId().replace(/:/g, "");
  const g = `lg-${id}`;
  const d = (s: number) => (intro ? delay + s : 0);

  return (
    <motion.svg viewBox="0 0 64 64" className={cn("h-10 w-10 overflow-visible", className)} aria-hidden whileHover={{ scale: 1.06 }}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6690ff" />
          <stop offset="0.5" stopColor="#3f6dff" />
          <stop offset="1" stopColor="#8fb0ff" />
        </linearGradient>
        <radialGradient id={`${g}-core`} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#101a45" />
          <stop offset="1" stopColor="#070814" />
        </radialGradient>
      </defs>

      {/* Tashqi aylanuvchi halqa */}
      <motion.g
        style={{ originX: "32px", originY: "32px" }}
        animate={loop ? { rotate: 360 } : undefined}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <motion.circle
          cx="32" cy="32" r="31" fill="none" stroke={`url(#${g})`} strokeWidth="0.8" strokeDasharray="2 5" opacity="0.55"
          initial={intro ? { opacity: 0, scale: 0.6 } : false}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ delay: d(0.9), duration: 0.8 }}
          style={{ originX: "32px", originY: "32px" }}
        />
        {loop && <circle cx="32" cy="1" r="1.8" fill="#6690ff" />}
      </motion.g>

      {/* Ichki to'q olti burchak */}
      <motion.path
        d={HEX}
        fill={`url(#${g}-core)`}
        initial={intro ? { opacity: 0, scale: 0.4, rotate: -60 } : false}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: d(0.05), duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: "32px", originY: "32px" }}
      />

      {/* Olti burchak konturi chiziladi */}
      <motion.path
        d={HEX}
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth="2.6"
        strokeLinejoin="round"
        initial={intro ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ delay: d(0.15), duration: 1.1, ease: "easeInOut" }}
      />
      <motion.path
        d={HEX_IN}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.08"
        strokeWidth="1"
        initial={intro ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ delay: d(0.5), duration: 0.9 }}
      />

      {/* V — sxema chizig'i */}
      <motion.path
        d={N_PATH}
        fill="none"
        stroke="#fff"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={intro ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ delay: d(0.7), duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* V bo'ylab yuguruvchi impuls */}
      {loop && (
        <motion.path
          d={N_PATH}
          fill="none"
          stroke="#6690ff"
          strokeWidth="4.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 58"
          initial={{ strokeDashoffset: 66, opacity: 0 }}
          animate={{ strokeDashoffset: [66, 0], opacity: 1 }}
          transition={{ strokeDashoffset: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: d(1.6), repeatDelay: 0.6 }, opacity: { delay: d(1.6) } }}
        />
      )}

      {/* Tugunlar */}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="3.4"
          fill="#0b0d1a"
          stroke={i % 2 ? "#8fb0ff" : "#6690ff"}
          strokeWidth="2"
          initial={intro ? { scale: 0 } : false}
          animate={{ scale: 1 }}
          transition={{ delay: d(1.05 + i * 0.1), type: "spring", stiffness: 400, damping: 12 }}
          style={{ originX: `${x}px`, originY: `${y}px` }}
        />
      ))}
    </motion.svg>
  );
}

export function Logo({ className, intro = true }: { className?: string; intro?: boolean }) {
  const { site } = useContent();
  return (
    <span className={cn("group flex items-center gap-3", className)}>
      <LogoMark intro={intro} />
      <span className="leading-none">
        <span className="flex overflow-hidden font-display text-[19px] font-bold tracking-[0.18em] text-white">
          {site.name.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={intro ? { y: "110%", opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block transition-colors duration-300 group-hover:text-brand-200"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
        <motion.span
          initial={intro ? { opacity: 0, x: -6 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.3em] text-brand-300"
        >
          {site.suffix}
        </motion.span>
      </span>
    </span>
  );
}
