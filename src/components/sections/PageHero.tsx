"use client";

import Link from "@/i18n/Link";
import { useContent } from "@/i18n/I18nProvider";
import { motion } from "motion/react";
import { ArrowRight2 } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { InViewPause } from "@/components/ui/InViewPause";
import { SpinRing } from "@/components/ui/SpinRing";
import { Orbit } from "@/components/ui/Orbit";

const ease = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  eyebrow,
  title,
  highlight,
  text,
  crumbs,
  from = "#6690ff",
  to = "#2b52f0",
  children,
  image,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  text?: string;
  crumbs: { label: string; href?: string }[];
  from?: string;
  to?: string;
  children?: React.ReactNode;
  image?: string;
}) {
  const { t, directions } = useContent();
  const orbitIcons = directions.slice(0, 8).map((d) => (
    <span key={d.slug} className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0b0d16]/80 text-brand-300">
      <d.icon className="h-5 w-5" />
    </span>
  ));
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-24 md:pt-44">
      {image && (
        <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 0.45, scale: 1 }} transition={{ duration: 1.6, ease }} className="absolute inset-0">
          <Photo id={image} alt={title} priority className="h-full w-full" />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#05060b_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05060b] to-transparent" />
      <div className="absolute inset-0 bg-grid mask-fade opacity-40" />
      <div className="absolute left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(63,109,255,0.3),transparent_70%)]" />
      <div className="absolute right-1/4 top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(43,82,240,0.28),transparent_70%)]" />
      {/* Sarlavha ortida sekin aylanuvchi halqalar + yo'nalish ikonkalari orbitasi (faqat transform) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
        className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
      >
        <InViewPause className="relative size-[640px] md:size-[820px]">
          <SpinRing sizes={[300, 440, 600]} duration={28} />
          <div className="absolute inset-0 hidden opacity-70 md:block">
            <Orbit radius={360} duration={70} items={orbitIcons} />
          </div>
        </InViewPause>
      </motion.div>
      <div className="container-x relative text-center">
        <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center justify-center gap-1.5 text-sm text-white/45">
          <Link href="/" className="hover:text-white">{t.pages.pageHero.home}</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ArrowRight2 className="h-3.5 w-3.5" />
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
            </span>
          ))}
        </motion.nav>
        <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em]" style={{ color: from }}>
          {eyebrow}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease }} className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {title}{" "}
          {highlight && (
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${to})` }}>
              {highlight}
            </span>
          )}
        </motion.h1>
        {text && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, ease }} className="mx-auto mt-6 max-w-2xl text-base text-white/60 md:text-lg">
            {text}
          </motion.p>
        )}
        {children && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease }} className="mt-9">{children}</motion.div>}
      </div>
    </section>
  );
}
