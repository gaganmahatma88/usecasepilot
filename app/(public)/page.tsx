import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Role } from '@/types'

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

export default async function HomePage() {
  const [roles, latestUseCases] = await Promise.all([getRoles(), getLatestUseCases()])

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-blue-50/40 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs font-medium text-blue-600 mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
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
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
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
        </div>
      </section>

      {/* Roles grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Browse by role</h2>
          <Link href="/use-cases" className="text-sm text-blue-600 hover:text-blue-700">
            View all →
          </Link>
        </div>

        {roles.length === 0 ? (
          <div className="text-center py-16 text-gray-400 border border-gray-100 rounded-xl">
            <p className="text-lg font-medium mb-2">No roles yet</p>
            <p className="text-sm">
              Add roles from the{' '}
              <Link href="/admin" className="text-blue-600 hover:underline">
                admin panel
              </Link>{' '}
              to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => {
              const publishedCount =
                role.use_cases?.filter((uc: any) => uc.published).length || 0
              return (
                <Link
                  key={role.id}
                  href={`/use-cases/${role.slug}`}
                  className="group block p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1.5 text-[15px]">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {role.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect
                        x="1" y="1" width="10" height="10" rx="2"
                        stroke="currentColor" strokeWidth="1.2"
                      />
                      <path
                        d="M4 6H8M4 4H8M4 8H6"
                        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
                      />
                    </svg>
                    {publishedCount} use case{publishedCount !== 1 ? 's' : ''}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {latestUseCases.map((uc) => {
              const roleSlug = uc.roles?.slug
              if (!roleSlug) return null
              return (
                <Link
                  key={uc.slug}
                  href={`/use-cases/${roleSlug}/${uc.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                    {uc.title}
                  </span>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              href: '/best-ai-tools-for-software-engineers',
              label: 'Best AI Tools for Software Engineers',
              desc: 'Code completion, security scanning, and issue tracking.',
            },
            {
              href: '/best-ai-tools-for-product-managers',
              label: 'Best AI Tools for Product Managers',
              desc: 'Roadmapping, feedback analysis, and user analytics.',
            },
            {
              href: '/best-ai-tools-for-project-managers',
              label: 'Best AI Tools for Project Managers',
              desc: 'Meeting intelligence, scheduling, and project tracking.',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1.5 text-[15px]">
                {item.label}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features strip */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: '📋',
                title: 'Role-specific',
                desc: 'Content organized by job function, not by AI tool.',
              },
              {
                icon: '⚡',
                title: 'Practical focus',
                desc: 'Real workflows with concrete examples, not theory.',
              },
              {
                icon: '📖',
                title: 'Documentation style',
                desc: 'Structured, readable, and easy to follow.',
              },
            ].map((f) => (
              <div key={f.title} className="flex gap-3">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    {f.title}
                  </h3>
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
