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
]

export const generatedPrompts: Record<string, PromptPage> = Object.fromEntries(
  categories.map((c) => [c.slug, generatePromptsForCategory(c)])
)
