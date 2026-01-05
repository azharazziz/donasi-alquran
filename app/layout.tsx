/**
 * Root layout
 */

import type { Metadata } from 'next';
import { CONFIG } from '@/lib/config';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: CONFIG.SITE_TITLE,
    template: `%s | ${CONFIG.SITE_TITLE}`,
  },
  description: CONFIG.SITE_DESCRIPTION,
  keywords: [
    'donasi',
    'alquran',
    'transparansi',
    'laporan',
    'amal',
    'sosial',
    'charity',
    'donasi alquran',
    'laporan donasi',
    'transparansi donasi',
  ],
  authors: [{ name: 'Donasi Al-Qur\'an' }],
  creator: 'Donasi Al-Qur\'an',
  publisher: 'Donasi Al-Qur\'an',
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: CONFIG.SITE_TITLE,
    description: CONFIG.SITE_DESCRIPTION,
    type: 'website',
    url: CONFIG.SITE_URL,
    locale: 'id_ID',
    siteName: 'Donasi Al-Qur\'an',
  },
  twitter: {
    card: 'summary_large_image',
    title: CONFIG.SITE_TITLE,
    description: CONFIG.SITE_DESCRIPTION,
    site: '@donasiAlquran',
    creator: '@donasiAlquran',
  },
  alternates: {
    canonical: CONFIG.SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Donasi Al-Qur\'an',
    url: CONFIG.SITE_URL,
    logo: `${CONFIG.SITE_URL}/favicon.svg`,
    description: CONFIG.SITE_DESCRIPTION,
    foundingDate: '2024',
    areaServed: 'ID',
    contactType: 'Customer Service',
    sameAs: [
      'https://instagram.com/donasiAlquran',
      'https://twitter.com/donasiAlquran',
    ],
  };

  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#003B7C" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Indonesian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Donasi Al-Qur'an" />
        <meta name="google-site-verification" content="" />
        <link rel="canonical" href={CONFIG.SITE_URL} />
        <link rel="alternate" hrefLang="id" href={CONFIG.SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
