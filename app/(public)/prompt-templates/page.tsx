import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { templateRegistry } from '@/lib/templateRegistry'
import { allTemplatePages } from '@/lib/templateRegistry'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Templates for ChatGPT & Claude | UseCasePilot',
  description:
    'Browse ready-to-use AI prompt templates for debugging, refactoring, testing, and optimizing code using ChatGPT or Claude.',
}

const taskLabels: Record<string, string> = {
  debugging:    'Debugging Prompt Templates',
  refactoring:  'Refactoring Prompt Templates',
  testing:      'Testing Prompt Templates',
  optimization: 'Optimization Prompt Templates',
}

const taskOrder = ['debugging', 'refactoring', 'testing', 'optimization'] as const

export default function PromptTemplatesPage() {
  const grouped = taskOrder.map((task) => ({
    task,
    label: taskLabels[task],
    entries: templateRegistry.filter((e) => e.task === task),
  }))

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Prompt Templates' },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          Prompt Templates for ChatGPT &amp; Claude
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Use these ready-to-use ChatGPT and Claude prompt templates to debug code, refactor
          applications, generate tests, and optimize performance.
        </p>
      </div>

      <div className="space-y-12">
        {grouped.map(({ task, label, entries }) => (
          <section key={task}>
            <h2 className="text-base font-semibold text-gray-900 mb-4">{label}</h2>
            <div className="space-y-2">
              {entries.map((entry) => {
                const page = allTemplatePages[entry.slug]
                if (!page) return null
                return (
                  <Link
                    key={entry.slug}
                    href={`/prompt-templates/${entry.slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 transition-all"
                  >
                    <span className="text-sm font-medium text-gray-800 group-hover:text-[#1E40AF] transition-colors">
                      {page.heading}
                    </span>
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
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
