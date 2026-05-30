import type { Metadata } from 'next'
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google"
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/Themeprovider'
import ScrollToTop from '@/components/ScrollToTop'
import CommandPalette from '@/components/CommandPalette'

import './globals.css'
import 'katex/dist/katex.min.css'

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
})

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
    <html lang="en" className={`${displayFont.variable} ${monoFont.variable}`}>
      <body className='bg-custom-background'>
        <Providers>
          <Navigation />
            {children}
            <ScrollToTop />
          <Footer />
          <CommandPalette />
        </Providers>
        <div id='portal-root' />
        <div id='backdrop-root'/>
      </body>
    </html>
  )
}
