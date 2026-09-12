"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ContactForm({ sectors }: { sectors: string[] }) {
  const t = useTranslations("form");
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, locale }) });
      setState(r.ok ? "ok" : "err");
    } catch { setState("err"); }
  }

  if (state === "ok") return <p role="status" className="rounded-card border border-ok/40 bg-white p-6 text-navy">{t("ok")}</p>;

  const input = "w-full rounded-field border border-navy/25 bg-white px-3 py-2.5 text-ink focus:outline focus:outline-2 focus:outline-gold";
  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2" noValidate={false}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div><label htmlFor="f-name" className="mb-1 block text-sm font-medium text-navy">{t("name")}</label><input id="f-name" name="name" required className={input} /></div>
      <div><label htmlFor="f-company" className="mb-1 block text-sm font-medium text-navy">{t("company")}</label><input id="f-company" name="company" required className={input} /></div>
      <div><label htmlFor="f-sector" className="mb-1 block text-sm font-medium text-navy">{t("sector")}</label>
        <select id="f-sector" name="sector" required className={input} defaultValue="">
          <option value="" disabled>{t("select")}</option>
          {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
        </select></div>
      <div><label htmlFor="f-role" className="mb-1 block text-sm font-medium text-navy">{t("role")}</label><input id="f-role" name="role" className={input} /></div>
      <div><label htmlFor="f-whatsapp" className="mb-1 block text-sm font-medium text-navy">{t("whatsapp")}</label><input id="f-whatsapp" name="whatsapp" type="tel" className={input} /></div>
      <div><label htmlFor="f-email" className="mb-1 block text-sm font-medium text-navy">{t("email")}</label><input id="f-email" name="email" type="email" required className={input} /></div>
      <div className="md:col-span-2"><label htmlFor="f-message" className="mb-1 block text-sm font-medium text-navy">{t("message")}</label><textarea id="f-message" name="message" rows={5} required className={input} /></div>
      <div className="md:col-span-2 flex items-start gap-2 text-sm text-slate">
        <input id="f-consent" name="consent" type="checkbox" required className="mt-1 accent-gold-600" />
        <label htmlFor="f-consent">{t("consent")} <Link href="/privacidade" className="text-gold-600 underline">{t("privacy")}</Link>.</label>
      </div>
      {state === "err" && <p role="alert" className="md:col-span-2 text-sm text-err">{t("err")}</p>}
      <div className="md:col-span-2">
        <button type="submit" disabled={state === "sending"} className="rounded bg-gold px-6 py-3 font-medium text-navy hover:bg-gold-600 hover:text-white disabled:opacity-60">
          {state === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
