/**
 * EventFlow Shared: ModulePlaceholder Component
 * Intentional, structured placeholder for modules scheduled for subsequent phases.
 * Explains purpose, future Supabase backend compatibility, and planned features.
 */

import React from 'react';
import { Badge } from '@/components/ui/Badge.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { PageHeader } from './PageHeader.tsx';
import { ArrowRight, CheckCircle2, Database, ShieldAlert } from 'lucide-react';

export interface ModuleFeature {
  title: string;
  description: string;
}

export interface ModulePlaceholderProps {
  moduleId: string;
  title: string;
  description: string;
  category: string;
  plannedFeatures: ModuleFeature[];
  schemaTable?: string;
  edgeFunction?: string;
}

export const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({
  title,
  description,
  category,
  plannedFeatures,
  schemaTable,
  edgeFunction,
}) => {
  return (
    <div className="ef-module-placeholder">
      <PageHeader
        title={title}
        subtitle={description}
        breadcrumbs={[
          { label: 'Overview', href: '/dashboard' },
          { label: title },
        ]}
        actions={
          <Badge variant="primary" size="md">
            Phase 2 Foundation
          </Badge>
        }
      />

      <div className="ef-module-placeholder__grid">
        <div className="ef-module-card ef-module-card--main">
          <div className="ef-module-card__tag">
            <span className="ef-module-card__dot" />
            <span>{category} Architecture Planned</span>
          </div>

          <h3 className="ef-module-card__heading">Core Module Capabilities</h3>
          <p className="ef-module-card__subtext">
            This module's interface will interface directly with the isolated Supabase schema and Deno Edge Functions established in the repository.
          </p>

          <div className="ef-module-features">
            {plannedFeatures.map((feat) => (
              <div key={feat.title} className="ef-feature-item">
                <CheckCircle2 size={16} className="ef-feature-icon" />
                <div>
                  <h4 className="ef-feature-title">{feat.title}</h4>
                  <p className="ef-feature-desc">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ef-module-sidebar">
          <div className="ef-module-card ef-module-card--tech">
            <h4 className="ef-tech-title">Backend Architecture</h4>
            <div className="ef-tech-details">
              {schemaTable && (
                <div className="ef-tech-row">
                  <Database size={15} className="ef-tech-icon" />
                  <div>
                    <span className="ef-tech-label">Supabase Table</span>
                    <code className="ef-tech-code">{schemaTable}</code>
                  </div>
                </div>
              )}
              {edgeFunction && (
                <div className="ef-tech-row">
                  <ShieldAlert size={15} className="ef-tech-icon" />
                  <div>
                    <span className="ef-tech-label">Edge Function</span>
                    <code className="ef-tech-code">{edgeFunction}</code>
                  </div>
                </div>
              )}
            </div>

            <div className="ef-tech-footer">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                rightIcon={<ArrowRight size={14} />}
                onClick={() => window.location.href = '/dashboard'}
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ef-module-placeholder {
          display: flex;
          flex-direction: column;
        }

        .ef-module-placeholder__grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: var(--space-6);
        }

        @media (max-width: 1024px) {
          .ef-module-placeholder__grid {
            grid-template-columns: 1fr;
          }
        }

        .ef-module-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
        }

        .ef-module-card--main {
          display: flex;
          flex-direction: column;
        }

        .ef-module-card__tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          color: var(--color-primary-contrast);
          background-color: var(--color-primary-subtle);
          border: 1px solid var(--color-primary-border);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          width: fit-content;
          margin-bottom: var(--space-4);
        }

        .ef-module-card__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-accent); /* Turbo dot */
        }

        .ef-module-card__heading {
          font-size: var(--text-xl);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin-bottom: 6px;
        }

        .ef-module-card__subtext {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }

        .ef-module-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: var(--space-4);
        }

        .ef-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: var(--space-4);
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-md);
        }

        .ef-feature-icon {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .ef-feature-title {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin-bottom: 4px;
        }

        .ef-feature-desc {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        .ef-module-card--tech {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .ef-tech-title {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-semibold);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          color: var(--color-text-muted);
          margin-bottom: var(--space-2);
        }

        .ef-tech-details {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .ef-tech-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: var(--space-3);
          background-color: var(--color-surface-subtle);
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border-subtle);
        }

        .ef-tech-icon {
          color: var(--color-primary);
          margin-top: 3px;
        }

        .ef-tech-label {
          display: block;
          font-size: 11px;
          color: var(--color-text-muted);
        }

        .ef-tech-code {
          color: var(--color-accent);
          background: transparent;
          padding: 0;
          font-family: var(--font-mono);
          font-size: 12px;
        }

        .ef-tech-footer {
          margin-top: var(--space-4);
        }
      `}</style>
    </div>
  );
};
