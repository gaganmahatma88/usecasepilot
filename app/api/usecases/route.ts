import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAdmin, adminAuthResponse } from '@/lib/adminAuth'

export async function GET() {
  const { data } = await supabaseAdmin
    .from('usecases')
    .select('*, roles(title, slug)')
    .order('created_at', { ascending: false })
  return NextResponse.json(data || [])
}

export async function POST(request: Request) {
  if (!requireAdmin()) return adminAuthResponse()
  const body = await request.json()
  const { data, error } = await supabaseAdmin
    .from('usecases')
    .insert({
      role_id: body.role_id,
      title: body.title,
      slug: body.slug,
      content_mdx: body.content_mdx || '',
      seo_title: body.seo_title || '',
      seo_description: body.seo_description || '',
      published: body.published || false,
    })
    .select()
    .single()
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}
