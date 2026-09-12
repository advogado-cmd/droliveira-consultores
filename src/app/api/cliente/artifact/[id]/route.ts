import { db, hasDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

// Serve o artifact HTML ao cliente dono (ou ao admin), sem expor a URL do Blob.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cliente = await getSession("cliente"); const admin = await getSession("admin");
  if (!cliente && !admin) return new Response("Não autorizado", { status: 401 });
  if (!hasDb()) return new Response("Indisponível", { status: 503 });
  const rows = (await db()`select url, cliente_id, publicado from artifact where id = ${id}`) as { url: string; cliente_id: string; publicado: boolean }[];
  const a = rows[0];
  if (!a || (!admin && (a.cliente_id !== cliente!.sub || !a.publicado))) return new Response("Não encontrado", { status: 404 });
  if (cliente) await db()`insert into acesso_log (cliente_id, artifact_id, evento) values (${cliente.sub}, ${id}, 'abrir_artifact')`;
  const r = await fetch(a.url);
  return new Response(r.body, { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "private, no-store", "x-robots-tag": "noindex, nofollow", "content-security-policy": "frame-ancestors 'none'" } });
}
