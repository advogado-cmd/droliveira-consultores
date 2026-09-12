"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { whatsappHref } from "@/lib/site";
import { SearchButton } from "./SearchDialog";

const items = [
  { href: "/servicos", key: "services" },
  { href: "/segmentos", key: "sectors" },
  { href: "/metodo", key: "method" },
  { href: "/sobre", key: "about" },
  { href: "/investidores", key: "investors" },
  { href: "/blog", key: "blog" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const wa = whatsappHref(locale === "pt" ? "Olá, quero solicitar uma due diligence." : locale === "es" ? "Hola, quiero solicitar una due diligence." : "Hello, I would like to request a due diligence.");

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-paper/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="Dr Oliveira Consultores">
          <Image src="/brand/logo-navy.png" alt="Dr Oliveira Consultores" width={220} height={68} priority className="h-11 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-navy lg:flex" aria-label="Principal">
          {items.map((i) => (
            <Link key={i.key} href={i.href} className="border-b-2 border-transparent py-1 hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              {t(i.key)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <SearchButton className="rounded border border-navy/20 px-3 py-2 text-sm text-slate hover:bg-cream" label="⌘K" />
          <Link href="/area-do-cliente" className="text-sm font-medium text-navy hover:text-gold-600">{t("client")}</Link>
          <LanguageSwitcher />
          <a href={wa} className="rounded border border-navy-500 px-3 py-2 text-sm font-medium text-navy hover:bg-cream" target={wa.startsWith("http") ? "_blank" : undefined} rel="noopener">
            {t("whatsapp")}
          </a>
          <Link href="/contato" className="rounded bg-gold px-4 py-2 text-sm font-medium text-navy hover:bg-gold-600 hover:text-white">
            {t("cta")}
          </Link>
        </div>
        <button className="rounded border border-navy/20 px-3 py-2 text-sm lg:hidden" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(!open)}>
          {open ? t("close") : t("menu")}
        </button>
      </div>
      {open && (
        <div id="menu-mobile" className="border-t border-navy/10 bg-paper lg:hidden">
          <nav className="container flex flex-col gap-1 py-3" aria-label="Principal">
            {items.map((i) => (
              <Link key={i.key} href={i.href} className="rounded px-2 py-2 text-navy hover:bg-cream" onClick={() => setOpen(false)}>
                {t(i.key)}
              </Link>
            ))}
            <Link href="/area-do-cliente" className="rounded px-2 py-2 text-navy hover:bg-cream" onClick={() => setOpen(false)}>{t("client")}</Link>
            <Link href="/ia" className="rounded px-2 py-2 text-navy hover:bg-cream" onClick={() => setOpen(false)}>{t("ai")}</Link>
            <Link href="/contato" className="mt-2 rounded bg-gold px-4 py-2 text-center font-medium text-navy" onClick={() => setOpen(false)}>
              {t("cta")}
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <LanguageSwitcher />
              <a href={wa} className="text-sm font-medium text-navy underline">{t("whatsapp")}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
