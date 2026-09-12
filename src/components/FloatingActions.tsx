"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icons } from "./icons";
import { whatsappHref } from "@/lib/site";

// Botoes flutuantes: WhatsApp (so desktop; no mobile fica na barra inferior) e Busca por IA (desktop e mobile).
export default function FloatingActions() {
  const t = useTranslations("nav"); const locale = useLocale();
  const wa = whatsappHref(locale === "pt" ? "Olá, quero solicitar uma due diligence." : locale === "es" ? "Hola, quiero solicitar una due diligence." : "Hello, I would like to request a due diligence.");
  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      <Link href="/ia" className="pointer-events-auto group flex items-center gap-2 rounded-full border border-gold/60 bg-navy py-3 pl-3 pr-4 text-cream shadow-lg hover:bg-navy-500" aria-label={t("ai")}>
        <Icons.sparkles className="h-6 w-6 text-gold" />
        <span className="hidden text-sm font-medium lg:inline">{t("ai")}</span>
      </Link>
      <a href={wa} target={wa.startsWith("http") ? "_blank" : undefined} rel="noopener" className="pointer-events-auto hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:brightness-95 lg:flex" aria-label={t("whatsapp")}>
        <Icons.whatsapp className="h-8 w-8" />
      </a>
    </div>
  );
}
