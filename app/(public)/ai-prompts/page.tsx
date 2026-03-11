import Link from 'next/link'
import { prompts } from '@/lib/prompts'
import { promptRoles } from '@/lib/promptRoles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Prompts for Professionals | UseCasePilot',
  description:
    'Discover practical AI prompts that help professionals automate workflows, generate ideas, and improve productivity.',
}

const promptSections = [
  { heading: 'Prompts for Software Engineers', slugs: ['code-review', 'bug-triage'] },
  { heading: 'Prompts for Product Managers', slugs: ['sprint-planning', 'product-roadmap'] },
  { heading: 'Prompts for Marketing', slugs: ['marketing-copy'] },
  { heading: 'Prompts for Customer Support', slugs: ['customer-support-replies'] },
]

const ChevronRight = () => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    className="text-gray-300 group-hover:text-[#60A5FA] transition-colors flex-shrink-0 ml-4"
  >
    <path
      d="M4 8H12M12 8L8 4M12 8L8 12"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

export default function AIPromptsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          AI Prompts for Professionals
        </h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Discover practical AI prompts that help professionals automate workflows, generate ideas,
          and improve productivity.
        </p>
      </div>

      {/* Role hub links */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse Prompts by Role</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(promptRoles).map((role) => (
            <Link
              key={role.slug}
              href={`/ai-prompts/${role.slug}`}
              className="group flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 transition-all"
            >
              <div>
                <p className="font-medium text-gray-900 group-hover:text-[#1E40AF] transition-colors mb-1">
                  {role.title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">{role.description}</p>
              </div>
              <ChevronRight />
            </Link>
          ))}
        </div>
      </div>

      {/* Individual prompt pages grouped by role */}
      <div className="space-y-12">
        {promptSections.map((section) => {
          const pages = section.slugs.map((slug) => prompts[slug]).filter(Boolean)
          return (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{section.heading}</h2>
              <div className="space-y-3">
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/ai-prompts/${page.slug}`}
                    className="group flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 transition-all"
                  >
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-[#1E40AF] transition-colors mb-1">
                        {page.title}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-1">{page.description}</p>
                    </div>
                    <ChevronRight />
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
