/**
 * Dashboard header with back to home button
 */

'use client';

import Link from 'next/link';

interface DashboardHeaderProps {
  icon: string;
  title: string;
  description: string;
}

export function DashboardHeader({ icon, title, description }: DashboardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-navy-900 to-navy-950 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{icon}</span>
            <div>
              <h1 className="text-3xl font-bold font-serif">{title}</h1>
              <p className="text-gold-400 text-sm">{description}</p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            title="Kembali ke halaman utama"
          >
            ← Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
