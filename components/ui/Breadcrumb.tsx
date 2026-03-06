import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && (
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="text-gray-300 flex-shrink-0"
            >
              <path
                d="M5 3L9 7L5 11"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          )}
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                index === items.length - 1
                  ? 'text-gray-700 font-medium'
                  : ''
              }
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
