-- Area do cliente · Dr Oliveira Consultores. Rodar uma vez no Neon (SQL Editor) ou via `npm run db:init`.
create extension if not exists pgcrypto;

create table if not exists cliente (
  id            uuid primary key default gen_random_uuid(),
  criado_em     timestamptz not null default now(),
  nome          text not null,
  empresa       text not null,
  email         text not null unique,
  senha_hash    text not null,          -- scrypt: salt$hash (hex)
  ativo         boolean not null default true
);

create table if not exists artifact (
  id            uuid primary key default gen_random_uuid(),
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  cliente_id    uuid not null references cliente(id) on delete cascade,
  titulo        text not null,
  url           text not null,          -- URL do arquivo no Vercel Blob (nunca exposta ao cliente; servida por proxy autenticado)
  bytes         integer,
  publicado     boolean not null default true
);
create index if not exists artifact_cliente_idx on artifact (cliente_id);

create table if not exists acesso_log (
  id          bigserial primary key,
  em          timestamptz not null default now(),
  cliente_id  uuid references cliente(id) on delete set null,
  artifact_id uuid references artifact(id) on delete set null,
  evento      text not null              -- login | abrir_artifact
);

create table if not exists lead (
  id          uuid primary key default gen_random_uuid(),
  criado_em   timestamptz not null default now(),
  nome        text not null,
  empresa     text,
  email       text not null,
  whatsapp    text,
  segmento    text not null,      -- slug da landing
  origem      text,               -- utm_source/medium/campaign
  locale      text
);
