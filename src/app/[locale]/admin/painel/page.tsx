import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSession } from "@/lib/auth";
import { db, hasDb, type Cliente, type Artifact } from "@/lib/db";
import { Section, Eyebrow, H1 } from "@/components/ui";
import AdminPanel from "@/components/AdminPanel";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false } };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  if (!(await getSession("admin"))) redirect({ href: "/admin", locale: locale as Locale });
  const t = await getTranslations("admin");
  const clientes = hasDb() ? ((await db()`select id, nome, empresa, email, ativo, criado_em from cliente order by criado_em desc`) as Cliente[]) : [];
  const artifacts = hasDb() ? ((await db()`select a.id, a.cliente_id, a.titulo, a.url, a.bytes, a.atualizado_em, a.publicado from artifact a order by a.atualizado_em desc`) as Artifact[]) : [];
  return (
    <Section tone="paper">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><Eyebrow>Admin</Eyebrow><H1>{t("title")}</H1></div>
        <LogoutButton path="/api/admin/logout" label="Sair" />
      </div>
      {!hasDb() && <p className="mt-6 rounded-card border border-warn/50 bg-white p-4 text-sm">{t("noDb")}</p>}
      <div className="mt-8"><AdminPanel clientes={clientes} artifacts={artifacts} /></div>
    </Section>
  );
}
