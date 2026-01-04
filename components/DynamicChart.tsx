/**
 * Dynamic chart component with auto-detection
 */

'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { SheetData, DetectedSchema, ChartConfig } from '@/lib/types';

interface DynamicChartProps {
  data: SheetData;
  schema: DetectedSchema;
  maxDataPoints?: number;
  chartConfig?: ChartConfig;
  label?: string;
}

const COLORS = [
  '#1a1f3a',
  '#d4af37',
  '#c9a961',
  '#2d3561',
  '#e6c200',
  '#4a5587',
  '#f0e68c',
];

export function DynamicChart({
  data,
  schema,
  maxDataPoints = 20,
  chartConfig,
  label,
}: DynamicChartProps) {
  const chartData = useMemo(() => {
    // Determine best chart type based on available columns
    let preferredType = chartConfig?.type || 'auto';
    const hasDate = !!schema.primaryDate;
    const hasCategory = !!schema.primaryCategory;
    const hasMonetary = !!schema.primaryMonetary;

    if (!hasMonetary) {
      return { type: 'none', data: [] };
    }

    // Time series chart (date + amount)
    if ((preferredType === 'auto' || preferredType === 'line') && hasDate && hasMonetary) {
      const sortedRows = [...data.rows].sort((a, b) => {
        const dateA = parseDate(String(a[schema.primaryDate!]))?.getTime() || 0;
        const dateB = parseDate(String(b[schema.primaryDate!]))?.getTime() || 0;
        return dateA - dateB;
      });

      const limitedRows = sortedRows.slice(0, maxDataPoints);

      const timeSeriesData = limitedRows.map((row) => ({
        name: formatDateShort(String(row[schema.primaryDate!])),
        value: parseFloat(String(row[schema.primaryMonetary!])) || 0,
      }));

      return { type: 'line', data: timeSeriesData };
    }

    // Pie chart (category + amount)
    if ((preferredType === 'auto' || preferredType === 'pie') && hasCategory && hasMonetary) {
      const categoryTotals = new Map<string, number>();

      data.rows.forEach((row) => {
        const category = String(row[schema.primaryCategory!]) || 'Lainnya';
        const amount = parseFloat(String(row[schema.primaryMonetary!])) || 0;

        categoryTotals.set(category, (categoryTotals.get(category) || 0) + amount);
      });

      const pieData = Array.from(categoryTotals.entries())
        .map(([category, value]) => ({
          name: category,
          value: value,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, maxDataPoints);

      return { type: 'pie', data: pieData };
    }

    // Bar chart (just amounts)
    if ((preferredType === 'auto' || preferredType === 'bar') && hasMonetary) {
      const limitedRows = data.rows.slice(0, maxDataPoints);

      const barData = limitedRows.map((row, idx) => ({
        name: `Item ${idx + 1}`,
        value: parseFloat(String(row[schema.primaryMonetary!])) || 0,
      }));

      return { type: 'bar', data: barData };
    }

    return { type: 'none', data: [] };
  }, [data, schema, maxDataPoints, chartConfig?.type]);

  if (chartData.type === 'none' || chartData.data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg text-gray-500">
        Data tidak cukup untuk menampilkan grafik
      </div>
    );
  }

  const chartLabel = label || 'Visualisasi Data';

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        {chartData.type === 'line' ? (
          <LineChart data={chartData.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1f3a',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value) => [`Rp ${Number(value).toLocaleString('id-ID')}`, chartLabel]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#d4af37"
              dot={{ fill: '#1a1f3a' }}
              name={chartLabel}
              isAnimationActive={false}
            />
          </LineChart>
        ) : chartData.type === 'pie' ? (
          <PieChart>
            <Pie
              data={chartData.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: Rp ${Number(value).toLocaleString('id-ID')}`}
              outerRadius={120}
              fill="#d4af37"
              dataKey="value"
            >
              {chartData.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `Rp ${Number(value).toLocaleString('id-ID')}`}
            />
          </PieChart>
        ) : (
          <BarChart data={chartData.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1f3a',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value) => `Rp ${Number(value).toLocaleString('id-ID')}`}
            />
            <Bar dataKey="value" fill="#d4af37" isAnimationActive={false} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function parseDate(dateStr: string): Date | null {
  try {
    // Handle Google Sheets JavaScript date format: Date(2026,0,4)
    if (dateStr.startsWith('Date(')) {
      const match = dateStr.match(/Date\((\d+),(\d+),(\d+)\)/);
      if (match) {
        const [, year, month, day] = match;
        return new Date(parseInt(year), parseInt(month), parseInt(day));
      }
    }

    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

function formatDateShort(dateStr: string): string {
  try {
    const date = parseDate(dateStr);
    if (!date) return dateStr;
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
    }).format(date);
  } catch {
    return dateStr;
  }
}
