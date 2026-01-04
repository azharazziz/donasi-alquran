/**
 * Landing page with Islamic design
 */

'use client';

import Link from 'next/link';
import { CONFIG } from '@/lib/config';

export default function Home() {
  const handleDonateClick = () => {
    alert('Fitur donasi akan segera tersedia');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-900 text-white overflow-hidden">
      {/* Islamic geometric pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="text-2xl">📖</div>
          <span className="font-serif text-xl font-bold">{CONFIG.ORG_NAME}</span>
        </div>
        <Link
          href="/dashboard"
          className="px-6 py-2 bg-gold-400 text-navy-900 rounded-lg font-semibold hover:bg-gold-500 transition-colors"
        >
          Lihat Laporan
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="mb-8">
          <div className="text-6xl md:text-7xl mb-4 animate-fade-in">📖</div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
            Platform Transparansi
            <span className="block text-gold-400">Donasi Al-Qur'an</span>
          </h1>
        </div>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Setiap donasi adalah amal yang abadi. Kami berkomitmen untuk transparansi penuh dalam
          setiap langkah program donasi Al-Qur'an kami. Lihat bagaimana kontribusi Anda membuat
          perbedaan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold-400 text-navy-900 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all hover:scale-105"
          >
            📊 Lihat Laporan Lengkap
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gold-400 text-gold-400 rounded-lg font-semibold text-lg hover:bg-gold-400 hover:text-navy-900 transition-all"
          >
            📸 Galeri Bukti Penyaluran
          </Link>
          <button
            onClick={handleDonateClick}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gold-400 text-gold-400 rounded-lg font-semibold text-lg hover:bg-gold-400 hover:text-navy-900 transition-all cursor-pointer"
          >
            💝 Ikut Donasi
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Mengapa Kami?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🔍',
              title: 'Transparansi Penuh',
              desc: 'Semua data donasi dapat diakses publik tanpa batasan',
            },
            {
              icon: '🛡️',
              title: 'Terpercaya & Aman',
              desc: 'Sistem yang dirancang untuk menjaga integritas data donasi',
            },
            {
              icon: '📈',
              title: 'Laporan Real-time',
              desc: 'Data diperbarui secara otomatis dari sumber terpercaya',
            },
            {
              icon: '🌍',
              title: 'Akses Mudah',
              desc: 'Dapat diakses dari mana saja, kapan saja tanpa aplikasi khusus',
            },
            {
              icon: '✨',
              title: 'Desain Elegan',
              desc: 'Antarmuka yang nyaman dan mudah dipahami semua kalangan',
            },
            {
              icon: '⚡',
              title: 'Performa Cepat',
              desc: 'Loading yang responsif dengan bandwidth minimal',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm border border-gold-400/20 rounded-lg p-6 hover:border-gold-400/50 transition-colors"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-gold-400 to-gold-500 rounded-lg p-8 md:p-12 text-navy-900">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">Dampak Donasi</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p className="text-navy-900/80">Donasi Diproses</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-navy-900/80">Penerima Manfaat</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-navy-900/80">Transparansi Data</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">Siap Membantu?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Setiap kontribusi Anda membantu membagikan kebaikan Al-Qur'an kepada mereka yang membutuhkan.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 bg-gold-400 text-navy-900 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all hover:scale-105"
        >
          Lihat Data & Galeri →
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gold-400/20 mt-16 py-8 text-center text-gray-400">
        <p className="mb-2">© 2026 {CONFIG.ORG_NAME}. Platform Transparansi Donasi.</p>
        <p className="text-sm">
          Dibangun dengan ❤️ untuk meningkatkan kepercayaan dan transparansi dalam setiap program
          sosial.
        </p>
      </footer>
    </div>
  );
}
