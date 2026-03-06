'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/ui/Logo'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid password')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900 mb-1">Admin access</h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your admin password to continue.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Default password: <code className="font-mono">admin123</code>
        </p>
      </div>
    </div>
  )
}
