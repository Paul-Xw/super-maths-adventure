-- Super Maths Adventure Online v3 Patch
create table if not exists coins_wallet (
  student_id uuid primary key references students(id) on delete cascade,
  total_xp int default 0,
  total_coins int default 0,
  updated_at timestamptz default now()
);
create table if not exists xp_logs (
  id bigint generated always as identity primary key,
  student_id uuid references students(id) on delete cascade,
  xp int default 0,
  reason text,
  created_at timestamptz default now()
);
alter table coins_wallet enable row level security;
alter table xp_logs enable row level security;
drop policy if exists public_read_coins_wallet on coins_wallet;
create policy public_read_coins_wallet on coins_wallet for select using (true);
drop policy if exists public_insert_coins_wallet on coins_wallet;
create policy public_insert_coins_wallet on coins_wallet for insert with check (true);
drop policy if exists public_update_coins_wallet on coins_wallet;
create policy public_update_coins_wallet on coins_wallet for update using (true) with check (true);
drop policy if exists public_read_xp_logs on xp_logs;
create policy public_read_xp_logs on xp_logs for select using (true);
drop policy if exists public_insert_xp_logs on xp_logs;
create policy public_insert_xp_logs on xp_logs for insert with check (true);
drop policy if exists public_read_assignments on assignments;
create policy public_read_assignments on assignments for select using (true);
drop policy if exists public_insert_assignments on assignments;
create policy public_insert_assignments on assignments for insert with check (true);
drop policy if exists public_read_student_achievements on student_achievements;
create policy public_read_student_achievements on student_achievements for select using (true);
drop policy if exists public_insert_student_achievements on student_achievements;
create policy public_insert_student_achievements on student_achievements for insert with check (true);
drop policy if exists public_read_classes_v3 on classes;
create policy public_read_classes_v3 on classes for select using (true);
drop policy if exists public_read_class_students_v3 on class_students;
create policy public_read_class_students_v3 on class_students for select using (true);
drop policy if exists public_insert_class_students_v3 on class_students;
create policy public_insert_class_students_v3 on class_students for insert with check (true);
drop policy if exists public_read_students_v3 on students;
create policy public_read_students_v3 on students for select using (true);
drop policy if exists public_insert_students_v3 on students;
create policy public_insert_students_v3 on students for insert with check (true);
drop policy if exists public_read_scores_v3 on scores;
create policy public_read_scores_v3 on scores for select using (true);
drop policy if exists public_insert_scores_v3 on scores;
create policy public_insert_scores_v3 on scores for insert with check (true);
insert into classes (class_name,class_code,academic_year) values ('Year 8A','YEAR8A','2026') on conflict (class_code) do nothing;
insert into achievements (achievement_code,title,description,icon,xp_reward,coins_reward)
values ('FIRST_SHOT','First Shot','Answer your first scene correctly','🎯',20,10),
('PERFECT_SCENE','Perfect Scene','Get 3 stars in one scene','⭐',80,40)
on conflict (achievement_code) do nothing;
select 'SMAO v3 patch completed' as status;