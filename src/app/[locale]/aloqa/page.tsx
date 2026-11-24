import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { getContent } from "@/i18n/content";
import { isLocale } from "@/i18n/config";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale).t.pages.aloqa;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/${locale}/aloqa`, languages: { "uz-Latn": "/uz/aloqa", "uz-Cyrl": "/oz/aloqa", ru: "/ru/aloqa", "x-default": "/uz/aloqa" } },
  };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { images, t } = getContent(locale);
  const tp = t.pages.aloqa;

  return (
    <>
      <PageHero image={images.team} eyebrow={tp.eyebrow} title={tp.title} highlight={tp.highlight} text={tp.text} crumbs={[{ label: tp.crumb }]} />
      <div className="-mt-16">
        <Contact readQuery />
      </div>
      <Faq />
    </>
  );
}
