import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1 } from "@/components/ui";
import AiChat from "@/components/AiChat";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "ai" });
  return { title: t("title"), description: t("intro"), alternates: buildAlternates(locale as Locale, { pathname: "/ia" }) };
}

export default async function Page({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const { q = "" } = await searchParams; const t = await getTranslations("ai");
  return (
    <Section tone="paper">
      <Eyebrow>IA</Eyebrow>
      <H1>{t("title")}</H1>
      <p className="mt-3 max-w-prose text-slate">{t("intro")}</p>
      <div className="mt-8 max-w-3xl"><AiChat initial={q} /></div>
      <p className="mt-6 max-w-prose text-xs text-slate">{t("disclaimer")}</p>
    </Section>
  );
}
