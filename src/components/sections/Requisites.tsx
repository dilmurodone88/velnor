"use client";

import { useContent } from "@/i18n/I18nProvider";
import { Buildings2 } from "@/components/ui/icons";

export function Requisites() {
  const { legal, requisites, t } = useContent();
  const tr = t.pages.requisites;
  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
            <Buildings2 className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-white">{tr.title}</h3>
            <p className="text-xs text-white/45">{tr.subtitle}</p>
          </div>
        </div>
        {legal.isTest && <span className="rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-300">{tr.test}</span>}
      </div>
      <dl className="divide-y divide-white/[0.06]">
        {requisites.map((r) => (
          <div key={r.label} className="grid gap-1 px-6 py-3.5 sm:grid-cols-[180px_1fr] sm:gap-4">
            <dt className="text-sm text-white/45">{r.label}</dt>
            <dd className="text-sm font-medium text-white/90">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
