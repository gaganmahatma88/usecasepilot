import { NextResponse } from 'next/server'
import { tools } from '@/lib/tools'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('tool')

  const tool = key ? tools[key] : null

  if (!tool) {
    return new NextResponse('Tool not found', { status: 404 })
  }

  // Guard against open redirects: only allow absolute https:// URLs
  let redirectUrl: URL
  try {
    redirectUrl = new URL(tool.url)
  } catch {
    return new NextResponse('Invalid redirect URL', { status: 400 })
  }
  if (redirectUrl.protocol !== 'https:') {
    return new NextResponse('Redirect target must use HTTPS', { status: 400 })
  }

  console.log(`[affiliate-click] tool=${tool.key} url=${redirectUrl.href}`)

  return NextResponse.redirect(redirectUrl.href)
}
