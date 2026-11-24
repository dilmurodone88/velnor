"use client";

import { motion } from "motion/react";
import { useContent } from "@/i18n/I18nProvider";
import type { CSSProperties } from "react";
import { InViewPause } from "@/components/ui/InViewPause";
import { Orbit } from "@/components/ui/Orbit";
import { RotatingBorder } from "@/components/ui/RotatingBorder";
import { SpinRing } from "@/components/ui/SpinRing";
import type { IconType } from "@/components/ui/icons";
import { Activity, CallCalling, Driver, Messages2, ShieldTick, TickCircle, User, VideoIcon, Wifi } from "@/components/ui/icons";

const ease = [0.16, 1, 0.3, 1] as const;

/* Hero va vizuallar uchun CSS animatsiyalar: kompozitorda ishlaydi, JS rAF'ni band qilmaydi.
   `.hv-paused` (Hero ko'rinmay qolganda) ichidagi barcha CSS animatsiyalarni to'xtatadi. */
const HERO_CSS = `
@keyframes hv-bar { 0%, 100% { transform: scaleY(var(--a)); } 50% { transform: scaleY(var(--b)); } }
@keyframes hv-eq { 0%, 100% { transform: scaleY(0.2); } 25% { transform: scaleY(1); } 50% { transform: scaleY(0.35); } 75% { transform: scaleY(0.8); } }
@keyframes hv-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes hv-blink-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
@keyframes hv-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes hv-dash { from { stroke-dashoffset: 34px; } to { stroke-dashoffset: 0; } }
@keyframes hv-draw { 0% { stroke-dashoffset: 1px; opacity: 0; } 3% { opacity: 1; } 40%, 80% { stroke-dashoffset: 0; } 97% { opacity: 1; } 100% { stroke-dashoffset: 1px; opacity: 0; } }
@keyframes hv-badge { 0%, 40% { opacity: 0; } 50%, 85% { opacity: 1; } 100% { opacity: 0; } }
@keyframes hv-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hv-fade-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
@keyframes hv-fade-up-sm { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes hv-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hv-slide { from { transform: translateX(0); } to { transform: translateX(100%); } }
@keyframes hv-float-rot { 0%, 100% { transform: translateY(0) rotate(-2.5deg); } 50% { transform: translateY(-12px) rotate(2.5deg); } }
.hv-bar { animation: hv-bar 2.5s ease-in-out infinite both; }
.hv-eq { animation: hv-eq 1.1s ease-in-out infinite both; }
.hv-blink { animation: hv-blink 1s ease-in-out infinite; }
.hv-blink-soft { animation: hv-blink-soft 1s ease-in-out infinite; }
.hv-bounce { animation: hv-bounce 0.6s ease-in-out infinite; }
.hv-dash { animation: hv-dash 1.4s linear infinite; }
.hv-draw { stroke-dasharray: 1px 1px; animation: hv-draw 3s ease-in-out infinite both; }
.hv-badge { animation: hv-badge 3s linear infinite both; }
.hv-progress { animation: hv-progress linear both; }
.hv-fade-up { animation: hv-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }
.hv-fade-up-sm { animation: hv-fade-up-sm 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.hv-fade { animation: hv-fade 0.6s ease-out both; }
.hv-slide { animation: hv-slide 1.6s linear infinite both; will-change: transform; }
.hv-float-rot { animation: hv-float-rot 6s ease-in-out infinite; will-change: transform; }
.hv-paused, .hv-paused * { animation-play-state: paused !important; }
`;

/** Hero animatsiya stillari (React 19 `<style href precedence>`: <head>'ga ko'tariladi va bir marta qo'shiladi). */
export function HeroStyles() {
  return (
    <style href="hero-visuals-css" precedence="medium">
      {HERO_CSS}
    </style>
  );
}

function Window({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <RotatingBorder
      radius="rounded-2xl"
      speed={7}
      className={`shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ${className}`}
      panelClassName="overflow-hidden bg-[#0a0c18]/[0.96]"
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-400/80" />
        <span className="ml-3 font-mono text-[11px] text-white/40">{title}</span>
      </div>
      {children}
    </RotatingBorder>
  );
}

function Float({ children, className, delay = 0 }: { children: React.ReactNode; className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.4 + delay, duration: 0.7, ease }}
      className={`absolute ${className}`}
    >
      {/* Suzish + yengil chayqalish (faqat transform) */}
      <div className="hv-float-rot" style={{ animationDelay: `${-delay * 4}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

const Chip = ({ children, color = "#6690ff" }: { children: React.ReactNode; color?: string }) => (
  <div className="glass flex items-center gap-2 rounded-xl bg-[#0b0d1a]/90 px-3.5 py-2.5 text-xs font-medium text-white shadow-xl">
    <span className="relative flex h-2 w-2">
      {/* Nuqta atrofida aylanuvchi mayda halqa */}
      <span className="wow-spin absolute -inset-1.5 rounded-full border border-dashed border-brand-300/50" style={{ "--wow-dur": "5s" } as CSSProperties} />
      <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
    </span>
    {children}
  </div>
);

/** Vizual ortidagi qiya orbitalar tizimi: yo'nalish ikonlari, porlovchi nuqtalar va halqalar.
 *  Faqat CSS transform aylanishi; ekrandan tashqarida InViewPause to'xtatadi. */
export function HeroOrbits({ icons, active }: { icons: IconType[]; active: number }) {
  const iconItems = icons.map((Icon, i) => (
    <span
      key={i}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-[opacity,scale] duration-500 ${
        i === active
          ? "scale-110 border-brand-300/60 bg-brand-500 text-white opacity-100 shadow-[0_0_24px_rgba(63,109,255,0.7)]"
          : "border-white/10 bg-[#0b0d1a] text-brand-300 opacity-70"
      }`}
    >
      <Icon className="h-5 w-5" />
    </span>
  ));
  const nodes = [0, 1, 2, 3, 4].map((i) => (
    <span key={i} className={`block rounded-full bg-brand-300 shadow-[0_0_12px_3px_rgba(102,144,255,0.65)] ${i % 2 ? "h-1.5 w-1.5" : "h-2.5 w-2.5"}`} />
  ));
  const sparks = [0, 1, 2].map((i) => <span key={i} className="block h-1.5 w-1.5 rounded-full bg-brand-200 shadow-[0_0_10px_2px_rgba(143,176,255,0.6)]" />);
  return (
    <InViewPause className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 scale-[0.55] sm:scale-[0.8] lg:scale-100">
        <SpinRing sizes={[380, 500, 640]} duration={26} />
      </div>
      <Orbit radius={330} duration={70} tilt={58} items={iconItems} className="scale-[0.55] sm:scale-[0.8] lg:scale-100" />
      <Orbit radius={250} duration={38} tilt={58} reverse ring={false} items={nodes} startAngle={20} className="scale-[0.55] sm:scale-[0.8] lg:scale-100" />
      <Orbit radius={190} duration={24} tilt={-48} items={sparks} startAngle={60} className="scale-[0.55] sm:scale-[0.8] lg:scale-100 opacity-70" />
    </InViewPause>
  );
}

/* 01 — Dasturlash */
function DevVisual() {
  const t = useContent().t.hero;
  const lines = [
    { t: "const", c: "text-brand-400", r: " app = createPlatform({" },
    { t: "  mobile", c: "text-brand-300", r: ": ['iOS', 'Android']," },
    { t: "  web", c: "text-brand-300", r: ": 'Next.js'," },
    { t: "  crm", c: "text-brand-300", r: ": true, bot: 'Telegram'," },
    { t: "  analytics", c: "text-brand-300", r: ": 'realtime'," },
    { t: "});", c: "text-white/70", r: "" },
    { t: "await", c: "text-brand-400", r: " app.deploy('k8s') // ✓ live" },
  ];
  return (
    <>
      <Window title="platform.ts" className="w-full">
        <div className="space-y-1.5 p-5 font-mono text-[12px] leading-relaxed sm:text-[13px]">
          {lines.map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.12, ease }} className="flex gap-4">
              <span className="w-4 select-none text-right text-white/20">{i + 1}</span>
              <span>
                <span className={l.c}>{l.t}</span>
                <span className="text-white/75">{l.r}</span>
              </span>
            </motion.div>
          ))}
          <span className="hv-blink ml-8 inline-block h-4 w-2 bg-brand-400" />
        </div>
      </Window>
      <Float className="-bottom-8 -left-4 sm:-left-10" delay={0.2}>
        <div className="glass w-36 rounded-[22px] bg-[#0b0d1a]/95 p-2 shadow-2xl">
          <div className="rounded-2xl bg-gradient-to-br from-brand-500/30 to-brand-600/30 p-3">
            <div className="mb-2 h-1.5 w-10 rounded-full bg-white/40" />
            {[70, 50, 85].map((w, i) => (
              <motion.div key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8 + i * 0.15, duration: 0.8 }} style={{ width: `${w}%` }} className="mb-1.5 h-6 origin-left rounded-lg bg-white/15" />
            ))}
            <div className="mt-2 h-7 rounded-lg bg-gradient-to-r from-brand-400 to-brand-500" />
          </div>
        </div>
      </Float>
      <Float className="-right-3 -top-6 sm:-right-8" delay={0.35}>
        <Chip color="#8fb0ff">{t.devBuild}</Chip>
      </Float>
    </>
  );
}

/* 02 — AI */
function AiVisual() {
  const t = useContent().t.hero;
  const msgs = t.aiMsgs.map((text, i) => ({ me: i % 2 === 0, text }));
  return (
    <>
      <Window title="AI Assistant · online" className="w-full">
        <div className="space-y-3 p-5">
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.45, ease }}
              className={`flex items-end gap-2 ${m.me ? "justify-end" : ""}`}
            >
              {!m.me && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600">
                  <Messages2 className="h-4 w-4 text-white" />
                </span>
              )}
              <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${m.me ? "rounded-br-sm bg-white/10 text-white" : "rounded-bl-sm bg-gradient-to-br from-brand-600/80 to-brand-700/80 text-white"}`}>
                {m.text}
              </div>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="flex gap-1 pl-9">
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ animationDelay: `${i * 0.15}s` }} className="hv-bounce h-2 w-2 rounded-full bg-brand-400" />
            ))}
          </motion.div>
        </div>
      </Window>
      <Float className="-right-3 -top-6 sm:-right-8" delay={0.3}>
        <Chip color="#8fb0ff">{t.aiResponseTime}</Chip>
      </Float>
      <Float className="-bottom-6 -left-3 sm:-left-8" delay={0.5}>
        <Chip color="#8fb0ff">{t.aiLead}</Chip>
      </Float>
    </>
  );
}

/* 03 — Tizim administratorligi */
function SysVisual() {
  const t = useContent().t.hero;
  const rows = [
    { name: "FortiGate-100F", ip: "10.0.0.1", icon: ShieldTick, load: 34 },
    { name: "Kerio Control", ip: "10.0.0.2", icon: ShieldTick, load: 21 },
    { name: "SRV-DC01 · AD", ip: "10.0.1.10", icon: Driver, load: 58 },
    { name: "Proxmox-Node2", ip: "10.0.1.20", icon: Driver, load: 72 },
    { name: "MikroTik CCR", ip: "10.0.0.254", icon: Wifi, load: 40 },
  ];
  return (
    <>
      <Window title="zabbix · dashboard" className="w-full">
        <div className="p-4">
          <div className="mb-3 flex h-20 items-end gap-1">
            {Array.from({ length: 34 }).map((_, i) => (
              <div
                key={i}
                className={`hv-bar h-full flex-1 origin-bottom rounded-t bg-gradient-to-t from-brand-500/40 to-brand-400 ${i >= 20 ? "hidden sm:block" : ""}`}
                style={
                  {
                    "--a": (20 + ((i * 37) % 70)) / 100,
                    "--b": (30 + ((i * 53) % 65)) / 100,
                    animationDelay: `${i * 0.04}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="space-y-1.5">
            {rows.map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1, ease }} className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2 text-[12px]">
                <r.icon className="h-4 w-4 text-brand-400" />
                <span className="flex-1 font-medium text-white">{r.name}</span>
                <span className="hidden font-mono text-white/35 sm:block">{r.ip}</span>
                <div className="h-1.5 w-14 overflow-hidden rounded-full bg-white/10">
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6 + i * 0.1, duration: 1 }} style={{ width: `${r.load}%` }} className="h-full origin-left rounded-full bg-gradient-to-r from-brand-400 to-brand-400" />
                </div>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-brand-400" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Window>
      <Float className="-right-3 -top-6 sm:-right-8" delay={0.3}>
        <Chip color="#8fb0ff">Uptime 99.98%</Chip>
      </Float>
      <Float className="-bottom-6 -left-3 sm:-left-8" delay={0.5}>
        <Chip color="#f87171">{t.sysBlocked}</Chip>
      </Float>
    </>
  );
}

/* 04 — Videokuzatuv */
function CamVisual() {
  const t = useContent().t.hero;
  const boxes = [
    { l: "12%", t: "30%", w: "20%", h: "52%", label: t.camEmployee, c: "#8fb0ff" },
    { l: "44%", t: "26%", w: "18%", h: "56%", label: t.camGuest, c: "#8fb0ff" },
    { l: "70%", t: "52%", w: "24%", h: "26%", label: "01 A 777 AA", c: "#6690ff" },
  ];
  return (
    <>
      <Window title={t.camTitle} className="w-full">
        <div className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(ellipse_at_top,#1e293b,#020617)]">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-800/70 to-transparent" />
          {boxes.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.35, ease }}
              className="absolute rounded-md border-2"
              style={{ left: b.l, top: b.t, width: b.w, height: b.h, borderColor: b.c, boxShadow: `0 0 20px ${b.c}55` }}
            >
              <span className="absolute -top-6 left-0 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] font-bold text-black" style={{ background: b.c }}>
                {b.label}
              </span>
              {i < 2 && <User className="absolute inset-0 m-auto h-1/2 w-1/2 text-white/25" />}
            </motion.div>
          ))}
          <div className="pointer-events-none absolute inset-0 animate-scan"><div className="h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent shadow-[0_0_14px_#6690ff]" /></div>
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
            <span className="hv-blink-soft h-1.5 w-1.5 rounded-full bg-white" />
            REC
          </div>
          <div className="absolute bottom-3 right-3 font-mono text-[10px] text-white/60">2026-11-24 · 14:32:07</div>
        </div>
      </Window>
      <Float className="-right-3 -top-6 sm:-right-8" delay={0.3}>
        <Chip color="#8fb0ff">
          <VideoIcon className="h-3.5 w-3.5" /> {t.camOnline}
        </Chip>
      </Float>
      <Float className="-bottom-6 -left-3 sm:-left-8" delay={0.5}>
        <Chip color="#6690ff">{t.camFace}</Chip>
      </Float>
    </>
  );
}

/* 05 — IP telefoniya */
function PhoneVisual() {
  const t = useContent().t.hero;
  const ops = t.phoneOps.map((o) => ({ ...o, c: "#8fb0ff" }));
  return (
    <>
      <Window title="Asterisk · Call-center" className="w-full">
        <div className="p-5">
          <div className="mb-4 flex items-center gap-4 rounded-xl bg-gradient-to-r from-brand-600/30 to-brand-600/30 p-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-500">
              <span className="absolute inset-0 rounded-full bg-brand-400 animate-pulse-ring" />
              <CallCalling className="relative h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{t.phoneIncoming}</div>
              <div className="font-mono text-xs text-white/60">{t.phoneIvr}</div>
            </div>
            <div className="flex h-8 items-center gap-0.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.07}s` }} className="hv-eq h-full w-1 origin-center rounded-full bg-brand-300" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ops.map((o, i) => (
              <motion.div key={o.n} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="rounded-xl bg-white/[0.04] p-3">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-white">
                  <span className="h-2 w-2 rounded-full" style={{ background: o.c, boxShadow: `0 0 8px ${o.c}` }} />
                  {o.n}
                </div>
                <div className="mt-1 text-[11px] text-white/45">{o.s}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Window>
      <Float className="-right-3 -top-6 sm:-right-8" delay={0.3}>
        <Chip color="#8fb0ff">{t.phoneToday}</Chip>
      </Float>
      <Float className="-bottom-6 -left-3 sm:-left-8" delay={0.5}>
        <Chip color="#8fb0ff">
          <TickCircle className="h-3.5 w-3.5" /> {t.phoneLost}
        </Chip>
      </Float>
    </>
  );
}

/* 06 — Tarmoq */
function NetVisual() {
  const t = useContent().t.hero;
  const nodes = [
    { x: 50, y: 18, l: t.netInternet },
    { x: 50, y: 45, l: "Core" },
    { x: 18, y: 78, l: t.netFloor },
    { x: 50, y: 82, l: t.netServer },
    { x: 82, y: 78, l: "Wi-Fi" },
  ];
  const links = [[0, 1], [1, 2], [1, 3], [1, 4]];
  return (
    <>
      <Window title="network · topology" className="w-full">
        <div className="relative aspect-[16/11]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {links.map(([a, b], i) => (
              <g key={i}>
                <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                <line
                  x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
                  stroke="url(#ng)" strokeWidth="0.9" strokeDasharray="4 30"
                  className="hv-dash"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              </g>
            ))}
            <defs>
              <linearGradient id="ng" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100"><stop stopColor="#6690ff" /><stop offset="1" stopColor="#3f6dff" /></linearGradient>
            </defs>
          </svg>
          {nodes.map((n, i) => (
            <motion.div
              key={n.l}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.12, type: "spring" }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-500 shadow-[0_0_24px_rgba(63,109,255,0.6)]">
                {i === 4 ? <Wifi className="h-5 w-5 text-white" /> : i === 3 ? <Driver className="h-5 w-5 text-white" /> : <Activity className="h-5 w-5 text-white" />}
              </span>
              <span className="rounded bg-black/50 px-1.5 text-[10px] font-medium text-white/80">{n.l}</span>
            </motion.div>
          ))}
        </div>
      </Window>
      <Float className="-right-3 -top-6 sm:-right-8" delay={0.3}>
        <Chip color="#3f6dff">10 Gbit/s backbone</Chip>
      </Float>
      <Float className="-bottom-6 -left-3 sm:-left-8" delay={0.5}>
        <Chip color="#6690ff">{t.netPorts}</Chip>
      </Float>
    </>
  );
}

/* 07 — Smart ofis: barmoq izi */
function SmartVisual() {
  const t = useContent().t.hero;
  const times = ["08:52", "08:57", "09:04", "09:11"];
  const logs = t.smartLogs.map((l, i) => ({ ...l, t: times[i], ok: i < 3 }));
  return (
    <>
      <Window title={t.smartTitle} className="w-full">
        <div className="grid gap-5 p-5 sm:grid-cols-[150px_1fr]">
          <div className="relative mx-auto flex h-[190px] w-[150px] flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] ring-1 ring-white/10">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 64 64" className="h-full w-full text-white/15">
                {[10, 15, 20, 25].map((r, i) => (
                  <path key={i} d={`M ${32 - r} 40 A ${r} ${r + 4} 0 0 1 ${32 + r} 40`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                ))}
                <path d="M32 24 V 52" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full text-brand-400">
                {[10, 15, 20, 25].map((r, i) => (
                  <path
                    key={i}
                    d={`M ${32 - r} 40 A ${r} ${r + 4} 0 0 1 ${32 + r} 40`}
                    pathLength={1}
                    fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                    className="hv-draw"
                    style={{ animationDelay: `${0.3 + i * 0.12}s` }}
                  />
                ))}
              </svg>
              <div className="pointer-events-none absolute inset-0 animate-scan"><div className="h-0.5 rounded-full bg-brand-300 shadow-[0_0_12px_#6690ff]" /></div>
            </div>
            <div className="hv-badge mt-3 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold text-white">
              {t.smartDoor}
            </div>
          </div>
          <div className="space-y-2">
            <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-widest text-white/40">
              <span>{t.smartJournal}</span>
              <span className="font-mono">42 / 45</span>
            </div>
            {logs.map((l, i) => (
              <motion.div key={l.n} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15, ease }} className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2.5 text-[12px]">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full ${l.ok ? "bg-brand-500/20 text-brand-300" : "bg-white/10 text-white/50"}`}>
                  <User className="h-3.5 w-3.5" />
                </span>
                <span className="flex-1 font-medium text-white">{l.n}</span>
                <span className="font-mono text-white/40">{l.t}</span>
                <span className={l.ok ? "text-brand-300" : "text-red-400"}>{l.s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Window>
      <Float className="-right-3 -top-6 sm:-right-8" delay={0.3}>
        <Chip>Face ID · 0.2 s</Chip>
      </Float>
      <Float className="-bottom-6 -left-3 sm:-left-8" delay={0.5}>
        <Chip color="#8fb0ff">{t.smartAttendance}</Chip>
      </Float>
    </>
  );
}

/* 08 — Bank tizimlari: ABS integratsiya va migratsiya */
function BankVisual() {
  const t = useContent().t.hero;
  const left = ["iABS", "FlexFin", "Ensay"];
  const right = [t.bankMobile, "CRM", "Humo / Uzcard"];
  return (
    <>
      <Window title="integration-gateway · prod" className="w-full">
        <div className="p-5">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="space-y-2">
              {left.map((n, i) => (
                <motion.div key={n} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1, ease }} className="rounded-lg bg-white/[0.05] px-3 py-2 text-center text-[12px] font-semibold text-white ring-1 ring-white/10">
                  {n}
                </motion.div>
              ))}
            </div>
            <div className="relative flex h-full w-20 flex-col items-center justify-center sm:w-24">
              <div className="absolute inset-y-2 left-0 right-0 flex flex-col justify-around">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="relative h-px bg-white/10">
                    <div className="hv-slide absolute inset-0" style={{ animationDelay: `${i * 0.4}s` }}>
                      <span className="absolute -top-[2px] left-0 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-brand-300" />
                    </div>
                  </div>
                ))}
              </div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} className="relative z-10 rounded-xl bg-brand-500 px-2.5 py-2 text-center text-[10px] font-bold leading-tight text-white shadow-[0_8px_24px_-6px_rgba(63,109,255,0.9)]">
                API
                <br />
                Gateway
              </motion.div>
            </div>
            <div className="space-y-2">
              {right.map((n, i) => (
                <motion.div key={n} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1, ease }} className="rounded-lg bg-white/[0.05] px-3 py-2 text-center text-[12px] font-semibold text-white ring-1 ring-white/10">
                  {n}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-white">{t.bankMigration}</span>
              <span className="font-mono text-brand-300">12.4M</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full w-full origin-left rounded-full bg-brand-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 2.4, ease: [0.65, 0, 0.35, 1] }} />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-white/45">
              <span>checksum ✓</span>
              <span>{t.bankRollback}</span>
            </div>
          </div>
        </div>
      </Window>
      <Float className="-right-3 -top-6 sm:-right-8" delay={0.3}>
        <Chip>{t.bankNda}</Chip>
      </Float>
      <Float className="-bottom-6 -left-3 sm:-left-8" delay={0.5}>
        <Chip color="#8fb0ff">{t.bankLost}</Chip>
      </Float>
    </>
  );
}

export const heroVisuals = [DevVisual, AiVisual, SysVisual, CamVisual, PhoneVisual, NetVisual, SmartVisual, BankVisual];
