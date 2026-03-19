# OpsVanta Enterprise Platform

Private frontend platform powering OpsVanta LLC products and internal intelligence systems.

## Repository Classification

**Private / Proprietary / Confidential**

This repository contains production software, internal architecture, trade secrets, deployment
assets, and operational documentation for OpsVanta LLC.

No open-source license applies to this repository.
Unauthorized access, copying, distribution, or reuse is prohibited.

For licensing or partnership inquiries: contact@opsvanta.com

---

<div align="center">

<img src="docs/assets/opsvanta-logo.svg" alt="OpsVanta Logo" width="80" height="80" />

[![License](https://img.shields.io/badge/license-Proprietary-dc2626.svg?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAxTDMgNXY2YzAgNS41NSAzLjg0IDEwLjc0IDkgMTIgNS4xNi0xLjI2IDktNi40NSA5LTEyVjVsLTktNHoiLz48L3N2Zz4=)](COPYRIGHT.md)
[![Version](https://img.shields.io/badge/version-1.0.0-4f46e5.svg?style=flat-square)](package.json)
[![Node](https://img.shields.io/badge/node-18%2B-16a34a.svg?style=flat-square&logo=node.js&logoColor=white)](package.json)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat-square&logo=react&logoColor=black)](package.json)
[![Vite](https://img.shields.io/badge/Vite-Rolldown-646cff.svg?style=flat-square&logo=vite&logoColor=white)](vite.config.js)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8.svg?style=flat-square&logo=tailwindcss&logoColor=white)](tailwind.config.js)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e.svg?style=flat-square&logo=supabase&logoColor=white)](SUPABASE_SETUP.md)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000.svg?style=flat-square&logo=vercel&logoColor=white)](DEPLOYMENT.md)
[![Docs](https://img.shields.io/badge/docs-comprehensive-22c55e.svg?style=flat-square)](./docs/)
[![Status](https://img.shields.io/badge/status-active-22c55e.svg?style=flat-square)]()

<br />

[📖 Documentation](./docs/) &nbsp;•&nbsp;
[🚀 Quick Start](#-quick-start) &nbsp;•&nbsp;
[🔧 Configuration](#-supabase-setup) &nbsp;•&nbsp;
[🏗️ Architecture](#%EF%B8%8F-architecture) &nbsp;•&nbsp;
[🔧 Change Process](./CONTRIBUTING.md) &nbsp;•&nbsp;
[🔒 Security](./.github/SECURITY.md)

</div>

---

## ✨ Features

| | Feature | Description |
|---|---------|-------------|
| 🤖 | **AI-Powered Generation** | Describe your website — AI builds it instantly |
| 🎨 | **Beautiful Templates** | 100+ professional, customizable templates |
| 🔧 | **Visual Editor** | Intuitive drag-and-drop customization |
| 📱 | **Responsive Design** | Mobile-first, works perfectly on all devices |
| 🚀 | **One-Click Publishing** | Deploy websites instantly to the cloud |
| 🔌 | **50+ Integrations** | Connect with your favorite tools seamlessly |
| 📊 | **Built-in Analytics** | Track performance and visitor behaviour |
| 🌐 | **Custom Domains** | Use your own domain with automatic SSL |
| ⚡ | **Blazing Fast** | Optimized for speed and performance |
| 🔒 | **Secure by Default** | Enterprise-grade security and compliance |

---

## 🎯 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| npm / yarn | latest |
| Git | any |
| Supabase account | [sign up free](https://supabase.com) |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/WEARETHETREND/omniops-frontend.git
cd omniops-frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials (see below)

# 4. Start the dev server
npm run dev
```

> 🌐 Visit **http://localhost:5173** to see your application.

### Environment Configuration

> ⚠️ **Required**: Configure Supabase before running the application.

```env
# .env (copy from .env.example — never commit this file)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for full database schema setup.

### Available Scripts

```bash
npm run dev          # Start development server  (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting (CI)
```

---

## 🔧 Supabase Setup

OpsVanta uses Supabase for authentication, database, and real-time features.

### Step 1 — Create a Project

1. Visit [supabase.com](https://supabase.com) and sign up for a free account
2. Create a new project
3. Navigate to **Settings → API**
4. Copy your **Project URL** and **Anon/Public Key**

### Step 2 — Configure Environment

```bash
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

### Step 3 — Database Schema

```sql
-- Run in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS users (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

### Authentication Methods

| Method | Support |
|--------|---------|
| Email / Password | ✅ Default |
| Magic Links | ✅ Passwordless email |
| OAuth (Google, GitHub…) | ✅ Social login |

### Common Troubleshooting

<details>
<summary><strong>❌ "Failed to connect to Supabase"</strong></summary>

- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Ensure variables are prefixed with `VITE_` (required by Vite)
- Restart the dev server after editing `.env`
- Check your Supabase project is active (not paused)

</details>

<details>
<summary><strong>❌ "Authentication failed"</strong></summary>

- Verify the auth provider is enabled in Supabase
- Check email-confirmation settings
- Review Supabase Auth logs in the dashboard
- Ensure your site URL is set in Supabase settings

</details>

<details>
<summary><strong>❌ "Database query permission denied"</strong></summary>

- Enable Row Level Security (RLS) on all tables
- Verify the user is authenticated
- Check your policy conditions match the query
- Use Supabase SQL Editor to test queries directly

</details>

<details>
<summary><strong>❌ "CORS errors"</strong></summary>

- Add your domain to **Authentication → URL Configuration** in Supabase
- Include `http://localhost:5173` for local development
- Add your production domain for deployment

</details>

**Resources:** [Supabase Docs](https://supabase.com/docs) · [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security) · [Auth Guide](https://supabase.com/docs/guides/auth)

---

## 📚 Documentation

<table>
<tr>
<td width="50%" valign="top">

### 📘 Setup & Operations
- [**Supabase Setup Guide**](./SUPABASE_SETUP.md) — DB schema, RLS, auth
- [**Deployment Guide**](./DEPLOYMENT.md) — Vercel, CI/CD, rollback
- [**Error Monitoring**](./ERROR_MONITORING.md) — Sentry, Vercel Analytics
- [**Testing Guide**](./TESTING.md) — Testing approach and tools
- [**Component Guide**](./COMPONENT_GUIDE.md) — Architecture patterns

</td>
<td width="50%" valign="top">

### 📙 User & Developer Docs
- [**User Guide**](./docs/user-guide/) — Quick start, AI builder, editor
- [**Admin Guide**](./docs/admin-guide/) — Installation, config, security
- [**API Reference**](./docs/developer/api/) — Full API documentation
- [**Knowledge Base**](./docs/knowledge-base/) — 100+ help articles
- [**Security Docs**](./docs/security/) — Compliance, policies

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
omniops-frontend/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Builder/       #   Website builder UI
│   │   ├── Dashboard/     #   Dashboard widgets
│   │   └── Editor/        #   Visual / code editors
│   ├── pages/             # Route-level page components
│   ├── api/               # API client (opsvanta.js, auth.js)
│   ├── lib/               # Shared utilities
│   ├── styles/            # Global CSS
│   └── assets/            # Static assets
├── public/                # Public static files
├── docs/                  # All documentation
│   ├── user-guide/
│   ├── admin-guide/
│   ├── developer/
│   ├── knowledge-base/
│   └── security/
├── docs-site/             # Docusaurus documentation site
├── scripts/               # Health-check and build scripts
├── .github/               # Workflows, templates, design system
└── tests/                 # Test files
```

---

## 🔧 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**
- ⚛️ **React 19** — Modern UI library
- ⚡ **Vite (Rolldown)** — Lightning-fast build
- 🎨 **TailwindCSS 4** — Utility-first CSS
- 🖼️ **Lucide React** — Icon library
- 🔗 **React Router 7** — Client-side routing

**State & Data**
- 🪝 **React Hooks** — State management
- 🌐 **Native Fetch API** — HTTP client
- 🗄️ **Supabase** — Auth & database

</td>
<td valign="top" width="50%">

**Development**
- 🔍 **ESLint 10** — Linting
- 💅 **Prettier** — Formatting
- 🐶 **Husky** — Git hooks
- 📦 **lint-staged** — Pre-commit checks

**Deployment & Monitoring**
- 📊 **Vercel Analytics** — Real-time visitors
- ⚡ **Vercel Speed Insights** — Core Web Vitals
- 🛡️ **React Error Boundaries** — Error handling
- 🐳 **Docker** — Containerization

</td>
</tr>
</table>

---

## 🔧 Internal Development Process

This repository is maintained by authorized OpsVanta personnel and approved contractors only.
Access to contribute is restricted — see [Internal Development Process](./CONTRIBUTING.md) and [Access Policy](./ACCESS_POLICY.md).

- All changes require review approval from a designated CODEOWNER
- All pull requests target protected branches
- All production-impacting changes require test validation
- Access is restricted to authorized collaborators under NDA

**Coding standards:** ESLint config · Prettier formatting · Meaningful commit messages · Tests for new features · Updated documentation.

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
# 2. Import at vercel.com/new
# 3. Set environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
# 4. Deploy!
```

> Full guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Docker

```bash
docker build -t opsvanta-frontend .
docker run -p 8080:80 opsvanta-frontend
```

### Environment Variables (Production)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
NODE_VERSION=20
```

> ⚠️ Always use **separate Supabase projects** for development and production.

---

## 🔒 Security

| Standard | Status |
|----------|--------|
| SOC 2 Type II | ✅ Compliant |
| GDPR | ✅ Compliant |
| End-to-end encryption | ✅ Enabled |
| Regular security audits | ✅ Quarterly |
| Penetration testing | ✅ Annual |
| Dependency scanning | ✅ Dependabot |

**Report vulnerabilities:** security@opsvanta.com · See [Security Policy](./.github/SECURITY.md)

---

## 📊 Project Status

| Item | Value |
|------|-------|
| Version | 1.0.0 |
| Status | Active Development |
| Last Updated | March 2026 |
| License | Proprietary |
| Maintained By | OpsVanta LLC |

---

## 🆘 Support

| Channel | Link |
|---------|------|
| 📧 Email | support@opsvanta.com |
| 📖 Documentation | [./docs/](./docs/) |
| 🏢 Enterprise | young.monte@omniops-ai.com |
| 🐛 Issue Tracking | Internal — contact your team lead or email support@opsvanta.com |

---

## 📄 License & Legal

**© 2026 OpsVanta LLC. All Rights Reserved.**

This software is proprietary and confidential. It contains trade secrets and is protected by copyright law. **This is NOT open source software.**

For licensing, partnership, or authorized access inquiries: contact@opsvanta.com

See [LICENSE](./LICENSE) · [COPYRIGHT.md](./COPYRIGHT.md) · [NOTICE.md](./NOTICE.md) · [ACCESS_POLICY.md](./ACCESS_POLICY.md)

---

<div align="center">

Built with ❤️ by the **OpsVanta** team

[Website](https://opsvanta.com) · [Documentation](https://docs.opsvanta.com) · [Status](https://status.opsvanta.com)

</div>
