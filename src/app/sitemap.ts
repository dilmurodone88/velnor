import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { directions } from "@/lib/data";
import { legalDocs } from "@/lib/legal";
import { locales } from "@/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const paths = ["", "/xizmatlar", "/aloqa", "/huquqiy", ...directions.map((d) => `/xizmatlar/${d.slug}`), ...legalDocs.map((d) => `/huquqiy/${d.slug}`)];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${base}/${l}${p}`,
      priority: p === "" ? 1 : p.startsWith("/huquqiy") ? 0.4 : 0.8,
      alternates: { languages: { "uz-Latn": `${base}/uz${p}`, "uz-Cyrl": `${base}/oz${p}`, ru: `${base}/ru${p}` } },
    })),
  );
}
