'use client'
import { useState, useEffect } from 'react'
import { AdminNav } from '@/components/admin/AdminNav'
import { createSlug } from '@/lib/utils'

interface Role {
  id: string
  title: string
  slug: string
  description: string
  created_at: string
}

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', description: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function fetchRoles() {
    const res = await fetch('/api/roles')
    const data = await res.json()
    setRoles(data)
    setLoading(false)
  }

  useEffect(() => { fetchRoles() }, [])

  function openNew() {
    setEditingRole(null)
    setForm({ title: '', slug: '', description: '' })
    setShowForm(true)
    setError('')
  }

  function openEdit(role: Role) {
    setEditingRole(role)
    setForm({ title: role.title, slug: role.slug, description: role.description })
    setShowForm(true)
    setError('')
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: editingRole ? f.slug : createSlug(title),
    }))
  }

  async function handleSave() {
    if (!form.title.trim()) return setError('Title is required')
    setSaving(true)
    setError('')
    try {
      const method = editingRole ? 'PUT' : 'POST'
      const url = editingRole ? `/api/roles/${editingRole.id}` : '/api/roles'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Failed to save')
      } else {
        setShowForm(false)
        fetchRoles()
      }
    } catch {
      setError('Failed to save role')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, title: string) {
    if (
      !confirm(
        `Delete "${title}"? This will also delete all use cases in this role.`
      )
    )
      return
    await fetch(`/api/roles/${id}`, { method: 'DELETE' })
    fetchRoles()
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <div className="flex-1 p-8 bg-white">
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage professional roles for use cases.
              </p>
            </div>
            <button
              onClick={openNew}
              className="bg-[#1D4ED8] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1E40AF] transition-colors"
            >
              + New Role
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="mb-6 p-5 rounded-xl border border-[#DBEAFE] bg-[#EFF6FF]/30">
              <h2 className="font-semibold text-gray-900 mb-4 text-sm">
                {editingRole ? 'Edit Role' : 'New Role'}
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Title
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                    placeholder="e.g. Project Managers"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Slug
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, slug: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                    placeholder="project-managers"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] resize-none"
                    rows={2}
                    placeholder="Brief description of this role…"
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#1D4ED8] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1E40AF] disabled:opacity-50 transition-colors"
                  >
                    {saving ? 'Saving…' : 'Save Role'}
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-white text-gray-600 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* List */}
          {loading ? (
            <div className="text-sm text-gray-400">Loading…</div>
          ) : roles.length === 0 ? (
            <div className="text-center py-12 text-gray-400 border border-gray-100 rounded-xl">
              <p>No roles yet. Create your first role to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {role.title}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      /use-cases/{role.slug}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(role)}
                      className="text-xs text-[#1D4ED8] hover:text-[#1E40AF] px-3 py-1.5 rounded-lg hover:bg-[#EFF6FF] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(role.id, role.title)}
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
