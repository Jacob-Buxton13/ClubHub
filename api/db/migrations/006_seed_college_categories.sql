-- 006_seed_college_categories.sql
-- Add college-based categories derived from societies CSV.
-- These supplement the existing general categories (Academic, Service, etc.)

INSERT INTO public.categories (name, description) VALUES
('College of Physical Sciences & Engineering','Clubs affiliated with Physical Sciences & Engineering programs'),
('College of Language & Letters','Clubs affiliated with Language & Letters programs'),
('College of Education and Human Development','Clubs affiliated with Education and Human Development programs'),
('College of Business & Communication','Clubs affiliated with Business & Communication programs'),
('College of Agriculture & Life Sciences','Clubs affiliated with Agriculture & Life Sciences programs'),
('Interdisciplinary Studies','Clubs focused on interdisciplinary collaboration')
ON CONFLICT (name) DO NOTHING;
