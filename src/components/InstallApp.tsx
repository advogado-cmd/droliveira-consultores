"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Icons } from "./icons";

type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

// Registra o service worker e oferece "Instalar app" quando o navegador permitir (Chrome/Edge/Android); no iOS mostra a instrucao.
export default function InstallApp({ variant = "footer" }: { variant?: "footer" | "menu" }) {
  const t = useTranslations("pwa");
  const [evt, setEvt] = useState<BIP | null>(null); const [ios, setIos] = useState(false); const [done, setDone] = useState(false);
  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
    const onBip = (e: Event) => { e.preventDefault(); setEvt(e as BIP); };
    window.addEventListener("beforeinstallprompt", onBip);
    const ua = navigator.userAgent; const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone;
    setIos(/iphone|ipad|ipod/i.test(ua) && !standalone); setDone(Boolean(standalone));
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);
  if (done) return null;
  if (!evt && !ios) return null;
  const cls = variant === "footer" ? "inline-flex items-center gap-2 rounded border border-cream/40 px-3 py-2 text-sm text-cream hover:bg-cream/10" : "flex items-center gap-2 rounded px-2 py-2 text-navy hover:bg-cream";
  if (ios) return <p className={variant === "footer" ? "text-xs text-cream/70" : "text-sm text-slate"}>{t("ios")}</p>;
  return <button onClick={async () => { await evt!.prompt(); const c = await evt!.userChoice; if (c.outcome === "accepted") setDone(true); }} className={cls}><Icons.download className="h-4 w-4" />{t("install")}</button>;
}
