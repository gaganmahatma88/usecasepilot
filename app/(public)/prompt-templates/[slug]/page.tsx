import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { CopyPromptButton } from '@/components/CopyPromptButton'
import { templatePages } from '@/lib/templatePages'
import { tools } from '@/lib/tools'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(templatePages).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = templatePages[params.slug]
  if (!page) return {}
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  }
}

export default function PromptTemplatePage({ params }: Props) {
  const page = templatePages[params.slug]
  if (!page) notFound()

  const encoded = encodeURIComponent(page.promptTemplate)
  const chatgptUrl = `https://chat.openai.com/?prompt=${encoded}`
  const claudeUrl = `https://claude.ai/new?q=${encoded}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Prompt Templates', item: `${siteUrl}/prompt-templates` },
      { '@type': 'ListItem', position: 3, name: page.heading, item: `${siteUrl}/prompt-templates/${page.slug}` },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const pageTools = page.relatedTools.map((key) => tools[key]).filter(Boolean)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Prompt Templates', href: '/prompt-templates' },
          { label: page.heading },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">{page.heading}</h1>
        <p className="text-gray-500 leading-relaxed">{page.seoDescription}</p>
      </div>

      {/* Prompt template */}
      <section className="mb-12">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Prompt Template</h2>
        <div className="rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden">
          <pre className="p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
            {page.promptTemplate}
          </pre>
          <div className="flex flex-wrap gap-2 px-5 py-3 border-t border-gray-100 bg-white">
            <CopyPromptButton text={page.promptTemplate} />
            <a
              href={chatgptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-green-300 hover:text-green-700 transition-colors"
            >
              Open in ChatGPT
            </a>
            <a
              href={claudeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-orange-300 hover:text-orange-700 transition-colors"
            >
              Open in Claude
            </a>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="mb-12">
        <h2 className="text-base font-semibold text-gray-900 mb-4">How to Use This Prompt</h2>
        <ol className="space-y-2">
          {page.howToUse.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* When to use */}
      <section className="mb-12">
        <h2 className="text-base font-semibold text-gray-900 mb-4">When to Use This Prompt</h2>
        <ul className="space-y-2">
          {page.whenToUse.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Example input */}
      <section className="mb-12">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Example Input</h2>
        <pre className="p-5 rounded-xl border border-gray-100 bg-gray-50/50 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
          {page.exampleInput}
        </pre>
      </section>

      {/* Expected output */}
      <section className="mb-12">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Expected Output</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{page.expectedOutput}</p>
      </section>

      {/* Recommended tools */}
      {pageTools.length > 0 && (
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Recommended AI Tools</h2>
          <div className="space-y-4">
            {pageTools.map((tool) => (
              <RecommendedTool key={tool.key} tool={tool} compact />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="pt-8 border-t border-gray-100">
        <h2 className="text-base font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {page.faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{faq.question}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
