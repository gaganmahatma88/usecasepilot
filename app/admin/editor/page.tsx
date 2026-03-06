'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AdminNav } from '@/components/admin/AdminNav'
import { RichEditor } from '@/components/admin/RichEditor'
import { createSlug } from '@/lib/utils'

interface Role {
  id: string
  title: string
  slug: string
}

function EditorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [roles, setRoles] = useState<Role[]>([])
  const [form, setForm] = useState({
    role_id: '',
    title: '',
    slug: '',
    content_mdx: '',
    seo_title: '',
    seo_description: '',
    published: false,
  })
  const autosaveTimer = useRef<NodeJS.Timeout | null>(null)
  const lastSavedSnapshot = useRef<string>('')

  function getSnapshot() {
    return JSON.stringify({
      title: form.title,
      slug: form.slug,
      content_mdx: form.content_mdx,
      role_id: form.role_id,
      seo_title: form.seo_title,
      seo_description: form.seo_description,
    })
  }
  const [saving, setSaving] = useState(false)
  const [autosaving, setAutosaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const rolesRes = await fetch('/api/roles')
      const rolesData = await rolesRes.json()
      setRoles(rolesData)

      if (editId) {
        const res = await fetch(`/api/usecases/${editId}`)
        const uc = await res.json()
        setForm({
          role_id: uc.role_id,
          title: uc.title,
          slug: uc.slug,
          content_mdx: uc.content_mdx || '',
          seo_title: uc.seo_title || '',
          seo_description: uc.seo_description || '',
          published: uc.published,
        })
        lastSavedSnapshot.current = JSON.stringify({
          title: uc.title,
          slug: uc.slug,
          content_mdx: uc.content_mdx || '',
          role_id: uc.role_id,
          seo_title: uc.seo_title || '',
          seo_description: uc.seo_description || '',
        })
      } else if (rolesData.length > 0) {
        setForm((f) => ({ ...f, role_id: rolesData[0].id }))
      }
      setLoading(false)
    }
    load()
  }, [editId])

  useEffect(() => {
    if (!editId) return

    if (autosaveTimer.current) {
      clearTimeout(autosaveTimer.current)
    }

    autosaveTimer.current = setTimeout(async () => {
      if (saving) return
      const snapshot = getSnapshot()
      if (snapshot === lastSavedSnapshot.current) return
      setAutosaving(true)
      await handleSave()
      lastSavedSnapshot.current = snapshot
      setAutosaving(false)
    }, 5000)

    return () => {
      if (autosaveTimer.current) {
        clearTimeout(autosaveTimer.current)
      }
    }
  }, [
    form.title,
    form.slug,
    form.content_mdx,
    form.role_id,
    form.seo_title,
    form.seo_description,
  ])

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: editId ? f.slug : createSlug(title),
      seo_title: f.seo_title || title,
    }))
  }

  async function handleSave(publish?: boolean) {
    if (!form.title.trim()) return setError('Title is required')
    if (!form.role_id) return setError('Select a role')
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      published: publish !== undefined ? publish : form.published,
    }

    try {
      const method = editId ? 'PUT' : 'POST'
      const url = editId ? `/api/usecases/${editId}` : '/api/usecases'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Failed to save')
      } else {
        const data = await res.json()
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
        if (!editId) router.push(`/admin/editor?id=${data.id}`)
        if (publish !== undefined)
          setForm((f) => ({ ...f, published: publish }))
      }
    } catch {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <div className="flex-1 p-8 text-sm text-gray-400">Loading editor…</div>
    )

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-gray-900">
            {editId ? 'Edit Use Case' : 'New Use Case'}
          </h1>
          {form.published && (
            <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full font-medium">
              Published
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {autosaving && <span className="text-xs text-gray-400">Saving...</span>}
          {saved && <span className="text-xs text-green-600">✓ Saved</span>}
          {error && <span className="text-xs text-red-500">{error}</span>}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Save draft
          </button>
          <button
            onClick={() => handleSave(!form.published)}
            disabled={saving}
            className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {form.published ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 max-w-5xl w-full">
        <div className="grid grid-cols-3 gap-6">
          {/* Main editor */}
          <div className="col-span-2 space-y-4">
            <input
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-2xl font-bold text-gray-900 border-none outline-none placeholder:text-gray-300 bg-transparent"
              placeholder="Use case title…"
            />
            <RichEditor
              content={form.content_mdx}
              onChange={(mdx) => setForm((f) => ({ ...f, content_mdx: mdx }))}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-gray-100 space-y-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Settings
              </h3>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Role
                </label>
                <select
                  value={form.role_id}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role_id: e.target.value }))
                  }
                  className="w-full px-2.5 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select role…</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  URL slug
                </label>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: e.target.value }))
                  }
                  className="w-full px-2.5 py-2 rounded-lg border border-gray-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="my-use-case"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-100 space-y-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                SEO
              </h3>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Meta title
                </label>
                <input
                  value={form.seo_title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, seo_title: e.target.value }))
                  }
                  className="w-full px-2.5 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO title…"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {form.seo_title.length}/60
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Meta description
                </label>
                <textarea
                  value={form.seo_description}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      seo_description: e.target.value,
                    }))
                  }
                  className="w-full px-2.5 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Brief description for search results…"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {form.seo_description.length}/160
                </p>
              </div>
            </div>

            {editId && (
              <div className="p-4 rounded-xl border border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Preview
                </h3>
                <a
                  href={`/use-cases/${
                    roles.find((r) => r.id === form.role_id)?.slug
                  }/${form.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline break-all"
                >
                  /use-cases/
                  {roles.find((r) => r.id === form.role_id)?.slug}/
                  {form.slug} ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditorPage() {
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <Suspense
        fallback={
          <div className="flex-1 p-8 text-sm text-gray-400">
            Loading editor…
          </div>
        }
      >
        <EditorContent />
      </Suspense>
    </div>
  )
}
