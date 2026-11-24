import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { MotionConfig } from "motion/react";
import { Splash } from "@/components/layout/Splash";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getContent } from "@/i18n/content";
import { isLocale, localeMeta, locales, type Locale } from "@/i18n/config";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { site, t } = getContent(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: { "uz-Latn": "/uz", "uz-Cyrl": "/oz", ru: "/ru", "x-default": "/uz" },
    },
    openGraph: { title: site.name, description: site.description, type: "website", locale: localeMeta[locale].og, siteName: site.name },
  };
}

export const viewport: Viewport = { themeColor: "#05060b", width: "device-width", initialScale: 1 };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const { site, legal } = getContent(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${site.name} ${site.suffix}`,
    legalName: legal.companyName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: legal.legalAddress,
    sameAs: Object.values(site.socials),
  };
  return (
    <html lang={localeMeta[locale].htmlLang} className={`${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Qaytgan tashrifchilarda splashni hidratsiyadan oldin yashirish */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(sessionStorage.getItem('splash-seen')!==null)document.documentElement.setAttribute('data-splash','off')}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans">
        <I18nProvider locale={locale}>
          <MotionConfig reducedMotion="user">
            <Splash />
            <ScrollProgress />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
            <FloatingActions />
          </MotionConfig>
        </I18nProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
