import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SECRET = () => process.env.SESSION_SECRET ?? "dev-secret-troque-em-producao";
const HOURS = 12;

export function hashPassword(pw: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}$${scryptSync(pw, salt, 64).toString("hex")}`;
}
export function verifyPassword(pw: string, stored: string) {
  const [salt, hash] = stored.split("$");
  if (!salt || !hash) return false;
  const a = Buffer.from(hash, "hex"); const b = scryptSync(pw, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}

type Session = { sub: string; role: "cliente" | "admin"; exp: number; nome?: string };

function sign(payload: string) { return createHmac("sha256", SECRET()).update(payload).digest("base64url"); }
export function makeToken(s: Omit<Session, "exp">) {
  const payload = Buffer.from(JSON.stringify({ ...s, exp: Date.now() + HOURS * 3600e3 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
export function readToken(token?: string): Session | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const good = sign(payload);
  if (good.length !== sig.length || !timingSafeEqual(Buffer.from(good), Buffer.from(sig))) return null;
  try { const s = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session; return s.exp > Date.now() ? s : null; } catch { return null; }
}

export const COOKIE = { cliente: "dro_cliente", admin: "dro_admin" } as const;
export async function getSession(role: "cliente" | "admin") {
  const c = await cookies();
  const s = readToken(c.get(COOKIE[role])?.value);
  return s && s.role === role ? s : null;
}
export function cookieOptions() {
  return { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: HOURS * 3600 };
}
