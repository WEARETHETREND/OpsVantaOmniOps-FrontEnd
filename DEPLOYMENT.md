# Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying OpsVanta Web to production using Vercel, along with CI/CD setup and operational procedures.

## Table of Contents

1. [Vercel Deployment](#vercel-deployment)
2. [Environment Variables](#environment-variables)
3. [Domain Configuration](#domain-configuration)
4. [CI/CD Setup](#cicd-setup)
5. [Rollback Procedures](#rollback-procedures)
6. [Monitoring & Observability](#monitoring--observability)
7. [Troubleshooting](#troubleshooting)

---

## Vercel Deployment

### Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub repository access
- Supabase project configured (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))

### Initial Deployment

#### Step 1: Connect Repository to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `WEARETHETREND/omniops-frontend`
4. Authorize Vercel to access your repository

#### Step 2: Configure Build Settings

Vercel should auto-detect the framework, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install --legacy-peer-deps`

⚠️ **IMPORTANT**: The `--legacy-peer-deps` flag is REQUIRED due to ESLint version conflicts.

#### Step 3: Configure Environment Variables

See [Environment Variables](#environment-variables) section below.

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (typically 2-3 minutes)
3. Vercel will provide a preview URL: `https://your-project.vercel.app`

---

## Environment Variables

### Required Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |

### Setting Environment Variables

#### Via Vercel Dashboard

1. Go to your project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Click "Add New"
4. Enter:
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: `https://your-project.supabase.co`
   - **Environments**: Check Production, Preview, and Development
5. Repeat for `VITE_SUPABASE_ANON_KEY`
6. Click "Save"

#### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add VITE_SUPABASE_URL
# Enter value when prompted
# Select environments: Production, Preview, Development

vercel env add VITE_SUPABASE_ANON_KEY
# Enter value when prompted
# Select environments: Production, Preview, Development
```

### Environment-Specific Configuration

You can set different values for different environments:

- **Production**: Live application environment
- **Preview**: Pull request preview deployments
- **Development**: Local development (use `.env` file instead)

### Updating Environment Variables

1. Update values in Vercel Dashboard
2. Redeploy for changes to take effect:
   ```bash
   vercel --prod
   ```

---

## Domain Configuration

### Adding a Custom Domain

#### Step 1: Add Domain in Vercel

1. Go to your project → **Settings** → **Domains**
2. Click "Add"
3. Enter your domain: `yourdomain.com`
4. Click "Add"

#### Step 2: Configure DNS

Vercel will provide DNS configuration instructions. You have two options:

**Option A: Use Vercel Nameservers (Recommended)**

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update nameservers to Vercel's:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
3. Wait for DNS propagation (up to 48 hours)

**Option B: Use CNAME Record**

1. Add a CNAME record:
   - **Name**: `www` (or `@` for root)
   - **Value**: `cname.vercel-dns.com`
2. Add an A record for root domain:
   - **Name**: `@`
   - **Value**: `76.76.21.21`

#### Step 3: SSL Certificate

Vercel automatically provisions SSL certificates:
- Free SSL via Let's Encrypt
- Auto-renewal
- HTTPS enforced automatically

### Multiple Domains

You can add multiple domains (e.g., `www` and root):

1. Add both `yourdomain.com` and `www.yourdomain.com`
2. Set one as primary (redirects others to it)
3. Configure in **Settings** → **Domains**

---

## CI/CD Setup

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### GitHub Integration

Vercel creates:
- ✅ Deployment status checks on PRs
- ✅ Preview URLs for each commit
- ✅ Automatic comments on PRs with preview links

### Deployment Configuration

Edit `vercel.json` for advanced configuration:

```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm install --legacy-peer-deps && npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --legacy-peer-deps",
  "regions": ["iad1"],
  "env": {
    "NODE_VERSION": "20"
  }
}
```

### Build Hooks

Create build hooks for external triggers:

1. Go to **Settings** → **Git** → **Deploy Hooks**
2. Create a hook: "Production Rebuild"
3. Copy the webhook URL
4. Use with external services or manual triggers:
   ```bash
   curl -X POST https://api.vercel.com/v1/integrations/deploy/...
   ```

### GitHub Actions Integration

Create `.github/workflows/deploy.yml` for custom workflows:

```yaml
name: Vercel Production Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Rollback Procedures

### Via Vercel Dashboard

#### Step 1: View Deployments

1. Go to your project in Vercel
2. Click "Deployments" tab
3. See list of all deployments with status

#### Step 2: Rollback to Previous Deployment

1. Find the last known good deployment
2. Click the three dots (⋯) menu
3. Click "Promote to Production"
4. Confirm the rollback

**Time to rollback**: ~30 seconds

### Via Vercel CLI

```bash
# List deployments
vercel ls

# Promote a specific deployment to production
vercel promote <deployment-url> --scope=<team-name>
```

### Git-Based Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-sha>
git push --force origin main
```

⚠️ **Warning**: Force push may trigger unintended consequences. Use `revert` when possible.

### Emergency Rollback Checklist

- [ ] Identify the issue and last known good deployment
- [ ] Notify team of rollback
- [ ] Execute rollback via Vercel Dashboard or CLI
- [ ] Verify application is working
- [ ] Check monitoring/logs for errors
- [ ] Update incident log
- [ ] Schedule post-mortem

---

## Monitoring & Observability

### Built-in Vercel Monitoring

#### Analytics

Enable Vercel Analytics:

1. Go to **Analytics** tab in your project
2. Enable Web Analytics
3. Add to your app:
   ```bash
   npm install @vercel/analytics
   ```

4. Update `src/main.jsx`:
   ```javascript
   import { inject } from '@vercel/analytics';
   inject();
   ```

#### Speed Insights

Enable Vercel Speed Insights:

1. Go to **Speed Insights** tab
2. Enable it
3. Add to your app:
   ```bash
   npm install @vercel/speed-insights
   ```

4. Update `src/main.jsx`:
   ```javascript
   import { injectSpeedInsights } from '@vercel/speed-insights';
   injectSpeedInsights();
   ```

### External Monitoring

#### Sentry Error Tracking

1. Sign up at https://sentry.io
2. Create a new project
3. Install Sentry:
   ```bash
   npm install @sentry/react
   ```

4. Configure in `src/main.jsx`:
   ```javascript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "your-sentry-dsn",
     environment: import.meta.env.MODE,
     tracesSampleRate: 1.0,
   });
   ```

#### Uptime Monitoring

Recommended services:
- **UptimeRobot**: https://uptimerobot.com (Free tier available)
- **Pingdom**: https://www.pingdom.com
- **StatusCake**: https://www.statuscake.com

### Logs

#### View Deployment Logs

1. Vercel Dashboard → Deployments
2. Click on a deployment
3. View build logs and function logs

#### Runtime Logs

```bash
# Stream logs in real-time
vercel logs <deployment-url> --follow

# Get recent logs
vercel logs <deployment-url> --since 1h
```

### Performance Monitoring

Check these metrics regularly:
- **Lighthouse Score**: Aim for >90
- **Time to First Byte (TTFB)**: <200ms
- **First Contentful Paint (FCP)**: <1.5s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Cumulative Layout Shift (CLS)**: <0.1

---

## Troubleshooting

### Common Deployment Issues

#### 1. Build Failing with Dependency Errors

**Symptom**: `ERESOLVE could not resolve` errors

**Solution**:
```bash
# Ensure build command uses --legacy-peer-deps
npm install --legacy-peer-deps && npm run build
```

Update `vercel.json`:
```json
{
  "buildCommand": "npm install --legacy-peer-deps && npm run build",
  "installCommand": "npm install --legacy-peer-deps"
}
```

#### 2. Environment Variables Not Available

**Symptom**: `undefined` errors for `import.meta.env.VITE_*`

**Solution**:
- Verify environment variables are set in Vercel Dashboard
- Ensure variable names start with `VITE_`
- Redeploy after adding variables
- Check correct environment (Production/Preview/Development)

#### 3. 404 Errors on Page Refresh

**Symptom**: Direct URL access returns 404

**Solution**:
Ensure `vercel.json` has SPA rewrites:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 4. Supabase Connection Errors

**Symptom**: "Invalid API key" or CORS errors

**Solution**:
- Verify Supabase URL in environment variables
- Check CORS settings in Supabase Dashboard
- Add Vercel domain to Supabase allowed origins:
  - Dashboard → Authentication → URL Configuration
  - Add: `https://your-domain.vercel.app`

#### 5. Slow Build Times

**Symptom**: Builds taking >5 minutes

**Solution**:
- Optimize dependencies (remove unused packages)
- Check for large files in repository
- Use proper `.gitignore` patterns
- Consider using Vercel's build cache

### Getting Help

- **Vercel Support**: https://vercel.com/support
- **Community Discord**: https://vercel.com/discord
- **Documentation**: https://vercel.com/docs
- **OpsVanta Support**: contact@opsvanta.com

---

## Best Practices

### Pre-Deployment Checklist

- [ ] All tests passing locally
- [ ] Linter passes: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] Environment variables documented
- [ ] No secrets in code
- [ ] `.env` not committed
- [ ] Dependencies up to date (security patches)
- [ ] Change log updated
- [ ] Team notified of deployment

### Production Readiness

- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Environment variables set correctly
- [ ] Monitoring enabled (Analytics, Speed Insights)
- [ ] Error tracking configured (Sentry)
- [ ] Backup strategy defined
- [ ] Rollback procedure tested
- [ ] Performance metrics baseline established

### Security Checklist

- [ ] HTTPS enforced
- [ ] Security headers configured in `vercel.json`
- [ ] No secrets in frontend code
- [ ] Supabase RLS policies enabled
- [ ] Authentication working correctly
- [ ] CORS properly configured
- [ ] Dependencies have no known vulnerabilities

---

## Additional Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Deployment Guide**: https://vitejs.dev/guide/static-deploy.html
- **Supabase Setup**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Main README**: [README.md](./README.md)

---

**© 2026 OpsVanta LLC - Proprietary and Confidential**
