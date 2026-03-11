import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Skip-to-content link: visible on focus, hidden visually otherwise */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-[#1D4ED8] focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
