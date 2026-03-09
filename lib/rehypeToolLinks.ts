import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { TOOL_NAME_TO_KEY } from '@/lib/tools'

// Sorted longest-first so multi-word names ("OWASP ZAP") match before prefixes
const TOOL_NAMES = Object.keys(TOOL_NAME_TO_KEY).sort((a, b) => b.length - a.length)

function isToolsHeading(node: any): boolean {
  return (
    node.type === 'element' &&
    node.tagName === 'h2' &&
    toString(node).toLowerCase().includes('tools')
  )
}

function hasAnchorDescendant(node: any): boolean {
  let found = false
  visit(node, 'element', (el: any) => {
    if (el.tagName === 'a') found = true
  })
  return found
}

function linkToolInLi(li: any): void {
  // Skip list items that already contain a link
  if (hasAnchorDescendant(li)) return

  const text = toString(li)
  const toolName = TOOL_NAMES.find((name) =>
    text.toLowerCase().startsWith(name.toLowerCase())
  )
  if (!toolName) return

  const key = TOOL_NAME_TO_KEY[toolName]
  const href = `/api/track?tool=${key}`
  const remainder = text.slice(toolName.length)

  const anchor = {
    type: 'element',
    tagName: 'a',
    properties: { href, target: '_blank', rel: ['nofollow', 'noopener'] },
    children: [{ type: 'text', value: toolName }],
  }

  const newChildren: any[] = remainder
    ? [anchor, { type: 'text', value: remainder }]
    : [anchor]

  // Preserve <p> wrapper present in loose lists (blank line between items)
  const pChild = li.children?.find((c: any) => c.tagName === 'p')
  if (pChild) {
    pChild.children = newChildren
  } else {
    li.children = newChildren
  }
}

export function rehypeToolLinks() {
  return (tree: any) => {
    const rootChildren: any[] = tree.children ?? []

    for (let i = 0; i < rootChildren.length; i++) {
      const node = rootChildren[i]
      if (!isToolsHeading(node)) continue

      // Find the next <ul> sibling before any subsequent heading
      for (let j = i + 1; j < rootChildren.length; j++) {
        const sibling = rootChildren[j]
        if (sibling.type !== 'element') continue
        if (['h1', 'h2', 'h3', 'h4'].includes(sibling.tagName)) break
        if (sibling.tagName === 'ul') {
          for (const li of sibling.children ?? []) {
            if (li.tagName === 'li') linkToolInLi(li)
          }
          break
        }
      }
    }
  }
}
