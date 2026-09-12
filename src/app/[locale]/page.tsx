import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { Section, Eyebrow, H1, H2, ButtonLink, Card, Faq, JsonLd } from "@/components/ui";
import { IconBadge, lensIcons, moveIcons, peopleIcons } from "@/components/icons";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getContent(locale);
  const t = await getTranslations("common");
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <>
      {/* Hero */}
      <section className="border-b-4 border-gold bg-navy text-cream">
        <div className="container grid items-center gap-10 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
          <div>
            <Eyebrow light>Estratégia · Mercado · Regulação · Pessoas</Eyebrow>
            <H1 light>{c.home.heroTitle}</H1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85">{c.home.heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contato">{c.home.ctaPrimary}</ButtonLink>
              <ButtonLink href="/metodo" variant="light">{c.home.ctaSecondary}</ButtonLink>
            </div>
          </div>
          <div className="hidden justify-center md:flex">
            <div className="relative">
              <Image src="/consultor.jpg" alt={c.consultant.title} width={360} height={450} className="w-72 rounded-card border-4 border-gold object-cover shadow-2xl" priority />
              <Image src="/brand/emblema.png" alt="" width={90} height={100} className="absolute -bottom-6 -left-6 w-20 drop-shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Tres lentes */}
      <Section tone="paper">
        <Eyebrow>{t("threeLenses")}</Eyebrow>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {c.home.lenses.map((l, i) => <Card key={l.title} title={l.title} icon={lensIcons[i]}>{l.text}</Card>)}
        </div>
      </Section>

      {/* Como funciona */}
      <Section tone="cream">
        <Eyebrow>{t("howItWorks")}</Eyebrow>
        <div className="grid gap-5 md:grid-cols-3">
          {c.home.moves.map((m) => (
            <div key={m.n} className="rounded-card border-l-4 border-oliva bg-white p-6">
              <div className="flex items-center justify-between"><IconBadge name={moveIcons[Number(m.n) - 1]} tone="oliva" /><p className="font-serif text-3xl text-gold-600">{m.n}</p></div>
              <h3 className="mt-1 font-serif text-2xl text-navy">{m.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8"><ButtonLink href="/metodo" variant="secondary">{c.home.ctaSecondary}</ButtonLink></div>
      </Section>

      {/* Para quem + segmentos */}
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>{t("forWhom")}</Eyebrow>
            <p className="max-w-prose text-[17px] leading-relaxed">{c.home.forWhom}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.sectors.items.map((s) => (
              <li key={s.key}>
                <Link href={{ pathname: "/segmentos/[slug]", params: { slug: s.slug } }} className="flex gap-3 rounded-card border border-navy/10 bg-white p-4 hover:border-gold">
                  <IconBadge name={s.key} /><span><span className="font-medium text-navy">{s.name}</span>
                  <span className="mt-1 block text-sm text-slate">{s.short}</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Quem conduz */}
      <Section tone="navy">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-start">
          <div>
            <Image src="/consultor.jpg" alt={c.consultant.title} width={480} height={600} loading="eager" className="w-full max-w-sm rounded-card border-4 border-gold object-cover" />
          </div>
          <div>
            <Eyebrow light>{c.consultant.eyebrow}</Eyebrow>
            <H2 light>{c.consultant.title}</H2>
            <p className="mt-4 max-w-prose text-cream/85">{c.consultant.intro}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[c.consultant.legal, c.consultant.management].map((g) => (
                <div key={g.label}>
                  <p className="text-xs font-medium uppercase tracking-wider text-gold">{g.label}</p>
                  <ul className="mt-2 space-y-2 text-[15px] text-cream/90">
                    {g.items.map((i) => <li key={i} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oliva-300" />{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8"><ButtonLink href="/sobre" variant="light">{c.consultant.cta}</ButtonLink></div>
          </div>
        </div>
      </Section>

      {/* Pessoas e organizacao */}
      <Section tone="paper">
        <Eyebrow>{c.people.eyebrow}</Eyebrow>
        <H2>{c.people.title}</H2>
        <p className="mt-3 max-w-prose text-slate">{c.people.intro}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {c.people.items.map((i, k) => (
            <div key={i.title} className="rounded-card border-t-4 border-oliva bg-white p-6">
              <div className="mb-4"><IconBadge name={peopleIcons[k]} tone="oliva" /></div>
              <h3 className="font-serif text-xl text-navy">{i.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{i.text}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate">{i.bullets.map((b) => <li key={b}>· {b}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-prose text-xs text-slate">{c.people.note}</p>
      </Section>

      {/* FAQ */}
      <Section tone="cream"><Faq items={c.faq} title={t("faq")} /><div className="mt-6"><ButtonLink href="/faq" variant="secondary">FAQ →</ButtonLink></div></Section>

      {/* CTA final */}
      <Section tone="paper">
        <div className="rounded-card border border-gold/60 bg-white p-8 md:p-12">
          <H2>{c.home.finalTitle}</H2>
          <p className="mt-3 max-w-prose text-slate">{c.home.finalSub}</p>
          <div className="mt-6"><ButtonLink href="/contato">{c.home.finalCta}</ButtonLink></div>
        </div>
      </Section>
      <JsonLd data={faqLd} />
    </>
  );
}
