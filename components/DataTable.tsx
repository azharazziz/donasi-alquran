/**
 * Dynamic data table component
 */

'use client';

import { useMemo } from 'react';
import { SheetData, DetectedSchema } from '@/lib/types';
import { formatValue } from '@/lib/formatter';

interface DataTableProps {
  data: SheetData;
  schema: DetectedSchema;
  maxRows?: number;
  searchQuery?: string;
  onRowClick?: (rowData: Record<string, string | number | null>) => void;
}

export function DataTable({
  data,
  schema,
  maxRows = 50,
  searchQuery = '',
  onRowClick,
}: DataTableProps) {
  const filteredRows = useMemo(() => {
    if (!searchQuery) return data.rows.slice(0, maxRows);

    const query = searchQuery.toLowerCase();
    return data.rows
      .filter((row) => {
        return Object.values(row).some((val) => {
          return String(val).toLowerCase().includes(query);
        });
      })
      .slice(0, maxRows);
  }, [data.rows, searchQuery, maxRows]);

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
