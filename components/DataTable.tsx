/**
 * Dynamic data table component
 */

'use client';

import { useMemo } from 'react';
import { SheetData, DetectedSchema } from '@/lib/types';
import { formatValue } from '@/lib/formatter';

interface DateRange {
  start?: Date;
  end?: Date;
}

interface DataTableProps {
  data: SheetData;
  schema: DetectedSchema;
  maxRows?: number;
  searchQuery?: string;
  dateRange?: DateRange;
  onRowClick?: (rowData: Record<string, string | number | null>) => void;
}

/**
 * Parse date string to Date object (normalized to midnight UTC)
 * Handles Google Sheets format: Date(2026,0,4)
 */
function parseDate(dateStr: string | number | null): Date | null {
  if (!dateStr) return null;

  try {
    let date: Date | null = null;

    if (typeof dateStr === 'string') {
      // Handle Google Sheets JavaScript date format: Date(2026,0,4)
      if (dateStr.startsWith('Date(')) {
        const match = dateStr.match(/Date\((\d+),(\d+),(\d+)\)/);
        if (match) {
          const [, year, month, day] = match;
          // Create date in UTC to avoid timezone issues
          date = new Date(Date.UTC(parseInt(year), parseInt(month), parseInt(day)));
        }
      } else {
        date = new Date(dateStr);
      }
    } else if (typeof dateStr === 'number') {
      // Google Sheets serial date format
      date = new Date((dateStr - 25567) * 86400 * 1000);
    }

    if (!date || isNaN(date.getTime())) return null;

    // Normalize to midnight UTC
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  } catch {
    return null;
  }
}

export function DataTable({
  data,
  schema,
  maxRows = 50,
  searchQuery = '',
  dateRange,
  onRowClick,
}: DataTableProps) {
  const filteredRows = useMemo(() => {
    let rows = data.rows;

    // Apply date range filter
    if (dateRange?.start || dateRange?.end) {
      if (schema.primaryDate) {
        rows = rows.filter((row) => {
          const dateValue = row[schema.primaryDate!];
          const rowDate = parseDate(dateValue);

          if (!rowDate) return false;

          // Normalize filter dates to midnight UTC
          const startDate = dateRange.start ? new Date(Date.UTC(dateRange.start.getUTCFullYear(), dateRange.start.getUTCMonth(), dateRange.start.getUTCDate())) : null;
          const endDate = dateRange.end ? new Date(Date.UTC(dateRange.end.getUTCFullYear(), dateRange.end.getUTCMonth(), dateRange.end.getUTCDate())) : null;

          if (startDate && rowDate < startDate) return false;
          if (endDate && rowDate > endDate) return false;

          return true;
        });
      }
    }

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      rows = rows.filter((row) => {
        return Object.values(row).some((val) => {
          return String(val).toLowerCase().includes(query);
        });
      });
    }

    return rows.slice(0, maxRows);
  }, [data.rows, searchQuery, dateRange, schema.primaryDate, maxRows]);

  if (data.headers.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-600">Tidak ada data untuk ditampilkan</p>
      </div>
    );
  }

  // Detect column types for formatting
  const columnTypes = new Map<string, string>();
  schema.columns.forEach((col) => {
    columnTypes.set(col.columnName, col.type);
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-navy-900 text-white">
          <tr>
            {data.headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-semibold whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.length === 0 ? (
            <tr>
              <td colSpan={data.headers.length} className="px-4 py-8 text-center text-gray-500">
                Tidak ada data yang cocok
              </td>
            </tr>
          ) : (
            filteredRows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onRowClick?.(row)}
              >
                {data.headers.map((header) => {
                  const value = row[header];
                  const columnType = columnTypes.get(header);
                  const formatted = formatValue(value, columnType);

                  return (
                    <td key={`${rowIdx}-${header}`} className="px-4 py-3">
                      <span
                        title={String(value)}
                        className="inline-block max-w-xs truncate"
                      >
                        {formatted}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {filteredRows.length === maxRows && data.rows.length > maxRows && (
        <div className="p-4 text-center text-sm text-gray-600 bg-gray-50 border-t border-gray-200">
          Menampilkan {maxRows} dari {data.rows.length} data
        </div>
      )}
    </div>
  );
}
