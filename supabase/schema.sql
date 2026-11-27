-- Olive and Verse database setup.
-- Run once in Supabase: SQL Editor > New query > paste > Run.

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  stripe_session_id text unique not null,
  email text,
  name text,
  amount_total integer,
  currency text,
  items jsonb not null default '[]'::jsonb,
  email_sent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id bigint generated always as identity primary key,
  email text unique not null,
  name text,
  newsletter boolean not null default true,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.download_log (
  id bigint generated always as identity primary key,
  stripe_session_id text not null,
  slug text not null,
  license text not null,
  file_path text not null,
  created_at timestamptz not null default now()
);

-- Only the server (service role key) can read or write these tables.
alter table public.orders enable row level security;
alter table public.subscribers enable row level security;
alter table public.download_log enable row level security;

-- Storage buckets:
--   "downloads" = PRIVATE (paid files; the site hands out 10-minute signed links)
--   "free"      = PUBLIC  (free printables)
insert into storage.buckets (id, name, public) values ('downloads', 'downloads', false) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('free', 'free', true) on conflict (id) do nothing;
