-- SMA v6.1 Score Dashboard support
-- Run this only if your scores/classes/students tables are missing columns or policies.

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  class_code text unique not null,
  class_name text,
  created_at timestamptz default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  nickname text,
  year_group text,
  created_at timestamptz default now()
);

create table if not exists public.class_students (
  class_id uuid references public.classes(id) on delete cascade,
  student_id uuid references public.students(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (class_id, student_id)
);

create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete set null,
  player_name text,
  game_id uuid null,
  score int default 0,
  correct int default 0,
  total int default 0,
  stars int default 0,
  xp int default 0,
  coins int default 0,
  created_at timestamptz default now()
);

alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.class_students enable row level security;
alter table public.scores enable row level security;

drop policy if exists "classes_all" on public.classes;
create policy "classes_all" on public.classes for all using (true) with check (true);

drop policy if exists "students_all" on public.students;
create policy "students_all" on public.students for all using (true) with check (true);

drop policy if exists "class_students_all" on public.class_students;
create policy "class_students_all" on public.class_students for all using (true) with check (true);

drop policy if exists "scores_all" on public.scores;
create policy "scores_all" on public.scores for all using (true) with check (true);

create index if not exists idx_scores_player_created on public.scores(player_name, created_at desc);
create index if not exists idx_scores_student_created on public.scores(student_id, created_at desc);

select 'SMA v6.1 score dashboard patch completed' as status;
