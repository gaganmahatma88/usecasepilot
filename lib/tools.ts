export interface Tool {
  key: string
  name: string
  url: string
  description: string
  benefits?: string[]
}

export const tools: Record<string, Tool> = {
  // ── Security ────────────────────────────────────────────────────────────────
  snyk: {
    key: 'snyk',
    name: 'Snyk',
    url: 'https://snyk.io/?via=usecasepilot',
    description: 'AI-powered vulnerability scanning for developers.',
    benefits: [
      'Detect vulnerabilities automatically',
      'Integrates with GitHub and CI/CD',
      'Free developer plan available',
    ],
  },
  sonarqube: {
    key: 'sonarqube',
    name: 'SonarQube',
    url: 'https://www.sonarsource.com/products/sonarqube/',
    description: 'Automated code quality and security analysis platform.',
    benefits: [
      'Catch bugs and code smells early',
      'Supports 30+ programming languages',
      'Free Community Edition available',
    ],
  },
  checkmarx: {
    key: 'checkmarx',
    name: 'Checkmarx',
    url: 'https://checkmarx.com',
    description: 'Application security testing platform.',
    benefits: [
      'Static and dynamic application security testing',
      'Integrates into existing CI/CD pipelines',
      'Detailed remediation guidance per finding',
    ],
  },
  veracode: {
    key: 'veracode',
    name: 'Veracode',
    url: 'https://www.veracode.com',
    description: 'Cloud-based application security testing platform.',
  },
  'owasp-zap': {
    key: 'owasp-zap',
    name: 'OWASP ZAP',
    url: 'https://www.zaproxy.org',
    description: 'Open-source web application security scanner.',
  },

  // ── Software Engineering ─────────────────────────────────────────────────
  'github-copilot': {
    key: 'github-copilot',
    name: 'GitHub Copilot',
    url: 'https://github.com/features/copilot',
    description: 'AI pair programmer that suggests code completions in real time.',
    benefits: [
      'Autocompletes functions, tests, and boilerplate',
      'Understands context across your entire codebase',
      'Supports all major editors including VS Code and JetBrains',
    ],
  },
  cursor: {
    key: 'cursor',
    name: 'Cursor',
    url: 'https://cursor.com',
    description: 'AI-native code editor built for pair programming with LLMs.',
    benefits: [
      'Chat with your codebase to understand or refactor it',
      'Generate entire features from natural language prompts',
      'Drop-in replacement for VS Code — same extensions work',
    ],
  },
  tabnine: {
    key: 'tabnine',
    name: 'Tabnine',
    url: 'https://www.tabnine.com',
    description: 'Privacy-focused AI code assistant for teams.',
    benefits: [
      'Runs on-premise for full data privacy',
      'Learns from your team\'s coding patterns',
      'Integrates with all major IDEs',
    ],
  },
  linear: {
    key: 'linear',
    name: 'Linear',
    url: 'https://linear.app',
    description: 'Issue tracking and project planning tool built for engineering teams.',
    benefits: [
      'AI-generated issue summaries and sub-tasks',
      'Fast keyboard-driven interface',
      'Syncs with GitHub, Figma, and Slack',
    ],
  },

  // ── Product Management ──────────────────────────────────────────────────
  'notion-ai': {
    key: 'notion-ai',
    name: 'Notion AI',
    url: 'https://www.notion.so',
    description: 'All-in-one workspace with built-in AI for docs, wikis, and roadmaps.',
    benefits: [
      'Draft PRDs, meeting notes, and specs with AI',
      'Summarise long documents instantly',
      'Centralises all product knowledge in one place',
    ],
  },
  productboard: {
    key: 'productboard',
    name: 'Productboard',
    url: 'https://www.productboard.com',
    description: 'AI-powered product management platform for roadmapping and prioritisation.',
    benefits: [
      'Automatically categorises customer feedback',
      'Links features directly to strategic goals',
      'Shareable roadmaps for stakeholders',
    ],
  },
  mixpanel: {
    key: 'mixpanel',
    name: 'Mixpanel',
    url: 'https://mixpanel.com',
    description: 'Product analytics platform for understanding user behaviour.',
    benefits: [
      'Track feature adoption and conversion funnels',
      'AI-assisted anomaly detection in metrics',
      'Free plan available for early-stage products',
    ],
  },
  hotjar: {
    key: 'hotjar',
    name: 'Hotjar',
    url: 'https://www.hotjar.com',
    description: 'Heatmaps, session recordings, and user feedback for product teams.',
    benefits: [
      'See exactly where users click, scroll, and drop off',
      'Collect in-product surveys and feedback widgets',
      'AI summaries of open-text survey responses',
    ],
  },
  aha: {
    key: 'aha',
    name: 'Aha!',
    url: 'https://www.aha.io',
    description: 'Product strategy and roadmap planning platform.',
    benefits: [
      'Link initiatives to company goals and OKRs',
      'Prioritise features using built-in scoring models',
      'Publish visual roadmaps for any audience',
    ],
  },

  // ── Project Management ──────────────────────────────────────────────────
  asana: {
    key: 'asana',
    name: 'Asana',
    url: 'https://asana.com',
    description: 'AI-powered work management platform for cross-functional teams.',
    benefits: [
      'AI drafts project briefs and task descriptions',
      'Identifies at-risk tasks before they slip',
      'Timeline and workload views for capacity planning',
    ],
  },
  fireflies: {
    key: 'fireflies',
    name: 'Fireflies.ai',
    url: 'https://fireflies.ai',
    description: 'AI meeting assistant that records, transcribes, and summarises calls.',
    benefits: [
      'Auto-generates action items from every meeting',
      'Searchable meeting transcripts across your team',
      'Integrates with Zoom, Meet, and Teams',
    ],
  },
  clickup: {
    key: 'clickup',
    name: 'ClickUp',
    url: 'https://clickup.com',
    description: 'All-in-one project management platform with built-in AI.',
    benefits: [
      'AI writes project plans and status updates',
      'Customisable workflows for any team process',
      'Generous free tier for small teams',
    ],
  },
  motion: {
    key: 'motion',
    name: 'Motion',
    url: 'https://www.usemotion.com',
    description: 'AI scheduling assistant that automatically plans your workday.',
    benefits: [
      'Reschedules tasks automatically when priorities change',
      'Prevents over-booking by understanding real capacity',
      'Syncs with Google Calendar and project tasks',
    ],
  },
}

// Name → registry key for rehype tool-link rewriting
export const TOOL_NAME_TO_KEY: Record<string, string> = {
  'Snyk': 'snyk',
  'SonarQube': 'sonarqube',
  'Checkmarx': 'checkmarx',
  'Veracode': 'veracode',
  'OWASP ZAP': 'owasp-zap',
  'GitHub Copilot': 'github-copilot',
  'Cursor': 'cursor',
  'Tabnine': 'tabnine',
  'Linear': 'linear',
  'Notion AI': 'notion-ai',
  'Productboard': 'productboard',
  'Mixpanel': 'mixpanel',
  'Hotjar': 'hotjar',
  'Asana': 'asana',
  'Fireflies': 'fireflies',
  'ClickUp': 'clickup',
  'Motion': 'motion',
}

export function getToolForSlug(slug: string): Tool {
  if (slug.includes('security')) return tools.snyk
  if (slug.includes('code')) return tools.sonarqube
  return tools.snyk
}
