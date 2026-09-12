// Modelo de conteudo editorial. Um arquivo por idioma (pt.ts, en.ts, es.ts).
// Quando o Payload CMS entrar, estes objetos viram documentos localizados com o mesmo formato.

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  question: string;
  deliverable: string;
  timeline: string;
  detail: string;
};

export type Sector = {
  slug: string; // slug localizado da URL
  key: "hospitais" | "odontologia" | "veterinaria" | "estetica" | "laboratorios"; // chave estavel para hreflang
  name: string;
  short: string; // para cards
  headline: string;
  analyse: string[];
  outcome: string;
  metaTitle: string;
  metaDescription: string;
};

export type Consultant = {
  eyebrow: string;
  title: string;
  intro: string;
  legal: { label: string; items: string[] };
  management: { label: string; items: string[] };
  cta: string;
};

export type People = {
  eyebrow: string;
  title: string;
  intro: string;
  items: { title: string; text: string; bullets: string[] }[];
  note: string;
};

export type SiteContent = {
  meta: { title: string; description: string; ogLocale: string };
  consultant: Consultant;
  people: People;
  home: {
    heroTitle: string;
    heroSub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    lenses: { title: string; text: string }[];
    moves: { n: string; title: string; text: string }[];
    forWhom: string;
    proof: { title: string; text: string };
    finalTitle: string;
    finalSub: string;
    finalCta: string;
  };
  services: { metaTitle: string; metaDescription: string; title: string; intro: string; items: Service[]; faq: Faq[] };
  sectors: { metaTitle: string; metaDescription: string; title: string; intro: string; items: Sector[] };
  method: { metaTitle: string; metaDescription: string; title: string; intro: string; families: { name: string; fronts: string[] }[]; rules: string[]; note: string };
  about: { metaTitle: string; metaDescription: string; title: string; name: string; bio: string[]; credentials: string[]; network: string };
  investors: { metaTitle: string; metaDescription: string; title: string; intro: string; points: string[]; cta: string };
  contact: { metaTitle: string; metaDescription: string; title: string; intro: string; cities: string; sectorOptions: string[] };
  legal: { privacy: { title: string; body: string[] }; cookies: { title: string; body: string[] }; terms: { title: string; body: string[] } };
  faq: Faq[];
};
