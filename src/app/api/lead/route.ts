import { NextResponse } from "next/server";
import { db, hasDb } from "@/lib/db";
import { getContent } from "@/lib/content";
import { SITE_URL, BRAND } from "@/lib/site";
import { getPathname } from "@/i18n/navigation";

// Captura de lead das landing pages: grava no banco (se houver), avisa o consultor e envia o material ao lead por e-mail (Resend).
export async function POST(req: Request) {
  let d: Record<string, string>; try { d = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (d.website) return NextResponse.json({ ok: true });
  const { name, company, email, whatsapp, slug, origem, locale = "pt", consent } = d;
  if (!name || !email || !slug || !consent) return NextResponse.json({ ok: false }, { status: 422 });
  const lp = getContent(locale).landings.find((l) => l.slug === slug); if (!lp) return NextResponse.json({ ok: false }, { status: 404 });
  const link = `${SITE_URL}${getPathname({ locale: locale as "pt", href: { pathname: "/lp/[slug]/obrigado", params: { slug } } })}`;
  try { if (hasDb()) await db()`insert into lead (nome, empresa, email, whatsapp, segmento, origem, locale) values (${name}, ${company ?? null}, ${email}, ${whatsapp ?? null}, ${slug}, ${origem ?? null}, ${locale})`; } catch (e) { console.error("[lead] db", e); }
  const to = process.env.CONTACT_TO ?? "droliveira@droliveiraconsultores.com.br";
  const from = process.env.CONTACT_FROM ?? "site@droliveiraconsultores.com.br";
  if (!process.env.RESEND_API_KEY) { console.log("[lead]", { name, company, email, whatsapp, slug, origem, locale }); return NextResponse.json({ ok: true }); }
  try {
    const { Resend } = await import("resend"); const resend = new Resend(process.env.RESEND_API_KEY);
    const items = lp.magnet.items.map((i, k) => `${k + 1}. ${i}`).join("\n");
    await Promise.all([
      resend.emails.send({ from, to, replyTo: email, subject: `Lead LP ${slug} · ${company ?? name}`, text: `Nome: ${name}\nEmpresa: ${company ?? ""}\nE-mail: ${email}\nWhatsApp: ${whatsapp ?? ""}\nOrigem: ${origem ?? ""}\nIdioma: ${locale}\nMaterial: ${lp.magnet.title}` }),
      resend.emails.send({ from, to: email, subject: `${lp.magnet.title} · ${BRAND}`, text: `${lp.magnet.title}\n\n${lp.magnet.intro}\n\n${items}\n\n${link}\n\n${BRAND} · ${SITE_URL}` }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (e) { console.error("[lead] send", e); return NextResponse.json({ ok: false }, { status: 500 }); }
}
