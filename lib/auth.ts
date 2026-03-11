import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required in production')
  }
  // eslint-disable-next-line no-console
  console.warn('[auth] JWT_SECRET not set — using insecure fallback. Set it before deploying.')
}

const secret = JWT_SECRET || 'fallback-secret-change-in-production'

export function signToken(payload: object): string {
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export function verifyToken(token: string): { role: string } | null {
  try {
    return jwt.verify(token, secret) as { role: string }
  } catch {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
