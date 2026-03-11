'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to console; replace with Sentry.captureException(error) when monitoring is set up
    console.error('[app-error]', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">500</h1>
      <p className="text-gray-500 mb-6">Something went wrong on our end.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="text-sm text-blue-600 hover:text-blue-700 underline"
        >
          Try again
        </button>
        <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
