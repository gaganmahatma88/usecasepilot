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

  verification: {
    google: '6Xl4Z8KrUskQ-fCAOxpr-Da0qwkgM3-uKME8rz_C1Ug',
  },

  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts to eliminate render-blocking DNS/TLS round trips */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}