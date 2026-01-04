# Example Google Sheet Format

Use this as a template for your Google Sheets. Copy & paste the structure below.

## Minimal Schema

| Tanggal | Jumlah | Status |
|---------|--------|--------|
| 2026-01-01 | 500000 | Verified |
| 2026-01-02 | 1000000 | Verified |

## Complete Schema (Recommended)

| Tanggal Donasi | Nama Donatur | Jumlah Donasi (IDR) | Jenis Donasi | Jumlah Mushaf | Status Verifikasi | Catatan |
|---|---|---|---|---|---|---|
| 2026-01-01 | Donatur A | 500000 | Mushaf Al-Qur'an | 5 | Terverifikasi | Donasi untuk masjid |
| 2026-01-02 | Donatur B | 1000000 | Program Dakwah | 0 | Terverifikasi | Dukungan dakwah |
| 2026-01-03 | Donatur C | 2500000 | Mushaf Al-Qur'an | 25 | Terverifikasi | Donasi besar |
| 2026-01-04 | Donatur D | 300000 | Operasional | 0 | Belum Verifikasi | Menunggu konfirmasi |

## Column Mapping

### Automatically Detected Columns

| Original Name | Detected As | Keywords Used |
|---|---|---|
| Tanggal Donasi | Date | tanggal |
| Nama Donatur | Text | (no match) |
| Jumlah Donasi (IDR) | Monetary | nominal, donasi |
| Jenis Donasi | Category | jenis |
| Jumlah Mushaf | Quantity | jumlah |
| Status Verifikasi | Status | status, verifikasi |
| Catatan | Text | (no match) |

## System Behavior

1. **First Row = Headers**: System reads first row as column names
2. **Automatic Type Detection**: Each column is analyzed for its role
3. **Dynamic Calculations**: Totals calculated from detected numeric columns
4. **Smart Charts**: Visualizations auto-generated based on column types
5. **Flexible Columns**: Add/remove/rename columns anytime

## Adding More Data

Simply add rows below the header. The system will automatically:
- Recalculate totals
- Update charts
- Refresh summary cards
- Maintain performance

## Data Format Recommendations

### Dates
- Format: `YYYY-MM-DD` or `DD/MM/YYYY`
- Examples: `2026-01-01`, `01/01/2026`

### Currency
- Format: Numeric value (no symbols)
- Examples: `500000`, `1000000`
- Optional: Add column name with "Rupiah" or "IDR"

### Status
- Examples: `Terverifikasi`, `Verified`, `✓`, `Pending`, `Belum`

### Categories
- Examples: `Mushaf`, `Dakwah`, `Operasional`

## Features Enabled by This Schema

With the complete schema above, you'll get:

✅ **Summary Cards**:
- Total Donasi: Auto-calculated from "Jumlah Donasi (IDR)"
- Total Kuantitas: Auto-calculated from "Jumlah Mushaf"
- Item Count: 4 rows
- Status: "Skema lengkap"

✅ **Charts**:
- Time Series: Date + Amount
- Pie Chart: Category + Amount
- Bar Chart: Individual amounts

✅ **Filters**:
- Date range filter
- Text search across all columns
- Category filter (if enabled)

✅ **Table**:
- All 7 columns displayed
- Auto-formatted dates
- Auto-formatted currency
- Responsive scrolling

## Testing Your Setup

1. Create a test Google Sheet with this data
2. Share it publicly
3. Copy Sheet ID to env variables
4. Run `npm run dev`
5. Check http://localhost:3000/dashboard

You should see all cards, charts, and data populated automatically!

---

**Note**: Column names don't need to match exactly. The semantic detection system will find them based on keywords.
