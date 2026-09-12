import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { listPosts } from "@/lib/blog";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1, Faq } from "@/components/ui";
import { getContent } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title"), description: t("intro"), alternates: buildAlternates(locale as Locale, { pathname: "/blog" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("blog"); const posts = listPosts(locale); const c = getContent(locale); const tc = await getTranslations("common");
  return (
    <>
    <Section tone="paper">
      <Eyebrow>Blog</Eyebrow>
      <H1>{t("title")}</H1>
      <p className="mt-3 max-w-prose text-slate">{t("intro")}</p>
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-card border border-navy/10 bg-white p-6">
            <p className="text-xs uppercase tracking-wider text-oliva-700">{p.sector} · {new Date(p.date).toLocaleDateString(locale === "pt" ? "pt-BR" : locale)} · {p.minutes} {t("minutes")}</p>
            <h2 className="mt-2 font-serif text-2xl text-navy"><Link href={{ pathname: "/blog/[slug]", params: { slug: p.slug } }} className="hover:text-gold-600">{p.title}</Link></h2>
            <p className="mt-2 text-[15px]">{p.description}</p>
            <Link href={{ pathname: "/blog/[slug]", params: { slug: p.slug } }} className="mt-3 inline-block text-sm font-medium text-gold-600">{t("read")} →</Link>
          </li>
        ))}
      </ul>
    </Section>
    <Section tone="cream"><Faq items={c.faq.slice(0, 3)} title={tc("faq")} /></Section>
    </>
  );
}
