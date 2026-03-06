import { cookies } from 'next/headers'
import { verifyToken } from './auth'
import { NextResponse } from 'next/server'

export function requireAdmin(): boolean {
  const token = cookies().get('admin_token')?.value
  if (!token) return false
  const payload = verifyToken(token)
  return payload?.role === 'admin'
}

export function adminAuthResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
