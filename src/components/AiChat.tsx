"use client";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Msg = { role: "user" | "assistant"; text: string; sources?: { title: string; href: string }[] };

export default function AiChat({ initial = "" }: { initial?: string }) {
  const t = useTranslations("ai"); const locale = useLocale();
  const [q, setQ] = useState(initial); const [msgs, setMsgs] = useState<Msg[]>([]); const [busy, setBusy] = useState(false);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    setMsgs((m) => [...m, { role: "user", text: question }]); setQ(""); setBusy(true);
    try {
      const r = await fetch("/api/ia", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ q: question, locale, history: msgs.slice(-6) }) });
      const j = await r.json();
      setMsgs((m) => [...m, { role: "assistant", text: j.answer ?? t("unavailable"), sources: j.sources }]);
    } catch { setMsgs((m) => [...m, { role: "assistant", text: t("unavailable") }]); }
    setBusy(false);
  }
  useEffect(() => { if (initial) ask(initial); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  return (
    <div className="rounded-card border border-navy/10 bg-white p-4 md:p-6">
      <div className="space-y-4">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "ml-auto max-w-[85%] rounded-card bg-cream px-4 py-3 text-navy" : "max-w-[92%] rounded-card border-l-4 border-gold bg-paper px-4 py-3"}>
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{m.text}</p>
            {m.sources && m.sources.length > 0 && (
              <p className="mt-2 text-xs text-slate">{t("sources")}: {m.sources.map((s, k) => <a key={k} href={s.href} className="mr-2 text-gold-600 underline">{s.title}</a>)}</p>
            )}
          </div>
        ))}
        {busy && <p className="text-sm text-slate">{t("thinking")}</p>}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(q); }} className="mt-4 flex gap-2">
        <input id="ia-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("placeholder")} className="w-full rounded-field border border-navy/25 px-3 py-2.5 focus:outline focus:outline-2 focus:outline-gold" aria-label={t("title")} />
        <button disabled={busy} className="rounded bg-gold px-4 py-2 font-medium text-navy disabled:opacity-60">{t("send")}</button>
      </form>
    </div>
  );
}
