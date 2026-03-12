import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { CopyPromptButton } from '@/components/CopyPromptButton'
import { allTemplatePages as templatePages } from '@/lib/templateRegistry'
import { tools } from '@/lib/tools'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.org'

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
        <div className="prompt-block">
          {/* Header bar */}
          <div className="prompt-block-header">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[hsl(220_15%_22%)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[hsl(220_15%_22%)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[hsl(220_15%_22%)]" />
              </div>
              <span className="text-xs text-gray-500 font-mono">prompt.txt</span>
            </div>
            <CopyPromptButton text={page.promptTemplate} variant="dark" />
          </div>
          {/* Content */}
          <pre className="px-5 py-5 text-sm text-[hsl(220_15%_82%)] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
            {page.promptTemplate}
          </pre>
          {/* Footer actions */}
          <div className="prompt-block-footer">
            <a
              href={chatgptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[hsl(220_15%_22%)] bg-[hsl(220_15%_12%)] text-gray-400 hover:border-green-700/60 hover:text-green-400 hover:bg-green-950/40 transition-all"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-70">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Open in ChatGPT
            </a>
            <a
              href={claudeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[hsl(220_15%_22%)] bg-[hsl(220_15%_12%)] text-gray-400 hover:border-orange-700/60 hover:text-orange-400 hover:bg-orange-950/40 transition-all"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-70">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#DBEAFE] text-[#1D4ED8] text-xs font-semibold flex items-center justify-center mt-0.5">
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
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#60A5FA] mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Example input */}
      <section className="mb-12">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Example Input</h2>
        <pre className="p-5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
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

      {/* Related prompt templates */}
      {(() => {
        const related = Object.values(templatePages)
          .filter((t) => t.slug !== page.slug)
          .slice(0, 5)
        if (related.length === 0) return null
        return (
          <section className="mb-12 pt-8 border-t border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Related Prompt Templates
            </h2>
            <div className="space-y-3">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/prompt-templates/${t.slug}`}
                  className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 transition-all"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-[#1E40AF] transition-colors mb-0.5">
                      {t.heading}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-1">{t.seoDescription}</p>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="text-gray-300 group-hover:text-[#60A5FA] transition-colors flex-shrink-0 ml-4"
                  >
                    <path
                      d="M4 8H12M12 8L8 4M12 8L8 12"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )
      })()}

      {/* FAQ */}
      <section className="pt-8 border-t border-gray-100">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-100">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="faq-item group">
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer">
                <h3 className="text-sm font-semibold text-gray-900">{faq.question}</h3>
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 group-open:bg-[#EFF6FF] flex items-center justify-center transition-colors">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-gray-400 group-open:text-[#1D4ED8] transition-colors group-open:rotate-45 duration-200">
                    <path d="M5 2V8M2 5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
