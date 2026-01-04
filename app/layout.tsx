/**
 * Root layout
 */

import type { Metadata } from 'next';
import { CONFIG } from '@/lib/config';
import './globals.css';

export const metadata: Metadata = {
  title: CONFIG.SITE_TITLE,
  description: CONFIG.SITE_DESCRIPTION,
  keywords: [
    'donasi',
    'alquran',
    'transparansi',
    'laporan',
    'amal',
    'sosial',
    'charity',
  ],
  openGraph: {
    title: CONFIG.SITE_TITLE,
    description: CONFIG.SITE_DESCRIPTION,
    type: 'website',
    url: CONFIG.SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: CONFIG.SITE_TITLE,
    description: CONFIG.SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1f3a" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
