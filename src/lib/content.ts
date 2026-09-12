import type { Locale } from "@/i18n/routing";
import type { SiteContent, Sector } from "@/content/types";
import pt from "@/content/pt";
import en from "@/content/en";
import es from "@/content/es";

const all: Record<Locale, SiteContent> = { pt, en, es };

export function getContent(locale: string): SiteContent {
  return all[(locale as Locale) in all ? (locale as Locale) : "pt"];
}

export function getSector(locale: string, slug: string): Sector | undefined {
  return getContent(locale).sectors.items.find((s) => s.slug === slug);
}

// Mapa slug -> slug equivalente em outro idioma (via chave estavel), usado no seletor de idioma e no hreflang.
export function sectorSlugFor(key: Sector["key"], locale: Locale): string {
  const s = all[locale].sectors.items.find((i) => i.key === key);
  return s ? s.slug : "";
}

export function allSectorParams() {
  return (Object.keys(all) as Locale[]).flatMap((locale) => all[locale].sectors.items.map((s) => ({ locale, slug: s.slug })));
}
