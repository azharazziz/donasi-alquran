# 🎯 Panduan Setup Multi-Sheet & Gallery (Indonesian)

Panduan cepat dalam Bahasa Indonesia untuk setup dan menggunakan fitur multi-sheet dan gallery.

## 📋 Apa itu Multi-Sheet?

Fitur baru yang memungkinkan Anda memiliki **4 kategori data berbeda** dalam 1 Spreadsheet Google:

1. **📥 Donasi Masuk** - Data uang yang masuk dari donor
2. **💸 Pengeluaran** - Data biaya operasional
3. **🤝 Penyaluran** - Data distribusi ke penerima
4. **📸 Galeri** - Foto bukti pengiriman

## 🚀 Setup Cepat (5 Menit)

### Langkah 1: Buat Spreadsheet Google (2 menit)

1. Buka https://docs.google.com/spreadsheets
2. Buat **Spreadsheet baru** dengan nama: `Donasi Al-Qur'an`
3. Rename sheet pertama dari "Sheet1" menjadi:
   - Hapus "Sheet1" → Buat tab baru bernama `Donasi Masuk`
4. Buat 2 tab lagi:
   - `Pengeluaran`
   - `Penyaluran`
5. (Optional) Tab ke-4 untuk `Galeri` (boleh di spreadsheet terpisah)

### Langkah 2: Isi Data Sample (2 menit)

**Tab "Donasi Masuk":**
```
Tanggal    | Donatur      | Jumlah   | Kategori | Metode
-----------|--------------|----------|----------|----------
2025-01-15 | Bapak Ahmad  | 500000   | Mushaf   | Transfer
2025-01-14 | Ibu Siti     | 1000000  | Program  | Tunai
```

**Tab "Pengeluaran":**
```
Tanggal    | Uraian      | Jumlah  | Kategori
-----------|-------------|---------|----------
2025-01-15 | Beli Mushaf | 1500000 | Mushaf
2025-01-14 | Biaya Admin | 50000   | Operasional
```

**Tab "Penyaluran":**
```
Tanggal    | Penerima      | Jumlah | Kategori
-----------|---------------|--------|----------
2025-01-15 | Pondok Pesantren | 10  | Mushaf
2025-01-14 | Panti Asuhan   | 5     | Mushaf
```

### Langkah 3: Share Spreadsheet (1 menit)

1. Click tombol **"Share"** (kanan atas)
2. Di kolom "Add people and groups":
   - Hapus nama Anda
   - Ubah "Restricted" → "Anyone with the link"
   - Ubah "Editor" → "Viewer"
3. Click **"Share"**
4. Copy URL dari address bar

### Langkah 4: Config `.env.local` (minimal 1 menit)

1. Edit file `.env.local` di folder project
2. Extract **Sheet ID** dari URL:
   ```
   https://docs.google.com/spreadsheets/d/ABC123XYZ/edit
                                          ^^^^^^^^^
                                        Sheet ID
   ```
3. Ubah nilai:
   ```env
   NEXT_PUBLIC_SHEET_ID=ABC123XYZ
   NEXT_PUBLIC_DONATIONS_IN_SHEET=Donasi Masuk
   NEXT_PUBLIC_EXPENSES_SHEET=Pengeluaran
   NEXT_PUBLIC_DISTRIBUTION_SHEET=Penyaluran
   ```

✅ **SELESAI!** Jalankan:
```bash
npm run dev
```

## 🎨 Gunakan Fitur

### Lihat Data Donasi Masuk
Klik tab **"📥 Donasi Masuk"** → Lihat dashboard dengan:
- Total donasi (saldo)
- Chart donasi over time
- Daftar lengkap donor
- Filter by date/kategori

### Lihat Data Pengeluaran
Klik tab **"💸 Pengeluaran"** → Lihat:
- Total pengeluaran
- Breakdown by kategori
- Daftar pengeluaran detail

### Lihat Data Penyaluran
Klik tab **"🤝 Penyaluran"** → Lihat:
- Total penyaluran
- Penerima manfaat
- Breakdown donasi per lokasi

### Lihat Galeri
Klik tab **"📸 Galeri"** (atau link "Galeri" di navbar) → Lihat:
- Grid foto bukti pengiriman
- Click foto → lihat besar
- Filter by tanggal/kategori

## ⚙️ Konfigurasi Lanjutan

### Ubah Nama Menu Display

Edit `lib/config.ts`:
```typescript
export const SHEETS = {
  DONATIONS_IN: {
    name: 'Kontribusi Diterima', // Ganti nama display
    icon: '📥',
  },
  // ...
}
```

### Ubah Nama Tab di Spreadsheet

Jika tab Anda bernama `"Masuk"` (bukan `"Donasi Masuk"`):

Edit `.env.local`:
```env
NEXT_PUBLIC_DONATIONS_IN_SHEET=Masuk
```

### Filter Default

Untuk menampilkan hanya kategori tertentu by default, edit `DashboardClient.tsx`:
```typescript
const [filters, setFilters] = useState<FilterState>({
  dateRange: { /* ... */ },
  category: 'Mushaf', // Ganti ke kategori Anda
});
```

## 📸 Setup Galeri (Optional)

### Opsi 1: Galeri di Spreadsheet Sama
```env
NEXT_PUBLIC_GALLERY_SPREADSHEET_ID=ABC123XYZ
```
(Same Sheet ID, tab berbeda: `"Galeri"`)

### Opsi 2: Galeri di Spreadsheet Terpisah
```
1. Buat Spreadsheet baru: "Galeri Donasi"
2. Buat tab: "Galeri"
3. Copy Sheet ID-nya ke env.local
```

### Format Tab Galeri

```
Gambar URL           | Keterangan               | Tanggal    | Kategori
--------------------|--------------------------|-----------|----------
https://example.../1 | Penyerahan ke Pesantren | 2025-01-15 | Pendidikan
https://example.../2 | Foto penerima manfaat    | 2025-01-14 | Sosial
```

### URL Gambar (Harus HTTPS)

Bisa dari:
- ✅ Google Photos (public link)
- ✅ Imgur.com (direct link)
- ✅ Imgbb.com
- ✅ Cloudinary
- ❌ Local file (file://...)
- ❌ Private Google Drive

Cara copy dari Google Photos:
1. Upload foto
2. Share → copy link
3. Ubah akhir URL dari `/view` → hapus, tinggal ID

## 🔍 Troubleshooting

### Data tidak tampil
**Solusi:**
1. Cek Tab name di `.env.local` exactly match spreadsheet
2. Cek first row adalah header (Tanggal, Donatur, dll)
3. Cek sharing: "Anyone with the link"
4. Cek SHEET_ID benar (jangan ada spasi)

### Gambar galeri tidak muncul
**Solusi:**
1. URL harus direct image link (.jpg, .png)
2. URL harus HTTPS (secure)
3. Tab galeri harus bernama "Galeri"
4. Kolom: "Gambar URL", "Keterangan", "Tanggal", "Kategori"

### Kolom tidak terdeteksi otomatis
**Solusi:**
1. Gunakan nama yang intuitif:
   - Untuk amount: `Jumlah`, `Nominal`, `Amount`
   - Untuk date: `Tanggal`, `Tgl`, `Date`
   - Untuk kategori: `Kategori`, `Jenis`, `Category`
2. Atau edit `lib/config.ts` manual

## 📊 Contoh Full Setup

### Spreadsheet: "Donasi Al-Qur'an"

**Tab 1: "Donasi Masuk"**
```
Tanggal    | Donatur        | Jumlah    | Kategori     | Metode    | Catatan
-----------|----------------|-----------|--------------|-----------|----------
2025-01-20 | Yayasan Maju   | 10000000  | Program      | Transfer  | Donasi besar
2025-01-19 | Ibu Rahma      | 250000    | Mushaf       | Tunai     | Regular 
2025-01-18 | Bapak Adi      | 500000    | Operasional  | Transfer  | -
```

**Tab 2: "Pengeluaran"**
```
Tanggal    | Uraian           | Jumlah    | Kategori      | Penerima
-----------|------------------|-----------|---------------|----------
2025-01-20 | Gaji staff       | 2000000   | SDM           | PT
2025-01-19 | Beli Mushaf      | 3000000   | Mushaf        | Supplier
2025-01-18 | Listrik & air    | 500000    | Utilitas      | PLN
```

**Tab 3: "Penyaluran"**
```
Tanggal    | Penerima                | Jumlah | Kategori | Bukti Foto              | Catatan
-----------|--------------------------|--------|----------|-------------------------|--------
2025-01-20 | Pondok Pesantren Al-Ibsan| 20     | Mushaf   | https://photo.com/1.jpg | OK
2025-01-19 | Masjid Jami Ceria       | 10     | Mushaf   | https://photo.com/2.jpg | OK
2025-01-18 | Panti Asuhan Harapan    | 15     | Mushaf   | https://photo.com/3.jpg | OK
```

**Tab 4: "Galeri"** (optional, bisa terpisah)
```
Gambar URL              | Keterangan                  | Tanggal    | Kategori
------------------------|------------------------------|-----------|----------
https://photo.com/g1.jpg| Serah terima di Pesantren  | 2025-01-20 | Dokumentasi
https://photo.com/g2.jpg| Anak-anak membaca Mushaf   | 2025-01-19 | Dampak
https://photo.com/g3.jpg| Tim distribusi di lapangan | 2025-01-18 | Dokumentasi
```

## 📖 Dokumentasi Lengkap

Untuk info lebih detail:
- **MULTISHEET_GUIDE.md** - Panduan komprehensif
- **CONFIG.md** - Referensi konfigurasi
- **README.md** - Overview fitur
- **ARCHITECTURE.md** - Detail teknis

---

**Selamat! Setup selesai! 🎉**

Jalankan `npm run dev` dan buka http://localhost:3001 untuk melihat hasilnya.
