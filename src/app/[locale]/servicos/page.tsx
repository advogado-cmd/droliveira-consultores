import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, H2, ButtonLink, Faq, JsonLd } from "@/components/ui";
import { BRAND } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const c = getContent(locale);
  return { title: { absolute: c.services.metaTitle }, description: c.services.metaDescription, alternates: buildAlternates(locale as Locale, { pathname: "/servicos" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale); const t = await getTranslations("common");
  const ld = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: c.services.items.map((s, i) => ({ "@type": "Service", position: i + 1, name: s.name, provider: { "@type": "Organization", name: BRAND }, description: s.deliverable })) };
  return (
    <>
      <Section tone="paper">
        <Eyebrow>{t("services")}</Eyebrow>
        <H1>{c.services.title}</H1>
        <p className="mt-4 max-w-prose text-lg text-slate">{c.services.intro}</p>
      </Section>
      <Section tone="cream" className="pt-0 md:pt-0">
        <ol className="grid gap-5">
          {c.services.items.map((s, i) => (
            <li key={s.slug} id={s.slug} className="grid gap-4 rounded-card border border-navy/10 bg-white p-6 md:grid-cols-[auto_1fr_1fr] md:gap-8">
              <div className="font-serif text-4xl text-gold-600 md:w-12">{i + 1}</div>
              <div>
                <h2 className="font-serif text-2xl text-navy">{s.name}</h2>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-oliva-700">{t("question")}</p>
                <p className="mt-1 italic text-ink">“{s.question}”</p>
                <p className="mt-3 text-[15px] leading-relaxed">{s.detail}</p>
              </div>
              <dl className="grid gap-3 text-[15px]">
                <div><dt className="text-xs font-medium uppercase tracking-wider text-slate">{t("deliverable")}</dt><dd className="mt-1">{s.deliverable}</dd></div>
                <div><dt className="text-xs font-medium uppercase tracking-wider text-slate">{t("timeline")}</dt><dd className="mt-1 font-medium text-navy">{s.timeline}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
        <div className="mt-8"><ButtonLink href="/contato">{c.home.ctaPrimary}</ButtonLink></div>
      </Section>
      <Section tone="paper" className="scroll-mt-20">
        <div id="pessoas" />
        <Eyebrow>{c.people.eyebrow}</Eyebrow>
        <H2>{c.people.title}</H2>
        <p className="mt-3 max-w-prose text-slate">{c.people.intro}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {c.people.items.map((i) => (
            <div key={i.title} className="rounded-card border-t-4 border-oliva bg-white p-6">
              <h3 className="font-serif text-xl text-navy">{i.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{i.text}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate">{i.bullets.map((b) => <li key={b}>· {b}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-prose text-xs text-slate">{c.people.note}</p>
      </Section>
      <Section tone="cream"><Faq items={c.faq} title={t("faq")} /></Section>
      <JsonLd data={ld} />
    </>
  );
}
