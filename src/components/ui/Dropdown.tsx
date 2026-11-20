/**
 * EventFlow UI: Dropdown Menu Component
 * Popover menu with keyboard and click-outside support
 */

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils/index.ts';

export interface DropdownItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  dividerBefore?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn('ef-dropdown', className)}>
      <div
        className="ef-dropdown__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn('ef-dropdown__menu', `ef-dropdown__menu--${align}`)}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            role="menu"
          >
            {items.map((item) => (
              <React.Fragment key={item.id}>
                {item.dividerBefore && <div className="ef-dropdown__divider" />}
                <button
                  type="button"
                  disabled={item.disabled}
                  className={cn(
                    'ef-dropdown__item',
                    item.danger && 'ef-dropdown__item--danger'
                  )}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  role="menuitem"
                >
                  {item.icon && (
                    <span className="ef-dropdown__item-icon">{item.icon}</span>
                  )}
                  <span className="ef-dropdown__item-label">{item.label}</span>
                </button>
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .ef-dropdown {
          position: relative;
          display: inline-flex;
        }

        .ef-dropdown__trigger {
          display: inline-flex;
          cursor: pointer;
        }

        .ef-dropdown__menu {
          position: absolute;
          top: calc(100% + 6px);
          z-index: var(--z-dropdown);
          min-width: 180px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border-strong);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 4px;
          display: flex;
          flex-direction: column;
        }

        .ef-dropdown__menu--right {
          right: 0;
        }

        .ef-dropdown__menu--left {
          left: 0;
        }

        .ef-dropdown__divider {
          height: 1px;
          background-color: var(--color-border);
          margin: 4px 0;
        }

        .ef-dropdown__item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 12px;
          font-size: var(--text-sm);
          color: var(--color-text);
          border-radius: var(--radius-sm);
          background: transparent;
          text-align: left;
          transition: background-color var(--transition-fast);
          border: none;
          cursor: pointer;
        }

        .ef-dropdown__item:hover:not(:disabled) {
          background-color: var(--color-surface-hover);
        }

        .ef-dropdown__item:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ef-dropdown__item--danger {
          color: var(--color-error-text);
        }
        .ef-dropdown__item--danger:hover:not(:disabled) {
          background-color: var(--color-error-subtle);
        }

        .ef-dropdown__item-icon {
          display: flex;
          align-items: center;
          color: var(--color-text-muted);
        }

        .ef-dropdown__item--danger .ef-dropdown__item-icon {
          color: var(--color-error-text);
        }
      `}</style>
    </div>
  );
};
