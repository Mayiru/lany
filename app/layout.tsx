import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { SWRProvider } from '@/components/providers/SWRProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Lany - Arte y Manualidades Personalizadas',
    template: '%s | Lany',
  },
  description:
    'Productos personalizados para momentos especiales. Bolsas, camisetas, pines, stickers, llaveros y más. Arte y manualidades únicas.',
  keywords: [
    'productos personalizados',
    'arte y manualidades',
    'bolsas personalizadas',
    'camisetas personalizadas',
    'pines',
    'stickers',
    'llaveros',
    'decoración personalizada',
  ],
  authors: [{ name: 'Lany' }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'
  ),
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lany.com',
    siteName: 'Lany',
    title: 'Lany - Arte y Manualidades Personalizadas',
    description:
      'Productos personalizados para momentos especiales. Bolsas, camisetas, pines, stickers, llaveros y más.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Lany - Arte y Manualidades',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lany - Arte y Manualidades Personalizadas',
    description:
      'Productos personalizados para momentos especiales. Bolsas, camisetas, pines, stickers, llaveros y más.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lany.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lany',
    description: 'Arte y Manualidades Personalizadas',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'Spanish',
    },
  }

  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <SWRProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SWRProvider>
      </body>
    </html>
  )
}
