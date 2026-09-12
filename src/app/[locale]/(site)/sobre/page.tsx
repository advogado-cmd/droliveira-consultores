import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, H2, ButtonLink, JsonLd, Faq } from "@/components/ui";
import { getTranslations } from "next-intl/server";
import { SITE_URL, BRAND } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const c = getContent(locale);
  return { title: { absolute: c.about.metaTitle }, description: c.about.metaDescription, alternates: buildAlternates(locale as Locale, { pathname: "/sobre" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale); const tc = await getTranslations("common");
  const ld = { "@context": "https://schema.org", "@type": "Person", name: c.about.name, jobTitle: "Consultor estratégico", worksFor: { "@type": "Organization", name: BRAND, url: SITE_URL }, alumniOf: ["UFPB", "CEDEPE", "FECS/Oswaldo Cruz"] };
  return (
    <>
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-start">
          <div>
            <Image src="/consultor.jpg" alt={c.about.name} width={640} height={800} className="w-full rounded-card border-4 border-gold object-cover" priority />
          </div>
          <div>
            <Eyebrow>{c.about.title}</Eyebrow>
            <H1>{c.about.name}</H1>
            {c.about.bio.map((p) => <p key={p} className="mt-4 max-w-prose text-[17px] leading-relaxed">{p}</p>)}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[c.consultant.legal, c.consultant.management].map((g) => (
                <div key={g.label}>
                  <h2 className="text-xs font-medium uppercase tracking-wider text-oliva-700">{g.label}</h2>
                  <ul className="mt-2 grid gap-2">{g.items.map((i) => <li key={i} className="rounded-card border border-navy/10 bg-white px-4 py-3 text-[15px]">{i}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-prose text-[15px] text-slate">{c.about.network}</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {c.about.sections.map((sec) => (
                <div key={sec.title}>
                  <H2>{sec.title}</H2>
                  <ul className="mt-3 space-y-2 text-[15px]">{sec.items.map((i) => <li key={i} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oliva" />{i}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="mt-8"><ButtonLink href="/contato">{c.home.ctaPrimary}</ButtonLink></div>
          </div>
        </div>
      </Section>
      <Section tone="cream"><Faq items={c.faq.slice(0, 4)} title={tc("faq")} /></Section>
      <JsonLd data={ld} />
    </>
  );
}
