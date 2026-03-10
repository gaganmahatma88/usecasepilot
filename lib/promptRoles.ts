export interface PromptRole {
  slug: string
  title: string
  description: string
  body: string[]
}

export const promptRoles: Record<string, PromptRole> = {
  'software-engineers': {
    slug: 'software-engineers',
    title: 'AI Prompts for Software Engineers',
    description:
      'Discover practical AI prompts that help software engineers automate workflows like code review, bug triage, debugging, and documentation.',
    body: [
      'Software engineers can use AI prompts to automate repetitive tasks like code review, bug triage, debugging, and documentation generation. By providing structured context, AI assistants can surface issues faster than manual review.',
      'These prompts are designed to work with tools such as ChatGPT, Claude, or AI coding assistants like GitHub Copilot and Cursor.',
      'Use the prompt collections below to speed up common development workflows and reduce time spent on routine engineering tasks.',
    ],
  },
  'product-managers': {
    slug: 'product-managers',
    title: 'AI Prompts for Product Managers',
    description:
      'AI prompts that help product managers plan roadmaps, write better user stories, and run more efficient sprint planning sessions.',
    body: [
      'Product managers can use AI prompts to accelerate planning tasks like roadmap prioritisation, user story writing, and sprint planning. AI tools help synthesise customer feedback, identify patterns, and generate structured outputs faster.',
      'These prompts work well with tools like ChatGPT, Claude, Notion AI, and dedicated product management platforms.',
      'Browse the prompt collections below to streamline your product workflows and spend more time on decisions that matter.',
    ],
  },
  'marketing-managers': {
    slug: 'marketing-managers',
    title: 'AI Prompts for Marketing Teams',
    description:
      'AI prompts that help marketing teams generate high-converting copy, email campaigns, and social media content faster.',
    body: [
      'Marketing teams can use AI prompts to produce high-quality copy, email campaigns, and social media content in a fraction of the time. AI assistants are especially effective for generating multiple variations quickly.',
      'These prompts are compatible with tools like ChatGPT, Claude, Jasper, and HubSpot\'s AI writing features.',
      'Use the collections below to speed up your content creation and campaign workflows.',
    ],
  },
  'customer-support': {
    slug: 'customer-support',
    title: 'AI Prompts for Customer Support Teams',
    description:
      'AI prompts that help support teams draft replies faster, resolve tickets efficiently, and improve customer satisfaction.',
    body: [
      'Customer support teams can use AI prompts to draft faster replies, handle complex complaints, and maintain consistent tone across all interactions. AI tools reduce handle time while improving response quality.',
      'These prompts work with tools like ChatGPT, Claude, Intercom Fin, and Zendesk AI.',
      'Browse the collections below to improve reply speed and consistency across your support team.',
    ],
  },
}
