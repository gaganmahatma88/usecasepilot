import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <circle cx="14" cy="14" r="13" stroke="hsl(221 83% 53%)" strokeWidth="1.5" />
        <path d="M8 14 L11 14" stroke="hsl(221 83% 53%)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 14 L20 14" stroke="hsl(221 83% 53%)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 8 L14 11" stroke="hsl(221 83% 53%)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 17 L14 20" stroke="hsl(221 83% 53%)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="2.5" fill="hsl(221 83% 53%)" />
        <circle cx="8"  cy="14" r="1.5" fill="hsl(221 83% 53%)" fillOpacity="0.5" />
        <circle cx="20" cy="14" r="1.5" fill="hsl(221 83% 53%)" fillOpacity="0.5" />
        <circle cx="14" cy="8"  r="1.5" fill="hsl(221 83% 53%)" fillOpacity="0.5" />
        <circle cx="14" cy="20" r="1.5" fill="hsl(221 83% 53%)" fillOpacity="0.5" />
        <path d="M10.5 10.5 L12.5 12.5" stroke="hsl(221 83% 53%)" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M15.5 15.5 L17.5 17.5" stroke="hsl(221 83% 53%)" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M17.5 10.5 L15.5 12.5" stroke="hsl(221 83% 53%)" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M10.5 17.5 L12.5 15.5" stroke="hsl(221 83% 53%)" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      </svg>
      {showText && (
        <span className="text-[15px] font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
          UseCasePilot
        </span>
      )}
    </Link>
  )
}
