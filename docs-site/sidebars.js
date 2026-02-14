/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // User Guide Sidebar
  userGuideSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        title: 'Getting Started with OpsVanta',
        description: 'Learn the basics of OpsVanta and create your first AI-powered website.',
        keywords: ['getting started', 'quickstart', 'tutorial'],
      },
      items: [
        'user-guide/getting-started/quick-start',
        'user-guide/getting-started/account-setup',
        'user-guide/getting-started/first-project',
        'user-guide/getting-started/dashboard-overview',
        'user-guide/getting-started/navigation',
      ],
    },
    {
      type: 'category',
      label: 'AI Website Builder',
      items: [
        'user-guide/ai-builder/ai-generation-guide',
        'user-guide/ai-builder/prompts-best-practices',
        'user-guide/ai-builder/templates',
        'user-guide/ai-builder/design-styles',
        'user-guide/ai-builder/color-schemes',
      ],
    },
    {
      type: 'category',
      label: 'Project Management',
      items: [
        'user-guide/project-management/creating-projects',
        'user-guide/project-management/project-settings',
        'user-guide/project-management/collaboration',
        'user-guide/project-management/version-control',
        'user-guide/project-management/project-types',
      ],
    },
    {
      type: 'category',
      label: 'Editor & Customization',
      items: [
        'user-guide/editor/visual-editor',
        'user-guide/editor/code-editor',
        'user-guide/editor/components',
        'user-guide/editor/layouts',
        'user-guide/editor/responsive-design',
        'user-guide/editor/styling',
      ],
    },
    {
      type: 'category',
      label: 'Domain & Publishing',
      items: [
        'user-guide/domain-publishing/domain-setup',
        'user-guide/domain-publishing/dns-configuration',
        'user-guide/domain-publishing/ssl-certificates',
        'user-guide/domain-publishing/publishing',
        'user-guide/domain-publishing/preview-modes',
      ],
    },
    {
      type: 'category',
      label: 'Workflows & Automation',
      items: [
        'user-guide/workflows/workflows-intro',
        'user-guide/workflows/workflow-builder',
        'user-guide/workflows/triggers-actions',
        'user-guide/workflows/workflow-templates',
        'user-guide/workflows/automation-examples',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'user-guide/integrations/integrations-overview',
        'user-guide/integrations/zapier-integration',
        'user-guide/integrations/webhook-setup',
        'user-guide/integrations/api-integration',
        'user-guide/integrations/third-party-tools',
      ],
    },
    {
      type: 'category',
      label: 'Analytics & SEO',
      items: [
        'user-guide/analytics-seo/analytics-setup',
        'user-guide/analytics-seo/tracking-visitors',
        'user-guide/analytics-seo/seo-basics',
        'user-guide/analytics-seo/seo-optimization',
        'user-guide/analytics-seo/performance-monitoring',
      ],
    },
    {
      type: 'category',
      label: 'Billing & Plans',
      items: [
        'user-guide/billing/pricing-plans',
        'user-guide/billing/upgrading',
        'user-guide/billing/billing-management',
        'user-guide/billing/add-ons',
        'user-guide/billing/usage-limits',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'user-guide/troubleshooting/common-issues',
        'user-guide/troubleshooting/error-messages',
        'user-guide/troubleshooting/debugging',
        'user-guide/troubleshooting/browser-compatibility',
        'user-guide/troubleshooting/performance-issues',
      ],
    },
  ],

  // Admin Guide Sidebar
  adminGuideSidebar: [
    {
      type: 'category',
      label: 'Installation & Setup',
      items: [
        'admin-guide/installation/installation',
        'admin-guide/installation/system-requirements',
        'admin-guide/installation/environment-setup',
        'admin-guide/installation/database-setup',
        'admin-guide/installation/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'admin-guide/configuration/configuration-reference',
        'admin-guide/configuration/environment-variables',
        'admin-guide/configuration/feature-flags',
        'admin-guide/configuration/email-setup',
        'admin-guide/configuration/storage-configuration',
      ],
    },
    {
      type: 'category',
      label: 'User Management',
      items: [
        'admin-guide/user-management/user-management',
        'admin-guide/user-management/roles-permissions',
        'admin-guide/user-management/team-management',
        'admin-guide/user-management/access-control',
        'admin-guide/user-management/sso-setup',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'admin-guide/security/security-overview',
        'admin-guide/security/authentication',
        'admin-guide/security/authorization',
        'admin-guide/security/encryption',
        'admin-guide/security/compliance',
        'admin-guide/security/security-audit',
      ],
    },
    {
      type: 'category',
      label: 'Monitoring & Maintenance',
      items: [
        'admin-guide/monitoring/monitoring',
        'admin-guide/monitoring/logging',
        'admin-guide/monitoring/backups',
        'admin-guide/monitoring/disaster-recovery',
        'admin-guide/monitoring/performance-tuning',
        'admin-guide/monitoring/scaling',
      ],
    },
  ],

  // Developer Documentation Sidebar
  developerSidebar: [
    {
      type: 'category',
      label: 'API Documentation',
      link: {
        type: 'doc',
        id: 'developer/api/api-overview',
      },
      items: [
        'developer/api/api-overview',
        'developer/api/authentication',
        'developer/api/rate-limits',
        {
          type: 'category',
          label: 'API Endpoints',
          items: [
            'developer/api/endpoints/projects',
            'developer/api/endpoints/websites',
            'developer/api/endpoints/domains',
            'developer/api/endpoints/workflows',
            'developer/api/endpoints/analytics',
          ],
        },
        'developer/api/webhooks',
        'developer/api/websockets',
      ],
    },
    {
      type: 'category',
      label: 'SDK & Libraries',
      items: [
        'developer/sdk/javascript-sdk',
        'developer/sdk/python-sdk',
        'developer/sdk/rest-api',
        'developer/sdk/graphql-api',
        'developer/sdk/code-examples',
      ],
    },
    {
      type: 'category',
      label: 'Integration Guides',
      items: [
        'developer/integration-guides/oauth-integration',
        'developer/integration-guides/custom-integrations',
        'developer/integration-guides/plugin-development',
        'developer/integration-guides/theme-development',
        'developer/integration-guides/component-library',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'developer/architecture/architecture-overview',
        'developer/architecture/frontend-architecture',
        'developer/architecture/backend-architecture',
        'developer/architecture/database-schema',
        'developer/architecture/api-design',
        'developer/architecture/security-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'developer/contributing/contributing-guide',
        'developer/contributing/code-style-guide',
        'developer/contributing/git-workflow',
        'developer/contributing/pull-request-process',
        'developer/contributing/testing-guidelines',
        'developer/contributing/documentation-standards',
      ],
    },
  ],

  // Knowledge Base Sidebar
  knowledgeBaseSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'knowledge-base/getting-started/what-is-opsvanta',
        'knowledge-base/getting-started/how-ai-works',
        'knowledge-base/getting-started/what-can-i-build',
        'knowledge-base/getting-started/pricing-explained',
        'knowledge-base/getting-started/system-requirements',
      ],
    },
    {
      type: 'category',
      label: 'Account & Billing',
      items: [
        'knowledge-base/account-billing/creating-account',
        'knowledge-base/account-billing/account-settings',
        'knowledge-base/account-billing/upgrading-plan',
        'knowledge-base/account-billing/billing-management',
        'knowledge-base/account-billing/cancellation',
      ],
    },
    {
      type: 'category',
      label: 'Projects & Websites',
      items: [
        'knowledge-base/projects-websites/creating-project',
        'knowledge-base/projects-websites/project-types',
        'knowledge-base/projects-websites/using-ai',
        'knowledge-base/projects-websites/project-settings',
        'knowledge-base/projects-websites/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Domains & Publishing',
      items: [
        'knowledge-base/domains-publishing/custom-domain-setup',
        'knowledge-base/domains-publishing/dns-configuration',
        'knowledge-base/domains-publishing/ssl-setup',
        'knowledge-base/domains-publishing/publishing-process',
        'knowledge-base/domains-publishing/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Workflows & Automation',
      items: [
        'knowledge-base/workflows-automation/workflows-intro',
        'knowledge-base/workflows-automation/creating-workflows',
        'knowledge-base/workflows-automation/workflow-templates',
        'knowledge-base/workflows-automation/debugging',
        'knowledge-base/workflows-automation/best-practices',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'knowledge-base/integrations/available-integrations',
        'knowledge-base/integrations/zapier-setup',
        'knowledge-base/integrations/webhook-config',
        'knowledge-base/integrations/api-access',
        'knowledge-base/integrations/custom-integrations',
      ],
    },
  ],

  // Security & Compliance Sidebar
  securitySidebar: [
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/security-policy',
        'security/vulnerability-disclosure',
        'security/security-best-practices',
        'security/data-protection',
        'security/incident-response',
        'security/security-certifications',
      ],
    },
    {
      type: 'category',
      label: 'Compliance',
      items: [
        'security/gdpr-compliance',
        'security/hipaa-compliance',
        'security/soc2-compliance',
        'security/privacy-policy',
        'security/terms-of-service',
        'security/cookie-policy',
        'security/acceptable-use',
      ],
    },
  ],
};

module.exports = sidebars;
