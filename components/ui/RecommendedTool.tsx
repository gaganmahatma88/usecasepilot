import type { Tool } from '@/lib/tools'

interface Props {
  tool: Tool
}

export function RecommendedTool({ tool }: Props) {
  return (
    <div className="mt-10 p-5 rounded-xl border border-blue-100 bg-blue-50/40">
      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
        Recommended Tool
      </p>
      <p className="text-sm font-semibold text-gray-900 mb-1">{tool.name}</p>
      <p className="text-sm text-gray-500 mb-4">{tool.description}</p>
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
