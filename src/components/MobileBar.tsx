"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSearch } from "./SearchDialog";
import { Icons } from "./icons";
import { whatsappHref } from "@/lib/site";

// Barra inferior fixa no mobile: contato, busca e WhatsApp em destaque.
export default function MobileBar() {
  const t = useTranslations("bar"); const locale = useLocale(); const { open } = useSearch();
  const wa = whatsappHref(locale === "pt" ? "Olá, quero solicitar uma due diligence." : locale === "es" ? "Hola, quiero solicitar una due diligence." : "Hello, I would like to request a due diligence.");
  const item = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium";
  return (
    <nav aria-label="Ações rápidas" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-navy/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <Link href="/contato" className={`${item} text-navy`}><Icons.mail className="h-6 w-6" />{t("contact")}</Link>
      <button onClick={open} className={`${item} text-navy`}><Icons.search className="h-6 w-6" />{t("search")}</button>
      <a href={wa} target={wa.startsWith("http") ? "_blank" : undefined} rel="noopener" className={`${item} bg-[#25D366] text-white`}><Icons.whatsapp className="h-7 w-7" />{t("whatsapp")}</a>
    </nav>
  );
}
