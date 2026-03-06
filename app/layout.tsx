import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'UseCasePilot – Real-World AI Use Cases by Role',
    template: '%s | UseCasePilot',
  },
  description:
    'Discover practical AI use cases tailored to your professional role. From project managers to engineers, find out how AI can enhance your workflow.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://usecasepilot.com'
  ),
  openGraph: {
    type: 'website',
    siteName: 'UseCasePilot',
    title: 'UseCasePilot – Real-World AI Use Cases by Role',
    description:
      'Discover practical AI use cases tailored to your professional role.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>{children}</body>
    </html>
  )
}
