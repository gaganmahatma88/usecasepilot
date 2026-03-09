import { NextResponse } from 'next/server'
import { tools } from '@/lib/tools'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('tool')

  const tool = key ? tools[key] : null

  if (!tool) {
    return new NextResponse('Tool not found', { status: 404 })
  }

  console.log(`[affiliate-click] tool=${tool.key} url=${tool.url}`)

  return NextResponse.redirect(tool.url)
}
