import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, locales, type Locale, type AppPathname } from "@/i18n/routing";
import { SITE_URL } from "./site";

type Href = { pathname: AppPathname; params?: Record<string, string> };

// Constroi canonical + hreflang (inclui a propria pagina e x-default) para uma rota interna.
export function buildAlternates(locale: Locale, href: Href | ((l: Locale) => Href)): Metadata["alternates"] {
  const resolve = (l: Locale) => (typeof href === "function" ? href(l) : href);
  const abs = (l: Locale) => {
    const h = resolve(l);
    // @ts-expect-error pathnames tipados por rota; params opcional
    const p = getPathname({ locale: l, href: h.params ? { pathname: h.pathname, params: h.params } : h.pathname });
    return `${SITE_URL}${p}`;
  };
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l === "pt" ? "pt-BR" : l] = abs(l);
  languages["x-default"] = abs(routing.defaultLocale);
  return { canonical: abs(locale), languages };
}

export function ogLocaleFor(locale: string) {
  return locale === "pt" ? "pt_BR" : locale === "es" ? "es_ES" : "en_US";
}
