-- 005_seed_events.sql
-- Seed initial events based on events CSV.
-- Only inserts events if the club exists (skips if club_id is NULL).

-- Society of Women Engineers events
INSERT INTO public.events (club_id, title, description, start_at, location, is_cancelled)
SELECT 
  c.id,
  'Friends-Giving',
  'SWE Social',
  '2025-11-26 16:00:00'::TIMESTAMPTZ,
  'STC 341',
  FALSE
FROM public.clubs c
WHERE c.name ILIKE '%Society of Women Engineers%'
  AND NOT EXISTS (
    SELECT 1 FROM public.events e 
    WHERE e.title='Friends-Giving' 
    AND e.start_at='2025-11-26 16:00:00'::TIMESTAMPTZ
  )
LIMIT 1;

INSERT INTO public.events (club_id, title, description, start_at, location, is_cancelled)
SELECT 
  c.id,
  'Professional Readiness Workshop',
  NULL,
  '2025-11-19 17:30:00'::TIMESTAMPTZ,
  'STC 341',
  FALSE
FROM public.clubs c
WHERE c.name ILIKE '%Society of Women Engineers%'
  AND NOT EXISTS (
    SELECT 1 FROM public.events e 
    WHERE e.title='Professional Readiness Workshop' 
    AND e.start_at='2025-11-19 17:30:00'::TIMESTAMPTZ
  )
LIMIT 1;

-- Note: Student Accounting Society events are skipped as the club doesn't exist in seed data
-- Add them manually or create the club first if needed
