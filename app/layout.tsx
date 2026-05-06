import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import SiteChrome from '@/components/SiteChrome';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  style:    ['normal', 'italic'],
  variable: '--font-heading-google',
  display:  'swap',
  preload:  true,
});

const jost = Jost({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  variable: '--font-body-google',
  display:  'swap',
  preload:  true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://theflame.org'),
  title: {
    default:  'The Flame Christian Co-op | St. Augustine Christian Homeschool Cooperative',
    template: '%s | The Flame Christian Co-op',
  },
  description:
    'A Christ-centered homeschool cooperative in the St. Augustine area — where children encounter God\'s presence, grow in knowledge, and discover who He created them to be.',
  keywords:   ['homeschool', 'Christian co-op', 'St. Augustine', 'faith-based education', 'Ponte Vedra'],
  authors:    [{ name: 'The Flame Christian Co-op' }],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://theflame.org',
    siteName:    'The Flame Christian Co-op',
    title:       'The Flame Christian Co-op | St. Augustine Christian Homeschool Cooperative',
    description: 'A Christ-centered homeschool cooperative in the St. Augustine area.',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'The Flame Christian Co-op',
    description: 'A Christ-centered homeschool cooperative in the St. Augustine area.',
    images:      ['/images/og-default.jpg'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  '@context':  'https://schema.org',
  '@type':     ['Organization', 'LocalBusiness'],
  name:        'The Flame Christian Co-op',
  url:         'https://theflame.org',
  logo:        'https://theflame.org/images/logo/flame-logo-lockup-script.png',
  description: 'A Christ-centered homeschool cooperative in the St. Augustine area.',
  address: {
    '@type':          'PostalAddress',
    streetAddress:    '895 Palm Valley Rd',
    addressLocality:  'Ponte Vedra',
    addressRegion:    'FL',
    postalCode:       '32081',
    addressCountry:   'US',
  },
  contactPoint: {
    '@type':       'ContactPoint',
    contactType:   'admissions',
    url:           'https://theflame.org/admissions',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${jost.variable}`}
      style={{
        // Wire Google font CSS variables into the design token variables
        ['--font-heading' as string]: `var(--font-heading-google), 'Cormorant Garamond', Georgia, serif`,
        ['--font-body' as string]:    `var(--font-body-google), 'Jost', sans-serif`,
      }}
    >
      <head>
        <link rel="canonical" href="https://theflame.org" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://eduweby.com" />
        <link rel="dns-prefetch" href="https://eduweby.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Footer />
      </body>
    </html>
  );
}
