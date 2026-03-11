import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | UseCasePilot',
  description: 'Privacy policy for UseCasePilot — how we collect and use data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Privacy Policy</h1>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Information We Collect</h2>
          <p>
            We may collect basic usage data such as page visits and interaction with links to improve
            the site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Cookies</h2>
          <p>
            UseCasePilot may use cookies or analytics tools to understand how visitors use the
            website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Affiliate Links</h2>
          <p>
            Some links on this website may be affiliate links. If you click a link and sign up for a
            service, we may receive a commission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact</h2>
          <p>
            If you have questions about this policy, you can contact us through the{' '}
            <a href="/contact" className="text-[#1D4ED8] hover:underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
