/**
 * EventFlow Shared: SearchBar Component
 * Global and contextual search input with keyboard shortcut cue
 */

import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils/index.ts';

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, shortcut = '⌘K', placeholder = 'Search events, passes, gates...', onSearch, ...props }, ref) => {
    return (
      <div className={cn('ef-searchbar', className)}>
        <span className="ef-searchbar__icon">
          <Search size={16} />
        </span>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className="ef-searchbar__input"
          onChange={(e) => onSearch?.(e.target.value)}
          {...props}
        />
        {shortcut && (
          <kbd className="ef-searchbar__shortcut" aria-hidden="true">
            {shortcut}
          </kbd>
        )}

        <style>{`
          .ef-searchbar {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            background-color: var(--color-surface-subtle);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            transition: all var(--transition-fast);
          }

          .ef-searchbar:hover {
            border-color: var(--color-border-strong);
          }

          .ef-searchbar:focus-within {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 2px var(--color-focus-ring);
            background-color: var(--color-surface);
          }

          .ef-searchbar__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 12px;
            color: var(--color-text-muted);
            pointer-events: none;
          }

          .ef-searchbar__input {
            width: 100%;
            height: 38px;
            padding: 0 10px;
            background: transparent;
            border: none;
            color: var(--color-text);
            font-size: var(--text-sm);
            outline: none;
          }

          .ef-searchbar__input::placeholder {
            color: var(--color-text-subtle);
          }

          .ef-searchbar__shortcut {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 2px 6px;
            margin-right: 8px;
            background-color: var(--color-surface-elevated);
            color: var(--color-text-muted);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-xs);
            font-size: 11px;
            font-family: var(--font-mono);
            line-height: 1;
            pointer-events: none;
          }
        `}</style>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
