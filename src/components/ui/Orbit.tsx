/**
 * Orbit — elementlarni aylana bo'ylab teng joylashtiradi va butun halqani CSS keyframe
 * (faqat transform: rotate) bilan aylantiradi; har bir element teskari aylanib tik turadi.
 * Ota element `relative` bo'lishi kerak — orbit markazga absolute joylashadi.
 * Cheksiz animatsiya: <InViewPause> ichiga o'rang. Elementlar soni ≤ ~10.
 *
 * Usage:
 *   <InViewPause className="relative size-[420px]">
 *     <Orbit radius={180} duration={40} ring tilt={60}
 *       items={[<Icon1 key="a" />, <Icon2 key="b" />]} />
 *   </InViewPause>
 *
 * Props: radius (px), duration (s), reverse, items, ring (dashed chiziq), tilt (rotateX deg,
 * statik — faqat halqa aylanadi), startAngle (deg), itemClassName, className.
 */
import type { CSSProperties, ReactNode } from "react";

type Props = {
  radius: number;
  duration?: number;
  reverse?: boolean;
  items: ReactNode[];
  ring?: boolean;
  tilt?: number;
  startAngle?: number;
  className?: string;
  itemClassName?: string;
};

export function Orbit({
  radius,
  duration = 30,
  reverse = false,
  items,
  ring = true,
  tilt,
  startAngle = 0,
  className = "",
  itemClassName = "",
}: Props) {
  const size = radius * 2;
  const n = Math.max(items.length, 1);
  const p3d: CSSProperties | undefined = tilt ? { transformStyle: "preserve-3d" } : undefined;
  const durVar = { "--wow-dur": `${duration}s`, ...p3d } as CSSProperties;
  const ringSpin = reverse ? "wow-spin-rev" : "wow-spin";
  const itemSpin = reverse ? "wow-spin" : "wow-spin-rev";

  const ringEl = (
    <div
      aria-hidden
      className={`${ringSpin} absolute inset-0 rounded-full ${ring ? "border border-dashed border-brand-400/20" : ""}`}
      style={durVar}
    >
      {items.map((item, i) => {
        const angle = startAngle + (360 / n) * i;
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 size-0"
            style={{ transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`, ...p3d }}
          >
            {/* Halqa burilishini qoplash (teskari aylanish) — element tik turadi */}
            <div className={`${itemSpin} absolute -translate-x-1/2 -translate-y-1/2`} style={durVar}>
              <div
                className={`flex items-center justify-center ${itemClassName}`}
                style={tilt ? { transform: `rotateX(${-tilt}deg)` } : undefined}
              >
                {item}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ width: size, height: size, ...(tilt ? { perspective: "1200px" } : null) }}
    >
      {tilt ? (
        <div className="absolute inset-0" style={{ transform: `rotateX(${tilt}deg)`, transformStyle: "preserve-3d" }}>
          {ringEl}
        </div>
      ) : (
        ringEl
      )}
    </div>
  );
}

export default Orbit;
