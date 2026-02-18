# Error Monitoring Setup Guide

## Overview

This guide provides instructions for setting up error monitoring and observability for OpsVanta Web using industry-standard tools like Sentry, along with built-in error handling utilities.

## Table of Contents

1. [Built-in Error Handling](#built-in-error-handling)
2. [Sentry Integration](#sentry-integration)
3. [Vercel Analytics](#vercel-analytics)
4. [Custom Error Tracking](#custom-error-tracking)
5. [Best Practices](#best-practices)

---

## Built-in Error Handling

The application includes several built-in error handling utilities:

### ErrorBoundary Component

Located at `src/components/ErrorBoundary.jsx`, this component catches React errors:

```jsx
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      {/* Your app components */}
    </ErrorBoundary>
  );
}
```

**Features:**
- Catches JavaScript errors in component tree
- Displays user-friendly error UI
- Shows detailed error info in development
- Provides "Try Again" and "Go Home" actions

### Toast Notifications

Located at `src/components/Toast.jsx`:

```jsx
import { ToastProvider, useToast } from './components/Toast';

// Wrap your app
function App() {
  return (
    <ToastProvider>
      {/* Your app */}
    </ToastProvider>
  );
}

// Use in components
function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('Operation completed successfully!');
  };

  const handleError = () => {
    toast.error('An error occurred');
  };
}
```

**Toast Types:**
- `toast.success(message, duration)` - Success notifications
- `toast.error(message, duration)` - Error notifications
- `toast.warning(message, duration)` - Warning notifications
- `toast.info(message, duration)` - Info notifications

### Supabase Error Utilities

Located at `src/lib/supabaseErrors.js`:

```javascript
import {
  handleSupabaseError,
  getErrorMessage,
  isAuthError,
  retryOperation,
} from './lib/supabaseErrors';

// Handle Supabase operations
const { data, error } = await supabase.from('projects').select();
const result = handleSupabaseError({ data, error }, 'Fetch projects');

if (!result.success) {
  toast.error(result.error);
  return;
}

// Use the data
console.log(result.data);

// Retry on network errors
const result = await retryOperation(
  () => supabase.from('projects').select(),
  3, // max retries
  1000 // initial delay (ms)
);
```

**Utilities:**
- `handleSupabaseError(result, context)` - Standardized error handling
- `getErrorMessage(error)` - User-friendly error messages
- `isAuthError(error)` - Check if auth error
- `isNetworkError(error)` - Check if network error
- `isPermissionError(error)` - Check if RLS permission error
- `retryOperation(fn, retries, delay)` - Retry with exponential backoff

---

## Sentry Integration

Sentry provides real-time error tracking and performance monitoring.

### Step 1: Sign Up for Sentry

1. Go to https://sentry.io
2. Create an account (free tier available)
3. Create a new project:
   - **Platform**: React
   - **Alert Frequency**: Real-time
   - **Name**: opsvanta-web

### Step 2: Install Sentry SDK

```bash
npm install @sentry/react
```

### Step 3: Configure Sentry

Create `src/lib/sentry.js`:

```javascript
/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 */

import * as Sentry from '@sentry/react';

export function initSentry() {
  // Only initialize in production
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      
      // Performance Monitoring
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      
      // Set tracesSampleRate to 1.0 to capture 100% of transactions
      // Lower in production to reduce quota usage
      tracesSampleRate: 0.1,
      
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      
      // Filter out sensitive data
      beforeSend(event, hint) {
        // Remove sensitive information
        if (event.request) {
          delete event.request.cookies;
        }
        return event;
      },
    });
  }
}

// Helper to manually capture exceptions
export function captureException(error, context) {
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      tags: { context },
    });
  } else {
    console.error('[Sentry]', context, error);
  }
}

// Helper to capture messages
export function captureMessage(message, level = 'info') {
  if (import.meta.env.PROD) {
    Sentry.captureMessage(message, level);
  } else {
    console.log('[Sentry]', message);
  }
}
```

### Step 4: Initialize in App

Update `src/main.jsx`:

```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initSentry } from './lib/sentry';
import './index.css';

// Initialize Sentry first
initSentry();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### Step 5: Add Environment Variable

Add to `.env.example`:

```env
# Sentry Configuration (Optional - for error tracking)
# VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

Add to Vercel environment variables:

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add `VITE_SENTRY_DSN` with your Sentry DSN
3. Select all environments (Production, Preview, Development)

### Step 6: Wrap App with Sentry ErrorBoundary

Update `src/App.jsx`:

```javascript
import * as Sentry from '@sentry/react';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorBoundary />}>
      {/* Your app content */}
    </Sentry.ErrorBoundary>
  );
}

export default App;
```

### Sentry Features

1. **Error Tracking**: Automatic capture of unhandled errors
2. **Performance Monitoring**: Track slow operations
3. **Session Replay**: Record user sessions for debugging
4. **Release Tracking**: Track errors by release version
5. **Source Maps**: Upload for better stack traces
6. **Custom Context**: Add user info, tags, and metadata

---

## Vercel Analytics

Vercel provides built-in analytics for monitoring application performance.

### Step 1: Install Vercel Analytics

```bash
npm install @vercel/analytics
```

### Step 2: Add to Application

Update `src/main.jsx`:

```javascript
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();
```

### Step 3: Enable in Vercel Dashboard

1. Go to your project in Vercel
2. Navigate to **Analytics** tab
3. Enable Web Analytics

### Vercel Speed Insights

For detailed performance metrics:

```bash
npm install @vercel/speed-insights
```

Update `src/main.jsx`:

```javascript
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();
```

---

## Custom Error Tracking

### Tracking User Actions

Create `src/lib/analytics.js`:

```javascript
/**
 * Track custom events
 */
export function trackEvent(eventName, properties = {}) {
  // Log in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, properties);
    return;
  }

  // Send to analytics service in production
  // Example: window.analytics?.track(eventName, properties);
}

/**
 * Track errors with context
 */
export function trackError(error, context = {}) {
  console.error('[Error]', error, context);

  if (import.meta.env.PROD) {
    // Send to error tracking service
    // Sentry.captureException(error, { extra: context });
  }
}

/**
 * Track user flow
 */
export function trackPageView(pageName) {
  if (import.meta.env.DEV) {
    console.log('[PageView]', pageName);
    return;
  }

  // Track page view in analytics
}
```

### Usage Example

```javascript
import { trackEvent, trackError } from './lib/analytics';

function handleCreateProject() {
  try {
    // Your logic
    trackEvent('project_created', {
      template: 'blog',
      userId: user.id,
    });
  } catch (error) {
    trackError(error, {
      action: 'create_project',
      userId: user.id,
    });
    toast.error('Failed to create project');
  }
}
```

---

## Best Practices

### 1. Error Handling Patterns

```javascript
// ✅ Good: Handle errors gracefully
async function fetchData() {
  try {
    const { data, error } = await supabase.from('projects').select();
    
    if (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      captureException(error, { context: 'fetch_projects' });
      return null;
    }
    
    return data;
  } catch (error) {
    toast.error('An unexpected error occurred');
    captureException(error, { context: 'fetch_projects' });
    return null;
  }
}

// ❌ Bad: Silent failures
async function fetchData() {
  const { data } = await supabase.from('projects').select();
  return data; // Error not handled
}
```

### 2. Loading States

```javascript
function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    try {
      const result = await someAsyncOperation();
      toast.success('Operation completed!');
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
}
```

### 3. User Feedback

Always provide feedback for:
- ✅ Successful operations
- ✅ Failed operations
- ✅ Loading states
- ✅ Network issues
- ✅ Permission errors

### 4. Error Context

Provide context when logging errors:

```javascript
captureException(error, {
  user: user.id,
  action: 'delete_project',
  projectId: project.id,
  timestamp: new Date().toISOString(),
});
```

### 5. Privacy Considerations

Never log or track:
- 🚫 Passwords
- 🚫 API keys
- 🚫 Personal identifiable information (PII)
- 🚫 Credit card information
- 🚫 Authentication tokens

---

## Monitoring Checklist

- [ ] Sentry configured and working
- [ ] Error boundaries in place
- [ ] Toast notifications implemented
- [ ] Supabase error handling utility used
- [ ] Loading states for async operations
- [ ] Vercel Analytics enabled
- [ ] Performance metrics baseline established
- [ ] Alert rules configured in Sentry
- [ ] Error notification emails set up
- [ ] Source maps uploaded for production builds

---

## Troubleshooting

### Sentry Not Capturing Errors

1. Check DSN is correct in environment variables
2. Verify Sentry is initialized in production build
3. Check browser console for Sentry initialization errors
4. Verify project quota in Sentry dashboard

### Errors Not Showing in Development

This is expected! Sentry and production error tracking are disabled in development mode. Check browser console instead.

### Too Many Errors in Sentry

1. Implement sampling: Lower `tracesSampleRate`
2. Filter out known errors in `beforeSend`
3. Add error grouping rules
4. Implement rate limiting for specific errors

---

## Additional Resources

- **Sentry Docs**: https://docs.sentry.io/platforms/javascript/guides/react/
- **Vercel Analytics**: https://vercel.com/docs/analytics
- **Error Handling Best Practices**: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary

---

**© 2026 OpsVanta LLC - Proprietary and Confidential**
