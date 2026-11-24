"use client";

import Link from "@/i18n/Link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown2, ArrowUpRight, Call, Close, Menu } from "@/components/ui/icons";
import { useContent } from "@/i18n/I18nProvider";
import { isLocale } from "@/i18n/config";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { LanguagePills, LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState(false);
  // Hover-intent: menyu darhol yopilmaydi, sichqoncha panelga yetib borishiga vaqt beriladi
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const scheduleClose = (ms = 280) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), ms);
  };
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);
  const [open, setOpen] = useState(false);
  const [logoKey, setLogoKey] = useState(0);
  const c = useContent();
  const { nav, site, directions, groups } = c;
  const t = c.t.layout.nav;
  const rawPath = usePathname() || "/";
  // Til prefiksini olib tashlash: "/ru/xizmatlar" -> "/xizmatlar"
  const seg = rawPath.split("/")[1];
  const pathname = isLocale(seg) ? rawPath.slice(seg.length + 1) || "/" : rawPath;
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 30);
    setHidden(v > prev && v > 500 && !open && !mega);
  });

  // Splash tugagach logo animatsiyasini qayta ijro etish
  useEffect(() => {
    const replay = () => setLogoKey((k) => k + 1);
    window.addEventListener("splash:done", replay);
    return () => window.removeEventListener("splash:done", replay);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5"
        onMouseLeave={() => scheduleClose(200)}
      >
        <div
          className={cn(
            "container-x flex h-16 items-center justify-between rounded-2xl transition-[background-color,border-color,box-shadow] duration-300",
            scrolled ? "glass border-white/10 bg-[#07080f]/[0.92] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]" : "border border-transparent",
          )}
        >
          <Link href="/" aria-label={site.name}>
            <Logo key={logoKey} />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) && !item.href.includes("#");
              return (
                <div key={item.href} onMouseEnter={() => (item.mega ? openMega() : scheduleClose(450))} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors xl:px-4",
                      active ? "text-white" : "text-white/60 hover:text-white",
                    )}
                  >
                    {active && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                    {item.label}
                    {item.mega && <ArrowDown2 className={cn("h-3.5 w-3.5 transition-transform", mega && "rotate-180")} />}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href={site.phoneHref}
              aria-label={site.phone}
              className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold text-white/80 transition hover:text-white xl:flex"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
                <span className="absolute inset-0 rounded-full bg-brand-400/30 animate-pulse-ring" />
                <Call className="h-4 w-4" />
              </span>
              <span className="hidden 2xl:inline">{site.phone}</span>
            </a>
            <Link
              href="/aloqa"
              className="hidden h-10 items-center whitespace-nowrap rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-brand-300 sm:inline-flex"
            >
              {t.cta}
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="glass flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
              aria-label={t.menu}
            >
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mega menyu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="container-x absolute inset-x-0 top-full hidden pt-3 lg:block"
              onMouseEnter={openMega}
              onMouseLeave={() => scheduleClose(200)}
            >
              <div className="glass grid grid-cols-3 gap-2 rounded-3xl bg-[#090a14] p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                {groups.map((g, gi) => (
                  <motion.div key={g.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.05 }} className="rounded-2xl p-2">
                    <div className="mb-1 flex items-center gap-2 px-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                      <span className="text-brand-400">{g.num}</span> {g.title}
                    </div>
                    {g.items.map((d) => (
                      <Link key={d.slug} href={`/xizmatlar/${d.slug}`} className="group flex items-center gap-3.5 rounded-xl p-3 transition hover:bg-white/[0.05]">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition group-hover:bg-brand-500 group-hover:text-white">
                          <d.icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1 text-sm font-semibold text-white">
                            {d.title}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-white/45">{d.short}</span>
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobil menyu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#05060b] px-6 pb-10 pt-28 lg:hidden"
          >
            <div className="absolute inset-0 -z-10 bg-grid mask-fade opacity-50" />
            <nav className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/5 py-4 font-display text-2xl font-semibold text-white">
                    {item.label}
                    <ArrowUpRight className="h-5 w-5 text-white/30" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 grid grid-cols-2 gap-2">
              {directions.map((d, i) => (
                <motion.div key={d.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.04 }}>
                  <Link href={`/xizmatlar/${d.slug}`} onClick={() => setOpen(false)} className="glass flex flex-col gap-2 rounded-2xl p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500">
                      <d.icon className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-sm font-medium text-white">{d.title}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
              <LanguagePills />
            </motion.div>
            <a href={site.phoneHref} className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-400 to-brand-500 py-4 font-semibold text-white">
              <Call className="h-4 w-4" /> {site.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
