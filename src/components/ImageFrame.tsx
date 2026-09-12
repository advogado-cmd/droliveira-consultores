import Image from "next/image";
import { Icons } from "./icons";

// Moldura de imagem: renderiza a foto quando existe; sem foto, mostra o quadro com a descricao do tipo de imagem prevista para a area.
export default function ImageFrame({ src, alt, brief, ratio = "4/3", className = "", tone = "light" }: { src?: string; alt?: string; brief: string; ratio?: string; className?: string; tone?: "light" | "dark" }) {
  if (src) return <Image src={src} alt={alt ?? ""} width={1200} height={900} className={`w-full rounded-card border-4 border-gold object-cover ${className}`} style={{ aspectRatio: ratio }} />;
  const cls = tone === "dark" ? "border-cream/30 bg-navy-500/40 text-cream/80" : "border-navy/20 bg-cream text-slate";
  return (
    <figure className={`flex w-full flex-col items-center justify-center gap-3 rounded-card border-2 border-dashed p-6 text-center ${cls} ${className}`} style={{ aspectRatio: ratio }} aria-label={brief}>
      <Icons.image className="h-8 w-8 opacity-70" />
      <figcaption className="max-w-xs text-sm leading-snug">{brief}</figcaption>
    </figure>
  );
}
