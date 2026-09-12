export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://droliveiraconsultores.com.br").replace(/\/$/, "");
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "5511998586777";
export const PHONE = "+55 11 99858-6777";
export const EMAIL = "droliveira@droliveiraconsultores.com.br";
// Redes sociais: [A CONFIRMAR] URLs dos perfis da consultoria
export const SOCIALS = [
  { name: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN ?? "https://www.linkedin.com/company/droliveiraconsultores" },
  { name: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM ?? "https://www.instagram.com/droliveiraconsultores" },
  { name: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE ?? "https://www.youtube.com/@droliveiraconsultores" },
  { name: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK ?? "https://www.facebook.com/droliveiraconsultores" },
];
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const BRAND = "Dr Oliveira Consultores";
export const CONSULTANT = "Carlos Fernando Lopes de Oliveira";

export function whatsappHref(text: string) {
  if (!WHATSAPP) return "#contato";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}
