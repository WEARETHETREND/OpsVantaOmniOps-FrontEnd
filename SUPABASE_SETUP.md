# Supabase Integration Setup Guide

## Overview

This guide provides comprehensive instructions for setting up Supabase as the backend for OpsVanta Web. Supabase provides authentication, database, real-time subscriptions, and storage.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js 18+ installed
- Basic understanding of PostgreSQL and SQL

## Table of Contents

1. [Creating a Supabase Project](#creating-a-supabase-project)
2. [Environment Configuration](#environment-configuration)
3. [Database Schema Setup](#database-schema-setup)
4. [Row Level Security (RLS)](#row-level-security-rls)
5. [Authentication Setup](#authentication-setup)
6. [Testing the Integration](#testing-the-integration)
7. [Troubleshooting](#troubleshooting)

---

## Creating a Supabase Project

### Step 1: Create New Project

1. Go to https://app.supabase.com
2. Click "New project"
3. Fill in the project details:
   - **Name**: `opsvanta-web` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development

4. Click "Create new project"
5. Wait 2-3 minutes for project provisioning

### Step 2: Get Your API Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Long JWT token starting with `eyJ...`

3. Keep these values secure - you'll need them for environment setup

---

## Environment Configuration

### Step 1: Create .env File

```bash
# Copy the example file
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit `.env` and add your Supabase credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANT**: 
- NEVER commit `.env` to version control
- The `.env` file is already in `.gitignore`
- Only commit `.env.example` with placeholder values

---

## Database Schema Setup

### Required Tables

The application requires the following database tables:

#### 1. users_extended (User Profiles)

```sql
-- Create users_extended table for additional user data
CREATE TABLE public.users_extended (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_users_extended_email ON public.users_extended(email);

-- Enable RLS
ALTER TABLE public.users_extended ENABLE ROW LEVEL SECURITY;
```

#### 2. projects (User Projects/Websites)

```sql
-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  domain TEXT,
  template_id TEXT,
  status TEXT DEFAULT 'draft', -- draft, published, archived
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_projects_status ON public.projects(status);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
```

#### 3. project_pages (Website Pages)

```sql
-- Create project_pages table
CREATE TABLE public.project_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  path TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  is_home BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, path)
);

-- Create indexes
CREATE INDEX idx_project_pages_project_id ON public.project_pages(project_id);

-- Enable RLS
ALTER TABLE public.project_pages ENABLE ROW LEVEL SECURITY;
```

### Database Functions

Create useful database functions:

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_users_extended_updated_at
  BEFORE UPDATE ON public.users_extended
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_pages_updated_at
  BEFORE UPDATE ON public.project_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## Row Level Security (RLS)

RLS ensures users can only access their own data. **This is critical for security!**

### users_extended Policies

```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.users_extended FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users_extended FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.users_extended FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### projects Policies

```sql
-- Users can view their own projects
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create projects
CREATE POLICY "Users can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own projects
CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own projects
CREATE POLICY "Users can delete own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);
```

### project_pages Policies

```sql
-- Users can view pages of their own projects
CREATE POLICY "Users can view own project pages"
  ON public.project_pages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_pages.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Users can create pages for their own projects
CREATE POLICY "Users can create own project pages"
  ON public.project_pages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_pages.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Users can update pages of their own projects
CREATE POLICY "Users can update own project pages"
  ON public.project_pages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_pages.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Users can delete pages of their own projects
CREATE POLICY "Users can delete own project pages"
  ON public.project_pages FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_pages.project_id
      AND projects.user_id = auth.uid()
    )
  );
```

---

## Authentication Setup

### Email/Password Authentication

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Ensure **Email** provider is enabled (it's enabled by default)
3. Configure email templates under **Authentication** → **Email Templates**

### OAuth Providers (Optional)

To enable social login (Google, GitHub, etc.):

1. Go to **Authentication** → **Providers**
2. Enable your desired provider
3. Add OAuth credentials from the provider
4. Configure redirect URLs

### Authentication Flow

The application uses Supabase Auth with the following flow:

```javascript
// Sign Up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
});

// Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password'
});

// Sign Out
await supabase.auth.signOut();

// Get Current User
const { data: { user } } = await supabase.auth.getUser();
```

### Session Management

Supabase handles sessions automatically:
- Sessions are stored in localStorage
- Tokens are refreshed automatically
- Session persistence across page reloads

---

## Testing the Integration

### Step 1: Start Development Server

```bash
npm run dev
```

### Step 2: Test Database Connection

Create a test file `src/lib/supabase-test.js`:

```javascript
import { supabase } from './supabase';

export async function testConnection() {
  const { data, error } = await supabase
    .from('projects')
    .select('count');
  
  if (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
  
  console.log('Supabase connection successful!');
  return true;
}
```

### Step 3: Test Authentication

Try signing up a test user through the UI or using the console:

```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'TestPassword123!'
});

console.log('Sign up result:', data, error);
```

---

## Troubleshooting

### Common Issues

#### 1. "Invalid API key" or 401 errors

**Cause**: Incorrect Supabase URL or anon key

**Solution**:
- Double-check `.env` values match Supabase dashboard
- Restart dev server after changing `.env`
- Verify no extra spaces in environment variables

#### 2. "relation does not exist" errors

**Cause**: Database tables not created

**Solution**:
- Run all SQL migration scripts in Supabase SQL Editor
- Verify table names match exactly (case-sensitive!)
- Check that you're using the `public` schema

#### 3. RLS "permission denied" errors

**Cause**: Row Level Security policies not configured

**Solution**:
- Verify RLS is enabled: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- Apply all RLS policies from this guide
- Test with authenticated user (auth.uid() must exist)

#### 4. CORS errors

**Cause**: Incorrect frontend URL in Supabase settings

**Solution**:
1. Go to **Authentication** → **URL Configuration**
2. Add your development URL: `http://localhost:5173`
3. Add your production URL when deploying

#### 5. Email confirmation not working

**Cause**: Email confirmation is required by default

**Solution**:
- For development: Disable email confirmation in **Authentication** → **Providers** → **Email**
- For production: Keep email confirmation enabled and configure SMTP

### Debugging Tips

1. **Check Supabase logs**: Dashboard → Logs → All logs
2. **Use browser console**: Check for error messages
3. **Test with SQL Editor**: Run queries directly in dashboard
4. **Verify auth state**: Use Supabase dashboard Auth tab to see registered users

---

## Additional Resources

- **Official Docs**: https://supabase.com/docs
- **JavaScript Client Docs**: https://supabase.com/docs/reference/javascript
- **Auth Helpers**: https://supabase.com/docs/guides/auth
- **Database Guide**: https://supabase.com/docs/guides/database
- **RLS Guide**: https://supabase.com/docs/guides/auth/row-level-security

---

## Security Best Practices

1. ✅ **Never expose service_role key** in frontend code
2. ✅ **Always use RLS policies** for data access control
3. ✅ **Validate input** on the database level with constraints
4. ✅ **Use HTTPS** in production (automatic with Vercel)
5. ✅ **Rotate keys** periodically
6. ✅ **Enable MFA** for Supabase dashboard access
7. ✅ **Monitor logs** for suspicious activity
8. ✅ **Keep dependencies updated** (`@supabase/supabase-js`)

---

## Getting Help

- **Email**: contact@opsvanta.com
- **Supabase Support**: https://supabase.com/support
- **Community**: https://github.com/supabase/supabase/discussions

---

**© 2026 OpsVanta LLC - Proprietary and Confidential**
