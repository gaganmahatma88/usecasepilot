export interface Role {
  id: string
  title: string
  slug: string
  description: string
  created_at: string
  use_cases?: UseCase[]
}

export interface UseCase {
  id: string
  role_id: string
  title: string
  slug: string
  content_mdx: string
  seo_title: string
  seo_description: string
  published: boolean
  created_at: string
  roles?: Role
}

export interface Settings {
  id?: string
  site_name: string
  admin_password_hash: string
  logo_url: string
}
