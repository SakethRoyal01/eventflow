/**
 * EventFlow UI: Select Component
 * Styled native select element matching the design tokens
 */

import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/index.ts';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, id, className, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className={cn('ef-select-wrapper', className)}>
        {label && (
          <label htmlFor={selectId} className="ef-select-label">
            {label}
          </label>
        )}
        <div className="ef-select-container">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            className={cn('ef-select-field', error && 'ef-select-field--error')}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="ef-select-option"
              >
                {option.label}
              </option>
            ))}
          </select>
          <span className="ef-select-chevron" aria-hidden="true">
            <ChevronDown size={16} />
          </span>
        </div>
        {error && <p className="ef-select-error">{error}</p>}

        <style>{`
          .ef-select-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;
            width: 100%;
          }

          .ef-select-label {
            font-size: var(--text-xs);
            font-weight: var(--font-weight-medium);
            color: var(--color-text-secondary);
          }

          .ef-select-container {
            position: relative;
            display: flex;
            align-items: center;
          }

          .ef-select-field {
            width: 100%;
            height: 40px;
            padding: 0 36px 0 14px;
            background-color: var(--color-surface-subtle);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            color: var(--color-text);
            font-size: var(--text-sm);
            cursor: pointer;
            outline: none;
            appearance: none;
            transition: all var(--transition-fast);
          }

          .ef-select-field:hover:not(:disabled) {
            border-color: var(--color-border-strong);
          }

          .ef-select-field:focus {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 2px var(--color-focus-ring);
            background-color: var(--color-surface);
          }

          .ef-select-option {
            background-color: var(--color-surface);
            color: var(--color-text);
          }

          .ef-select-chevron {
            position: absolute;
            right: 12px;
            color: var(--color-text-muted);
            pointer-events: none;
            display: flex;
            align-items: center;
          }

          .ef-select-error {
            font-size: var(--text-xs);
            color: var(--color-error-text);
            margin: 0;
          }
        `}</style>
      </div>
    );
  }
);

Select.displayName = 'Select';
