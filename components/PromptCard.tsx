import { CopyPromptButton } from '@/components/CopyPromptButton'

interface Props {
  prompt: string
  index: number
}

export function PromptCard({ prompt, index }: Props) {
  const encoded = encodeURIComponent(prompt)
  const chatgptUrl = `https://chat.openai.com/?prompt=${encoded}`
  const claudeUrl = `https://claude.ai/new?q=${encoded}`

  return (
    <div className="prompt-block">
      {/* Header bar */}
      <div className="prompt-block-header">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(220_15%_22%)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(220_15%_22%)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(220_15%_22%)]" />
          </div>
          <span className="text-xs text-gray-500 font-mono">Prompt {index + 1}</span>
        </div>
        <CopyPromptButton text={prompt} variant="dark" />
      </div>

      {/* Prompt text */}
      <div className="px-5 py-4">
        <p className="text-sm text-[hsl(220_15%_82%)] leading-relaxed font-mono whitespace-pre-wrap">{prompt}</p>
      </div>

      {/* Footer actions */}
      <div className="prompt-block-footer">
        <a
          href={chatgptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[hsl(220_15%_22%)] bg-[hsl(220_15%_12%)] text-gray-400 hover:border-green-700/60 hover:text-green-400 hover:bg-green-950/40 transition-all"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-70">
            <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Open in ChatGPT
        </a>
        <a
          href={claudeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[hsl(220_15%_22%)] bg-[hsl(220_15%_12%)] text-gray-400 hover:border-orange-700/60 hover:text-orange-400 hover:bg-orange-950/40 transition-all"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-70">
            <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Open in Claude
        </a>
      </div>
    </div>
  )
}
