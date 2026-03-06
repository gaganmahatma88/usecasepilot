import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Use Cases by Role',
  description: 'Browse practical AI use cases organized by professional role.',
}

async function getRoles() {
  try {
    const { data } = await supabase
      .from('roles')
      .select('*, use_cases:usecases(id, published)')
      .order('title')
    return data || []
  } catch {
    return []
  }
}

export default async function UseCasesPage() {
  const roles = await getRoles()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Use Cases' }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          AI Use Cases
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Practical AI workflows organized by professional role. Choose your
          role to explore relevant use cases.
        </p>
      </div>

      {roles.length === 0 ? (
        <div className="text-center py-16 text-gray-400 border border-gray-100 rounded-xl">
          <p>No roles available yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {roles.map((role: any) => {
            const publishedCount =
              role.use_cases?.filter((uc: any) => uc.published).length || 0
            return (
              <Link
                key={role.id}
                href={`/use-cases/${role.slug}`}
                className="group flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all"
              >
                <div>
                  <h2 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
                    {role.title}
                  </h2>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                    {publishedCount} use case{publishedCount !== 1 ? 's' : ''}
                  </span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="text-gray-300 group-hover:text-blue-400 transition-colors"
                  >
                    <path
                      d="M4 8H12M12 8L8 4M12 8L8 12"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
