# droliveiraconsultores.com.br

Site trilíngue (PT · EN · ES) da Dr Oliveira Consultores Associados. Next.js 15 (App Router) + next-intl + Tailwind, deploy na Vercel.

## Rodar localmente

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abra http://localhost:3000 — a raiz redireciona para `/pt`.

## Estrutura

- `src/i18n/routing.ts` — idiomas, prefixo obrigatório (`/pt`, `/en`, `/es`) e slugs localizados por rota.
- `src/content/{pt,en,es}.ts` — todo o texto editorial, um arquivo por idioma (mesmo formato de `types.ts`). Quando o Payload CMS entrar, estes objetos viram documentos localizados.
- `messages/*.json` — textos de interface (menu, rodapé, formulário, cookies).
- `src/app/[locale]/…` — páginas: home, serviços, segmentos (hub + 5), método, sobre, investidores, contato, privacidade, cookies, termos.
- `src/app/api/contact/route.ts` — formulário → e-mail via Resend (honeypot + validação).
- `src/app/sitemap.ts` e `robots.ts` — sitemap com hreflang por URL; `opengraph-image.tsx` — imagem OG gerada.
- `public/brand/` — marca oficial (kit "Manual e Marcas", versão D4): `logo-navy.png/.svg`, `logo-clara.png`, `emblema.png/.svg`, `avatar.png`; favicons em `src/app/icon.png` e `src/app/apple-icon.png`. `public/consultor.jpg` — retrato do consultor.

## Recursos

- **Busca** (⌘K / Ctrl+K, barra inferior no mobile e `/pt/busca`): índice gerado do conteúdo + posts, servido por `/api/search`.
- **Pergunte à IA** (`/pt/ia`): recupera os trechos mais relevantes do site e pede resposta ao modelo (Anthropic) restrita a esse contexto; sem `ANTHROPIC_API_KEY` mostra só as páginas relacionadas.
- **FAQ** (`/pt/faq`) com schema FAQPage.
- **Blog** (`/pt/blog`): arquivos Markdown em `content/blog/{pt,en,es}/*.md` com frontmatter (`title`, `description`, `date`, `sector`, `alt` = slugs equivalentes nos outros idiomas para o hreflang).
- **Área do cliente** (`/pt/area-do-cliente`): login por e-mail/senha; painel lista os relatórios vinculados; cada relatório é servido por `/api/cliente/artifact/[id]` só ao dono (URL do Blob nunca exposta).
- **Admin** (`/pt/admin`): senha única (`ADMIN_PASSWORD`); cria clientes e vincula relatórios HTML (upload direto do navegador para o Vercel Blob, sem limite de 4,5 MB).
- **Barra inferior mobile**: WhatsApp, busca e contato fixos.

## Área do cliente — primeira configuração

1. Crie um projeto no Neon e copie a `DATABASE_URL`; rode `DATABASE_URL=... npm run db:init` (cria as tabelas de `db/schema.sql`).
2. Na Vercel, ative o Blob Storage do projeto (gera `BLOB_READ_WRITE_TOKEN`).
3. Defina `SESSION_SECRET` (32 bytes aleatórios em base64) e `ADMIN_PASSWORD`.
4. Acesse `/pt/admin`, crie o cliente e envie o relatório HTML vinculado a ele. O cliente entra em `/pt/area-do-cliente`.

Segurança: senhas com scrypt; sessões em cookie httpOnly assinado (HMAC) com 12 h; relatórios servidos por proxy autenticado com `no-store` e `noindex`; log de acessos em `acesso_log`.

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://droliveiraconsultores.com.br` (canonical, hreflang, sitemap) |
| `NEXT_PUBLIC_WHATSAPP` | número próprio da consultoria, só dígitos com DDI (ex.: `5511…`). Vazio = botão leva ao formulário |
| `NEXT_PUBLIC_GA_ID` | ID do GA4; só carrega após consentimento no banner |
| `RESEND_API_KEY` | chave do Resend; sem ela o formulário só registra no log |
| `CONTACT_TO` / `CONTACT_FROM` | destino e remetente do e-mail (o domínio do remetente precisa estar verificado no Resend) |
| `DATABASE_URL` | Neon Postgres (área do cliente) |
| `SESSION_SECRET` | chave das sessões (cliente e admin) |
| `ADMIN_PASSWORD` | senha do painel `/admin` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (upload dos relatórios) |
| `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` | busca por IA |

## Deploy

Push na `main` dispara o build na Vercel. Build: `next build`. Rollback: Vercel → Deployments → Promote to Production no deploy anterior.

## Conformidade

O site não menciona serviços jurídicos, OAB ou o escritório de advocacia. Termos, privacidade e cookies em `src/content/*.ts` (`legal`). Itens marcados `[A CONFIRMAR]` aguardam dados do titular.
