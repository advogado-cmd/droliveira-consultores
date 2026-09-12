import { NextResponse } from "next/server";
import { db, hasDb } from "@/lib/db";
import { verifyPassword, makeToken, COOKIE, cookieOptions } from "@/lib/auth";

export async function POST(req: Request) {
  if (!hasDb()) return NextResponse.json({ ok: false }, { status: 503 });
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ ok: false }, { status: 400 });
  const rows = (await db()`select id, nome, senha_hash, ativo from cliente where lower(email) = lower(${email})`) as { id: string; nome: string; senha_hash: string; ativo: boolean }[];
  const c = rows[0];
  if (!c || !c.ativo || !verifyPassword(password, c.senha_hash)) return NextResponse.json({ ok: false }, { status: 401 });
  await db()`insert into acesso_log (cliente_id, evento) values (${c.id}, 'login')`;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE.cliente, makeToken({ sub: c.id, role: "cliente", nome: c.nome }), cookieOptions());
  return res;
}
