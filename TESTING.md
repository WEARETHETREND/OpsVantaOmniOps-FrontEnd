# Testing Guide

## Overview

This document outlines the testing approach and strategy for OpsVanta Web. While comprehensive test coverage is a work in progress, this guide documents the current testing setup and best practices.

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Current Testing Setup](#current-testing-setup)
3. [Testing Approach](#testing-approach)
4. [Manual Testing](#manual-testing)
5. [Future Testing Plans](#future-testing-plans)

---

## Testing Philosophy

Our testing approach prioritizes:

1. **Quality over Quantity**: Focus on testing critical paths and user flows
2. **Practical Testing**: Manual testing for UI/UX, automated testing for business logic
3. **Developer Experience**: Tests should be easy to write and maintain
4. **Fast Feedback**: Tests should run quickly and provide clear feedback

---

## Current Testing Setup

### Code Quality Tools

The application uses several code quality tools:

#### ESLint

- **Configuration**: `eslint.config.js`
- **Version**: ESLint 10 with React plugins
- **Run**: `npm run lint`
- **Auto-fix**: `npm run lint:fix`

```bash
# Check for linting errors
npm run lint

# Automatically fix linting errors
npm run lint:fix
```

#### Prettier

- **Configuration**: `.prettierrc`
- **Plugins**: Tailwind CSS plugin for class sorting
- **Run**: `npm run format:check`
- **Auto-format**: `npm run format`

```bash
# Check code formatting
npm run format:check

# Format all files
npm run format
```

#### Pre-commit Hooks (Husky)

- **Configuration**: `.husky/` directory
- **Functionality**: Automatically runs linting and formatting before commits
- **Tools**: lint-staged for staged files only

Configured in `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

---

## Testing Approach

### App Builder Health Check

Run the full App Builder readiness check (API function export validation + lint + production build):

```bash
npm run health:app-builder
```

If you only need to verify the App Builder API functions are exported correctly:

```bash
npm run health:functions
```

### 1. Static Analysis

**ESLint** catches common errors:

- Unused variables
- Missing dependencies in hooks
- React best practices violations
- Potential bugs

**Prettier** ensures consistent code style:

- Consistent formatting
- Readable code
- Reduced merge conflicts

### 2. Type Safety

While the project doesn't use TypeScript, type safety is achieved through:

- JSDoc comments for function parameters
- Prop validation patterns
- ESLint rules for type coercion

Example:

```javascript
/**
 * Create a new project
 * @param {string} name - Project name
 * @param {string} template - Template ID
 * @returns {Promise<Object>} Created project
 */
async function createProject(name, template) {
  // Implementation
}
```

### 3. Error Boundary Testing

The `ErrorBoundary` component catches React errors:

- Test by intentionally throwing errors in development
- Verify fallback UI displays correctly
- Check error logging works

Example test scenario:

```javascript
// In a component, temporarily add:
if (someCondition) {
  throw new Error('Test error boundary');
}
```

### 4. Integration Testing

**Supabase Error Handling**:

- Use `src/lib/supabaseErrors.js` utilities
- Test error states with invalid data
- Verify user-friendly error messages

**Toast Notifications**:

- Test success, error, warning, info states
- Verify auto-dismiss timing
- Test manual dismissal

---

## Manual Testing

### Critical User Flows

Test these flows manually before each release:

#### 1. Authentication Flow

- [ ] Sign up with new account
- [ ] Sign in with existing account
- [ ] Invalid credentials show error
- [ ] Sign out works correctly
- [ ] Protected routes redirect to sign in

#### 2. Project Management

- [ ] Create new project
- [ ] View project list
- [ ] Edit project details
- [ ] Delete project
- [ ] Project persistence after refresh

#### 3. Error Handling

- [ ] Network errors show toast notification
- [ ] Supabase errors display user-friendly messages
- [ ] Error boundary catches React errors
- [ ] Loading states display correctly

#### 4. Performance

- [ ] Initial page load < 3 seconds
- [ ] Navigation feels instant
- [ ] No console errors
- [ ] Responsive on mobile devices

### Browser Testing

Test in these browsers:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Mobile Chrome (Android)

### Device Testing

Test on these device sizes:

- 📱 Mobile (375px - 767px)
- 📱 Tablet (768px - 1023px)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

---

## Future Testing Plans

### Phase 1: Unit Testing (Planned)

Install Vitest for unit testing:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Example test structure:

```javascript
// src/lib/__tests__/supabaseErrors.test.js
import { describe, it, expect } from 'vitest';
import { getErrorMessage, isAuthError } from '../supabaseErrors';

describe('supabaseErrors', () => {
  describe('getErrorMessage', () => {
    it('returns user-friendly message for auth errors', () => {
      const error = { message: 'Invalid login credentials' };
      expect(getErrorMessage(error)).toBe('Invalid email or password. Please try again.');
    });
  });
});
```

### Phase 2: Component Testing (Planned)

Test React components:

```javascript
// src/components/__tests__/ErrorBoundary.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('catches errors and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
```

### Phase 3: E2E Testing (Planned)

Consider Playwright or Cypress for end-to-end tests:

```bash
npm install --save-dev @playwright/test
```

Example E2E test:

```javascript
// tests/e2e/auth.spec.js
import { test, expect } from '@playwright/test';

test('user can sign in', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.click('text=Sign In');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/\/dashboard/);
});
```

---

## Best Practices

### Writing Testable Code

1. **Keep Components Small**: Easier to test and maintain
2. **Separate Business Logic**: Extract to utility functions
3. **Use Custom Hooks**: Reusable and testable logic
4. **Avoid Side Effects**: Make functions pure when possible
5. **Handle Errors Gracefully**: Use error boundaries and try-catch

### Testing Checklist

Before committing code:

- [ ] Code passes ESLint: `npm run lint`
- [ ] Code is formatted: `npm run format:check`
- [ ] Build succeeds: `npm run build`
- [ ] Manual testing completed for changed features
- [ ] No console errors in browser
- [ ] Error states tested (if applicable)
- [ ] Loading states tested (if applicable)

Before deploying:

- [ ] All critical user flows tested
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Performance acceptable (< 3s load time)
- [ ] No errors in production build
- [ ] Environment variables configured correctly

---

## Running Quality Checks

### Full Quality Check

Run all quality checks:

```bash
# Install dependencies
npm install

# Run linter
npm run lint

# Check formatting
npm run format:check

# Build for production
npm run build

# Preview production build
npm run preview
```

### CI/CD Integration

The repository includes GitHub Actions workflows (`.github/workflows/`) that automatically run quality checks on pull requests.

---

## Useful Testing Commands

```bash
# Development
npm run dev                    # Start dev server with hot reload

# Code Quality
npm run lint                   # Run ESLint
npm run lint:fix              # Fix ESLint errors
npm run format                # Format code with Prettier
npm run format:check          # Check formatting without changes

# Build
npm run build                 # Production build
npm run preview               # Preview production build locally

# Git Hooks
npm run prepare               # Set up Husky git hooks
```

---

## Resources

### Testing Libraries (for future use)

- **Vitest**: https://vitest.dev/
- **React Testing Library**: https://testing-library.com/react
- **Playwright**: https://playwright.dev/
- **Cypress**: https://www.cypress.io/

### Testing Best Practices

- **Kent C. Dodds - Testing JavaScript**: https://testingjavascript.com/
- **React Testing Best Practices**: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- **Testing Trophy**: https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications

---

## Contributing to Tests

When adding features:

1. Ensure code passes linting and formatting
2. Manually test the feature thoroughly
3. Document testing steps in PR description
4. Consider edge cases and error states
5. Update this testing guide if needed

For major features, consider adding:

- Unit tests for utility functions
- Component tests for complex components
- E2E tests for critical user flows

---

**© 2026 OpsVanta LLC - Proprietary and Confidential**
