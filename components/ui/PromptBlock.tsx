'use client'

import React from 'react'
import { CopyPromptButton } from '@/components/CopyPromptButton'

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('\n')
  if (React.isValidElement(node)) {
    const { children } = node.props as { children?: React.ReactNode }
    return extractText(children)
  }
  return ''
}

export function PromptBlock({ children }: { children: React.ReactNode }) {
  const text = extractText(children).trim()
  const encoded = encodeURIComponent(text)

  if (!text) return null

  return (
    <div className="prompt-block my-6">
      {/* Header bar */}
      <div className="prompt-block-header">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(220_15%_22%)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(220_15%_22%)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(220_15%_22%)]" />
          </div>
          <span className="text-xs text-gray-500 font-mono">AI Prompt</span>
        </div>
        <CopyPromptButton text={text} variant="dark" />
      </div>

      {/* Prompt text — div intentionally, not p, to avoid .prose p styles */}
      <div className="px-5 py-4">
        <div className="text-sm text-[hsl(220_15%_82%)] leading-relaxed font-mono whitespace-pre-wrap">
          {text}
        </div>
      </div>

      {/* Footer actions */}
      <div className="prompt-block-footer">
        <a
          href={`https://chat.openai.com/?prompt=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[hsl(220_15%_22%)] bg-[hsl(220_15%_12%)] text-gray-400 hover:border-green-700/60 hover:text-green-400 hover:bg-green-950/40 transition-all"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-70">
            <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Open in ChatGPT
        </a>
        <a
          href={`https://claude.ai/new?q=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[hsl(220_15%_22%)] bg-[hsl(220_15%_12%)] text-gray-400 hover:border-orange-700/60 hover:text-orange-400 hover:bg-orange-950/40 transition-all"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-70">
            <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Open in Claude
        </a>
      </div>
    </div>
  )
}
