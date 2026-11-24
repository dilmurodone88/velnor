import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { notFound } from "next/navigation";
import { ArrowRight, TickCircle } from "@/components/ui/icons";
import { directions } from "@/lib/data";
import { getContent } from "@/i18n/content";
import { isLocale } from "@/i18n/config";
import { fmt } from "@/i18n/fmt";
import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

export function generateStaticParams() {
  return directions.map((d) => ({ slug: d.slug }));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const d = getContent(locale).getDirection(slug);
  if (!d) return {};
  const path = `/xizmatlar/${slug}`;
  return {
    title: d.title,
    description: d.description,
    alternates: { canonical: `/${locale}${path}`, languages: { "uz-Latn": `/uz${path}`, "uz-Cyrl": `/oz${path}`, ru: `/ru${path}`, "x-default": `/uz${path}` } },
  };
}

export default async function DirectionPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const { directions, getDirection, process, t } = getContent(locale);
  const tp = t.pages.direction;
  const d = getDirection(slug);
  if (!d) notFound();
  const idx = directions.findIndex((x) => x.slug === slug);
  const next = directions[(idx + 1) % directions.length];

  return (
    <>
      <PageHero image={d.image} eyebrow={fmt(tp.eyebrow, { num: d.num })} title={d.title} text={d.headline} from={d.from} to={d.to} crumbs={[{ label: t.pages.services.crumb, href: "/xizmatlar" }, { label: d.title }]}>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="#aloqa">{tp.price}</Button>
          <Button href="#xizmatlar-royxati" variant="ghost">{tp.list}</Button>
        </div>
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-3">
          {d.stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <div className="font-display text-2xl font-bold text-white md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs text-white/50 md:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      <section id="xizmatlar-royxati" className="relative py-24">
        <div className="container-x">
          <SectionHeading eyebrow={tp.itemsEyebrow} title={tp.itemsTitle} highlight={tp.itemsHighlight} text={d.description} />
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {d.items.map((it, i) => (
              <StaggerItem key={it.title}>
                <SpotlightCard className="group glass relative h-full overflow-hidden rounded-3xl p-7 hover:border-white/20">
                  <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(63,109,255,0.5),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" style={{ background: `linear-gradient(135deg, ${d.from}, ${d.to})`, boxShadow: `0 12px 30px -10px ${d.from}` }}>
                      <it.icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-sm text-white/20">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-white">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{it.desc}</p>
                  <Link href="#aloqa" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3" style={{ color: d.from }}>
                    {tp.order} <ArrowRight className="h-4 w-4" />
                  </Link>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-10">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-white/35">{tp.tech}</p>
        <Marquee>
          {d.tech.map((t) => (
            <span key={t} className="glass whitespace-nowrap rounded-2xl px-8 py-4 font-display text-lg font-semibold text-white/70">{t}</span>
          ))}
        </Marquee>
      </section>

      <section className="relative py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading center={false} className="mb-8" eyebrow={tp.whyEyebrow} title={tp.whyTitle} highlight={tp.whyHighlight} />
            <ul className="space-y-4">
              {d.features.map((f, i) => (
                <Reveal key={f} delay={i * 0.07}>
                  <li className="glass flex items-center gap-4 rounded-2xl p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white" style={{ background: `linear-gradient(135deg, ${d.from}, ${d.to})` }}>
                      <TickCircle className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-white/85">{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal y={30}>
            <div className="glass rounded-3xl p-8">
              <h3 className="font-display text-2xl font-bold text-white">{tp.howTitle}</h3>
              <div className="mt-6 space-y-5">
                {process.map((p, i) => (
                  <div key={p.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white" style={{ background: `linear-gradient(135deg, ${d.from}, ${d.to})` }}>{i + 1}</span>
                      {i < process.length - 1 && <span className="mt-2 w-px flex-1 bg-white/10" />}
                    </div>
                    <div className="pb-2">
                      <div className="font-semibold text-white">{p.title}</div>
                      <div className="mt-1 text-sm text-white/50">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Contact defaultService={d.slug} />

      <section className="pb-10">
        <div className="container-x">
          <Link href={`/xizmatlar/${next.slug}`} className="group glass flex items-center justify-between gap-6 overflow-hidden rounded-3xl p-8 transition hover:border-white/20 md:p-12">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">{tp.next}</div>
              <div className="mt-3 font-display text-3xl font-bold text-white transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">{next.title}</div>
            </div>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${next.from}, ${next.to})` }}>
              <ArrowRight className="h-6 w-6" />
            </span>
          </Link>
        </div>
      </section>
      <Faq />
    </>
  );
}
