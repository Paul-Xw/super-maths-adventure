-- Super Maths Adventure v5 CMS Patch
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
  image_url text,
  audio_url text,
  created_by text,
  published boolean default true,
  version int default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_question_bank_world_slug on public.question_bank(world_slug);
create index if not exists idx_question_bank_published on public.question_bank(published);
create index if not exists idx_question_bank_topic on public.question_bank(topic);

alter table public.question_bank enable row level security;

drop policy if exists "question_bank_read_published" on public.question_bank;
create policy "question_bank_read_published"
on public.question_bank for select
using (published = true);

drop policy if exists "question_bank_insert_anyone" on public.question_bank;
create policy "question_bank_insert_anyone"
on public.question_bank for insert
with check (true);

drop policy if exists "question_bank_update_anyone" on public.question_bank;
create policy "question_bank_update_anyone"
on public.question_bank for update
using (true)
with check (true);

drop policy if exists "question_bank_delete_anyone" on public.question_bank;
create policy "question_bank_delete_anyone"
on public.question_bank for delete
using (true);

insert into public.question_bank
(world_slug, topic, difficulty, question_en, question_th, choice_a, choice_b, choice_c, choice_d, answer, explanation_en, explanation_th, type, tags, created_by, published)
values
('world-1-integers','Addition',2,'What is -5 + 9?','ลบห้าบวกเก้าได้เท่าไร','4','5','-4','14','4','-5 + 9 = 4','9 มากกว่า 5 จึงเหลือ 4','multiple_choice','integer,addition','system',true),
('world-4-decimals','Comparing Decimals',2,'Which decimal is the greatest?','ทศนิยมใดมีค่ามากที่สุด','0.8','0.75','0.09','0.7','0.8','Compare tenths first.','เปรียบเทียบหลักส่วนสิบก่อน','multiple_choice','decimal,compare','system',true),
('world-13-probability','Probability',3,'A bag has 3 red balls and 2 blue balls. What is P(red)?','ถุงมีลูกบอลแดง 3 ลูก น้ำเงิน 2 ลูก ความน่าจะเป็นที่จะได้สีแดงคือเท่าไร','3/5','2/5','3/2','5/3','3/5','Favourable outcomes / total outcomes = 3/5.','เหตุการณ์ที่ต้องการ / ทั้งหมด = 3/5','multiple_choice','probability','system',true)
on conflict do nothing;

select 'Super Maths Adventure v5 CMS patch completed' as status;
