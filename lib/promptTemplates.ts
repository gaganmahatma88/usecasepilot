import type { PromptPage } from '@/lib/prompts'

const assistants = [
  {
    key: 'chatgpt' as const,
    label: 'ChatGPT',
    suffix: '-chatgpt',
    steps: [
      'Copy the prompt',
      'Paste it into ChatGPT at chat.openai.com',
      'Add your code or specific context',
      'Review the AI response and iterate',
    ],
  },
  {
    key: 'claude' as const,
    label: 'Claude',
    suffix: '-claude',
    steps: [
      'Copy the prompt',
      'Paste it into Claude at claude.ai',
      'Add your code or specific context',
      'Review the AI response and iterate',
    ],
  },
]

/**
 * Generates chatgpt/claude template variants for every software-engineers
 * prompt page in the provided base registry.
 * Returns a flat Record ready to be spread into the main prompts export.
 */
export function generateAssistantTemplates(
  basePrompts: Record<string, PromptPage>
): Record<string, PromptPage> {
  const result: Record<string, PromptPage> = {}

  const seBase = Object.values(basePrompts).filter(
    (p) => p.role === 'software-engineers' && !p.assistant
  )

  for (const base of seBase) {
    for (const assistant of assistants) {
      const slug = `${base.slug}${assistant.suffix}`
      result[slug] = {
        ...base,
        slug,
        title: `${base.title} with ${assistant.label}`,
        description: `${base.description} Optimised for use with ${assistant.label}.`,
        assistant: assistant.key,
      }
    }
  }

  return result
}

// Re-export the assistant config so the page component can use it without
// duplicating the steps data.
export const assistantConfig: Record<
  'chatgpt' | 'claude',
  { label: string; steps: string[] }
> = Object.fromEntries(
  assistants.map(({ key, label, steps }) => [key, { label, steps }])
) as Record<'chatgpt' | 'claude', { label: string; steps: string[] }>
