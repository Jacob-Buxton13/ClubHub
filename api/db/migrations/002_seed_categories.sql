-- 002_seed_categories.sql
INSERT INTO public.categories (name, description) VALUES
  ('Academic', 'Academic and study related clubs'),
  ('Service', 'Community service oriented clubs'),
  ('Recreation', 'Hobby and recreation clubs'),
  ('Professional', 'Career and professional development'),
  ('Spiritual', 'Faith and spiritual growth')
ON CONFLICT (name) DO NOTHING;
