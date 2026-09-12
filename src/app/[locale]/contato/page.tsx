import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";
import { Section, Eyebrow, H1 } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { whatsappHref, WHATSAPP } from "@/lib/site";
import ImageFrame from "@/components/ImageFrame";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const c = getContent(locale);
  return { title: { absolute: c.contact.metaTitle }, description: c.contact.metaDescription, alternates: buildAlternates(locale as Locale, { pathname: "/contato" }) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const c = getContent(locale); const t = await getTranslations("nav");
  return (
    <Section tone="paper">
      <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
        <div>
          <Eyebrow>{t("contact")}</Eyebrow>
          <H1>{c.contact.title}</H1>
          <p className="mt-4 max-w-prose text-slate">{c.contact.intro}</p>
          <p className="mt-6 text-sm text-slate">{c.contact.cities}</p>
          {WHATSAPP && <a href={whatsappHref("Olá")} target="_blank" rel="noopener" className="mt-4 inline-block rounded border border-navy-500 px-4 py-2 text-sm font-medium text-navy hover:bg-cream">WhatsApp</a>}
          <p className="mt-4 text-sm text-slate">contato@droliveiraconsultores.com.br</p>
          <div className="mt-8"><ImageFrame brief={c.images.contact} ratio="4/3" /></div>
        </div>
        <div className="rounded-card border border-navy/10 bg-white p-6 md:p-8" id="contato">
          <ContactForm sectors={c.contact.sectorOptions} />
        </div>
      </div>
    </Section>
  );
}
