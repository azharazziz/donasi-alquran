/**
 * Semantic column detection system
 * Infers column roles from header names using keyword scoring
 */

import { DetectedSchema, ColumnRole } from './types';

interface KeywordSet {
  keywords: string[];
  type: ColumnRole['type'];
  weight: number;
}

const KEYWORD_SETS: KeywordSet[] = [
  {
    type: 'monetary',
    keywords: [
      'amount',
      'total',
      'nominal',
      'dana',
      'donasi',
      'biaya',
      'cost',
      'rupiah',
      'idr',
      'harga',
      'nilai',
      'price',
      'payment',
    ],
    weight: 1.0,
  },
  {
    type: 'quantity',
    keywords: [
      'quantity',
      'qty',
      'jumlah',
      'mushaf',
      'unit',
      'count',
      'num',
      'banyak',
      'pcs',
      'pieces',
    ],
    weight: 0.95,
  },
  {
    type: 'date',
    keywords: [
      'date',
      'tanggal',
      'waktu',
      'time',
      'created',
      'updated',
      'tgl',
      'datetime',
      'timestamp',
    ],
    weight: 0.9,
  },
  {
    type: 'status',
    keywords: [
      'status',
      'verified',
      'confirm',
      'valid',
      'state',
      'terverifikasi',
      'dikonfirmasi',
      'validasi',
      'approval',
    ],
    weight: 0.85,
  },
  {
    type: 'category',
    keywords: [
      'type',
      'jenis',
      'kategori',
      'category',
      'kind',
      'class',
      'group',
      'grouping',
    ],
    weight: 0.8,
  },
];

/**
 * Normalize header name for semantic matching
 * - lowercase
 * - remove spaces, underscores, hyphens
 */
function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .replace(/[\s_\-]/g, '')
    .replace(/[^\w]/g, '');
}

/**
 * Calculate confidence score for a header-role pair
 */
function scoreColumn(normalizedHeader: string, keywords: string[]): number {
  if (!normalizedHeader || keywords.length === 0) return 0;

  let maxScore = 0;

  keywords.forEach((keyword) => {
    const normalized = normalizeHeader(keyword);
    const headerLen = normalizedHeader.length;
    const keywordLen = normalized.length;

    // Exact match
    if (normalizedHeader === normalized) {
      maxScore = Math.max(maxScore, 1.0);
      return;
    }

    // Contains match
    if (normalizedHeader.includes(normalized) || normalized.includes(normalizedHeader)) {
      maxScore = Math.max(maxScore, 0.8);
      return;
    }

    // Levenshtein distance based similarity
    const distance = levenshteinDistance(normalizedHeader, normalized);
    const maxLen = Math.max(headerLen, keywordLen);
    const similarity = 1 - distance / maxLen;

    if (similarity > 0.6) {
      maxScore = Math.max(maxScore, similarity * 0.7);
    }
  });

  return maxScore;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Detect all column roles with confidence scores
 */
export function detectColumns(headers: string[]): DetectedSchema {
  const columns: ColumnRole[] = [];
  const normalizedHeaders = headers.map(normalizeHeader);

  // Score each header against all keyword sets
  normalizedHeaders.forEach((normalizedHeader, index) => {
    const scores: Array<{ type: ColumnRole['type']; score: number; weight: number }> = [];

    KEYWORD_SETS.forEach((keywordSet) => {
      const score = scoreColumn(normalizedHeader, keywordSet.keywords);
      if (score > 0) {
        scores.push({
          type: keywordSet.type,
          score: score * keywordSet.weight,
          weight: keywordSet.weight,
        });
      }
    });

    // Sort by score and add detected roles
    scores.sort((a, b) => b.score - a.score);

    scores.forEach((s) => {
      columns.push({
        type: s.type,
        columnName: headers[index],
        confidence: s.score,
      });
    });

    // If no keywords matched, default to text
    if (scores.length === 0) {
      columns.push({
        type: 'text',
        columnName: headers[index],
        confidence: 0.1,
      });
    }
  });

  // Find best candidate for each role
  const primaryByType = new Map<ColumnRole['type'], ColumnRole>();

  columns
    .sort((a, b) => b.confidence - a.confidence)
    .forEach((col) => {
      if (!primaryByType.has(col.type)) {
        primaryByType.set(col.type, col);
      }
    });

  const schema: DetectedSchema = { columns };

  // Populate primary columns
  const primaryMonetary = primaryByType.get('monetary');
  if (primaryMonetary) schema.primaryMonetary = primaryMonetary.columnName;

  const primaryQuantity = primaryByType.get('quantity');
  if (primaryQuantity) schema.primaryQuantity = primaryQuantity.columnName;

  const primaryDate = primaryByType.get('date');
  if (primaryDate) schema.primaryDate = primaryDate.columnName;

  const primaryCategory = primaryByType.get('category');
  if (primaryCategory) schema.primaryCategory = primaryCategory.columnName;

  return schema;
}

/**
 * Get all columns of a specific type
 */
export function getColumnsByType(schema: DetectedSchema, type: ColumnRole['type']): string[] {
  return schema.columns
    .filter((col) => col.type === type && col.confidence > 0.5)
    .map((col) => col.columnName);
}
