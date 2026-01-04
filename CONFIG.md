# Donasi Al-Qur'an Configuration Guide

## Environment Variables

Create `.env.local` file in the project root:

```env
# Google Sheets Configuration
NEXT_PUBLIC_SHEET_ID=1qH82r8-mXa_qPfKu1v2w3x4y5z6a7b8c9d0e1f2g3h
NEXT_PUBLIC_SHEET_NAME=Sheet1
NEXT_PUBLIC_SITE_URL=https://donasi-alquran.vercel.app

# Optional: Use CSV export URL instead of Google Sheets API
# NEXT_PUBLIC_CSV_URL=https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv
```

## Finding Your Google Sheet ID

1. Open your Google Sheet
2. Look at the URL:
   ```
   https://docs.google.com/spreadsheets/d/[YOUR_SHEET_ID]/edit
   ```
3. Copy the part between `/d/` and `/edit`

## Making Your Sheet Public

1. Click "Share" button in Google Sheets
2. Change permission to "Anyone with the link can view"
3. Copy the link (contains your SHEET_ID)

## Sheet Format

Your Google Sheet should have:

- **First row**: Column headers (names can be anything)
- **Remaining rows**: Your data

Example:

```
| Tanggal | Nama Donatur | Jumlah (IDR) | Jenis | Status |
|---------|-------------|--------------|-------|--------|
| 1/1/26  | Anon        | 500000      | Mushaf| ✓      |
| 1/2/26  | Anon        | 1000000     | Dakwah| ✓      |
```

## Advanced Configuration

Edit `lib/config.ts`:

### Organization Info

```typescript
ORG_NAME: 'Donasi Al-Qur\'an',
ORG_DESCRIPTION: 'Your description',
ORG_EMAIL: 'your-email@example.com',
SITE_TITLE: 'Your Title',
SITE_DESCRIPTION: 'Your description'
```

### Feature Flags

```typescript
FEATURES: {
  enableCharts: true,        // Show/hide charts
  enableFilters: true,       // Show/hide filters
  enableSearch: true,        // Show/hide search
  enableAnonymization: false, // Hide donor names
  enableCaching: true        // Cache data
}
```

### Column Detection

If automatic detection doesn't work, override manually:

```typescript
COLUMN_OVERRIDES: {
  monetary: "Jumlah Donasi",
  quantity: "Jumlah Mushaf",
  date: "Tanggal",
  category: "Jenis",
  status: "Status Verifikasi"
}
```

### Cache Duration

```typescript
CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
```

## Deployment to Vercel

### 1. Connect Repository

1. Push your code to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Select your repository
5. Click "Import"

### 2. Set Environment Variables

1. Go to "Settings" → "Environment Variables"
2. Add your env variables:
   - `NEXT_PUBLIC_SHEET_ID`
   - `NEXT_PUBLIC_SHEET_NAME`
   - `NEXT_PUBLIC_SITE_URL`

3. Click "Save"

### 3. Deploy

Click "Deploy" button. Your site will be live in ~2 minutes.

## Troubleshooting

### "Sheet kosong atau belum dapat diakses"

- Check SHEET_ID is correct
- Verify sheet is shared as "Anyone with link can view"
- Try opening the sheet in incognito mode

### Charts not showing

- Ensure you have date and/or category columns
- Check column headers match detection keywords

### Numbers not formatting as currency

- Ensure column contains numeric values
- Column name should contain keywords: "amount", "nominal", "donasi", "rupiah"

### Column not detected

- Check spelling of column header
- Try using keywords from detection system
- Use COLUMN_OVERRIDES as fallback

## Best Practices

1. **Keep Sheet Simple**: Use clear, consistent column names
2. **Validate Data**: Ensure numeric columns have valid numbers
3. **Regular Updates**: Update sheet regularly for fresh data
4. **Backup Data**: Keep backup of Google Sheet
5. **Monitor Performance**: Check dashboard load times
6. **Test Locally**: Test changes locally before deploying

## Security Notes

- ✅ Share sheet publicly (read-only)
- ✅ No sensitive personal data
- ✅ Use anonymization if needed
- ✅ No authentication needed
- ✅ All data processed client-side

## Support

For issues or questions:
1. Check README.md
2. Review component source code
3. Check browser console for errors
4. Verify Google Sheet is accessible

---

Happy deploying! 🚀
