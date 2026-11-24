"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { useContent } from "@/i18n/I18nProvider";
import { LogoMark } from "@/components/ui/Logo";
import { InViewPause } from "@/components/ui/InViewPause";
import { Orbit } from "@/components/ui/Orbit";

// Vaqt chizig'i: logo chiziladi (~1.5s) -> halqa impulsi + nur o'tishi -> 2.05s da aylana bo'lib yopiladi (0.5s).
const SPLASH_MS = 2050;
const SEEN_KEY = "splash-seen";
const EASE = [0.16, 1, 0.3, 1] as const;
const DONE = 1.5; // logo intro tugash payti (s)

function readSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) !== null;
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* storage bloklangan bo'lishi mumkin */
  }
}

const dur = (s: number) => ({ "--wow-dur": `${s}s` }) as CSSProperties;

// WOW splash: logo chiziladi, atrofida 8 yo'nalish ikonkasi qiya orbitada aylanadi,
// tugaganda halqa impulsi va nur o'tadi, so'ng aylana shaklida yopiladi. Sessiyada bir marta.
// Faqat transform/opacity animatsiyasi; chiqishda bir martalik clip-path.
export function Splash() {
  const { site, directions } = useContent();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (readSeen()) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      markSeen();
      setShow(false);
      window.dispatchEvent(new Event("splash:done"));
    }, SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  const icons = directions.slice(0, 8).map((d, i) => (
    <motion.span
      key={d.slug}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35 + i * 0.07, type: "spring", stiffness: 420, damping: 16 }}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-400/30 bg-[#0a0f24] text-brand-300"
    >
      <d.icon className="h-[18px] w-[18px]" />
    </motion.span>
  ));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          id="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#05060b]"
          style={{ clipPath: "circle(100% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)", transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }}
        >
          {/* Yumshoq fon nuri (filtrsiz radial gradient) */}
          <motion.div
            aria-hidden
            className="absolute h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(63,109,255,0.22),rgba(43,82,240,0.06)_45%,transparent_70%)]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0.7, 1], scale: [0.6, 1, 1, 1.08] }}
            transition={{ duration: DONE + 0.5, times: [0, 0.55, 0.75, 1], ease: EASE }}
          />

          <InViewPause className="relative flex flex-col items-center">
            <motion.div
              className="relative flex flex-col items-center"
              exit={{ scale: 1.15, opacity: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
            >
              <div className="relative flex h-[200px] w-[200px] items-center justify-center">
                {/* Qiya orbitada 8 yo'nalish ikonkasi */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 1, ease: EASE }}
                >
                  <Orbit radius={150} duration={16} tilt={64} items={icons} />
                </motion.div>

                {/* Sekin aylanuvchi uzuq halqa */}
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
                  className="absolute inset-0"
                >
                  <span className="wow-spin absolute inset-0 rounded-full border border-dashed border-brand-400/35" style={dur(14)} />
                </motion.span>

                {/* Tez, teskari nuqtali halqa */}
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
                  className="absolute inset-[22px]"
                >
                  <span className="wow-spin-rev absolute inset-0 rounded-full border-2 border-dotted border-brand-300/30" style={dur(3.2)}>
                    <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-300 shadow-[0_0_12px_#6690ff]" />
                    <span className="absolute -bottom-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-500" />
                  </span>
                </motion.span>

                {/* Logo tugaganda halqa impulsi */}
                {[0, 0.16].map((lag) => (
                  <motion.span
                    key={lag}
                    aria-hidden
                    className="absolute h-[120px] w-[120px] rounded-full border border-brand-300/70"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: [0, 0.8, 0], scale: [0.7, 1, 2.3] }}
                    transition={{ delay: DONE + lag, duration: 0.75, times: [0, 0.15, 1], ease: "easeOut" }}
                  />
                ))}

                <motion.div
                  className="relative"
                  animate={{ scale: [1, 1, 1.08, 1] }}
                  transition={{ duration: DONE + 0.45, times: [0, DONE / (DONE + 0.45), (DONE + 0.15) / (DONE + 0.45), 1], ease: "easeOut" }}
                >
                  <LogoMark className="relative h-[112px] w-[112px]" loop={false} />
                </motion.div>
              </div>

              {/* Brend nomi + nur o'tishi */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
                className="relative mt-4 overflow-hidden pl-[0.4em] font-display text-3xl font-bold tracking-[0.4em] text-white"
              >
                {site.name}
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-brand-200/60 to-transparent"
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "320%", opacity: [0, 1, 1, 0] }}
                  transition={{ delay: DONE - 0.05, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                />
              </motion.span>
            </motion.div>
          </InViewPause>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
