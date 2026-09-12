"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GA_ID } from "@/lib/site";

const KEY = "dro-consent";
export type Consent = "all" | "necessary";

export function readConsent(): Consent | null {
  try { return (localStorage.getItem(KEY) as Consent) || null; } catch { return null; }
}

function loadGA() {
  if (!GA_ID || document.getElementById("ga4")) return;
  const s = document.createElement("script");
  s.id = "ga4"; s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, { anonymize_ip: true });
}

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const c = readConsent();
    if (c === "all") loadGA();
    if (!c) setShow(true);
  }, []);
  function decide(c: Consent) {
    try { localStorage.setItem(KEY, c); } catch {}
    if (c === "all") loadGA();
    setShow(false);
  }
  if (!show) return null;
  return (
    <div role="dialog" aria-live="polite" aria-label="Cookies" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-card border border-navy/15 bg-white p-5 shadow-lg">
      <p className="text-sm text-ink">{t("text")} <Link href="/cookies" className="text-gold-600 underline">{t("policy")}</Link></p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={() => decide("necessary")} className="rounded border border-navy-500 px-4 py-2 text-sm font-medium text-navy hover:bg-cream">{t("reject")}</button>
        <button onClick={() => decide("all")} className="rounded bg-gold px-4 py-2 text-sm font-medium text-navy hover:bg-gold-600 hover:text-white">{t("accept")}</button>
      </div>
    </div>
  );
}
