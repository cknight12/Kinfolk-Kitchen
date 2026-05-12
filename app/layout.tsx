import type { Metadata } from 'next'
import { Playfair_Display, Dancing_Script, Lato } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kinfolk Kitchen | Simple. Intentional. Nourishing.',
  description:
    'Small-batch, home-based food and wellness brand based in Nashville, TN. Sourdough, baked goods, and nontoxic home essentials. Nash, TN pickup or shipping available.',
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  openGraph: {
    title: 'Kinfolk Kitchen',
    description: 'Simple ingredients. Intentionally made. Made to nourish.',
    siteName: 'Kinfolk Kitchen',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dancing.variable} ${lato.variable}`}
    >
      <body className="bg-cream text-navy font-lato antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
