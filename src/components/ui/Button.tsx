/**
 * EventFlow UI: Button Component
 * Strictly uses design tokens: Electric Violet (#834DFB), Turbo (#F0E100), Haiti (#18102B)
 */

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils/index.ts';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'ef-button',
          `ef-button--${variant}`,
          `ef-button--${size}`,
          fullWidth && 'ef-button--full',
          isLoading && 'ef-button--loading',
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="ef-button__spinner" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="ef-button__icon ef-button__icon--left">{leftIcon}</span>
        )}
        <span className="ef-button__label">{children}</span>
        {!isLoading && rightIcon && (
          <span className="ef-button__icon ef-button__icon--right">{rightIcon}</span>
        )}
        <style>{`
          .ef-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
            font-weight: var(--font-weight-medium);
            border-radius: var(--radius-md);
            border: 1px solid transparent;
            cursor: pointer;
            transition: all var(--transition-fast);
            white-space: nowrap;
            user-select: none;
            outline: none;
          }

          .ef-button:focus-visible {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
          }

          .ef-button:disabled {
            opacity: 0.45;
            cursor: not-allowed;
            pointer-events: none;
          }

          /* Sizes */
          .ef-button--sm {
            height: 32px;
            padding: 0 12px;
            font-size: var(--text-xs);
            gap: 6px;
          }
          .ef-button--md {
            height: 40px;
            padding: 0 16px;
            font-size: var(--text-sm);
            gap: 8px;
          }
          .ef-button--lg {
            height: 48px;
            padding: 0 22px;
            font-size: var(--text-base);
            gap: 10px;
          }

          .ef-button--full {
            width: 100%;
          }

          /* Variants */
          .ef-button--primary {
            background-color: var(--color-primary);
            color: var(--color-primary-contrast);
            border-color: var(--color-primary);
          }
          .ef-button--primary:hover:not(:disabled) {
            background-color: var(--color-primary-hover);
            border-color: var(--color-primary-hover);
          }
          .ef-button--primary:active:not(:disabled) {
            background-color: var(--color-primary-active);
          }

          .ef-button--secondary {
            background-color: var(--color-surface);
            color: var(--color-text);
            border-color: var(--color-border);
          }
          .ef-button--secondary:hover:not(:disabled) {
            background-color: var(--color-surface-hover);
            border-color: var(--color-border-strong);
          }

          .ef-button--accent {
            background-color: var(--color-accent);
            color: var(--color-accent-contrast);
            border-color: var(--color-accent);
            font-weight: var(--font-weight-semibold);
          }
          .ef-button--accent:hover:not(:disabled) {
            background-color: var(--color-accent-hover);
            border-color: var(--color-accent-hover);
          }

          .ef-button--outline {
            background-color: transparent;
            color: var(--color-text);
            border-color: var(--color-border-strong);
          }
          .ef-button--outline:hover:not(:disabled) {
            background-color: var(--color-primary-subtle);
            border-color: var(--color-primary-border);
            color: var(--color-text);
          }

          .ef-button--ghost {
            background-color: transparent;
            color: var(--color-text-secondary);
            border-color: transparent;
          }
          .ef-button--ghost:hover:not(:disabled) {
            background-color: var(--color-surface-hover);
            color: var(--color-text);
          }

          .ef-button--danger {
            background-color: var(--color-error-subtle);
            color: var(--color-error-text);
            border-color: var(--color-error-border);
          }
          .ef-button--danger:hover:not(:disabled) {
            background-color: var(--color-error);
            color: #ffffff;
          }

          .ef-button__icon {
            display: inline-flex;
            align-items: center;
          }

          .ef-button__spinner {
            width: 16px;
            height: 16px;
            border: 2px solid currentColor;
            border-top-color: transparent;
            border-radius: 50%;
            animation: ef-spin 0.6s linear infinite;
          }

          @keyframes ef-spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </button>
    );
  }
);

Button.displayName = 'Button';
