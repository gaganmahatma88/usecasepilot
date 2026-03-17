type PlausibleProps = Record<string, string | number | boolean>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: PlausibleProps }) => void
  }
}

export function trackEvent(name: string, props?: PlausibleProps): void {
  if (typeof window === 'undefined') return
  if (typeof window.plausible !== 'function') return
  window.plausible(name, props ? { props } : undefined)
}

/** Derives page_type and page_slug from the current pathname. */
export function getPageContext(): { page_type: string; page_slug: string } {
  if (typeof window === 'undefined') return { page_type: '', page_slug: '' }
  const segments = window.location.pathname.split('/').filter(Boolean)
  const page_type = segments[0] ?? 'home'
  const page_slug = segments[segments.length - 1] ?? ''
  return { page_type, page_slug }
}
