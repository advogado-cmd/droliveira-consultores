import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { Eyebrow, H1 } from "@/components/ui";
import { Icons } from "@/components/icons";
import PrintButton from "@/components/PrintButton";

export const metadata = { robots: { index: false } };
export function generateStaticParams() { return ["pt", "en", "es"].flatMap((locale) => getContent(locale).landings.map((l) => ({ locale, slug: l.slug }))); }

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params; setRequestLocale(locale);
  const c = getContent(locale); const lp = c.landings.find((l) => l.slug === slug); if (!lp) notFound();
  const t = await getTranslations("lp");
  return (
    <section className="bg-paper py-14 print:py-0">
      <div className="container max-w-3xl">
        <Eyebrow>{t("thanks")}</Eyebrow>
        <H1>{lp.magnet.title}</H1>
        <p className="mt-3 max-w-prose text-slate print:hidden">{t("thanksIntro")}</p>
        <p className="mt-6 max-w-prose text-[15px]">{lp.magnet.intro}</p>
        <ol className="mt-6 divide-y divide-navy/10 rounded-card border border-navy/10 bg-white">
          {lp.magnet.items.map((i, k) => <li key={i} className="flex items-start gap-3 px-5 py-3 text-[15px]"><span className="w-7 shrink-0 font-serif text-gold-600" style={{ fontVariantNumeric: "tabular-nums" }}>{k + 1}</span><span className="flex-1">{i}</span><span aria-hidden="true" className="ml-2 h-5 w-5 shrink-0 rounded-field border border-navy/30" /></li>)}
        </ol>
        <p className="mt-4 text-xs text-slate">Dr Oliveira Consultores · droliveiraconsultores.com.br · {new Date().getFullYear()}</p>
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <PrintButton label={t("print")} />
          <Link href="/contato" className="inline-flex items-center gap-2 rounded bg-gold px-5 py-3 font-medium text-navy"><Icons.express className="h-5 w-5" />{t("next")}</Link>
          <Link href="/" className="inline-flex items-center rounded border border-navy-500 px-5 py-3 font-medium text-navy">{t("back")}</Link>
        </div>
      </div>
    </section>
  );
}
