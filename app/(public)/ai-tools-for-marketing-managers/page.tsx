import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { ToolComparisonTable } from '@/components/ui/ToolComparisonTable'
import { tools } from '@/lib/tools'
import { supabase } from '@/lib/supabase'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'
const canonical = `${siteUrl}/ai-tools-for-marketing-managers`

export const metadata: Metadata = {
  title: 'Best AI Tools for Marketing Managers in 2025',
  description:
    'Discover the best AI tools for marketing managers — from content creation and SEO research to social media scheduling and campaign analytics.',
  alternates: { canonical },
  openGraph: {
    title: 'Best AI Tools for Marketing Managers in 2025',
    description:
      'Discover the best AI tools for marketing managers — from content creation and SEO research to social media scheduling and campaign analytics.',
    url: canonical,
    type: 'website',
  },
}

const pageTools = [
  tools['jasper'],
  tools['semrush'],
  tools['hubspot'],
  tools['canva'],
  tools['buffer'],
]

async function getRelatedUseCases() {
  try {
    const { data: role } = await supabase
      .from('roles')
      .select('id')
      .eq('slug', 'marketing-managers')
      .single()

    if (!role) return []

    const { data } = await supabase
      .from('usecases')
      .select('title, slug')
      .eq('role_id', role.id)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(4)

    return data || []
  } catch {
    return []
  }
}

export default async function AIToolsForMarketingManagers() {
  const relatedUseCases = await getRelatedUseCases()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'AI Tools for Marketing Managers' },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Best AI Tools for Marketing Managers
        </h1>
        <p className="text-gray-500 leading-relaxed">
          AI is transforming marketing — from generating campaign copy in seconds to
          analysing competitor SEO strategies and scheduling content across every
          channel. The tools below help marketing managers produce more content, reach
          larger audiences, and make faster data-driven decisions without scaling
          headcount.
        </p>
      </div>

      <ToolComparisonTable tools={pageTools} />

      <div className="space-y-6">
        {pageTools.map((tool) => (
          <RecommendedTool key={tool.key} tool={tool} />
        ))}
      </div>

      {relatedUseCases.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            AI Workflows You Can Implement With These Tools
          </h2>
          <div className="space-y-2">
            {relatedUseCases.map((uc) => (
              <Link
                key={uc.slug}
                href={`/use-cases/marketing-managers/${uc.slug}`}
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors">
                  {uc.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
