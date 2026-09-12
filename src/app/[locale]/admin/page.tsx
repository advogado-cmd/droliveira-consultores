import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSession } from "@/lib/auth";
import { Section, Eyebrow, H1 } from "@/components/ui";
import ClientLogin from "@/components/ClientLogin";

export const metadata = { robots: { index: false } };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  if (await getSession("admin")) redirect({ href: "/admin/painel", locale: locale as Locale });
  const t = await getTranslations("admin");
  return (
    <Section tone="paper"><Eyebrow>Admin</Eyebrow><H1>{t("title")}</H1><div className="mt-8"><ClientLogin mode="admin" /></div></Section>
  );
}
