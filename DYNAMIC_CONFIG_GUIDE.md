# Konfigurasi Dinamis - Summary Cards & Chart Per Sheet

## 📋 Ringkasan Fitur

Sistem dashboard sekarang mendukung **konfigurasi dinamis** untuk:
1. **Summary Cards** - Kartu ringkasan di atas dashboard dapat disesuaikan per sheet
2. **Chart Visualization** - Nama dan tipe grafik dapat diatur per sheet
3. **Format Tanggal** - Tanggal dari Google Sheets ditampilkan dengan format manusiawi

---

## ⚙️ Konfigurasi Environment Variables

### 1. Summary Cards Configuration

Format: `label|column|type|icon,label|column|type|icon`

**Contoh di `.env.local`:**

```env
# Donasi Masuk sheet
NEXT_PUBLIC_SUMMARY_DONATIONS_IN=Total Donasi|monetary|monetary|💰,Jumlah Item|count|count|📊,Total Kuantitas|quantity|quantity|📦

# Pengeluaran sheet
NEXT_PUBLIC_SUMMARY_EXPENSES=Total Pengeluaran|monetary|monetary|💸,Jumlah Item|count|count|📊

# Penyaluran sheet
NEXT_PUBLIC_SUMMARY_DISTRIBUTION=Total Penyaluran|monetary|monetary|🤝,Jumlah Penerima|count|count|👥
```

**Penjelasan Parameter:**

- `label`: Nama kartu yang ditampilkan
- `column`: Nama kolom atau tipe deteksi (`monetary`, `quantity`, `count`)
- `type`: Tipe data (`monetary`, `quantity`, `count`, `custom`)
- `icon`: Emoji atau icon untuk kartu

**Tipe Data yang Tersedia:**

- `monetary` - Format Rupiah, sum semua nilai di kolom monetary
- `quantity` - Format angka biasa, sum semua nilai di kolom quantity
- `count` - Jumlah baris/item dalam data

---

### 2. Chart Configuration

Format: `enabled|type|label`

**Contoh di `.env.local`:**

```env
# Donasi Masuk - auto-detect jenis grafik
NEXT_PUBLIC_CHART_DONATIONS_IN=true|auto|Visualisasi Donasi

# Pengeluaran - force pie chart
NEXT_PUBLIC_CHART_EXPENSES=true|pie|Perbandingan Pengeluaran

# Penyaluran - force bar chart
NEXT_PUBLIC_CHART_DISTRIBUTION=true|bar|Rincian Penyaluran
```

**Penjelasan Parameter:**

- `enabled`: `true` atau `false` untuk menampilkan/menyembunyikan grafik
- `type`: 
  - `auto` - Deteksi otomatis (line untuk time series, pie untuk kategori, bar untuk data biasa)
  - `line` - Grafik garis (untuk time series)
  - `pie` - Grafik pie/donut
  - `bar` - Grafik batang
- `label`: Label yang ditampilkan di legend/title grafik

---

## 🎯 Cara Menggunakan

### Skenario 1: Customisasi Summary Cards

**Target:** Hanya tampilkan "Total Donasi" dan "Jumlah Item" (hilangkan "Total Kuantitas")

**`.env.local`:**
```env
NEXT_PUBLIC_SUMMARY_DONATIONS_IN=Total Donasi|monetary|monetary|💰,Jumlah Item|count|count|📊
```

**Hasil:** Dashboard hanya menampilkan 2 kartu di atas

---

### Skenario 2: Customisasi Nama Grafik

**Target:** Ubah nama grafik dari "Visualisasi Donasi" menjadi "Grafik Donasi Harian"

**`.env.local`:**
```env
NEXT_PUBLIC_CHART_DONATIONS_IN=true|auto|Grafik Donasi Harian
```

---

### Skenario 3: Multiple Summary Cards

**Target:** Tampilkan 5 kartu untuk sheet Pengeluaran

**`.env.local`:**
```env
NEXT_PUBLIC_SUMMARY_EXPENSES=Total Pengeluaran|monetary|monetary|💸,Jumlah Transaksi|count|count|📊,Pengeluaran Operasional|monetary|monetary|⚙️,Pengeluaran Program|monetary|monetary|🎯,Total Item|count|count|📦
```

---

## 📊 Tipe Grafik dan Kapan Menggunakannya

### Auto-detect (tipe: `auto`)

Sistem akan memilih tipe grafik berdasarkan data:

1. **Line Chart** (Grafik Garis)
   - Digunakan ketika ada kolom tanggal + jumlah
   - Cocok untuk trend over time
   - Contoh: Donasi per hari

2. **Pie Chart** (Grafik Pie)
   - Digunakan ketika ada kategori + jumlah
   - Cocok untuk perbandingan proposi
   - Contoh: Donasi per kategori/jenis

3. **Bar Chart** (Grafik Batang)
   - Digunakan ketika hanya ada jumlah
   - Cocok untuk data sederhana
   - Contoh: List item dengan jumlah

---

## 🐛 Format Tanggal Fixed

**Sebelumnya:** `Date(2026,0,4)` ❌

**Sekarang:** `4 Januari 2026` ✅

Format tanggal otomatis di:
- Summary cards (last updated)
- Data table
- Chart labels (jika menggunakan time series)

---

## 📝 Default Configuration

Jika tidak ada environment variable, sistem menggunakan default:

```typescript
// Donasi Masuk
NEXT_PUBLIC_SUMMARY_DONATIONS_IN=Total Donasi|monetary|monetary|💰,Jumlah Item|count|count|📊,Total Kuantitas|quantity|quantity|📦
NEXT_PUBLIC_CHART_DONATIONS_IN=true|auto|Visualisasi Donasi

// Pengeluaran  
NEXT_PUBLIC_SUMMARY_EXPENSES=Total Pengeluaran|monetary|monetary|💸,Jumlah Item|count|count|📊
NEXT_PUBLIC_CHART_EXPENSES=true|auto|Visualisasi Pengeluaran

// Penyaluran
NEXT_PUBLIC_SUMMARY_DISTRIBUTION=Total Penyaluran|monetary|monetary|🤝,Jumlah Penerima|count|count|👥
NEXT_PUBLIC_CHART_DISTRIBUTION=true|auto|Visualisasi Penyaluran
```

---

## 🔄 Testing Perubahan

1. **Update `.env.local`** dengan konfigurasi baru
2. **Restart dev server**: `npm run dev`
3. **Lihat hasilnya** di `/dashboard`

---

## 💡 Tips & Tricks

### Tip 1: Numeric Separator
Gunakan `|` untuk separator antar kartu. Pastikan tidak ada spasi sebelum/sesudah `|`

❌ Salah: `label | column | type | icon`
✅ Benar: `label|column|type|icon`

### Tip 2: Emoji
Gunakan emoji untuk membuat dashboard lebih menarik:
- 💰 Uang/Currency
- 📊 Data/Statistics
- 📦 Paket/Item
- 👥 Orang/User
- 🎯 Target/Goal
- ⚙️ Operasional
- 🤝 Partnership/Penyaluran

### Tip 3: Label Panjang
Label bisa panjang, akan disesuaikan dengan responsive design:
```
Total Donasi Bulan Januari 2026|monetary|monetary|📊
```

---

## ✅ Checklist Implementasi

- ✅ Dynamic summary cards per sheet
- ✅ Dynamic chart configuration per sheet
- ✅ Chart label customization via ENV
- ✅ Format tanggal diperbaiki (Date(2026,0,4) → 4 Januari 2026)
- ✅ Responsive grid untuk summary cards
- ✅ Type-safe configuration dengan TypeScript
- ✅ Build successful tanpa error
- ✅ Dev server running tanpa masalah

---

## 📚 File yang Dimodifikasi

- `lib/config.ts` - Tambah SUMMARY_CARDS dan CHART_CONFIGS
- `lib/types.ts` - Tambah SummaryCard dan ChartConfig interface
- `.env.local` - Tambah konfigurasi baru
- `components/DynamicChart.tsx` - Fix format tanggal, support chart config
- `app/dashboard/DashboardClient.tsx` - Render summary cards dinamis, pass chart config

---

## 🚀 Deploy ke Vercel

Jangan lupa set environment variables di Vercel dashboard:

1. Buka project di Vercel
2. Settings → Environment Variables
3. Tambahkan semua `NEXT_PUBLIC_*` variables
4. Redeploy project

```
NEXT_PUBLIC_SUMMARY_DONATIONS_IN=...
NEXT_PUBLIC_SUMMARY_EXPENSES=...
NEXT_PUBLIC_SUMMARY_DISTRIBUTION=...
NEXT_PUBLIC_CHART_DONATIONS_IN=...
NEXT_PUBLIC_CHART_EXPENSES=...
NEXT_PUBLIC_CHART_DISTRIBUTION=...
```
