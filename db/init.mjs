// Cria as tabelas no Neon: `DATABASE_URL=... node db/init.mjs`
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
const sql = neon(process.env.DATABASE_URL);
const ddl = readFileSync(new URL("./schema.sql", import.meta.url), "utf8");
for (const stmt of ddl.split(/;\s*\n/).map((s) => s.trim()).filter(Boolean)) await sql.query(stmt);
console.log("schema ok");
