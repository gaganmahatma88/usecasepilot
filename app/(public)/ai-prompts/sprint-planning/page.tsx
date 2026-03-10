import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { tools } from '@/lib/tools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Prompts for Sprint Planning | UseCasePilot',
  description:
    'Practical AI prompts for sprint planning. Use these prompts to estimate effort, write user stories, and run more effective sprint ceremonies.',
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: `${siteUrl}/ai-prompts` },
    { '@type': 'ListItem', position: 3, name: 'Sprint Planning Prompts', item: `${siteUrl}/ai-prompts/sprint-planning` },
  ],
}

const prompts = [
  'Break this feature request into development tasks with effort estimates.',
  'Write acceptance criteria for this user story.',
  'Identify dependencies between these sprint items.',
  'Summarise the key risks for this sprint.',
  'Suggest which tickets should be deferred based on team capacity.',
  'Draft a sprint goal based on these backlog items.',
  'Convert this bug report into a well-structured ticket.',
  'Estimate story points for this ticket based on its description.',
  'Identify blockers that could affect sprint completion.',
  'Generate a retrospective summary from these team notes.',
]

const recommendedTools = [tools.clickup, tools.asana, tools.fireflies]

export default function SprintPlanningPromptsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'AI Prompts', href: '/ai-prompts' },
          { label: 'Sprint Planning Prompts' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          AI Prompts for Sprint Planning
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Use these prompts to run faster, more structured sprint planning sessions. From writing
          user stories to estimating effort and identifying blockers — AI can handle the heavy
          lifting.
        </p>
      </div>

      <div className="space-y-3 mb-12">
        {prompts.map((prompt, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{prompt}&rdquo;</p>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Recommended AI Tools for These Prompts
        </h2>
        <div className="space-y-4">
          {recommendedTools.map((tool) => (
            <RecommendedTool key={tool.key} tool={tool} compact />
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Related AI Workflows</h2>
        <Link
          href="/use-cases/project-managers/ai-for-sprint-retrospective"
          className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
        >
          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
            AI for Sprint Retrospective — Full Workflow Guide
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0">
            <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
