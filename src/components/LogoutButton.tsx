"use client";
export default function LogoutButton({ path, label }: { path: string; label: string }) {
  return <button onClick={async () => { await fetch(path, { method: "POST" }); location.reload(); }} className="rounded border border-navy-500 px-4 py-2 text-sm font-medium text-navy hover:bg-cream">{label}</button>;
}
