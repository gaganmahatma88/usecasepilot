'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[global-error]', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', textAlign: 'center', paddingTop: '20vh' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#111827' }}>500</h1>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>A critical error occurred.</p>
        <button
          onClick={reset}
          style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.875rem' }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
