# CLAUDE.md

## Development Rules

This is a production project. Follow these rules when editing code:

1. Prefer minimal changes.
2. Do not refactor unrelated files.
3. Reuse existing API routes instead of creating new ones.
4. Do not change the database schema unless explicitly requested.
5. Do not introduce new dependencies unless necessary.
6. Preserve existing authentication and Supabase security patterns.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint via next lint
npm run setup-db     # Seed admin password into Supabase (sets it to admin123)
```

No test suite is configured.

## Environment Setup

Copy `.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon key
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (bypasses RLS, server-side only)
- `JWT_SECRET` — random 32-char string for signing admin JWT tokens
- `NEXT_PUBLIC_SITE_URL` — used for sitemap and OG tags

Database schema is in `supabase-schema.sql` — run it in the Supabase SQL Editor before first use.

## Architecture

**Stack:** Next.js 14 App Router, Tailwind CSS, Supabase (PostgreSQL), TipTap rich editor, next-mdx-remote, Vercel.

### Route Groups

- `app/(public)/` — public-facing site with Header+Footer layout. Pages: homepage, `/use-cases`, `/use-cases/[role]`, `/use-cases/[role]/[usecase]`.
- `app/admin/` — password-protected admin panel. Pages: login, dashboard, roles CRUD, usecases list, and a rich text editor (`/admin/editor?id=<uuid>` for editing an existing use case).
- `app/api/` — REST API routes for roles and usecases (GET public, POST/PUT/DELETE require admin auth).

### Authentication

Custom JWT-based admin auth (no Supabase Auth):
- Login posts to `/api/auth/login`, which verifies bcrypt password against `settings.admin_password_hash` in Supabase and sets an `admin_token` cookie (7-day JWT).
- **`old_middleware.ts`** is the middleware implementation but is NOT currently active (no `middleware.ts` exists at the root). Admin route protection is handled per-route via `lib/adminAuth.ts:requireAdmin()`, which reads the cookie server-side.
- `lib/auth.ts` — JWT sign/verify + bcrypt helpers.
- `lib/adminAuth.ts` — `requireAdmin()` for use in API route handlers.

### Supabase Clients

`lib/supabase.ts` exports two clients:
- `supabase` — uses anon key, respects Row Level Security (RLS). Used in public pages to fetch only published content.
- `supabaseAdmin` — uses service role key, bypasses RLS. Used in API routes for all write operations and admin reads. Both have `cache: 'no-store'` forced on fetch.

### Content Model

- **Roles** — professional roles (e.g. "Project Managers"), each with a slug.
- **Use Cases** — belong to a role, stored as MDX in `content_mdx`. Published flag controls public visibility (enforced via RLS on `supabase` client).
- **Settings** — single row (id=1) storing site name, logo URL, and bcrypt admin password hash.

### Content Rendering

Use case content is stored as MDX and rendered server-side via `next-mdx-remote/rsc` in `components/ui/MDXRenderer.tsx`. The only custom MDX component is `<Callout type="info|warning|tip|error">`.

### Slug Generation

`lib/utils.ts` exports `createSlug()` (wraps slugify) used when creating roles and use cases. Slugs must be unique per table (roles) or per role (usecases).
