import { CopyPromptButton } from '@/components/CopyPromptButton'

interface Props {
  prompt: string
  index: number
}

export function PromptCard({ prompt, index }: Props) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center mt-0.5">
        {index + 1}
      </span>
      <div className="flex flex-1 items-start justify-between gap-4 min-w-0">
        <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{prompt}&rdquo;</p>
        <CopyPromptButton text={prompt} />
      </div>
    </div>
  )
}
