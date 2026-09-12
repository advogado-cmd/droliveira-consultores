"use client";
import { Icons } from "./icons";
export default function PrintButton({ label }: { label: string }) {
  return <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded border border-navy-500 px-5 py-3 font-medium text-navy hover:bg-cream"><Icons.download className="h-5 w-5" />{label}</button>;
}
