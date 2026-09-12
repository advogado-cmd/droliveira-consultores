import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, H2, ButtonLink, Faq, JsonLd } from "@/components/ui";
import { Icons, IconBadge } from "@/components/icons";
import ImageFrame from "@/components/ImageFrame";
import { BRAND } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const c = getContent(locale);
  return { title: { absolute: c.ma.metaTitle }, description: c.ma.metaDescription, alternates: buildAlternates(locale as Locale, { pathname: "/fusoes-e-aquisicoes" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale); const t = await getTranslations("nav"); const tc = await getTranslations("common");
  return (
    <>
      <section className="border-b-4 border-gold bg-navy text-cream">
        <div className="container grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-24">
          <div>
            <div className="mb-3"><IconBadge name="ma" tone="cream" size="lg" /></div>
            <Eyebrow light>{t("ma")}</Eyebrow>
            <H1 light>{c.ma.title}</H1>
            <p className="mt-5 max-w-2xl text-lg text-cream/85">{c.ma.intro}</p>
          </div>
          <ImageFrame brief={c.images.investors} ratio="4/3" tone="dark" />
        </div>
      </section>
      <Section tone="paper">
        <div className="grid gap-4 md:grid-cols-3">
          {c.ma.signals.map((s) => <div key={s.n} className="rounded-card border-t-4 border-gold bg-white p-6"><p className="font-serif text-4xl text-navy" style={{ fontVariantNumeric: "tabular-nums" }}>{s.n}</p><p className="mt-2 text-[15px] text-slate">{s.text}</p></div>)}
        </div>
      </Section>
      <Section tone="cream">
        <div className="grid gap-6 md:grid-cols-2">
          {c.ma.sides.map((s) => (
            <div key={s.title} className="rounded-card border border-navy/10 bg-white p-6">
              <H2>{s.title}</H2><p className="mt-2 text-slate">{s.text}</p>
              <ul className="mt-4 space-y-2 text-[15px]">{s.items.map((i) => <li key={i} className="flex gap-2"><Icons.check className="mt-0.5 h-5 w-5 shrink-0 text-oliva" />{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="paper">
        <div className="grid gap-5 md:grid-cols-3">
          {c.ma.steps.map((s, i) => <div key={s.title} className="rounded-card border-l-4 border-oliva bg-white p-6"><p className="font-serif text-3xl text-gold-600">{i + 1}</p><h3 className="mt-1 font-serif text-xl text-navy">{s.title}</h3><p className="mt-2 text-[15px]">{s.text}</p></div>)}
        </div>
        <div className="mt-8"><ButtonLink href="/contato">{c.ma.cta}</ButtonLink></div>
      </Section>
      <Section tone="cream"><Faq items={[c.faqAnalysis[0], c.faqAnalysis[1], c.faqAnalysis[8], c.faq[0]]} title={tc("faq")} /></Section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: c.ma.metaTitle, serviceType: "M&A readiness and due diligence", provider: { "@type": "Organization", name: BRAND }, areaServed: "BR", description: c.ma.metaDescription }} />
    </>
  );
}
