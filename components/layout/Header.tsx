'use client'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  const navLink = (href: string, label: string, match: string) => {
    const active = pathname.startsWith(match)
    return (
      <Link
        href={href}
        className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
          active
            ? 'text-[#1D4ED8] bg-[#EFF6FF]'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        {label}
      </Link>
    )
  }

  const promptsActive =
    pathname.startsWith('/ai-prompts') || pathname.startsWith('/prompt-templates')

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-1">
          {navLink('/use-cases', 'Use Cases', '/use-cases')}
          {navLink('/ai-workflows', 'AI Workflows', '/ai-workflows')}
          <Link
            href="/ai-prompts"
            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
              promptsActive
                ? 'text-[#1D4ED8] bg-[#EFF6FF]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            AI Prompts
          </Link>
          {navLink(
            '/best-ai-tools-for-software-engineers',
            'AI Tools',
            '/best-ai-tools'
          )}
        </nav>
      </div>
    </header>
  )
}
