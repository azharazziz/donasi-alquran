/**
 * Dashboard server component - fetches and displays data
 */

import { SheetData, DetectedSchema, SummaryData } from '@/lib/types';
import { fetchSheetData } from '@/lib/sheetFetcher';
import { detectColumns } from '@/lib/columnDetection';
import { calculateSummary, calculateDateRange } from '@/lib/summaryCalculator';
import { CONFIG, SHEETS } from '@/lib/config';
import { DashboardClient } from './DashboardClient';

export const revalidate = 300; // Revalidate every 5 minutes

interface DashboardPageProps {
  searchParams: {
    sheet?: string;
  };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const currentSheetId = searchParams.sheet || 'donations-in';
  const currentSheet = Object.values(SHEETS).find(s => s.id === currentSheetId) || Object.values(SHEETS)[0];
  const sheetName = CONFIG.SHEET_MAPPING[currentSheetId as keyof typeof CONFIG.SHEET_MAPPING] || CONFIG.SHEET_NAME;

  let data: SheetData = { headers: [], rows: [] };
  let schema: DetectedSchema = { columns: [] };
  let summary: SummaryData = {
    totalDonation: 0,
    totalQuantity: 0,
    lastUpdated: new Date().toISOString(),
    itemCount: 0,
    dataComplete: false,
    detectionStatus: 'Memuat...',
  };
  let dateRange: { earliest?: Date; latest?: Date } = {};
  let error: string | null = null;

  try {
    // Fetch sheet data with selected sheet
    data = await fetchSheetData(CONFIG.SHEET_ID, sheetName);

    if (data.rows.length === 0) {
      error = 'Sheet kosong atau belum dapat diakses';
    } else {
      // Detect columns
      schema = detectColumns(data.headers);

      // Apply column overrides if configured
      if (CONFIG.COLUMN_OVERRIDES.monetary) {
        schema.primaryMonetary = CONFIG.COLUMN_OVERRIDES.monetary;
      }
      if (CONFIG.COLUMN_OVERRIDES.quantity) {
        schema.primaryQuantity = CONFIG.COLUMN_OVERRIDES.quantity;
      }
      if (CONFIG.COLUMN_OVERRIDES.date) {
        schema.primaryDate = CONFIG.COLUMN_OVERRIDES.date;
      }
      if (CONFIG.COLUMN_OVERRIDES.category) {
        schema.primaryCategory = CONFIG.COLUMN_OVERRIDES.category;
      }

      // Calculate summary
      summary = calculateSummary(data, schema);

      // Calculate date range
      dateRange = calculateDateRange(data, schema.primaryDate);
    }
  } catch (err) {
    error = `Error memuat data: ${err instanceof Error ? err.message : 'Unknown error'}`;
    console.error('Dashboard error:', err);
  }

  return (
    <DashboardClient 
      initialData={data} 
      initialSchema={schema} 
      initialSummary={summary}
      initialDateRange={dateRange}
      error={error}
      currentSheet={currentSheetId}
      currentSheetInfo={currentSheet}
    />
  );
}
