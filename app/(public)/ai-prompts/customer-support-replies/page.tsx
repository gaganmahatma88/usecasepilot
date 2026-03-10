import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { tools } from '@/lib/tools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Prompts for Customer Support Replies | UseCasePilot',
  description:
    'Practical AI prompts for customer support teams. Use these prompts to draft replies, handle escalations, and improve response quality at scale.',
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: `${siteUrl}/ai-prompts` },
    { '@type': 'ListItem', position: 3, name: 'Customer Support Reply Prompts', item: `${siteUrl}/ai-prompts/customer-support-replies` },
  ],
}

const prompts = [
  'Draft a polite reply to this frustrated customer complaint.',
  'Summarise this support ticket and suggest a resolution.',
  'Write an empathetic response for a billing dispute.',
  'Classify this ticket by category and urgency.',
  'Suggest three possible resolutions for this issue.',
  'Rewrite this response to be friendlier and more concise.',
  'Draft a follow-up message to check if the issue was resolved.',
  'Write an escalation summary for the engineering team.',
  'Generate a FAQ entry based on this common support question.',
  'Identify the root cause of this recurring customer complaint.',
]

const recommendedTools = [tools.intercom, tools.zendesk, tools.freshdesk]

export default function CustomerSupportRepliesPromptsPage() {
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
          { label: 'Customer Support Reply Prompts' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          AI Prompts for Customer Support Replies
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Use these prompts to draft faster, higher-quality support replies. Whether handling
          complaints, billing disputes, or escalations — AI can help your team respond consistently
          at scale.
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
          href="/use-cases/customer-support/ai-for-customer-support-automation"
          className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
        >
          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
            AI for Customer Support Automation — Full Workflow Guide
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0">
            <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
