# OpsVanta Documentation Site

> Source for the comprehensive OpsVanta documentation website, built with [Docusaurus 3](https://docusaurus.io).

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| npm / yarn | latest |

### Installation & Development

```bash
cd docs-site
npm install
npm start        # http://localhost:3000
```

### Build for Production

```bash
npm run build    # Output → build/
npm run serve    # Preview the production build locally
```

---

## 📁 Structure

```
docs-site/
├── docs/                      # Documentation markdown files
│   ├── user-guide/            #   User documentation
│   ├── admin-guide/           #   Administrator docs
│   ├── developer/             #   Developer API & SDK docs
│   ├── knowledge-base/        #   100+ KB articles
│   └── security/              #   Security & compliance
├── blog/                      # Blog posts (MDX)
├── src/
│   ├── components/
│   │   └── ProfessionalComponents.jsx   # Reusable UI components
│   ├── pages/                 # Custom Docusaurus pages
│   └── css/
│       ├── custom.css         # Design tokens + global base  ← load first
│       ├── animations.css     # Keyframes, transitions, skeleton screens
│       ├── responsive.css     # Mobile-first breakpoints, print styles
│       ├── accessibility.css  # WCAG focus states, reduced-motion, a11y
│       └── professional.css   # Component library (cards, CTAs, kbd…)
├── static/
│   ├── img/                   # Images and logos
│   └── videos/                # Embedded video files
├── docusaurus.config.js       # Site configuration
├── sidebars.js                # Sidebar navigation tree
└── package.json
```

---

## 🎨 CSS Architecture

The design system is split into five focused files, loaded in order:

| File | Purpose |
|------|---------|
| `custom.css` | Design tokens (color, type, spacing, shadow, radius, z-index) + global reset |
| `animations.css` | Keyframes, animation utility classes, skeleton shimmer, reduced-motion |
| `responsive.css` | Mobile-first breakpoints, fluid typography, touch targets, print styles |
| `accessibility.css` | Skip links, focus rings, ARIA helpers, high-contrast mode |
| `professional.css` | Component styles: CTA sections, testimonials, pricing cards, kbd, glass panels |

All CSS custom properties use the `--ov-` prefix to avoid conflicts with Docusaurus's `--ifm-` tokens.

For the full design language reference, see [`.github/DESIGN_SYSTEM.md`](../.github/DESIGN_SYSTEM.md).

---

## 🧩 Professional Components

Import from `@site/src/components/ProfessionalComponents`:

```jsx
import {
  FeatureCard, FeaturesGrid,
  CTA,
  DocCard, DocCardGrid,
  StatCard, StatsGrid,
  Badge, Alert, NoticeBar,
  TestimonialCard,
  VersionChip, MethodBadge,
  HighlightCard,
  KeyboardShortcut,
  GlassPanel,
  SectionDivider,
} from '@site/src/components/ProfessionalComponents';
```

Example usage in MDX:

```mdx
import { CTA, StatsGrid } from '@site/src/components/ProfessionalComponents';

<StatsGrid stats={[
  { value: '200+', label: 'Docs pages' },
  { value: '50+',  label: 'Integrations' },
  { value: '99.9%', label: 'Uptime' },
]} />

<CTA
  title="Ready to build your website?"
  body="Start for free — no credit card required."
  primaryLabel="Get Started Free"
  primaryHref="https://app.opsvanta.com"
  secondaryLabel="Read the Docs"
  secondaryHref="/docs"
/>
```

---

## 📖 Writing Documentation

### Frontmatter (required)

```yaml
---
id: unique-slug
title: Page Title
sidebar_label: Short Sidebar Label
---
```

### Code Tabs

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="js" label="JavaScript">
    ```js
    const x = 1;
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```python
    x = 1
    ```
  </TabItem>
</Tabs>
```

### Standards

- Clear, concise language
- Code examples for every API call
- Screenshots for UI flows
- Short paragraphs (2–3 sentences)
- Bullet points for lists
- Test all links before merging

---

## 🌐 Internationalization

```bash
npm run write-translations -- --locale es
# Edit translation files in i18n/es/
```

Supported locales: `en` (default), `es`, `fr`, `de`.

---

## 📊 Analytics & Search

- **Google Analytics**: configure `gtag.trackingID` in `docusaurus.config.js`
- **Algolia DocSearch**: configure `themeConfig.algolia` in `docusaurus.config.js`

---

## 🚀 Deployment

Documentation is automatically deployed via GitHub Actions when changes are merged to `main`.

```bash
npm run build    # Static output in build/
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes and test with `npm start`
3. Run `npm run build` to verify no build errors
4. Submit a pull request

---

## 📝 License

© 2026 OpsVanta LLC. All Rights Reserved.

Built with ❤️ using [Docusaurus](https://docusaurus.io/)
