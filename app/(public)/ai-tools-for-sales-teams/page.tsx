import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { ToolComparisonTable } from '@/components/ui/ToolComparisonTable'
import { tools } from '@/lib/tools'
import { supabase } from '@/lib/supabase'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.org'
const canonical = `${siteUrl}/ai-tools-for-sales-teams`

export const metadata: Metadata = {
  title: 'Best AI Tools for Sales Teams in 2025',
  description:
    'Discover the best AI tools for sales teams — from lead generation and outreach personalisation to call intelligence and pipeline forecasting.',
  alternates: { canonical },
  openGraph: {
    title: 'Best AI Tools for Sales Teams in 2025',
    description:
      'Discover the best AI tools for sales teams — from lead generation and outreach personalisation to call intelligence and pipeline forecasting.',
    url: canonical,
    type: 'website',
  },
}

const pageTools = [
  tools['apollo'],
  tools['clay'],
  tools['hubspot'],
  tools['gong'],
  tools['outreach'],
]

async function getRelatedUseCases() {
  try {
    const { data: role } = await supabase
      .from('roles')
      .select('id')
      .eq('slug', 'sales-teams')
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

export default async function AIToolsForSalesTeams() {
  const relatedUseCases = await getRelatedUseCases()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'AI Tools for Sales Teams' },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Best AI Tools for Sales Teams
        </h1>
        <p className="text-gray-500 leading-relaxed">
          AI gives sales teams an unfair advantage — automatically enriching lead data,
          writing personalised outreach at scale, and surfacing the deals most likely to
          close. The tools below cover every stage of the modern sales process, from
          prospecting and sequencing to call coaching and revenue forecasting.
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
                href={`/use-cases/sales-teams/${uc.slug}`}
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] flex-shrink-0" />
                <span className="text-sm text-gray-700 group-hover:text-[#1E40AF] transition-colors">
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
