"use client";

import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown2, Global } from "@/components/ui/icons";
import { locales, localeMeta, isLocale, type Locale } from "@/i18n/config";
import { useContent, useLocale } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

function useSwitchLocale() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const current = useLocale();
  return (next: Locale) => {
    if (next === current) return;
    const parts = pathname.split("/");
    if (isLocale(parts[1])) parts[1] = next;
    else parts.splice(1, 0, next);
    let path = parts.join("/") || `/${next}`;
    if (path.endsWith("/") && path.length > 1) path = path.slice(0, -1);
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`;
    router.push(path + hash);
  };
}

/** Desktop: ixcham animatsiyali dropdown */
export function LanguageSwitcher({ className }: { className?: string }) {
  const c = useContent();
  const current = useLocale();
  const switchTo = useSwitchLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={c.t.layout.nav.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition",
          open ? "border-brand-400/60 bg-brand-500/15 text-white" : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/30 hover:text-white",
        )}
      >
        <Global className="h-[18px] w-[18px] text-brand-300" />
        {localeMeta[current].short}
        <ArrowDown2 className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute right-0 top-[calc(100%+8px)] z-50 min-w-[160px] origin-top-right rounded-2xl bg-[#090a14]/95 p-1.5 shadow-2xl"
          >
            {locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l === current}
                  lang={localeMeta[l].htmlLang}
                  onClick={() => {
                    setOpen(false);
                    switchTo(l);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition",
                    l === current ? "bg-white/[0.08] text-white" : "text-white/65 hover:bg-white/[0.05] hover:text-white",
                  )}
                >
                  {localeMeta[l].label}
                  <span className={cn("text-[11px] font-semibold tracking-wider", l === current ? "text-brand-300" : "text-white/35")}>{localeMeta[l].short}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobil menyu: 3 ta tugma */
export function LanguagePills({ className }: { className?: string }) {
  const c = useContent();
  const current = useLocale();
  const switchTo = useSwitchLocale();
  return (
    <div role="group" aria-label={c.t.layout.nav.language} className={cn("grid grid-cols-3 gap-2", className)}>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={localeMeta[l].htmlLang}
          aria-pressed={l === current}
          onClick={() => switchTo(l)}
          className={cn(
            "flex flex-col items-center gap-0.5 rounded-2xl py-3 text-sm font-semibold transition",
            l === current ? "bg-white text-black" : "glass text-white/75 hover:text-white",
          )}
        >
          <span>{localeMeta[l].short}</span>
          <span className={cn("text-[11px] font-medium", l === current ? "text-black/60" : "text-white/45")}>{localeMeta[l].label}</span>
        </button>
      ))}
    </div>
  );
}
