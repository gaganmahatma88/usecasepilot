import { Logo } from '@/components/ui/Logo'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-24 bg-gradient-to-b from-gray-50/60 to-gray-100/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 — Brand */}
          <div>
            <Logo />
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              UseCasePilot helps professionals discover practical AI workflows, tools, and prompts
              to improve productivity.
            </p>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/use-cases" className="hover:text-gray-900 transition-colors">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/ai-prompts" className="hover:text-gray-900 transition-colors">
                  AI Prompts
                </Link>
              </li>
              <li>
                <Link href="/prompt-templates" className="hover:text-gray-900 transition-colors">
                  Prompt Templates
                </Link>
              </li>
              <li>
                <Link href="/ai-use-cases" className="hover:text-gray-900 transition-colors">
                  AI Use Cases Directory
                </Link>
              </li>
              <li>
                <Link href="/ai-use-cases-directory" className="hover:text-gray-900 transition-colors">
                  AI Use Cases Directory (Full)
                </Link>
              </li>
              <li>
                <Link href="/best-ai-use-cases" className="hover:text-gray-900 transition-colors">
                  Best AI Use Cases
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-gray-900 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/about" className="hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-gray-900 transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} UseCasePilot. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors">
              Privacy
            </Link>
            <Link href="/affiliate-disclosure" className="hover:text-gray-600 transition-colors">
              Affiliates
            </Link>
            <Link href="/contact" className="hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
