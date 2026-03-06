import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAdmin, adminAuthResponse } from '@/lib/adminAuth'

export async function GET() {
  const { data } = await supabaseAdmin.from('roles').select('*').order('title')
  return NextResponse.json(data || [])
}

export async function POST(request: Request) {
  if (!requireAdmin()) return adminAuthResponse()
  const body = await request.json()
  const { data, error } = await supabaseAdmin
    .from('roles')
    .insert({
      title: body.title,
      slug: body.slug,
      description: body.description || '',
    })
    .select()
    .single()
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}
