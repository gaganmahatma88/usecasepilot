import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Workflow Library | UseCasePilot',
  description:
    'Explore practical AI workflows across engineering, marketing, product management, customer support, and sales.',
}

const roles = [
  {
    label: 'Developers',
    slug: 'software-engineers',
    icon: '💻',
    description:
      'AI workflows for debugging, code review, testing, and documentation.',
    href: '/use-cases/software-engineers',
  },
  {
    label: 'Product Managers',
    slug: 'product-managers',
    icon: '📊',
    description:
      'AI workflows for roadmap planning, user research, and feature prioritisation.',
    href: '/use-cases/product-managers',
  },
  {
    label: 'Marketing Teams',
    slug: 'marketing-managers',
    icon: '📣',
    description:
      'AI workflows for content generation, campaign planning, and SEO analysis.',
    href: '/use-cases/marketing-managers',
  },
  {
    label: 'Customer Support',
    slug: 'customer-support',
    icon: '💬',
    description:
      'AI workflows for ticket triage, response drafting, and knowledge base management.',
    href: '/use-cases/customer-support',
  },
  {
    label: 'Sales Teams',
    slug: 'sales-teams',
    icon: '🤝',
    description:
      'AI workflows for lead qualification, outreach personalisation, and deal forecasting.',
    href: '/use-cases/sales-teams',
  },
]

const faqs = [
  {
    question: 'What are AI workflows?',
    answer:
      'AI workflows are structured, repeatable processes that use AI tools to automate or assist with professional tasks. They combine prompts, tools, and documented steps so teams can apply AI consistently and reliably across their work.',
  },
  {
    question: 'How can professionals use AI automation workflows?',
    answer:
      'Professionals use AI automation workflows to reduce manual effort on repetitive tasks — such as drafting content, triaging tickets, reviewing code, or analysing data. The key is identifying predictable, high-volume tasks in your role and pairing them with a suitable AI tool and a well-designed prompt.',
  },
  {
    question: 'What tools help automate workflows with AI?',
    answer:
      'Common tools include ChatGPT and Claude for text-based tasks, GitHub Copilot for coding, Notion AI for documentation, and Zapier or Make for connecting AI actions across apps. The best tool depends on your role and the specific workflow you want to automate.',
  },
  {
    question: 'Are AI workflows suitable for non-technical teams?',
    answer:
      'Yes. Many AI workflows require no coding — just a well-structured prompt and a general-purpose AI assistant like ChatGPT or Claude. Marketing, sales, and support teams regularly use AI workflows for tasks like drafting emails, summarising calls, and creating reports.',
  },
  {
    question: 'How do I get started building an AI workflow?',
    answer:
      'Start by picking one repetitive task in your current role. Write a clear prompt that describes what you want the AI to produce, including relevant context and constraints. Test it, refine it, and then document the steps so your team can reuse it consistently.',
  },
]

export default function AIWorkflowsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://usecasepilot.org' },
      { '@type': 'ListItem', position: 2, name: 'AI Workflow Library', item: 'https://usecasepilot.org/ai-workflows' },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full px-4 py-1.5 text-sm font-medium text-[#1D4ED8] mb-5">
          AI Workflow Library
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
          AI Workflows for Professionals
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
          Practical, documented AI automation workflows organised by professional role.
          Browse real-world examples used by engineers, marketers, product teams, and more —
          covering everything from debugging and content creation to ticket triage and sales outreach.
        </p>
      </div>

      {/* Role sections */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Browse AI Workflows by Role
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roles.map((role) => (
            <Link
              key={role.slug}
              href={role.href}
              className="group block p-5 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 card-hover transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-lg flex-shrink-0">
                  {role.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#1E40AF] transition-colors text-[15px]">
                      {role.label}
                    </h3>
                    <svg
                      width="13" height="13" viewBox="0 0 13 13" fill="none"
                      className="text-gray-300 group-hover:text-[#60A5FA] transition-colors flex-shrink-0"
                    >
                      <path
                        d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10"
                        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What are AI workflows — editorial section */}
      <section className="mb-14 p-6 rounded-xl border border-gray-100 bg-gray-50/50">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          What are AI automation workflows?
        </h2>
        <div className="space-y-3 text-sm text-gray-500 leading-relaxed">
          <p>
            An AI automation workflow is a documented, repeatable process where an AI tool handles
            part of a professional task — from drafting and summarising to classifying and generating
            structured outputs. Unlike one-off prompts, workflows are designed to be run consistently,
            shared with a team, and refined over time.
          </p>
          <p>
            UseCasePilot documents these workflows by role so professionals can adopt them without
            starting from scratch. Each workflow includes context on when to use it, what inputs to
            provide, and what output to expect.
          </p>
        </div>
        <div className="mt-4">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
          >
            Browse all use cases
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-100">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item group">
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer">
                <h3 className="text-sm font-semibold text-gray-900">{faq.question}</h3>
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 group-open:bg-[#EFF6FF] flex items-center justify-center transition-colors">
                  <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    className="text-gray-400 group-open:text-[#1D4ED8] transition-colors group-open:rotate-45 duration-200"
                  >
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
