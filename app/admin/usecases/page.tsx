'use client'
import { useState, useEffect } from 'react'
import { AdminNav } from '@/components/admin/AdminNav'
import Link from 'next/link'

interface UseCase {
  id: string
  title: string
  slug: string
  published: boolean
  created_at: string
  roles: { title: string; slug: string }
}

export default function AdminUseCasesPage() {
  const [usecases, setUsecases] = useState<UseCase[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchUseCases() {
    const res = await fetch('/api/usecases')
    const data = await res.json()
    setUsecases(data)
    setLoading(false)
  }

  useEffect(() => { fetchUseCases() }, [])

  async function togglePublish(id: string, published: boolean) {
    await fetch(`/api/usecases/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !published }),
    })
    fetchUseCases()
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return
    await fetch(`/api/usecases/${id}`, { method: 'DELETE' })
    fetchUseCases()
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <div className="flex-1 p-8 bg-white">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Use Cases</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage all use case content.
              </p>
            </div>
            <Link
              href="/admin/editor"
              className="bg-[#1D4ED8] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1E40AF] transition-colors"
            >
              + New Use Case
            </Link>
          </div>

          {loading ? (
            <div className="text-sm text-gray-400">Loading…</div>
          ) : usecases.length === 0 ? (
            <div className="text-center py-12 text-gray-400 border border-gray-100 rounded-xl">
              <p>No use cases yet.</p>
              <Link
                href="/admin/editor"
                className="text-sm text-[#1D4ED8] mt-2 inline-block"
              >
                Create your first use case →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {usecases.map((uc) => (
                <div
                  key={uc.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 text-sm">
                        {uc.title}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          uc.published
                            ? 'bg-green-50 text-green-600 border border-green-100'
                            : 'bg-gray-50 text-gray-400 border border-gray-100'
                        }`}
                      >
                        {uc.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      {uc.roles?.title} · /use-cases/{uc.roles?.slug}/{uc.slug}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => togglePublish(uc.id, uc.published)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                        uc.published
                          ? 'text-yellow-600 hover:bg-yellow-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {uc.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link
                      href={`/admin/editor?id=${uc.id}`}
                      className="text-xs text-[#1D4ED8] hover:text-[#1E40AF] px-3 py-1.5 rounded-lg hover:bg-[#EFF6FF] transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(uc.id, uc.title)}
                      className="text-xs text-red-400 hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
