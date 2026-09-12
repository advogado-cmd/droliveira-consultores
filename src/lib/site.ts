export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://droliveiraconsultores.com.br").replace(/\/$/, "");
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? ""; // [A CONFIRMAR] numero proprio da consultoria, ex.: 5511XXXXXXXXX
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const BRAND = "Dr Oliveira Consultores";
export const CONSULTANT = "Carlos Fernando Lopes de Oliveira";

export function whatsappHref(text: string) {
  if (!WHATSAPP) return "#contato";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}
