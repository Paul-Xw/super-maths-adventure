-- Super Maths Adventure v6 Performance Patch
-- Same question_bank schema as v5, optimized indexes.
create table if not exists public.question_bank (
  id uuid primary key default gen_random_uuid(),
  world_slug text not null,
  lesson_id text default 'general',
  topic text,
  difficulty int default 1 check (difficulty between 1 and 5),
  question_en text not null,
  question_th text,
  choice_a text not null,
  choice_b text not null,
  choice_c text not null,
  choice_d text not null,
  answer text not null,
  explanation_en text,
  explanation_th text,
  type text default 'multiple_choice',
  tags text,
  created_by text,
  published boolean default true,
  version int default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_qb_world_published_created on public.question_bank(world_slug,published,created_at desc);
create index if not exists idx_qb_world_topic on public.question_bank(world_slug,topic);
alter table public.question_bank enable row level security;
drop policy if exists "question_bank_read_published" on public.question_bank;
create policy "question_bank_read_published" on public.question_bank for select using (published = true);
drop policy if exists "question_bank_insert_anyone" on public.question_bank;
create policy "question_bank_insert_anyone" on public.question_bank for insert with check (true);
select 'SMA v6 Performance patch completed' as status;