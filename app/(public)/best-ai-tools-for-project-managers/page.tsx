import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { tools } from '@/lib/tools'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'
const canonical = `${siteUrl}/best-ai-tools-for-project-managers`

export const metadata: Metadata = {
  title: 'Best AI Tools for Project Managers in 2025',
  description:
    'Discover the best AI tools for project managers — from AI meeting transcription and automatic scheduling to project planning, status reporting, and workload management.',
  alternates: { canonical },
  openGraph: {
    title: 'Best AI Tools for Project Managers in 2025',
    description:
      'Discover the best AI tools for project managers — from AI meeting transcription and automatic scheduling to project planning, status reporting, and workload management.',
    url: canonical,
    type: 'website',
  },
}

const pageTools = [
  tools['asana'],
  tools['fireflies'],
  tools['clickup'],
  tools['motion'],
  tools['notion-ai'],
  tools['linear'],
]

export default function BestAIToolsForProjectManagers() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Best AI Tools for Project Managers' },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Best AI Tools for Project Managers
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Project managers are responsible for keeping work on track across people,
          timelines, and competing priorities. AI tools now handle the repetitive
          coordination work — transcribing meetings, auto-scheduling tasks around real
          capacity, and surfacing at-risk items before they cause delays. The tools
          below are the most effective for reducing administrative overhead and keeping
          projects moving.
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
