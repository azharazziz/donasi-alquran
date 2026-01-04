/**
 * Dashboard client component with interactivity
 */

'use client';

import { useState, useCallback } from 'react';
import { SheetData, DetectedSchema, SummaryData, FilterState, SummaryCard as SummaryCardConfig } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/formatter';
import { CONFIG, SHEETS } from '@/lib/config';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SummaryCard } from '@/components/SummaryCard';
import { DataTable } from '@/components/DataTable';
import { DynamicChart } from '@/components/DynamicChart';
import SheetSelector from '@/components/SheetSelector';
import { DashboardHeader } from '@/components/DashboardHeader';
import { FilterPanel } from '@/components/FilterPanel';

interface SheetInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface DashboardClientProps {
  initialData: SheetData;
  initialSchema: DetectedSchema;
  initialSummary: SummaryData;
  initialDateRange: { earliest?: Date; latest?: Date };
  error: string | null;
  currentSheet?: string;
  currentSheetInfo?: SheetInfo;
}

export function DashboardClient({
  initialData,
  initialSchema,
  initialSummary,
  initialDateRange,
  error,
  currentSheet = 'donations-in',
  currentSheetInfo,
}: DashboardClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: {
      start: initialDateRange.earliest,
      end: initialDateRange.latest,
    },
    searchQuery: '',
  });

  // Get summary cards config for current sheet
  const summaryCards = CONFIG.SUMMARY_CARDS[currentSheet as keyof typeof CONFIG.SUMMARY_CARDS] || [];
  const schema = initialSchema;

  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  const handleDateRangeChange = useCallback((start?: Date, end?: Date) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { start, end },
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <DashboardHeader
        icon={currentSheetInfo?.icon || '📊'}
        title={currentSheetInfo?.name || CONFIG.ORG_NAME}
        description={currentSheetInfo?.description || 'Laporan Transparansi Data'}
      />

      {/* Sheet Navigation */}
      <SheetSelector currentSheet={currentSheet} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorBoundary>
          {error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg mb-6">
              <h3 className="text-red-900 font-semibold mb-2">⚠️ Pemberitahuan</h3>
              <p className="text-red-700">{error}</p>
              <p className="text-red-600 text-sm mt-2">
                Periksa konfigurasi Sheet ID di variabel lingkungan
              </p>
            </div>
          ) : null}

          {/* Summary Cards */}
          <div className={`grid grid-cols-1 ${getGridColumns(summaryCards.length)} gap-4 mb-8`}>
            {summaryCards.map((card, idx) => {
              const value = calculateSummaryValue(
                card,
                initialData,
                initialSummary,
                schema
              );

              return (
                <SummaryCard
                  key={idx}
                  label={card.label}
                  value={value}
                  icon={card.icon}
                  variant={card.variant}
                />
              );
            })}
          </div>

          {/* Filters - Using FilterPanel component */}
          <FilterPanel
            schema={initialSchema}
            onSearchChange={handleSearchChange}
            onDateRangeChange={handleDateRangeChange}
            searchQuery={filters.searchQuery}
            dateStart={filters.dateRange.start}
            dateEnd={filters.dateRange.end}
          />

          <div className="mt-8"></div>

          {/* Chart */}
          {CONFIG.FEATURES.enableCharts && CONFIG.CHART_CONFIGS[currentSheet as keyof typeof CONFIG.CHART_CONFIGS]?.enabled && (
            <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">
                {CONFIG.CHART_CONFIGS[currentSheet as keyof typeof CONFIG.CHART_CONFIGS]?.label || 'Visualisasi Data'}
              </h2>
              <ErrorBoundary fallback={<div className="text-gray-500 p-4">Gagal memuat grafik</div>}>
                <DynamicChart
                  data={initialData}
                  schema={initialSchema}
                  chartConfig={CONFIG.CHART_CONFIGS[currentSheet as keyof typeof CONFIG.CHART_CONFIGS]}
                  label={CONFIG.CHART_CONFIGS[currentSheet as keyof typeof CONFIG.CHART_CONFIGS]?.label}
                />
              </ErrorBoundary>
            </div>
          )}

          {/* Data Table */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Data Lengkap</h2>
            <ErrorBoundary fallback={<div className="text-gray-500 p-4">Gagal memuat tabel</div>}>
              <DataTable
                data={initialData}
                schema={initialSchema}
                maxRows={100}
                searchQuery={filters.searchQuery}
                dateRange={filters.dateRange}
              />
            </ErrorBoundary>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
              <div>
                <h4 className="font-semibold text-navy-900 mb-2">Tentang Data</h4>
                <p>
                  Data diambil dari Google Sheets dan diperbarui secara otomatis setiap 5 menit.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-navy-900 mb-2">Transparansi</h4>
                <p>
                  Laporan ini bersifat publik dan dapat diakses oleh siapa saja tanpa autentikasi.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-navy-900 mb-2">Kebijakan Privasi</h4>
                <p>
                  Data donor ditampilkan sesuai dengan konfigurasi Sheet. Tidak ada data sensitif
                  yang disimpan di server.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
              <p>
                Diperbarui: {new Date(initialSummary.lastUpdated).toLocaleString('id-ID')}
              </p>
              <p className="mt-1">
                © 2026 {CONFIG.ORG_NAME}. Platform transparansi donasi.
              </p>
              <p className="mt-2">
                Dikembangkan oleh{' '}
                <a
                  href="https://azharazziz.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-500 transition-colors"
                >
                  Azhar Azziz
                </a>
              </p>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}

/**
 * Helper function to calculate summary value based on card config
 */
function calculateSummaryValue(
  card: SummaryCardConfig,
  data: SheetData,
  summary: SummaryData,
  schema: DetectedSchema
): string {
  switch (card.type) {
    case 'monetary':
      // If columnName specified, sum that column, else use totalDonation
      if (card.columnName === 'monetary' || !card.columnName) {
        return formatCurrency(summary.totalDonation);
      }
      // Look for specific column
      const monetaryTotal = data.rows.reduce((sum, row) => {
        const val = row[card.columnName || ''];
        if (val === null) return sum;
        const num = parseFloat(String(val));
        return sum + (isNaN(num) ? 0 : num);
      }, 0);
      return formatCurrency(monetaryTotal);

    case 'quantity':
      // If columnName specified, sum that column, else use totalQuantity
      if (card.columnName === 'quantity' || !card.columnName) {
        return formatNumber(summary.totalQuantity);
      }
      const quantityTotal = data.rows.reduce((sum, row) => {
        const val = row[card.columnName || ''];
        if (val === null) return sum;
        const num = parseFloat(String(val));
        return sum + (isNaN(num) ? 0 : num);
      }, 0);
      return formatNumber(quantityTotal);

    case 'count':
      return formatNumber(data.rows.length);

    case 'custom':
    default:
      return '-';
  }
}

/**
 * Helper function to get responsive grid classes
 */
function getGridColumns(count: number): string {
  if (count <= 1) return 'md:grid-cols-1';
  if (count <= 2) return 'md:grid-cols-2';
  if (count <= 3) return 'md:grid-cols-3';
  return 'md:grid-cols-4';
}
