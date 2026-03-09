import Link from 'next/link'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'
const canonical = `${siteUrl}/ai-use-cases`

export const metadata: Metadata = {
  title: 'AI Use Cases by Role',
  description:
    'Browse practical AI workflows organised by professional role including marketing, sales, engineering, and customer support.',
  alternates: { canonical },
  openGraph: {
    title: 'AI Use Cases by Role',
    description:
      'Browse practical AI workflows organised by professional role including marketing, sales, engineering, and customer support.',
    url: canonical,
    type: 'website',
  },
}

interface UseCase {
  title: string
  slug: string
}

interface RoleWithUseCases {
  id: string
  title: string
  slug: string
  useCases: UseCase[]
}

async function getAllRolesWithUseCases(): Promise<RoleWithUseCases[]> {
  try {
    const { data: roles } = await supabase
      .from('roles')
      .select('id, title, slug')
      .order('title')

    if (!roles?.length) return []

    const { data: usecases } = await supabase
      .from('usecases')
      .select('title, slug, role_id')
      .eq('published', true)
      .order('title')

    const usecasesByRole: Record<string, UseCase[]> = {}
    for (const uc of usecases || []) {
      if (!usecasesByRole[uc.role_id]) usecasesByRole[uc.role_id] = []
      usecasesByRole[uc.role_id].push({ title: uc.title, slug: uc.slug })
    }

    return roles.map((role) => ({
      ...role,
      useCases: usecasesByRole[role.id] || [],
    }))
  } catch {
    return []
  }
}

export default async function AIUseCasesDirectoryPage() {
  const roles = await getAllRolesWithUseCases()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'AI Use Cases by Role' },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          AI Use Cases by Role
        </h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Browse practical AI workflows organised by professional role. Each use case
          documents a real workflow that professionals can apply directly using AI tools.
        </p>
      </div>

      {roles.length === 0 ? (
        <div className="text-center py-16 text-gray-400 border border-gray-100 rounded-xl">
          <p>No use cases published yet.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {roles.map((role) => (
            <section key={role.id}>
              <div className="flex items-center justify-between mb-4">
                <Link
                  href={`/use-cases/${role.slug}`}
                  className="text-lg font-semibold text-gray-900 hover:text-blue-700 transition-colors"
                >
                  {role.title}
                </Link>
                <Link
                  href={`/use-cases/${role.slug}`}
                  className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                >
                  View all →
                </Link>
              </div>

              {role.useCases.length === 0 ? (
                <p className="text-sm text-gray-400 pl-1">No published use cases yet.</p>
              ) : (
                <ul className="space-y-1.5">
                  {role.useCases.map((uc) => (
                    <li key={uc.slug}>
                      <Link
                        href={`/use-cases/${role.slug}/${uc.slug}`}
                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors">
                          {uc.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
