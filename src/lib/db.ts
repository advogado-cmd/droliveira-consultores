import { neon } from "@neondatabase/serverless";

export const hasDb = () => Boolean(process.env.DATABASE_URL);

export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL não configurada");
  return neon(process.env.DATABASE_URL);
}

export type Cliente = { id: string; nome: string; empresa: string; email: string; ativo: boolean; criado_em: string };
export type Artifact = { id: string; cliente_id: string; titulo: string; url: string; bytes: number | null; atualizado_em: string; publicado: boolean };
