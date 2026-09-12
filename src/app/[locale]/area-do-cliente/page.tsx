import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSession } from "@/lib/auth";
import { Section, Eyebrow, H1 } from "@/components/ui";
import ClientLogin from "@/components/ClientLogin";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "client" });
  return { title: t("title"), robots: { index: false } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  if (await getSession("cliente")) redirect({ href: "/area-do-cliente/painel", locale: locale as Locale });
  const t = await getTranslations("client");
  return (
    <Section tone="paper">
      <Eyebrow>{t("title")}</Eyebrow>
      <H1>{t("title")}</H1>
      <p className="mt-3 max-w-prose text-slate">{t("intro")}</p>
      <div className="mt-8"><ClientLogin mode="cliente" /></div>
    </Section>
  );
}
