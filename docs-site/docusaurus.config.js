// @ts-check
const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpsVanta Documentation',
  tagline: 'AI-Powered Website Builder - Complete Documentation',
  favicon: 'img/favicon.ico',

  url: 'https://docs.opsvanta.com',
  baseUrl: '/',

  organizationName: 'WEARETHETREND',
  projectName: 'opsvanta-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/WEARETHETREND/omniops-frontend/edit/main/docs-site/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/WEARETHETREND/omniops-frontend/edit/main/docs-site/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/opsvanta-social-card.png',
      navbar: {
        title: 'OpsVanta',
        logo: {
          alt: 'OpsVanta Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'user-guide/getting-started/quick-start',
            position: 'left',
            label: 'User Guide',
          },
          {
            type: 'doc',
            docId: 'developer/api/api-overview',
            position: 'left',
            label: 'API Docs',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/WEARETHETREND/omniops-frontend',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {label: 'Quick Start', to: '/docs/user-guide/getting-started/quick-start'},
              {label: 'API Reference', to: '/docs/developer/api/api-overview'},
            ],
          },
          {
            title: 'Community',
            items: [
              {label: 'Discord', href: 'https://discord.gg/opsvanta'},
              {label: 'Twitter', href: 'https://twitter.com/opsvanta'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} WEARETHETREND / OpsVanta LLC. All Rights Reserved.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['bash', 'javascript', 'typescript', 'python', 'json'],
      },
    }),
};

module.exports = config;
