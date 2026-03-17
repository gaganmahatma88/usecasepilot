# UseCasePilot — Project Architecture

> Technical reference for engineers and SEO strategists.
> Last updated: March 2026

---

## 1. Project Overview

UseCasePilot is a programmatic SEO website that documents practical AI workflows, prompts, and prompt templates for professionals. It targets search queries from knowledge workers — engineers, product managers, marketers, sales teams, and customer support — who want to understand how to apply AI tools to their day-to-day job functions.

The site publishes three types of content: **AI Use Cases** (structured workflow articles stored as MDX in a database), **AI Prompts** (curated prompt collections per category, defined in TypeScript data files), and **Prompt Templates** (ready-to-use fill-in-the-blank prompts for specific coding tasks). Each content type maps to a distinct URL hierarchy and generation strategy.

Use case pages are authored through a custom admin panel with a rich-text MDX editor and served via Incremental Static Regeneration. Prompt and template pages are fully static — content lives in TypeScript files and pages are generated at build time with `generateStaticParams`. The site also includes static "best AI tools" pages for each role, which serve as high-intent commercial keyword targets.

A lightweight admin panel (password-protected, custom JWT) allows content editors to create, edit, and publish use cases without touching code. An AI-assisted ideas endpoint can generate draft use case content using the Anthropic API.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 App Router (React Server Components) |
| **Language** | TypeScript |
| **Content system** | MDX via `next-mdx-remote/rsc` (use cases); TypeScript data files (prompts, templates) |
| **Styling** | Tailwind CSS + custom CSS classes in `globals.css`; DM Sans + DM Mono (Google Fonts) |
| **Database** | Supabase (PostgreSQL) — stores roles, use cases, and site settings |
| **Authentication** | Custom JWT (bcrypt password hash in DB, 7-day `admin_token` cookie) |
| **Deployment** | Vercel |
| **Sitemap** | Next.js `sitemap.ts` export (ISR, revalidates every hour) |
| **Analytics** | Not configured at code level (no analytics library detected) |

---

## 3. Folder Structure

```
/
├── app/
│   ├── (public)/           # Public-facing site (Header + Footer layout)
│   │   ├── page.tsx        # Homepage
│   │   ├── use-cases/      # Use case hierarchy (DB-driven)
│   │   ├── ai-prompts/     # Prompt pages (static, TS data)
│   │   ├── prompt-templates/ # Template pages (static, TS data)
│   │   ├── best-ai-tools-for-*/  # Role-specific tool pages (static)
│   │   ├── ai-tools-for-*/ # Additional role tool pages (static)
│   │   ├── ai-use-cases/   # Directory pages (static)
│   │   └── [about, contact, privacy-policy, affiliate-disclosure]/
│   ├── admin/              # Admin panel (JWT-protected)
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── roles/          # Roles CRUD
│   │   ├── usecases/       # Use case list
│   │   ├── editor/         # TipTap MDX editor (?id=uuid)
│   │   └── ideas/          # AI-assisted idea generation
│   ├── api/
│   │   ├── auth/           # Login + logout endpoints
│   │   ├── roles/          # REST: GET / POST / PUT / DELETE
│   │   ├── usecases/       # REST: GET / POST / PUT / DELETE
│   │   ├── track/          # Affiliate link redirect tracker
│   │   └── ai/             # AI generation endpoints (Anthropic)
│   ├── layout.tsx          # Root layout (fonts, metadata, favicon)
│   └── sitemap.ts          # Sitemap generator (ISR, 1hr)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Sticky nav with active state
│   │   └── Footer.tsx      # Three-column footer
│   └── ui/
│       ├── MDXRenderer.tsx     # MDX rendering with custom components
│       ├── PromptBlock.tsx     # Dark prompt display block (client)
│       ├── Step.tsx            # Numbered workflow step
│       ├── PromptCard.tsx      # Prompt card with copy + open-in links
│       ├── CopyPromptButton.tsx # Reusable copy-to-clipboard button (client)
│       ├── RecommendedTool.tsx # Tool CTA card (compact + full variants)
│       ├── StickyToolCTA.tsx   # Floating bottom-right tool CTA widget
│       ├── Breadcrumb.tsx      # Breadcrumb navigation
│       ├── ToolComparisonTable.tsx # Tool comparison layout
│       └── Logo.tsx            # SVG logo component
│
├── lib/
│   ├── supabase.ts         # Supabase client (public) + admin client
│   ├── auth.ts             # JWT sign/verify + bcrypt helpers
│   ├── adminAuth.ts        # requireAdmin() guard for API routes
│   ├── tools.ts            # Tool registry + TOOL_NAME_TO_KEY map
│   ├── prompts.ts          # Merged prompt page registry
│   ├── promptCategories.ts # Generated prompt categories (TS data)
│   ├── promptTemplates.ts  # ChatGPT/Claude assistant variant generator
│   ├── promptRoles.ts      # Prompt role hub definitions
│   ├── templatePages.ts    # Handwritten prompt template pages
│   ├── templateRegistry.ts # Generated template pages (code tasks × technologies)
│   ├── rehypeToolLinks.ts  # Rehype plugin: auto-links tool names in MDX
│   ├── rehypeExternalLinks.ts # Rehype plugin: opens external links in new tab
│   └── utils.ts            # createSlug(), formatDate()
│
├── app/globals.css         # Tailwind directives + all custom CSS
├── supabase-schema.sql     # Full DB schema (run in Supabase SQL Editor)
├── tailwind.config.ts
├── next.config.ts
└── .env.local              # Environment variables (not committed)
```

---

## 4. Routing Architecture

The site uses Next.js App Router with two route groups.

### Public routes (`app/(public)/`)

Shares a layout that wraps all pages with the `Header` and `Footer` components.

| URL Pattern | File | Data Source | Generation |
|---|---|---|---|
| `/` | `(public)/page.tsx` | Supabase (roles + recent use cases) | SSR / ISR |
| `/use-cases` | `(public)/use-cases/page.tsx` | Supabase (roles) | SSR |
| `/use-cases/[role]` | `(public)/use-cases/[role]/page.tsx` | Supabase (role + use cases) | SSR |
| `/use-cases/[role]/[usecase]` | `(public)/use-cases/[role]/[usecase]/page.tsx` | Supabase (use case MDX) | ISR (1hr) |
| `/ai-prompts` | `(public)/ai-prompts/page.tsx` | `lib/promptRoles.ts` | Static |
| `/ai-prompts/[slug]` | `(public)/ai-prompts/[slug]/page.tsx` | `lib/prompts.ts` + `lib/promptRoles.ts` | Static (`generateStaticParams`) |
| `/prompt-templates` | `(public)/prompt-templates/page.tsx` | `lib/templateRegistry.ts` | Static |
| `/prompt-templates/[slug]` | `(public)/prompt-templates/[slug]/page.tsx` | `lib/templateRegistry.ts` | Static (`generateStaticParams`) |
| `/best-ai-tools-for-[role]` | Individual `page.tsx` files | Hardcoded in component | Static |
| `/ai-tools-for-[role]` | Individual `page.tsx` files | Hardcoded in component | Static |

The `/ai-prompts/[slug]` route handles two distinct page types from a single file: if the slug matches a role key in `promptRoles`, it renders a **role hub** listing all prompts for that role. Otherwise it renders an individual **prompt page**. `generateStaticParams` emits all slugs for both types.

### Admin routes (`app/admin/`)

Password-protected via `requireAdmin()` called at the top of each server component or API handler. No middleware file is active — protection is per-route.

### API routes (`app/api/`)

REST endpoints for roles and use cases (GET public, POST/PUT/DELETE require admin JWT). `/api/track` handles affiliate link redirects with a 302 to the tool URL. `/api/ai/generate-*` proxies to the Anthropic API for content generation.

---

## 5. Content Architecture

The site has two distinct content systems: a **database layer** for use cases and a **TypeScript data layer** for prompts and templates.

### Database content (Supabase)

Use case content lives entirely in Supabase PostgreSQL. There are no MDX files on disk.

```
roles
  id, title, slug, description, created_at

usecases
  id, role_id (FK → roles), title, slug,
  content_mdx, seo_title, seo_description,
  published, created_at, updated_at
```

Content is authored through the admin editor (`/admin/editor?id=uuid`) using TipTap, which serialises to MDX stored in the `content_mdx` column. The `supabase` client (anon key, respects RLS) only returns rows where `published = true` for public pages. The `supabaseAdmin` client (service role key, bypasses RLS) is used in all admin API routes.

### TypeScript data layer (prompts and templates)

Prompts and prompt templates are defined directly in TypeScript files and compiled into the build. There is no database involvement for this content.

```
lib/promptCategories.ts     → Generated PromptPage entries (categories array)
lib/prompts.ts              → Merged registry:
                              generatedPrompts (from categories)
                              + handwrittenPrompts (manual overrides)
                              + assistant variants (via generateAssistantTemplates)
lib/promptRoles.ts          → Role hub definitions (title, description, body paragraphs)
lib/promptTemplates.ts      → ChatGPT/Claude assistant variant generator
lib/templatePages.ts        → Handwritten TemplatePage entries (detailed, with examples)
lib/templateRegistry.ts     → Generated TemplatePage entries (task × technology matrix)
                              merged with handwritten pages (handwritten wins on collision)
```

**Prompt variant generation:** `generateAssistantTemplates` takes every software-engineers prompt and automatically creates `-chatgpt` and `-claude` slug variants with assistant-specific titles and how-to steps. This multiplies each SE prompt page into three URLs.

**Template generation:** `templateRegistry` defines a matrix of 15 entries (4 task types × multiple technologies). `generateTemplatePage` dispatches to one of four task-specific generator functions that produce a fully structured `TemplatePage` object — including prompt template text, example input, expected output, FAQs, and how-to steps — all derived programmatically from the technology and task type.

---

## 6. Page Generation Logic

### Use case pages (ISR)

```typescript
export const revalidate = 3600  // top of use case page file
```

Use case detail pages use ISR: cached at the CDN edge for 1 hour, then revalidated in the background on the next request after expiry. No `generateStaticParams` — pages are generated on first request and cached.

Metadata is generated per-page via `generateMetadata`, pulling `seo_title` and `seo_description` from the database row, with a fallback to the plain `title`.

### Prompt pages (fully static)

```typescript
export function generateStaticParams() {
  const promptSlugs = Object.keys(prompts).map((slug) => ({ slug }))
  const roleSlugs = Object.keys(promptRoles).map((slug) => ({ slug }))
  return [...promptSlugs, ...roleSlugs]
}
```

All prompt slugs (role hubs + individual prompt categories + assistant variants) are emitted at build time. No database calls at render time.

### Template pages (fully static)

```typescript
export function generateStaticParams() {
  return Object.keys(templatePages).map((slug) => ({ slug }))
}
```

All template slugs from `allTemplatePages` (handwritten + generated) are pre-rendered at build time.

### MDX rendering

Use case content is parsed and rendered server-side via `next-mdx-remote/rsc`. Three rehype plugins run during compilation:

- `rehype-slug` — adds `id` attributes to all headings (powers the Table of Contents anchor links)
- `rehypeToolLinks` — scans content for a heading containing "tools", then auto-links matching tool names in the following `<ul>` to `/api/track?tool=key`
- `rehypeExternalLinks` — adds `target="_blank" rel="noopener noreferrer"` to all external links

Custom MDX components registered in `MDXRenderer.tsx`:

| Component | Tag in MDX | Purpose |
|---|---|---|
| `Callout` | `<Callout type="info\|warning\|tip\|error">` | Styled callout box |
| `PromptBlock` | `<Prompt>` | Dark prompt block with copy button + open-in links |
| `Step` | `<Step number={1} title="...">` | Numbered workflow step with blue badge |

Table of Contents is generated server-side by extracting `## headings` from raw MDX source via regex + `github-slugger` before passing content to `MDXRemote`.

---

## 7. SEO Implementation

### Metadata

Every public page exports a `metadata` object or `generateMetadata` function using Next.js App Router's built-in metadata API. Use case pages pull `seo_title` and `seo_description` from Supabase. Prompt and template pages use fields defined in their TypeScript data objects. All pages set `title`, `description`, and `openGraph` fields.

Canonical URLs are set explicitly on use case pages:
```typescript
alternates: { canonical: `${siteUrl}/use-cases/${role}/${slug}` }
```

### Schema markup

Three JSON-LD blocks are injected as `<script type="application/ld+json">` tags directly in the page component JSX:

| Schema type | Pages that use it |
|---|---|
| `BreadcrumbList` | Use case detail, role, prompt, prompt template pages |
| `Article` | Use case detail pages |
| `FAQPage` | Use case detail, prompt, prompt template pages (FAQs generated programmatically) |

FAQs on use case pages are generated at render time from the page title and role, using templates in `generateFaqs()`. FAQs on prompt pages are generated from the prompt topic via `generatePromptFaqs()`. FAQs on template pages are hardcoded per entry.

### Sitemap

`app/sitemap.ts` exports a Next.js sitemap handler that revalidates every hour (`export const revalidate = 3600`). It combines:

- Supabase-sourced role and use case URLs (with `lastModified` from DB timestamps)
- All prompt role, prompt, and template URLs (from TS registries)
- Static tool and directory pages
- Static utility pages (about, privacy, contact)

Priority values: homepage (implicit 1.0), tool/directory pages (0.8), role pages (0.8), use case pages (0.7), prompt and template pages (0.7), static utility pages (0.5).

### Internal linking

Internal links are managed in several ways:

- `relatedUseCases` arrays on every `PromptPage` link prompt pages back to use case workflow guides
- `relatedTools` arrays link prompt pages and template pages to tool recommendation pages
- `ROLE_TOOLS_PAGE` maps on role and use case pages link to the corresponding "best AI tools" static page for that role
- Related use cases shown at the bottom of each use case detail page (fetched from Supabase, same role, excluding current)
- `rehypeToolLinks` auto-links tool names in MDX content to affiliate tracking URLs

---

## 8. Core UI Components

| Component | Location | Purpose |
|---|---|---|
| `Header` | `components/layout/Header.tsx` | Sticky navigation with active route detection |
| `Footer` | `components/layout/Footer.tsx` | Three-column footer with explore + company links |
| `MDXRenderer` | `components/ui/MDXRenderer.tsx` | Server component — renders MDX with rehype plugins and custom components |
| `PromptBlock` | `components/ui/PromptBlock.tsx` | Client component — dark terminal-style block for MDX `<Prompt>` tags; extracts text from React children, provides copy button + ChatGPT/Claude deep links |
| `Step` | `components/ui/Step.tsx` | Server component — numbered workflow step with branded blue badge for MDX `<Step>` tags |
| `PromptCard` | `components/PromptCard.tsx` | Dark prompt card used on `/ai-prompts/[slug]` pages; displays individual prompt string with copy and open-in-ChatGPT/Claude footer |
| `CopyPromptButton` | `components/CopyPromptButton.tsx` | Reusable client component — clipboard copy with 2s "Copied!" feedback; supports `dark` and `light` variants |
| `RecommendedTool` | `components/ui/RecommendedTool.tsx` | Tool CTA card in two variants: `compact` (inline, used above MDX content) and full (used below content with feature list) |
| `StickyToolCTA` | `components/ui/StickyToolCTA.tsx` | Floating bottom-right CTA widget shown on use case pages; dismissible; desktop-only |
| `Breadcrumb` | `components/ui/Breadcrumb.tsx` | Breadcrumb trail with chevron separators |
| `ToolComparisonTable` | `components/ui/ToolComparisonTable.tsx` | Comparison table for tool recommendation pages |
| `PromptRoleSearch` | `components/PromptRoleSearch.tsx` | Client component — searchable list of prompt categories on role hub pages |
| `Logo` | `components/ui/Logo.tsx` | SVG logo mark + wordmark |

---

## 9. Styling System

### Global CSS (`app/globals.css`)

All non-Tailwind styles live in a single `globals.css` file. It is divided into clearly labelled sections:

| Section | What it covers |
|---|---|
| CSS variables (`:root`) | Brand colors as HSL values: `--primary`, `--brand-light-bg`, `--brand-border`, `--muted` |
| `.prose` block | Full typography system for MDX article content: `h1`–`h3`, `p`, `a`, `ul/ol/li`, `code`, `pre`, `blockquote`, `table`, `hr` |
| `.callout-*` | Info / warning / tip / error callout variants |
| `.step-content` | Resets `.prose p` styles inside `Step` component children |
| `.tiptap` | TipTap editor placeholder styles |
| `::selection` | Brand blue text selection color |
| `.hero-section` | Radial gradient spotlight + dot grid `::before` pattern for homepage hero |
| `.toc-nav` | Table of Contents: left blue border, link hover indicator |
| `.card-hover` | Shared card hover: shadow + `translateY(-1px)` lift |
| `.prompt-block` | Dark terminal card container |
| `.prompt-block-header` | Traffic-light dots + label + copy button row |
| `.prompt-block-footer` | ChatGPT / Claude action buttons row |
| `.section-fade-border` | Gradient horizontal rule |
| FAQ `<details>` | Open state background tint |

### Tailwind

Tailwind is used for all layout, spacing, and component-level styling. The color palette in components uses literal hex values matching the CSS variables:

- Primary blue: `#1D4ED8` / `bg-[#1D4ED8]`
- Light blue background: `#EFF6FF` / `bg-[#EFF6FF]`
- Brand border: `#BFDBFE` / `border-[#BFDBFE]`

The `.card-hover` CSS class is applied alongside Tailwind hover classes on all interactive card links throughout the site.

### Fonts

Loaded from Google Fonts via `@import` in `globals.css`:

- **DM Sans** — body and UI text (weights 300, 400, 500, 600; italic 400)
- **DM Mono** — code blocks, prompt text, inline `code` elements

---

## 10. Data Sources

The project uses three distinct data sources depending on content type.

### Supabase (PostgreSQL)

Stores all use case content. Three tables:

- `roles` — professional role definitions (id, title, slug, description)
- `usecases` — use case articles (id, role_id FK, title, slug, content_mdx, seo_title, seo_description, published flag, timestamps)
- `settings` — single row: site name, logo URL, bcrypt admin password hash

RLS is enabled on all tables. The public anon client only reads published use cases. The service role client (server-side only) bypasses RLS for admin operations.

### TypeScript data files

All prompt and template content is statically defined in `lib/`. This content is compiled into the JavaScript bundle and requires a redeploy to update.

| File | Content |
|---|---|
| `lib/promptCategories.ts` | ~20 prompt category objects, each with 10 prompts, target role, and related tools/use cases |
| `lib/prompts.ts` | Merges generated categories + handwritten overrides + auto-generated assistant variants |
| `lib/promptRoles.ts` | 4 role hub definitions (title, description, body paragraphs) |
| `lib/templatePages.ts` | ~5 fully handwritten template pages with custom examples and FAQs |
| `lib/templateRegistry.ts` | 15 generated template entries (task type × technology) with full page content built by generator functions |
| `lib/tools.ts` | ~30 tool definitions (name, URL, description, benefits, pricing) used in `RecommendedTool` and `rehypeToolLinks` |

### Environment variables

```
NEXT_PUBLIC_SUPABASE_URL          Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     Public anon key (client-safe)
SUPABASE_SERVICE_ROLE_KEY         Service role key (server-only, bypasses RLS)
JWT_SECRET                        32-char secret for admin JWT signing
NEXT_PUBLIC_SITE_URL              Canonical base URL (sitemap, OG, schema)
```

---

## 11. Programmatic SEO Structure

The site targets a three-level content hierarchy across its three content pillars.

### Use Cases (DB-driven)

```
/use-cases
  └── /use-cases/[role]                    6 role index pages
        └── /use-cases/[role]/[usecase]    ~100+ use case articles
```

Each role maps to a professional job function. Each use case under a role maps to a specific AI workflow for that role. URLs are SEO-friendly slugs generated from titles via `createSlug()` (wraps `slugify`).

Example:
```
/use-cases/software-engineers/ai-for-code-review
/use-cases/product-managers/ai-for-roadmap-planning
/use-cases/customer-support/ai-for-customer-support-automation
```

### AI Prompts (static TS data)

```
/ai-prompts
  └── /ai-prompts/[role]                   4 role hub pages
        └── /ai-prompts/[category]         ~20 base category pages
              └── /ai-prompts/[category]-chatgpt   Assistant variants
              └── /ai-prompts/[category]-claude     Assistant variants
```

The assistant variant generation multiplies every software-engineers prompt category into three URLs: the base, a ChatGPT-specific variant, and a Claude-specific variant.

Example:
```
/ai-prompts/software-engineers              (role hub)
/ai-prompts/debugging                       (base)
/ai-prompts/debugging-chatgpt              (ChatGPT variant)
/ai-prompts/debugging-claude               (Claude variant)
```

### Prompt Templates (static TS data)

```
/prompt-templates
  └── /prompt-templates/[slug]             ~15+ technology-specific templates
```

Templates target high-specificity queries combining AI assistant + task + technology.

Example:
```
/prompt-templates/chatgpt-debug-javascript
/prompt-templates/chatgpt-refactor-python
/prompt-templates/chatgpt-test-react
/prompt-templates/chatgpt-optimize-node
```

### Tool pages (static)

Standalone pages targeting "best AI tools for [role]" keywords:

```
/best-ai-tools-for-software-engineers
/best-ai-tools-for-product-managers
/best-ai-tools-for-project-managers
/ai-tools-for-marketing-managers
/ai-tools-for-sales-teams
/ai-tools-for-customer-support
```

### Affiliate tracking

Tool CTA links go through `/api/track?tool=[key]`, which logs the click (or redirects immediately) before forwarding the user to the tool's external URL. Links use `rel="nofollow noopener"`.

---

## 12. Build & Deployment

### Build

```bash
npm run build
```

During build, Next.js:

1. Statically generates all prompt pages (via `generateStaticParams` in `/ai-prompts/[slug]/page.tsx`)
2. Statically generates all template pages (via `generateStaticParams` in `/prompt-templates/[slug]/page.tsx`)
3. Statically generates all static role tool pages
4. Marks use case pages for ISR (`export const revalidate = 3600`)

The `supabase-schema.sql` schema must be applied to the Supabase project before first run. The admin password is seeded via `npm run setup-db` (sets bcrypt hash of `admin123` into the `settings` table).

### Deployment

Deployed on **Vercel**. The `NEXT_PUBLIC_SITE_URL` environment variable must match the live domain for canonical URLs, sitemap entries, and schema markup to be correct.

### Caching behaviour

| Page type | Strategy | Revalidation |
|---|---|---|
| Use case detail pages | ISR | 1 hour (`revalidate = 3600`) |
| Sitemap | ISR | 1 hour (`revalidate = 3600`) |
| Prompt pages | Static | On redeploy |
| Template pages | Static | On redeploy |
| Tool pages | Static | On redeploy |
| Admin panel | No cache | Always server-rendered |

---

## 13. Potential Scaling Areas

### Adding new use cases

Create via the admin panel at `/admin/editor`. No code changes required. The sitemap revalidates automatically within 1 hour and the page becomes live immediately upon publishing.

### Adding new roles

Create via the admin panel at `/admin/roles`. Adding a role to the following maps in code improves linking but is not required for the role to appear:
- `ROLE_ICONS` in `app/(public)/page.tsx` (homepage icon)
- `ROLE_TOOLS_PAGE` in the role and use case page files (links to tool pages)
- `promptRoles` in `lib/promptRoles.ts` (prompt hub page for this role)

### Adding new prompt categories

Add an entry to the `categories` array in `lib/promptCategories.ts`. The category becomes a new page at `/ai-prompts/[slug]` automatically — no routing changes needed. If the role is `software-engineers`, ChatGPT and Claude variants are also generated automatically.

### Adding new prompt templates

Either add a handwritten entry to `lib/templatePages.ts` (full control), or add an entry to `templateRegistry` in `lib/templateRegistry.ts` and let the generator produce the page content.

### Adding new tools

Add an entry to the `tools` record in `lib/tools.ts` and a matching entry in `TOOL_NAME_TO_KEY`. The tool will then be available to `RecommendedTool` and will be auto-linked in MDX content wherever its name appears under a tools heading.

### Adding new technologies to templates

Add entries to `templateRegistry` with the new `technology` value. Generator functions `generateDebuggingPage`, `generateRefactoringPage`, etc. already handle generic technologies — only React and SQL have special-case branching.

### Adding new assistant variants

The `assistants` array in `lib/promptTemplates.ts` currently contains ChatGPT and Claude. Adding a new entry will automatically generate `[slug]-[assistant]` variants for all software-engineers prompt categories.
