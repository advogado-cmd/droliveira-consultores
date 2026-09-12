import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSession } from "@/lib/auth";
import { db, hasDb, type Artifact } from "@/lib/db";
import { Section, Eyebrow, H1 } from "@/components/ui";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false } };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const s = await getSession("cliente");
  if (!s) redirect({ href: "/area-do-cliente", locale: locale as Locale });
  const t = await getTranslations("client");
  const arts = hasDb() ? ((await db()`select id, titulo, atualizado_em from artifact where cliente_id = ${s!.sub} and publicado order by atualizado_em desc`) as Artifact[]) : [];
  return (
    <Section tone="paper">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><Eyebrow>{t("title")}</Eyebrow><H1>{t("welcome")}, {s!.nome}</H1></div>
        <LogoutButton path="/api/auth/logout" label={t("logout")} />
      </div>
      <h2 className="mt-10 font-serif text-2xl text-navy">{t("yourReports")}</h2>
      {arts.length === 0 && <p className="mt-3 text-slate">{t("none")}</p>}
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {arts.map((a) => (
          <li key={a.id} className="rounded-card border border-navy/10 bg-white p-5">
            <p className="font-medium text-navy">{a.titulo}</p>
            <p className="mt-1 text-xs text-slate">{t("updated")} {new Date(a.atualizado_em).toLocaleDateString(locale === "pt" ? "pt-BR" : locale)}</p>
            <a href={`/api/cliente/artifact/${a.id}`} target="_blank" rel="noopener" className="mt-3 inline-block rounded bg-gold px-4 py-2 text-sm font-medium text-navy">{t("open")} →</a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
