import Link from 'next/link'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.org'
const canonical = `${siteUrl}/ai-use-cases-directory`

export const metadata: Metadata = {
  title: 'AI Use Cases Directory | UseCasePilot',
  description:
    'Browse all documented AI workflows and automation use cases across professional roles including developers, product managers, marketing teams, customer support, and sales.',
  alternates: { canonical },
  openGraph: {
    title: 'AI Use Cases Directory | UseCasePilot',
    description:
      'Browse all documented AI workflows and automation use cases across professional roles.',
    url: canonical,
    type: 'website',
  },
}

const ROLE_ORDER = [
  { slug: 'software-engineers',  label: 'Developers',        icon: '💻' },
  { slug: 'product-managers',    label: 'Product Managers',   icon: '📊' },
  { slug: 'marketing-managers',  label: 'Marketing Teams',    icon: '📣' },
  { slug: 'customer-support',    label: 'Customer Support',   icon: '💬' },
  { slug: 'sales-teams',         label: 'Sales Teams',        icon: '🤝' },
]

interface UseCase {
  title: string
  slug: string
}

interface RoleSection {
  slug: string
  label: string
  icon: string
  useCases: UseCase[]
}

async function getDirectory(): Promise<RoleSection[]> {
  try {
    const slugs = ROLE_ORDER.map((r) => r.slug)

    const { data: roles } = await supabase
      .from('roles')
      .select('id, slug')
      .in('slug', slugs)

    if (!roles?.length) return []

    const { data: usecases } = await supabase
      .from('usecases')
      .select('title, slug, role_id')
      .in('role_id', roles.map((r) => r.id))
      .eq('published', true)
      .order('title')

    const byRoleId: Record<string, UseCase[]> = {}
    for (const uc of usecases || []) {
      if (!byRoleId[uc.role_id]) byRoleId[uc.role_id] = []
      byRoleId[uc.role_id].push({ title: uc.title, slug: uc.slug })
    }

    const idBySlug: Record<string, string> = {}
    for (const r of roles) idBySlug[r.slug] = r.id

    return ROLE_ORDER.map((r) => ({
      ...r,
      useCases: byRoleId[idBySlug[r.slug]] || [],
    }))
  } catch {
    return ROLE_ORDER.map((r) => ({ ...r, useCases: [] }))
  }
}

export default async function AIUseCasesDirectoryPage() {
  const sections = await getDirectory()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'AI Use Cases Directory', item: canonical },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'AI Use Cases Directory' },
        ]}
      />

      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          AI Use Cases Directory
        </h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          A complete directory of documented AI workflows and automation use cases across
          professional roles. Each entry covers a practical, repeatable workflow that teams
          can adopt with tools like ChatGPT, Claude, or role-specific AI software — no
          engineering background required.
        </p>
      </div>

      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.slug}>
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-lg flex-shrink-0">
                  {section.icon}
                </span>
                <h2 className="text-lg font-semibold text-gray-900">
                  {section.label}
                </h2>
              </div>
              <Link
                href={`/use-cases/${section.slug}`}
                className="text-xs font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
              >
                View all →
              </Link>
            </div>

            {/* Use case cards */}
            {section.useCases.length === 0 ? (
              <p className="text-sm text-gray-400 pl-1">No published use cases yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {section.useCases.map((uc) => (
                  <Link
                    key={uc.slug}
                    href={`/use-cases/${section.slug}/${uc.slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 card-hover transition-all"
                  >
                    <span className="text-sm font-medium text-gray-800 group-hover:text-[#1E40AF] transition-colors">
                      {uc.title}
                    </span>
                    <svg
                      width="13" height="13" viewBox="0 0 13 13" fill="none"
                      className="text-gray-300 group-hover:text-[#60A5FA] transition-colors flex-shrink-0 ml-3"
                    >
                      <path
                        d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10"
                        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
