import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { prompts } from '@/lib/prompts'
import { tools } from '@/lib/tools'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(prompts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = prompts[params.slug]
  if (!page) return {}
  return {
    title: `${page.title} | UseCasePilot`,
    description: page.description,
  }
}

export default function PromptPage({ params }: Props) {
  const page = prompts[params.slug]
  if (!page) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: `${siteUrl}/ai-prompts` },
      { '@type': 'ListItem', position: 3, name: page.title, item: `${siteUrl}/ai-prompts/${page.slug}` },
    ],
  }

  const pageTools = page.relatedTools
    .map((key) => tools[key])
    .filter(Boolean)

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
          { label: page.title },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">{page.title}</h1>
        <p className="text-gray-500 leading-relaxed">{page.description}</p>
      </div>

      <div className="space-y-3 mb-12">
        {page.prompts.map((prompt, i) => (
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

      {pageTools.length > 0 && (
        <div className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Recommended AI Tools for These Prompts
          </h2>
          <div className="space-y-4">
            {pageTools.map((tool) => (
              <RecommendedTool key={tool.key} tool={tool} compact />
            ))}
          </div>
        </div>
      )}

      {page.relatedUseCases.length > 0 && (
        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Related AI Workflows</h2>
          <div className="space-y-3">
            {page.relatedUseCases.map((uc) => (
              <Link
                key={uc.href}
                href={uc.href}
                className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
              >
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                  {uc.label}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0"
                >
                  <path
                    d="M4 8H12M12 8L8 4M12 8L8 12"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
