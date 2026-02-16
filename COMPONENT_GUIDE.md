# Component Structure & Architecture

## Overview

This document provides a comprehensive guide to the component structure and architecture of OpsVanta Web. It covers component organization, patterns, best practices, and code examples.

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [Component Patterns](#component-patterns)
3. [State Management](#state-management)
4. [Styling Guidelines](#styling-guidelines)
5. [Error Handling](#error-handling)
6. [Performance Optimization](#performance-optimization)
7. [Code Examples](#code-examples)

---

## Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── Builder/         # Website builder components
│   ├── ErrorBoundary.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── Toast.jsx
│   └── ...
├── pages/              # Page components (routes)
│   ├── Home.jsx
│   ├── BuilderDashboard.jsx
│   ├── Workflows.jsx
│   └── ...
├── api/                # API client modules
│   ├── opsvanta.js     # Main API client
│   └── auth.js         # Authentication
├── lib/                # Utility functions and helpers
│   ├── supabase.js     # Supabase client
│   ├── supabaseErrors.js
│   └── ...
├── data/               # Static data and configurations
├── styles/             # Global styles
├── assets/             # Static assets (images, icons)
├── App.jsx             # Root application component
├── main.jsx            # Application entry point
└── index.css           # Global CSS
```

### Component Categories

#### 1. Pages (Routes)

**Location**: `src/pages/`

Page components represent entire routes/screens:

- One component per route
- Handle data fetching
- Compose smaller components
- Implement page-specific logic

#### 2. UI Components

**Location**: `src/components/`

Reusable UI components:

- Small, focused components
- Highly reusable
- Minimal business logic
- Well-documented props

#### 3. Feature Components

**Location**: `src/components/[Feature]/`

Feature-specific components grouped by domain:

- Builder components
- Dashboard components
- Auth components

---

## Component Patterns

### 1. Functional Components

All components use React functional components with hooks:

```jsx
/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 */

import { useState, useEffect } from 'react';

function MyComponent({ title, onSave }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Effect logic
  }, []);

  return <div>{loading ? <p>Loading...</p> : <div>{data}</div>}</div>;
}

export default MyComponent;
```

### 2. Component Structure Template

Standard component structure:

```jsx
/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 *
 * UNAUTHORIZED ACCESS, USE, COPYING, OR DISTRIBUTION PROHIBITED
 *
 * This file contains trade secrets and confidential information.
 * Violators will be prosecuted under trade secret law.
 *
 * Authorized use only. See COPYRIGHT.md for terms.
 */

// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party imports
import { SomeIcon } from 'lucide-react';

// 3. Local imports
import { supabase } from '../lib/supabase';
import { useToast } from './Toast';

/**
 * Component description
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display
 * @param {Function} props.onSave - Save callback
 */
function MyComponent({ title, onSave }) {
  // 4. Hooks (state, effects, custom hooks)
  const [data, setData] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  // 5. Event handlers
  async function fetchData() {
    // Implementation
  }

  function handleClick() {
    // Implementation
  }

  // 6. Render logic
  if (!data) {
    return <div>Loading...</div>;
  }

  // 7. Main render
  return (
    <div className="container">
      <h1>{title}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default MyComponent;
```

### 3. Props Pattern

Use destructured props with defaults:

```jsx
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}) {
  const baseClasses = 'rounded-lg font-medium transition-all';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 4. Custom Hooks Pattern

Extract reusable logic into custom hooks:

```jsx
// src/lib/useProjects.js
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { handleSupabaseError } from './supabaseErrors';
import { useToast } from '../components/Toast';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  async function fetchProjects() {
    setLoading(true);
    setError(null);

    const result = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    const { success, data, error: err } = handleSupabaseError(result, 'Fetch projects');

    if (success) {
      setProjects(data);
    } else {
      setError(err);
      toast.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
}

// Usage in component
function ProjectList() {
  const { projects, loading, error, refetch } = useProjects();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}
```

---

## State Management

### Local State (useState)

For component-specific state:

```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
});

const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
```

### Side Effects (useEffect)

For data fetching and subscriptions:

```jsx
// Fetch data on mount
useEffect(() => {
  fetchData();
}, []);

// Subscribe to changes
useEffect(() => {
  const subscription = supabase
    .channel('projects')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, handleChange)
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);

// React to prop changes
useEffect(() => {
  if (projectId) {
    fetchProject(projectId);
  }
}, [projectId]);
```

### Context API (for global state)

For app-wide state (auth, theme, etc.):

```jsx
// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Usage
function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return <div>Welcome, {user.email}</div>;
}
```

---

## Styling Guidelines

### Tailwind CSS Patterns

Use consistent Tailwind patterns:

```jsx
// Layout patterns
<div className="container mx-auto px-4 py-8">
<div className="max-w-7xl mx-auto">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Spacing
<div className="space-y-4">      // Vertical spacing between children
<div className="flex gap-4">      // Horizontal spacing between children

// Colors
<div className="bg-white dark:bg-gray-900">
<div className="text-gray-900 dark:text-white">

// Gradients
<div className="bg-gradient-to-r from-blue-600 to-purple-600">
<div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">

// Glassmorphism
<div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl">

// Hover states
<button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200">

// Responsive design
<div className="w-full sm:w-auto md:w-1/2 lg:w-1/3">
```

### Component Variants

Create variant-based styling:

```jsx
const cardVariants = {
  default: 'bg-white border border-gray-200',
  elevated: 'bg-white shadow-lg',
  glass: 'backdrop-blur-lg bg-white/10 border border-white/20',
};

function Card({ variant = 'default', children }) {
  return <div className={`rounded-xl p-6 ${cardVariants[variant]}`}>{children}</div>;
}
```

---

## Error Handling

### Component-Level Error Handling

```jsx
function MyComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleAction() {
    setLoading(true);
    setError(null);

    try {
      const result = await supabase.from('table').insert(data);
      const { success, error: err } = handleSupabaseError(result, 'Insert data');

      if (!success) {
        setError(err);
        toast.error(err);
        return;
      }

      toast.success('Action completed successfully!');
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-900">
          {error}
        </div>
      )}
      <button onClick={handleAction} disabled={loading}>
        {loading ? 'Loading...' : 'Click me'}
      </button>
    </div>
  );
}
```

---

## Performance Optimization

### Lazy Loading Routes

```jsx
// src/App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Eager load critical routes
import Home from './pages/Home';

// Lazy load secondary routes
const Dashboard = lazy(() => import('./pages/BuilderDashboard'));
const Workflows = lazy(() => import('./pages/Workflows'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workflows" element={<Workflows />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Memoization

```jsx
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data, onUpdate }) {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map((item) => expensiveOperation(item));
  }, [data]);

  // Memoize callbacks
  const handleUpdate = useCallback(
    (id, value) => {
      onUpdate(id, value);
    },
    [onUpdate]
  );

  return <div>{/* Render */}</div>;
}
```

---

## Code Examples

### Complete Component Example

```jsx
/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 */

import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { handleSupabaseError } from '../lib/supabaseErrors';
import { useToast } from './Toast';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);

    const result = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    const { success, data, error } = handleSupabaseError(result, 'Fetch projects');

    if (success) {
      setProjects(data);
    } else {
      toast.error(error);
    }

    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return;

    const result = await supabase.from('projects').delete().eq('id', id);

    const { success, error } = handleSupabaseError(result, 'Delete project');

    if (success) {
      toast.success('Project deleted');
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } else {
      toast.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-gray-500">No projects yet</p>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <Plus className="mr-2 inline h-4 w-4" />
          Create Project
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
        >
          <h3 className="mb-2 text-xl font-semibold">{project.name}</h3>
          <p className="mb-4 text-gray-600">{project.description}</p>
          <div className="flex gap-2">
            <button className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
              <Edit className="mr-2 inline h-4 w-4" />
              Edit
            </button>
            <button
              onClick={() => handleDelete(project.id)}
              className="rounded-lg bg-red-100 px-3 py-2 text-red-600 hover:bg-red-200"
            >
              <Trash2 className="inline h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
```

---

## Best Practices

1. **Keep components small and focused** - Single responsibility
2. **Use meaningful names** - Clear and descriptive
3. **Extract reusable logic** - Custom hooks for shared logic
4. **Handle loading and error states** - Always show feedback
5. **Use TypeScript-style JSDoc** - Document props and return types
6. **Follow file header convention** - Include trade secret header
7. **Consistent styling** - Use Tailwind utility classes
8. **Accessibility** - Use semantic HTML and ARIA labels
9. **Performance** - Lazy load, memoize, optimize renders
10. **Error boundaries** - Wrap components prone to errors

---

**© 2026 OpsVanta LLC - Proprietary and Confidential**
