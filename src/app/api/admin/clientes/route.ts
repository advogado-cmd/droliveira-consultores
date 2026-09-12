import { NextResponse } from "next/server";
import { db, hasDb } from "@/lib/db";
import { getSession, hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await getSession("admin"))) return NextResponse.json({ ok: false }, { status: 401 });
  if (!hasDb()) return NextResponse.json({ ok: false }, { status: 503 });
  const { nome, empresa, email, password } = await req.json();
  if (!nome || !empresa || !email || !password || String(password).length < 8) return NextResponse.json({ ok: false }, { status: 422 });
  await db()`insert into cliente (nome, empresa, email, senha_hash) values (${nome}, ${empresa}, ${String(email).toLowerCase()}, ${hashPassword(password)})`;
  return NextResponse.json({ ok: true });
}
