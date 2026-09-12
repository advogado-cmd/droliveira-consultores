import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getContent, getSector, allSectorParams, sectorSlugFor } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, H2, ButtonLink, Faq, JsonLd } from "@/components/ui";
import { BRAND } from "@/lib/site";
import { IconBadge, Icons } from "@/components/icons";
import ImageFrame from "@/components/ImageFrame";

export function generateStaticParams() { return allSectorParams(); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params; const s = getSector(locale, slug);
  if (!s) return {};
  return { title: { absolute: `${s.metaTitle} · ${BRAND}` }, description: s.metaDescription, alternates: buildAlternates(locale as Locale, (l) => ({ pathname: "/segmentos/[slug]", params: { slug: sectorSlugFor(s.key, l) } })) };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params; setRequestLocale(locale);
  const s = getSector(locale, slug); if (!s) notFound();
  const c = getContent(locale); const t = await getTranslations("common");
  const ld = { "@context": "https://schema.org", "@type": "Service", name: s.metaTitle, serviceType: "Business consulting", provider: { "@type": "Organization", name: BRAND }, areaServed: "BR", description: s.metaDescription };
  return (
    <>
      <section className="border-b-4 border-gold bg-navy text-cream">
        <div className="container grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-cream/70"><Link href="/segmentos" className="hover:text-gold">{c.sectors.title}</Link> <span aria-hidden="true">/</span> {s.name}</nav>
            <div className="mb-3"><IconBadge name={s.key} tone="cream" size="lg" /></div>
            <Eyebrow light>{s.name}</Eyebrow>
            <H1 light>{s.headline}</H1>
          </div>
          <ImageFrame brief={s.imageBrief} src={s.image} alt={s.name} ratio="4/3" tone="dark" />
        </div>
      </section>
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <H2>{t("whatWeAnalyse")}</H2>
            <ul className="mt-5 grid gap-3">
              {s.analyse.map((a) => <li key={a} className="flex gap-3 rounded-card border border-navy/10 bg-white p-4 text-[15px]"><Icons.check className="mt-0.5 h-5 w-5 shrink-0 text-oliva" />{a}</li>)}
            </ul>
          </div>
          <div className="rounded-card border-l-4 border-gold bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-slate">{t("outcome")}</p>
            <p className="mt-2 font-serif text-xl text-navy">{s.outcome}</p>
            <div className="mt-6"><ButtonLink href="/contato">{c.home.ctaPrimary}</ButtonLink></div>
          </div>
        </div>
      </Section>
      <Section tone="cream"><Faq items={c.faq} title={t("faq")} /></Section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: c.sectors.title }, { "@type": "ListItem", position: 2, name: s.name }] }} />
      <JsonLd data={ld} />
    </>
  );
}
