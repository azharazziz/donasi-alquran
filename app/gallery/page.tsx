import SheetSelector from '@/components/SheetSelector';
import Gallery, { GalleryImage } from '@/components/Gallery';
import { GalleryHeader } from '@/components/GalleryHeader';
import { GalleryNavigation } from '@/components/GalleryNavigation';
import { CONFIG, SHEETS } from '@/lib/config';
import { fetchSheetData } from '@/lib/sheetFetcher';
import Link from 'next/link';

export const metadata = {
  title: 'Galeri - Donasi Al-Qur\'an',
  description: 'Bukti pengiriman dan dokumentasi penyaluran donasi Al-Qur\'an',
};

async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    if (!CONFIG.GALLERY_SPREADSHEET_ID) {
      console.warn('GALLERY_SPREADSHEET_ID not configured');
      return [];
    }

    const data = await fetchSheetData(
      CONFIG.GALLERY_SPREADSHEET_ID,
      'Galeri'
    );

    if (!data.rows || data.rows.length === 0) {
      return [];
    }

    return data.rows
      .map((row, index) => {
        const imageUrl = row[CONFIG.GALLERY_IMAGE_COLUMN] || 
                        row['Gambar'] || 
                        row['URL'] || 
                        row['Image'];
        const caption = row[CONFIG.GALLERY_CAPTION_COLUMN] || 
                       row['Keterangan'] || 
                       row['Caption'] || 
                       '';
        const date = row[CONFIG.GALLERY_DATE_COLUMN] || 
                    row['Tanggal'] || 
                    row['Date'];
        const category = row['Kategori'] || row['Category'] || '';

        return {
          id: `img-${index}`,
          url: String(imageUrl || ''),
          caption: String(caption || `Bukti Penyaluran #${index + 1}`),
          date: date ? String(date) : undefined,
          category: category ? String(category) : undefined,
        };
      })
      .filter(img => img.url) // Filter out images without URL
      .sort((a, b) => {
        // Sort by date descending if available
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await fetchGalleryImages();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <GalleryHeader
        icon={SHEETS.GALLERY.icon}
        title={SHEETS.GALLERY.name}
        description={SHEETS.GALLERY.description}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info box */}
        {images.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800">
              📊 Total: <span className="font-semibold">{images.length}</span> bukti penyaluran
            </p>
          </div>
        )}

        {/* Gallery Component */}
        {images.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="mb-4">
              <span className="text-5xl block">📸</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Galeri Kosong</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Untuk menampilkan galeri, Anda perlu:
            </p>
            <ol className="text-left text-gray-600 max-w-md mx-auto space-y-2 mb-6">
              <li className="flex gap-3">
                <span className="font-semibold text-navy-900">1.</span>
                <span>Buat spreadsheet Google Sheets untuk galeri</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-navy-900">2.</span>
                <span>Tambahkan kolom: Gambar URL, Keterangan, Tanggal, Kategori</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-navy-900">3.</span>
                <span>Set kolom NEXT_PUBLIC_GALLERY_SPREADSHEET_ID di .env.local</span>
              </li>
            </ol>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-950 transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        ) : (
          <Gallery images={images} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600 text-sm">
          <p>📸 Galeri bukti pengiriman dan dokumentasi penyaluran donasi</p>
          <p className="mt-2">Last updated: {new Date().toLocaleString('id-ID')}</p>
        </div>
      </footer>
    </div>
  );
}
