'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PromptItem {
  slug: string
  title: string
  description: string
}

interface PopularItem {
  slug: string
  heading: string
}

interface Props {
  items: PromptItem[]
  popularItems?: PopularItem[]
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-100 text-yellow-900 rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

export function PromptRoleSearch({ items, popularItems }: Props) {
  const [search, setSearch] = useState('')
  const isSearching = search.trim().length > 0

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <path
            d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10ZM14 14l-3-3"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search AI prompts (e.g. Python, React, SQL)"
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors"
        />
      </div>

      {/* Popular AI Prompts — hidden while searching */}
      {!isSearching && popularItems && popularItems.length > 0 && (
        <div className="mb-10">
          <h2 className="text-base font-semibold text-gray-900 mb-1">🔥 Popular AI Prompts</h2>
          <p className="text-sm text-gray-500 mb-4">
            These popular prompt templates help developers debug, refactor, and optimize code faster
            using ChatGPT or Claude.
          </p>
          <div className="space-y-2">
            {popularItems.map((item) => (
              <Link
                key={item.slug}
                href={`/prompt-templates/${item.slug}`}
                className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
              >
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                  {item.heading}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-4"
                >
                  <path
                    d="M4 8H12M12 8L8 4M12 8L8 12"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category results */}
      {isSearching && filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 border border-gray-100 rounded-xl">
          <p>No prompts found for your search.</p>
        </div>
      ) : (
        <div>
          {isSearching && (
            <h2 className="text-base font-semibold text-gray-900 mb-4">Prompt Categories</h2>
          )}
          <div className="space-y-3">
            {(isSearching ? filtered : items).map((item) => (
              <Link
                key={item.slug}
                href={`/ai-prompts/${item.slug}`}
                className="group flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
              >
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
                    <Highlight text={item.title} query={search} />
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    <Highlight text={item.description} query={search} />
                  </p>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-4"
                >
                  <path
                    d="M4 8H12M12 8L8 4M12 8L8 12"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
