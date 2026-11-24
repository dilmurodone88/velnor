import * as data from "@/lib/data";
import { site, nav } from "@/lib/site";
import { legal, requisites, legalDocs } from "@/lib/legal";
import { ui as uiUz, uiRu } from "./ui";
import { ruContent } from "./ru";
import { deepCyrillic } from "./translit";
import { overlay, type DeepText } from "./merge";
import type { Locale } from "./config";

// O'zbekcha (lotin) — asl manba
const groupsBase = data.groups.map(({ items: _items, ...g }) => g);

const base = {
  site,
  nav,
  directions: data.directions,
  groupsBase,
  stats: data.stats,
  process: data.process,
  projects: data.projects,
  testimonials: data.testimonials,
  faqs: data.faqs,
  whyUs: data.whyUs,
  auditPlans: data.auditPlans,
  extraServices: data.extraServices,
  legal,
  requisites,
  legalDocs,
  t: uiUz,
};

export type BaseContent = typeof base;
export type RuContent = DeepText<BaseContent>;

function finalize(c: BaseContent, locale: Locale) {
  const groups = c.groupsBase.map((g) => ({ ...g, items: g.slugs.map((s) => c.directions.find((d) => d.slug === s)!) }));
  return {
    ...c,
    locale,
    groups,
    clients: data.clients,
    techMarquee: data.techMarquee,
    images: data.images,
    getDirection: (slug: string) => c.directions.find((d) => d.slug === slug),
    getLegalDoc: (slug: string) => c.legalDocs.find((d) => d.slug === slug),
  };
}

export type Content = ReturnType<typeof finalize>;

const cache = new Map<Locale, Content>();

export function getContent(locale: Locale): Content {
  const hit = cache.get(locale);
  if (hit) return hit;
  let c: BaseContent;
  if (locale === "ru") c = overlay(base, { ...ruContent, t: uiRu });
  else if (locale === "oz") c = deepCyrillic(base);
  else c = base;
  const out = finalize(c, locale);
  cache.set(locale, out);
  return out;
}
