/**
 * RotatingBorder — kartaga aylanuvchi konik-gradient chegara beradi.
 * Gradient STATIK; faqat katta kvadrat qatlam transform: rotate bilan aylanadi,
 * ota element overflow-hidden + yumaloq burchak bilan kesadi, ichki panel inset 1px.
 * Cheksiz animatsiya: sahifa bo'limini <InViewPause> ichiga o'rang.
 *
 * Usage:
 *   <RotatingBorder className="h-full" radius="rounded-3xl">...karta...</RotatingBorder>
 *   // faqat hoverda (ota yoki o'zi .group bo'lsa):
 *   <div className="group"><RotatingBorder active="hover">...</RotatingBorder></div>
 *
 * Props: radius (Tailwind rounded-* klassi), speed (s), active ("always" | "hover"),
 * panelClassName (ichki panel foni/padding), layerClassName, className.
 */
import type { CSSProperties, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  panelClassName?: string;
  radius?: string;
  speed?: number;
  active?: "always" | "hover";
  /** Aylanuvchi kvadrat kengligi (juda baland kartalar uchun kattalashtiring) */
  layerClassName?: string;
};

const GRADIENT =
  "conic-gradient(from 0deg, transparent 0deg, transparent 220deg, var(--color-brand-700) 260deg, var(--color-brand-400) 310deg, var(--color-brand-200) 340deg, transparent 360deg)";

export function RotatingBorder({
  children,
  className = "",
  panelClassName = "bg-surface",
  radius = "rounded-3xl",
  speed = 6,
  active = "always",
  layerClassName = "w-[200%]",
}: Props) {
  return (
    <div
      className={`relative isolate overflow-hidden ${radius} ${
        active === "always" ? "wow-border-active" : "wow-border-hover"
      } ${className}`}
    >
      {/* Aylanuvchi qatlam: kvadrat (200% kenglik — balandlik ≤ 1.7×kenglik bo'lgan kartalarni qoplaydi) */}
      <div
        aria-hidden
        className={`wow-border-layer pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square ${layerClassName} -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500`}
      >
        <div
          className="wow-spin size-full rounded-full"
          style={{ "--wow-dur": `${speed}s`, backgroundImage: GRADIENT } as CSSProperties}
        />
      </div>
      {/* Doimiy nozik chegara (faol bo'lmaganda ham) */}
      <div aria-hidden className={`pointer-events-none absolute inset-0 -z-20 bg-white/[0.06] ${radius}`} />
      <div className={`relative m-px h-[calc(100%-2px)] ${radius} ${panelClassName}`}>{children}</div>
    </div>
  );
}

export default RotatingBorder;
