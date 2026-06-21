-- SMAO v2 patch: Class Code + Teacher Dashboard policies
insert into teachers (teacher_name, email, role)
values ('Demo Teacher', 'teacher@example.com', 'teacher')
on conflict (email) do nothing;

insert into classes (class_name, class_code, academic_year)
values ('Year 8A', 'YEAR8A', '2026')
on conflict (class_code) do nothing;

drop policy if exists public_read_classes on classes;
create policy public_read_classes on classes for select using (true);

drop policy if exists public_insert_classes on classes;
create policy public_insert_classes on classes for insert with check (true);

drop policy if exists public_read_class_students on class_students;
create policy public_read_class_students on class_students for select using (true);

drop policy if exists public_insert_class_students on class_students;
create policy public_insert_class_students on class_students for insert with check (true);

drop policy if exists public_update_class_students on class_students;
create policy public_update_class_students on class_students for update using (true) with check (true);

drop policy if exists public_read_students on students;
create policy public_read_students on students for select using (true);

drop policy if exists public_update_students on students;
create policy public_update_students on students for update using (true) with check (true);

drop policy if exists public_read_teachers on teachers;
create policy public_read_teachers on teachers for select using (true);

drop policy if exists public_read_scores_v2 on scores;
create policy public_read_scores_v2 on scores for select using (true);

select 'SMAO v2 patch completed. Demo class code: YEAR8A' as status;
