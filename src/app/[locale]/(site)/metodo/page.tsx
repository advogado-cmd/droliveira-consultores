import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, H2, ButtonLink, Faq } from "@/components/ui";
import { IconBadge, moveIcons } from "@/components/icons";
import ImageFrame from "@/components/ImageFrame";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const c = getContent(locale);
  return { title: { absolute: c.method.metaTitle }, description: c.method.metaDescription, alternates: buildAlternates(locale as Locale, { pathname: "/metodo" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale); const t = await getTranslations("nav"); const tc = await getTranslations("common");
  return (
    <>
      <Section tone="paper">
        <Eyebrow>{t("method")}</Eyebrow>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div><H1>{c.method.title}</H1><p className="mt-5 max-w-prose text-lg leading-relaxed">{c.method.intro}</p></div>
          <ImageFrame brief={c.images.method} ratio="1/1" />
        </div>
      </Section>
      <Section tone="navy" className="pt-0 md:pt-0">
        <div className="grid gap-4 pt-16 md:grid-cols-4 md:pt-20">
          {c.method.families.map((f, i) => (
            <div key={f.name} className="rounded-card border border-cream/15 bg-navy-500/40 p-5">
              <p className="font-serif text-3xl text-gold">{i + 1}</p>
              <h2 className="mt-1 font-serif text-xl text-cream">{f.name}</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-cream/85">
                {f.fronts.map((fr) => <li key={fr} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oliva-300" />{fr}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-prose text-sm text-cream/70">{c.method.note}</p>
      </Section>
      <Section tone="cream">
        <div className="grid gap-8 md:grid-cols-3">
          {c.home.moves.map((m) => (
            <div key={m.n}>
              <div className="mb-3 flex items-center gap-3"><IconBadge name={moveIcons[Number(m.n) - 1]} tone="oliva" /><p className="font-serif text-3xl text-gold-600">{m.n}</p></div>
              <h3 className="font-serif text-2xl text-navy">{m.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="paper">
        <Eyebrow>{tc("rules")}</Eyebrow>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {c.method.rules.map((r) => <li key={r} className="rounded-card border-l-4 border-oliva bg-white p-5 text-[15px]">{r}</li>)}
        </ol>
        <div className="mt-8"><ButtonLink href="/contato">{c.home.ctaPrimary}</ButtonLink></div>
      </Section>
      <Section tone="cream"><Faq items={c.faqAnalysis.slice(0, 5)} title={tc("faq")} /></Section>
    </>
  );
}
