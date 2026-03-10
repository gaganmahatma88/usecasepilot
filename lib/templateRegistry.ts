import type { TemplatePage } from '@/lib/templatePages'
import { templatePages } from '@/lib/templatePages'

export interface TemplateEntry {
  slug: string
  title: string
  technology: string
  task: 'debugging' | 'refactoring' | 'testing' | 'optimization'
}

export const templateRegistry: TemplateEntry[] = [
  { slug: 'chatgpt-debug-javascript',   title: 'Debugging JavaScript',   technology: 'JavaScript',   task: 'debugging' },
  { slug: 'chatgpt-debug-react',        title: 'Debugging React',        technology: 'React',        task: 'debugging' },
  { slug: 'chatgpt-debug-node',         title: 'Debugging Node.js',      technology: 'Node.js',      task: 'debugging' },
  { slug: 'chatgpt-debug-sql',          title: 'Debugging SQL',          technology: 'SQL',          task: 'debugging' },
  { slug: 'chatgpt-refactor-python',    title: 'Refactoring Python',     technology: 'Python',       task: 'refactoring' },
  { slug: 'chatgpt-refactor-react',     title: 'Refactoring React',      technology: 'React',        task: 'refactoring' },
  { slug: 'chatgpt-refactor-typescript',title: 'Refactoring TypeScript', technology: 'TypeScript',   task: 'refactoring' },
  { slug: 'chatgpt-test-python',        title: 'Writing Python Tests',   technology: 'Python',       task: 'testing' },
  { slug: 'chatgpt-test-javascript',    title: 'Writing JavaScript Tests',technology: 'JavaScript',  task: 'testing' },
  { slug: 'chatgpt-test-react',         title: 'Writing React Tests',    technology: 'React',        task: 'testing' },
  { slug: 'chatgpt-test-typescript',    title: 'Writing TypeScript Tests',technology: 'TypeScript',  task: 'testing' },
  { slug: 'chatgpt-optimize-python',    title: 'Optimizing Python Code', technology: 'Python',       task: 'optimization' },
  { slug: 'chatgpt-optimize-javascript',title: 'Optimizing JavaScript',  technology: 'JavaScript',   task: 'optimization' },
  { slug: 'chatgpt-optimize-react',     title: 'Optimizing React',       technology: 'React',        task: 'optimization' },
  { slug: 'chatgpt-optimize-node',      title: 'Optimizing Node.js',     technology: 'Node.js',      task: 'optimization' },
]

// ─── Task-specific generators ──────────────────────────────────────────────────

function generateDebuggingPage(entry: TemplateEntry): TemplatePage {
  const { slug, technology } = entry
  const isSql = technology === 'SQL'
  const isReact = technology === 'React'

  const promptTemplate = isSql
    ? `You are a senior database engineer.\n\nAnalyze the following ${technology} query or stored procedure and identify the bug.\n\nExplain the root cause clearly, then provide a corrected version with comments describing what was changed and why.\n\nDatabase type: [e.g. PostgreSQL, MySQL, SQL Server]\n\nCode:\n[PASTE CODE HERE]`
    : `You are a senior ${technology} engineer.\n\nAnalyze the following ${technology} code and identify the bug.\n\nExplain the root cause clearly, then provide a corrected version of the code with inline comments describing what was changed and why.\n\nCode:\n[PASTE CODE HERE]`

  const exampleInput = isReact
    ? `import { useState, useEffect } from 'react'\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0)\n\n  useEffect(() => {\n    setInterval(() => setSeconds(s => s + 1), 1000)\n  }, [])\n\n  return <div>{seconds}s</div>\n}`
    : isSql
    ? `SELECT u.name, COUNT(o.id) as order_count\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.user_id\nWHERE o.status = 'completed'\nGROUP BY u.name;`
    : technology === 'Node.js'
    ? `const fs = require('fs')\n\nfunction readConfig(path) {\n  const data = fs.readFileSync(path)\n  return JSON.parse(data)\n}\n\nconst config = readConfig('./config.json')\nconsole.log(config.port)`
    : `function fetchUser(id) {\n  fetch('/api/users/' + id)\n    .then(res => res.json)\n    .then(data => console.log(data))\n    .catch(err => console.error(err))\n}\n\nfetchUser(42)`

  const expectedOutput = isReact
    ? `The AI will identify the missing cleanup for the interval (causing a memory leak and double-counting in Strict Mode), explain the Rules of Effects, and return a corrected useEffect with a clearInterval cleanup function.`
    : isSql
    ? `The AI will identify the incorrect JOIN column (user_id vs id) and the WHERE clause that turns the LEFT JOIN into an inner join, explain the issue, and return a corrected query that correctly counts orders per user including those with none.`
    : technology === 'Node.js'
    ? `The AI will spot that \`.json\` is a property reference rather than a method call (\`.json()\`) and that readFileSync without an encoding returns a Buffer. It will return a corrected function with proper encoding and error handling.`
    : `The AI will spot that \`res.json\` is missing parentheses (should be \`res.json()\`), explain that this passes the method reference instead of calling it, and return a corrected fetch chain.`

  return {
    slug,
    seoTitle: `ChatGPT Prompt for Debugging ${technology} Code | UseCasePilot`,
    seoDescription: `Use this ChatGPT prompt template to debug ${technology} code faster. Copy the prompt, paste it into ChatGPT, and get a clear explanation of the bug plus a corrected version.`,
    heading: `ChatGPT Prompt for Debugging ${technology} Code`,
    promptTemplate,
    howToUse: [
      'Copy the prompt template above.',
      'Paste it into ChatGPT at chat.openai.com.',
      'Replace [PASTE CODE HERE] with your actual code.',
      'Include the error message or unexpected output if you have one.',
      'Review the AI explanation and corrected code.',
    ],
    whenToUse: [
      `You have a ${technology} function or query that throws an unexpected error.`,
      'Your code produces incorrect output and you cannot identify why.',
      'You need a second opinion on failing logic or a broken test.',
      'You want to understand a bug fully before fixing it yourself.',
    ],
    exampleInput,
    expectedOutput,
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    faqs: [
      {
        question: `Can ChatGPT debug ${technology} code?`,
        answer: `Yes. ChatGPT can analyze ${technology} code, identify bugs, explain the root cause, and suggest corrected versions. Results are best when you provide the error message, stack trace, and the relevant code snippet.`,
      },
      {
        question: `What ${technology} errors can AI help debug?`,
        answer: `AI assistants can help with syntax errors, logic bugs, runtime exceptions, type errors, off-by-one errors, and incorrect algorithm implementations. They are especially useful for explaining unfamiliar error messages.`,
      },
      {
        question: `Should I trust AI-generated ${technology} fixes?`,
        answer: `AI-generated fixes should always be reviewed and tested before use. The AI may misunderstand context or edge cases, so treat its output as a starting point rather than a final solution.`,
      },
      {
        question: `What context should I include when debugging ${technology} with ChatGPT?`,
        answer: `Include the full error message or stack trace, the relevant code block, and a description of what the code is supposed to do. More context leads to more accurate suggestions.`,
      },
    ],
  }
}

function generateRefactoringPage(entry: TemplateEntry): TemplatePage {
  const { slug, technology } = entry
  const isReact = technology === 'React'

  const promptTemplate = isReact
    ? `You are a senior React engineer.\n\nRefactor the following React component to improve:\n1. Readability and clarity.\n2. Component structure and separation of concerns.\n3. Performance using React best practices (memoisation, correct hook usage).\n4. Adherence to modern React patterns.\n\nFor each change, add a brief inline comment explaining why the change was made.\n\nComponent:\n[PASTE COMPONENT HERE]`
    : `You are a senior ${technology} engineer.\n\nRefactor the following ${technology} code to improve:\n1. Readability and clarity.\n2. Maintainability and structure.\n3. Performance where applicable.\n4. Adherence to modern ${technology} best practices.\n\nFor each change, add a brief inline comment explaining why the change was made.\n\nCode:\n[PASTE CODE HERE]`

  const placeholder = isReact ? '[PASTE COMPONENT HERE]' : '[PASTE CODE HERE]'

  const exampleInput = isReact
    ? `function UserList(props) {\n  var users = props.users\n  var output = []\n  for (var i = 0; i < users.length; i++) {\n    if (users[i].active == true) {\n      output.push(<div key={users[i].id}>{users[i].name}</div>)\n    }\n  }\n  return <div>{output}</div>\n}`
    : technology === 'Python'
    ? `def get_active_users(users):\n    result = []\n    for i in range(len(users)):\n        u = users[i]\n        if u['active'] == True:\n            result.append({'id': u['id'], 'name': u['name']})\n    return result`
    : `function getActiveUsers(users) {\n  var result = [];\n  for (var i = 0; i < users.length; i++) {\n    if (users[i].active == true) {\n      result.push({ id: users[i].id, name: users[i].name });\n    }\n  }\n  return result;\n}`

  return {
    slug,
    seoTitle: `ChatGPT Prompt for Refactoring ${technology} Code | UseCasePilot`,
    seoDescription: `Use this ChatGPT prompt to refactor ${technology} code. Copy the template, paste your code, and get a cleaner, more maintainable version with an explanation of each change.`,
    heading: `ChatGPT Prompt for Refactoring ${technology} Code`,
    promptTemplate,
    howToUse: [
      'Copy the prompt template above.',
      'Paste it into ChatGPT at chat.openai.com.',
      `Replace ${placeholder} with the ${technology} code you want to refactor.`,
      'Optionally specify constraints, e.g. "do not change the function signature".',
      'Review the refactored version and the explanation of each change.',
    ],
    whenToUse: [
      `You have legacy ${technology} code that is hard to maintain.`,
      'A code review flagged readability or complexity issues.',
      `You want to modernise ${technology} code to use current best practices.`,
      'You are onboarding to a codebase and need to understand it better.',
    ],
    exampleInput,
    expectedOutput: `The AI will rewrite the code using modern ${technology} idioms, improve variable naming, reduce complexity, and add comments explaining each change.`,
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    faqs: [
      {
        question: `Can ChatGPT refactor ${technology} code?`,
        answer: `Yes. ChatGPT can refactor ${technology} code to use modern patterns, improve variable naming, reduce complexity, and apply cleaner idioms. It works well for both small functions and larger modules.`,
      },
      {
        question: `What ${technology} improvements does AI typically suggest?`,
        answer: `Common improvements include adopting modern language features, improving naming conventions, removing unnecessary nesting, simplifying loops with higher-order functions, and applying consistent structure.`,
      },
      {
        question: 'Will AI refactoring change the behaviour of my code?',
        answer: `AI aims to produce functionally equivalent refactored code, but subtle behaviour differences can occur — especially around edge cases or type coercion. Always run your test suite after applying AI-suggested refactors.`,
      },
      {
        question: `Is this prompt suitable for large ${technology} files?`,
        answer: `For large files, paste only the function or module you want to refactor rather than the entire file. This gives ChatGPT a focused context and produces more targeted suggestions.`,
      },
    ],
  }
}

function generateTestingPage(entry: TemplateEntry): TemplatePage {
  const { slug, technology } = entry
  const isReact = technology === 'React'
  const isTs = technology === 'TypeScript'

  const framework = isReact ? 'Jest + React Testing Library' : isTs ? 'Jest / Vitest' : technology === 'Python' ? 'Pytest' : 'Jest'
  const frameworkNote = isReact
    ? 'Jest and React Testing Library'
    : technology === 'Python'
    ? 'Pytest'
    : 'Jest or Vitest'

  const promptTemplate = `You are a senior software engineer specialising in test-driven development.\n\nWrite a comprehensive unit test suite for the following ${technology} ${isReact ? 'component' : 'function'}.\n\nInclude:\n1. Tests for the happy path (expected inputs and outputs).\n2. Tests for edge cases and boundary conditions.\n3. Tests for error and exception handling.\n${isReact ? '4. Tests for user interactions and rendered output.\n' : ''}${isTs ? '4. Type-safe test assertions.\n' : ''}5. Clear test names that describe what each test verifies.\n\nTesting framework: ${framework}\n\n${isReact ? 'Component' : 'Function'} to test:\n[PASTE ${isReact ? 'COMPONENT' : 'FUNCTION'} HERE]`

  const exampleInput = isReact
    ? `function Toggle({ label }: { label: string }) {\n  const [on, setOn] = React.useState(false)\n  return (\n    <button onClick={() => setOn(!on)}>\n      {label}: {on ? 'ON' : 'OFF'}\n    </button>\n  )\n}`
    : isTs
    ? `function clamp(value: number, min: number, max: number): number {\n  if (min > max) throw new Error('min must be <= max')\n  return Math.min(Math.max(value, min), max)\n}`
    : technology === 'Python'
    ? `def clamp(value, min_val, max_val):\n    if min_val > max_val:\n        raise ValueError('min_val must be <= max_val')\n    return max(min_val, min(value, max_val))`
    : `function clamp(value, min, max) {\n  if (min > max) throw new Error('min must be <= max')\n  return Math.min(Math.max(value, min), max)\n}`

  return {
    slug,
    seoTitle: `ChatGPT Prompt for Writing ${technology} Tests | UseCasePilot`,
    seoDescription: `Use this ChatGPT prompt to generate ${technology} unit tests. Copy the template, paste your ${isReact ? 'component' : 'function'}, and get a complete test suite covering edge cases and error conditions.`,
    heading: `ChatGPT Prompt for Writing ${technology} Tests`,
    promptTemplate,
    howToUse: [
      'Copy the prompt template above.',
      'Paste it into ChatGPT at chat.openai.com.',
      `Specify your preferred testing framework (${frameworkNote}).`,
      `Replace the placeholder with the ${technology} ${isReact ? 'component' : 'function'} you want to test.`,
      'Review the generated tests, run them, and adjust as needed.',
    ],
    whenToUse: [
      `You need to add tests to an existing ${technology} ${isReact ? 'component' : 'function'} quickly.`,
      'You want to ensure edge cases are covered before a release.',
      'You are practising TDD and want to see what tests should look like.',
      'A code review requires test coverage before merging.',
    ],
    exampleInput,
    expectedOutput: `The AI will generate a ${frameworkNote} test suite covering: the happy path, boundary values, error conditions, and${isReact ? ' user interactions and DOM output' : ' invalid input handling'}. Each test will have a descriptive name.`,
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    faqs: [
      {
        question: `Can ChatGPT write ${technology} unit tests?`,
        answer: `Yes. ChatGPT can generate ${technology} tests using ${frameworkNote}. It covers happy paths, edge cases, and error conditions when given a clear ${isReact ? 'component' : 'function'} to test.`,
      },
      {
        question: `What testing frameworks does ChatGPT support for ${technology}?`,
        answer: `ChatGPT is familiar with ${frameworkNote} and several other frameworks. Specify your framework in the prompt to get correctly formatted test code.`,
      },
      {
        question: 'How good are AI-generated unit tests?',
        answer: `AI-generated tests are a strong starting point and often catch edge cases developers miss. However, they should be reviewed for correctness and supplemented with tests for business logic that the AI cannot infer from code alone.`,
      },
      {
        question: 'Can I use this prompt for integration tests as well?',
        answer: `The prompt is optimised for unit tests. For integration tests, modify it to ask specifically for integration or end-to-end tests, and include information about external dependencies such as databases or APIs.`,
      },
    ],
  }
}

function generateOptimizationPage(entry: TemplateEntry): TemplatePage {
  const { slug, technology } = entry
  const isReact = technology === 'React'
  const isSql = technology === 'SQL'
  const isNode = technology === 'Node.js'

  const focusAreas = isReact
    ? '1. Unnecessary re-renders and missing memoisation.\n2. Expensive calculations that should be memoised with useMemo.\n3. Callback stability with useCallback.\n4. Bundle size and code-splitting opportunities.'
    : isSql
    ? '1. Missing or inefficient indexes.\n2. Slow JOIN strategies or subquery patterns.\n3. Unnecessary full-table scans.\n4. Query rewrites that reduce I/O.'
    : isNode
    ? '1. Blocking synchronous operations that should be async.\n2. Unnecessary sequential awaits that can run in parallel.\n3. Memory leaks or excessive allocations.\n4. Inefficient data transformations.'
    : '1. Algorithmic inefficiencies (O(n²) loops, repeated lookups).\n2. Unnecessary work inside loops or hot paths.\n3. Memory allocations that can be avoided.\n4. Opportunities to use built-in optimised methods.'

  const exampleInput = isReact
    ? `function ProductList({ products, search }) {\n  const filtered = products.filter(p =>\n    p.name.toLowerCase().includes(search.toLowerCase())\n  )\n  return (\n    <ul>\n      {filtered.map(p => (\n        <ProductRow key={p.id} product={p} onClick={() => addToCart(p)} />\n      ))}\n    </ul>\n  )\n}`
    : isSql
    ? `SELECT p.name, SUM(oi.quantity) as units_sold\nFROM products p\nJOIN order_items oi ON oi.product_id = p.id\nJOIN orders o ON o.id = oi.order_id\nWHERE o.status = 'completed'\n  AND YEAR(o.created_at) = 2024\nGROUP BY p.name\nORDER BY units_sold DESC;`
    : isNode
    ? `async function buildReport(userIds) {\n  const report = []\n  for (const id of userIds) {\n    const user = await db.users.findById(id)\n    const orders = await db.orders.findByUser(id)\n    report.push({ user, orders })\n  }\n  return report\n}`
    : `function findDuplicates(arr) {\n  const duplicates = []\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {\n        duplicates.push(arr[i])\n      }\n    }\n  }\n  return duplicates\n}`

  const expectedOutput = isReact
    ? `The AI will identify the missing useMemo for the filtered list (recalculated on every render), the unstable onClick callback causing ProductRow re-renders, and suggest wrapping with useMemo and useCallback, and adding React.memo to ProductRow.`
    : isSql
    ? `The AI will identify the YEAR() function preventing index use on created_at, suggest a range-based date filter instead, recommend indexes on orders.status and orders.created_at, and return an optimised query with notes on each improvement.`
    : isNode
    ? `The AI will identify the sequential await pattern inside a loop causing N round-trips, suggest replacing it with Promise.all and parallel fetching, and return a refactored version that fetches all users and orders concurrently.`
    : `The AI will identify the O(n²) nested loop and the includes() check adding another O(n) pass, suggest replacing the approach with a Set for O(n) overall complexity, and return an optimised version with comments explaining the improvement.`

  return {
    slug,
    seoTitle: `ChatGPT Prompt for Optimizing ${technology} Code | UseCasePilot`,
    seoDescription: `Use this ChatGPT prompt to optimize ${technology} code for performance. Copy the template, paste your code, and get an optimized version with an explanation of each improvement.`,
    heading: `ChatGPT Prompt for Optimizing ${technology} Code`,
    promptTemplate: `You are a senior ${isSql ? 'database' : technology} engineer specialising in performance optimization.\n\nAnalyze the following ${technology} ${isSql ? 'query' : 'code'} for performance issues.\n\nProvide:\n${focusAreas}\n\nFor each suggestion, explain the expected performance impact.\n\n${isSql ? 'Database type: [e.g. PostgreSQL, MySQL, SQL Server]\n\nQuery' : 'Code'}:\n[PASTE ${isSql ? 'QUERY' : 'CODE'} HERE]`,
    howToUse: [
      'Copy the prompt template above.',
      'Paste it into ChatGPT at chat.openai.com.',
      `Replace [PASTE ${isSql ? 'QUERY' : 'CODE'} HERE] with the ${technology} ${isSql ? 'query' : 'code'} you want to optimize.`,
      isSql
        ? 'Optionally include your EXPLAIN output for more targeted advice.'
        : 'Optionally describe the scale of data or the performance target you need to hit.',
      'Review each suggestion and apply the ones relevant to your context.',
    ],
    whenToUse: [
      `Your ${technology} ${isSql ? 'query' : 'code'} is running slower than expected.`,
      'Profiling shows a hot path that needs improvement.',
      'You are scaling up and need to handle larger data volumes.',
      'A performance review flagged inefficient patterns in your code.',
    ],
    exampleInput,
    expectedOutput,
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    faqs: [
      {
        question: `Can ChatGPT optimize ${technology} code?`,
        answer: `Yes. ChatGPT can identify performance bottlenecks in ${technology} ${isSql ? 'queries' : 'code'}, suggest algorithmic improvements, and return an optimised version with explanations. For best results, provide context about your data volume and performance goals.`,
      },
      {
        question: `What ${technology} performance issues can AI identify?`,
        answer: isReact
          ? `AI can spot unnecessary re-renders, missing memoisation, unstable callbacks, expensive inline computations, and components that should be split for better rendering performance.`
          : isSql
          ? `AI can identify missing indexes, inefficient JOIN strategies, functions in WHERE clauses that prevent index use, subqueries that can be rewritten as JOINs, and poor GROUP BY or ORDER BY patterns.`
          : `AI can identify algorithmic inefficiencies, redundant loops, unnecessary memory allocations, blocking I/O in async code, and opportunities to use more efficient built-in methods.`,
      },
      {
        question: `Should I apply AI-suggested ${technology} optimisations directly to production?`,
        answer: `No. Always benchmark optimisations in a staging environment and measure the actual improvement before applying changes to production. Some suggestions may not apply to your specific data distribution or access patterns.`,
      },
      {
        question: `What context helps ChatGPT give better ${technology} optimization advice?`,
        answer: `Include the scale of your data (record counts, call frequency), any profiling output or slow query logs, and the performance target you need to achieve. This helps the AI prioritise the most impactful changes.`,
      },
    ],
  }
}

// ─── Generator dispatch ────────────────────────────────────────────────────────

function generateTemplatePage(entry: TemplateEntry): TemplatePage {
  switch (entry.task) {
    case 'debugging':    return generateDebuggingPage(entry)
    case 'refactoring':  return generateRefactoringPage(entry)
    case 'testing':      return generateTestingPage(entry)
    case 'optimization': return generateOptimizationPage(entry)
  }
}

// ─── Merged export (handwritten wins on collision) ─────────────────────────────

const generatedTemplatePages: Record<string, TemplatePage> = Object.fromEntries(
  templateRegistry.map((entry) => [entry.slug, generateTemplatePage(entry)])
)

export const allTemplatePages: Record<string, TemplatePage> = {
  ...generatedTemplatePages,
  ...templatePages,
}
