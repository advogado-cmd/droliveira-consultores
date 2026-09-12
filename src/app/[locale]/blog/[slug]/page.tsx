import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { readPost, allPostParams } from "@/lib/blog";
import { buildAlternates } from "@/lib/seo";
import { JsonLd } from "@/components/ui";
import { BRAND, SITE_URL } from "@/lib/site";

export function generateStaticParams() { return allPostParams(); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params; const p = readPost(locale, slug); if (!p) return {};
  return { title: p.title, description: p.description, alternates: buildAlternates(locale as Locale, (l) => ({ pathname: "/blog/[slug]", params: { slug: l === locale ? slug : (p.alt?.[l] ?? slug) } })), openGraph: { type: "article", publishedTime: p.date } };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params; setRequestLocale(locale);
  const p = readPost(locale, slug); if (!p) notFound();
  const t = await getTranslations("blog");
  return (
    <article className="container py-14">
      <Link href="/blog" className="text-sm text-gold-600">← {t("back")}</Link>
      <p className="mt-6 text-xs uppercase tracking-wider text-oliva-700">{p.sector} · {new Date(p.date).toLocaleDateString(locale === "pt" ? "pt-BR" : locale)} · {p.minutes} {t("minutes")}</p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight text-navy" style={{ textWrap: "balance" }}>{p.title}</h1>
      <p className="mt-3 max-w-prose text-lg text-slate">{p.description}</p>
      <p className="mt-2 text-sm text-slate">{t("by")} {p.author}</p>
      <div className="prose-dro mt-8 max-w-prose text-[17px] leading-relaxed [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-navy [&_p]:mt-4 [&_em]:text-slate [&_a]:text-gold-600" dangerouslySetInnerHTML={{ __html: p.html }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.description, datePublished: p.date, author: { "@type": "Person", name: p.author }, publisher: { "@type": "Organization", name: BRAND, url: SITE_URL } }} />
    </article>
  );
}
