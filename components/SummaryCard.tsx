/**
 * Summary card component
 */

import { ReactNode } from 'react';

interface SummaryCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'accent';
  loading?: boolean;
}

export function SummaryCard({
  label,
  value,
  icon,
  variant = 'default',
  loading = false,
}: SummaryCardProps) {
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-navy-900 text-white border-none',
    accent: 'bg-gradient-to-br from-gold-400 to-gold-500 text-navy-900 border-none',
  };

  return (
    <div
      className={`rounded-lg p-6 transition-all ${variantClasses[variant]} ${
        loading ? 'animate-pulse' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${variant === 'primary' ? 'text-gold-400' : 'text-gray-600'}`}>
            {label}
          </p>
          <p className={`text-2xl font-bold mt-2 ${variant === 'primary' ? 'text-white' : 'text-navy-900'}`}>
            {loading ? 'Memuat...' : value}
          </p>
        </div>
        {icon && <div className={`text-2xl ${variant === 'primary' ? 'text-gold-400' : 'text-gold-400'}`}>{icon}</div>}
      </div>
    </div>
  );
}
