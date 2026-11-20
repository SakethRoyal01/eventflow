/**
 * EventFlow UI: Tooltip Component
 * Minimal and unobtrusive hover hint
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils/index.ts';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="ef-tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            className={cn('ef-tooltip', `ef-tooltip--${position}`, className)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            role="tooltip"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .ef-tooltip-wrapper {
          position: relative;
          display: inline-flex;
        }

        .ef-tooltip {
          position: absolute;
          z-index: var(--z-tooltip);
          padding: 4px 8px;
          background-color: var(--color-surface-floating);
          color: var(--color-text);
          font-size: var(--text-xs);
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          white-space: nowrap;
          pointer-events: none;
        }

        .ef-tooltip--top {
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
        }

        .ef-tooltip--bottom {
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
        }

        .ef-tooltip--left {
          right: calc(100% + 6px);
          top: 50%;
          transform: translateY(-50%);
        }

        .ef-tooltip--right {
          left: calc(100% + 6px);
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};
