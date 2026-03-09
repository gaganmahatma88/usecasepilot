import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import { rehypeToolLinks } from '@/lib/rehypeToolLinks'
import { rehypeExternalLinks } from '@/lib/rehypeExternalLinks'

const components = {
  Callout: ({
    type = 'info',
    children,
  }: {
    type?: 'info' | 'warning' | 'tip' | 'error'
    children: React.ReactNode
  }) => {
    const icons: Record<string, string> = {
      info: '💡',
      warning: '⚠️',
      tip: '✅',
      error: '🚫',
    }
    return (
      <div className={`callout callout-${type}`}>
        <span>{icons[type] ?? '💡'}</span>
        <div>{children}</div>
      </div>
    )
  },
}

interface MDXRendererProps {
  content: string
}

export function MDXRenderer({ content }: MDXRendererProps) {
  if (!content) {
    return (
      <div className="text-gray-400 italic">No content available.</div>
    )
  }

  return (
    <div className="prose">
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [rehypeSlug, rehypeToolLinks, rehypeExternalLinks],
          },
        }}
      />
    </div>
  )
}
