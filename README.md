# 🔒 PROPRIETARY & CONFIDENTIAL - TRADE SECRET

**© 2026 WEARETHETREND / OpsVanta LLC - ALL RIGHTS RESERVED**

⚠️ **This is NOT open source software.**  
Unauthorized access, use, copying, or distribution is **strictly prohibited** and **illegal**.

See [COPYRIGHT.md](./COPYRIGHT.md) for complete legal terms.

---

# OpsVanta Web

<div align="center">

**Build stunning websites in seconds with AI**

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](COPYRIGHT.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![Documentation](https://img.shields.io/badge/docs-comprehensive-brightgreen.svg)](./docs/)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

[Documentation](./docs/) • [Contributing](./CONTRIBUTING.md) • [Security](./SECURITY.md)

</div>

---

## ✨ Features

- 🤖 **AI-Powered Generation** - Describe your website, AI builds it instantly
- 🎨 **Beautiful Templates** - 100+ professional, customizable templates
- 🔧 **Visual Editor** - Intuitive drag-and-drop customization
- 📱 **Responsive Design** - Mobile-first, works perfectly on all devices
- 🚀 **One-Click Publishing** - Deploy websites instantly to the cloud
- 🔌 **50+ Integrations** - Connect with your favorite tools seamlessly
- 📊 **Built-in Analytics** - Track performance and visitor behavior
- 🌐 **Custom Domains** - Use your own domain with automatic SSL
- ⚡ **Blazing Fast** - Optimized for speed and performance
- 🔒 **Secure by Default** - Enterprise-grade security and compliance

## 🎯 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- A Supabase account (sign up at https://supabase.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/WEARETHETREND/omniops-frontend.git
cd omniops-frontend

# Install dependencies (use --legacy-peer-deps due to eslint version conflicts)
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

### Environment Configuration

⚠️ **IMPORTANT**: You must configure Supabase before running the application.

1. **Create a Supabase project** (if you haven't already):
   - Go to https://app.supabase.com
   - Create a new project
   - Note your project URL and anon key

2. **Configure `.env` file**:

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

3. **Set up database schema**:
   - See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete database setup instructions
   - Run the SQL migrations provided in the setup guide

### Start Development

```bash
# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your application.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 📚 Documentation

Comprehensive documentation is available:

### Setup & Configuration

- **[Supabase Setup Guide](./SUPABASE_SETUP.md)** - Complete Supabase integration guide
  - Database schema setup
  - Row Level Security (RLS) policies
  - Authentication configuration
  - Testing and troubleshooting
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment instructions
  - Vercel deployment steps
  - Environment variable configuration
  - Domain setup and SSL
  - CI/CD configuration
  - Rollback procedures

- **[Error Monitoring Setup](./ERROR_MONITORING.md)** - Error tracking and monitoring
  - Built-in error handling
  - Sentry integration
  - Vercel Analytics setup
  - Best practices

### User Documentation

- **[User Guide](./docs/user-guide/)** - Learn how to use OpsVanta
  - [Quick Start](./docs/user-guide/getting-started/quick-start.md)
  - [Account Setup](./docs/user-guide/getting-started/account-setup.md)
  - [Building Your First Website](./docs/user-guide/getting-started/first-project.md)
  - [AI Generation Guide](./docs/user-guide/ai-builder/ai-generation-guide.md)

### Administrator Documentation

- **[Administrator Guide](./docs/admin-guide/)** - Setup and configuration
  - Installation & deployment
  - Configuration & environment
  - User management & security
  - Monitoring & maintenance

### Developer Documentation

- **[Developer Documentation](./docs/developer/)** - API reference and integration
  - API documentation
  - SDK & libraries
  - Integration guides
  - Architecture overview

- **[Knowledge Base](./docs/knowledge-base/)** - 100+ helpful articles
- **[Video Tutorials](./docs/video-scripts/)** - Step-by-step video guides
- **[Security Documentation](./docs/security/)** - Security & compliance

## 🏗️ Architecture

```
omniops-frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Builder/       # Website builder components
│   │   ├── Dashboard/     # Dashboard UI components
│   │   ├── Editor/        # Visual/code editors
│   │   └── ...
│   ├── pages/            # Page components & routes
│   │   ├── Home.jsx
│   │   ├── BuilderDashboard.jsx
│   │   ├── Workflows.jsx
│   │   └── ...
│   ├── api/              # API client modules
│   │   ├── opsvanta.js   # Main API client
│   │   └── auth.js       # Authentication
│   ├── lib/              # Utility functions
│   ├── styles/           # Global styles
│   └── assets/           # Static assets
├── public/               # Public static files
├── docs/                 # Documentation
│   ├── user-guide/       # User documentation
│   ├── admin-guide/      # Admin documentation
│   ├── developer/        # Developer docs
│   ├── knowledge-base/   # KB articles
│   └── security/         # Security docs
└── tests/                # Test files

```

## 🔧 Tech Stack

**Frontend:**

- React 19 - Modern UI library
- Vite (Rolldown) - Lightning-fast build tool
- TailwindCSS 4 - Utility-first CSS framework
- Lucide React - Beautiful icon library
- React Router 7 - Client-side routing

**State & Data:**

- React Hooks - Built-in state management
- Native Fetch API - HTTP client
- Supabase - Authentication & backend

**Development:**

- ESLint 10 - Code linting
- Prettier - Code formatting
- Husky - Git hooks
- lint-staged - Pre-commit checks

**Deployment:**

- AWS - Cloud infrastructure
- Vercel - Deployment platform
- GitHub Actions - CI/CD pipelines
- Docker - Containerization

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Read our [Contributing Guide](./CONTRIBUTING.md)
2. Review the [Code of Conduct](./CODE_OF_CONDUCT.md)
3. Check existing issues or create a new one
4. Fork the repository
5. Create a feature branch
6. Make your changes
7. Submit a pull request

**Coding Standards:**

- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

See [Contributing Guide](./CONTRIBUTING.md) for detailed information.

## 📄 License & Legal

**© 2026 WEARETHETREND / OpsVanta LLC. All Rights Reserved.**

This software is proprietary and confidential. It contains trade secrets and is protected by copyright law.

**⚠️ This is NOT open source software.**

For licensing: contact@opsvanta.com

See [COPYRIGHT.md](./COPYRIGHT.md) for complete legal terms.

## 🔒 Security

Security is our top priority. We implement:

- ✅ SOC 2 Type II compliance
- ✅ GDPR compliance
- ✅ End-to-end encryption
- ✅ Regular security audits
- ✅ Penetration testing
- ✅ Secure development practices

**Report Security Issues:**

- Email: security@opsvanta.com
- See [Security Policy](./.github/SECURITY.md)
- Responsible disclosure guidelines in [Security Documentation](./docs/security/)

## 🆘 Support

**Get Help:**

- 📧 Email: support@opsvanta.com
- 📖 Documentation: [./docs/](./docs/)
- 💬 Community: [community.opsvanta.com](https://community.opsvanta.com)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/WEARETHETREND/omniops-frontend/issues)

**Enterprise Support:**
For dedicated support, contact: young.monte@omniops-ai.com

## 🔧 Troubleshooting

### Common Issues

#### Build Errors with Dependencies

**Problem**: `ERESOLVE could not resolve` error when installing dependencies

**Solution**: Always use the `--legacy-peer-deps` flag:

```bash
npm install --legacy-peer-deps
npm run build
```

This is required due to ESLint version conflicts and is documented in all build commands.

#### Supabase Connection Errors

**Problem**: "Invalid API key" or authentication errors

**Solutions**:

1. Verify `.env` file exists and contains correct credentials
2. Check that environment variables start with `VITE_` prefix
3. Restart development server after changing `.env`
4. Verify Supabase project is active and not paused
5. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed troubleshooting

#### 404 Errors on Page Refresh (Production)

**Problem**: Direct URL access returns 404 in production

**Solution**: Already configured! The `vercel.json` includes SPA rewrites. If deploying to other platforms, ensure all routes redirect to `index.html`.

#### Environment Variables Not Working

**Problem**: `undefined` when accessing `import.meta.env.VITE_*`

**Solutions**:

1. Ensure variable names start with `VITE_` prefix
2. Restart development server after adding variables
3. Check `.env` file is in project root
4. For Vercel: Set in Dashboard → Settings → Environment Variables

#### Slow Build Times

**Problem**: Build takes longer than expected

**Solutions**:

1. Clear node_modules and reinstall: `rm -rf node_modules && npm install --legacy-peer-deps`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Ensure no large files in `src/` directory
4. Check `.gitignore` excludes `node_modules` and `dist`

### Getting More Help

If you encounter issues not covered here:

1. Check the comprehensive setup guides:
   - [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - [DEPLOYMENT.md](./DEPLOYMENT.md)
   - [ERROR_MONITORING.md](./ERROR_MONITORING.md)

2. Search [existing GitHub issues](https://github.com/WEARETHETREND/omniops-frontend/issues)

3. Review browser console for error messages

4. Contact support: support@opsvanta.com

## 🚀 Deployment

### Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Docker Deployment

```bash
# Build Docker image
docker build -t opsvanta-frontend .

# Run container
docker run -p 8080:80 opsvanta-frontend
```

### AWS Deployment

See [Deployment Guide](./docs/admin-guide/deployment.md) for complete AWS deployment instructions.

## 📊 Project Status

- **Version:** 1.0.0
- **Status:** Active Development
- **Last Updated:** February 2026
- **License:** Proprietary
- **Maintained By:** WEARETHETREND / OpsVanta LLC

## 🙏 Acknowledgments

Built with ❤️ by the WEARETHETREND team.

**Technologies & Services:**

- React Team for React 19
- Vite/Rolldown teams
- TailwindCSS team
- Supabase team
- All open source contributors

---

**For licensing, partnerships, or enterprise inquiries:**  
📧 young.monte@omniops-ai.com
