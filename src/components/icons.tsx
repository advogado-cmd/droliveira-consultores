// Iconografia do site: traços simples (estilo lucide), 1.75px, herdando a cor do texto.
const P = (d: React.ReactNode, vb = "0 0 24 24") => ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox={vb} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{d}</svg>
);
export const Icons = {
  market: P(<><path d="M3 20h18"/><path d="M5 20V10"/><path d="M10 20V4"/><path d="M15 20v-8"/><path d="M20 20V7"/></>),
  marketing: P(<><path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M17 9a3 3 0 0 1 0 6"/><path d="M19.5 6.5a7 7 0 0 1 0 11"/></>),
  regulation: P(<><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></>),
  people: P(<><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M15 20a4.5 4.5 0 0 1 6-4"/></>),
  see: P(<><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>),
  unlock: P(<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/></>),
  grow: P(<><path d="M3 17 9 11l4 4 8-8"/><path d="M15 7h6v6"/></>),
  hospitais: P(<><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M12 8v6"/><path d="M9 11h6"/><path d="M9 21v-4h6v4"/></>),
  odontologia: P(<><path d="M7 3c-2.5 0-4 2-4 5 0 4 2 6 2 10 0 2 1 3 2 3s1.5-1 2-3c.5-2 1-3 3-3s2.5 1 3 3c.5 2 1 3 2 3s2-1 2-3c0-4 2-6 2-10 0-3-1.5-5-4-5-2 0-3 1-5 1S9 3 7 3z"/></>),
  veterinaria: P(<><circle cx="6" cy="9" r="2"/><circle cx="18" cy="9" r="2"/><circle cx="9" cy="5" r="2"/><circle cx="15" cy="5" r="2"/><path d="M12 11c-3 0-6 3-6 6a3 3 0 0 0 4 3l2-1 2 1a3 3 0 0 0 4-3c0-3-3-6-6-6z"/></>),
  estetica: P(<><path d="M12 3c-2 4-6 6-6 10a6 6 0 0 0 12 0c0-4-4-6-6-10z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/></>),
  laboratorios: P(<><path d="M9 3h6"/><path d="M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3"/><path d="M7 15h10"/></>),
  express: P(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  dd360: P(<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></>),
  plan: P(<><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="m9 15 2 2 4-4"/></>),
  steer: P(<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></>),
  readiness: P(<><path d="M4 20h16"/><path d="M6 20V9l6-5 6 5v11"/><path d="M10 20v-5h4v5"/></>),
  orgassess: P(<><rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="15" width="6" height="5" rx="1"/><rect x="15" y="15" width="6" height="5" rx="1"/><path d="M12 8v4M6 15v-3h12v3"/></>),
  nr1: P(<><path d="M12 21a9 9 0 1 0-9-9"/><path d="M12 3a9 9 0 0 1 9 9"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></>),
  sparkles: P(<><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/><path d="M4 15l.6 1.6L6.2 17l-1.6.6L4 19.2l-.6-1.6L1.8 17l1.6-.4z"/></>),
  whatsapp: ({ className = "h-6 w-6" }: { className?: string }) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6-.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>),
  search: P(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>),
  mail: P(<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>),
  image: P(<><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 17-5-5-8 8"/></>),
  user: P(<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>),
  download: P(<><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/></>),
  ma: P(<><path d="M3 21V9l6-4v16"/><path d="M9 21V13l6-4v12"/><path d="M15 21v-6l6-4v10"/><path d="M3 21h18"/></>),
  linkedin: P(<><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></>),
  instagram: P(<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01"/></>),
  youtube: P(<><rect x="2" y="6" width="20" height="12" rx="4"/><path d="m10 9 5 3-5 3z"/></>),
  facebook: P(<><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></>),
  phone: P(<><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></>),
  check: P(<><path d="m5 12 4 4L19 6"/></>),
};
export type IconName = keyof typeof Icons;
export const lensIcons: IconName[] = ["regulation", "market", "marketing", "people"];
export const moveIcons: IconName[] = ["see", "unlock", "grow"];
export const serviceIcons: IconName[] = ["express", "dd360", "plan", "steer", "readiness", "orgassess", "nr1"];
export const peopleIcons: IconName[] = ["orgassess", "people", "nr1"];
export function IconBadge({ name, tone = "gold", size = "md" }: { name: IconName; tone?: "gold" | "oliva" | "cream"; size?: "md" | "lg" }) {
  const I = Icons[name];
  const cls = { gold: "bg-gold/20 text-gold-600", oliva: "bg-oliva/15 text-oliva-700", cream: "bg-cream/15 text-gold" }[tone];
  return <span className={`inline-flex shrink-0 items-center justify-center rounded-card ${size === "lg" ? "h-14 w-14" : "h-11 w-11"} ${cls}`}><I className={size === "lg" ? "h-7 w-7" : "h-6 w-6"} /></span>;
}
