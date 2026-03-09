import { visit } from 'unist-util-visit'

export function rehypeExternalLinks() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName !== 'a') return

      const href: string = node.properties?.href ?? ''
      if (!href.startsWith('http://') && !href.startsWith('https://')) return

      // Open in new tab
      node.properties.target = '_blank'

      // Merge rel values without duplicating
      const rel: string[] = Array.isArray(node.properties.rel)
        ? [...node.properties.rel]
        : []
      if (!rel.includes('nofollow')) rel.push('nofollow')
      if (!rel.includes('noopener')) rel.push('noopener')
      node.properties.rel = rel
    })
  }
}
