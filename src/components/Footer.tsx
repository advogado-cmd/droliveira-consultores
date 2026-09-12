import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BRAND } from "@/lib/site";

export default function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  return (
    <footer className="mt-20 border-t-4 border-gold bg-navy pb-16 text-cream lg:pb-0">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/brand/logo-clara.png" alt={BRAND} width={240} height={74} className="h-12 w-auto" />
          <p className="mt-4 max-w-md font-serif text-lg text-cream/90">{t("tagline")}</p>
          <p className="mt-3 text-sm text-cream/70">{t("cities")}</p>
        </div>
        <nav aria-label="Rodapé" className="text-sm">
          <ul className="space-y-2">
            <li><Link href="/servicos" className="hover:text-gold">{n("services")}</Link></li>
            <li><Link href="/segmentos" className="hover:text-gold">{n("sectors")}</Link></li>
            <li><Link href="/metodo" className="hover:text-gold">{n("method")}</Link></li>
            <li><Link href="/sobre" className="hover:text-gold">{n("about")}</Link></li>
            <li><Link href="/investidores" className="hover:text-gold">{n("investors")}</Link></li>
            <li><Link href="/contato" className="hover:text-gold">{n("contact")}</Link></li>
            <li><Link href="/blog" className="hover:text-gold">{n("blog")}</Link></li>
            <li><Link href="/faq" className="hover:text-gold">{n("faq")}</Link></li>
            <li><Link href="/ia" className="hover:text-gold">{n("ai")}</Link></li>
            <li><Link href="/area-do-cliente" className="hover:text-gold">{n("client")}</Link></li>
          </ul>
        </nav>
        <div className="text-sm">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">{t("legal")}</p>
          <ul className="space-y-2">
            <li><Link href="/privacidade" className="hover:text-gold">{t("privacy")}</Link></li>
            <li><Link href="/cookies" className="hover:text-gold">{t("cookies")}</Link></li>
            <li><Link href="/termos" className="hover:text-gold">{t("terms")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container flex flex-col gap-2 py-5 text-xs text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {BRAND}. {t("rights")}</p>
          <p className="max-w-xl">{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
