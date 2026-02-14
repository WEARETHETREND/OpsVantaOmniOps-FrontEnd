# OpsVanta Documentation Site

This is the source for the comprehensive OpsVanta documentation website, built with Docusaurus.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd docs-site
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory that can be served using any static hosting service.

## 📚 Documentation Structure

```
docs-site/
├── docs/                           # Documentation markdown files
│   ├── user-guide/                # User documentation
│   │   ├── getting-started/       # Getting started guides
│   │   ├── ai-builder/            # AI generation guides
│   │   ├── project-management/    # Project management
│   │   ├── editor/                # Editor documentation
│   │   ├── domain-publishing/     # Domain & publishing
│   │   ├── workflows/             # Workflows & automation
│   │   ├── integrations/          # Integration guides
│   │   ├── analytics-seo/         # Analytics & SEO
│   │   ├── billing/               # Billing & plans
│   │   └── troubleshooting/       # Troubleshooting
│   ├── admin-guide/               # Administrator documentation
│   │   ├── installation/          # Installation guides
│   │   ├── configuration/         # Configuration
│   │   ├── user-management/       # User management
│   │   ├── security/              # Security
│   │   └── monitoring/            # Monitoring & maintenance
│   ├── developer/                 # Developer documentation
│   │   ├── api/                   # API documentation
│   │   ├── sdk/                   # SDKs & libraries
│   │   ├── integration-guides/    # Integration guides
│   │   ├── architecture/          # Architecture docs
│   │   └── contributing/          # Contributing guides
│   ├── knowledge-base/            # Knowledge base articles
│   └── security/                  # Security & compliance
├── blog/                          # Blog posts
├── src/                           # React components
│   ├── components/                # Custom components
│   ├── pages/                     # Custom pages
│   └── css/                       # Custom CSS
├── static/                        # Static assets
│   ├── img/                       # Images
│   └── videos/                    # Video files
├── docusaurus.config.js           # Docusaurus configuration
├── sidebars.js                    # Sidebar navigation
└── package.json                   # Dependencies
```

## ✨ Features

- 🔍 **Full-text search** with Algolia DocSearch
- 🎨 **Dark mode** support
- 📱 **Mobile-responsive** design
- 🌐 **Multi-language** support (English, Spanish, French, German)
- 📊 **Interactive** API explorer
- 💻 **Code examples** with syntax highlighting
- 🎥 **Video tutorials** embedded
- 📝 **Versioned** documentation
- 🔗 **Deep linking** to sections
- 📈 **Analytics** integration

## 📖 Writing Documentation

### Markdown Files

All documentation is written in Markdown with MDX support:

```markdown
---
id: my-doc
title: My Document Title
sidebar_label: Short Label
---

# My Document

Content goes here...

## Code Examples

```javascript
const example = 'code';
```
```

### Frontmatter

Required frontmatter for each doc:

```yaml
---
id: unique-id
title: Page Title
sidebar_label: Label in Sidebar
---
```

### Components

Use React components in MDX:

```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="js" label="JavaScript">
    ```js
    console.log('Hello');
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```python
    print('Hello')
    ```
  </TabItem>
</Tabs>
```

## 🎨 Styling

Custom styles are in `src/css/custom.css`. We use CSS variables for theming:

```css
:root {
  --ifm-color-primary: #4f46e5;
  /* Other variables... */
}
```

## 🌐 Internationalization

To add translations:

```bash
npm run write-translations -- --locale es
```

Edit translation files in `i18n/es/` directory.

## 📊 Analytics

Google Analytics is configured in `docusaurus.config.js`:

```javascript
gtag: {
  trackingID: 'G-XXXXXXXXXX',
  anonymizeIP: true,
}
```

## 🔍 Search

Algolia DocSearch configuration in `docusaurus.config.js`:

```javascript
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'opsvanta',
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Serve Locally

```bash
npm run serve
```

### Deploy to Production

Documentation is automatically deployed via GitHub Actions when changes are merged to main.

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Test locally with `npm start`
4. Submit a pull request

### Documentation Standards

- Use clear, concise language
- Include code examples
- Add screenshots when helpful
- Keep paragraphs short (2-3 sentences)
- Use bullet points for lists
- Test all links
- Follow the [Documentation Standards](../docs/developer/contributing/documentation-standards.md)

## 📝 License

© 2026 WEARETHETREND / OpsVanta LLC. All Rights Reserved.

This documentation is proprietary and confidential.

## 🆘 Support

- 📧 Email: docs@opsvanta.com
- 💬 Discord: #documentation channel
- 🐛 Issues: [GitHub Issues](https://github.com/WEARETHETREND/omniops-frontend/issues)

---

Built with ❤️ using [Docusaurus](https://docusaurus.io/)
