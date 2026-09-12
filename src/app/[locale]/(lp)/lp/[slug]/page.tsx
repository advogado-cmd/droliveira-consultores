import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Eyebrow, H1, H2, JsonLd } from "@/components/ui";
import { IconBadge, Icons } from "@/components/icons";
import ImageFrame from "@/components/ImageFrame";
import LeadForm from "@/components/LeadForm";
import { BRAND } from "@/lib/site";

export function generateStaticParams() { return ["pt", "en", "es"].flatMap((locale) => getContent(locale).landings.map((l) => ({ locale, slug: l.slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params; const lp = getContent(locale).landings.find((l) => l.slug === slug); if (!lp) return {};
  return { title: { absolute: `${lp.metaTitle} · ${BRAND}` }, description: lp.metaDescription, alternates: buildAlternates(locale as Locale, { pathname: "/lp/[slug]", params: { slug } }), robots: { index: true, follow: false } };
}

export default async function Page({ params, searchParams }: { params: Promise<{ locale: string; slug: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const { locale, slug } = await params; setRequestLocale(locale);
  const c = getContent(locale); const lp = c.landings.find((l) => l.slug === slug); if (!lp) notFound();
  const sector = c.sectors.items.find((s) => s.key === lp.sectorKey)!;
  const sp = await searchParams; const origem = ["utm_source", "utm_medium", "utm_campaign"].map((k) => sp[k]).filter(Boolean).join("/");
  const t = await getTranslations("common");
  return (
    <>
      <section className="border-b-4 border-gold bg-navy text-cream">
        <div className="container grid gap-10 py-14 md:grid-cols-[1.3fr_1fr] md:items-start md:py-20">
          <div>
            <div className="mb-3"><IconBadge name={lp.sectorKey} tone="cream" size="lg" /></div>
            <Eyebrow light>{lp.name}</Eyebrow>
            <H1 light>{lp.headline}</H1>
            <p className="mt-5 max-w-2xl text-lg text-cream/85">{lp.sub}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {lp.pains.map((p) => <div key={p.title} className="rounded-card border border-cream/15 bg-navy-500/40 p-4"><p className="font-serif text-lg text-gold">{p.title}</p><p className="mt-1 text-sm text-cream/80">{p.text}</p></div>)}
            </div>
          </div>
          <div id="material" className="rounded-card border border-gold/60 bg-white p-6 text-ink shadow-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-oliva-700">{lp.magnet.title}</p>
            <p className="mt-2 text-sm text-slate">{lp.magnet.intro}</p>
            <div className="mt-4"><LeadForm slug={lp.slug} origem={origem} cta={lp.cta} /></div>
          </div>
        </div>
      </section>
      <section className="bg-paper py-14">
        <div className="container grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <H2>{t("whatWeAnalyse")}</H2>
            <ul className="mt-5 grid gap-2">{sector.analyse.map((a) => <li key={a} className="flex gap-3 rounded-card border border-navy/10 bg-white p-3 text-[15px]"><Icons.check className="mt-0.5 h-5 w-5 shrink-0 text-oliva" />{a}</li>)}</ul>
            <p className="mt-4 text-sm text-slate">{sector.outcome}</p>
          </div>
          <ImageFrame brief={sector.imageBrief} src={sector.image} alt={sector.name} ratio="4/3" />
        </div>
      </section>
      <section className="bg-cream py-14">
        <div className="container"><H2>{c.consultant.title}</H2><p className="mt-3 max-w-prose text-[15px]">{c.consultant.intro}</p><a href="#material" className="mt-6 inline-block rounded bg-gold px-6 py-3 font-medium text-navy">{lp.cta}</a></div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: lp.metaTitle, description: lp.metaDescription, publisher: { "@type": "Organization", name: BRAND } }} />
    </>
  );
}
