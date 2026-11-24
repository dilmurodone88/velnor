"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "./config";
import { getContent, type Content } from "./content";

const Ctx = createContext<Locale>("uz");

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <Ctx.Provider value={locale}>{children}</Ctx.Provider>;
}

export const useLocale = () => useContext(Ctx);

export function useContent(): Content {
  const locale = useContext(Ctx);
  return useMemo(() => getContent(locale), [locale]);
}

/** "/xizmatlar" -> "/ru/xizmatlar" */
export function localizePath(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

export function useLocalePath() {
  const locale = useContext(Ctx);
  return (href: string) => localizePath(locale, href);
}
