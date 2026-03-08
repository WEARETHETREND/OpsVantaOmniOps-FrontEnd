/**
 * OpsVanta Documentation — Professional Reusable Components
 * © 2026 OpsVanta LLC
 *
 * Import individual components as needed:
 *   import { FeatureCard, CTA, Badge } from '@site/src/components/ProfessionalComponents';
 */

import React from 'react';

/* ─── Badge ──────────────────────────────────────────────────────────────── */

/**
 * @param {{ variant?: 'primary'|'success'|'warning'|'danger'|'info'|'neutral', children: React.ReactNode }} props
 */
export function Badge({ variant = 'primary', children }) {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  );
}

/* ─── Alert ──────────────────────────────────────────────────────────────── */

/**
 * @param {{ variant?: 'info'|'success'|'warning'|'danger', title?: string, children: React.ReactNode }} props
 */
export function Alert({ variant = 'info', title, children }) {
  const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', danger: '🚨' };
  return (
    <div className={`alert alert--${variant}`} role="alert">
      <span aria-hidden="true">{icons[variant]}</span>
      <div>
        {title && <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{title}</strong>}
        {children}
      </div>
    </div>
  );
}

/* ─── Feature Card ───────────────────────────────────────────────────────── */

/**
 * @param {{ icon: string, title: string, description: string, href?: string }} props
 */
export function FeatureCard({ icon, title, description, href }) {
  const content = (
    <>
      <div className="feature-card__icon" aria-hidden="true">{icon}</div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ov-text-muted)', margin: 0, lineHeight: 1.6 }}>
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <a href={href} className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </a>
    );
  }

  return <div className="feature-card">{content}</div>;
}

/* ─── Highlight Card ─────────────────────────────────────────────────────── */

/**
 * @param {{ icon: string, title: string, description: string }} props
 */
export function HighlightCard({ icon, title, description }) {
  return (
    <div className="highlight-card">
      <div className="highlight-card__icon-wrap" aria-hidden="true">{icon}</div>
      <div className="highlight-card__content">
        <div className="highlight-card__title">{title}</div>
        <div className="highlight-card__description">{description}</div>
      </div>
    </div>
  );
}

/* ─── Stat Card ──────────────────────────────────────────────────────────── */

/**
 * @param {{ value: string, label: string }} props
 */
export function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

/* ─── CTA Section ────────────────────────────────────────────────────────── */

/**
 * @param {{ title: string, body?: string, primaryLabel?: string, primaryHref?: string, secondaryLabel?: string, secondaryHref?: string }} props
 */
export function CTA({
  title,
  body,
  primaryLabel = 'Get Started',
  primaryHref = 'https://app.opsvanta.com',
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <div className="cta-section">
      <h2 className="cta-section__title">{title}</h2>
      {body && <p className="cta-section__body">{body}</p>}
      <div className="cta-section__actions">
        <a href={primaryHref} className="button button--primary button--lg">
          {primaryLabel}
        </a>
        {secondaryLabel && secondaryHref && (
          <a
            href={secondaryHref}
            className="button button--ghost button--lg"
            style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)' }}
          >
            {secondaryLabel}
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Doc Card Grid ──────────────────────────────────────────────────────── */

/**
 * @param {{ children: React.ReactNode }} props
 */
export function DocCardGrid({ children }) {
  return <div className="doc-card-grid">{children}</div>;
}

/**
 * @param {{ icon?: string, title: string, description: string, href: string }} props
 */
export function DocCard({ icon, title, description, href }) {
  return (
    <a href={href} className="doc-card">
      {icon && <div className="doc-card__icon" aria-hidden="true">{icon}</div>}
      <div className="doc-card__title">{title}</div>
      <div className="doc-card__description">{description}</div>
      <div className="doc-card__arrow">Read more →</div>
    </a>
  );
}

/* ─── Testimonial Card ───────────────────────────────────────────────────── */

/**
 * @param {{ quote: string, name: string, role: string, avatar?: string }} props
 */
export function TestimonialCard({ quote, name, role, avatar }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-card__quote">{quote}</p>
      <div className="testimonial-card__author">
        {avatar && (
          <img
            src={avatar}
            alt={`${name} avatar`}
            className="testimonial-card__avatar"
            loading="lazy"
            width="40"
            height="40"
          />
        )}
        <div>
          <div className="testimonial-card__name">{name}</div>
          <div className="testimonial-card__role">{role}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Version Chip ───────────────────────────────────────────────────────── */

/**
 * @param {{ version: string, status?: 'stable'|'beta'|'deprecated' }} props
 */
export function VersionChip({ version, status = 'stable' }) {
  return (
    <span className={`version-chip version-chip--${status}`}>
      {version}
    </span>
  );
}

/* ─── HTTP Method Badge ──────────────────────────────────────────────────── */

/**
 * @param {{ method: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH' }} props
 */
export function MethodBadge({ method }) {
  return (
    <span className={`method-badge method-badge--${method.toLowerCase()}`}>
      {method}
    </span>
  );
}

/* ─── Notice Bar ─────────────────────────────────────────────────────────── */

/**
 * @param {{ variant?: 'info'|'success'|'warning'|'danger', icon?: string, children: React.ReactNode }} props
 */
export function NoticeBar({ variant = 'info', icon, children }) {
  return (
    <div className={`notice-bar notice-bar--${variant}`} role="status">
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}

/* ─── Features Grid ──────────────────────────────────────────────────────── */

/**
 * @param {{ children: React.ReactNode }} props
 */
export function FeaturesGrid({ children }) {
  return <div className="features-grid">{children}</div>;
}

/* ─── Stats Grid ─────────────────────────────────────────────────────────── */

/**
 * @param {{ stats: Array<{value: string, label: string}> }} props
 */
export function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <StatCard key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}

/* ─── Section Divider ────────────────────────────────────────────────────── */

export function SectionDivider() {
  return <hr className="section-divider" aria-hidden="true" />;
}

/* ─── Keyboard Shortcut ──────────────────────────────────────────────────── */

/**
 * @param {{ keys: string[] }} props
 * @example <KeyboardShortcut keys={['Ctrl', 'K']} />
 */
export function KeyboardShortcut({ keys }) {
  return (
    <span
      role="img"
      aria-label={`Keyboard shortcut: ${keys.join(' + ')}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
    >
      {keys.map((key, i) => (
        <React.Fragment key={key}>
          <kbd>{key}</kbd>
          {i < keys.length - 1 && (
            <span aria-hidden="true" style={{ color: 'var(--ov-text-subtle)', fontSize: '0.75rem' }}>+</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}

/* ─── Glass Panel ────────────────────────────────────────────────────────── */

/**
 * @param {{ children: React.ReactNode, style?: React.CSSProperties }} props
 */
export function GlassPanel({ children, style }) {
  return (
    <div className="glass-panel" style={{ padding: 'var(--ov-space-6)', ...style }}>
      {children}
    </div>
  );
}
