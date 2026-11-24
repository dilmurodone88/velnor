import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/i18n/Link";
import { getContent } from "@/i18n/content";
import { isLocale } from "@/i18n/config";
import { fmt } from "@/i18n/fmt";
import { PageHero } from "@/components/sections/PageHero";
import { Requisites } from "@/components/sections/Requisites";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowRight, ShieldTick } from "@/components/ui/icons";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale).t.pages.legal;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/${locale}/huquqiy`, languages: { "uz-Latn": "/uz/huquqiy", "uz-Cyrl": "/oz/huquqiy", ru: "/ru/huquqiy", "x-default": "/uz/huquqiy" } },
  };
}

export default async function LegalIndex({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { legal, legalDocs, t } = getContent(locale);
  const tp = t.pages.legal;
  return (
    <>
      <PageHero eyebrow={tp.eyebrow} title={tp.title} highlight={tp.highlight} text={tp.text} crumbs={[{ label: tp.crumb }]} />
      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Stagger className="space-y-4">
            {legalDocs.map((d) => (
              <StaggerItem key={d.slug}>
                <Link href={`/huquqiy/${d.slug}`} className="group glass flex items-center gap-5 rounded-3xl p-6 transition hover:border-brand-400/40">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300 transition group-hover:bg-brand-500 group-hover:text-white">
                    <ShieldTick className="h-6 w-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-bold text-white">{d.title}</span>
                    <span className="mt-1 block text-sm text-white/55">{d.short}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              </StaggerItem>
            ))}
            <p className="px-2 pt-2 text-xs text-white/35">{fmt(tp.updated, { date: legal.updated })}</p>
          </Stagger>
          <Reveal delay={0.1}>
            <Requisites />
          </Reveal>
        </div>
      </section>
    </>
  );
}
