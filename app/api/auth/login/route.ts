import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { comparePassword, signToken } from '@/lib/auth'

// Simple in-memory rate limiter: max 10 attempts per IP per 15-minute window.
// Note: on serverless each instance has independent state; this guards against
// rapid burst attempts within the same cold instance.
const loginAttempts = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = loginAttempts.get(ip)
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please wait 15 minutes.' },
      { status: 429 }
    )
  }
  try {
    const { password } = await request.json()

    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('admin_password_hash')
      .single()

  

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
      sameSite: 'strict',
     secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}