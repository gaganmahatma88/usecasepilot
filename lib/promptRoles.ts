export interface PromptRole {
  slug: string
  title: string
  description: string
}

export const promptRoles: Record<string, PromptRole> = {
  'software-engineers': {
    slug: 'software-engineers',
    title: 'AI Prompts for Software Engineers',
    description:
      'Discover practical AI prompts that help software engineers automate workflows like code review, bug triage, debugging, and documentation.',
  },
  'product-managers': {
    slug: 'product-managers',
    title: 'AI Prompts for Product Managers',
    description:
      'AI prompts that help product managers plan roadmaps, write better user stories, and run more efficient sprint planning sessions.',
  },
  'marketing-managers': {
    slug: 'marketing-managers',
    title: 'AI Prompts for Marketing Teams',
    description:
      'AI prompts that help marketing teams generate high-converting copy, email campaigns, and social media content faster.',
  },
  'customer-support': {
    slug: 'customer-support',
    title: 'AI Prompts for Customer Support Teams',
    description:
      'AI prompts that help support teams draft replies faster, resolve tickets efficiently, and improve customer satisfaction.',
  },
}
