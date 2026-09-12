import { NextResponse } from "next/server";

// Recebe o formulario de contato e envia por e-mail via Resend. Sem RESEND_API_KEY, apenas registra no log (ambiente de desenvolvimento).
export async function POST(req: Request) {
  let data: Record<string, string>;
  try { data = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (data.website) return NextResponse.json({ ok: true }); // honeypot
  const { name, company, sector, role, whatsapp, email, message, consent, locale } = data;
  if (!name || !company || !email || !message || !consent) return NextResponse.json({ ok: false }, { status: 422 });

  const to = process.env.CONTACT_TO ?? "contato@droliveiraconsultores.com.br";
  const from = process.env.CONTACT_FROM ?? "site@droliveiraconsultores.com.br";
  const text = `Nova solicitação pelo site (${locale})\n\nNome: ${name}\nEmpresa: ${company}\nSegmento: ${sector}\nCargo: ${role ?? ""}\nWhatsApp: ${whatsapp ?? ""}\nE-mail: ${email}\n\n${message}\n\nConsentimento LGPD: sim · ${new Date().toISOString()}`;

  if (!process.env.RESEND_API_KEY) { console.log("[contato] (sem RESEND_API_KEY)\n" + text); return NextResponse.json({ ok: true }); }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from, to, replyTo: email, subject: `Due diligence · ${company} (${sector})`, text });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contato] falha no envio", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
