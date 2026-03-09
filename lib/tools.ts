export interface Tool {
  key: string
  name: string
  url: string
  description: string
  benefits?: string[]
  bestFor?: string
  pricing?: 'Free' | 'Free Trial' | 'Paid'
}

export const tools: Record<string, Tool> = {
  // ── Security ────────────────────────────────────────────────────────────────
  snyk: {
    key: 'snyk',
    name: 'Snyk',
    url: 'https://snyk.io/?via=usecasepilot',
    description: 'AI-powered vulnerability scanning for developers.',
    bestFor: 'Vulnerability scanning',
    pricing: 'Free',
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
    bestFor: 'Code quality & security',
    pricing: 'Free',
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
    bestFor: 'AppSec testing',
    pricing: 'Paid',
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
    bestFor: 'Cloud AppSec',
    pricing: 'Paid',
  },
  'owasp-zap': {
    key: 'owasp-zap',
    name: 'OWASP ZAP',
    url: 'https://www.zaproxy.org',
    description: 'Open-source web application security scanner.',
    bestFor: 'Web app scanning',
    pricing: 'Free',
  },

  // ── Software Engineering ─────────────────────────────────────────────────
  'github-copilot': {
    key: 'github-copilot',
    name: 'GitHub Copilot',
    url: 'https://github.com/features/copilot',
    description: 'AI pair programmer that suggests code completions in real time.',
    bestFor: 'Code completion',
    pricing: 'Free Trial',
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
    bestFor: 'AI-native editing',
    pricing: 'Free',
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
    bestFor: 'Privacy-first teams',
    pricing: 'Free',
    benefits: [
      'Runs on-premise for full data privacy',
      "Learns from your team's coding patterns",
      'Integrates with all major IDEs',
    ],
  },
  linear: {
    key: 'linear',
    name: 'Linear',
    url: 'https://linear.app',
    description: 'Issue tracking and project planning tool built for engineering teams.',
    bestFor: 'Issue tracking',
    pricing: 'Free',
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
    bestFor: 'Docs & wikis',
    pricing: 'Paid',
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
    bestFor: 'Roadmapping',
    pricing: 'Free Trial',
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
    bestFor: 'Product analytics',
    pricing: 'Free',
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
    bestFor: 'User behaviour',
    pricing: 'Free',
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
    bestFor: 'Strategy & roadmaps',
    pricing: 'Free Trial',
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
    bestFor: 'Work management',
    pricing: 'Free',
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
    bestFor: 'Meeting notes',
    pricing: 'Free',
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
    bestFor: 'Project tracking',
    pricing: 'Free',
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
    bestFor: 'AI scheduling',
    pricing: 'Free Trial',
    benefits: [
      'Reschedules tasks automatically when priorities change',
      'Prevents over-booking by understanding real capacity',
      'Syncs with Google Calendar and project tasks',
    ],
  },

  // ── Marketing ────────────────────────────────────────────────────────────
  jasper: {
    key: 'jasper',
    name: 'Jasper',
    url: 'https://www.jasper.ai',
    description: 'AI writing platform for marketing copy, blogs, and campaigns.',
    bestFor: 'Marketing copy',
    pricing: 'Free Trial',
    benefits: [
      'Generate on-brand content at scale',
      'Built-in marketing frameworks and templates',
      'Supports 30+ languages',
    ],
  },
  semrush: {
    key: 'semrush',
    name: 'Semrush',
    url: 'https://www.semrush.com',
    description: 'All-in-one SEO and content marketing platform.',
    bestFor: 'SEO & content research',
    pricing: 'Free Trial',
    benefits: [
      'AI-powered keyword research and gap analysis',
      'Competitor traffic and strategy insights',
      'Content optimisation recommendations',
    ],
  },
  hubspot: {
    key: 'hubspot',
    name: 'HubSpot',
    url: 'https://www.hubspot.com',
    description: 'CRM and marketing automation platform with built-in AI.',
    bestFor: 'Marketing automation',
    pricing: 'Free',
    benefits: [
      'AI drafts email campaigns and landing pages',
      'Automated lead nurturing workflows',
      'Unified contact and analytics dashboard',
    ],
  },
  buffer: {
    key: 'buffer',
    name: 'Buffer',
    url: 'https://buffer.com',
    description: 'Social media scheduling and analytics tool with AI assistant.',
    bestFor: 'Social media',
    pricing: 'Free',
    benefits: [
      'AI suggests post ideas and captions',
      'Schedule across all major platforms',
      'Engagement analytics in one place',
    ],
  },
  canva: {
    key: 'canva',
    name: 'Canva',
    url: 'https://www.canva.com',
    description: 'AI-powered design platform for marketing visuals and presentations.',
    bestFor: 'Visual content',
    pricing: 'Free',
    benefits: [
      'AI generates images, backgrounds, and layouts',
      'Magic Write creates copy inside designs',
      'Brand kit keeps all assets consistent',
    ],
  },

  // ── Sales ────────────────────────────────────────────────────────────────
  apollo: {
    key: 'apollo',
    name: 'Apollo.io',
    url: 'https://www.apollo.io',
    description: 'AI-powered sales intelligence and outreach platform.',
    bestFor: 'Lead generation',
    pricing: 'Free',
    benefits: [
      'Database of 275M+ verified contacts',
      'AI writes personalised outreach sequences',
      'Enriches CRM data automatically',
    ],
  },
  gong: {
    key: 'gong',
    name: 'Gong',
    url: 'https://www.gong.io',
    description: 'Revenue intelligence platform that analyses every sales call.',
    bestFor: 'Sales call analysis',
    pricing: 'Paid',
    benefits: [
      'AI surfaces deal risks and next-step recommendations',
      'Analyses talk ratios and objection patterns',
      'Forecasting based on actual pipeline activity',
    ],
  },
  outreach: {
    key: 'outreach',
    name: 'Outreach',
    url: 'https://www.outreach.io',
    description: 'Sales execution platform with AI-driven sequences and coaching.',
    bestFor: 'Sales sequences',
    pricing: 'Paid',
    benefits: [
      'AI personalises outreach at scale',
      'Automated follow-up sequences with smart timing',
      'Real-time coaching during live calls',
    ],
  },
  clay: {
    key: 'clay',
    name: 'Clay',
    url: 'https://www.clay.com',
    description: 'AI-powered prospecting and lead enrichment tool.',
    bestFor: 'Lead enrichment',
    pricing: 'Free Trial',
    benefits: [
      'Enriches leads from 75+ data sources automatically',
      'AI writes hyper-personalised outreach messages',
      'Automates the entire prospecting workflow',
    ],
  },

  // ── Customer Support ─────────────────────────────────────────────────────
  intercom: {
    key: 'intercom',
    name: 'Intercom',
    url: 'https://www.intercom.com',
    description: 'AI-first customer service platform with Fin AI agent.',
    bestFor: 'AI support chat',
    pricing: 'Free Trial',
    benefits: [
      'Fin AI resolves up to 50% of queries automatically',
      'Seamless handoff to human agents when needed',
      'Unified inbox for all support channels',
    ],
  },
  zendesk: {
    key: 'zendesk',
    name: 'Zendesk',
    url: 'https://www.zendesk.com',
    description: 'AI-powered customer support and ticketing platform.',
    bestFor: 'Ticket management',
    pricing: 'Free Trial',
    benefits: [
      'AI auto-classifies and routes incoming tickets',
      'Suggests responses based on resolved tickets',
      'Advanced reporting on CSAT and resolution times',
    ],
  },
  freshdesk: {
    key: 'freshdesk',
    name: 'Freshdesk',
    url: 'https://www.freshdesk.com',
    description: 'Cloud-based helpdesk with AI automation for support teams.',
    bestFor: 'Helpdesk automation',
    pricing: 'Free',
    benefits: [
      'AI Freddy suggests answers from your knowledge base',
      'Auto-assigns tickets by topic and priority',
      'Free plan supports unlimited agents',
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
  'Jasper': 'jasper',
  'Semrush': 'semrush',
  'HubSpot': 'hubspot',
  'Buffer': 'buffer',
  'Canva': 'canva',
  'Apollo': 'apollo',
  'Gong': 'gong',
  'Outreach': 'outreach',
  'Clay': 'clay',
  'Intercom': 'intercom',
  'Zendesk': 'zendesk',
  'Freshdesk': 'freshdesk',
}

export function getToolForSlug(slug: string): Tool {
  if (slug.includes('security')) return tools.snyk
  if (slug.includes('code')) return tools.sonarqube
  return tools.snyk
}
