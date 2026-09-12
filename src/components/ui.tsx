import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";
import { IconBadge, type IconName } from "./icons";

export function Section({ children, className = "", tone = "paper" }: { children: React.ReactNode; className?: string; tone?: "paper" | "cream" | "navy" | "white" }) {
  const bg = { paper: "bg-paper", cream: "bg-cream", navy: "bg-navy text-cream", white: "bg-white" }[tone];
  return <section className={`${bg} py-16 md:py-20 ${className}`}><div className="container">{children}</div></section>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-3 text-xs font-medium uppercase tracking-[0.14em] ${light ? "text-gold" : "text-oliva-700"}`}>{children}</p>;
}

export function H1({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <h1 className={`font-serif text-4xl leading-tight md:text-5xl ${light ? "text-cream" : "text-navy"}`} style={{ textWrap: "balance" }}>{children}</h1>;
}
export function H2({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <h2 className={`font-serif text-2xl leading-snug md:text-3xl ${light ? "text-cream" : "text-navy"}`} style={{ textWrap: "balance" }}>{children}</h2>;
}

export function ButtonLink({ href, children, variant = "primary", ...rest }: ComponentProps<typeof Link> & { variant?: "primary" | "secondary" | "light" }) {
  const cls = {
    primary: "bg-gold text-navy hover:bg-gold-600 hover:text-white",
    secondary: "border border-navy-500 text-navy hover:bg-cream",
    light: "border border-cream/60 text-cream hover:bg-cream/10",
  }[variant];
  return <Link href={href} {...rest} className={`inline-block rounded px-6 py-3 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${cls}`}>{children}</Link>;
}

export function Card({ title, children, icon }: { title: string; children: React.ReactNode; icon?: IconName }) {
  return (
    <div className="rounded-card border border-navy/10 bg-white p-6">
      {icon && <div className="mb-4"><IconBadge name={icon} /></div>}
      <h3 className="font-serif text-xl text-navy">{title}</h3>
      <div className="mt-2 text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export function Faq({ items, title }: { items: { q: string; a: string }[]; title: string }) {
  return (
    <div>
      <H2>{title}</H2>
      <dl className="mt-6 divide-y divide-navy/10">
        {items.map((f) => (
          <div key={f.q} className="py-4">
            <dt className="font-medium text-navy">{f.q}</dt>
            <dd className="mt-1 max-w-prose text-[15px] text-ink">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
