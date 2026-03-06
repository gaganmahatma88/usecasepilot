# UseCasePilot

A clean, documentation-style platform for real-world AI use cases organised by professional role.

**Stack:** Next.js 14 (App Router) · Tailwind CSS · Supabase · TipTap · MDX · Vercel

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** → paste and run `supabase-schema.sql`
3. Go to **Settings → API** and copy your keys

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=any-random-32-character-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Seed the admin password

```bash
node scripts/setup-db.js
```

Sets admin password to **`admin123`**.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)  
Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Project Structure

```
usecasepilot/
├── app/
│   ├── (public)/                   Public site (header+footer layout)
│   │   ├── page.tsx                Homepage
│   │   └── use-cases/
│   │       ├── page.tsx            /use-cases
│   │       └── [role]/
│   │           ├── page.tsx        /use-cases/[role]
│   │           └── [usecase]/
│   │               └── page.tsx    /use-cases/[role]/[usecase]
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── roles/page.tsx
│   │   ├── usecases/page.tsx
│   │   └── editor/page.tsx         Rich text editor
│   ├── api/
│   │   ├── auth/login/route.ts
│   │   ├── auth/logout/route.ts
│   │   ├── roles/route.ts
│   │   ├── roles/[id]/route.ts
│   │   ├── usecases/route.ts
│   │   └── usecases/[id]/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── admin/
│   │   ├── AdminNav.tsx
│   │   └── RichEditor.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Logo.tsx
│       ├── Breadcrumb.tsx
│       └── MDXRenderer.tsx
├── lib/
│   ├── auth.ts          JWT helpers
│   ├── adminAuth.ts     Server-side auth check
│   ├── supabase.ts      Supabase clients
│   └── utils.ts         cn(), createSlug(), formatDate()
├── middleware.ts         Protects /admin/* routes
├── types/index.ts
├── scripts/setup-db.js
├── supabase-schema.sql
└── .env.local.example
```

---

## Database Tables

| Table | Key columns |
|-------|-------------|
| `roles` | id, title, slug, description, created_at |
| `usecases` | id, role_id, title, slug, content_mdx, seo_title, seo_description, published, created_at |
| `settings` | id (always 1), site_name, admin_password_hash, logo_url |

---

## Admin Panel

| Route | Purpose |
|-------|---------|
| `/admin/login` | Password login |
| `/admin/dashboard` | Stats + recent content |
| `/admin/roles` | Create / edit / delete roles |
| `/admin/usecases` | List, publish, delete use cases |
| `/admin/editor` | Create use case (rich text + MDX tab) |
| `/admin/editor?id=<uuid>` | Edit existing use case |

**Default password:** `admin123`

To change it, update the bcrypt hash in Supabase:

```sql
-- Generate a hash at https://bcrypt-generator.com (12 rounds)
UPDATE settings SET admin_password_hash = '$2b$12$...' WHERE id = 1;
```

---

## Content Authoring

The editor supports two modes:

- **Visual** — WYSIWYG toolbar (headings, bold, italic, lists, links, code)
- **MDX** — raw markdown/HTML with MDX component support

### MDX Callout component

```mdx
<Callout type="info">Informational note</Callout>
<Callout type="warning">Warning message</Callout>
<Callout type="tip">Pro tip</Callout>
<Callout type="error">Error note</Callout>
```

---

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables (same 5 as `.env.local`)
4. Set `NEXT_PUBLIC_SITE_URL` to your Vercel domain
5. Deploy

No other configuration needed.
