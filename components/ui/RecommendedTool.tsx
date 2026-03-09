import type { Tool } from '@/lib/tools'

interface Props {
  tool: Tool
  compact?: boolean
}

export function RecommendedTool({ tool, compact = false }: Props) {
  if (compact) {
    return (
      <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50/40">
        <div>
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">
            Best Tool for This Workflow
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{tool.name}</span>
            {' '}—{' '}{tool.description}
          </p>
        </div>
        <a
          href={`/api/track?tool=${tool.key}`}
          target="_blank"
          rel="nofollow noopener"
          className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          Try {tool.name} Free →
        </a>
      </div>
    )
  }

  return (
    <div className="mt-10 p-5 rounded-xl border border-blue-100 bg-blue-50/40">
      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
        Recommended Tool
      </p>
      <div className="flex items-center gap-2 mb-1">
        <p className="text-sm font-semibold text-gray-900">{tool.name}</p>
        {tool.pricing && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            tool.pricing === 'Free'
              ? 'bg-green-50 text-green-700 border border-green-100'
              : tool.pricing === 'Free Trial'
              ? 'bg-yellow-50 text-yellow-700 border border-yellow-100'
              : 'bg-gray-100 text-gray-500'
          }`}>
            {tool.pricing === 'Free' ? 'Free plan' : tool.pricing === 'Free Trial' ? 'Free trial' : 'Paid'}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-3">{tool.description}</p>
      {tool.benefits && tool.benefits.length > 0 && (
        <ul className="mb-4 space-y-1.5">
          {tool.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600">
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="flex-shrink-0 mt-0.5 text-blue-500"
              >
                <path
                  d="M2.5 7L5.5 10L11.5 4"
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
        className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg"
      >
        Try {tool.name} →
      </a>
    </div>
  )
}
