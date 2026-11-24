/**
 * SpinRing — fon uchun konsentrik dashed/dotted halqalar, qo'shnilari qarama-qarshi aylanadi
 * (CSS keyframe, faqat transform). Ota element `relative` bo'lishi kerak; markazga joylashadi.
 * Halqaga kichik "nuqta" (marker) qo'shiladi — aylanish ko'zga ko'rinadi.
 * Cheksiz animatsiya: <InViewPause> ichiga o'rang.
 *
 * Usage:
 *   <InViewPause className="relative grid place-items-center">
 *     <SpinRing sizes={[120, 180, 250]} />
 *     <Icon />
 *   </InViewPause>
 *
 * Props: sizes (px, diametrlar), duration (eng ichki halqa, s; tashqilari sekinroq),
 * dots (har halqada marker), className.
 */
import type { CSSProperties } from "react";

type Props = {
  sizes?: number[];
  duration?: number;
  dots?: boolean;
  className?: string;
};

const STYLES = [
  "border-dashed border-brand-400/25",
  "border-dotted border-brand-300/20",
  "border-dashed border-brand-500/15",
];

export function SpinRing({ sizes = [140, 210, 290], duration = 18, dots = true, className = "" }: Props) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {sizes.map((size, i) => (
        <div
          key={i}
          className={`${i % 2 === 0 ? "wow-spin" : "wow-spin-rev"} absolute top-1/2 left-1/2 rounded-full border ${STYLES[i % STYLES.length]}`}
          style={
            {
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              "--wow-dur": `${duration * (1 + i * 0.6)}s`,
            } as CSSProperties
          }
        >
          {dots && (
            <span
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                i % 2 === 0 ? "size-2 bg-brand-400" : "size-1.5 bg-brand-200/80"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SpinRing;
