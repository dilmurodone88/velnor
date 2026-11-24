"use client";

import Link from "@/i18n/Link";
import { useContent } from "@/i18n/I18nProvider";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CallCalling,
  Driver,
  FingerScan,
  Global,
  LampCharge,
  Monitor,
  Teacher,
  TickCircle,
  VideoIcon,
  type IconType,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Orbit } from "@/components/ui/Orbit";

type Zone = {
  id: ZoneId;
  icon: IconType;
  x: number; // 0..100
  y: number; // 0..60
  href: string;
};

type ZoneId = "gateway" | "server" | "lab" | "call" | "meeting" | "office" | "entry" | "cctv";

const zoneBase: Zone[] = [
  { id: "gateway", icon: Global, x: 5, y: 14, href: "/xizmatlar/tizim-administratorlik" },
  { id: "server", icon: Driver, x: 21, y: 14, href: "/xizmatlar/tizim-administratorlik" },
  { id: "lab", icon: Teacher, x: 44, y: 15, href: "/xizmatlar/tarmoq-autsorsing" },
  { id: "call", icon: CallCalling, x: 68, y: 15, href: "/xizmatlar/ip-telefoniya" },
  { id: "meeting", icon: LampCharge, x: 87, y: 15, href: "/xizmatlar/smart-ofis" },
  { id: "office", icon: Monitor, x: 40, y: 42, href: "/xizmatlar/tarmoq-autsorsing" },
  { id: "entry", icon: FingerScan, x: 84, y: 44, href: "/xizmatlar/smart-ofis" },
  { id: "cctv", icon: VideoIcon, x: 70, y: 29, href: "/xizmatlar/videokuzatuv" },
];

const cams = [
  [13.5, 5.5],
  [94.5, 5.5],
  [13.5, 54.5],
  [70, 29],
  [94.5, 54.5],
];

const ease = [0.16, 1, 0.3, 1] as const;

export function OfficeMap() {
  const c = useContent();
  const t = c.t.showcase.officeMap;
  const zones = zoneBase.map((b) => ({ ...b, ...t.zones[b.id] }));
  const [active, setActive] = useState(1);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  // Cheksiz animatsiyalar faqat bo'lim ekranda (yoki yaqin) bo'lganda ishlaydi
  const live = useInView(ref, { margin: "100px" });
  const still = { duration: 0 } as const;

  useEffect(() => {
    if (hover || !inView || !live) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % zoneBase.length), 4500);
    return () => clearTimeout(id);
  }, [active, hover, inView, live]);

  const z = zones[active];
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: inView ? { pathLength: 1, opacity: 1 } : {},
    transition: { duration: 1.4, delay, ease: "easeInOut" as const },
  });

  return (
    <section id="ofis" className="relative py-24 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          highlight={t.highlight}
          text={t.text}
        />

        <div ref={ref} className="grid gap-6 lg:grid-cols-[1.6fr_1fr]" onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)} onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}>
          {/* Xarita */}
          <div className="glass relative flex items-center overflow-hidden rounded-3xl bg-[#080a14]/80 p-3 md:p-5">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="relative aspect-[100/60] w-full">
              <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="om-line" x1="0" x2="1">
                    <stop stopColor="#8fb0ff" />
                    <stop offset="1" stopColor="#3f6dff" />
                  </linearGradient>
                </defs>

                {/* Bino va xonalar */}
                <motion.rect x="12" y="4" width="84" height="52" rx="1.5" fill="rgba(63,109,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.35" {...draw(0)} />
                {[
                  "M30 4 V24 H12",
                  "M58 4 V26",
                  "M78 4 V26",
                  "M30 26 H96",
                  "M72 26 V56",
                ].map((d, i) => (
                  <motion.path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.3" {...draw(0.3 + i * 0.12)} />
                ))}
                {/* Eshik */}
                <motion.path d="M96 46 A 5 5 0 0 0 91 51" fill="none" stroke="rgba(143,176,255,0.6)" strokeWidth="0.3" strokeDasharray="0.8 0.8" {...draw(1)} />

                {/* Server stoykalari */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.rect key={i} x={15 + i * 3.6} y="8" width="2.6" height="12" rx="0.4" fill="rgba(63,109,255,0.18)" stroke="rgba(143,176,255,0.5)" strokeWidth="0.2" initial={{ opacity: 0, y: 2 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 + i * 0.08 }} />
                ))}
                {[0, 1, 2, 3].map((i) => (
                  <motion.g key={`led${i}`} fill="#8fb0ff" initial={{ opacity: 0.6 }} animate={live ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.6 }} transition={live ? { duration: 1 + (i % 3) * 0.4, repeat: Infinity, delay: i * 0.25 } : still}>
                    {[0, 1, 2, 3, 4].map((k) => (
                      <circle key={k} cx={16.3 + i * 3.6} cy={9.5 + k * 2.2} r="0.35" />
                    ))}
                  </motion.g>
                ))}

                {/* Kompyuter xona — qatorlar */}
                {Array.from({ length: 3 }).map((_, r) =>
                  Array.from({ length: 6 }).map((_, c) => (
                    <motion.rect key={`l${r}${c}`} x={33 + c * 4} y={9 + r * 5} width="2.8" height="2" rx="0.3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.15" initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1 + (r * 6 + c) * 0.025 }} />
                  )),
                )}

                {/* Call-markaz */}
                {Array.from({ length: 2 }).map((_, r) =>
                  Array.from({ length: 3 }).map((_, c) => (
                    <motion.circle key={`c${r}${c}`} cx={62 + c * 6} cy={11 + r * 8} r="1.3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.15" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 + (r * 3 + c) * 0.05 }} />
                  )),
                )}

                {/* Majlislar stoli */}
                <motion.rect x="81" y="10" width="12" height="9" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.2" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }} />

                {/* Ochiq ofis stollari */}
                {Array.from({ length: 3 }).map((_, r) =>
                  Array.from({ length: 6 }).map((_, c) => (
                    <motion.rect key={`o${r}${c}`} x={16 + c * 9} y={31 + r * 8} width="6" height="3.4" rx="0.4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.15" initial={{ opacity: 0, y: 1 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.2 + (r * 6 + c) * 0.02 }} />
                  )),
                )}

                {/* Turniket */}
                {[0, 1].map((i) => (
                  <motion.rect key={i} x={80 + i * 5} y="48" width="1" height="5" rx="0.3" fill="#3f6dff" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }} />
                ))}

                {/* Ma'lumot oqimi: internet → server → xonalar */}
                {zones
                  .filter((x) => x.id !== "server")
                  .map((x, i) => {
                    const srv = zones[1];
                    // Koridor (y=25) bo'ylab kabel trassasi
                    const d = x.id === "gateway" ? `M${x.x} ${x.y} L${srv.x} ${srv.y}` : `M${srv.x} ${srv.y} V25 H${x.x} V${x.y}`;
                    const on = z.id === x.id || z.id === "server" || (z.id === "gateway" && x.id === "gateway");
                    return (
                      <g key={x.id}>
                        <path d={d} fill="none" stroke="rgba(143,176,255,0.12)" strokeWidth="0.3" />
                        <motion.path
                          d={d}
                          fill="none"
                          stroke="url(#om-line)"
                          strokeWidth={on ? 0.6 : 0.35}
                          strokeLinecap="round"
                          strokeDasharray="1.5 6"
                          animate={{ strokeDashoffset: live ? [7.5, 0] : 0, opacity: on ? 1 : 0.35 }}
                          transition={{ strokeDashoffset: live ? { duration: 0.9, repeat: Infinity, ease: "linear", delay: i * 0.1 } : still, opacity: { duration: 0.4 } }}
                        />
                      </g>
                    );
                  })}

                {/* Kameralar */}
                {cams.map(([cx, cy], i) => (
                  <g key={i}>
                    <motion.path
                      d={`M${cx} ${cy} l${cx > 50 ? -7 : 7} ${cy > 30 ? -4 : 4} l${cx > 50 ? 2 : -2} ${cy > 30 ? -3 : 3} Z`}
                      fill="rgba(63,109,255,0.18)"
                      animate={{ opacity: live ? (z.id === "cctv" ? [0.4, 1, 0.4] : [0.1, 0.35, 0.1]) : z.id === "cctv" ? 0.7 : 0.2 }}
                      transition={live ? { duration: 2, repeat: Infinity, delay: i * 0.3 } : still}
                    />
                    <circle cx={cx} cy={cy} r="0.8" fill="#8fb0ff" />
                  </g>
                ))}

                {/* Wi-Fi to'lqinlari */}
                {[0, 1, 2].map((i) => (
                  <motion.circle key={i} cx="40" cy="42" r="2" fill="none" stroke="#6690ff" strokeWidth="0.25" initial={{ scale: 0.5, opacity: 0 }} animate={live ? { scale: [0.5, 6], opacity: [0.8, 0] } : { scale: 0.5, opacity: 0 }} transition={live ? { duration: 3, repeat: Infinity, delay: i, ease: "easeOut" } : still} />
                ))}

                {/* Internet buluti */}
                <motion.circle cx="5" cy="14" r="3.6" fill="rgba(63,109,255,0.15)" stroke="#6690ff" strokeWidth="0.3" animate={live ? { scale: [1, 1.15, 1] } : { scale: 1 }} transition={live ? { duration: 2.4, repeat: Infinity } : still} />
              </svg>

              {/* Nuqtalar */}
              {zones.map((x, i) => {
                const on = i === active;
                return (
                  <motion.button
                    key={x.id}
                    onClick={() => setActive(i)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 1.5 + i * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x.x}%`, top: `${(x.y / 60) * 100}%` }}
                    aria-label={x.title}
                  >
                    {on && live && <span className="absolute inset-0 rounded-full bg-brand-500/50 animate-pulse-ring" />}
                    {/* Faol nuqta atrofida aylanuvchi nuqtalar halqasi (faqat bo'lim ekranda bo'lganda) */}
                    {on && live && (
                      <Orbit
                        radius={27}
                        duration={6}
                        className="scale-90 md:scale-100"
                        items={[
                          <span key="a" className="block h-1.5 w-1.5 rounded-full bg-brand-200" />,
                          <span key="b" className="block h-1 w-1 rounded-full bg-brand-400" />,
                          <span key="c" className="block h-1 w-1 rounded-full bg-brand-300/80" />,
                        ]}
                      />
                    )}
                    <span
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 md:h-10 md:w-10 ${
                        on ? "scale-110 border-brand-300 bg-brand-500 text-white shadow-[0_0_30px_rgba(63,109,255,0.9)]" : "border-white/20 bg-[#0b0d1a]/90 text-brand-300 hover:border-brand-400 hover:text-white"
                      }`}
                    >
                      <x.icon className="h-4 w-4 md:h-5 md:w-5" />
                    </span>
                    <span
                      className={`pointer-events-none absolute left-1/2 top-full mt-1.5 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/85 px-2 py-0.5 text-[10px] font-medium transition md:block ${
                        on ? "text-white" : "text-white/60 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {x.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Tafsilot paneli */}
          <div className="glass relative flex min-h-[480px] flex-col overflow-hidden rounded-3xl bg-[#080a14]/80 p-7 md:min-h-[460px]">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(63,109,255,0.32),transparent_70%)]" />
            <div className="relative mb-6 flex gap-1.5">
              {zones.map((x, i) => (
                <button key={x.id} onClick={() => setActive(i)} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10" aria-label={x.title}>
                  {i === active && (
                    <motion.span key={`${active}-${hover}`} className="block h-full w-full origin-left bg-brand-400" initial={{ scaleX: hover ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: hover ? 0 : 4.5, ease: "linear" }} />
                  )}
                  {i < active && <span className="block h-full w-full bg-white/25" />}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={z.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease }} className="relative flex flex-1 flex-col">
                <div className="flex items-center gap-4">
                  <motion.span initial={{ rotate: -20, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-[0_12px_30px_-8px_rgba(63,109,255,0.9)]">
                    <z.icon className="h-7 w-7" />
                  </motion.span>
                  <div>
                    <div className="font-mono text-xs text-white/40">
                      {String(active + 1).padStart(2, "0")} / {String(zones.length).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">{z.title}</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/60">{z.desc}</p>
                <ul className="mt-6 space-y-3">
                  {z.items.map((it, i) => (
                    <motion.li key={it} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }} className="flex items-start gap-3 text-sm text-white/85">
                      <TickCircle className="mt-px h-5 w-5 shrink-0 text-brand-400" />
                      {it}
                    </motion.li>
                  ))}
                </ul>
                <Link href={z.href} className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-brand-300 hover:text-white">
                  {t.servicePage}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
