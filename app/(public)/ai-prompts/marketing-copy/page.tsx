import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { tools } from '@/lib/tools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Prompts for Marketing Copy | UseCasePilot',
  description:
    'Practical AI prompts for marketing teams. Use these prompts to write ad copy, email campaigns, social posts, and landing page content faster.',
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: `${siteUrl}/ai-prompts` },
    { '@type': 'ListItem', position: 3, name: 'Marketing Copy Prompts', item: `${siteUrl}/ai-prompts/marketing-copy` },
  ],
}

const prompts = [
  'Write a compelling headline for this product landing page.',
  'Generate five subject line variations for this email campaign.',
  'Rewrite this ad copy to be more conversion-focused.',
  'Create three social media captions for this product launch.',
  'Write a 150-word product description for this feature.',
  'Draft a call-to-action for a free trial sign-up page.',
  'Suggest improvements to increase click-through rate on this email.',
  'Write a customer testimonial prompt to send post-purchase.',
  'Create an A/B test variation for this landing page headline.',
  'Summarise this blog post into a LinkedIn post with a hook.',
]

const recommendedTools = [tools.jasper, tools.hubspot, tools.buffer]

export default function MarketingCopyPromptsPage() {
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
          { label: 'Marketing Copy Prompts' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          AI Prompts for Marketing Copy
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Use these prompts to write high-converting marketing content faster. From email subject
          lines to social captions and landing page copy — AI can accelerate every stage of your
          content workflow.
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
          href="/use-cases/marketing-managers/ai-for-marketing-content-generation"
          className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
        >
          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
            AI for Marketing Content Generation — Full Workflow Guide
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0">
            <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
