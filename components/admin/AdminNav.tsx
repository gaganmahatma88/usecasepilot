'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Logo } from '@/components/ui/Logo'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '⬛' },
  { href: '/admin/roles',     label: 'Roles',      icon: '👥' },
  { href: '/admin/usecases',  label: 'Use Cases',  icon: '📄' },
  { href: '/admin/editor',    label: 'New Use Case', icon: '✏️' },
  { href: '/admin/ideas',     label: 'Use Case Ideas', icon: '💡' },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-56 min-h-screen bg-gray-50 border-r border-gray-100 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <Logo />
        <span className="ml-9 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
          Admin
        </span>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === item.href ||
              (item.href !== '/admin/dashboard' &&
                pathname.startsWith(item.href))
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-100">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 6H11M6 1L11 6L6 11"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          View site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 text-left"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M5 1H2a1 1 0 00-1 1v8a1 1 0 001 1h3M8 8.5l2.5-2.5L8 3.5M4 6h6.5"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  )
}
