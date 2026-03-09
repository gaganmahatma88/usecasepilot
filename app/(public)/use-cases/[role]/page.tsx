import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'

const ROLE_TOOLS_PAGE: Record<string, string> = {
  'software-engineers':  '/best-ai-tools-for-software-engineers',
  'product-managers':    '/best-ai-tools-for-product-managers',
  'project-managers':    '/best-ai-tools-for-project-managers',
  'marketing-managers':  '/ai-tools-for-marketing-managers',
  'sales-teams':         '/ai-tools-for-sales-teams',
  'customer-support':    '/ai-tools-for-customer-support',
}

interface Props {
  params: { role: string }
}

async function getRoleWithUseCases(slug: string) {
  try {
    const { data: role } = await supabase
      .from('roles')
      .select('*')
      .eq('slug', slug)
      .single()

    if (!role) return null

    const { data: useCases } = await supabase
      .from('usecases')
      .select('*')
      .eq('role_id', role.id)
      .eq('published', true)
      .order('title')

    return { ...role, use_cases: useCases || [] }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const role = await getRoleWithUseCases(params.role)
  if (!role) return {}
  return {
    title: `AI Use Cases for ${role.title}`,
    description: role.description,
  }
}

export default async function RolePage({ params }: Props) {
  const role = await getRoleWithUseCases(params.role)
  if (!role) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Use Cases', href: '/use-cases' },
          { label: role.title },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          {role.title}
        </h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          {role.description}
        </p>
        <p className="mt-3 text-gray-500 leading-relaxed max-w-2xl">
          AI is changing how {role.title} work — from automating repetitive tasks to
          accelerating research, drafting, and analysis. The use cases below document
          practical AI workflows that {role.title} can apply directly to their day-to-day
          responsibilities.
        </p>
        {ROLE_TOOLS_PAGE[params.role] && (
          <p className="mt-4 text-sm text-gray-500">
            Looking for tool recommendations?{' '}
            <Link
              href={ROLE_TOOLS_PAGE[params.role]}
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Explore AI Tools for {role.title} →
            </Link>
          </p>
        )}
      </div>

      {role.use_cases.length === 0 ? (
        <div className="text-center py-16 text-gray-400 border border-gray-100 rounded-xl">
          <p>No use cases published for this role yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {role.use_cases.map((uc: any) => (
            <Link
              key={uc.id}
              href={`/use-cases/${params.role}/${uc.slug}`}
              className="group block p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1.5">
                    {uc.title}
                  </h2>
                  {uc.seo_description && (
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {uc.seo_description}
                    </p>
                  )}
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5"
                >
                  <path
                    d="M4 8H12M12 8L8 4M12 8L8 12"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
