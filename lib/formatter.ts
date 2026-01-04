/**
 * Value formatting utilities
 * Handles currency, dates, booleans, and other types
 */

/**
 * Format a value as Indonesian Rupiah
 */
export function formatCurrency(value: number | null): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }

  try {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `Rp ${Math.round(value).toLocaleString('id-ID')}`;
  }
}

/**
 * Format a value as a date
 */
export function formatDate(value: string | number | null): string {
  if (!value) return '-';

  try {
    let date: Date;

    if (typeof value === 'number') {
      // Google Sheets serial date format
      date = new Date((value - 25567) * 86400 * 1000);
    } else if (typeof value === 'string' && value.startsWith('Date(')) {
      // Handle Google Sheets JavaScript date format: Date(2026,0,4)
      const match = value.match(/Date\((\d+),(\d+),(\d+)\)/);
      if (match) {
        const [, year, month, day] = match;
        date = new Date(parseInt(year), parseInt(month), parseInt(day));
      } else {
        date = new Date(value);
      }
    } else {
      date = new Date(value);
    }

    if (isNaN(date.getTime())) return value.toString();

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return value.toString();
  }
}

/**
 * Format a value as a number with thousand separators
 */
export function formatNumber(value: number | null): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }

  try {
    return new Intl.NumberFormat('id-ID').format(Math.round(value));
  } catch {
    return value.toString();
  }
}

/**
 * Format a percentage
 */
export function formatPercent(value: number | null): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }

  return (Math.round(value * 100) / 100).toLocaleString('id-ID') + '%';
}

/**
 * Format boolean or yes/no values
 */
export function formatBoolean(value: string | boolean | null): string {
  if (!value) return 'Tidak';

  const str = String(value).toLowerCase().trim();
  if (['yes', 'true', '1', 'ya', 'benar', 'valid', 'terverifikasi'].includes(str)) {
    return 'Ya';
  }
  if (['no', 'false', '0', 'tidak', 'salah', 'invalid', 'belum'].includes(str)) {
    return 'Tidak';
  }

  return String(value);
}

/**
 * Intelligently format a value based on its likely type
 */
export function formatValue(value: string | number | null, columnType?: string): string {
  if (value === null || value === undefined) {
    return '-';
  }

  // Detect type by content if not specified
  if (!columnType) {
    const str = String(value).toLowerCase().trim();

    // Check for boolean
    if (['yes', 'no', 'true', 'false', 'ya', 'tidak', 'benar', 'salah'].includes(str)) {
      return formatBoolean(String(value));
    }

    // Check for date
    if (!isNaN(Date.parse(String(value)))) {
      return formatDate(String(value));
    }

    // Check for percentage
    if (str.includes('%')) {
      return value.toString();
    }

    // Check for numeric
    if (typeof value === 'number' && isFinite(value)) {
      return formatNumber(value);
    }
  }

  // Format based on detected type
  switch (columnType?.toLowerCase()) {
    case 'monetary':
    case 'currency':
    case 'amount':
      return formatCurrency(typeof value === 'string' ? parseFloat(value) : (value as number));

    case 'quantity':
    case 'number':
      return formatNumber(typeof value === 'string' ? parseFloat(value) : (value as number));

    case 'date':
      return formatDate(String(value));

    case 'boolean':
    case 'status':
      return formatBoolean(String(value));

    case 'percentage':
      return formatPercent(typeof value === 'string' ? parseFloat(value) : (value as number));

    default:
      return String(value);
  }
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
