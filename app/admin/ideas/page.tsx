'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminNav } from '@/components/admin/AdminNav'

interface Role {
  id: string
  title: string
  slug: string
}

export default function IdeasPage() {
  const router = useRouter()
  const [roles, setRoles] = useState<Role[]>([])
  const [roleId, setRoleId] = useState('')
  const [count, setCount] = useState(20)
  const [ideas, setIdeas] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/roles')
      .then((r) => r.json())
      .then((data) => {
        setRoles(data)
        if (data.length > 0) setRoleId(data[0].id)
      })
  }, [])

  async function generate() {
    const role = roles.find((r) => r.id === roleId)
    if (!role) return

    setLoading(true)
    setError('')
    setIdeas([])

    try {
      const res = await fetch('/api/ai/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: role.title, count }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setIdeas(data.ideas)
    } catch {
      setError('Generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      <AdminNav />
      <main className="flex-1 p-8">
        <div className="max-w-2xl">
          <h1 className="text-xl font-semibold text-gray-900 mb-6">Use Case Ideas</h1>

          <div className="flex gap-3 mb-6">
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>

            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
            />

            <button
              onClick={generate}
              disabled={loading || !roleId}
              className="px-4 py-2 bg-[#1D4ED8] text-white text-sm font-medium rounded-lg hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating…' : 'Generate Ideas'}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          {ideas.length > 0 && (
            <ul className="space-y-2">
              {ideas.map((idea, i) => (
                <li key={i}>
                  <button
                    onClick={() => router.push(`/admin/editor?title=${encodeURIComponent(idea)}`)}
                    className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-[#EFF6FF] hover:text-[#1E40AF] border border-gray-100 rounded-lg text-sm text-gray-800 transition-colors"
                  >
                    {idea}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
