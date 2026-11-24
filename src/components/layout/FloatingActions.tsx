"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { ArrowUp, Call } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { TelegramIcon } from "@/components/ui/SocialIcons";

export function FloatingActions() {
  const c = useContent();
  const { site } = c;
  const t = c.t.layout.floating;
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 600));

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="glass flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-white/15"
            aria-label={t.toTop}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a
        href={site.socials.telegram}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.1 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_10px_30px_-5px_rgba(63,109,255,0.7)]"
        aria-label="Telegram"
      >
        <TelegramIcon className="h-5 w-5" />
      </motion.a>
      <motion.a
        href={site.phoneHref}
        whileHover={{ scale: 1.1 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_10px_30px_-5px_rgba(63,109,255,0.8)]"
        aria-label={t.call}
      >
        <span className="absolute inset-0 rounded-full bg-brand-400 animate-pulse-ring" />
        <span className="relative inline-flex animate-ring-wiggle">
          <Call variant="Bold" className="h-5 w-5" />
        </span>
      </motion.a>
    </div>
  );
}
