-- 007_map_clubs_to_categories.sql
-- Map clubs to their college categories based on CSV data.
-- Uses pattern matching on club names to assign correct college category.

-- Engineering clubs
INSERT INTO public.club_categories (club_id, category_id)
SELECT c.id, cat.id
FROM public.clubs c
CROSS JOIN public.categories cat
WHERE cat.name = 'College of Physical Sciences & Engineering'
AND c.slug IN (
  'sampe','amateur-radio-society','american-society-of-civil-engineers','asme',
  'american-welding-society','astronomical-society','biochem2-society','bmes',
  'computing-society','data-science-society','design-and-construction-management-society-dcms',
  'geology-society','hart-high-altitude-balloon-society','ieee-student-branch-society',
  'mathematics-society','math-education-society','society-of-automotive-engineers-sae',
  'society-of-cybersecurity','shpe','society-of-manufacturing-engineers',
  'society-of-physics-students','society-of-women-engineers','tau-beta-pi','women-in-physics-society'
)
ON CONFLICT DO NOTHING;

-- Language & Letters clubs
INSERT INTO public.club_categories (club_id, category_id)
SELECT c.id, cat.id
FROM public.clubs c
CROSS JOIN public.categories cat
WHERE cat.name = 'College of Language & Letters'
AND c.slug IN (
  'english-academic-society','humanities-society','peacebuilding-society','philosophical-society',
  'international-studies-society','political-affairs-society','pre-law-society','phi-alpha-theta',
  'drone-and-geospatial-society'
)
ON CONFLICT DO NOTHING;

-- Education & Human Development clubs
INSERT INTO public.club_categories (club_id, category_id)
SELECT c.id, cat.id
FROM public.clubs c
CROSS JOIN public.categories cat
WHERE cat.name = 'College of Education and Human Development'
AND c.slug IN (
  'apparel-design-society','behavioral-science-society','child-family-advocacy-society',
  'child-education-development-society','interfaith-leadership-society'
)
ON CONFLICT DO NOTHING;

-- Business & Communication clubs
INSERT INTO public.club_categories (club_id, category_id)
SELECT c.id, cat.id
FROM public.clubs c
CROSS JOIN public.categories cat
WHERE cat.name = 'College of Business & Communication'
AND c.slug IN (
  'women-in-business-society','visual-society','visual-production-society',
  'supply-chain-management-society','speech-and-debate-society',
  'society-of-professional-journalists','real-estate-investment-development-society',
  'agriculture-business-management-society'
)
ON CONFLICT DO NOTHING;

-- Agriculture & Life Sciences clubs
INSERT INTO public.club_categories (club_id, category_id)
SELECT c.id, cat.id
FROM public.clubs c
CROSS JOIN public.categories cat
WHERE cat.name = 'College of Agriculture & Life Sciences'
AND c.slug IN (
  'ag-tech-society','wish-society','wildlife-and-fisheries-society',
  'recreation-management-society','rangeland-management-society','public-health-society',
  'therapeutic-recreation-society'
)
ON CONFLICT DO NOTHING;

-- Interdisciplinary Studies
INSERT INTO public.club_categories (club_id, category_id)
SELECT c.id, cat.id
FROM public.clubs c
CROSS JOIN public.categories cat
WHERE cat.name = 'Interdisciplinary Studies'
AND c.slug = 'interdisciplinary-studies-society-ids'
ON CONFLICT DO NOTHING;
