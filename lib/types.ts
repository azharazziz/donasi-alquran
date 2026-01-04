/**
 * Core types for the transparency system
 */

export interface SheetData {
  headers: string[];
  rows: Array<Record<string, string | number | null>>;
}

export interface ColumnRole {
  type: 'monetary' | 'quantity' | 'date' | 'status' | 'category' | 'text';
  columnName: string;
  confidence: number; // 0-1 score
}

export interface DetectedSchema {
  columns: ColumnRole[];
  primaryMonetary?: string;
  primaryQuantity?: string;
  primaryDate?: string;
  primaryCategory?: string;
}

export interface SummaryCard {
  label: string;
  columnName?: string;
  type: 'monetary' | 'quantity' | 'count' | 'custom';
  icon: string;
  variant?: 'primary' | 'accent';
}

export interface SummaryData {
  totalDonation: number;
  totalQuantity: number;
  lastUpdated: string;
  itemCount: number;
  dataComplete: boolean;
  detectionStatus: string;
  // Dynamic summary data - keyed by column name
  [key: string]: any;
}

export interface FilterState {
  dateRange: {
    start?: Date;
    end?: Date;
  };
  category?: string;
  searchQuery: string;
}

export interface ChartConfig {
  enabled: boolean;
  type?: 'auto' | 'line' | 'pie' | 'bar';
  label?: string;
  dateColumn?: string;
  valueColumn?: string;
  categoryColumn?: string;
}

