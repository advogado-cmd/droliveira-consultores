import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { locales, routing, type AppPathname } from "@/i18n/routing";
import { allSectorParams, sectorSlugFor, getContent } from "@/lib/content";
import { listPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

const staticRoutes = ["/", "/servicos", "/segmentos", "/metodo", "/sobre", "/investidores", "/contato", "/faq", "/blog", "/ia", "/fusoes-e-aquisicoes"] as const satisfies readonly AppPathname[];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const route of staticRoutes) {
    for (const locale of locales) {
      const languages: Record<string, string> = {};
      for (const l of locales) languages[l === "pt" ? "pt-BR" : l] = `${SITE_URL}${getPathname({ locale: l, href: route })}`;
      languages["x-default"] = `${SITE_URL}${getPathname({ locale: routing.defaultLocale, href: route })}`;
      entries.push({ url: `${SITE_URL}${getPathname({ locale, href: route })}`, lastModified: new Date(), changeFrequency: route === "/" ? "weekly" : "monthly", priority: route === "/" ? 1 : 0.8, alternates: { languages } });
    }
  }
  for (const { locale, slug } of allSectorParams()) {
    const key = getContent(locale).sectors.items.find((s) => s.slug === slug)!.key;
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l === "pt" ? "pt-BR" : l] = `${SITE_URL}${getPathname({ locale: l, href: { pathname: "/segmentos/[slug]", params: { slug: sectorSlugFor(key, l) } } })}`;
    languages["x-default"] = `${SITE_URL}${getPathname({ locale: "pt", href: { pathname: "/segmentos/[slug]", params: { slug: sectorSlugFor(key, "pt") } } })}`;
    entries.push({ url: `${SITE_URL}${getPathname({ locale, href: { pathname: "/segmentos/[slug]", params: { slug } } })}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8, alternates: { languages } });
  }
  for (const locale of locales) for (const p of listPosts(locale)) {
    const languages: Record<string, string> = {};
    for (const l of locales) { const slug = l === locale ? p.slug : p.alt?.[l]; if (slug) languages[l === "pt" ? "pt-BR" : l] = `${SITE_URL}${getPathname({ locale: l, href: { pathname: "/blog/[slug]", params: { slug } } })}`; }
    entries.push({ url: `${SITE_URL}${getPathname({ locale, href: { pathname: "/blog/[slug]", params: { slug: p.slug } } })}`, lastModified: new Date(p.date), changeFrequency: "monthly", priority: 0.6, alternates: { languages } });
  }
  for (const locale of locales) for (const lp of getContent(locale).landings) {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l === "pt" ? "pt-BR" : l] = `${SITE_URL}${getPathname({ locale: l, href: { pathname: "/lp/[slug]", params: { slug: lp.slug } } })}`;
    entries.push({ url: `${SITE_URL}${getPathname({ locale, href: { pathname: "/lp/[slug]", params: { slug: lp.slug } } })}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7, alternates: { languages } });
  }
  return entries;
}
