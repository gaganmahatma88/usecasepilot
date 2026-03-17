import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Props {
  role: string
  excludeSlug?: string
}

async function getWorkflows(roleSlug: string, excludeSlug?: string) {
  try {
    const { data: role } = await supabase
      .from('roles')
      .select('id, slug')
      .eq('slug', roleSlug)
      .single()

    if (!role) return null

    let query = supabase
      .from('usecases')
      .select('title, slug')
      .eq('role_id', role.id)
      .eq('published', true)
      .limit(3)

    if (excludeSlug) {
      query = query.neq('slug', excludeSlug)
    }

    const { data: usecases } = await query

    return { roleSlug: role.slug, usecases: usecases || [] }
  } catch {
    return null
  }
}

export async function RelatedWorkflows({ role, excludeSlug }: Props) {
  const result = await getWorkflows(role, excludeSlug)
  if (!result || result.usecases.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Workflows Using This Prompt
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {result.usecases.map((uc) => (
          <Link
            key={uc.slug}
            href={`/use-cases/${result.roleSlug}/${uc.slug}`}
            className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/20 card-hover transition-all"
          >
            <span className="text-sm font-medium text-gray-800 group-hover:text-[#1E40AF] transition-colors">
              {uc.title}
            </span>
            <svg
              width="13" height="13" viewBox="0 0 13 13" fill="none"
              className="text-gray-300 group-hover:text-[#60A5FA] transition-colors flex-shrink-0 ml-3"
            >
              <path
                d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
