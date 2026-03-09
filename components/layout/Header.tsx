'use client'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-6">
          <Link
            href="/use-cases"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith('/use-cases')
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Use Cases
          </Link>
          <Link
            href="/best-ai-tools-for-software-engineers"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith('/best-ai-tools')
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            AI Tools
          </Link>
        </nav>
      </div>
    </header>
  )
}
