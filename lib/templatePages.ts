export interface TemplatePage {
  slug: string
  seoTitle: string
  seoDescription: string
  heading: string
  promptTemplate: string
  howToUse: string[]
  whenToUse: string[]
  exampleInput: string
  expectedOutput: string
  relatedTools: string[]
  faqs: { question: string; answer: string }[]
}

export const templatePages: Record<string, TemplatePage> = {
  'chatgpt-debug-python': {
    slug: 'chatgpt-debug-python',
    seoTitle: 'ChatGPT Prompt for Debugging Python Code | UseCasePilot',
    seoDescription:
      'Use this ChatGPT prompt template to debug Python code faster. Copy the prompt and paste it into ChatGPT to analyze errors, identify bugs, and get corrected code.',
    heading: 'ChatGPT Prompt for Debugging Python Code',
    promptTemplate: `You are a senior Python engineer.

Analyze the following Python code and identify the bug.

Explain the root cause clearly, then provide a corrected version of the code with inline comments describing what was changed and why.

Code:
[PASTE CODE HERE]`,
    howToUse: [
      'Copy the prompt template above.',
      'Paste it into ChatGPT at chat.openai.com.',
      'Replace [PASTE CODE HERE] with your actual Python code.',
      'Include the error message or unexpected output if you have one.',
      'Review the AI explanation and corrected code.',
    ],
    whenToUse: [
      'You have a Python function that throws an unexpected exception.',
      'Your script produces incorrect output and you cannot identify why.',
      'You need a second opinion on a failing test or broken logic.',
      'You want to understand a bug before fixing it yourself.',
    ],
    exampleInput: `def calculate_average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)

result = calculate_average([])
print(result)`,
    expectedOutput:
      'The AI will identify the ZeroDivisionError caused by calling the function with an empty list, explain why it fails, and provide a corrected version with a guard clause and clear comments.',
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    faqs: [
      {
        question: 'Can ChatGPT debug Python code?',
        answer:
          'Yes. ChatGPT can analyze Python code, identify bugs, explain the root cause, and suggest corrected versions. Results are best when you provide the error message, stack trace, and relevant code snippet.',
      },
      {
        question: 'What Python errors can AI help debug?',
        answer:
          'AI assistants can help with syntax errors, logic bugs, runtime exceptions, type errors, off-by-one errors, and incorrect algorithm implementations. They are especially useful for explaining unfamiliar error messages.',
      },
      {
        question: 'Should I trust AI-generated Python fixes?',
        answer:
          'AI-generated fixes should always be reviewed and tested before use. The AI may misunderstand context or edge cases, so treat its output as a starting point rather than a final solution.',
      },
      {
        question: 'What context should I include when debugging with ChatGPT?',
        answer:
          'Include the full error message or stack trace, the relevant code block, the Python version if relevant, and a description of what the code is supposed to do. More context leads to more accurate suggestions.',
      },
    ],
  },

  'chatgpt-fix-react-error': {
    slug: 'chatgpt-fix-react-error',
    seoTitle: 'ChatGPT Prompt for Fixing React Errors | UseCasePilot',
    seoDescription:
      'Use this ChatGPT prompt to fix React errors faster. Copy the template, paste your component and error message, and get a corrected version with an explanation.',
    heading: 'ChatGPT Prompt for Fixing React Errors',
    promptTemplate: `You are a senior React developer.

The following React component is producing an error or unexpected behavior.

Analyze the code, identify the issue, and provide:
1. A clear explanation of what is causing the problem.
2. A corrected version of the component with comments explaining the changes.

Error message (if available):
[PASTE ERROR HERE]

Component code:
[PASTE COMPONENT HERE]`,
    howToUse: [
      'Copy the prompt template above.',
      'Paste it into ChatGPT at chat.openai.com.',
      'Replace [PASTE ERROR HERE] with your browser console error.',
      'Replace [PASTE COMPONENT HERE] with your React component code.',
      'Review the explanation and apply the suggested fix.',
    ],
    whenToUse: [
      'Your React component throws a runtime error in the browser.',
      'A hook is producing an unexpected value or infinite loop.',
      'Your component renders incorrectly or not at all.',
      'You see a React-specific warning like missing key props or invalid hook calls.',
    ],
    exampleInput: `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  if (count > 0) {
    const [doubled, setDoubled] = useState(count * 2)
  }

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`,
    expectedOutput:
      'The AI will identify the invalid hook call inside a conditional block, explain the Rules of Hooks, and provide a corrected component that moves the hook call to the top level.',
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    faqs: [
      {
        question: 'Can ChatGPT fix React errors?',
        answer:
          'Yes. ChatGPT can identify common React issues including invalid hook usage, incorrect prop types, missing dependencies in useEffect, and rendering bugs. Paste both the error and the component for best results.',
      },
      {
        question: 'What React errors is AI best at fixing?',
        answer:
          'AI assistants are effective at fixing hooks rule violations, state mutation bugs, missing key props, incorrect async patterns in components, and prop drilling issues.',
      },
      {
        question: 'How do I give ChatGPT enough context to fix a React bug?',
        answer:
          'Include the exact error message from the browser console, the component code, and any relevant parent components or props being passed in. If the bug depends on state, describe the steps to reproduce it.',
      },
      {
        question: 'Can AI refactor as well as fix React components?',
        answer:
          'Yes. After fixing the immediate bug, you can ask ChatGPT to also refactor the component for readability, extract custom hooks, or improve performance. Use a follow-up prompt for each concern.',
      },
    ],
  },

  'chatgpt-optimize-sql-query': {
    slug: 'chatgpt-optimize-sql-query',
    seoTitle: 'ChatGPT Prompt for SQL Query Optimization | UseCasePilot',
    seoDescription:
      'Use this ChatGPT prompt to optimize slow SQL queries. Copy the template, paste your query, and get a faster version with an explanation of the performance improvements.',
    heading: 'ChatGPT Prompt for SQL Query Optimization',
    promptTemplate: `You are a senior database engineer.

Analyze the following SQL query for performance issues.

Provide:
1. An explanation of what is causing slow performance.
2. An optimized version of the query.
3. Suggestions for indexes that would improve execution time.

Database type: [e.g. PostgreSQL, MySQL, SQL Server]

Query:
[PASTE QUERY HERE]`,
    howToUse: [
      'Copy the prompt template above.',
      'Paste it into ChatGPT at chat.openai.com.',
      'Replace [e.g. PostgreSQL, MySQL, SQL Server] with your database type.',
      'Replace [PASTE QUERY HERE] with your slow SQL query.',
      'Optionally include table sizes or the EXPLAIN output for better results.',
    ],
    whenToUse: [
      'A query is taking longer than expected to execute.',
      'Your EXPLAIN plan shows sequential scans on large tables.',
      'A report or dashboard query is timing out.',
      'You want to identify missing indexes before adding them to production.',
    ],
    exampleInput: `SELECT o.id, o.created_at, u.email, SUM(oi.price * oi.quantity) as total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON oi.order_id = o.id
WHERE u.country = 'US'
  AND o.created_at > '2024-01-01'
GROUP BY o.id, o.created_at, u.email
ORDER BY o.created_at DESC;`,
    expectedOutput:
      'The AI will identify missing indexes on users.country and orders.created_at, suggest composite index strategies, and return an optimized query with notes on each improvement.',
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    faqs: [
      {
        question: 'Can ChatGPT optimize SQL queries?',
        answer:
          'Yes. ChatGPT can analyze SQL queries, identify performance bottlenecks such as missing indexes or inefficient joins, and suggest optimized rewrites. For complex queries, include your EXPLAIN output for more accurate advice.',
      },
      {
        question: 'What SQL performance issues can AI identify?',
        answer:
          'AI can spot missing indexes, N+1 patterns in ORM-generated queries, inefficient subqueries that can be rewritten as JOINs, unnecessary full table scans, and poorly structured GROUP BY or ORDER BY clauses.',
      },
      {
        question: 'Does ChatGPT work with all SQL databases?',
        answer:
          'ChatGPT understands most SQL dialects including PostgreSQL, MySQL, SQL Server, and SQLite. Specifying your database type in the prompt ensures the AI suggests syntax and index types that are compatible.',
      },
      {
        question: 'Should I apply AI-suggested SQL changes to production directly?',
        answer:
          'No. Always test AI-suggested query changes and index additions in a staging environment first. Measure actual execution time improvement before applying changes to a production database.',
      },
    ],
  },

  'chatgpt-write-unit-tests': {
    slug: 'chatgpt-write-unit-tests',
    seoTitle: 'ChatGPT Prompt for Writing Unit Tests | UseCasePilot',
    seoDescription:
      'Use this ChatGPT prompt to generate unit tests for your code. Copy the template, paste your function, and get a complete test suite covering edge cases.',
    heading: 'ChatGPT Prompt for Writing Unit Tests',
    promptTemplate: `You are a senior software engineer specialising in test-driven development.

Write a comprehensive unit test suite for the following function.

Include:
1. Tests for the happy path (expected inputs and outputs).
2. Tests for edge cases and boundary conditions.
3. Tests for error and exception handling.
4. Clear test names that describe what each test verifies.

Testing framework: [e.g. Jest, Pytest, JUnit]
Programming language: [e.g. TypeScript, Python, Java]

Function to test:
[PASTE FUNCTION HERE]`,
    howToUse: [
      'Copy the prompt template above.',
      'Paste it into ChatGPT at chat.openai.com.',
      'Specify your testing framework and programming language.',
      'Replace [PASTE FUNCTION HERE] with the function you want to test.',
      'Review the generated tests, run them, and adjust as needed.',
    ],
    whenToUse: [
      'You need to add tests to an existing function quickly.',
      'You want to ensure edge cases are covered before a release.',
      'You are practising TDD and want to see what tests should look like.',
      'A code review requires test coverage before merging.',
    ],
    exampleInput: `function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero')
  return a / b
}`,
    expectedOutput:
      'The AI will generate a Jest test suite covering: dividing two positive numbers, dividing with negative numbers, dividing by zero (exception test), dividing zero by a number, and floating point results.',
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    faqs: [
      {
        question: 'Can ChatGPT write unit tests?',
        answer:
          'Yes. ChatGPT can generate unit tests in most frameworks including Jest, Pytest, JUnit, and Mocha. It covers happy paths, edge cases, and error conditions when given a clear function to test.',
      },
      {
        question: 'What testing frameworks does ChatGPT support?',
        answer:
          'ChatGPT is familiar with Jest, Vitest, Mocha, Pytest, JUnit, RSpec, Go testing, and more. Specify your framework in the prompt to get correctly formatted test code.',
      },
      {
        question: 'How good are AI-generated unit tests?',
        answer:
          'AI-generated tests are a strong starting point and often catch edge cases developers miss. However, they should be reviewed for correctness and supplemented with tests for business logic that the AI cannot infer from code alone.',
      },
      {
        question: 'Can I use this prompt for integration tests as well?',
        answer:
          'The prompt is optimised for unit tests. For integration tests, modify it to ask specifically for integration or end-to-end tests, and include information about external dependencies such as databases or APIs.',
      },
    ],
  },

  'chatgpt-refactor-javascript': {
    slug: 'chatgpt-refactor-javascript',
    seoTitle: 'ChatGPT Prompt for Refactoring JavaScript Code | UseCasePilot',
    seoDescription:
      'Use this ChatGPT prompt to refactor JavaScript code. Copy the template, paste your code, and get a cleaner, more maintainable version with an explanation of the changes.',
    heading: 'ChatGPT Prompt for Refactoring JavaScript Code',
    promptTemplate: `You are a senior JavaScript engineer.

Refactor the following JavaScript code to improve:
1. Readability and clarity.
2. Maintainability and structure.
3. Performance where applicable.
4. Adherence to modern JavaScript best practices (ES6+).

For each change, add a brief inline comment explaining why the change was made.

Code:
[PASTE CODE HERE]`,
    howToUse: [
      'Copy the prompt template above.',
      'Paste it into ChatGPT at chat.openai.com.',
      'Replace [PASTE CODE HERE] with the JavaScript code you want to refactor.',
      'Optionally specify constraints, e.g. "do not change the function signature".',
      'Review the refactored version and the explanation of each change.',
    ],
    whenToUse: [
      'You have legacy JavaScript code that is hard to maintain.',
      'A code review flagged readability or complexity issues.',
      'You want to modernise code written before ES6.',
      'You are onboarding to a codebase and need to understand it better.',
    ],
    exampleInput: `function proc(d) {
  var r = [];
  for (var i = 0; i < d.length; i++) {
    if (d[i].a == true) {
      var obj = {};
      obj.n = d[i].name;
      obj.v = d[i].val * 2;
      r.push(obj);
    }
  }
  return r;
}`,
    expectedOutput:
      'The AI will rewrite the function using const/let, arrow functions, array destructuring, and Array.filter/map, rename variables for clarity, and add comments explaining each modernisation decision.',
    relatedTools: ['cursor', 'github-copilot', 'tabnine'],
    faqs: [
      {
        question: 'Can ChatGPT refactor JavaScript code?',
        answer:
          'Yes. ChatGPT can refactor JavaScript to use modern ES6+ patterns, improve variable naming, reduce complexity, and apply cleaner functional patterns. It works well for both small functions and larger modules.',
      },
      {
        question: 'What JavaScript improvements does AI typically suggest?',
        answer:
          'Common improvements include replacing var with const/let, using arrow functions, adopting destructuring, converting loops to map/filter/reduce, removing unnecessary nesting, and applying consistent naming conventions.',
      },
      {
        question: 'Will AI refactoring change the behaviour of my code?',
        answer:
          'AI aims to produce functionally equivalent refactored code, but subtle behaviour differences can occur — especially around edge cases, type coercion, or scope. Always run your test suite after applying AI-suggested refactors.',
      },
      {
        question: 'Can I use this prompt for TypeScript as well?',
        answer:
          'Yes. Modify the prompt to say "TypeScript" instead of "JavaScript" and ask the AI to also add or improve type annotations. ChatGPT understands TypeScript well and will apply type-safe patterns.',
      },
    ],
  },
}
