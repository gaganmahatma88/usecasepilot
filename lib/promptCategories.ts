import type { PromptPage } from '@/lib/prompts'

interface PromptCategory {
  slug: string
  title: string
  description: string
  role: string
  prompts: string[]
  relatedTools: string[]
  relatedUseCases: { label: string; href: string }[]
}

export function generatePromptsForCategory(category: PromptCategory): PromptPage {
  return {
    slug: category.slug,
    title: category.title,
    description: category.description,
    role: category.role,
    prompts: category.prompts,
    relatedTools: category.relatedTools,
    relatedUseCases: category.relatedUseCases,
  }
}

const categories: PromptCategory[] = [
  {
    slug: 'debugging',
    title: 'AI Prompts for Debugging',
    description:
      'Practical AI prompts to help software engineers identify root causes, trace errors, and resolve bugs faster.',
    role: 'software-engineers',
    prompts: [
      'Identify the root cause of this error based on the stack trace.',
      'Suggest debugging steps for this failing function.',
      'Explain what might cause this exception.',
      'Analyze this code to detect potential bugs.',
      'Suggest logging improvements for debugging.',
      'Explain why this API request might fail.',
      'Generate a minimal reproduction case for this bug.',
      'Suggest monitoring metrics to catch this issue earlier.',
      'Identify race conditions in this code snippet.',
      'Recommend debugging tools or techniques for this problem.',
    ],
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    relatedUseCases: [
      { label: 'AI for Bug Triage — Full Workflow Guide', href: '/use-cases/software-engineers/ai-for-bug-triage' },
    ],
  },
  {
    slug: 'refactoring',
    title: 'AI Prompts for Code Refactoring',
    description:
      'AI prompts to help engineers improve code quality, reduce complexity, and apply better design patterns.',
    role: 'software-engineers',
    prompts: [
      'Refactor this function to reduce complexity and improve readability.',
      'Identify code smells in this class and suggest improvements.',
      'Extract reusable logic from this function into a separate module.',
      'Suggest design patterns that would improve this code structure.',
      'Rename these variables and functions for better clarity.',
      'Break this large function into smaller, single-responsibility functions.',
      'Identify duplication in this codebase and suggest how to consolidate it.',
      'Convert this imperative code to a more functional style.',
      'Suggest how to reduce coupling between these modules.',
      'Review this refactored version for unintended behavior changes.',
    ],
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    relatedUseCases: [
      { label: 'AI for Code Review — Full Workflow Guide', href: '/use-cases/software-engineers/ai-for-code-review' },
    ],
  },
  {
    slug: 'unit-testing',
    title: 'AI Prompts for Unit Testing',
    description:
      'AI prompts to help developers write better tests, improve coverage, and identify untested edge cases.',
    role: 'software-engineers',
    prompts: [
      'Write unit tests for this function covering all edge cases.',
      'Identify which parts of this code are hardest to test and explain why.',
      'Suggest test cases for this API endpoint.',
      'Generate mock data for testing this function.',
      'Explain how to test this asynchronous function.',
      'Identify untested edge cases in this existing test suite.',
      'Write a parameterised test for this function with multiple input scenarios.',
      'Suggest how to improve test coverage for this module.',
      'Write a test to verify this error handling path.',
      'Identify flaky test patterns in this test suite and suggest fixes.',
    ],
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    relatedUseCases: [
      { label: 'AI for Code Review — Full Workflow Guide', href: '/use-cases/software-engineers/ai-for-code-review' },
    ],
  },
  {
    slug: 'api-design',
    title: 'AI Prompts for API Design',
    description:
      'AI prompts to help engineers design consistent, secure, and well-documented APIs.',
    role: 'software-engineers',
    prompts: [
      'Design a RESTful API for this feature based on the requirements.',
      'Review this API design for consistency and best practices.',
      'Suggest a pagination strategy for this API endpoint.',
      'Design error response formats for this API.',
      'Recommend an authentication approach for this API use case.',
      'Identify potential security vulnerabilities in this API design.',
      'Write an OpenAPI specification for this endpoint.',
      'Suggest a rate limiting strategy for this public API.',
      'Review this API versioning approach and suggest improvements.',
      'Design a webhook system for this integration use case.',
    ],
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    relatedUseCases: [
      { label: 'AI for Code Review — Full Workflow Guide', href: '/use-cases/software-engineers/ai-for-code-review' },
    ],
  },
  {
    slug: 'system-design',
    title: 'AI Prompts for System Design',
    description:
      'AI prompts to help engineers plan scalable architectures, identify bottlenecks, and make informed infrastructure decisions.',
    role: 'software-engineers',
    prompts: [
      'Design the high-level architecture for this system based on the requirements.',
      'Identify potential bottlenecks in this system design.',
      'Suggest a database schema for this use case.',
      'Design a caching strategy for this high-traffic service.',
      'Recommend a message queue approach for this async workflow.',
      'Identify single points of failure in this architecture.',
      'Design a data migration strategy for this schema change.',
      'Suggest horizontal scaling approaches for this service.',
      'Design an event-driven architecture for this workflow.',
      'Estimate capacity and infrastructure requirements for this system.',
    ],
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    relatedUseCases: [
      { label: 'AI for Code Review — Full Workflow Guide', href: '/use-cases/software-engineers/ai-for-code-review' },
    ],
  },
  {
    slug: 'log-analysis',
    title: 'AI Prompts for Log Analysis',
    description:
      'AI prompts to help engineers extract insights from logs, identify anomalies, and improve observability.',
    role: 'software-engineers',
    prompts: [
      'Identify patterns in these log entries that suggest a performance issue.',
      'Summarise the key errors from this log file.',
      'Identify the sequence of events leading to this failure in the logs.',
      'Suggest log levels and structured logging improvements for this service.',
      'Write a log query to find all failed requests in this time window.',
      'Identify anomalies in this log data that require investigation.',
      'Suggest alerting rules based on these log patterns.',
      'Explain what these warning-level log messages indicate.',
      'Design a logging strategy for this distributed service.',
      'Identify which log entries correlate with user-reported errors.',
    ],
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    relatedUseCases: [
      { label: 'AI for Bug Triage — Full Workflow Guide', href: '/use-cases/software-engineers/ai-for-bug-triage' },
    ],
  },
  {
    slug: 'sql-queries',
    title: 'AI Prompts for SQL Query Writing',
    description:
      'AI prompts to help engineers write, optimise, and debug SQL queries across relational databases.',
    role: 'software-engineers',
    prompts: [
      'Write a SQL query to fetch this data based on the requirements.',
      'Optimise this slow query and explain the performance improvements.',
      'Identify missing indexes for this query based on the execution plan.',
      'Rewrite this subquery using a JOIN for better performance.',
      'Write a query to aggregate this data by time period.',
      'Identify N+1 query problems in this ORM code.',
      'Write a migration script to add this column safely to a production table.',
      'Explain the difference in performance between these two queries.',
      'Design a query to detect duplicate records in this table.',
      'Write a window function query to calculate running totals for this dataset.',
    ],
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    relatedUseCases: [
      { label: 'AI for Code Review — Full Workflow Guide', href: '/use-cases/software-engineers/ai-for-code-review' },
    ],
  },
  {
    slug: 'documentation',
    title: 'AI Prompts for Technical Documentation',
    description:
      'AI prompts to help engineers write clear READMEs, docstrings, runbooks, and API documentation.',
    role: 'software-engineers',
    prompts: [
      'Write a README for this project based on the codebase.',
      'Document this function with a clear docstring including parameters and return values.',
      'Generate API documentation for this endpoint.',
      'Write an architecture decision record for this technical choice.',
      'Summarise this pull request into clear release notes.',
      'Write onboarding documentation for a new engineer joining this project.',
      'Create a runbook for this operational procedure.',
      'Document the edge cases handled by this function.',
      'Write a troubleshooting guide for this common error.',
      'Generate a changelog entry from these commit messages.',
    ],
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    relatedUseCases: [
      { label: 'AI for Code Review — Full Workflow Guide', href: '/use-cases/software-engineers/ai-for-code-review' },
    ],
  },

  // ── Product Managers ────────────────────────────────────────────────────────

  {
    slug: 'prd-writing',
    title: 'AI Prompts for Writing PRDs',
    description:
      'Prompts to help product managers write clear, structured product requirement documents that align engineering and design teams.',
    role: 'product-managers',
    prompts: [
      'Write a product requirements document for this feature based on the user story.',
      'Summarise the problem statement and success metrics for this PRD.',
      'List the functional and non-functional requirements for this feature.',
      'Write the out-of-scope section for this product requirements document.',
      'Draft the user personas and use cases section for this PRD.',
      'Define acceptance criteria for each requirement in this document.',
      'Write an executive summary for this PRD for a stakeholder audience.',
      'Identify missing requirements or ambiguities in this draft PRD.',
      'Rewrite this requirements section to be clearer and more specific.',
      'Generate a risks and dependencies section for this PRD.',
    ],
    relatedTools: ['notion-ai', 'productboard', 'aha'],
    relatedUseCases: [
      { label: 'AI for Roadmap Planning — Full Workflow Guide', href: '/use-cases/product-managers/ai-for-roadmap-planning' },
    ],
  },
  {
    slug: 'feature-prioritization',
    title: 'AI Prompts for Feature Prioritization',
    description:
      'Prompts to help product managers prioritise features using impact, effort, strategic alignment, and customer data.',
    role: 'product-managers',
    prompts: [
      'Score these features by user impact and implementation effort.',
      'Apply the RICE framework to prioritise this feature backlog.',
      'Identify which features align most closely with this quarter\'s OKRs.',
      'Summarise customer feedback themes to inform feature priority.',
      'Suggest which features to cut from the roadmap given capacity constraints.',
      'Rank these features by revenue potential and strategic value.',
      'Identify quick wins versus long-term investments in this feature list.',
      'Write a prioritisation rationale for deferring this feature request.',
      'Group these feature requests into themes for the next planning cycle.',
      'Recommend which features to validate with a prototype before full build.',
    ],
    relatedTools: ['productboard', 'notion-ai', 'aha'],
    relatedUseCases: [
      { label: 'AI for Roadmap Planning — Full Workflow Guide', href: '/use-cases/product-managers/ai-for-roadmap-planning' },
    ],
  },

  // ── Marketing Managers ──────────────────────────────────────────────────────

  {
    slug: 'seo-content',
    title: 'AI Prompts for SEO Content Writing',
    description:
      'Prompts to help marketing teams produce SEO-optimised blog posts, landing pages, and content strategies that rank.',
    role: 'marketing-managers',
    prompts: [
      'Write an SEO-optimised blog post outline for the keyword "{keyword}".',
      'Generate five title tag variations for this blog post under 60 characters.',
      'Write a meta description for this page under 155 characters.',
      'Identify semantic keywords to include in this article for better ranking.',
      'Rewrite this introduction to include the target keyword naturally.',
      'Create an internal linking strategy for these related blog posts.',
      'Write an FAQ section for this blog post based on common search queries.',
      'Suggest content gaps based on competitors ranking for this keyword.',
      'Write a compelling conclusion with a clear call to action for this post.',
      'Generate a content brief for a pillar page targeting this topic cluster.',
    ],
    relatedTools: ['jasper', 'semrush', 'hubspot'],
    relatedUseCases: [
      { label: 'AI for Marketing Content Generation — Full Workflow Guide', href: '/use-cases/marketing-managers/ai-for-marketing-content-generation' },
    ],
  },
  {
    slug: 'ad-copy',
    title: 'AI Prompts for Ad Copy',
    description:
      'Prompts for writing high-converting ad campaigns across search, social, and display channels.',
    role: 'marketing-managers',
    prompts: [
      'Write three Google Search ad headlines under 30 characters for this product.',
      'Generate a Facebook ad primary text for this offer targeting this audience.',
      'Write a LinkedIn ad copy for this B2B product aimed at senior managers.',
      'Create five ad copy variations to A/B test for this campaign.',
      'Write a retargeting ad for users who visited this page but did not convert.',
      'Rewrite this ad copy to emphasise urgency and scarcity.',
      'Generate display ad copy in three sizes: short, medium, and long.',
      'Write a YouTube pre-roll ad script under 30 seconds for this product.',
      'Create ad copy that addresses the top three objections for this offer.',
      'Write a benefit-focused ad headline and description for this feature.',
    ],
    relatedTools: ['jasper', 'hubspot', 'canva'],
    relatedUseCases: [
      { label: 'AI for Marketing Content Generation — Full Workflow Guide', href: '/use-cases/marketing-managers/ai-for-marketing-content-generation' },
    ],
  },

  // ── Customer Support ────────────────────────────────────────────────────────

  {
    slug: 'ticket-resolution',
    title: 'AI Prompts for Support Ticket Resolution',
    description:
      'Prompts to help support teams resolve tickets faster, draft clearer replies, and handle escalations consistently.',
    role: 'customer-support',
    prompts: [
      'Draft a resolution reply for this support ticket in a professional tone.',
      'Summarise this ticket thread and suggest the next best action.',
      'Classify this ticket by type, urgency, and affected product area.',
      'Write an empathetic response to this frustrated customer.',
      'Suggest three resolution options for this billing dispute.',
      'Draft an escalation summary to send to the engineering team.',
      'Rewrite this response to be shorter and more direct.',
      'Draft a follow-up message to confirm the issue has been resolved.',
      'Identify the root cause of this recurring complaint from the ticket history.',
      'Write a canned response template for this frequently asked question.',
    ],
    relatedTools: ['intercom', 'zendesk', 'freshdesk'],
    relatedUseCases: [
      { label: 'AI for Customer Support Automation — Full Workflow Guide', href: '/use-cases/customer-support/ai-for-customer-support-automation' },
    ],
  },
  {
    slug: 'faq-generation',
    title: 'AI Prompts for FAQ Creation',
    description:
      'Prompts to generate comprehensive FAQ documentation from support questions, tickets, and product knowledge.',
    role: 'customer-support',
    prompts: [
      'Generate a FAQ section for this product based on common support questions.',
      'Write a clear answer to this frequently asked question.',
      'Group these support questions into FAQ categories.',
      'Rewrite this FAQ answer to be simpler and easier to understand.',
      'Identify gaps in this existing FAQ based on recent ticket themes.',
      'Write a FAQ entry for this new product feature.',
      'Summarise this long support thread into a concise FAQ answer.',
      'Generate five related questions to add to this FAQ section.',
      'Write a troubleshooting FAQ for this common error message.',
      'Turn these support ticket resolutions into a structured FAQ document.',
    ],
    relatedTools: ['intercom', 'freshdesk', 'zendesk'],
    relatedUseCases: [
      { label: 'AI for Customer Support Automation — Full Workflow Guide', href: '/use-cases/customer-support/ai-for-customer-support-automation' },
    ],
  },
]

export const generatedPrompts: Record<string, PromptPage> = Object.fromEntries(
  categories.map((c) => [c.slug, generatePromptsForCategory(c)])
)
