/**
 * EventFlow UI: Modal Dialog Component
 * Clean, accessible dialog with subtle Framer Motion entrance
 */

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/index.ts';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
  className,
}) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="ef-modal-root" role="dialog" aria-modal="true">
          <motion.div
            className="ef-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          <div className="ef-modal-aligner">
            <motion.div
              className={cn(
                'ef-modal-card',
                `ef-modal-card--${maxWidth}`,
                className
              )}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {(title || description) && (
                <div className="ef-modal-header">
                  <div>
                    {title && <h2 className="ef-modal-title">{title}</h2>}
                    {description && (
                      <p className="ef-modal-desc">{description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="ef-modal-close"
                    aria-label="Close dialog"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              <div className="ef-modal-body">{children}</div>

              {footer && <div className="ef-modal-footer">{footer}</div>}
            </motion.div>
          </div>

          <style>{`
            .ef-modal-root {
              position: fixed;
              inset: 0;
              z-index: var(--z-modal);
              display: flex;
              align-items: center;
              justify-content: center;
              overflow-y: auto;
              padding: var(--space-4);
            }

            .ef-modal-backdrop {
              position: fixed;
              inset: 0;
              background-color: var(--color-surface-overlay);
              backdrop-filter: blur(4px);
            }

            .ef-modal-aligner {
              position: relative;
              z-index: 1;
              width: 100%;
              display: flex;
              justify-content: center;
            }

            .ef-modal-card {
              position: relative;
              width: 100%;
              background-color: var(--color-surface);
              border: 1px solid var(--color-border-strong);
              border-radius: var(--radius-lg);
              box-shadow: var(--shadow-lg);
              display: flex;
              flex-direction: column;
              overflow: hidden;
            }

            .ef-modal-card--sm { max-width: 400px; }
            .ef-modal-card--md { max-width: 520px; }
            .ef-modal-card--lg { max-width: 680px; }
            .ef-modal-card--xl { max-width: 860px; }

            .ef-modal-header {
              padding: var(--space-5) var(--space-6);
              border-bottom: 1px solid var(--color-border);
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              gap: var(--space-4);
            }

            .ef-modal-title {
              font-size: var(--text-lg);
              font-weight: var(--font-weight-semibold);
              color: var(--color-text);
              margin: 0;
            }

            .ef-modal-desc {
              font-size: var(--text-sm);
              color: var(--color-text-muted);
              margin-top: 4px;
            }

            .ef-modal-close {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 32px;
              height: 32px;
              border-radius: var(--radius-md);
              color: var(--color-text-muted);
              transition: all var(--transition-fast);
              background: transparent;
            }
            .ef-modal-close:hover {
              background-color: var(--color-surface-hover);
              color: var(--color-text);
            }

            .ef-modal-body {
              padding: var(--space-6);
              max-height: calc(85vh - 140px);
              overflow-y: auto;
            }

            .ef-modal-footer {
              padding: var(--space-4) var(--space-6);
              border-top: 1px solid var(--color-border);
              background-color: var(--color-surface-subtle);
              display: flex;
              align-items: center;
              justify-content: flex-end;
              gap: var(--space-3);
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};
