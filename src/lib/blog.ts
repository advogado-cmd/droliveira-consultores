import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Post = { slug: string; title: string; description: string; date: string; author: string; sector?: string; minutes: number; html: string; alt?: Record<string, string> };

const root = path.join(process.cwd(), "content", "blog");

export function listPosts(locale: string): Post[] {
  const dir = path.join(root, locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => readPost(locale, f.replace(/\.md$/, ""))!).filter(Boolean).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function readPost(locale: string, slug: string): Post | null {
  const file = path.join(root, locale, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const words = content.split(/\s+/).length;
  return { slug, title: data.title, description: data.description ?? "", date: String(data.date), author: data.author ?? "Carlos Fernando Lopes de Oliveira", sector: data.sector, minutes: Math.max(1, Math.round(words / 200)), html: marked.parse(content) as string, alt: data.alt };
}

export function allPostParams() {
  return ["pt", "en", "es"].flatMap((locale) => listPosts(locale).map((p) => ({ locale, slug: p.slug })));
}
