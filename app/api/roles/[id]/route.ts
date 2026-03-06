import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAdmin, adminAuthResponse } from '@/lib/adminAuth'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!requireAdmin()) return adminAuthResponse()
  const body = await request.json()
  const { data, error } = await supabaseAdmin
    .from('roles')
    .update({
      title: body.title,
      slug: body.slug,
      description: body.description,
    })
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
  // Cascade delete use cases first
  await supabaseAdmin.from('usecases').delete().eq('role_id', params.id)
  const { error } = await supabaseAdmin
    .from('roles')
    .delete()
    .eq('id', params.id)
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
