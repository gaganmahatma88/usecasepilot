import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { comparePassword, signToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('admin_password_hash')
      .single()

    let isValid = false

    if (!settings?.admin_password_hash) {
  return NextResponse.json(
    { error: 'Admin password not configured' },
    { status: 500 }
  )
}

const isValid = await comparePassword(password, settings.admin_password_hash)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = signToken({ role: 'admin' })

    const response = NextResponse.json({ success: true })

    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}