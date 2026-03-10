import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { tools } from '@/lib/tools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Prompts for Bug Triage | UseCasePilot',
  description:
    'Practical AI prompts for bug triage workflows. Use these prompts to classify, prioritise, and resolve bugs faster using AI coding assistants.',
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: `${siteUrl}/ai-prompts` },
    { '@type': 'ListItem', position: 3, name: 'Bug Triage Prompts', item: `${siteUrl}/ai-prompts/bug-triage` },
  ],
}

const prompts = [
  'Classify this bug report by severity: critical, high, medium, or low.',
  'Suggest the most likely root cause of this error based on the stack trace.',
  'Identify which component is responsible for this regression.',
  'Write a clear bug report from this raw user complaint.',
  'Suggest a minimal reproduction case for this reported issue.',
  'Prioritise these five bugs based on user impact and fix complexity.',
  'Explain this error message in plain language.',
  'List the steps needed to investigate and resolve this bug.',
  'Identify if this bug is a duplicate of an existing known issue.',
  'Draft a comment to request more information from the reporter.',
]

const recommendedTools = [tools.linear, tools['github-copilot'], tools.cursor]

export default function BugTriagePromptsPage() {
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
          { label: 'Bug Triage Prompts' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          AI Prompts for Bug Triage
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Use these prompts to triage bugs faster and more consistently. From classifying severity
          to identifying root causes and drafting clear reports — AI can reduce the friction in
          your bug management process.
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
          href="/use-cases/software-engineers/ai-for-bug-triage"
          className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
        >
          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
            AI for Bug Triage — Full Workflow Guide
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0">
            <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
