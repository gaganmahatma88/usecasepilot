-- Migration: add Marketing Managers, Sales Teams, Customer Support roles
-- Run this in the Supabase SQL Editor (or via the Supabase CLI)

INSERT INTO roles (title, slug, description)
VALUES
  (
    'Marketing Managers',
    'marketing-managers',
    'AI tools for marketing campaigns, content creation, and analytics.'
  ),
  (
    'Sales Teams',
    'sales-teams',
    'AI tools for lead generation, outreach, and sales forecasting.'
  ),
  (
    'Customer Support',
    'customer-support',
    'AI tools for automating support tickets, chatbots, and customer insights.'
  )
ON CONFLICT (slug) DO NOTHING;
