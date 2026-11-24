import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Directions } from "@/components/sections/Directions";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { Audit } from "@/components/sections/Audit";
import { Contact } from "@/components/sections/Contact";
import { getContent } from "@/i18n/content";
import { isLocale } from "@/i18n/config";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale).t.pages.services;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/${locale}/xizmatlar`, languages: { "uz-Latn": "/uz/xizmatlar", "uz-Cyrl": "/oz/xizmatlar", ru: "/ru/xizmatlar", "x-default": "/uz/xizmatlar" } },
  };
}

export default async function ServicesPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { images, t } = getContent(locale);
  const tp = t.pages.services;
  return (
    <>
      <PageHero image={images.dataCenter} eyebrow={tp.eyebrow} title={tp.title} highlight={tp.highlight} text={tp.text} crumbs={[{ label: tp.crumb }]} />
      <Directions />
      <ServicesTabs />
      <Audit />
      <Contact />
    </>
  );
}
