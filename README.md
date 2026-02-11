# OmniOps Frontend

[![Azure Web App](https://github.com/WEARETHETREND/omniops-frontend/actions/workflows/azure-webapps-node.yml/badge.svg)](https://github.com/WEARETHETREND/omniops-frontend/actions/workflows/azure-webapps-node.yml)
[![CodeQL](https://github.com/WEARETHETREND/omniops-frontend/actions/workflows/codeql.yml/badge.svg)](https://github.com/WEARETHETREND/omniops-frontend/actions/workflows/codeql.yml)
[![Terraform](https://github.com/WEARETHETREND/omniops-frontend/actions/workflows/terraform.yml/badge.svg)](https://github.com/WEARETHETREND/omniops-frontend/actions/workflows/terraform.yml)

OmniOps Frontend is a modern, React-based web application for operational management, featuring a comprehensive builder dashboard with project management capabilities, workflow automation, and resource management tools.

## 🚀 Features

- **Builder Dashboard**: Visual dashboard for managing operational projects
- **Project Management**: Create, edit, and track projects with rich metadata
- **Workflow Automation**: Design and manage automated workflows
- **Jobs & Tasks**: Track and manage operational jobs and tasks
- **Technician Management**: Manage team members and assignments
- **Domain & Route Management**: Configure and monitor domains and routes
- **Reports & Analytics**: Generate comprehensive operational reports
- **Responsive Design**: Mobile-first, responsive UI built with Tailwind CSS
- **Real-time Updates**: Live data synchronization with Supabase
- **Secure Authentication**: Built-in authentication with Supabase Auth

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20.x or higher
- **npm**: v9.x or higher (comes with Node.js)
- **Git**: For version control
- **Supabase Account**: For backend services (database, auth, storage)

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/WEARETHETREND/omniops-frontend.git
   cd omniops-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## ⚙️ Configuration

### Supabase Setup

1. Create a new project in [Supabase](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Set up your database schema (tables, RLS policies, etc.)
4. Configure authentication providers as needed

### Environment Variables

Required environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🛠️ Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Project Structure

```
omniops-frontend/
├── .github/              # GitHub workflows and templates
├── public/               # Static assets
├── src/
│   ├── api/             # API integration layer
│   ├── assets/          # Images and static resources
│   ├── components/      # Reusable React components
│   │   ├── Layout.jsx   # Main layout component
│   │   └── Navbar.jsx   # Navigation component
│   ├── lib/             # Utility functions and helpers
│   ├── pages/           # Page components (routes)
│   │   ├── BuilderDashboard.jsx
│   │   ├── Projects.jsx
│   │   ├── Editor.jsx
│   │   ├── Jobs.jsx
│   │   ├── Workflows.jsx
│   │   ├── Technicians.jsx
│   │   ├── Domains.jsx
│   │   ├── Routes.jsx
│   │   ├── Settings.jsx
│   │   ├── Reports.jsx
│   │   └── Login.jsx
│   ├── styles/          # Global styles and CSS modules
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global CSS with Tailwind directives
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite build configuration
```

## 🏗️ Building

Build the application for production:

```bash
npm run build
```

This will:

- Bundle and minify your code
- Optimize assets
- Generate production-ready files in the `dist/` directory

Preview the production build locally:

```bash
npm run preview
```

## 🚢 Deployment

This project includes CI/CD workflows for multiple platforms:

### Azure Web Apps

Automatically deploys to Azure Web Apps on push to `main` branch. See `.github/workflows/azure-webapps-node.yml`.

### AWS

Deploy to AWS infrastructure using the AWS workflow. See `.github/workflows/aws.yml`.

### Terraform

Infrastructure as Code deployment using Terraform. See `.github/workflows/terraform.yml`.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting provider
3. Ensure environment variables are configured on the hosting platform

## 🏛️ Architecture

### Frontend Architecture

- **Framework**: React 19.2 with functional components and hooks
- **Routing**: React Router DOM v7 for client-side routing
- **State Management**: React hooks and context (useState, useEffect, useContext)
- **Styling**: Tailwind CSS for utility-first styling
- **Build Tool**: Vite (with Rolldown) for fast builds and HMR

### Backend Integration

- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime for live updates
- **Storage**: Supabase Storage for file uploads

### Key Design Patterns

- **Component-Based Architecture**: Modular, reusable components
- **Container/Presentational Pattern**: Separation of logic and presentation
- **Custom Hooks**: Encapsulated business logic
- **Layout Components**: Consistent page structure

## 🛠️ Technologies

### Core Technologies

- **React** 19.2.0 - UI library
- **React Router DOM** 7.10.1 - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** 4.1.17 - Utility-first CSS framework

### Backend Services

- **Supabase** 2.90.1 - Backend as a Service (database, auth, storage)

### UI & Icons

- **Lucide React** 0.563.0 - Icon library

### Development Tools

- **ESLint** 9.39.1 - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Development workflow
- Code style guidelines
- Pull request process
- Testing requirements

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'feat: add some feature'`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

## 🔒 Security

Security is a top priority. Please review our [Security Policy](SECURITY.md) for:

- Reporting vulnerabilities
- Security best practices
- Supported versions

If you discover a security vulnerability, please email [INSERT SECURITY EMAIL] instead of opening a public issue.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Documentation**: Check this README and [CONTRIBUTING.md](CONTRIBUTING.md)
- **Issues**: [GitHub Issues](https://github.com/WEARETHETREND/omniops-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/WEARETHETREND/omniops-frontend/discussions)

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Made with ❤️ by WEARETHETREND**
