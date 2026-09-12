"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { upload } from "@vercel/blob/client";
import type { Cliente, Artifact } from "@/lib/db";

export default function AdminPanel({ clientes, artifacts }: { clientes: Cliente[]; artifacts: Artifact[] }) {
  const t = useTranslations("admin");
  const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  const input = "w-full rounded-field border border-navy/25 bg-white px-3 py-2 text-sm";

  async function createClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg("");
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = await fetch("/api/admin/clientes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setBusy(false); setMsg(r.ok ? t("done") : `${t("error")} ${r.status}`); if (r.ok) location.reload();
  }
  async function linkArtifact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg(t("uploading"));
    const fd = new FormData(e.currentTarget);
    const file = fd.get("file") as File; const cliente_id = String(fd.get("cliente_id")); const titulo = String(fd.get("titulo"));
    try {
      // Upload direto do navegador para o Vercel Blob (contorna o limite de 4,5 MB das rotas): o token e gerado em /api/admin/upload apos checar a sessao admin.
      const blob = await upload(`artifacts/${cliente_id}/${crypto.randomUUID()}.html`, file, { access: "public", handleUploadUrl: "/api/admin/upload", contentType: "text/html" });
      const r = await fetch("/api/admin/artifacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cliente_id, titulo, url: blob.url, bytes: file.size }) });
      setMsg(r.ok ? t("done") : `${t("error")} ${r.status}`); if (r.ok) location.reload();
    } catch (err) { setMsg(`${t("error")}: ${(err as Error).message}`); }
    setBusy(false);
  }
  const nome = (id: string) => clientes.find((c) => c.id === id)?.empresa ?? id;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-card border border-navy/10 bg-white p-6">
        <h2 className="font-serif text-xl text-navy">{t("newClient")}</h2>
        <form onSubmit={createClient} className="mt-4 grid gap-3">
          <input name="nome" placeholder={t("name")} required className={input} id="a-nome" />
          <input name="empresa" placeholder={t("company")} required className={input} id="a-empresa" />
          <input name="email" type="email" placeholder={t("email")} required className={input} id="a-email" />
          <input name="password" type="text" placeholder={t("tempPassword")} required minLength={8} className={input} id="a-pw" />
          <button disabled={busy} className="rounded bg-gold px-4 py-2 text-sm font-medium text-navy disabled:opacity-60">{t("create")}</button>
        </form>
        <h3 className="mt-8 text-xs font-medium uppercase tracking-wider text-slate">{t("clients")} ({clientes.length})</h3>
        <ul className="mt-2 divide-y divide-navy/10 text-sm">{clientes.map((c) => <li key={c.id} className="py-2"><span className="font-medium text-navy">{c.empresa}</span> · {c.nome} · {c.email}</li>)}</ul>
      </section>
      <section className="rounded-card border border-navy/10 bg-white p-6">
        <h2 className="font-serif text-xl text-navy">{t("link")}</h2>
        <form onSubmit={linkArtifact} className="mt-4 grid gap-3">
          <select name="cliente_id" required className={input} id="a-cliente" defaultValue=""><option value="" disabled>{t("clientSel")}</option>{clientes.map((c) => <option key={c.id} value={c.id}>{c.empresa} — {c.nome}</option>)}</select>
          <input name="titulo" placeholder={t("artTitle")} required className={input} id="a-titulo" />
          <input name="file" type="file" accept=".html,text/html" required className={input} id="a-file" />
          <button disabled={busy} className="rounded bg-gold px-4 py-2 text-sm font-medium text-navy disabled:opacity-60">{busy ? t("uploading") : t("upload")}</button>
        </form>
        {msg && <p className="mt-3 text-sm text-slate" role="status">{msg}</p>}
        <h3 className="mt-8 text-xs font-medium uppercase tracking-wider text-slate">{t("artifacts")} ({artifacts.length})</h3>
        <ul className="mt-2 divide-y divide-navy/10 text-sm">{artifacts.map((a) => <li key={a.id} className="py-2"><span className="font-medium text-navy">{a.titulo}</span> · {nome(a.cliente_id)} · {a.bytes ? `${(a.bytes / 1048576).toFixed(1)} MB` : ""} · <a href={`/api/cliente/artifact/${a.id}`} target="_blank" rel="noopener" className="text-gold-600 underline">abrir</a></li>)}</ul>
      </section>
    </div>
  );
}
