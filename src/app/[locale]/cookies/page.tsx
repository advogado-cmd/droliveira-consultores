import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, H1 } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const c = getContent(locale);
  return { title: c.legal.cookies.title, robots: { index: false }, alternates: buildAlternates(locale as Locale, { pathname: "/cookies" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale);
  return (
    <Section tone="paper">
      <H1>{c.legal.cookies.title}</H1>
      <div className="mt-6 max-w-prose space-y-4 text-[16px] leading-relaxed">
        {c.legal.cookies.body.map((p) => <p key={p}>{p}</p>)}
      </div>
    </Section>
  );
}
