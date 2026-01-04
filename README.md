# Donasi Al-Qur'an - Platform Transparansi

Platform transparansi publik untuk program donasi Al-Qur'an dengan dashboard dinamis yang terhubung ke Google Sheets.

## 🎯 Fitur Utama

- **Transparansi Penuh**: Semua data donasi dapat diakses publik tanpa autentikasi
- **Google Sheets Integration**: Data diambil langsung dari Google Sheets public
- **Dynamic Schema Detection**: Sistem otomatis mendeteksi kolom berdasarkan semantik
- **Auto Calculations**: Perhitungan otomatis untuk total donasi dan kuantitas
- **Smart Visualizations**: Chart otomatis (time series, pie, bar) sesuai data
- **Responsive Design**: Bekerja sempurna di desktop, tablet, dan mobile
- **Zero Backend**: Fully static/serverless, siap deploy di Vercel
- **Islamic Design**: Interface yang elegan dengan warna navy-gold dan atmosfer spiritual

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Source**: Google Sheets (Public)
- **Deployment**: Vercel (Free tier)

## 📋 Setup

### 1. Persiapan Google Sheet

1. Buat Google Sheet baru
2. Buat struktur data dengan headers di baris pertama (nama kolom fleksibel)
3. Isi data donasi
4. Share sheet dengan akses "Anyone with the link can view"
5. Ambil SHEET_ID dari URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env.local`:

```env
NEXT_PUBLIC_SHEET_ID=your_sheet_id_here
NEXT_PUBLIC_SHEET_NAME=Sheet1
NEXT_PUBLIC_SITE_URL=https://donasi-alquran.vercel.app
```

### 4. Development

```bash
npm run dev
```

Buka http://localhost:3000

### 5. Build & Deploy

```bash
npm run build
npm start
```

Deploy ke Vercel:

```bash
npm install -g vercel
vercel
```

## 📊 Data Structure

### Minimum Requirement

| Kolom 1 | Kolom 2 | Kolom 3 |
|---------|---------|---------|
| ...     | ...     | ...     |

**Penting**: Nama kolom tidak perlu sesuai dengan contoh. Sistem akan mendeteksi tipe kolom secara otomatis.

### Contoh dengan Semantic Detection

| Tanggal Donasi | Jumlah Donasi (IDR) | Jenis Donasi | Status |
|---|---|---|---|
| 2026-01-01 | 500000 | Mushaf | Terverifikasi |
| 2026-01-02 | 1000000 | Dakwah | Terverifikasi |

Sistem akan otomatis mendeteksi:
- **Date Column**: "Tanggal Donasi"
- **Monetary Column**: "Jumlah Donasi (IDR)"
- **Category Column**: "Jenis Donasi"
- **Status Column**: "Status"

## 🧠 Column Detection System

Sistem menggunakan semantic analysis untuk mendeteksi peran kolom:

### Tipe Kolom Terdeteksi

| Tipe | Keywords | Contoh |
|------|----------|--------|
| **Monetary** | amount, total, nominal, dana, donasi, rupiah, harga | Jumlah Donasi, Total, Nominal |
| **Quantity** | qty, jumlah, mushaf, unit, count | Jumlah Mushaf, Qty, Unit |
| **Date** | date, tanggal, waktu, created | Tanggal, Waktu Donasi |
| **Status** | status, verified, valid, terverifikasi | Status Verifikasi, Confirmed |
| **Category** | type, jenis, kategori, category | Jenis Donasi, Tipe |
| **Text** | fallback | Nama, Deskripsi |

### Override Manual (Optional)

Jika deteksi otomatis tidak akurat, override di `lib/config.ts`:

```typescript
COLUMN_OVERRIDES: {
  monetary: "Jumlah Donasi",
  quantity: "Jumlah Mushaf",
  date: "Tanggal Donasi",
  category: "Jenis Donasi",
  status: "Status Verifikasi"
}
```

## 🎨 Customization

### Ubah Warna

Edit `tailwind.config.js`:

```javascript
colors: {
  navy: { 900: '#1a1f3a', 950: '#0f1219' },
  gold: { 400: '#d4af37', 500: '#c9a961' }
}
```

### Ubah Organisasi

Edit `lib/config.ts`:

```typescript
ORG_NAME: 'Donasi Al-Qur\'an',
ORG_DESCRIPTION: 'Deskripsi organisasi',
ORG_EMAIL: 'contact@example.com'
```

## 📈 Features Configuration

Di `lib/config.ts`:

```typescript
FEATURES: {
  enableCharts: true,        // Tampilkan grafik
  enableFilters: true,       // Tampilkan filter
  enableSearch: true,        // Tampilkan pencarian
  enableAnonymization: false, // Anonimkan donor
  enableCaching: true        // Cache data client-side
}
```

## 🔒 Security & Privacy

- ✅ **Read-only**: Hanya membaca data dari Google Sheets
- ✅ **No Backend**: Tidak ada server untuk menyimpan data
- ✅ **No Auth**: Data bersifat publik dan tidak memerlukan login
- ✅ **Client-side Only**: Semua proses terjadi di browser
- ✅ **HTTPS Only**: Koneksi terenkripsi

## 📱 Responsive Design

- Mobile-first approach
- Horizontal scroll untuk tabel di mobile
- Touch-friendly interface
- Optimized viewport

## ⚡ Performance

- Minimal JavaScript bundle
- Client-side caching (5 min default)
- Image optimization
- CSS-in-JS minimal
- Lazy loading components

## 🐛 Error Handling

- Graceful degradation jika sheet kosong
- Error boundary untuk crash prevention
- Friendly error messages dalam Bahasa Indonesia
- Data validation sebelum display

## 📚 File Structure

```
donasi-alquran-2026/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Global styles
│   └── dashboard/
│       ├── page.tsx         # Dashboard server
│       └── DashboardClient.tsx
├── components/
│   ├── ErrorBoundary.tsx
│   ├── SummaryCard.tsx
│   ├── DataTable.tsx
│   └── DynamicChart.tsx
├── lib/
│   ├── types.ts             # TypeScript types
│   ├── config.ts            # Configuration
│   ├── sheetFetcher.ts      # Google Sheets API
│   ├── columnDetection.ts   # Semantic detection
│   ├── summaryCalculator.ts # Calculations
│   └── formatter.ts         # Value formatting
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

```bash
vercel deploy
```

### Deploy ke Platform Lain

- Netlify
- GitHub Pages
- AWS Amplify
- Firebase Hosting

## 🤝 Contributing

Kontribusi dipersilahkan! Untuk perubahan besar, buka issue terlebih dahulu untuk diskusi.

## 📄 License

MIT License - Bebas digunakan untuk tujuan komersial dan non-komersial.

## 🙏 Doa

Semoga platform ini menjadi sarana untuk meningkatkan transparansi, kepercayaan, dan kesuksesan program donasi Al-Qur'an. Baik bagi semua pihak yang berkontribusi dan menerima manfaat dari program ini.

---

**Built with ❤️ for transparent charity**

---

## FAQ

### Q: Bagaimana jika Google Sheets tidak bisa diakses?

A: Periksa:
1. Sheet ID benar di env variable
2. Sheet di-share dengan akses "Anyone with the link can view"
3. Internet connection stabil

### Q: Bisakah saya menambah/menghapus kolom?

A: **Ya**, sistem sepenuhnya dinamis. Tambah/hapus kolom tanpa perlu update kode.

### Q: Berapa sering data diperbarui?

A: Setiap 5 menit (configurable di `lib/config.ts`).

### Q: Apakah ada cost untuk deploy?

A: Tidak. Vercel free tier cukup untuk aplikasi ini. Google Sheets juga gratis untuk publik.

### Q: Bagaimana data diproteksi?

A: Data hanya dibaca dari Google Sheets publik. Tidak ada database atau penyimpanan data di server.

---

Untuk pertanyaan lebih lanjut, hubungi tim kami.
