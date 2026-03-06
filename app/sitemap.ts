import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'

  try {
    const { data: roles } = await supabase
      .from('roles')
      .select('slug, created_at')

    const { data: usecases } = await supabase
      .from('usecases')
      .select('slug, created_at, updated_at, roles(slug)')
      .eq('published', true)

    const roleUrls: MetadataRoute.Sitemap = (roles || []).map((r) => ({
      url: `${baseUrl}/use-cases/${r.slug}`,
      lastModified: r.created_at,
    }))

    const usecaseUrls: MetadataRoute.Sitemap = (usecases || []).map(
      (uc: any) => ({
        url: `${baseUrl}/use-cases/${uc.roles?.slug}/${uc.slug}`,
        lastModified: uc.updated_at || uc.created_at,
      })
    )

    return [
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/use-cases`, lastModified: new Date() },
      ...roleUrls,
      ...usecaseUrls,
    ]
  } catch {
    return [
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/use-cases`, lastModified: new Date() },
    ]
  }
}
