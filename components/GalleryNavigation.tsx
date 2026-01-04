/**
 * Gallery navigation bar - simplified without dashboard links
 */

'use client';

import Link from 'next/link';

export function GalleryNavigation() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-navy-900 hover:text-gold-400 transition-colors">
            <span className="text-2xl">📖</span>
            <span className="hidden sm:inline font-semibold">Donasi Al-Qur'an</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            title="Kembali ke halaman utama"
          >
            🏠 Beranda
          </Link>
        </div>
      </div>
    </nav>
  );
}
