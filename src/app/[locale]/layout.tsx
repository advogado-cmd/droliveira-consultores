import type { Metadata } from "next";
import { Roboto, Roboto_Serif } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { buildAlternates, ogLocaleFor } from "@/lib/seo";
import { SITE_URL, BRAND, CONSULTANT } from "@/lib/site";
import CookieBanner from "@/components/CookieBanner";
import { SearchProvider } from "@/components/SearchDialog";
import { JsonLd } from "@/components/ui";
import "../globals.css";

const sans = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-sans", display: "swap" });
const serif = Roboto_Serif({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-serif", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.meta.title, template: `%s · ${BRAND}` },
    description: c.meta.description,
    alternates: buildAlternates(locale as Locale, { pathname: "/" }),
    openGraph: { type: "website", siteName: BRAND, locale: ogLocaleFor(locale), title: c.meta.title, description: c.meta.description, images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image" },
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, title: BRAND, statusBarStyle: "black-translucent" },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const org = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-navy.png`,
    areaServed: "BR",
    founder: { "@type": "Person", name: CONSULTANT },
    knowsAbout: ["Healthcare management consulting", "Due diligence", "Regulatory compliance mapping", "Business strategy"],
    address: [
      { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
      { "@type": "PostalAddress", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
      { "@type": "PostalAddress", addressLocality: "Belém", addressRegion: "PA", addressCountry: "BR" },
    ],
  };

  return (
    <html lang={locale === "pt" ? "pt-BR" : locale} className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans">
        <NextIntlClientProvider>
          <SearchProvider>
                    {children}
          <CookieBanner />
          <JsonLd data={org} />
          </SearchProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
