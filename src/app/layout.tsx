import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/Themeprovider'
import ScrollToTop from '@/components/ScrollToTop'

import './globals.css'
import 'katex/dist/katex.min.css'

export const metadata: Metadata = {
  title: 'Chris Ragland 🚀',
  description: 'Learn to live then live to learn.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
            {children}
            <ScrollToTop />
          <Footer />
        </Providers>
        <div id='portal-root' />
        <div id='backdrop-root'/>
      </body>
    </html>
  )
}
