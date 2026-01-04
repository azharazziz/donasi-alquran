# Multi-Sheet & Gallery Guide

Panduan lengkap menggunakan fitur multi-sheet dan gallery untuk Donasi Al-Qur'an.

## Fitur Baru

### 1. **Multi-Sheet Support**
Dukung multiple spreadsheet tabs untuk berbagai kategori data:
- **📥 Donasi Masuk** - Catatan donasi yang diterima
- **💸 Pengeluaran** - Catatan biaya operasional
- **🤝 Penyaluran** - Laporan distribusi donasi ke penerima
- **📸 Galeri** - Bukti pengiriman & dokumentasi

### 2. **Gallery (Galeri)**
Menampilkan galeri foto untuk bukti pengiriman donasi dengan:
- Grid layout responsif
- Lightbox viewer untuk melihat detail
- Metadata: tanggal, kategori, keterangan
- Sorting otomatis by date (terbaru pertama)

## Setup Spreadsheet

### Untuk Data Sheets (Donasi Masuk, Pengeluaran, Penyaluran)

**1. Buat Single Google Sheet dengan Multiple Tabs**

```
Nama Spreadsheet: "Donasi Al-Qur'an"
├── Tab: "Donasi Masuk"
│   ├── Kolom: Tanggal | Donatur | Jumlah | Kategori | Metode | Catatan
│   └── Data: [rows...]
│
├── Tab: "Pengeluaran"
│   ├── Kolom: Tanggal | Uraian | Jumlah | Kategori | Penerima | Catatan
│   └── Data: [rows...]
│
└── Tab: "Penyaluran"
    ├── Kolom: Tanggal | Penerima | Jumlah | Kategori | Bukti | Catatan
    └── Data: [rows...]
```

**2. Set Sharing**
- Click "Share" button
- Change to "Anyone with the link"
- Set permission to "Viewer"
- Copy spreadsheet URL

**3. Extract Sheet ID**
```
URL: https://docs.google.com/spreadsheets/d/ABC123DEF456/edit
                                          ^^^^^^^^^^^^^^
                                          Sheet ID
```

**4. Update `.env.local`**
```env
NEXT_PUBLIC_SHEET_ID=ABC123DEF456
NEXT_PUBLIC_DONATIONS_IN_SHEET=Donasi Masuk
NEXT_PUBLIC_EXPENSES_SHEET=Pengeluaran
NEXT_PUBLIC_DISTRIBUTION_SHEET=Penyaluran
```

### Untuk Gallery (Galeri)

**1. Create Separate Spreadsheet for Gallery**

```
Nama Spreadsheet: "Galeri Donasi Al-Qur'an"
├── Tab: "Galeri"
│   ├── Kolom: Gambar URL | Keterangan | Tanggal | Kategori
│   ├── Contoh data:
│   │   ├── https://example.com/photo1.jpg | Penyerahan ke Pondok Pesantren | 2025-01-15 | Pendidikan
│   │   ├── https://example.com/photo2.jpg | Distribusi ke Yatim Piatu | 2025-01-14 | Sosial
│   │   └── ...
│   └── ...
```

**2. Set Sharing**
```
Share: "Anyone with the link" → Viewer
```

**3. Update `.env.local`**
```env
NEXT_PUBLIC_GALLERY_SPREADSHEET_ID=XYZ789GHI012
```

## Column Names (Flexible)

Sistem **otomatis mendeteksi kolom** berdasarkan semantic analysis. Gunakan nama yang intuitif:

### Monetary/Amount Columns
- `Jumlah`, `Jumlah Donasi`, `Amount`, `Nominal`
- `Rupiah`, `Rp`, `Dana`, `Kontribusi`

### Date Columns
- `Tanggal`, `Tanggal Donasi`, `Date`, `Tgl`
- `Hari Tanggal`, `Waktu`

### Category Columns
- `Kategori`, `Jenis`, `Tipe`, `Kategori Donasi`
- `Category`, `Type`, `Jenis Donasi`

### Quantity Columns
- `Jumlah Item`, `Qty`, `Kuantitas`, `Jumlah Mushaf`
- `Quantity`, `Count`

### Untuk Gallery
- **Gambar URL**: `Gambar URL`, `Image`, `URL`, `Foto Link`
- **Keterangan**: `Keterangan`, `Caption`, `Deskripsi`, `Uraian`
- **Tanggal**: `Tanggal`, `Date`, `Tgl`
- **Kategori**: `Kategori`, `Category`, `Jenis`

## Contoh Data

### Donasi Masuk Sheet

| Tanggal    | Donatur          | Jumlah    | Kategori     | Metode     | Catatan           |
|-----------|-----------------|-----------|--------------|-----------|-------------------|
| 2025-01-15| Bapak Ahmad     | 500000    | Mushaf       | Transfer   | Untuk 10 Mushaf  |
| 2025-01-14| Ibu Siti        | 1000000   | Operasional  | Tunai      | Donasi rutin      |
| 2025-01-13| Yayasan Ceria   | 5000000   | Program      | Transfer   | Dana program thn ini |

### Pengeluaran Sheet

| Tanggal    | Uraian                  | Jumlah    | Kategori     | Penerima       | Catatan       |
|-----------|----------------------|-----------|--------------|----------------|--------------|
| 2025-01-15| Beli 10 Mushaf Al-Qur | 1500000   | Mushaf       | Supplier Al-Q  | Kualitas terbaik |
| 2025-01-14| Biaya admin bank       | 50000     | Operasional  | BRI            | Biaya bulanan  |
| 2025-01-13| Gaji koordinator       | 2000000   | SDM          | Bapak Riyanto  | Januari 2025   |

### Penyaluran Sheet

| Tanggal    | Penerima              | Jumlah    | Kategori      | Bukti                   | Catatan          |
|-----------|--------------------|-----------|--------------|-----------------------|------------------|
| 2025-01-15| Pondok Pesantren Al-Ihsan | 10  | Mushaf       | https://foto1.com      | Serah terima OK  |
| 2025-01-14| Panti Asuhan Ceria   | 5       | Mushaf       | https://foto2.com      | Anak-anak senang |
| 2025-01-13| Masjid Al-Bahar       | 3       | Mushaf       | https://foto3.com      | Masjid tua      |

### Galeri Sheet

| Gambar URL           | Keterangan                    | Tanggal    | Kategori      |
|-------------------|------------------------------|-----------|---------------|
| https://photos.com/p1.jpg | Penyerahan ke Pondok Pesantren Al-Ihsan | 2025-01-15 | Pendidikan     |
| https://photos.com/p2.jpg | Anak yatim membaca Mushaf Al-Qur'an    | 2025-01-15 | Kesejahteraan |
| https://photos.com/p3.jpg | Tim distribusi sedang sorting Mushaf   | 2025-01-14 | Dokumentasi   |
| https://photos.com/p4.jpg | Foto bersama penerima manfaat           | 2025-01-13 | Dokumentasi   |

## Navigasi

### Menu Utama
Aplikasi menampilkan 4 tab utama di atas dashboard:

```
📥 Donasi Masuk  |  💸 Pengeluaran  |  🤝 Penyaluran  |  📸 Galeri
```

Klik tab untuk switch antar sheet. URL berubah:
- `/dashboard?sheet=donations-in`
- `/dashboard?sheet=expenses`
- `/dashboard?sheet=distribution`
- `/gallery` (halaman terpisah)

### Dashboard Features per Sheet
- **Summary Cards**: Total, Jumlah Item, Range Tanggal
- **Charts**: Line (time series), Pie (kategori), Bar (amounts)
- **Filter**: Search, Date Range, Kategori (otomatis terdeteksi)
- **Table**: Semua kolom ditampilkan dengan auto-formatting

### Gallery Features
- **Grid Layout**: 1-4 kolom responsive
- **Lightbox**: Click gambar untuk view besar
- **Metadata**: Tanggal & kategori di setiap foto
- **Sorting**: Otomatis by date (terbaru pertama)
- **Error Handling**: Foto rusak/hilang tidak crash app

## Troubleshooting

### Gallery Tidak Tampil
1. Check `.env.local` has `NEXT_PUBLIC_GALLERY_SPREADSHEET_ID`
2. Verify spreadsheet sheet name is `"Galeri"`
3. Check kolom names: `Gambar URL`, `Keterangan`, `Tanggal`, `Kategori`
4. Ensure sharing is "Anyone with the link"
5. Verify image URLs adalah HTTPS (Google Photos, Imgur, dll)

### Sheet Tidak Load Data
1. Check Sheet Name di `.env.local` cocok dengan actual sheet tab
2. Verify sharing: "Anyone with the link" → Viewer
3. Check SHEET_ID benar (copy dari URL address bar)
4. Ensure first row adalah headers, bukan data

### Image URLs Tidak Valid
- Gunakan direct image links (ends with .jpg, .png, .gif)
- Google Photos: Share → get public link → modify URL
- Imgur: Upload → Copy direct link
- Google Drive: Publish → Link
- Cloudinary/Imgbb: Upload → Copy URL

### Kolom Tidak Terdeteksi
- Gunakan nama-nama umum yang sesuai dengan keyword sets
- Atau gunakan `COLUMN_OVERRIDES` di `lib/config.ts`
- Atau baca dokumentasi `ARCHITECTURE.md` untuk semantic detection

## Best Practices

### 1. Sheet Organization
```
✅ Satu Spreadsheet dengan multiple tabs
❌ Multiple spreadsheets untuk setiap tipe data
```

### 2. Data Quality
```
✅ Format tanggal konsisten (YYYY-MM-DD atau Tanggal lokal)
✅ Kolom Jumlah hanya angka (500000, bukan "500.000 Rp")
✅ Row pertama adalah header
✅ Jangan ada baris kosong di tengah data

❌ Mixed format (5,000.00 dan 5000000)
❌ Kolom ambigu (A, B, C, D)
❌ Tanggal dalam format berbeda
```

### 3. Image URLs
```
✅ https://example.com/photo.jpg
✅ https://imgur.com/abc123.jpg
✅ Google Photos direct link

❌ file:///C:/Users/photos/pic.jpg
❌ Google Drive folder link
❌ YouTube link
```

### 4. Accessibility
```
✅ Keterangan foto deskriptif dan meaningful
✅ Kategori konsisten dan mudah dipahami
✅ Tanggal lengkap (tidak "kemarin" atau "lalu")

❌ Keterangan kosong atau "foto"
❌ Kategori random (foto1, foto2, test)
❌ Tanggal tidak jelas
```

## Advanced: Customization

### Ubah Nama Sheet Tab
Edit `lib/config.ts`:
```typescript
SHEET_MAPPING: {
  'donations-in': 'Kontribusi Diterima',  // Ganti nama
  'expenses': 'Biaya Operasional',
  'distribution': 'Distribusi Manfaat',
}
```

### Ubah Nama Display Menu
Edit `lib/config.ts`:
```typescript
SHEETS = {
  DONATIONS_IN: {
    id: 'donations-in',
    name: 'Kontribusi', // Ganti display name
    icon: '📥',
  },
  // ...
}
```

### Filter Default
Edit `DashboardClient.tsx`:
```typescript
const [filters, setFilters] = useState<FilterState>({
  dateRange: { /* ... */ },
  category: 'Mushaf', // Add default category filter
});
```

## Security Notes

✅ **Public Data**: Gunakan akun yang separate dari personal
✅ **Sensitive Info**: Jangan include nama lengkap donor/penerima
✅ **Sharing**: "Viewer" only - tidak bisa edit dari public
✅ **HTTPS**: Semua image URLs harus HTTPS
✅ **Monitoring**: Check Google Sheets revision history

❌ Jangan share "Editor" access
❌ Jangan include nomor rekening/identitas
❌ Jangan set sharing ke "Public"
❌ Jangan hardcode sheet IDs dalam kode

---

**Need Help?** Check:
- `README.md` - Feature overview
- `CONFIG.md` - Configuration details  
- `DEPLOYMENT.md` - Deployment guides
- `ARCHITECTURE.md` - Technical deep-dive
