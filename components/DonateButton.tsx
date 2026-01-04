/**
 * Donate button component (client-side)
 */

'use client';

export function DonateButton() {
  const handleDonate = () => {
    alert('Fitur donasi akan segera tersedia');
  };

  return (
    <button
      onClick={handleDonate}
      className="inline-flex items-center justify-center px-8 py-4 bg-navy-900 text-white rounded-lg font-semibold text-lg hover:bg-navy-800 transition-all hover:scale-105"
    >
      💝 Berdonasi Sekarang
    </button>
  );
}
