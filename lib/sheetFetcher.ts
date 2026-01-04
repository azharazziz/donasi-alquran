/**
 * Utility to fetch and parse Google Sheets data
 * Uses public Google Visualization API (no authentication needed)
 */

import { SheetData } from './types';

/**
 * Fetch data from public Google Sheet using Visualization API
 * @param spreadsheetId - Google Sheets ID
 * @param sheetName - Sheet tab name (default: "Sheet1")
 * @returns Parsed sheet data with headers and rows
 */
export async function fetchSheetData(
  spreadsheetId: string,
  sheetName: string = 'Sheet1'
): Promise<SheetData> {
  try {
    // Using Google Visualization API for public sheets
    const encodedSheetName = encodeURIComponent(sheetName);
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${encodedSheetName}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();

    // Parse Google Visualization API response
    // Response format: google.visualization.Query.setResponse({...})
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\((.*)\)/);
    if (!jsonMatch) {
      throw new Error('Invalid Google Sheets response format');
    }

    const data = JSON.parse(jsonMatch[1]);

    if (data.status !== 'ok') {
      throw new Error(`Google Sheets error: ${data.message}`);
    }

    // Extract headers from first row
    const headers: string[] = [];
    if (data.table && data.table.cols) {
      headers.push(
        ...data.table.cols.map((col: any) => col.label || '')
      );
    }

    // Extract rows as key-value pairs
    const rows: Array<Record<string, string | number | null>> = [];
    if (data.table && data.table.rows) {
      data.table.rows.forEach((row: any) => {
        const rowData: Record<string, string | number | null> = {};
        headers.forEach((header: string, index: number) => {
          const cell = row.c[index];
          rowData[header] = cell?.v ?? null;
        });
        rows.push(rowData);
      });
    }

    return { headers, rows };
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return { headers: [], rows: [] };
  }
}

/**
 * Alternative: Fetch using CSV export
 * More reliable for some cases, but requires public CSV URL
 */
export async function fetchSheetDataAsCSV(csvUrl: string): Promise<SheetData> {
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const text = await response.text();
    const lines = text.trim().split('\n');

    if (lines.length === 0) {
      return { headers: [], rows: [] };
    }

    // Parse CSV headers
    const headers = parseCSVLine(lines[0]);

    // Parse rows
    const rows: Array<Record<string, string | number | null>> = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const rowData: Record<string, string | number | null> = {};

      headers.forEach((header: string, index: number) => {
        const value = values[index] || '';
        // Try to parse as number
        const numValue = parseFloat(value);
        rowData[header] = isNaN(numValue) ? value : numValue;
      });

      rows.push(rowData);
    }

    return { headers, rows };
  } catch (error) {
    console.error('Error fetching CSV data:', error);
    return { headers: [], rows: [] };
  }
}

/**
 * Parse a CSV line, handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}
