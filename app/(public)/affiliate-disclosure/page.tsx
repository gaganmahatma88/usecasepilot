import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | UseCasePilot',
  description: 'Learn how UseCasePilot uses affiliate links to support the site.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Affiliate Disclosure</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          UseCasePilot participates in affiliate programs for certain AI tools.
        </p>
        <p>
          This means we may earn a commission when users click on links to tools and sign up for
          their services.
        </p>
        <p>
          These commissions help support the maintenance of this website and allow us to continue
          publishing AI workflow guides.
        </p>
        <p>
          Our recommendations are based on usefulness for real workflows and are not influenced by
          affiliate relationships.
        </p>
      </div>
    </div>
  )
}
