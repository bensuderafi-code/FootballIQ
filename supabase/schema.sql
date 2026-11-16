create extension if not exists pgcrypto;
create table if not exists public.predictions (
 id uuid primary key default gen_random_uuid(),
 fixture_id text not null, league text not null, home_team text not null, away_team text not null,
 kickoff timestamptz not null, logged_at timestamptz not null, model_version text not null,
 p_home double precision not null check (p_home between 0 and 1),
 p_draw double precision not null check (p_draw between 0 and 1),
 p_away double precision not null check (p_away between 0 and 1),
 input_home_xg double precision not null check (input_home_xg >= 0),
 input_away_xg double precision not null check (input_away_xg >= 0),
 audit_hash text not null unique, created_at timestamptz not null default now(),
 check (abs((p_home+p_draw+p_away)-1) < 0.002)
);
alter table public.predictions enable row level security;
drop policy if exists "Public can read prediction ledger" on public.predictions;
create policy "Public can read prediction ledger" on public.predictions for select to anon, authenticated using (true);
drop policy if exists "Public can append prediction ledger" on public.predictions;
create policy "Public can append prediction ledger" on public.predictions for insert to anon, authenticated with check (true);
revoke update, delete, truncate on public.predictions from anon, authenticated;
grant select, insert on public.predictions to anon, authenticated;
