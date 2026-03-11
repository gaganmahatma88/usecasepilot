import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'
import type { Role } from '@/types'

export const metadata: Metadata = {
  title: 'AI Use Cases & Workflows for Professionals | UseCasePilot',
  description:
    'Explore practical AI use cases and workflows for engineers, product managers, marketers, and business teams. Discover real-world ways to use AI tools to automate work and improve productivity.',
}

interface LatestUseCase {
  title: string
  slug: string
  roles: { slug: string } | null
}

async function getLatestUseCases(): Promise<LatestUseCase[]> {
  try {
    const { data } = await supabase
      .from('usecases')
      .select('title, slug, roles(slug)')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(8)
    return (data as unknown as LatestUseCase[]) || []
  } catch {
    return []
  }
}

async function getRoles(): Promise<Role[]> {
  try {
    const { data } = await supabase
      .from('roles')
      .select('*, use_cases:usecases(id, published)')
      .order('title')
    return data || []
  } catch {
    return []
  }
}

const ROLE_ICONS: Record<string, string> = {
  'software-engineers': '💻',
  'product-managers': '📊',
  'project-managers': '📋',
  'marketing-managers': '📣',
  'sales-teams': '🤝',
  'customer-support': '💬',
}

export default async function HomePage() {
  const [roles, latestUseCases] = await Promise.all([getRoles(), getLatestUseCases()])

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-[#EFF6FF]/50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full px-3 py-1 text-xs font-medium text-[#1D4ED8] mb-6">
            <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full animate-pulse" />
            Real-world AI use cases
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-tight">
            AI use cases for every
            <br className="hidden sm:block" /> professional role
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-xl">
            Practical, documented AI workflows organized by your job function.
            Skip the hype — find what actually works.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#1E40AF] active:scale-95 transition-all shadow-sm shadow-[#BFDBFE]"
            >
              Browse use cases
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/ai-prompts"
              className="inline-flex items-center gap-2 bg-white text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-95 transition-all"
            >
              Explore AI Prompts
            </Link>
          </div>
          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8">
            {[
              { icon: '✓', text: '6 professional roles' },
              { icon: '✓', text: 'Free to use' },
              { icon: '✓', text: 'Regularly updated' },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="text-green-500 font-semibold">{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
          AI Use Cases for Professionals
        </h2>
        <p className="text-gray-500 leading-relaxed">
          UseCasePilot is a directory of practical AI use cases and workflows for professionals.
        </p>
        <p className="text-gray-500 leading-relaxed mt-3">
          Discover how engineers, product managers, marketers, and support teams use AI tools to
          automate tasks, improve productivity, and streamline everyday work.
        </p>
      </section>

      {/* Browse AI Use Cases by Role — static for SEO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Browse AI Use Cases by Role</h2>
          <Link href="/use-cases" className="text-sm text-[#1D4ED8] hover:text-[#1E40AF] font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { href: '/use-cases/software-engineers', label: 'Software Engineers', slug: 'software-engineers' },
            { href: '/use-cases/product-managers', label: 'Product Managers', slug: 'product-managers' },
            { href: '/use-cases/project-managers', label: 'Project Managers', slug: 'project-managers' },
            { href: '/use-cases/marketing-managers', label: 'Marketing Managers', slug: 'marketing-managers' },
            { href: '/use-cases/sales-teams', label: 'Sales Teams', slug: 'sales-teams' },
            { href: '/use-cases/customer-support', label: 'Customer Support', slug: 'customer-support' },
          ].map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/30 card-hover transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{ROLE_ICONS[role.slug] ?? '📁'}</span>
                <h3 className="font-medium text-gray-900 group-hover:text-[#1E40AF] transition-colors text-sm">
                  {role.label}
                </h3>
              </div>
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="text-gray-300 group-hover:text-[#60A5FA] transition-colors flex-shrink-0"
              >
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular AI Use Cases — static for SEO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-t border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Popular AI Use Cases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            {
              label: 'AI for Code Review',
              href: '/use-cases/software-engineers/ai-for-code-review',
            },
            {
              label: 'AI for Sprint Retrospective',
              href: '/use-cases/project-managers/ai-for-sprint-retrospective',
            },
            {
              label: 'AI for Roadmap Planning',
              href: '/use-cases/product-managers/ai-for-roadmap-planning',
            },
            {
              label: 'AI for Customer Support Automation',
              href: '/use-cases/customer-support/ai-for-customer-support-automation',
            },
            {
              label: 'AI for Marketing Content Generation',
              href: '/use-cases/marketing-managers/ai-for-marketing-content-generation',
            },
            {
              label: 'AI for Bug Triage',
              href: '/use-cases/software-engineers/ai-for-bug-triage',
            },
          ].map((uc) => (
            <Link
              key={uc.href}
              href={uc.href}
              className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 card-hover transition-all"
            >
              <span className="text-sm font-medium text-gray-800 group-hover:text-[#1E40AF] transition-colors">
                {uc.label}
              </span>
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="text-gray-300 group-hover:text-[#60A5FA] transition-colors flex-shrink-0 ml-3"
              >
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* Roles grid — dynamic from Supabase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Browse by role</h2>
          <Link href="/use-cases" className="text-sm text-[#1D4ED8] hover:text-[#1E40AF] font-medium">
            View all →
          </Link>
        </div>

        {roles.length === 0 ? (
          <div className="text-center py-16 text-gray-400 border border-gray-100 rounded-xl">
            <p className="text-lg font-medium mb-2">No roles yet</p>
            <p className="text-sm">
              Add roles from the{' '}
              <Link href="/admin" className="text-[#1D4ED8] hover:underline">
                admin panel
              </Link>{' '}
              to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {roles.map((role) => {
              const publishedCount =
                role.use_cases?.filter((uc: any) => uc.published).length || 0
              return (
                <Link
                  key={role.id}
                  href={`/use-cases/${role.slug}`}
                  className="group block p-5 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/30 card-hover transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#1E40AF] transition-colors mb-1.5 text-[15px]">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {role.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M4 6H8M4 4H8M4 8H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {publishedCount} use case{publishedCount !== 1 ? 's' : ''}
                    </div>
                    <svg
                      width="13" height="13" viewBox="0 0 13 13" fill="none"
                      className="text-gray-200 group-hover:text-[#93C5FD] transition-colors"
                    >
                      <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* Latest use cases */}
      {latestUseCases.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">Latest AI Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {latestUseCases.map((uc) => {
              const roleSlug = uc.roles?.slug
              if (!roleSlug) return null
              return (
                <Link
                  key={uc.slug}
                  href={`/use-cases/${roleSlug}/${uc.slug}`}
                  className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 card-hover transition-all"
                >
                  <span className="text-sm font-medium text-gray-800 group-hover:text-[#1E40AF] transition-colors">
                    {uc.title}
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="text-gray-300 group-hover:text-[#60A5FA] transition-colors flex-shrink-0 ml-3"
                  >
                    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Popular AI Tools */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Popular AI Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              href: '/best-ai-tools-for-software-engineers',
              label: 'Best AI Tools for Software Engineers',
              desc: 'Code completion, security scanning, and issue tracking.',
              icon: '💻',
            },
            {
              href: '/best-ai-tools-for-product-managers',
              label: 'Best AI Tools for Product Managers',
              desc: 'Roadmapping, feedback analysis, and user analytics.',
              icon: '📊',
            },
            {
              href: '/best-ai-tools-for-project-managers',
              label: 'Best AI Tools for Project Managers',
              desc: 'Meeting intelligence, scheduling, and project tracking.',
              icon: '📋',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block p-5 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/30 card-hover transition-all"
            >
              <span className="text-xl mb-3 block">{item.icon}</span>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#1E40AF] transition-colors mb-1.5 text-[15px]">
                {item.label}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features strip */}
      <section className="border-t border-gray-100 bg-gray-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#1D4ED8]">
                    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ),
                title: 'Role-specific',
                desc: 'Content organized by job function, not by AI tool.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#1D4ED8]">
                    <path d="M10 2L12.4 7.3L18 8.1L14 12L15 17.6L10 15L5 17.6L6 12L2 8.1L7.6 7.3L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Practical focus',
                desc: 'Real workflows with concrete examples, not theory.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#1D4ED8]">
                    <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Documentation style',
                desc: 'Structured, readable, and easy to follow.',
              },
            ].map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
