# Installation Guide

Complete guide to installing and setting up OpsVanta.

## Prerequisites

### System Requirements
- Node.js 18+ installed
- npm 8+ or yarn
- Git 2.x+
- 4GB+ RAM recommended
- 20GB+ available storage

See [System Requirements](./system-requirements.md) for complete details.

### Required Services
- PostgreSQL 14+ (optional for self-hosted)
- Redis 6+ (optional for self-hosted)
- AWS S3 or compatible storage
- SMTP server for email

## Quick Installation

### For Development

```bash
# Clone repository
git clone https://github.com/WEARETHETREND/omniops-frontend.git
cd omniops-frontend

# Install dependencies
npm install --legacy-peer-deps

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run dev
```

Visit http://localhost:5173

### For Production

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build for production
npm run build

# Serve built files
# Use nginx, Apache, or your preferred web server
```

## Detailed Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/WEARETHETREND/omniops-frontend.git
cd omniops-frontend
```

### Step 2: Install Dependencies

**Using npm:**
```bash
npm install --legacy-peer-deps
```

**Using yarn:**
```bash
yarn install
```

**Note:** Use `--legacy-peer-deps` due to ESLint version conflicts.

### Step 3: Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and configure:

```bash
# Application
VITE_APP_NAME=OpsVanta
VITE_APP_URL=http://localhost:5173

# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# API Configuration
VITE_API_URL=https://api.opsvanta.com

# Optional: Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Step 4: Build Application

```bash
npm run build
```

This creates a `dist/` directory with production files.

### Step 5: Deploy

#### Option 1: Static Hosting (Vercel, Netlify)

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Option 2: Docker

```bash
# Build Docker image
docker build -t opsvanta-frontend .

# Run container
docker run -p 80:80 opsvanta-frontend
```

#### Option 3: Traditional Server (nginx)

1. Copy `dist/` contents to web root
2. Configure nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/opsvanta;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Verification

### Check Installation

1. Open browser to your deployment URL
2. You should see the OpsVanta homepage
3. Try creating an account
4. Test creating a project

### Health Check

Application should be accessible and functional at configured URL.

## Post-Installation

### Security Hardening

1. Enable HTTPS (Let's Encrypt)
2. Configure firewall
3. Set up monitoring
4. Enable automated backups

### Optimization

1. Enable CDN
2. Configure caching
3. Optimize images
4. Enable compression

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Error: "EACCES permission denied"**
```bash
sudo chown -R $USER ~/.npm
```

### Runtime Errors

**Blank page after deployment:**
- Check browser console for errors
- Verify BASE_URL in vite.config.js
- Ensure environment variables are set

**API connection fails:**
- Verify VITE_API_URL is correct
- Check CORS configuration
- Ensure API is accessible

## Updating

### Update to Latest Version

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install --legacy-peer-deps

# Rebuild
npm run build

# Restart application
```

## Uninstallation

To completely remove OpsVanta:

```bash
# Stop any running processes
# Remove application directory
rm -rf /path/to/omniops-frontend

# Remove configuration
rm ~/.opsvanta
```

## Next Steps

- [Environment Setup](./environment-setup.md)
- [Database Configuration](./database-setup.md)
- [Deployment Guide](./deployment.md)
- [Configuration Reference](../configuration/configuration-reference.md)

## Support

**Installation Help:**
- 📧 Email: support@opsvanta.com
- 💬 Discord: #installation-help
- 📖 Docs: [docs.opsvanta.com](https://docs.opsvanta.com)

---

**Last Updated:** February 2026
