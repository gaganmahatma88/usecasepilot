import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { tools } from '@/lib/tools'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'
const canonical = `${siteUrl}/best-ai-tools-for-product-managers`

export const metadata: Metadata = {
  title: 'Best AI Tools for Product Managers in 2025',
  description:
    'Discover the best AI tools for product managers — from roadmap planning and customer feedback analysis to user behaviour analytics and feature prioritisation.',
  alternates: { canonical },
  openGraph: {
    title: 'Best AI Tools for Product Managers in 2025',
    description:
      'Discover the best AI tools for product managers — from roadmap planning and customer feedback analysis to user behaviour analytics and feature prioritisation.',
    url: canonical,
    type: 'website',
  },
}

const pageTools = [
  tools['notion-ai'],
  tools['productboard'],
  tools['mixpanel'],
  tools['hotjar'],
  tools['aha'],
  tools['linear'],
]

export default function BestAIToolsForProductManagers() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Best AI Tools for Product Managers' },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Best AI Tools for Product Managers
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Product managers are increasingly turning to AI to speed up discovery,
          synthesise customer feedback at scale, and communicate strategy more clearly.
          Whether you need to draft a PRD in minutes, analyse user behaviour patterns,
          or keep stakeholders aligned on a live roadmap, the tools below are built for
          the specific workflows product managers handle every day.
        </p>
      </div>

      <div className="space-y-6">
        {pageTools.map((tool) => (
          <RecommendedTool key={tool.key} tool={tool} />
        ))}
      </div>
    </div>
  )
}
