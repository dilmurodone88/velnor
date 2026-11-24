"use client";

import { Button } from "@/components/ui/Button";
import { useContent } from "@/i18n/I18nProvider";

export default function NotFound() {
  const t = useContent().t.pages.notFound;
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-grid mask-fade opacity-60" />
      <div className="relative text-center">
        <div className="text-gradient font-display text-[9rem] font-black leading-none md:text-[14rem]">404</div>
        <h1 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-white/55">{t.text}</p>
        <div className="mt-8"><Button href="/">{t.home}</Button></div>
      </div>
    </section>
  );
}
