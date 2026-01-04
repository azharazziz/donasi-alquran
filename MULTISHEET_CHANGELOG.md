# 🎉 Update Multi-Sheet & Gallery Feature

Dokumentasi fitur baru multi-sheet dan gallery untuk Donasi Al-Qur'an transparency website.

## ✨ Fitur Baru

### 1️⃣ **Multi-Sheet Support**
Website sekarang mendukung 4 jenis sheet berbeda dengan satu Spreadsheet Google:

| Sheet | Icon | Deskripsi |
|-------|------|-----------|
| **📥 Donasi Masuk** | 📥 | Catatan donasi yang diterima dari donor |
| **💸 Pengeluaran** | 💸 | Catatan biaya operasional & administrasi |
| **🤝 Penyaluran** | 🤝 | Laporan distribusi donasi ke penerima manfaat |
| **📸 Galeri** | 📸 | Bukti pengiriman & dokumentasi penyaluran |

### 2️⃣ **Navigation Menu**
Di top dashboard, ada 4 tab yang bisa diklik untuk switch antar sheet:
```
[📥 Donasi Masuk] | [💸 Pengeluaran] | [🤝 Penyaluran] | [📸 Galeri]
```

### 3️⃣ **Gallery (Galeri)**
Halaman khusus untuk menampilkan bukti pengiriman donasi dengan fitur:
- ✅ Grid layout responsif (1-4 kolom)
- ✅ Lightbox viewer untuk melihat gambar besar
- ✅ Metadata per gambar (tanggal, kategori, keterangan)
- ✅ Sorting otomatis by date (terbaru pertama)
- ✅ Error handling jika gambar rusak/hilang

## 🚀 Quick Start

### Step 1: Siapkan Google Spreadsheet

**Buat 1 Spreadsheet dengan 4 tabs:**

```
Spreadsheet: "Donasi Al-Qur'an"
├── Sheet: "Donasi Masuk"
├── Sheet: "Pengeluaran"
├── Sheet: "Penyaluran"
└── Sheet: "Galeri" (optional, bisa di spreadsheet terpisah)
```

**Format Tab "Donasi Masuk":**
```
Tanggal | Donatur | Jumlah | Kategori | Metode | Catatan
--------|---------|--------|----------|--------|--------
2025-01-15 | Ahmad | 500000 | Mushaf | Transfer | 10 Mushaf
2025-01-14 | Siti   | 1000000| Program| Tunai   | Rutin
```

**Format Tab "Pengeluaran":**
```
Tanggal | Uraian | Jumlah | Kategori | Penerima | Catatan
--------|--------|--------|----------|----------|--------
2025-01-15| Beli Mushaf | 1500000 | Mushaf | Supplier | OK
2025-01-14| Biaya Admin | 50000 | Operasional| BRI | Bulanan
```

**Format Tab "Penyaluran":**
```
Tanggal | Penerima | Jumlah | Kategori | Bukti | Catatan
--------|----------|--------|----------|-------|--------
2025-01-15| Pondok Pesantren | 10 | Mushaf | URL foto | Serah terima OK
2025-01-14| Panti Asuhan | 5 | Mushaf | URL foto | Anak senang
```

**Format Tab "Galeri":**
```
Gambar URL | Keterangan | Tanggal | Kategori
------------|-----------|---------|----------
https://...| Penyerahan ke Pesantren | 2025-01-15 | Pendidikan
https://...| Foto penerima | 2025-01-14 | Dokumentasi
```

### Step 2: Share Spreadsheet

1. Click **Share** button
2. Change to **"Anyone with the link"**
3. Set permission: **Viewer** (read-only)
4. Copy spreadsheet URL

### Step 3: Update `.env.local`

Extract Sheet ID dari URL:
```
URL: https://docs.google.com/spreadsheets/d/ABC123XYZ456/edit
Sheet ID:                              ABC123XYZ456
```

Edit `.env.local`:
```env
# Main spreadsheet (with Donasi Masuk, Pengeluaran, Penyaluran tabs)
NEXT_PUBLIC_SHEET_ID=ABC123XYZ456
NEXT_PUBLIC_SHEET_NAME=Sheet1

# Tab names (harus match nama di spreadsheet Anda)
NEXT_PUBLIC_DONATIONS_IN_SHEET=Donasi Masuk
NEXT_PUBLIC_EXPENSES_SHEET=Pengeluaran
NEXT_PUBLIC_DISTRIBUTION_SHEET=Penyaluran

# Gallery (optional - bisa di spreadsheet terpisah atau tab yang sama)
NEXT_PUBLIC_GALLERY_SPREADSHEET_ID=ABC123XYZ456

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 4: Test Locally

```bash
npm run dev
```

Visit:
- Landing: http://localhost:3001/
- Dashboard: http://localhost:3001/dashboard?sheet=donations-in
- Galeri: http://localhost:3001/gallery

### Step 5: Deploy

```bash
git add .
git commit -m "Add multi-sheet and gallery support"
git push

# Then deploy ke Vercel/Netlify
```

## 📋 File Structure

**Files Added:**
```
components/
├── SheetSelector.tsx       ← Menu navigation untuk switch sheets
└── Gallery.tsx             ← Gallery component dengan lightbox

app/
├── gallery/
│   ├── page.tsx           ← Gallery page (fetch dari spreadsheet)
│   └── layout.tsx         ← Gallery layout
└── dashboard/
    ├── page.tsx           ← Updated: support sheet query param
    └── DashboardClient.tsx ← Updated: render SheetSelector

lib/
└── config.ts              ← Updated: SHEETS, SHEET_MAPPING

.env.local                 ← Updated: new env vars for multi-sheet
MULTISHEET_GUIDE.md        ← Detailed guide (baca ini!)
```

## 🔧 Configuration Details

### Multi-Sheet Environment Variables

```env
# Primary spreadsheet ID (all 3 data sheets)
NEXT_PUBLIC_SHEET_ID=your_sheet_id

# Tab names dalam spreadsheet
NEXT_PUBLIC_DONATIONS_IN_SHEET=Donasi Masuk
NEXT_PUBLIC_EXPENSES_SHEET=Pengeluaran
NEXT_PUBLIC_DISTRIBUTION_SHEET=Penyaluran

# Gallery (boleh same spreadsheet atau separate)
NEXT_PUBLIC_GALLERY_SPREADSHEET_ID=your_gallery_sheet_id
```

### Column Name Detection

System **otomatis mendeteksi kolom** berdasarkan nama. Gunakan nama yang intuitif:

- **Amount**: `Jumlah`, `Nominal`, `Amount`, `Rupiah`
- **Date**: `Tanggal`, `Tgl`, `Date`, `Tanggal Donasi`
- **Category**: `Kategori`, `Jenis`, `Category`, `Type`
- **Quantity**: `Qty`, `Jumlah Item`, `Quantity`

Untuk Gallery:
- **Image URL**: `Gambar URL`, `Image`, `URL`, `Foto Link`
- **Caption**: `Keterangan`, `Caption`, `Deskripsi`
- **Date**: `Tanggal`, `Date`
- **Category**: `Kategori`, `Category`

## 📊 Dashboard Features Per Sheet

Setiap sheet di dashboard menampilkan:

✅ **Summary Cards**
- Total Jumlah
- Item Count
- Date Range
- Data Completion Status

✅ **Charts**
- Line Chart (time series jika ada tanggal)
- Pie Chart (kategori breakdown jika ada kategori)
- Bar Chart (amount comparison)

✅ **Filters**
- Text search (semua kolom)
- Date range picker (jika ada kolom tanggal)
- Category filter (jika ada kategori)

✅ **Data Table**
- Semua kolom ditampilkan
- Auto-formatting (currency, dates, dll)
- Horizontal scroll di mobile

## 🖼️ Gallery Features

Galeri khusus untuk bukti pengiriman donasi:

✅ **Grid Display**
- Responsive: 1 kolom (mobile), 2-3 (tablet), 4 (desktop)
- Hover effects
- Badge untuk tanggal & kategori

✅ **Lightbox Viewer**
- Click gambar → lihat full size
- Metadata display (tanggal, kategori, keterangan)
- Close button

✅ **Error Handling**
- Broken images: show placeholder
- Missing URLs: skip
- Network error: graceful fallback

✅ **Sorting**
- Auto sort by date (newest first)
- Customizable in config

## 🎨 UI Components

### SheetSelector (Navigation)
```tsx
<SheetSelector currentSheet="donations-in" />
```
Menampilkan 4 tab navigation dengan icons.

### Gallery
```tsx
<Gallery images={images} />
```
Grid gallery dengan lightbox.

## 📝 Sheet Tab Names MUST Match

⚠️ **PENTING:** Nama tab di `NEXT_PUBLIC_DONATIONS_IN_SHEET` etc. harus **EXACTLY match** nama tab di spreadsheet Anda.

Jika spreadsheet punya:
- Tab: `Masuk` (not `Donasi Masuk`)

Set di `.env.local`:
```env
NEXT_PUBLIC_DONATIONS_IN_SHEET=Masuk
```

## ❌ Troubleshooting

### Gallery tidak tampil
1. Check `NEXT_PUBLIC_GALLERY_SPREADSHEET_ID` di .env.local
2. Verify tab name is exactly `"Galeri"`
3. Check kolom: `Gambar URL`, `Keterangan`, `Tanggal`, `Kategori`
4. Ensure sharing: "Anyone with the link" → Viewer

### Data tidak load di sheet
1. Check tab name di `.env.local` exactly match spreadsheet
2. Verify first row adalah header (jangan data)
3. Check sharing: "Anyone with the link"
4. Check SHEET_ID correct (copy dari URL)

### Images tidak tampil di gallery
1. URL harus direct link (ends with .jpg, .png, .gif)
2. URL must be HTTPS (not HTTP)
3. Image must be publicly accessible
4. Check browser console for errors

## 📚 More Resources

- **MULTISHEET_GUIDE.md** - Detailed step-by-step guide
- **CONFIG.md** - Configuration reference
- **ARCHITECTURE.md** - Technical details
- **README.md** - Feature overview

## 🚀 What's Next?

After setup:
1. Test locally: `npm run dev`
2. Push to GitHub
3. Deploy to Vercel
4. Monitor analytics

Optional enhancements:
- Add donation total per month chart
- Export data to PDF
- Email notifications for updates
- Social media sharing
- Multi-language support

---

**Questions?** Check MULTISHEET_GUIDE.md for comprehensive documentation!
