import { NextResponse } from "next/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildIndex, search } from "@/lib/searchIndex";
import { SITE_URL } from "@/lib/site";

// Busca por IA: recupera os trechos mais relevantes do site (RAG simples) e pede ao modelo uma resposta restrita a esse contexto.
export async function POST(req: Request) {
  const { q, locale: l, history = [] } = await req.json();
  const locale = hasLocale(routing.locales, l) ? l : "pt";
  if (!q || typeof q !== "string") return NextResponse.json({ answer: null }, { status: 400 });
  const docs = buildIndex(locale);
  const hits = search(docs, q, 6);
  const context = (hits.length ? hits : docs.slice(0, 6)).map((h) => `### ${h.title}\n${docs.find((d) => d.href === h.href && d.title === h.title)?.text ?? h.text}`).join("\n\n");
  const sources = hits.slice(0, 4).map((h) => ({ title: h.title, href: h.href }));
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ answer: null, sources });

  const lang = { pt: "português do Brasil", en: "English", es: "español" }[locale as "pt" | "en" | "es"];
  const system = `You are the assistant of Dr Oliveira Consultores, a business-strategy consultancy for healthcare, dental, veterinary and aesthetic businesses in Brazil. Answer ONLY from the CONTEXT below, in ${lang}, in 2 to 6 short sentences, direct and without marketing adjectives. If the context does not cover the question, say so and suggest requesting a due diligence through the contact page (${SITE_URL}). Never give legal, medical or veterinary advice; never promise results; never mention any law firm.\n\nCONTEXT:\n${context}`;
  const messages = [...(Array.isArray(history) ? history : []).map((m: { role: string; text: string }) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })), { role: "user", content: q }];
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5", max_tokens: 500, system, messages }),
    });
    const j = await r.json();
    const answer = j?.content?.map((c: { text?: string }) => c.text ?? "").join("") || null;
    return NextResponse.json({ answer, sources });
  } catch (e) {
    console.error("[ia]", e);
    return NextResponse.json({ answer: null, sources }, { status: 500 });
  }
}
