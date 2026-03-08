# OpsVanta Design System

> **© 2026 OpsVanta LLC** — Proprietary design language for the OpsVanta platform and documentation.

---

## Table of Contents

1. [Foundations](#foundations)
   - [Color Palette](#color-palette)
   - [Typography](#typography)
   - [Spacing](#spacing)
   - [Shadows & Elevation](#shadows--elevation)
   - [Border Radius](#border-radius)
   - [Z-Index](#z-index)
2. [Components](#components)
   - [Buttons](#buttons)
   - [Badges & Labels](#badges--labels)
   - [Alerts & Callouts](#alerts--callouts)
   - [Cards](#cards)
   - [Forms](#forms)
3. [CSS Architecture](#css-architecture)
4. [React Components](#react-components)
5. [Accessibility](#accessibility)
6. [Dark Mode](#dark-mode)
7. [Animations](#animations)
8. [Responsive Breakpoints](#responsive-breakpoints)

---

## Foundations

### Color Palette

All color tokens are defined as CSS custom properties in `docs-site/src/css/custom.css`.

#### Primary (Indigo)

| Token | Value | Use |
|-------|-------|-----|
| `--ov-primary-50`  | `#eef2ff` | Subtle backgrounds, hover states |
| `--ov-primary-100` | `#e0e7ff` | Light tints |
| `--ov-primary-200` | `#c7d2fe` | Border accents |
| `--ov-primary-300` | `#a5b4fc` | Dark-mode text |
| `--ov-primary-400` | `#818cf8` | Dark-mode primary |
| `--ov-primary-500` | `#6366f1` | Medium accent |
| `--ov-primary-600` | `#4f46e5` | **Primary — light mode** |
| `--ov-primary-700` | `#4338ca` | Hover states |
| `--ov-primary-800` | `#3730a3` | Active states |
| `--ov-primary-900` | `#312e81` | Hero backgrounds |

#### Semantic

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--ov-bg` | `#ffffff` | `#0f172a` | Page background |
| `--ov-bg-subtle` | `#f8fafc` | `#1e293b` | Section backgrounds |
| `--ov-surface` | `#ffffff` | `#1e293b` | Cards, modals |
| `--ov-border` | `#e2e8f0` | `rgba(255,255,255,.1)` | Dividers, outlines |
| `--ov-text` | `#0f172a` | `#f1f5f9` | Body text |
| `--ov-text-muted` | `#64748b` | `#94a3b8` | Secondary text |

#### Status Colors

| Status | Background | Text | Border |
|--------|-----------|------|--------|
| Success | `--ov-success-50` | `--ov-success-700` | `--ov-success-500` |
| Warning | `--ov-warning-50` | `--ov-warning-700` | `--ov-warning-500` |
| Danger | `--ov-danger-50` | `--ov-danger-700` | `--ov-danger-500` |
| Info | `--ov-info-50` | `--ov-info-700` | `--ov-info-500` |

---

### Typography

Font stack:
- **UI / Body**: `'Inter', system-ui, -apple-system, sans-serif`
- **Monospace**: `'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace`

#### Type Scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `--ov-text-xs`   | `0.75rem`  | — | Labels, captions |
| `--ov-text-sm`   | `0.875rem` | — | Body small, nav links |
| `--ov-text-base` | `1rem`     | — | Body default |
| `--ov-text-lg`   | `1.125rem` | — | Lead paragraphs |
| `--ov-text-xl`   | `1.25rem`  | — | h5, card titles |
| `--ov-text-2xl`  | `1.5rem`   | — | h4 |
| `--ov-text-3xl`  | `1.875rem` | — | h3, section headings |
| `--ov-text-4xl`  | `2.25rem`  | — | h2, page titles |
| `--ov-text-5xl`  | `3rem`     | — | h1, hero titles |

Heading weights: `h1–h2` = 800, `h3–h4` = 700, `h5–h6` = 600.

---

### Spacing

The spacing scale follows a consistent 4px base unit.

| Token | Value | Pixels |
|-------|-------|--------|
| `--ov-space-1`  | `0.25rem` | 4px |
| `--ov-space-2`  | `0.5rem`  | 8px |
| `--ov-space-3`  | `0.75rem` | 12px |
| `--ov-space-4`  | `1rem`    | 16px |
| `--ov-space-5`  | `1.25rem` | 20px |
| `--ov-space-6`  | `1.5rem`  | 24px |
| `--ov-space-8`  | `2rem`    | 32px |
| `--ov-space-10` | `2.5rem`  | 40px |
| `--ov-space-12` | `3rem`    | 48px |
| `--ov-space-16` | `4rem`    | 64px |
| `--ov-space-20` | `5rem`    | 80px |
| `--ov-space-24` | `6rem`    | 96px |

---

### Shadows & Elevation

| Token | Use |
|-------|-----|
| `--ov-shadow-xs` | Subtle (badges, separators) |
| `--ov-shadow-sm` | Cards at rest, navbar |
| `--ov-shadow-md` | Hovered cards, dropdowns |
| `--ov-shadow-lg` | Modals, popovers |
| `--ov-shadow-xl` | Featured cards, prominent elements |
| `--ov-shadow-2xl` | Full-screen overlays |
| `--ov-shadow-glow-primary` | Focus rings, active states |

---

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--ov-radius-sm`   | `0.25rem` | Inline code, tiny chips |
| `--ov-radius-md`   | `0.375rem` | Buttons, inputs, nav links |
| `--ov-radius-lg`   | `0.5rem` | Alerts, callouts |
| `--ov-radius-xl`   | `0.75rem` | Cards |
| `--ov-radius-2xl`  | `1rem` | Pricing cards, large panels |
| `--ov-radius-3xl`  | `1.5rem` | Hero sections |
| `--ov-radius-full` | `9999px` | Pills, avatars, tags |

---

### Z-Index

| Token | Value | Use |
|-------|-------|-----|
| `--ov-z-below`    | `-1` | Behind-background elements |
| `--ov-z-base`     | `0` | Default |
| `--ov-z-raised`   | `10` | Cards, focused elements |
| `--ov-z-dropdown` | `100` | Dropdowns, tooltips |
| `--ov-z-sticky`   | `200` | Sticky headers |
| `--ov-z-overlay`  | `300` | Overlays, drawers |
| `--ov-z-modal`    | `400` | Modal dialogs |
| `--ov-z-toast`    | `500` | Notifications, toasts |

---

## Components

### Buttons

```css
/* Variants */
.button--primary   /* Gradient fill — primary CTA */
.button--secondary /* Outline — secondary action */
.button--ghost     /* Border — tertiary action */
.button--danger    /* Red fill — destructive action */

/* Sizes */
.button--sm        /* Small: 12px font */
.button            /* Default: 14px font */
.button--lg        /* Large: 16px font */
.button--xl        /* XL: 18px font */
```

**Usage rules:**
- Use `--primary` for the single most important action per screen.
- Use `--secondary` for the second most important action.
- Use `--ghost` for tertiary or less-important actions.
- Use `--danger` exclusively for destructive / irreversible operations.
- Always include a visible `focus-visible` state.
- Minimum touch target: **44×44px** on mobile.

---

### Badges & Labels

```css
.badge.badge--primary
.badge.badge--success
.badge.badge--warning
.badge.badge--danger
.badge.badge--info
.badge.badge--neutral
```

---

### Alerts & Callouts

```css
.alert.alert--info
.alert.alert--success
.alert.alert--warning
.alert.alert--danger
```

---

### Cards

```css
.card              /* Standard card */
.feature-card      /* Icon + title + description, centered */
.highlight-card    /* Horizontal: icon left, text right */
.pricing-tier      /* Pricing plan */
.doc-card          /* Documentation link card */
.testimonial-card  /* Quote card with author */
.stat-card         /* Single metric display */
.glass-panel       /* Glassmorphism surface */
```

---

### Forms

```css
.form-group        /* Vertical label + input stack */
.form-label        /* Accessible form label */
.form-input        /* Text input */
.form-input--error /* Error state */
.form-input--success /* Success state */
.form-help         /* Helper / hint text */
.form-error        /* Inline error message */
```

---

## CSS Architecture

```
docs-site/src/css/
├── custom.css         # Design tokens + global base (LOAD FIRST)
├── animations.css     # Keyframes, transitions, skeleton screens
├── responsive.css     # Breakpoints, fluid typography, print
├── accessibility.css  # WCAG focus states, reduced-motion, a11y helpers
└── professional.css   # Component-level styles, glassmorphism, kbd, etc.
```

All files are imported in order via `docusaurus.config.js` → `customCss` array.

**Token prefix:** All custom properties use `--ov-` to avoid collisions with Docusaurus's `--ifm-` tokens.

---

## React Components

File: `docs-site/src/components/ProfessionalComponents.jsx`

| Component | Props | Description |
|-----------|-------|-------------|
| `Badge` | `variant`, `children` | Status badge |
| `Alert` | `variant`, `title`, `children` | Alert box |
| `FeatureCard` | `icon`, `title`, `description`, `href?` | Feature tile |
| `HighlightCard` | `icon`, `title`, `description` | Horizontal feature |
| `StatCard` | `value`, `label` | Single metric |
| `StatsGrid` | `stats[]` | Row of stat cards |
| `CTA` | `title`, `body?`, `primaryLabel`, `primaryHref`, `secondaryLabel?`, `secondaryHref?` | Call-to-action section |
| `DocCardGrid` | `children` | Grid wrapper for DocCards |
| `DocCard` | `icon?`, `title`, `description`, `href` | Docs navigation card |
| `TestimonialCard` | `quote`, `name`, `role`, `avatar?` | Customer quote |
| `VersionChip` | `version`, `status?` | Version indicator |
| `MethodBadge` | `method` | HTTP method pill |
| `NoticeBar` | `variant`, `icon?`, `children` | Inline notice |
| `FeaturesGrid` | `children` | Responsive feature grid |
| `SectionDivider` | — | Gradient HR divider |
| `KeyboardShortcut` | `keys[]` | Keyboard combo display |
| `GlassPanel` | `children`, `style?` | Glassmorphism container |

**Usage example:**

```jsx
import { FeatureCard, CTA, StatsGrid } from '@site/src/components/ProfessionalComponents';

<StatsGrid stats={[
  { value: '200+', label: 'Documents' },
  { value: '50+',  label: 'Integrations' },
  { value: '99.9%', label: 'Uptime' },
]} />

<CTA
  title="Ready to build?"
  body="Start for free — no credit card required."
  primaryLabel="Get Started Free"
  primaryHref="https://app.opsvanta.com"
  secondaryLabel="View Docs"
  secondaryHref="/docs"
/>
```

---

## Accessibility

Compliance targets: **WCAG 2.1 AA** (selected AAA criteria).

Key practices implemented:
- All interactive elements have a visible `focus-visible` state (3px `--ifm-color-primary` outline with 3px offset).
- Color contrast meets AA minimums: body text ≥ 4.5:1, large text ≥ 3:1.
- Skip-to-content link provided via `#skip-to-content`.
- All images require `alt` attributes (missing `alt` gets a red debug outline in development).
- External links display a `↗` suffix with screen-reader-friendly `aria-label` on interactive buttons.
- `prefers-reduced-motion` collapses all animations/transitions to instant.
- High-Contrast Mode (`forced-colors: active`) handled with explicit border fallbacks.
- Semantic HTML: `<main>`, `<nav>`, `<footer>`, `<header>`, `<aside>` landmarks used throughout.

---

## Dark Mode

Dark mode is controlled by Docusaurus's `data-theme='dark'` attribute on `<html>`.

- All color tokens have dark-mode overrides in the `[data-theme='dark']` selector block in `custom.css`.
- Surfaces shift from white to deep navy (`#0f172a`, `#1e293b`).
- Primary color shifts from `#4f46e5` (indigo-600) to `#818cf8` (indigo-400) for contrast.
- Shadows become more opaque to remain visible on dark backgrounds.
- Glassmorphism panels use dark-tinted backdrops.

---

## Animations

File: `docs-site/src/css/animations.css`

Available utility classes:

```css
.animate-fade-in
.animate-fade-up
.animate-fade-down
.animate-slide-left
.animate-slide-right
.animate-scale-in
.animate-scale-bounce
.animate-spin
.animate-pulse
.animate-bounce
.animate-float
```

Delay modifiers: `.animate-delay-75` through `.animate-delay-700`.

Skeleton shimmer: Add `.skeleton` class to any element.

All animations respect `prefers-reduced-motion: reduce`.

---

## Responsive Breakpoints

| Name | Min width | Docusaurus equivalent |
|------|-----------|----------------------|
| xs   | —         | Mobile default       |
| sm   | 480px     | —                    |
| md   | 768px     | Tablet               |
| lg   | 997px     | Desktop              |
| xl   | 1280px    | Wide desktop         |
| 2xl  | 1536px    | Ultra-wide           |

Mobile-first: all base styles target mobile; larger sizes use `@media (min-width: ...)` overrides.

Touch targets: Minimum **44×44px** enforced via `@media (pointer: coarse)` for buttons, nav links, and menu items.

---

*For questions, reach out to the platform team at contact@opsvanta.com*
