import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | UseCasePilot',
  description: 'Get in touch with the UseCasePilot team for questions, feedback, or partnerships.',
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Contact</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          If you have questions, feedback, or partnership inquiries, feel free to reach out.
        </p>
        <p>
          Email:{' '}
          <a
            href="mailto:partner@usecasepilot.org"
            className="text-blue-600 hover:underline"
          >
            partner@usecasepilot.org
          </a>
        </p>
        <p>We typically respond within a few business days.</p>
      </div>
    </div>
  )
}
