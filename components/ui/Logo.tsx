import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      {/*
        Waypoint mark — 28×28 · #1D4ED8 badge
        ① Rounded-square blue badge
        ② Origin dot  (bottom-left)
        ③ L-shaped route: vertical → 90° rounded corner → horizontal
        ④ Solid arrowhead (destination, top-right)
      */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        {/* Badge background */}
        <rect width="28" height="28" rx="8" fill="#1D4ED8" />

        {/* Origin dot — "I am here" */}
        <circle cx="7" cy="21" r="3" fill="white" />

        {/* Route: up → rounded 90° corner → right */}
        <path
          d="M7 21 L7 12.5 Q7 9 10.5 9 L19 9"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Arrowhead — destination */}
        <path d="M19 6.5 L23.5 9 L19 11.5 Z" fill="white" />
      </svg>

      {showText && (
        <span className="text-[15px] font-semibold tracking-tight leading-none text-gray-900 group-hover:text-[#1E40AF] transition-colors">
          UseCasePilot
        </span>
      )}
    </Link>
  )
}
