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
    <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center mt-0.5">
        {index + 1}
      </span>
      <div className="flex flex-1 flex-col gap-3 min-w-0">
        <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{prompt}&rdquo;</p>
        <div className="flex flex-wrap gap-2">
          <CopyPromptButton text={prompt} />
          <a
            href={chatgptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-green-300 hover:text-green-700 transition-colors"
          >
            Open in ChatGPT
          </a>
          <a
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-orange-300 hover:text-orange-700 transition-colors"
          >
            Open in Claude
          </a>
        </div>
      </div>
    </div>
  )
}
