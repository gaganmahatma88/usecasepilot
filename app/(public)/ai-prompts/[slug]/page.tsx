import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { PromptCard } from '@/components/PromptCard'
import { prompts } from '@/lib/prompts'
import { promptRoles } from '@/lib/promptRoles'
import { assistantConfig } from '@/lib/promptTemplates'
import { tools } from '@/lib/tools'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  const promptSlugs = Object.keys(prompts).map((slug) => ({ slug }))
  const roleSlugs = Object.keys(promptRoles).map((slug) => ({ slug }))
  return [...promptSlugs, ...roleSlugs]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const role = promptRoles[params.slug]
  if (role) {
    return {
      title: `${role.title} | UseCasePilot`,
      description: role.description,
    }
  }
  const page = prompts[params.slug]
  if (page) {
    return {
      title: `${page.title} | UseCasePilot`,
      description: page.description,
    }
  }
  return {}
}

// ─── Role hub view ────────────────────────────────────────────────────────────

function RoleHub({ slug }: { slug: string }) {
  const role = promptRoles[slug]
  if (!role) return notFound()

  const rolePrompts = Object.values(prompts).filter(
    (p) => p.role === slug && !p.assistant
  )

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: `${siteUrl}/ai-prompts` },
      { '@type': 'ListItem', position: 3, name: role.title, item: `${siteUrl}/ai-prompts/${slug}` },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'AI Prompts', href: '/ai-prompts' },
          { label: role.title },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">{role.title}</h1>
        <div className="space-y-3 max-w-2xl">
          {role.body.map((paragraph, i) => (
            <p key={i} className="text-gray-500 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {rolePrompts.length === 0 ? (
        <div className="text-center py-16 text-gray-400 border border-gray-100 rounded-xl">
          <p>No prompt pages for this role yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rolePrompts.map((page) => (
            <Link
              key={page.slug}
              href={`/ai-prompts/${page.slug}`}
              className="group flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
            >
              <div>
                <p className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
                  {page.title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">{page.description}</p>
              </div>
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-4"
              >
                <path
                  d="M4 8H12M12 8L8 4M12 8L8 12"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── FAQ generation ───────────────────────────────────────────────────────────

function extractTopic(title: string): string {
  // "AI Prompts for Debugging with ChatGPT" → "debugging"
  return title
    .replace(/^AI Prompts for\s+/i, '')
    .replace(/\s+with (ChatGPT|Claude)$/i, '')
    .toLowerCase()
}

function generatePromptFaqs(title: string) {
  const topic = extractTopic(title)
  return [
    {
      question: `What are AI ${topic} prompts?`,
      answer: `AI ${topic} prompts are structured instructions given to AI assistants like ChatGPT or Claude to help with ${topic} tasks. You provide relevant context — such as code snippets, error messages, or requirements — so the AI can give targeted, actionable suggestions.`,
    },
    {
      question: `How do I use ChatGPT or Claude for ${topic}?`,
      answer: `Copy one of the prompts from this page, paste it into ChatGPT or Claude, and include your specific context such as code, error output, or requirements. Providing more detail helps the AI give more accurate and useful responses.`,
    },
    {
      question: `What should I include in a ${topic} prompt?`,
      answer: `The best ${topic} prompts include relevant context such as the programming language or platform, any error messages or expected behaviour, and what you have already tried. This helps the AI assistant understand the problem and give more precise guidance.`,
    },
    {
      question: `Can AI fully automate ${topic}?`,
      answer: `AI tools can significantly speed up ${topic} tasks by generating suggestions, identifying issues, and drafting solutions. However, professionals should review all AI output carefully before applying it, especially in production environments.`,
    },
  ]
}

// ─── Prompt page view ─────────────────────────────────────────────────────────

function PromptPage({ slug }: { slug: string }) {
  const page = prompts[slug]
  if (!page) return notFound()

  const roleInfo = promptRoles[page.role]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: `${siteUrl}/ai-prompts` },
      ...(roleInfo
        ? [{ '@type': 'ListItem', position: 3, name: roleInfo.title, item: `${siteUrl}/ai-prompts/${page.role}` }]
        : []),
      {
        '@type': 'ListItem',
        position: roleInfo ? 4 : 3,
        name: page.title,
        item: `${siteUrl}/ai-prompts/${page.slug}`,
      },
    ],
  }

  const pageTools = page.relatedTools.map((key) => tools[key]).filter(Boolean)
  const faqs = generatePromptFaqs(page.title)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Prompts', href: '/ai-prompts' },
    ...(roleInfo ? [{ label: roleInfo.title, href: `/ai-prompts/${page.role}` }] : []),
    { label: page.title },
  ]

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

      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">{page.title}</h1>
        <p className="text-gray-500 leading-relaxed">{page.description}</p>
      </div>

      {/* Prompt list */}
      <div className="space-y-3 mb-10">
        {page.prompts.map((prompt, i) => (
          <PromptCard key={i} prompt={prompt} index={i} />
        ))}
      </div>

      {/* How to use */}
      {(() => {
        const asst = page.assistant ? assistantConfig[page.assistant] : null
        const howToTitle = asst
          ? `How to Use These Prompts with ${asst.label}`
          : 'How to Use These Prompts'
        const howToIntro = asst
          ? `Copy any prompt above and paste it directly into ${asst.label}. Add your specific code or context for best results.`
          : 'You can copy any prompt above and use it with tools like ChatGPT, Claude, or other AI assistants.'
        const howToSteps = asst
          ? asst.steps
          : ['Copy the prompt', 'Paste it into your AI assistant', 'Replace placeholders with your specific context']
        return (
          <div className="mb-12 p-5 rounded-xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-base font-semibold text-gray-900 mb-3">{howToTitle}</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{howToIntro}</p>
            <ol className="space-y-2">
              {howToSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )
      })()}

      {/* Recommended tools */}
      {pageTools.length > 0 && (
        <div className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Recommended AI Tools
          </h2>
          <div className="space-y-4">
            {pageTools.map((tool) => (
              <RecommendedTool key={tool.key} tool={tool} compact />
            ))}
          </div>
        </div>
      )}

      {/* Related use cases */}
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

      {/* FAQ */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-base font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{faq.question}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Route entry point ────────────────────────────────────────────────────────

export default function SlugPage({ params }: Props) {
  if (promptRoles[params.slug]) return <RoleHub slug={params.slug} />
  if (prompts[params.slug]) return <PromptPage slug={params.slug} />
  notFound()
}
