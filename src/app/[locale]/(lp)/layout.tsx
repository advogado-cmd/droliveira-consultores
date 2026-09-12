import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BRAND, PHONE, EMAIL } from "@/lib/site";

// Layout enxuto das landing pages: sem menu, so marca, conteudo e rodape minimo.
export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-navy/10 bg-paper">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label={BRAND}><Image src="/brand/logo-navy.png" alt={BRAND} width={220} height={53} priority className="h-11 w-auto" /></Link>
          <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="text-sm font-medium text-navy">{PHONE}</a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-navy/10 bg-navy py-8 text-center text-xs text-cream/70">
        <div className="container">© {new Date().getFullYear()} {BRAND} · {EMAIL} · <Link href="/privacidade" className="underline">Privacidade</Link></div>
      </footer>
    </>
  );
}
