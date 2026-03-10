import type { Tool } from '@/lib/tools'

interface Props {
  tool: Tool
  compact?: boolean
}

function PricingBadge({ pricing }: { pricing?: string }) {
  if (!pricing) return null
  const styles =
    pricing === 'Free'
      ? 'bg-green-50 text-green-700 border-green-100'
      : pricing === 'Free Trial'
      ? 'bg-amber-50 text-amber-700 border-amber-100'
      : 'bg-gray-100 text-gray-500 border-gray-200'
  const label =
    pricing === 'Free' ? 'Free plan' : pricing === 'Free Trial' ? 'Free trial' : 'Paid'
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${styles}`}>
      {label}
    </span>
  )
}

export function RecommendedTool({ tool, compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-white hover:border-blue-200 hover:shadow-sm transition-all">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
              Recommended Tool
            </p>
            <PricingBadge pricing={tool.pricing} />
          </div>
          <p className="text-sm text-gray-700 leading-snug">
            <span className="font-semibold text-gray-900">{tool.name}</span>
            {' — '}
            {tool.description}
          </p>
        </div>
        <a
          href={`/api/track?tool=${tool.key}`}
          target="_blank"
          rel="nofollow noopener"
          className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-4 py-2 rounded-lg shadow-sm"
        >
          Try {tool.name}
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H4M9.5 1.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    )
  }

  return (
    <div className="mt-10 p-5 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-white hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
          Recommended Tool
        </p>
        <PricingBadge pricing={tool.pricing} />
      </div>
      <p className="text-base font-semibold text-gray-900 mb-1">{tool.name}</p>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{tool.description}</p>
      {tool.benefits && tool.benefits.length > 0 && (
        <ul className="mb-5 space-y-2">
          {tool.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm text-gray-600">
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="flex-shrink-0 mt-0.5 text-blue-500"
              >
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
                <path
                  d="M4 7L6 9L10 5"
                  stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      )}
      <a
        href={`/api/track?tool=${tool.key}`}
        target="_blank"
        rel="nofollow noopener"
        className="inline-flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-5 py-2.5 rounded-lg shadow-sm"
      >
        Try {tool.name} Free
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M1.5 9.5L9.5 1.5M9.5 1.5H4M9.5 1.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  )
}
