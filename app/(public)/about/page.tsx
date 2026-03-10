import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | UseCasePilot',
  description: 'Learn about UseCasePilot — a directory of practical AI workflows for professionals.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">About UseCasePilot</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
        <p>
          UseCasePilot is a directory of practical AI workflows for professionals. The site helps
          engineers, product managers, marketers, and other teams discover how artificial intelligence
          can improve everyday work.
        </p>
        <p>
          Each guide explains a real-world use case, recommended AI tools, and example prompts that
          can be applied immediately.
        </p>
        <p>
          Our goal is simple: make AI adoption easier by showing practical workflows instead of
          abstract theory.
        </p>
      </div>
    </div>
  )
}
