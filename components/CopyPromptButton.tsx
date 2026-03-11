'use client'

import { useState } from 'react'

interface Props {
  text: string
  variant?: 'dark' | 'light'
}

export function CopyPromptButton({ text, variant = 'dark' }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available — fail silently
    }
  }

  const isDark = variant === 'dark'

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
        copied
          ? isDark
            ? 'bg-green-900/40 border-green-700/60 text-green-400'
            : 'bg-green-50 border-green-200 text-green-700'
          : isDark
          ? 'bg-gray-800/80 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
          : 'bg-white border-gray-200 text-gray-500 hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
      }`}
    >
      {copied ? (
        <>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 5.5L4 8L9.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M2.5 7.5H1.5C1 7.5 0.5 7 0.5 6.5V1.5C0.5 1 1 0.5 1.5 0.5H6.5C7 0.5 7.5 1 7.5 1.5V2.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}
