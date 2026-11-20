/**
 * EventFlow UI: Input Component
 * Clean, dark-mode input with icon and error support
 */

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils/index.ts';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className={cn('ef-input-wrapper', disabled && 'ef-input-wrapper--disabled', className)}>
        {label && (
          <label htmlFor={inputId} className="ef-input-label">
            {label}
          </label>
        )}
        <div
          className={cn(
            'ef-input-container',
            error && 'ef-input-container--error',
            leftIcon && 'ef-input-container--has-left-icon',
            rightIcon && 'ef-input-container--has-right-icon'
          )}
        >
          {leftIcon && <span className="ef-input-icon ef-input-icon--left">{leftIcon}</span>}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className="ef-input-field"
            {...props}
          />
          {rightIcon && <span className="ef-input-icon ef-input-icon--right">{rightIcon}</span>}
        </div>
        {error ? (
          <p className="ef-input-message ef-input-message--error">{error}</p>
        ) : helperText ? (
          <p className="ef-input-message">{helperText}</p>
        ) : null}

        <style>{`
          .ef-input-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;
            width: 100%;
          }

          .ef-input-label {
            font-size: var(--text-xs);
            font-weight: var(--font-weight-medium);
            color: var(--color-text-secondary);
            letter-spacing: var(--tracking-wide);
          }

          .ef-input-container {
            position: relative;
            display: flex;
            align-items: center;
            background-color: var(--color-surface-subtle);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            transition: all var(--transition-fast);
          }

          .ef-input-container:hover {
            border-color: var(--color-border-strong);
          }

          .ef-input-container:focus-within {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 2px var(--color-focus-ring);
            background-color: var(--color-surface);
          }

          .ef-input-container--error {
            border-color: var(--color-error);
          }
          .ef-input-container--error:focus-within {
            border-color: var(--color-error);
            box-shadow: 0 0 0 2px var(--color-error-subtle);
          }

          .ef-input-field {
            width: 100%;
            height: 40px;
            padding: 0 14px;
            background: transparent;
            border: none;
            color: var(--color-text);
            font-size: var(--text-sm);
            outline: none;
          }

          .ef-input-field::placeholder {
            color: var(--color-text-subtle);
          }

          .ef-input-container--has-left-icon .ef-input-field {
            padding-left: 38px;
          }

          .ef-input-container--has-right-icon .ef-input-field {
            padding-right: 38px;
          }

          .ef-input-icon {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-text-muted);
            pointer-events: none;
          }

          .ef-input-icon--left {
            left: 12px;
          }

          .ef-input-icon--right {
            right: 12px;
          }

          .ef-input-message {
            font-size: var(--text-xs);
            color: var(--color-text-muted);
            margin: 0;
          }

          .ef-input-message--error {
            color: var(--color-error-text);
          }
        `}</style>
      </div>
    );
  }
);

Input.displayName = 'Input';
