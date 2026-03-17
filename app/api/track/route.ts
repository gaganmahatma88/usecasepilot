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

  // Fire tool_click to Plausible Events API — fire-and-forget, never blocks redirect
  const referer = req.headers.get('referer') ?? `https://usecasepilot.org`
  let sourcePage = '/'
  try { sourcePage = new URL(referer).pathname } catch { /* ignore */ }

  fetch('https://plausible.io/api/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': req.headers.get('user-agent') ?? 'Mozilla/5.0',
      'X-Forwarded-For': req.headers.get('x-forwarded-for') ?? '127.0.0.1',
    },
    body: JSON.stringify({
      name: 'tool_click',
      url: referer,
      domain: 'usecasepilot.org',
      props: { tool_name: tool.key, source_page: sourcePage },
    }),
  }).catch(() => { /* analytics failure must never affect the redirect */ })

  return NextResponse.redirect(redirectUrl.href)
}
