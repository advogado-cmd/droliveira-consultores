"use client";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { sectorSlugFor, getSector } from "@/lib/content";

// Mantem o usuario na pagina equivalente ao trocar de idioma (inclusive nos slugs de segmento).
export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("lang");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  function change(next: Locale) {
    if (pathname === "/segmentos/[slug]" && typeof params.slug === "string") {
      const sector = getSector(locale, params.slug);
      if (sector) {
        router.replace({ pathname: "/segmentos/[slug]", params: { slug: sectorSlugFor(sector.key, next) } }, { locale: next });
        return;
      }
    }
    // @ts-expect-error pathname tipado; params reaproveitados
    router.replace({ pathname, params }, { locale: next });
  }

  return (
    <label className="flex items-center gap-2 text-sm text-slate">
      <span className="sr-only">{t("label")}</span>
      <select value={locale} onChange={(e) => change(e.target.value as Locale)} className="rounded-field border border-navy/20 bg-white px-2 py-1.5 text-sm text-navy focus:outline focus:outline-2 focus:outline-gold" aria-label={t("label")}>
        {locales.map((l) => (
          <option key={l} value={l}>{t(l)}</option>
        ))}
      </select>
    </label>
  );
}
