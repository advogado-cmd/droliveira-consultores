"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function ClientLogin({ mode }: { mode: "cliente" | "admin" }) {
  const t = useTranslations(mode === "admin" ? "admin" : "client"); const router = useRouter();
  const [err, setErr] = useState(false); const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr(false);
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = await fetch(mode === "admin" ? "/api/admin/login" : "/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setBusy(false);
    if (r.ok) router.push(mode === "admin" ? "/admin/painel" : "/area-do-cliente/painel"); else setErr(true);
  }
  const input = "w-full rounded-field border border-navy/25 bg-white px-3 py-2.5 focus:outline focus:outline-2 focus:outline-gold";
  return (
    <form onSubmit={onSubmit} className="grid max-w-md gap-4 rounded-card border border-navy/10 bg-white p-6">
      {mode === "cliente" && <div><label htmlFor="l-email" className="mb-1 block text-sm font-medium text-navy">{t("email")}</label><input id="l-email" name="email" type="email" required autoComplete="username" className={input} /></div>}
      <div><label htmlFor="l-pw" className="mb-1 block text-sm font-medium text-navy">{t("password")}</label><input id="l-pw" name="password" type="password" required autoComplete="current-password" className={input} /></div>
      {err && <p role="alert" className="text-sm text-err">{mode === "admin" ? t("error") : t("error")}</p>}
      <button disabled={busy} className="rounded bg-gold px-5 py-2.5 font-medium text-navy disabled:opacity-60">{t("login")}</button>
    </form>
  );
}
