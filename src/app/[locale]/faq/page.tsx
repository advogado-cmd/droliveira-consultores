import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, ButtonLink, JsonLd } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), description: t("intro"), alternates: buildAlternates(locale as Locale, { pathname: "/faq" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale); const t = await getTranslations("faq");
  const items = [...c.faq, ...c.services.items.map((s) => ({ q: `${s.name} — ${s.question}`, a: `${s.detail} ${s.deliverable} (${s.timeline})` }))];
  return (
    <Section tone="paper">
      <Eyebrow>FAQ</Eyebrow>
      <H1>{t("title")}</H1>
      <p className="mt-3 max-w-prose text-slate">{t("intro")}</p>
      <dl className="mt-8 divide-y divide-navy/10 rounded-card border border-navy/10 bg-white px-6">
        {items.map((f) => (
          <div key={f.q} className="py-5"><dt className="font-medium text-navy">{f.q}</dt><dd className="mt-1 max-w-prose text-[15px]">{f.a}</dd></div>
        ))}
      </dl>
      <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/ia" variant="secondary">IA →</ButtonLink><ButtonLink href="/contato">{c.home.ctaPrimary}</ButtonLink></div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    </Section>
  );
}
