/**
 * EventFlow Shared: DataTable Component
 * Reusable data table with empty state, headers, and clean rows
 */

import React from 'react';
import { EmptyState } from '@/components/ui/EmptyState.tsx';
import { cn } from '@/lib/utils/index.ts';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'There is currently no data to display.',
  className,
}: DataTableProps<T>) {
  if (!isLoading && data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        className={className}
      />
    );
  }

  return (
    <div className={cn('ef-table-wrapper', className)}>
      <table className="ef-table">
        <thead>
          <tr className="ef-table__header-row">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width, textAlign: col.align || 'left' }}
                className="ef-table__th"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={keyExtractor(row, idx)}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'ef-table__row',
                onRowClick && 'ef-table__row--clickable'
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{ textAlign: col.align || 'left' }}
                  className="ef-table__td"
                >
                  {col.render
                    ? col.render(row, idx)
                    : (row as Record<string, unknown>)[col.key] != null
                    ? String((row as Record<string, unknown>)[col.key])
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .ef-table-wrapper {
          width: 100%;
          overflow-x: auto;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }

        .ef-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }

        .ef-table__header-row {
          background-color: var(--color-surface-subtle);
          border-bottom: 1px solid var(--color-border);
        }

        .ef-table__th {
          padding: 12px 18px;
          font-size: var(--text-xs);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          white-space: nowrap;
        }

        .ef-table__row {
          border-bottom: 1px solid var(--color-border-subtle);
          transition: background-color var(--transition-fast);
        }

        .ef-table__row:last-child {
          border-bottom: none;
        }

        .ef-table__row--clickable {
          cursor: pointer;
        }

        .ef-table__row:hover {
          background-color: var(--color-surface-hover);
        }

        .ef-table__td {
          padding: 14px 18px;
          color: var(--color-text);
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}
