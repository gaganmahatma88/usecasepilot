import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { MDXRenderer } from '@/components/ui/MDXRenderer'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props {
  params: { role: string; usecase: string }
}

async function getUseCase(roleSlug: string, usecaseSlug: string) {
  try {
    const { data: role } = await supabase
      .from('roles')
      .select('*')
      .eq('slug', roleSlug)
      .single()

    if (!role) return null

    const { data: usecase } = await supabase
      .from('usecases')
      .select('*')
      .eq('role_id', role.id)
      .eq('slug', usecaseSlug)
      .eq('published', true)
      .single()

    if (!usecase) return null
    return { usecase, role }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getUseCase(params.role, params.usecase)
  if (!result) return {}
  const { usecase, role } = result
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'
  const canonical = `${siteUrl}/use-cases/${params.role}/${params.usecase}`
  return {
    title: usecase.seo_title || usecase.title,
    description: usecase.seo_description,
    alternates: { canonical },
    openGraph: {
      title: usecase.seo_title || usecase.title,
      description: usecase.seo_description,
      url: canonical,
      type: 'article',
    },
  }
}

export default async function UseCasePage({ params }: Props) {
  const result = await getUseCase(params.role, params.usecase)
  if (!result) notFound()

  const { usecase, role } = result

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Use Cases', href: '/use-cases' },
          { label: role.title, href: `/use-cases/${role.slug}` },
          { label: usecase.title },
        ]}
      />

      <article>
        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 mb-4">
            {role.title}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            {usecase.title}
          </h1>
          {usecase.seo_description && (
            <p className="text-gray-500 text-lg leading-relaxed">
              {usecase.seo_description}
            </p>
          )}
          <div className="mt-4 text-xs text-gray-400">
            Last updated {formatDate(usecase.created_at)}
          </div>
        </header>

        <div className="border-t border-gray-100 pt-8">
          <MDXRenderer content={usecase.content_mdx} />
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <a
          href={`/use-cases/${role.slug}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M10 7H4M4 7L7 4M4 7L7 10"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          Back to {role.title}
        </a>
      </div>
    </div>
  )
}
