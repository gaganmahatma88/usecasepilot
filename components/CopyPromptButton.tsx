'use client'

import { useState } from 'react'

interface Props {
  text: string
}

export function CopyPromptButton({ text }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available (e.g. non-secure context) — fail silently
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
        copied
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
      }`}
    >
      {copied ? 'Copied!' : 'Copy Prompt'}
    </button>
  )
}
