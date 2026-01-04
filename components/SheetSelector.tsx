'use client';

import { SHEETS } from '@/lib/config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SheetSelectorProps {
  currentSheet?: string;
}

export default function SheetSelector({ currentSheet }: SheetSelectorProps) {
  const pathname = usePathname();
  const isDashboard = pathname.includes('/dashboard');

  // Filter out gallery from dashboard navigation - only show data sheets
  const sheetEntries = Object.entries(SHEETS).filter(([key, sheet]) => sheet.id !== 'gallery');

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-start gap-1 overflow-x-auto">
          {sheetEntries.map(([key, sheet]) => {
            const isActive = isDashboard && currentSheet === sheet.id;

            const href = `/dashboard?sheet=${sheet.id}`;

            return (
              <Link
                key={sheet.id}
                href={href}
                className={`inline-flex items-center gap-2 px-4 py-2 whitespace-nowrap rounded-lg transition-all ${
                  isActive
                    ? 'bg-navy-900 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={sheet.description}
              >
                <span className="text-xl">{sheet.icon}</span>
                <span className="hidden sm:inline text-sm">{sheet.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
