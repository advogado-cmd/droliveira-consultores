import { getContent } from "./content";
import { listPosts } from "./blog";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export type SearchDoc = { title: string; text: string; href: string; kind: string };

// Indice de busca por idioma, gerado do conteudo (paginas + posts). Servido em /api/search?locale=xx e usado tambem pela busca por IA.
export function buildIndex(locale: Locale): SearchDoc[] {
  const c = getContent(locale);
  const P = (href: Parameters<typeof getPathname>[0]["href"]) => getPathname({ locale, href });
  const docs: SearchDoc[] = [];
  docs.push({ kind: "page", title: c.home.heroTitle, text: [c.home.heroSub, ...c.home.lenses.map((l) => `${l.title}: ${l.text}`), ...c.home.moves.map((m) => `${m.title}: ${m.text}`), c.home.forWhom].join(" "), href: P("/") });
  docs.push({ kind: "page", title: c.consultant.title, text: [c.consultant.intro, ...c.consultant.legal.items, ...c.consultant.management.items, ...c.about.bio].join(" "), href: P("/sobre") });
  for (const s of c.services.items) docs.push({ kind: "service", title: s.name, text: `${s.question} ${s.deliverable} ${s.detail} ${s.timeline}`, href: `${P("/servicos")}#${s.slug}` });
  for (const s of c.sectors.items) docs.push({ kind: "sector", title: s.name, text: `${s.headline} ${s.analyse.join(". ")} ${s.outcome}`, href: P({ pathname: "/segmentos/[slug]", params: { slug: s.slug } }) });
  docs.push({ kind: "page", title: c.method.title, text: [c.method.intro, ...c.method.families.map((f) => `${f.name}: ${f.fronts.join(", ")}`), ...c.method.rules, c.method.note].join(" "), href: P("/metodo") });
  docs.push({ kind: "page", title: c.people.title, text: [c.people.intro, ...c.people.items.map((i) => `${i.title}: ${i.text} ${i.bullets.join(", ")}`), c.people.note].join(" "), href: `${P("/servicos")}#pessoas` });
  docs.push({ kind: "page", title: c.investors.title, text: `${c.investors.intro} ${c.investors.points.join(". ")}`, href: P("/investidores") });
  for (const f of c.faq) docs.push({ kind: "faq", title: f.q, text: f.a, href: P("/faq") });
  docs.push({ kind: "page", title: c.contact.title, text: `${c.contact.intro} ${c.contact.cities}`, href: P("/contato") });
  for (const p of listPosts(locale)) docs.push({ kind: "post", title: p.title, text: `${p.description} ${p.html.replace(/<[^>]+>/g, " ")}`.slice(0, 4000), href: P({ pathname: "/blog/[slug]", params: { slug: p.slug } }) });
  return docs;
}

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function search(docs: SearchDoc[], q: string, limit = 8) {
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  return docs
    .map((d) => {
      const t = norm(d.title), b = norm(d.text);
      let score = 0;
      for (const term of terms) { if (t.includes(term)) score += 5; const n = b.split(term).length - 1; score += Math.min(n, 5); }
      return { d, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ d }) => ({ ...d, text: snippet(d.text, terms) }));
}

function snippet(text: string, terms: string[]) {
  const n = norm(text); const i = Math.max(0, ...terms.map((t) => n.indexOf(t)).filter((x) => x >= 0));
  const start = Math.max(0, i - 80); return (start > 0 ? "…" : "") + text.slice(start, start + 220).trim() + "…";
}
