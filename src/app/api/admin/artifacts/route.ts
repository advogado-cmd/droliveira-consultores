import { NextResponse } from "next/server";
import { db, hasDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await getSession("admin"))) return NextResponse.json({ ok: false }, { status: 401 });
  if (!hasDb()) return NextResponse.json({ ok: false }, { status: 503 });
  const { cliente_id, titulo, url, bytes } = await req.json();
  if (!cliente_id || !titulo || !url) return NextResponse.json({ ok: false }, { status: 422 });
  await db()`insert into artifact (cliente_id, titulo, url, bytes) values (${cliente_id}, ${titulo}, ${url}, ${bytes ?? null})`;
  return NextResponse.json({ ok: true });
}
