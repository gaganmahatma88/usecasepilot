import { Logo } from '@/components/ui/Logo'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-24 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Logo />
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
          <Link href="/use-cases" className="hover:text-gray-600 transition-colors">
            Use Cases
          </Link>
          <Link href="/ai-use-cases" className="hover:text-gray-600 transition-colors">
            AI Use Cases Directory
          </Link>
          <Link href="/best-ai-use-cases" className="hover:text-gray-600 transition-colors">
            Best AI Use Cases
          </Link>
          <Link href="/about" className="hover:text-gray-600 transition-colors">
            About
          </Link>
          <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/affiliate-disclosure" className="hover:text-gray-600 transition-colors">
            Affiliate Disclosure
          </Link>
          <Link href="/contact" className="hover:text-gray-600 transition-colors">
            Contact
          </Link>
          <Link href="/sitemap.xml" className="hover:text-gray-600 transition-colors">
            Sitemap
          </Link>
        </div>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} UseCasePilot. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
