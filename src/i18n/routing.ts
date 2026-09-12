import { defineRouting } from "next-intl/routing";

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

// Slugs localizados por rota. As chaves sao os caminhos internos (em portugues).
export const routing = defineRouting({
  locales,
  defaultLocale: "pt",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/servicos": { pt: "/servicos", en: "/services", es: "/servicios" },
    "/segmentos": { pt: "/segmentos", en: "/sectors", es: "/sectores" },
    "/segmentos/[slug]": { pt: "/segmentos/[slug]", en: "/sectors/[slug]", es: "/sectores/[slug]" },
    "/metodo": { pt: "/metodo", en: "/method", es: "/metodo" },
    "/sobre": { pt: "/sobre", en: "/about", es: "/sobre" },
    "/investidores": { pt: "/investidores", en: "/investors", es: "/inversores" },
    "/contato": { pt: "/contato", en: "/contact", es: "/contacto" },
    "/privacidade": { pt: "/privacidade", en: "/privacy", es: "/privacidad" },
    "/cookies": "/cookies",
    "/termos": { pt: "/termos", en: "/terms", es: "/terminos" },
    "/faq": "/faq",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/busca": { pt: "/busca", en: "/search", es: "/busqueda" },
    "/ia": { pt: "/ia", en: "/ai", es: "/ia" },
    "/area-do-cliente": { pt: "/area-do-cliente", en: "/client-area", es: "/area-del-cliente" },
    "/area-do-cliente/painel": { pt: "/area-do-cliente/painel", en: "/client-area/dashboard", es: "/area-del-cliente/panel" },
    "/admin": "/admin",
    "/admin/painel": "/admin/painel",
  },
});

export type AppPathname = keyof typeof routing.pathnames;
