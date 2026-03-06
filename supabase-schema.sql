-- ================================================================
-- UseCasePilot — Supabase SQL Schema
-- Run this entire file in the Supabase SQL Editor
-- ================================================================

-- Roles
CREATE TABLE IF NOT EXISTS roles (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  slug        TEXT        NOT NULL UNIQUE,
  description TEXT        NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Use cases
CREATE TABLE IF NOT EXISTS usecases (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id         UUID        NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  title           TEXT        NOT NULL,
  slug            TEXT        NOT NULL,
  content_mdx     TEXT        NOT NULL DEFAULT '',
  seo_title       TEXT        NOT NULL DEFAULT '',
  seo_description TEXT        NOT NULL DEFAULT '',
  published       BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(role_id, slug)
);

-- Settings (single row)
CREATE TABLE IF NOT EXISTS settings (
  id                  BIGINT PRIMARY KEY DEFAULT 1,
  site_name           TEXT NOT NULL DEFAULT 'UseCasePilot',
  admin_password_hash TEXT NOT NULL DEFAULT '',
  logo_url            TEXT NOT NULL DEFAULT '',
  CONSTRAINT single_row CHECK (id = 1)
);

-- Seed empty settings row (password hash set by setup-db.js)
INSERT INTO settings (id, site_name, admin_password_hash, logo_url)
VALUES (1, 'UseCasePilot', '', '')
ON CONFLICT (id) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_roles_slug         ON roles(slug);
CREATE INDEX IF NOT EXISTS idx_usecases_slug      ON usecases(slug);
CREATE INDEX IF NOT EXISTS idx_usecases_role_id   ON usecases(role_id);
CREATE INDEX IF NOT EXISTS idx_usecases_published ON usecases(published);

-- Row Level Security
ALTER TABLE roles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE usecases  ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings  ENABLE ROW LEVEL SECURITY;

-- Public can read all roles
CREATE POLICY "Public read roles"
  ON roles FOR SELECT USING (true);

-- Public can read published use cases only
CREATE POLICY "Public read published usecases"
  ON usecases FOR SELECT USING (published = true);

-- Public can read settings (site name, logo — NOT password hash in queries)
CREATE POLICY "Public read settings"
  ON settings FOR SELECT USING (true);

-- Service-role key (used server-side) bypasses RLS — no extra policies needed.

-- ================================================================
-- Optional sample data — remove before going live
-- ================================================================
INSERT INTO roles (title, slug, description) VALUES
  ('Project Managers',   'project-managers',   'AI use cases for planning, tracking, and delivering projects.'),
  ('Software Engineers', 'software-engineers', 'AI tools for writing, reviewing, and maintaining code.'),
  ('Product Managers',   'product-managers',   'AI for product strategy, roadmaps, and user research.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO usecases (role_id, title, slug, content_mdx, seo_title, seo_description, published)
SELECT
  r.id,
  'Project Planning & Estimation',
  'project-planning-estimation',
  E'## Overview\n\nAI can dramatically improve the accuracy and speed of project planning. This use case covers how project managers can leverage AI to create better plans, identify risks early, and communicate timelines more effectively.\n\n## Step 1 — Scope Definition\n\nUse AI to clarify and expand project scope documents. Paste your brief and ask the AI to:\n\n- Identify missing requirements\n- Flag ambiguous language\n- Suggest edge cases\n- Generate a structured requirements doc\n\n## Step 2 — Task Breakdown\n\nAsk AI to decompose high-level goals into granular tasks:\n\n```\nPrompt: "Break down this project goal into tasks with estimates:\nGoal: [your goal]\nTeam: [X devs, Y designers]\nTimeline: [X weeks]"\n```\n\n## Step 3 — Risk Assessment\n\nAI excels at generating risk registers from project descriptions. Provide your project overview and ask for technical, resource, and timeline risks plus mitigations.\n\n<Callout type="tip">\nAlways review AI-generated estimates with your team. AI provides a starting point — your domain expertise refines it.\n</Callout>\n\n## Common Pitfalls\n\n- Over-trusting AI estimates without validation\n- Not providing enough context about team capabilities\n- Using generic prompts instead of project-specific ones',
  'AI for Project Planning & Estimation | UseCasePilot',
  'Learn how project managers can use AI to improve planning accuracy, task estimation, and risk identification.',
  true
FROM roles r WHERE r.slug = 'project-managers'
ON CONFLICT DO NOTHING;
