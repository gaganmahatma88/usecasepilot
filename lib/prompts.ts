import { generatedPrompts } from '@/lib/promptCategories'

export interface PromptPage {
  slug: string
  title: string
  description: string
  prompts: string[]
  relatedTools: string[]
  relatedUseCases: { label: string; href: string }[]
  role: string
}

const handwrittenPrompts: Record<string, PromptPage> = {
  'code-review': {
    slug: 'code-review',
    role: 'software-engineers',
    title: 'AI Prompts for Code Review',
    description:
      'Powerful AI prompts that help developers review code faster, detect bugs, and improve software quality.',
    prompts: [
      'Review this pull request and identify security vulnerabilities.',
      'Suggest performance optimizations for this function.',
      'Identify potential race conditions in this code.',
      'Refactor this function to improve readability.',
      'Explain this code block in simple terms.',
      'Write unit tests for this function.',
      'Identify edge cases not covered by tests.',
      'Suggest improvements to error handling.',
      'Analyze this code for memory inefficiencies.',
      'Recommend design pattern improvements.',
    ],
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    relatedUseCases: [
      {
        label: 'AI for Code Review — Full Workflow Guide',
        href: '/use-cases/software-engineers/ai-for-code-review',
      },
    ],
  },

  'bug-triage': {
    slug: 'bug-triage',
    role: 'software-engineers',
    title: 'AI Prompts for Bug Triage',
    description:
      'AI prompts to help engineering teams classify, prioritise, and resolve bugs faster.',
    prompts: [
      'Classify this bug report by severity: critical, high, medium, or low.',
      'Suggest the most likely root cause of this error based on the stack trace.',
      'Identify which component is responsible for this regression.',
      'Write a clear bug report from this raw user complaint.',
      'Suggest a minimal reproduction case for this reported issue.',
      'Prioritise these five bugs based on user impact and fix complexity.',
      'Explain this error message in plain language.',
      'List the steps needed to investigate and resolve this bug.',
      'Identify if this bug is a duplicate of an existing known issue.',
      'Draft a comment to request more information from the reporter.',
    ],
    relatedTools: ['linear', 'github-copilot', 'cursor'],
    relatedUseCases: [
      {
        label: 'AI for Bug Triage — Full Workflow Guide',
        href: '/use-cases/software-engineers/ai-for-bug-triage',
      },
    ],
  },

  'sprint-planning': {
    slug: 'sprint-planning',
    role: 'product-managers',
    title: 'AI Prompts for Sprint Planning',
    description:
      'AI prompts to help project managers run faster sprint planning sessions and write better user stories.',
    prompts: [
      'Break this feature request into development tasks with effort estimates.',
      'Write acceptance criteria for this user story.',
      'Identify dependencies between these sprint items.',
      'Summarise the key risks for this sprint.',
      'Suggest which tickets should be deferred based on team capacity.',
      'Draft a sprint goal based on these backlog items.',
      'Convert this bug report into a well-structured ticket.',
      'Estimate story points for this ticket based on its description.',
      'Identify blockers that could affect sprint completion.',
      'Generate a retrospective summary from these team notes.',
    ],
    relatedTools: ['clickup', 'asana', 'fireflies'],
    relatedUseCases: [
      {
        label: 'AI for Sprint Retrospective — Full Workflow Guide',
        href: '/use-cases/project-managers/ai-for-sprint-retrospective',
      },
    ],
  },

  'customer-support-replies': {
    slug: 'customer-support-replies',
    role: 'customer-support',
    title: 'AI Prompts for Customer Support Replies',
    description:
      'AI prompts to help support teams draft faster, higher-quality replies and resolve tickets more consistently.',
    prompts: [
      'Draft a polite reply to this frustrated customer complaint.',
      'Summarise this support ticket and suggest a resolution.',
      'Write an empathetic response for a billing dispute.',
      'Classify this ticket by category and urgency.',
      'Suggest three possible resolutions for this issue.',
      'Rewrite this response to be friendlier and more concise.',
      'Draft a follow-up message to check if the issue was resolved.',
      'Write an escalation summary for the engineering team.',
      'Generate a FAQ entry based on this common support question.',
      'Identify the root cause of this recurring customer complaint.',
    ],
    relatedTools: ['intercom', 'zendesk', 'freshdesk'],
    relatedUseCases: [
      {
        label: 'AI for Customer Support Automation — Full Workflow Guide',
        href: '/use-cases/customer-support/ai-for-customer-support-automation',
      },
    ],
  },

  'marketing-copy': {
    slug: 'marketing-copy',
    role: 'marketing-managers',
    title: 'AI Prompts for Marketing Copy',
    description:
      'AI prompts to help marketing teams write high-converting copy, email campaigns, and social media content faster.',
    prompts: [
      'Write a compelling headline for this product landing page.',
      'Generate five subject line variations for this email campaign.',
      'Rewrite this ad copy to be more conversion-focused.',
      'Create three social media captions for this product launch.',
      'Write a 150-word product description for this feature.',
      'Draft a call-to-action for a free trial sign-up page.',
      'Suggest improvements to increase click-through rate on this email.',
      'Write a customer testimonial prompt to send post-purchase.',
      'Create an A/B test variation for this landing page headline.',
      'Summarise this blog post into a LinkedIn post with a hook.',
    ],
    relatedTools: ['jasper', 'hubspot', 'buffer'],
    relatedUseCases: [
      {
        label: 'AI for Marketing Content Generation — Full Workflow Guide',
        href: '/use-cases/marketing-managers/ai-for-marketing-content-generation',
      },
    ],
  },

  'product-roadmap': {
    slug: 'product-roadmap',
    role: 'product-managers',
    title: 'AI Prompts for Product Roadmap Planning',
    description:
      'AI prompts to help product managers prioritise features, write roadmap narratives, and align stakeholders.',
    prompts: [
      'Prioritise these feature requests by user impact and strategic value.',
      'Write a one-paragraph roadmap narrative for Q3 based on these initiatives.',
      'Identify gaps in the current roadmap based on user feedback themes.',
      'Draft an executive summary of the product roadmap for a board presentation.',
      'Group these feature requests into themes for the next planning cycle.',
      'Suggest how to phase this large feature across three releases.',
      'Write a "Now, Next, Later" roadmap based on these backlog items.',
      'Identify which features align with the stated company OKRs.',
      'Summarise customer feedback into the top five product improvement areas.',
      'Draft a stakeholder update explaining a roadmap change and its rationale.',
    ],
    relatedTools: ['productboard', 'notion-ai', 'aha'],
    relatedUseCases: [
      {
        label: 'AI for Roadmap Planning — Full Workflow Guide',
        href: '/use-cases/product-managers/ai-for-roadmap-planning',
      },
    ],
  },
}

// Merge handwritten + generated. Handwritten entries take precedence on slug collision.
export const prompts: Record<string, PromptPage> = {
  ...generatedPrompts,
  ...handwrittenPrompts,
}
