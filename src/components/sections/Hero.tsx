"use client";

import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Star } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";
import { HeroOrbits, HeroStyles, heroVisuals } from "./HeroVisuals";
import { Photo } from "@/components/ui/Photo";

const DURATION = 6500;
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const c = useContent();
  const { directions } = c;
  const t = c.t.hero;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  // Hero ko'rinmay qolganda slayder taymeri va barcha CSS animatsiyalar to'xtaydi
  const inView = useInView(ref, { initial: true });
  const running = !paused && inView;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Pauza paytida qolgan vaqt saqlanadi (progress bar bilan sinxron)
  const remaining = useRef(DURATION);

  useEffect(() => {
    remaining.current = DURATION;
  }, [active]);

  useEffect(() => {
    if (!running) return;
    const start = performance.now();
    const id = setTimeout(() => setActive((a) => (a + 1) % directions.length), remaining.current);
    return () => {
      clearTimeout(id);
      remaining.current = Math.max(0, remaining.current - (performance.now() - start));
    };
  }, [active, running, directions.length]);

  const d = directions[active];
  const Visual = heroVisuals[active];
  const orbitIcons = useMemo(() => directions.map((x) => x.icon), [directions]);

  return (
    <section ref={ref} className={`relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 md:pb-32 md:pt-36 ${inView ? "" : "hv-paused"}`}>
      <HeroStyles />
      {/* Fon: yo'nalishga mos banner rasm */}
      <AnimatePresence>
        <motion.div
          key={d.image}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.32 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease }}
        >
          <Photo id={d.image} alt={d.title} className="h-full w-full" priority={active === 0} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-[#05060b] via-[#05060b]/85 to-[#05060b]/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05060b] to-transparent" />
      <div className="absolute inset-0 bg-grid mask-fade opacity-50" />
      <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(63,109,255,0.28),transparent_65%)]" />
      <div className="absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(43,82,240,0.25),transparent_65%)]" />
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
      <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-white/[0.06]" />

      <motion.div style={{ opacity }} className="container-x relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        {/* Matn */}
        <div>
          <div
            style={{ animationDelay: "0.2s" }}
            className="hv-fade-up-sm glass inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-xs text-white/70"
          >
            <span className="rounded-full bg-gradient-to-r from-brand-400 to-brand-500 px-2.5 py-1 font-semibold text-white">{t.badgeNew}</span>
            {t.badgeText}
          </div>

          <h1 className="mt-7 font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]">
            <span className="hv-fade-up block" style={{ animationDelay: "0.3s" }}>
              {t.titleTop}
            </span>
            <span className="relative block h-[1.25em] overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={d.slug}
                  className="absolute inset-x-0 block whitespace-nowrap bg-clip-text pb-1 text-[0.85em] text-transparent sm:text-[1em]"
                  style={{ backgroundImage: `linear-gradient(90deg, ${d.from}, ${d.to})` }}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.75, ease }}
                >
                  {d.heroWord}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="hv-fade-up block text-white/90" style={{ animationDelay: "0.45s" }}>
              {t.titleBottom}
            </span>
          </h1>

          {/* Barcha tavsiflar bitta grid katakda: balandlik doim eng uzuniga teng, sakrash yo'q */}
          <div className="mt-6 grid max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            {directions.map((item, i) => (
              <p
                key={item.slug}
                aria-hidden={i !== active}
                className={`[grid-area:1/1] transition-[opacity,transform] duration-500 ${i === active ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-2 opacity-0"}`}
              >
                {item.description}
              </p>
            ))}
          </div>

          <div style={{ animationDelay: "0.6s" }} className="hv-fade-up-sm mt-8 flex flex-wrap gap-3">
            <Button href="/aloqa">{t.ctaPrimary}</Button>
            <Button href={`/xizmatlar/${d.slug}`} variant="ghost">
              {t.ctaMore}
            </Button>
          </div>

          <div style={{ animationDelay: "0.8s" }} className="hv-fade mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["#6690ff", "#2b52f0", "#3f6dff", "#2340cc"].map((col, i) => (
                <span key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#05060b] text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${col}, #101a45)` }}>
                  {["AK", "DR", "JT", "MY"][i]}
                </span>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-brand-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="mt-0.5 text-sm text-white/55">{t.trust}</div>
            </div>
          </div>
        </div>

        {/* Vizual banner */}
        <div className="relative isolate flex min-h-[500px] items-center sm:min-h-[460px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(63,109,255,0.18),transparent_70%)]" />
          {/* Qiya orbitalar tizimi: yo'nalish ikonlari va porlovchi nuqtalar aylanadi */}
          <HeroOrbits icons={orbitIcons} active={active} />
          <AnimatePresence mode="wait">
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.97 }}
              transition={{ duration: 0.7, ease }}
              style={{ transformPerspective: 1200 }}
              className="relative mx-auto w-full max-w-[540px]"
            >
              <Visual />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Slayder tablari */}
      <div className="absolute inset-x-0 bottom-6 hidden md:block">
        <div className="container-x">
          <div className="grid grid-cols-8 gap-2">
            {directions.map((item, i) => (
              <button key={item.slug} onClick={() => setActive(i)} className="group text-left">
                <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
                  {i === active ? (
                    <div
                      key={active}
                      className="hv-progress h-full w-full origin-left rounded-full bg-brand-500"
                      style={{ animationDuration: `${DURATION}ms`, animationPlayState: running ? "running" : "paused" }}
                    />
                  ) : (
                    <div className={`h-full ${i < active ? "w-full bg-white/25" : "w-0"}`} />
                  )}
                </div>
                <div className={`mt-2.5 flex items-center gap-2 text-xs font-medium transition ${i === active ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
                  <span className="font-mono">{item.num}</span>
                  <span className="truncate">{item.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
