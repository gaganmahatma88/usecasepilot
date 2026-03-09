export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import GithubSlugger from 'github-slugger'
import { supabaseAdmin } from '@/lib/supabase'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { MDXRenderer } from '@/components/ui/MDXRenderer'
import { RecommendedTool } from '@/components/ui/RecommendedTool'
import { getToolForSlug } from '@/lib/tools'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

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
    const { data: role } = await supabaseAdmin
      .from('roles')
      .select('*')
      .eq('slug', roleSlug)
      .single()

    if (!role) return null

    const { data: usecase } = await supabaseAdmin
      .from('usecases')
      .select('*')
      .eq('role_id', role.id)
      .eq('slug', usecaseSlug)
      .eq('published', true)
      .single()

    if (!usecase) return null

    const { data: related } = await supabaseAdmin
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: usecase.title,
    description: usecase.seo_description || '',
    datePublished: usecase.created_at,
    dateModified: usecase.updated_at || usecase.created_at,
    author: {
      '@type': 'Organization',
      name: 'UseCasePilot',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${usecase.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            usecase.seo_description ||
            `${usecase.title} is a practical AI workflow designed to help ${role.title} professionals work more efficiently.`,
        },
      },
      {
        '@type': 'Question',
        name: `How does AI help with ${task}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `AI tools can accelerate and automate ${task} by analysing data, generating structured outputs, and reducing manual effort — helping ${role.title} professionals focus on higher-value work.`,
        },
      },
      {
        '@type': 'Question',
        name: `What tools can be used for ${task}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `A range of AI-powered tools support ${task}, including writing assistants, analysis platforms, and workflow automation tools tailored to ${role.title} workflows.`,
        },
      },
    ],
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
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
          <nav aria-label="Table of contents" className="mb-8 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              On this page
            </p>
            <ul className="space-y-1.5">
              {headings.map((h) => (
                <li key={h.id}>
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

      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Related Use Cases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/use-cases/${role.slug}/${item.slug}`}
                className="block p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-800">
                  {item.title}
                </span>
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