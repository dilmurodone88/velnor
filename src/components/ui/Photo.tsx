"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { cn } from "@/lib/utils";

// data.ts dagi unsplash() bilan bir xil URL — lekin client bundle'ga butun data.ts tortilmasligi uchun shu yerda.
const buildUrl = (id: string, width: number, quality: number, gray: boolean) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}${gray ? "&sat=-100" : ""}`;

/**
 * Unsplash rasm — yagona ko'k "duotone" uslubida.
 * Rasm oq-qora qilinadi va ustidan brend rangi beriladi, shuning uchun sayt palitrasi buzilmaydi.
 * Custom loader orqali srcset/sizes ishlaydi: telefon kichik, katta ekran katta rasm yuklaydi.
 */
export function Photo({
  id,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority,
  tone = "duo",
  w = 1920,
}: {
  id: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "duo" | "dark" | "none";
  w?: number; // maksimal yuklanadigan kenglik (kichik kartalar uchun kamroq)
}) {
  const gray = tone !== "none";
  const loader = ({ src, width, quality }: ImageLoaderProps) => buildUrl(src, Math.min(width, w), quality ?? 70, gray);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        loader={loader}
        src={id}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
      {tone === "duo" && <div className="absolute inset-0 bg-brand-800/45" />}
      {tone === "duo" && <div className="absolute inset-0 bg-gradient-to-t from-[#05060b] via-[#05060b]/30 to-transparent" />}
      {tone === "dark" && <div className="absolute inset-0 bg-[#05060b]/70" />}
    </div>
  );
}
