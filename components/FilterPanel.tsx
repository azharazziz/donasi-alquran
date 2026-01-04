/**
 * Friendly filter panel with search and date range
 */

'use client';

import { useState } from 'react';
import { DetectedSchema } from '@/lib/types';

interface FilterPanelProps {
  schema: DetectedSchema;
  onSearchChange: (query: string) => void;
  onDateRangeChange: (start?: Date, end?: Date) => void;
  searchQuery?: string;
  dateStart?: Date;
  dateEnd?: Date;
}

export function FilterPanel({
  schema,
  onSearchChange,
  onDateRangeChange,
  searchQuery = '',
  dateStart,
  dateEnd,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClearFilters = () => {
    onSearchChange('');
    onDateRangeChange(undefined, undefined);
    setIsExpanded(false);
  };

  const formatDateInput = (date?: Date): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isFiltered = searchQuery || dateStart || dateEnd;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-3">
          <span className="text-xl">🔍</span>
          <div>
            <h3 className="font-semibold text-gray-900">Pencarian & Filter</h3>
            {isFiltered && (
              <p className="text-sm text-blue-600 mt-1">
                {searchQuery && `Cari: "${searchQuery}"`}
                {searchQuery && (dateStart || dateEnd) && ' • '}
                {dateStart && dateEnd && `${dateStart.toLocaleDateString('id-ID')} - ${dateEnd.toLocaleDateString('id-ID')}`}
                {!dateEnd && dateStart && `Dari: ${dateStart.toLocaleDateString('id-ID')}`}
              </p>
            )}
          </div>
        </div>
        <button
          className="p-2 hover:bg-gray-200 rounded transition"
          aria-label={isExpanded ? 'Tutup filter' : 'Buka filter'}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {/* Filter Controls */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Cari Teks
            </label>
            <input
              type="text"
              placeholder="Cari di semua kolom..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <p className="text-xs text-gray-500 mt-1">Mencari kata kunci di seluruh data</p>
          </div>

          {/* Date Range */}
          {schema.primaryDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Rentang Tanggal
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Dari</label>
                  <input
                    type="date"
                    value={formatDateInput(dateStart)}
                    onChange={(e) =>
                      onDateRangeChange(
                        e.target.value ? new Date(e.target.value) : undefined,
                        dateEnd
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Sampai</label>
                  <input
                    type="date"
                    value={formatDateInput(dateEnd)}
                    onChange={(e) =>
                      onDateRangeChange(
                        dateStart,
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Pilih rentang tanggal untuk filter data</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            {isFiltered && (
              <button
                onClick={handleClearFilters}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium text-sm"
              >
                ✕ Hapus Filter
              </button>
            )}
            <button
              onClick={() => setIsExpanded(false)}
              className="flex-1 px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-950 transition font-medium text-sm"
            >
              ✓ Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
