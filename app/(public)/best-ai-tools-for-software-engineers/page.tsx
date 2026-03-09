import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { tools } from '@/lib/tools'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'
const canonical = `${siteUrl}/best-ai-tools-for-software-engineers`

export const metadata: Metadata = {
  title: 'Best AI Tools for Software Engineers in 2025',
  description:
    'Discover the best AI tools for software engineers — from AI code completion and security scanning to issue tracking and code review automation.',
  alternates: { canonical },
  openGraph: {
    title: 'Best AI Tools for Software Engineers in 2025',
    description:
      'Discover the best AI tools for software engineers — from AI code completion and security scanning to issue tracking and code review automation.',
    url: canonical,
    type: 'website',
  },
}

const pageTools = [
  tools['github-copilot'],
  tools['cursor'],
  tools['tabnine'],
  tools['snyk'],
  tools['sonarqube'],
  tools['linear'],
]

export default function BestAIToolsForSoftwareEngineers() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Best AI Tools for Software Engineers' },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Best AI Tools for Software Engineers
        </h1>
        <p className="text-gray-500 leading-relaxed">
          AI is reshaping how software engineers write, review, and ship code. From
          intelligent autocomplete that understands your entire codebase to automated
          security scanning that catches vulnerabilities before they reach production,
          the right AI tools can significantly reduce cycle times and improve code
          quality. The tools below are the most impactful for day-to-day engineering
          workflows.
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
