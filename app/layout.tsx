import type { Metadata } from 'next'
import './globals.css'
import {
  OrganizationJSONLD,
  WebApplicationJSONLD,
  FAQPageJSONLD,
  BreadcrumbListJSONLD,
} from './json-ld'

export const metadata: Metadata = {
  title: {
    default: 'Zynva — We Feel Your Pain',
    template: '%s | Zynva',
  },
  description: 'Tell us what\'s killing your clinic\'s growth and we\'ll build the SaaS to fix it. Zynva is the all-in-one operating system built exclusively for aesthetic clinics.',
  keywords: [
    'aesthetic clinic software',
    'clinic management system',
    'medical spa software',
    'aesthetic practice management',
    'clinic scheduling software',
    'patient management system',
    'aesthetic clinic CRM',
    'medical practice software',
    'clinic operations software',
    'aesthetic clinic solutions',
  ],
  authors: [{ name: 'Zynva' }],
  creator: 'Zynva',
  publisher: 'Zynva',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Zynva',
    title: 'Zynva — We Feel Your Pain',
    description: 'Tell us what\'s killing your clinic\'s growth and we\'ll build the SaaS to fix it. The all-in-one operating system built exclusively for aesthetic clinics.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zynva - Aesthetic Clinic Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zynva — We Feel Your Pain',
    description: 'Tell us what\'s killing your clinic\'s growth and we\'ll build the SaaS to fix it.',
    images: ['/og-image.png'],
    creator: '@zynva',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organization = OrganizationJSONLD()
  const webApp = WebApplicationJSONLD()
  const faq = FAQPageJSONLD()
  const breadcrumb = BreadcrumbListJSONLD()

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </head>
      <body className="font-mono bg-bg text-ink min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
