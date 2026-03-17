import Link from 'next/link'
import { prompts } from '@/lib/prompts'

interface Props {
  role: string
}

export function RelatedPrompts({ role }: Props) {
  // Exclude assistant variants (-chatgpt / -claude) to avoid showing duplicates
  const items = Object.values(prompts)
    .filter((p) => p.role === role && !p.assistant)
    .slice(0, 4)

  if (items.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Prompts for This Workflow
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {items.map((prompt) => (
          <Link
            key={prompt.slug}
            href={`/ai-prompts/${prompt.slug}`}
            className="group block p-4 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 card-hover transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 group-hover:text-[#1E40AF] transition-colors mb-1">
                  {prompt.title}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {prompt.description}
                </p>
              </div>
              <svg
                width="13" height="13" viewBox="0 0 13 13" fill="none"
                className="text-gray-300 group-hover:text-[#60A5FA] transition-colors flex-shrink-0 mt-0.5"
              >
                <path
                  d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10"
                  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
