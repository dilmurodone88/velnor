import Link from "@/i18n/Link";
import { ArrowRight } from "@/components/ui/icons";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  icon?: boolean;
};

// Statik konik gradient — faqat qatlam aylanadi (transform), hoverda ko'rinadi
const CONIC =
  "conic-gradient(from 0deg, transparent 0deg, transparent 200deg, var(--color-brand-200) 280deg, #ffffff 320deg, var(--color-brand-300) 345deg, transparent 360deg)";

export function Button({ href, children, variant = "primary", className, icon = true }: Props) {
  const primary = variant === "primary";
  return (
    <Magnetic>
      <Link
        href={href}
        className={cn(
          "group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-[box-shadow,border-color,background-color,color] duration-300",
          primary
            ? "bg-brand-500 text-white shadow-[0_10px_40px_-10px_rgba(63,109,255,0.8)] hover:shadow-[0_10px_50px_-6px_rgba(63,109,255,0.7)]"
            : "glass text-white hover:border-white/25 hover:bg-white/10",
          className,
        )}
      >
        {primary && (
          <>
            {/* Aylanuvchi konik chegara: faqat hoverda ko'rinadi va aylanadi */}
            <span aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -z-20 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span
                className="wow-spin block size-full rounded-full [animation-play-state:paused]! group-hover:[animation-play-state:running]!"
                style={{ "--wow-dur": "3s", backgroundImage: CONIC } as CSSProperties}
              />
            </span>
            {/* Ichki to'ldirish (chegara 1.5px ko'rinib turadi) */}
            <span aria-hidden className="pointer-events-none absolute inset-[1.5px] -z-10 rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-500" />
          </>
        )}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">{children}</span>
        {icon && <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </Link>
    </Magnetic>
  );
}
