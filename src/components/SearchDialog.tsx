"use client";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SearchDoc } from "@/lib/searchIndex";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useSearch = () => useContext(Ctx);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(true); } if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <Ctx.Provider value={{ open: () => setOpen(true) }}>{children}{open && <Dialog onClose={() => setOpen(false)} />}</Ctx.Provider>;
}

function Dialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations("search");
  const locale = useLocale();
  const [q, setQ] = useState("");
  const [res, setRes] = useState<SearchDoc[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  useEffect(() => {
    if (q.trim().length < 2) { setRes([]); return; }
    const id = setTimeout(async () => {
      const r = await fetch(`/api/search?locale=${locale}&q=${encodeURIComponent(q)}`); setRes(await r.json());
    }, 180);
    return () => clearTimeout(id);
  }, [q, locale]);
  return (
    <div className="fixed inset-0 z-50 bg-navy/60 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label={t("title")}>
      <div className="mx-auto mt-[8vh] max-w-2xl rounded-card border border-navy/15 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-navy/10 px-4 py-3">
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("placeholder")} className="w-full bg-transparent text-lg text-ink outline-none" aria-label={t("title")} />
          <button onClick={onClose} className="rounded border border-navy/20 px-2 py-1 text-xs text-slate">{t("close")}</button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q.trim().length >= 2 && res.length === 0 && <p className="p-4 text-sm text-slate">{t("none")} “{q}”.</p>}
          {res.map((r) => (
            <a key={r.href + r.title} href={r.href} onClick={onClose} className="block rounded px-3 py-2 hover:bg-cream">
              <span className="text-[11px] uppercase tracking-wider text-oliva-700">{r.kind}</span>
              <span className="block font-medium text-navy">{r.title}</span>
              <span className="block text-sm text-slate">{r.text}</span>
            </a>
          ))}
          {q.trim().length >= 2 && (
            <Link href={{ pathname: "/ia", query: { q } }} onClick={onClose} className="mt-2 block rounded border border-gold/60 bg-paper px-3 py-2 text-sm font-medium text-navy hover:bg-cream">{t("ai")} →</Link>
          )}
        </div>
        <p className="border-t border-navy/10 px-4 py-2 text-xs text-slate">{t("hint")}</p>
      </div>
    </div>
  );
}

export function SearchButton({ className = "", label }: { className?: string; label?: string }) {
  const { open } = useSearch(); const t = useTranslations("nav");
  return <button onClick={open} className={className} aria-label={t("search")}>{label ?? t("search")}</button>;
}
