import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { makeToken, COOKIE, cookieOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== "string") return NextResponse.json({ ok: false }, { status: 503 });
  const a = Buffer.from(password), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return NextResponse.json({ ok: false }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE.admin, makeToken({ sub: "admin", role: "admin" }), cookieOptions());
  return res;
}
