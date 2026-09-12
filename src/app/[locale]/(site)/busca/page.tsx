import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildIndex, search } from "@/lib/searchIndex";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1 } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "search" });
  return { title: t("title"), robots: { index: false }, alternates: buildAlternates(locale as Locale, { pathname: "/busca" }) };
}

export default async function Page({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const { q = "" } = await searchParams; const t = await getTranslations("search");
  const res = q ? search(buildIndex(locale as Locale), q, 20) : [];
  return (
    <Section tone="paper">
      <Eyebrow>{t("results")}</Eyebrow>
      <H1>{t("title")}</H1>
      <form action="" method="get" className="mt-6 flex max-w-xl gap-2">
        <input name="q" defaultValue={q} placeholder={t("placeholder")} className="w-full rounded-field border border-navy/25 bg-white px-3 py-2.5" aria-label={t("title")} />
        <button className="rounded bg-gold px-4 py-2 font-medium text-navy">→</button>
      </form>
      {q && res.length === 0 && <p className="mt-6 text-slate">{t("none")} “{q}”.</p>}
      <ul className="mt-8 grid gap-3">
        {res.map((r) => (
          <li key={r.href + r.title}><a href={r.href} className="block rounded-card border border-navy/10 bg-white p-4 hover:border-gold"><span className="text-[11px] uppercase tracking-wider text-oliva-700">{r.kind}</span><span className="block font-medium text-navy">{r.title}</span><span className="block text-sm text-slate">{r.text}</span></a></li>
        ))}
      </ul>
      {q && <Link href={{ pathname: "/ia", query: { q } }} className="mt-8 inline-block rounded border border-gold/60 bg-white px-4 py-2 text-sm font-medium text-navy">{t("ai")} →</Link>}
    </Section>
  );
}
