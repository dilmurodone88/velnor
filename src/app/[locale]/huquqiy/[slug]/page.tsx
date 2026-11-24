import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { notFound } from "next/navigation";
import { legalDocs } from "@/lib/legal";
import { getContent } from "@/i18n/content";
import { isLocale } from "@/i18n/config";
import { fmt } from "@/i18n/fmt";
import { PageHero } from "@/components/sections/PageHero";
import { LegalTOC } from "@/components/sections/LegalTOC";
import { Requisites } from "@/components/sections/Requisites";
import { TickCircle } from "@/components/ui/icons";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const d = getContent(locale).getLegalDoc(slug);
  if (!d) return {};
  const path = `/huquqiy/${slug}`;
  return {
    title: d.title,
    description: d.short,
    alternates: { canonical: `/${locale}${path}`, languages: { "uz-Latn": `/uz${path}`, "uz-Cyrl": `/oz${path}`, ru: `/ru${path}`, "x-default": `/uz${path}` } },
  };
}

export default async function LegalDocPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const { getLegalDoc, legal, legalDocs, t } = getContent(locale);
  const tp = t.pages.legal;
  const d = getLegalDoc(slug);
  if (!d) notFound();

  return (
    <>
      <PageHero eyebrow={tp.docEyebrow} title={d.title} text={d.short} crumbs={[{ label: tp.crumb, href: "/huquqiy" }, { label: d.title }]} />
      <section className="pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">{tp.toc}</div>
              <LegalTOC sections={d.sections.map(({ id, title }) => ({ id, title }))} />
              <div className="mt-6 space-y-1 border-t border-white/10 pt-6">
                {legalDocs.filter((x) => x.slug !== d.slug).map((x) => (
                  <Link key={x.slug} href={`/huquqiy/${x.slug}`} className="block px-3 py-1.5 text-sm text-brand-300 hover:text-white">
                    {x.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <article className="min-w-0">
            {legal.isTest && (
              <div className="mb-8 rounded-2xl border border-brand-400/30 bg-brand-500/10 px-5 py-4 text-sm text-brand-100">
                {tp.testNotice}
              </div>
            )}
            <p className="text-base leading-relaxed text-white/70 md:text-lg">{d.intro}</p>

            <div className="mt-10 space-y-10">
              {d.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold text-white md:text-2xl">{s.title}</h2>
                  {s.paragraphs?.map((p, i) => (
                    <p key={i} className="mt-4 leading-relaxed text-white/65">{p}</p>
                  ))}
                  {s.items && (
                    <ul className="mt-4 space-y-3">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-3 leading-relaxed text-white/70">
                          <TickCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.table && (
                    <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
                      <table className="w-full min-w-[560px] text-left text-sm">
                        <thead className="bg-white/[0.04] text-white">
                          <tr>{s.table[0].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.06] text-white/70">
                          {s.table.slice(1).map((row) => (
                            <tr key={row[0]}>{row.map((c, i) => <td key={i} className={i === 0 ? "px-4 py-3 font-medium text-white" : "px-4 py-3"}>{c}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-14">
              <Requisites />
            </div>
            <p className="mt-6 text-xs text-white/35">{fmt(tp.updated, { date: legal.updated })}</p>
          </article>
        </div>
      </section>
    </>
  );
}
