import { NextResponse } from "next/server";
import { buildIndex, search } from "@/lib/searchIndex";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const cache = new Map<string, ReturnType<typeof buildIndex>>();
export function GET(req: Request) {
  const u = new URL(req.url); const l = u.searchParams.get("locale") ?? "pt"; const q = u.searchParams.get("q") ?? "";
  const locale = hasLocale(routing.locales, l) ? l : "pt";
  if (!cache.has(locale)) cache.set(locale, buildIndex(locale));
  return NextResponse.json(search(cache.get(locale)!, q));
}
