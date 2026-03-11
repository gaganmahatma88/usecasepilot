// ISR: cache pages for 1 hour, then revalidate in the background on next request
export const revalidate = 3600

import { notFound } from 'next/navigation'
import Link from 'next/link'
import GithubSlugger from 'github-slugger'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { MDXRenderer } from '@/components/ui/MDXRenderer'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { StickyToolCTA } from '@/components/ui/StickyToolCTA'
import { getToolForSlug } from '@/lib/tools'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

interface Faq {
  question: string
  answer: string
}

function generateFaqs(title: string, task: string, roleTitle: string, seoDescription: string): Faq[] {
  return [
    {
      question: `What is ${title}?`,
      answer:
        seoDescription ||
        `${title} is a practical AI workflow that helps ${roleTitle} automate and improve ${task.toLowerCase()}, reducing manual effort and increasing output quality.`,
    },
    {
      question: `How does AI help ${roleTitle} with ${task}?`,
      answer: `AI tools assist ${roleTitle} with ${task.toLowerCase()} by analysing large volumes of data quickly, generating structured suggestions, and flagging issues that would take significantly longer to identify manually.`,
    },
    {
      question: `What are the main benefits of using AI for ${task}?`,
      answer: `The key benefits include faster turnaround times, more consistent outputs, reduced human error, and the ability to focus professional effort on decisions that require judgment rather than repetitive processing.`,
    },
    {
      question: `How do I get started with AI for ${task}?`,
      answer: `Start by identifying the most time-consuming parts of your ${task.toLowerCase()} workflow. Most AI tools offer a free plan or trial — integrate one into a low-risk project first, evaluate the output quality, then expand usage from there.`,
    },
  ]
}

function extractHeadings(content: string): { text: string; id: string }[] {
  const slugger = new GithubSlugger()
  return Array.from(content.matchAll(/^## (.+)$/gm)).map((m) => {
    const text = m[1].trim()
    return { text, id: slugger.slug(text) }
  })
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'

const ROLE_TOOLS_PAGE: Record<string, { href: string; label: string }> = {
  'software-engineers': {
    href: '/best-ai-tools-for-software-engineers',
    label: 'Best AI Tools for Software Engineers',
  },
  'product-managers': {
    href: '/best-ai-tools-for-product-managers',
    label: 'Best AI Tools for Product Managers',
  },
  'project-managers': {
    href: '/best-ai-tools-for-project-managers',
    label: 'Best AI Tools for Project Managers',
  },
}

interface Props {
  params: { role: string; usecase: string }
}

async function getUseCase(roleSlug: string, usecaseSlug: string) {
  try {
    const { data: role } = await supabase
      .from('roles')
      .select('*')
      .eq('slug', roleSlug)
      .single()

    if (!role) return null

    const { data: usecase } = await supabase
      .from('usecases')
      .select('*')
      .eq('role_id', role.id)
      .eq('slug', usecaseSlug)
      .eq('published', true)
      .single()

    if (!usecase) return null

    const { data: related } = await supabase
      .from('usecases')
      .select('title, slug')
      .eq('role_id', role.id)
      .eq('published', true)
      .neq('slug', usecaseSlug)
      .limit(4)

    return { role, usecase, related: related || [] }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getUseCase(params.role, params.usecase)

  if (!result) return {}

  const { usecase } = result

  const canonical = `${siteUrl}/use-cases/${params.role}/${params.usecase}`

  return {
    title: usecase.seo_title || usecase.title,
    description: usecase.seo_description,
    alternates: { canonical },
    openGraph: {
      title: usecase.seo_title || usecase.title,
      description: usecase.seo_description,
      url: canonical,
      type: 'article',
    },
  }
}

export default async function UseCasePage({ params }: Props) {
  const result = await getUseCase(params.role, params.usecase)

  if (!result) notFound()

  const { role, usecase, related } = result

  const canonical = `${siteUrl}/use-cases/${params.role}/${params.usecase}`
  const headings = extractHeadings(usecase.content_mdx || '')
  const task = usecase.title.replace(/^AI for /i, '')
  const recommendedTool = getToolForSlug(params.usecase)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Use Cases',
        item: `${siteUrl}/use-cases`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: role.title,
        item: `${siteUrl}/use-cases/${params.role}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: usecase.title,
        item: canonical,
      },
    ],
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: usecase.title,
    description: usecase.seo_description || '',
    datePublished: usecase.created_at,
    dateModified: usecase.created_at,
    author: {
      '@type': 'Organization',
      name: 'UseCasePilot',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'UseCasePilot',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  }

  const faqs = generateFaqs(usecase.title, task, role.title, usecase.seo_description || '')

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Use Cases', href: '/use-cases' },
          { label: role.title, href: `/use-cases/${role.slug}` },
          { label: usecase.title },
        ]}
      />

      <article>
        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 mb-4">
            {role.title}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            {usecase.title}
          </h1>

          {usecase.seo_description && (
            <p className="text-gray-500 text-lg leading-relaxed">
              {usecase.seo_description}
            </p>
          )}

          <div className="mt-4 text-xs text-gray-400">
            Last updated{' '}
            {formatDate(usecase.updated_at || usecase.created_at)}
          </div>
        </header>

        <RecommendedTool tool={recommendedTool} compact />

        {headings.length > 0 && (
          <nav aria-label="Table of contents" className="mb-8 p-4 rounded-xl border border-gray-100 bg-gray-50/60">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              On this page
            </p>
            <ul className="space-y-1.5">
              {headings.map((h) => (
                <li key={h.id} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                  <a
                    href={`#${h.id}`}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="border-t border-gray-100 pt-8">
          <MDXRenderer content={usecase.content_mdx} />
        </div>
      </article>

      <RecommendedTool tool={recommendedTool} />

      <StickyToolCTA tool={recommendedTool} />

      {ROLE_TOOLS_PAGE[params.role] && (
        <div className="mt-10 pt-8 border-t border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            Recommended AI Tools for {role.title}
          </h2>
          <p className="text-sm text-gray-500">
            Looking for tools to implement these workflows?{' '}
            <Link
              href={ROLE_TOOLS_PAGE[params.role].href}
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              See our guide to the {ROLE_TOOLS_PAGE[params.role].label}
            </Link>
            .
          </p>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-100">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item group">
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer">
                <h3 className="text-sm font-semibold text-gray-900">{faq.question}</h3>
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 group-open:bg-blue-50 flex items-center justify-center transition-colors">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-gray-400 group-open:text-blue-500 transition-colors group-open:rotate-45 duration-200">
                    <path d="M5 2V8M2 5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Related Use Cases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/use-cases/${role.slug}/${item.slug}`}
                className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 card-hover transition-all"
              >
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </span>
                <svg
                  width="13" height="13" viewBox="0 0 13 13" fill="none"
                  className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-3"
                >
                  <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 pt-8 border-t border-gray-100">
        <Link
          href={`/use-cases/${role.slug}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M10 7H4M4 7L7 4M4 7L7 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to {role.title}
        </Link>
      </div>
    </div>
  )
}