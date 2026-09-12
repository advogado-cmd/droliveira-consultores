"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

export default function LeadForm({ slug, origem, cta }: { slug: string; origem: string; cta: string }) {
  const t = useTranslations("form"); const tl = useTranslations("lp"); const locale = useLocale(); const router = useRouter();
  const [state, setState] = useState<"idle" | "sending" | "err">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, slug, origem, locale }) });
      if (!r.ok) throw new Error(); router.push({ pathname: "/lp/[slug]/obrigado", params: { slug } });
    } catch { setState("err"); }
  }
  const input = "w-full rounded-field border border-navy/25 bg-white px-3 py-2.5 text-ink focus:outline focus:outline-2 focus:outline-gold";
  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div><label htmlFor="l-name" className="mb-1 block text-sm font-medium text-navy">{t("name")}</label><input id="l-name" name="name" required className={input} /></div>
      <div><label htmlFor="l-company" className="mb-1 block text-sm font-medium text-navy">{t("company")}</label><input id="l-company" name="company" required className={input} /></div>
      <div><label htmlFor="l-email" className="mb-1 block text-sm font-medium text-navy">{t("email")}</label><input id="l-email" name="email" type="email" required className={input} /></div>
      <div><label htmlFor="l-whatsapp" className="mb-1 block text-sm font-medium text-navy">{t("whatsapp")}</label><input id="l-whatsapp" name="whatsapp" type="tel" className={input} /></div>
      <div className="flex items-start gap-2 text-xs text-slate"><input id="l-consent" name="consent" type="checkbox" required className="mt-0.5 accent-gold-600" /><label htmlFor="l-consent">{tl("consent")} <Link href="/privacidade" className="text-gold-600 underline">{t("privacy")}</Link>.</label></div>
      {state === "err" && <p role="alert" className="text-sm text-err">{t("err")}</p>}
      <button type="submit" disabled={state === "sending"} className="rounded bg-gold px-5 py-3 font-medium text-navy hover:bg-gold-600 hover:text-white disabled:opacity-60">{state === "sending" ? tl("sending") : cta}</button>
    </form>
  );
}
