'use client'

import { useState } from 'react'
import type { Tool } from '@/lib/tools'

interface Props {
  tool: Tool
}

export function StickyToolCTA({ tool }: Props) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-40 w-64 rounded-xl border border-[#DBEAFE] bg-white shadow-lg shadow-[#1D4ED8]/5 p-4">
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors leading-none"
      >
        ✕
      </button>
      <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-1">
        Recommended Tool
      </p>
      <p className="text-sm font-semibold text-gray-900 mb-0.5">{tool.name}</p>
      <p className="text-xs text-gray-500 leading-relaxed mb-3">{tool.description}</p>
      <a
        href={`/api/track?tool=${tool.key}`}
        target="_blank"
        rel="nofollow noopener"
        className="flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] transition-colors px-3 py-1.5 rounded-lg w-full"
      >
        Try {tool.name} →
      </a>
    </div>
  )
}
