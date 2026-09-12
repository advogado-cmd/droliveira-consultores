import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, ButtonLink } from "@/components/ui";
import { IconBadge } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const c = getContent(locale);
  return { title: { absolute: c.sectors.metaTitle }, description: c.sectors.metaDescription, alternates: buildAlternates(locale as Locale, { pathname: "/segmentos" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale); const t = await getTranslations("common");
  return (
    <>
      <Section tone="paper">
        <Eyebrow>{t("allSectors")}</Eyebrow>
        <H1>{c.sectors.title}</H1>
        <p className="mt-4 max-w-prose text-lg text-slate">{c.sectors.intro}</p>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {c.sectors.items.map((s) => (
            <li key={s.key}>
              <Link href={{ pathname: "/segmentos/[slug]", params: { slug: s.slug } }} className="block h-full rounded-card border border-navy/10 bg-white p-6 hover:border-gold">
                <div className="mb-4"><IconBadge name={s.key} size="lg" /></div>
                <h2 className="font-serif text-2xl text-navy">{s.name}</h2>
                <p className="mt-2 text-[15px] text-ink">{s.headline}</p>
                <span className="mt-4 inline-block text-sm font-medium text-gold-600">{t("readMore")} →</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10"><ButtonLink href="/contato">{c.home.ctaPrimary}</ButtonLink></div>
      </Section>
    </>
  );
}
