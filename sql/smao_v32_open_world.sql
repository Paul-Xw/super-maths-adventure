-- SMAO v3.2 Open World RPG SQL Patch
insert into topics (subject_id, topic_name, year_group, description, order_no)
select s.id, v.topic_name, 'Year 8', v.description, v.order_no
from subjects s
cross join (values
('Integers','Integer Kingdom',1),
('Expressions, Formulae & Equations','Algebra City',2),
('Place Value & Rounding','Number Mountain',3),
('Decimals','Decimal Ocean',4),
('Angles & Constructions','Geometry Island',5),
('Collecting Data','Data Forest',6),
('Fractions','Fraction Castle',7),
('Shapes & Symmetry','Shape Kingdom',8),
('Sequences & Functions','Function Laboratory',9),
('Percentages','Percentage Town',10),
('Graphs','Graph City',11),
('Ratio & Proportion','Ratio Valley',12),
('Probability','Probability Lab',13),
('Position & Transformation','Transformation Planet',14),
('Distance, Area & Volume','Measurement Mountain',15),
('Interpreting & Discussing Results','Statistics Universe',16)
) as v(topic_name, description, order_no)
where s.subject_name='Mathematics'
on conflict do nothing;

insert into games (topic_id, game_name, game_slug, version, description)
select t.id, v.game_name, v.game_slug, '3.2', v.description
from topics t
join (values
('Integers','World 1 Integer Kingdom','world-1-integers','Open World RPG'),
('Expressions, Formulae & Equations','World 2 Algebra City','world-2-algebra','Open World RPG'),
('Place Value & Rounding','World 3 Number Mountain','world-3-place-value','Open World RPG'),
('Decimals','World 4 Decimal Ocean','world-4-decimals','Open World RPG'),
('Angles & Constructions','World 5 Geometry Island','world-5-angles','Open World RPG'),
('Collecting Data','World 6 Data Forest','world-6-data','Open World RPG'),
('Fractions','World 7 Fraction Castle','world-7-fractions','Open World RPG'),
('Shapes & Symmetry','World 8 Shape Kingdom','world-8-shapes','Open World RPG'),
('Sequences & Functions','World 9 Function Laboratory','world-9-sequences','Open World RPG'),
('Percentages','World 10 Percentage Town','world-10-percentages','Open World RPG'),
('Graphs','World 11 Graph City','world-11-graphs','Open World RPG'),
('Ratio & Proportion','World 12 Ratio Valley','world-12-ratio','Open World RPG'),
('Probability','World 13 Probability Lab','world-13-probability','Open World RPG'),
('Position & Transformation','World 14 Transformation Planet','world-14-transformations','Open World RPG'),
('Distance, Area & Volume','World 15 Measurement Mountain','world-15-measurement','Open World RPG'),
('Interpreting & Discussing Results','World 16 Statistics Universe','world-16-statistics','Open World RPG')
) as v(topic_name, game_name, game_slug, description)
on t.topic_name=v.topic_name
on conflict (game_slug) do nothing;

select 'SMAO v3.2 Open World RPG SQL patch completed' as status;