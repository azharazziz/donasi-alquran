/**
 * Summary calculation engine
 * Detects and sums monetary and quantity columns
 */

import { SheetData, DetectedSchema, SummaryData } from './types';
import { getColumnsByType } from './columnDetection';

/**
 * Parse a value as a number, handling various formats
 */
function parseNumeric(value: string | number | null): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleaned = value
      .replace(/[^\d.,\-]/g, '') // Remove non-numeric except . , -
      .replace(/\./g, '') // Remove thousand separators
      .replace(',', '.');

    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

/**
 * Parse a value as a date
 */
function parseDate(value: string | number | null): Date | null {
  if (!value) return null;

  if (typeof value === 'number') {
    // Google Sheets serial date format
    const date = new Date((value - 25567) * 86400 * 1000);
    return isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(value as string);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Calculate total from a monetary column
 */
function calculateMonetaryTotal(data: SheetData, columnName: string): number {
  let total = 0;

  data.rows.forEach((row) => {
    const value = row[columnName];
    total += parseNumeric(value);
  });

  return total;
}

/**
 * Calculate total from a quantity column
 */
function calculateQuantityTotal(data: SheetData, columnName: string): number {
  let total = 0;

  data.rows.forEach((row) => {
    const value = row[columnName];
    total += parseNumeric(value);
  });

  return total;
}

/**
 * Generate comprehensive summary
 */
export function calculateSummary(
  data: SheetData,
  schema: DetectedSchema
): SummaryData {
  const itemCount = data.rows.length;
  let totalDonation = 0;
  let totalQuantity = 0;

  // Sum all monetary columns with confidence > 0.5
  if (schema.primaryMonetary && data.rows.length > 0) {
    try {
      totalDonation = calculateMonetaryTotal(data, schema.primaryMonetary);
    } catch (error) {
      console.warn('Error calculating monetary total:', error);
    }
  }

  // Sum all quantity columns
  if (schema.primaryQuantity && data.rows.length > 0) {
    try {
      totalQuantity = calculateQuantityTotal(data, schema.primaryQuantity);
    } catch (error) {
      console.warn('Error calculating quantity total:', error);
    }
  }

  // Determine data completeness
  const dataComplete = !!(schema.primaryMonetary || schema.primaryQuantity) || itemCount > 0;

  // Get detection status
  let detectionStatus = '';
  const detectedTypes = new Set(schema.columns.map((col) => col.type));

  if (detectedTypes.size === 0) {
    detectionStatus = 'Tidak ada kolom terdeteksi';
  } else if (schema.primaryMonetary && schema.primaryQuantity) {
    detectionStatus = 'Skema lengkap';
  } else if (schema.primaryMonetary || schema.primaryQuantity) {
    detectionStatus = 'Skema parsial';
  } else {
    detectionStatus = 'Skema minimal';
  }

  return {
    totalDonation,
    totalQuantity,
    lastUpdated: new Date().toISOString(),
    itemCount,
    dataComplete,
    detectionStatus,
  };
}

/**
 * Calculate date range from data
 */
export function calculateDateRange(
  data: SheetData,
  dateColumnName?: string
): { earliest?: Date; latest?: Date } {
  if (!dateColumnName || data.rows.length === 0) {
    return {};
  }

  let earliest: Date | null = null;
  let latest: Date | null = null;

  data.rows.forEach((row) => {
    const value = row[dateColumnName];
    const date = parseDate(value);

    if (date) {
      if (!earliest || date < earliest) earliest = date;
      if (!latest || date > latest) latest = date;
    }
  });

  return { earliest: earliest || undefined, latest: latest || undefined };
}
