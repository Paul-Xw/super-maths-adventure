-- SMAO v3.1 Math Pack SQL Patch
insert into topics (subject_id, topic_name, year_group, description, order_no)
select s.id, v.topic_name, 'Year 8', v.description, v.order_no
from subjects s
cross join (values
('Integers','Positive and negative integers',2),
('Decimals','Decimal operations and comparisons',3),
('Place Value & Rounding','Place value and rounding',4),
('Expressions, Formulae & Equations','Algebra basics',5),
('Angles & Constructions','Geometry basics',6),
('Fractions','Fraction operations',7),
('Percentages','Percentage calculations',8)
) as v(topic_name, description, order_no)
where s.subject_name='Mathematics'
on conflict do nothing;

insert into games (topic_id, game_name, game_slug, version, description)
select t.id, v.game_name, v.game_slug, '3.1', v.description
from topics t
join (values
('Integers','Super Integer','super-integers','Integer shooting game'),
('Decimals','Super Decimals Shooting','super-decimals-shooting-v2','Decimal shooting game'),
('Place Value & Rounding','Super Numbers','super-place-value','Place value and rounding game'),
('Expressions, Formulae & Equations','Super Algebra','super-algebra','Algebra shooting game'),
('Angles & Constructions','Super Geometry','super-geometry','Geometry shooting game'),
('Fractions','Super Fractions','super-fractions','Fraction shooting game'),
('Percentages','Super Percentages','super-percentages','Percentage shooting game')
) as v(topic_name, game_name, game_slug, description)
on t.topic_name=v.topic_name
on conflict (game_slug) do nothing;

select 'SMAO v3.1 Math Pack SQL patch completed' as status;