# 🚀 Quick Start Guide

## 1️⃣ Prepare Your Google Sheet

1. **Create a Google Sheet**
   - Go to https://docs.google.com/spreadsheets/
   - Create a new spreadsheet
   - Name it "Donasi Al-Qur'an" or your preferred name

2. **Add Headers (First Row)**
   ```
   Tanggal | Nama Donatur | Jumlah Donasi (IDR) | Jenis Donasi | Status
   ```

3. **Add Sample Data**
   ```
   2026-01-01 | Anon | 500000 | Mushaf | Verified
   2026-01-02 | Anon | 1000000 | Dakwah | Verified
   2026-01-03 | Anon | 2500000 | Mushaf | Verified
   ```

4. **Share Publicly**
   - Click "Share" button
   - Select "Anyone with the link can view"
   - Copy the link (contains your SHEET_ID)

5. **Extract Sheet ID from URL**
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Copy the part between `/d/` and `/edit`

## 2️⃣ Configure Your Project

Edit `.env.local`:

```env
NEXT_PUBLIC_SHEET_ID=YOUR_SHEET_ID_HERE
NEXT_PUBLIC_SHEET_NAME=Sheet1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace `YOUR_SHEET_ID_HERE` with your actual Google Sheet ID.

## 3️⃣ Run Locally

```bash
npm run dev
```

Visit:
- **Home**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard

## 4️⃣ Deploy to Vercel

### Option A: Using GitHub

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/donasi-alquran.git
   git push -u origin main
   ```

2. Deploy on Vercel:
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SHEET_ID`
     - `NEXT_PUBLIC_SHEET_NAME`
     - `NEXT_PUBLIC_SITE_URL`
   - Click "Deploy"

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and your site will be live!

## 📊 Automatic Features (with proper data)

✅ **Summary Cards** - Auto-calculated from data
✅ **Time Series Chart** - If date + amount columns exist
✅ **Pie Chart** - If category + amount columns exist
✅ **Bar Chart** - Visual representation of amounts
✅ **Data Table** - Auto-formatted, searchable
✅ **Date Range Filter** - If date column exists
✅ **Keyword Search** - Across all columns

## 🎨 Customization

### Change Organization Name

Edit `lib/config.ts`:
```typescript
ORG_NAME: 'Your Organization Name',
ORG_DESCRIPTION: 'Your description',
ORG_EMAIL: 'your-email@example.com',
```

### Change Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  navy: { 900: '#1a1f3a', 950: '#0f1219' },
  gold: { 400: '#d4af37', 500: '#c9a961' }
}
```

### Enable/Disable Features

Edit `lib/config.ts`:
```typescript
FEATURES: {
  enableCharts: true,
  enableFilters: true,
  enableSearch: true,
  enableAnonymization: false,
  enableCaching: true
}
```

## 🔧 Troubleshooting

### "Sheet kosong atau belum dapat diakses"

- ✅ Check SHEET_ID is correct
- ✅ Verify sheet is shared as "Anyone with link"
- ✅ Try opening in incognito mode
- ✅ Check internet connection

### Charts not showing

- ✅ Ensure date or category columns exist
- ✅ Verify amounts are numeric values
- ✅ Check column names match keywords

### Numbers not formatted as currency

- ✅ Use keywords in column name: "amount", "donasi", "nominal", "rupiah"
- ✅ Ensure values are numeric

## 📖 Documentation

- **README.md** - Full documentation
- **CONFIG.md** - Configuration guide
- **EXAMPLE_SHEET.md** - Sheet format examples
- **lib/types.ts** - TypeScript definitions
- **lib/config.ts** - Feature configuration

## ✅ Production Checklist

- [ ] Sheet is publicly shared
- [ ] SHEET_ID is correct
- [ ] Data is validated (no errors, correct format)
- [ ] Colors customized (if needed)
- [ ] Organization info updated
- [ ] Features configured
- [ ] Tested locally
- [ ] Deployed to Vercel
- [ ] Domain configured (optional)
- [ ] SSL certificate verified

## 🎯 Next Steps

1. ✅ Create Google Sheet with data
2. ✅ Update `.env.local` with SHEET_ID
3. ✅ Test locally with `npm run dev`
4. ✅ Customize colors and branding
5. ✅ Deploy to Vercel
6. ✅ Share the link!

## 💬 Need Help?

- Check README.md for detailed documentation
- Review CONFIG.md for configuration options
- Check EXAMPLE_SHEET.md for data structure
- Review lib/config.ts for all settings

---

**You're all set! Your transparency dashboard is ready to go!** 🎉
