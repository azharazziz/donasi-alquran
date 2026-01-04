/**
 * Configuration for the application
 * Update these values to connect to your Google Sheet
 */

// Sheet definitions for multi-sheet support
export const SHEETS = {
  DONATIONS_IN: {
    id: 'donations-in',
    name: 'Donasi Masuk',
    description: 'Laporan donasi yang masuk',
    icon: '📥',
  },
  EXPENSES: {
    id: 'expenses',
    name: 'Pengeluaran',
    description: 'Catatan pengeluaran/operasional',
    icon: '💸',
  },
  DISTRIBUTION: {
    id: 'distribution',
    name: 'Penyaluran',
    description: 'Laporan penyaluran donasi kepada penerima',
    icon: '🤝',
  },
  GALLERY: {
    id: 'gallery',
    name: 'Galeri',
    description: 'Bukti pengiriman dan dokumentasi penyaluran',
    icon: '📸',
  },
};

export const CONFIG = {
  /**
   * Google Sheets ID
   * Extract from URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   * Make sure the sheet is set to "Anyone with the link can view"
   */
  SHEET_ID: process.env.NEXT_PUBLIC_SHEET_ID || '1qH82r8-mXa_qPfKu1v2w3x4y5z6a7b8c9d0e1f2g3h',

  /**
   * Sheet tab name (default: "Sheet1")
   */
  SHEET_NAME: process.env.NEXT_PUBLIC_SHEET_NAME || 'Sheet1',

  /**
   * Multi-sheet mapping: sheet ID to sheet name mapping
   */
  SHEET_MAPPING: {
    'donations-in': process.env.NEXT_PUBLIC_DONATIONS_IN_SHEET || 'Donasi Masuk',
    'expenses': process.env.NEXT_PUBLIC_EXPENSES_SHEET || 'Pengeluaran',
    'distribution': process.env.NEXT_PUBLIC_DISTRIBUTION_SHEET || 'Penyaluran',
  },

  /**
   * Gallery configuration
   */
  GALLERY_SPREADSHEET_ID: process.env.NEXT_PUBLIC_GALLERY_SPREADSHEET_ID,
  GALLERY_SHEET_NAME: process.env.NEXT_PUBLIC_GALLERY_SHEET || 'galeri',
  GALLERY_IMAGE_COLUMN: 'Gambar Url',
  GALLERY_CAPTION_COLUMN: 'Keterangan',
  GALLERY_DATE_COLUMN: 'Tanggal',
  GALLERY_REVALIDATE: parseInt(process.env.NEXT_PUBLIC_GALLERY_REVALIDATE || '3600', 10),

  /**
   * Alternative: CSV export URL
   * If provided, will use CSV instead of Google Visualization API
   */
  CSV_URL: process.env.NEXT_PUBLIC_CSV_URL,

  /**
   * Enable debug logging
   */
  DEBUG: process.env.NODE_ENV === 'development',

  /**
   * Cache duration in milliseconds (5 minutes)
   */
  CACHE_DURATION: 5 * 60 * 1000,

  /**
   * Organization info
   */
  ORG_NAME: 'Donasi Al-Qur\'an',
  ORG_DESCRIPTION: 'Platform transparansi untuk program donasi Al-Qur\'an',
  ORG_EMAIL: 'contact@donasi-alquran.org',

  /**
   * Site metadata
   */
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://donasi-alquran.vercel.app',
  SITE_TITLE: 'Donasi Al-Qur\'an - Laporan Transparansi',
  SITE_DESCRIPTION:
    'Platform transparansi publik untuk program donasi Al-Qur\'an. Lihat laporan donor, statistik, dan dampak setiap kontribusi.',

  /**
   * Feature flags
   */
  FEATURES: {
    enableCharts: true,
    enableFilters: true,
    enableSearch: true,
    enableAnonymization: false,
    enableCaching: true,
    enableMultiSheet: true,
    enableGallery: true,
  },

  /**
   * Column name overrides (optional)
   * If your columns don't match semantic detection, override here
   */
  COLUMN_OVERRIDES: {
    monetary: '', // e.g., "Jumlah Donasi"
    quantity: '', // e.g., "Jumlah Mushaf"
    date: '', // e.g., "Tanggal Donasi"
    category: '', // e.g., "Jenis Donasi"
    status: '', // e.g., "Status Verifikasi"
  },

  /**
   * Summary cards configuration per sheet
   * Format: NEXT_PUBLIC_SUMMARY_<SHEET_ID>=label1|column1|type1|icon1,label2|column2|type2|icon2
   * Example: NEXT_PUBLIC_SUMMARY_donations_in=Total Donasi|amount|monetary|💰,Jumlah Orang|quantity|quantity|👥
   */
  SUMMARY_CARDS: {
    'donations-in': parseEnvSummaryCards(
      process.env.NEXT_PUBLIC_SUMMARY_DONATIONS_IN ||
        'Total Donasi|monetary|monetary|💰,Jumlah Item|count|count|📊,Total Kuantitas|quantity|quantity|📦'
    ),
    'expenses': parseEnvSummaryCards(
      process.env.NEXT_PUBLIC_SUMMARY_EXPENSES ||
        'Total Pengeluaran|monetary|monetary|💸,Jumlah Item|count|count|📊'
    ),
    'distribution': parseEnvSummaryCards(
      process.env.NEXT_PUBLIC_SUMMARY_DISTRIBUTION ||
        'Total Penyaluran|monetary|monetary|🤝,Jumlah Penerima|count|count|👥'
    ),
  },

  /**
   * Chart configuration per sheet
   * Format: NEXT_PUBLIC_CHART_<SHEET_ID>=enabled|type|label
   * Example: NEXT_PUBLIC_CHART_donations_in=true|line|Jumlah Donasi Harian
   */
  CHART_CONFIGS: {
    'donations-in': parseEnvChartConfig(
      process.env.NEXT_PUBLIC_CHART_DONATIONS_IN || 'true|auto|Visualisasi Donasi'
    ),
    'expenses': parseEnvChartConfig(
      process.env.NEXT_PUBLIC_CHART_EXPENSES || 'true|auto|Visualisasi Pengeluaran'
    ),
    'distribution': parseEnvChartConfig(
      process.env.NEXT_PUBLIC_CHART_DISTRIBUTION || 'true|auto|Visualisasi Penyaluran'
    ),
  },
};

/**
 * Parse summary cards from ENV string
 * Format: "label|column|type|icon,label|column|type|icon"
 */
function parseEnvSummaryCards(envValue: string) {
  if (!envValue) return [];

  return envValue.split(',').map((card) => {
    const [label, columnName, type, icon] = card.split('|');
    return {
      label: label?.trim() || 'Untitled',
      columnName: columnName?.trim() || undefined,
      type: (type?.trim() || 'custom') as 'monetary' | 'quantity' | 'count' | 'custom',
      icon: icon?.trim() || '📊',
      variant: undefined as any,
    };
  });
}

/**
 * Parse chart config from ENV string
 * Format: "enabled|type|label"
 */
function parseEnvChartConfig(envValue: string) {
  if (!envValue) {
    return { enabled: false };
  }

  const [enabled, type, label] = envValue.split('|');
  return {
    enabled: enabled?.trim() === 'true',
    type: (type?.trim() || 'auto') as 'auto' | 'line' | 'pie' | 'bar',
    label: label?.trim() || undefined,
  };
}

export function isConfigured(): boolean {
  return CONFIG.SHEET_ID !== '1qH82r8-mXa_qPfKu1v2w3x4y5z6a7b8c9d0e1f2g3h';
}
