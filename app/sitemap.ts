import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { prompts } from '@/lib/prompts'
import { promptRoles } from '@/lib/promptRoles'
import { allTemplatePages as templatePages } from '@/lib/templateRegistry'

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.org'

  const { data: roles } = await supabase
    .from('roles')
    .select('slug, created_at')

  const { data: usecases, error: usecasesError } = await supabase
    .from('usecases')
    .select(`
      slug,
      created_at,
      roles!inner(slug)
    `)
    .eq('published', true)

  if (usecasesError) {
    console.error('[sitemap] usecases query error:', usecasesError)
  }
  console.log('[sitemap] usecases fetched:', usecases?.length ?? 0, usecases)

  const roleUrls =
    roles?.map((r) => ({
      url: `${baseUrl}/use-cases/${r.slug}`,
      lastModified: r.created_at,
    })) || []

  const usecaseUrls =
    usecases?.map((uc: any) => ({
      url: `${baseUrl}/use-cases/${uc.roles.slug}/${uc.slug}`,
      lastModified: uc.created_at,
    })) || []

  const promptRoleUrls: MetadataRoute.Sitemap = Object.values(promptRoles).map((r) => ({
    url: `${baseUrl}/ai-prompts/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const promptUrls: MetadataRoute.Sitemap = Object.values(prompts).map((p) => ({
    url: `${baseUrl}/ai-prompts/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const templateUrls: MetadataRoute.Sitemap = Object.values(templatePages).map((t) => ({
    url: `${baseUrl}/prompt-templates/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    '/',
    '/about',
    '/contact',
    '/privacy-policy',
    '/affiliate-disclosure',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [
    { url: `${baseUrl}/use-cases`, lastModified: new Date() },
    { url: `${baseUrl}/ai-prompts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/prompt-templates`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...roleUrls,
    ...usecaseUrls,
    ...promptRoleUrls,
    ...promptUrls,
    ...templateUrls,
    ...staticPages,
  ]
}