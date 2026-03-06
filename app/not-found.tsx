import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <Logo className="mb-8" />
      <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-500 mb-8">
        This page doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
      >
        ← Back to home
      </Link>
    </div>
  )
}
