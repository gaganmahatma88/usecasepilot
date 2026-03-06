'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useCallback, useEffect } from 'react'

interface RichEditorProps {
  content: string
  onChange: (value: string) => void
}

/** Convert basic HTML (from TipTap) to MDX-compatible markdown */
function htmlToMdx(html: string): string {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<u[^>]*>(.*?)<\/u>/gi, '_$1_')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) =>
      inner.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n').trim() + '\n\n'
    )
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
      let i = 0
      return (
        inner.replace(/<li[^>]*>(.*?)<\/li>/gi, (_: string, c: string) => `${++i}. ${c}\n`).trim() +
        '\n\n'
      )
    })
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, c) =>
      c
        .trim()
        .split('\n')
        .map((l: string) => `> ${l}`)
        .join('\n') + '\n\n'
    )
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Convert MDX/markdown to basic HTML for TipTap display */
function mdxToHtml(mdx: string): string {
  if (!mdx) return ''
  // If it's already HTML, return as-is
  if (mdx.trim().startsWith('<')) return mdx
  return mdx
    .replace(/```[\s\S]*?```/g, (m) => `<pre><code>${m.slice(3, -3).replace(/^[a-z]+\n/, '')}</code></pre>`)
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/^> (.*$)/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hobulcp])/gm, '<p>')
    .replace(/$(?![<>])/gm, '</p>')
    .replace(/<p><\/p>/g, '')
}

const Btn = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault()
      onClick()
    }}
    title={title}
    className={`p-1.5 rounded text-sm font-medium transition-colors min-w-[28px] ${
      active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {children}
  </button>
)

export function RichEditor({ content, onChange }: RichEditorProps) {
  const [showMdx, setShowMdx] = useState(false)
  const [rawContent, setRawContent] = useState(content)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: 'Start writing your use case content…',
      }),
    ],
    content: mdxToHtml(content),
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const mdx = htmlToMdx(html)
      onChange(mdx)
      setRawContent(mdx)
    },
  })

  useEffect(() => {
  if (!editor) return

  const current = htmlToMdx(editor.getHTML())

  if (content !== current) {
    editor.commands.setContent(mdxToHtml(content))
    setRawContent(content)
  }
}, [content, editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const url = window.prompt('URL:', editor.getAttributes('link').href)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50 flex-wrap">
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">H1</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</Btn>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><strong>B</strong></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><em>I</em></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><u>U</u></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline code">{'`c`'}</Btn>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">≡</Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered list">1.</Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">"</Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">```</Btn>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <Btn onClick={setLink} active={editor.isActive('link')} title="Add link">🔗</Btn>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setShowMdx(!showMdx)}
          className={`text-xs px-2.5 py-1 rounded font-mono transition-colors ${
            showMdx
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}
        >
          MDX
        </button>
      </div>

      {showMdx ? (
        <textarea
          value={rawContent}
          onChange={(e) => {
            setRawContent(e.target.value)
            onChange(e.target.value)
            editor.commands.setContent(mdxToHtml(e.target.value))
          }}
          className="w-full min-h-[400px] p-4 font-mono text-xs bg-gray-900 text-green-400 focus:outline-none resize-y"
          placeholder="Write HTML or MDX content here…"
          spellCheck={false}
        />
      ) : (
        <div className="p-4 prose min-h-[400px] cursor-text" onClick={() => editor.commands.focus()}>
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  )
}
