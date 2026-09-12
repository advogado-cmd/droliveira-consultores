import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, ButtonLink, Faq } from "@/components/ui";
import { Icons } from "@/components/icons";
import ImageFrame from "@/components/ImageFrame";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const c = getContent(locale);
  return { title: { absolute: c.investors.metaTitle }, description: c.investors.metaDescription, alternates: buildAlternates(locale as Locale, { pathname: "/investidores" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale); const t = await getTranslations("nav"); const tc = await getTranslations("common");
  return (
    <>
      <section className="border-b-4 border-gold bg-navy text-cream">
        <div className="container grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-24">
          <div>
            <Eyebrow light>{t("investors")}</Eyebrow>
            <H1 light>{c.investors.title}</H1>
            <p className="mt-5 max-w-2xl text-lg text-cream/85">{c.investors.intro}</p>
          </div>
          <ImageFrame brief={c.images.investors} ratio="4/3" tone="dark" />
        </div>
      </section>
      <Section tone="paper">
        <ul className="grid gap-3 md:grid-cols-2">
          {c.investors.points.map((p) => <li key={p} className="flex gap-3 rounded-card border border-navy/10 bg-white p-5"><Icons.check className="mt-0.5 h-5 w-5 shrink-0 text-oliva" />{p}</li>)}
        </ul>
        <div className="mt-8"><ButtonLink href="/contato">{c.investors.cta}</ButtonLink></div>
      </Section>
      <Section tone="cream"><Faq items={[c.faq[0], c.faq[4], ...c.faqAnalysis.slice(0, 2)]} title={tc("faq")} /></Section>
    </>
  );
}
