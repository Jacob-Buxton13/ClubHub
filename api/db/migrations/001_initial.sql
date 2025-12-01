-- 001_initial.sql
-- Core schema for BYUI Clubs API

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clubs
CREATE TABLE IF NOT EXISTS public.clubs (
  id               SERIAL PRIMARY KEY,
  uuid             UUID NOT NULL DEFAULT uuid_generate_v4(),
  slug             TEXT NOT NULL UNIQUE,
  name             TEXT NOT NULL,
  short_name       TEXT,
  description      TEXT,
  meeting_day      TEXT,
  meeting_time     TEXT,
  meeting_location TEXT,
  contact_email    TEXT,
  website_url      TEXT,
  logo_url         TEXT,
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Club <-> Category junction
CREATE TABLE IF NOT EXISTS public.club_categories (
  club_id     INT NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  category_id INT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (club_id, category_id)
);

-- Events
CREATE TABLE IF NOT EXISTS public.events (
  id           SERIAL PRIMARY KEY,
  club_id      INT NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  start_at     TIMESTAMPTZ NOT NULL,
  end_at       TIMESTAMPTZ,
  location     TEXT,
  is_cancelled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin Users
CREATE TABLE IF NOT EXISTS public.admin_users (
  id            SERIAL PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('superadmin','editor')),
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Officers (optional)
CREATE TABLE IF NOT EXISTS public.officers (
  id          SERIAL PRIMARY KEY,
  club_id     INT NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  role_title  TEXT NOT NULL,
  email       TEXT,
  phone       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Timestamp update trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

-- Triggers (idempotent)
DROP TRIGGER IF EXISTS trg_clubs_updated ON public.clubs;
CREATE TRIGGER trg_clubs_updated BEFORE UPDATE ON public.clubs
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS trg_events_updated ON public.events;
CREATE TRIGGER trg_events_updated BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS trg_officers_updated ON public.officers;
CREATE TRIGGER trg_officers_updated BEFORE UPDATE ON public.officers
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_clubs_active ON public.clubs(is_active);
CREATE INDEX IF NOT EXISTS idx_events_club_start ON public.events(club_id, start_at);
