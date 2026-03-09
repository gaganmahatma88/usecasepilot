import type { Tool } from '@/lib/tools'

interface Props {
  tools: Tool[]
}

const pricingStyle: Record<string, string> = {
  Free: 'text-green-700 bg-green-50 border border-green-100',
  'Free Trial': 'text-yellow-700 bg-yellow-50 border border-yellow-100',
  Paid: 'text-gray-500 bg-gray-100',
}

export function ToolComparisonTable({ tools }: Props) {
  return (
    <div className="mb-10 rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">
              Tool
            </th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
              Best For
            </th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">
              Pricing
            </th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {tools.map((tool) => (
            <tr key={tool.key} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900">{tool.name}</td>
              <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                {tool.bestFor ?? '—'}
              </td>
              <td className="px-4 py-3">
                {tool.pricing ? (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${pricingStyle[tool.pricing] ?? ''}`}>
                    {tool.pricing}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <a
                  href={`/api/track?tool=${tool.key}`}
                  target="_blank"
                  rel="nofollow noopener"
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Try free →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
