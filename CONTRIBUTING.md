# Contributing to OmniOps Frontend

Thank you for your interest in contributing to OmniOps Frontend! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork the repository** and clone your fork locally
2. **Install dependencies**: `npm install`
3. **Set up environment variables**: Copy `.env.example` to `.env` and configure your Supabase credentials
4. **Start the development server**: `npm run dev`

## Development Workflow

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-user-authentication`)
- `bugfix/` - Bug fixes (e.g., `bugfix/fix-login-error`)
- `hotfix/` - Critical production fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

### Commit Messages

Follow the conventional commits specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add user profile page`

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following our code style guidelines
3. **Write or update tests** as needed
4. **Run the linter**: `npm run lint`
5. **Build the project**: `npm run build`
6. **Test your changes**: Manually test the application
7. **Commit your changes** with clear, descriptive commit messages
8. **Push to your fork** and submit a pull request
9. **Fill out the PR template** completely
10. **Request review** from maintainers
11. **Address review feedback** promptly

### PR Requirements

- PR title should be clear and descriptive
- Description should explain the "why" and "what" of your changes
- Link to related issues using `Closes #123` or `Fixes #123`
- All CI checks must pass
- Code must be reviewed and approved by at least one maintainer
- Branch must be up-to-date with `main`

## Code Style Guidelines

### JavaScript

- Use **ES6+ syntax** (arrow functions, destructuring, async/await, etc.)
- Use **functional components** with hooks for React components
- Follow **ESLint rules** configured in the project
- Use **meaningful variable names** (descriptive, not abbreviated)
- Keep functions **small and focused** (single responsibility)
- Add **JSDoc comments** for complex functions

### React Components

- Use **functional components** with hooks
- Keep components **small and reusable**
- Extract logic into **custom hooks** when appropriate
- Use **prop types** or TypeScript for prop validation (if added)
- Follow the **container/presentational** pattern when appropriate

### File Organization

- One component per file
- Group related files in the same directory
- Use index files to simplify imports
- Keep components in `src/components/`
- Keep pages in `src/pages/`
- Keep utilities in `src/lib/`
- Keep API calls in `src/api/`

### CSS/Styling

- Use **Tailwind CSS** for styling
- Follow **utility-first** approach
- Extract repeated patterns into **components**
- Use **CSS modules** for component-specific styles if needed

## Testing Requirements

### Manual Testing

- Test your changes in the browser
- Test on different screen sizes (responsive design)
- Test different user flows
- Test error states and edge cases

### Future: Automated Testing

We plan to add automated testing. When added, contributors will be expected to:

- Write unit tests for utility functions
- Write integration tests for API interactions
- Write component tests for React components
- Ensure test coverage doesn't decrease

## Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) to report bugs.

Include:

- Clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

## Suggesting Enhancements

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) to suggest enhancements.

Include:

- Clear, descriptive title
- Problem statement (what problem does this solve?)
- Proposed solution
- Alternative solutions considered
- Additional context or mockups

## Questions?

Feel free to reach out to the maintainers if you have questions or need help getting started.

Thank you for contributing to OmniOps Frontend! 🚀
