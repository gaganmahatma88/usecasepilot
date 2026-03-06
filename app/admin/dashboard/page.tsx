import { AdminNav } from '@/components/admin/AdminNav'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

async function getStats() {
  try {
    const [{ count: rolesCount }, { count: total }, { count: published }] =
      await Promise.all([
        supabaseAdmin.from('roles').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('usecases').select('*', { count: 'exact', head: true }),
        supabaseAdmin
          .from('usecases')
          .select('*', { count: 'exact', head: true })
          .eq('published', true),
      ])
    return {
      roles: rolesCount || 0,
      usecases: total || 0,
      published: published || 0,
    }
  } catch {
    return { roles: 0, usecases: 0, published: 0 }
  }
}

async function getRecentUseCases() {
  try {
    const { data } = await supabaseAdmin
      .from('usecases')
      .select('*, roles(title)')
      .order('created_at', { ascending: false })
      .limit(5)
    return data || []
  } catch {
    return []
  }
}

export default async function DashboardPage() {
  const [stats, recent] = await Promise.all([getStats(), getRecentUseCases()])

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <div className="flex-1 p-8 bg-white">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-sm text-gray-500 mb-8">
            Manage your UseCasePilot content.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Roles', value: stats.roles, href: '/admin/roles' },
              { label: 'Total Use Cases', value: stats.usecases, href: '/admin/usecases' },
              { label: 'Published', value: stats.published, href: '/admin/usecases' },
            ].map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all block"
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </Link>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mb-10">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Quick Actions
            </h2>
            <div className="flex gap-3">
              <Link
                href="/admin/editor"
                className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + New Use Case
              </Link>
              <Link
                href="/admin/roles"
                className="inline-flex items-center gap-2 bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Manage Roles
              </Link>
            </div>
          </div>

          {/* Recent */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Recent Use Cases
            </h2>
            {recent.length === 0 ? (
              <p className="text-sm text-gray-400">
                No use cases yet. Create your first one!
              </p>
            ) : (
              <div className="space-y-2">
                {recent.map((uc: any) => (
                  <div
                    key={uc.id}
                    className="flex items-center justify-between p-3.5 rounded-lg border border-gray-100"
                  >
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {uc.title}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {uc.roles?.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          uc.published
                            ? 'bg-green-50 text-green-600 border border-green-100'
                            : 'bg-gray-50 text-gray-400 border border-gray-100'
                        }`}
                      >
                        {uc.published ? 'Published' : 'Draft'}
                      </span>
                      <Link
                        href={`/admin/editor?id=${uc.id}`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
