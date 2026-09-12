"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSearch } from "./SearchDialog";
import { whatsappHref } from "@/lib/site";

// Barra inferior fixa no mobile: WhatsApp, busca e contato.
export default function MobileBar() {
  const t = useTranslations("bar"); const locale = useLocale(); const { open } = useSearch();
  const wa = whatsappHref(locale === "pt" ? "Olá, quero solicitar uma due diligence." : locale === "es" ? "Hola, quiero solicitar una due diligence." : "Hello, I would like to request a due diligence.");
  const item = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium";
  return (
    <nav aria-label="Ações rápidas" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-navy/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a href={wa} target={wa.startsWith("http") ? "_blank" : undefined} rel="noopener" className={`${item} text-navy`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6-.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>
        {t("whatsapp")}
      </a>
      <button onClick={open} className={`${item} text-navy`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        {t("search")}
      </button>
      <Link href="/contato" className={`${item} bg-gold text-navy`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
        {t("contact")}
      </Link>
    </nav>
  );
}
