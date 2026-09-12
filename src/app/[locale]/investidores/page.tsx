import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, ButtonLink } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const c = getContent(locale);
  return { title: { absolute: c.investors.metaTitle }, description: c.investors.metaDescription, alternates: buildAlternates(locale as Locale, { pathname: "/investidores" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale); const t = await getTranslations("nav");
  return (
    <>
      <section className="border-b-4 border-gold bg-navy text-cream">
        <div className="container py-16 md:py-24">
          <Eyebrow light>{t("investors")}</Eyebrow>
          <H1 light>{c.investors.title}</H1>
          <p className="mt-5 max-w-2xl text-lg text-cream/85">{c.investors.intro}</p>
        </div>
      </section>
      <Section tone="paper">
        <ul className="grid gap-3 md:grid-cols-2">
          {c.investors.points.map((p) => <li key={p} className="flex gap-3 rounded-card border border-navy/10 bg-white p-5"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-oliva" />{p}</li>)}
        </ul>
        <div className="mt-8"><ButtonLink href="/contato">{c.investors.cta}</ButtonLink></div>
      </Section>
    </>
  );
}
