import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAdmin, adminAuthResponse } from '@/lib/adminAuth'

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabaseAdmin
    .from('usecases')
    .select('*')
    .eq('id', params.id)
    .single()
  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!requireAdmin()) return adminAuthResponse()
  const body = await request.json()
  const { data, error } = await supabaseAdmin
    .from('usecases')
    .update({
      role_id: body.role_id,
      title: body.title,
      slug: body.slug,
      content_mdx: body.content_mdx,
      seo_title: body.seo_title,
      seo_description: body.seo_description,
      published: body.published,
    })
    .eq('id', params.id)
    .select()
    .single()
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!requireAdmin()) return adminAuthResponse()
  const body = await request.json()
  const { data, error } = await supabaseAdmin
    .from('usecases')
    .update(body)
    .eq('id', params.id)
    .select()
    .single()
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  if (!requireAdmin()) return adminAuthResponse()
  const { error } = await supabaseAdmin
    .from('usecases')
    .delete()
    .eq('id', params.id)
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
