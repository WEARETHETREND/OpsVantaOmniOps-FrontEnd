# 🚀 Deployment Guide

**OpsVanta Web - Production Deployment on Vercel**

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Environment Variables Configuration](#environment-variables-configuration)
5. [Build Configuration](#build-configuration)
6. [Domain Configuration](#domain-configuration)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Troubleshooting](#troubleshooting)
9. [Rollback Procedures](#rollback-procedures)
10. [Security Checklist](#security-checklist)

---

## Prerequisites

Before deploying to Vercel, ensure you have:

- ✅ **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
- ✅ **GitHub Repository Access** - Repository must be accessible to Vercel
- ✅ **Supabase Project** - Set up at [supabase.com](https://supabase.com)
- ✅ **Node.js 20+** - Required for local builds
- ✅ **Git** - For version control

---

## Environment Setup

### 1. Supabase Configuration

1. Create a Supabase project at https://app.supabase.com
2. Navigate to **Settings → API**
3. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (safe for client-side use)

### 2. Local Environment Setup

```bash
# Clone the repository
git clone https://github.com/WEARETHETREND/omniops-frontend.git
cd omniops-frontend

# Install dependencies (IMPORTANT: use --legacy-peer-deps flag)
npm install --legacy-peer-deps

# Create environment file from template
cp .env.example .env

# Edit .env with your Supabase credentials
nano .env  # or use your preferred editor
```

**Example .env file:**
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
VITE_API_URL=http://localhost:8000
```

⚠️ **CRITICAL**: Never commit `.env` files to version control!

---

## Vercel Deployment

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Authorize Vercel to access the repository

2. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`

3. **Add Environment Variables** (see next section)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (2-5 minutes)
   - Your site will be live at `your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the interactive prompts
```

---

## Environment Variables Configuration

### Adding Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |
| `VITE_API_URL` | (Optional) Backend API URL | Production only |
| `NODE_VERSION` | `20` | Production, Preview, Development |

### Environment Scopes

- **Production**: Live site for end users
- **Preview**: Pull request and branch deployments
- **Development**: Local development (use `.env` file instead)

⚠️ **Security Note**: 
- Use different Supabase projects for production and development
- Never share production keys in public channels
- Rotate keys immediately if compromised

---

## Build Configuration

The project uses a pre-configured `vercel.json` file with optimal settings:

```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm install --legacy-peer-deps && npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --legacy-peer-deps",
  "regions": ["iad1"]
}
```

### Important Build Notes

1. **Legacy Peer Dependencies**: The `--legacy-peer-deps` flag is **required** due to ESLint version conflicts
2. **Build Time**: Average build time is 2-5 minutes
3. **Node Version**: Node.js 20 is specified in `vercel.json`

### Verifying Local Build

Before deploying, test the build locally:

```bash
# Build for production
npm run build

# Preview the production build
npm run preview

# Visit http://localhost:4173 to test
```

---

## Domain Configuration

### 1. Add Custom Domain

1. Go to **Settings → Domains** in Vercel Dashboard
2. Click "Add Domain"
3. Enter your domain name (e.g., `app.opsvanta.com`)
4. Follow DNS configuration instructions

### 2. DNS Configuration

**For root domain (opsvanta.com):**
```
A Record: 76.76.21.21
```

**For subdomain (app.opsvanta.com):**
```
CNAME: cname.vercel-dns.com
```

### 3. SSL Certificate

- Vercel automatically provisions SSL certificates
- HTTPS is enabled by default
- Certificate renewal is automatic

---

## Monitoring & Analytics

### Vercel Analytics

Analytics are **automatically enabled** with the `@vercel/analytics` package.

**Features:**
- Real-time visitor tracking
- Page view analytics
- Conversion tracking
- Geographic data

**Access Analytics:**
1. Go to your project in Vercel Dashboard
2. Click the "Analytics" tab
3. View real-time and historical data

### Vercel Speed Insights

Speed Insights are **automatically enabled** with the `@vercel/speed-insights` package.

**Metrics Tracked:**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)

**Access Speed Insights:**
1. Go to your project in Vercel Dashboard
2. Click the "Speed Insights" tab
3. Review Core Web Vitals

### Health Checks

Monitor your deployment:

```bash
# Check deployment status
curl https://your-project.vercel.app

# Expected: 200 OK response with HTML content
```

---

## Troubleshooting

### Build Failures

#### Error: "ERESOLVE unable to resolve dependency tree"

**Solution**: Ensure `--legacy-peer-deps` flag is used in build commands.

```bash
# Update build command in Vercel
npm install --legacy-peer-deps && npm run build
```

#### Error: "Module not found"

**Solution**: Clear Vercel build cache and redeploy.

1. Go to **Settings → General**
2. Scroll to "Build & Development Settings"
3. Enable "Override" for Build Command
4. Save and redeploy

### Runtime Errors

#### Error: "Supabase connection failed"

**Checklist:**
- ✅ Verify `VITE_SUPABASE_URL` is correct
- ✅ Verify `VITE_SUPABASE_ANON_KEY` is correct
- ✅ Check Supabase project is active
- ✅ Verify Row Level Security (RLS) policies

#### Error: "Blank page after deployment"

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify all environment variables are set
3. Check Content Security Policy headers in `vercel.json`
4. Test with `npm run preview` locally

### Deployment Issues

#### Issue: Deployments are slow

**Solutions:**
- Check dependency count (run `npm list --depth=0`)
- Review build logs for bottlenecks
- Consider using Vercel's edge regions

#### Issue: Environment variables not updating

**Solution**: Redeploy after updating environment variables.

```bash
# Trigger new deployment via CLI
vercel --prod

# Or via dashboard: Deployments → Redeploy
```

---

## Rollback Procedures

### Method 1: Via Vercel Dashboard (Recommended)

1. Go to **Deployments** tab
2. Find the last working deployment
3. Click the three dots (⋯) menu
4. Select "Promote to Production"
5. Confirm the rollback

**Rollback time**: ~30 seconds

### Method 2: Via Git Revert

```bash
# Find the commit to revert to
git log --oneline

# Revert to specific commit
git revert <commit-hash>

# Push to trigger new deployment
git push origin main
```

### Emergency Rollback

For critical issues, use Vercel's instant rollback:

1. Navigate to **Deployments**
2. Click on the previous production deployment
3. Click "Promote to Production"
4. Deployment is instantly switched

---

## Security Checklist

Before going live, verify:

### Environment & Secrets
- [ ] `.env` file is NOT committed to git
- [ ] `.env` is in `.gitignore`
- [ ] Production keys are different from development keys
- [ ] Environment variables are set in Vercel Dashboard
- [ ] No secrets in source code

### Supabase Security
- [ ] Row Level Security (RLS) policies are enabled
- [ ] Anonymous key is used (not service_role key)
- [ ] Database is not publicly accessible
- [ ] Realtime features are secured
- [ ] Storage buckets have proper policies

### Application Security
- [ ] Content Security Policy (CSP) is configured
- [ ] HTTPS is enforced (automatic on Vercel)
- [ ] Security headers are set in `vercel.json`
- [ ] Error boundaries catch runtime errors
- [ ] Sensitive data is not logged
- [ ] CORS policies are configured

### Dependencies
- [ ] Run `npm audit` regularly
- [ ] All dependencies are up to date
- [ ] No known vulnerabilities (check `npm audit`)
- [ ] Dependabot is enabled on GitHub

---

## Post-Deployment Checklist

After successful deployment:

1. ✅ Test all major user flows
2. ✅ Verify environment variables are working
3. ✅ Check Analytics is tracking visits
4. ✅ Verify Speed Insights is collecting data
5. ✅ Test on multiple devices and browsers
6. ✅ Check SSL certificate is valid
7. ✅ Verify custom domain is working
8. ✅ Monitor error logs for issues
9. ✅ Set up uptime monitoring (optional)
10. ✅ Document deployment for team

---

## Support & Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

### Contact
- **General Support**: support@opsvanta.com
- **Security Issues**: security@opsvanta.com
- **Enterprise Support**: young.monte@omniops-ai.com

### Useful Commands

```bash
# View deployment logs
vercel logs <deployment-url>

# List all deployments
vercel list

# Remove a deployment
vercel remove <deployment-id>

# Inspect deployment details
vercel inspect <deployment-url>
```

---

**Last Updated**: February 2026  
**Maintained By**: WEARETHETREND / OpsVanta LLC

For the latest deployment guide, visit the repository README.
