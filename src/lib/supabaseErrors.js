/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * 
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

/**
 * Supabase Error Handling Utilities
 * 
 * Provides consistent error handling and user-friendly error messages
 * for Supabase operations across the application.
 */

/**
 * Error message mappings for common Supabase errors
 */
const ERROR_MESSAGES = {
  // Authentication errors
  'Invalid login credentials': 'Invalid email or password. Please try again.',
  'Email not confirmed': 'Please verify your email address before signing in.',
  'User already registered': 'An account with this email already exists.',
  'Password should be at least 6 characters':
    'Password must be at least 6 characters long.',

  // Database errors
  'new row violates row-level security policy':
    'You do not have permission to perform this action.',
  'duplicate key value violates unique constraint': 'This item already exists.',
  'foreign key violation': 'Cannot perform this action due to related data.',

  // Network errors
  'Failed to fetch': 'Network error. Please check your internet connection.',
  'Network request failed': 'Network error. Please check your internet connection.',

  // Generic errors
  'Internal Server Error': 'An unexpected error occurred. Please try again.',
  'Service Unavailable': 'Service is temporarily unavailable. Please try again later.',
};

/**
 * Get a user-friendly error message
 * @param {Error | Object} error - The error object from Supabase
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error) {
  if (!error) {
    return 'An unexpected error occurred.';
  }

  // Handle Supabase error object
  if (error.message) {
    // Check for known error messages
    for (const [key, message] of Object.entries(ERROR_MESSAGES)) {
      if (error.message.includes(key)) {
        return message;
      }
    }

    // Return the original message if no mapping found
    return error.message;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Default fallback
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Check if an error is an authentication error
 * @param {Error | Object} error - The error object
 * @returns {boolean} True if it's an auth error
 */
export function isAuthError(error) {
  if (!error || !error.message) return false;

  const authErrorKeywords = [
    'Invalid login credentials',
    'Email not confirmed',
    'User already registered',
    'Invalid JWT',
    'JWT expired',
    'not authenticated',
  ];

  return authErrorKeywords.some((keyword) => error.message.includes(keyword));
}

/**
 * Check if an error is a network error
 * @param {Error | Object} error - The error object
 * @returns {boolean} True if it's a network error
 */
export function isNetworkError(error) {
  if (!error) return false;

  if (error.message) {
    return (
      error.message.includes('Failed to fetch') ||
      error.message.includes('Network request failed') ||
      error.message.includes('NetworkError')
    );
  }

  return false;
}

/**
 * Check if an error is a permission error (RLS)
 * @param {Error | Object} error - The error object
 * @returns {boolean} True if it's a permission error
 */
export function isPermissionError(error) {
  if (!error || !error.message) return false;

  return (
    error.message.includes('row-level security policy') ||
    error.message.includes('permission denied') ||
    error.message.includes('insufficient privileges')
  );
}

/**
 * Log error to console in development, and optionally to error tracking service
 * @param {Error | Object} error - The error object
 * @param {string} context - Context where the error occurred
 */
export function logError(error, context = '') {
  const isDevelopment = import.meta.env.DEV;

  if (isDevelopment) {
    console.error(`[${context}] Error:`, error);
  }

  // In production, you would send to error tracking service (e.g., Sentry)
  // Example: Sentry.captureException(error, { tags: { context } });
}

/**
 * Handle Supabase operation errors consistently
 * @param {Object} result - Result from Supabase operation { data, error }
 * @param {string} context - Context/operation name for logging
 * @returns {Object} { success: boolean, data: any, error: string | null }
 */
export function handleSupabaseError(result, context = 'Supabase operation') {
  const { data, error } = result;

  if (error) {
    const errorMessage = getErrorMessage(error);
    logError(error, context);

    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }

  return {
    success: true,
    data,
    error: null,
  };
}

/**
 * Retry a Supabase operation with exponential backoff
 * @param {Function} operation - Async function that returns a Supabase result
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} initialDelay - Initial delay in milliseconds
 * @returns {Promise<Object>} Supabase result
 */
export async function retryOperation(operation, maxRetries = 3, initialDelay = 1000) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await operation();

      // If successful or non-retryable error, return immediately
      if (!result.error || !isNetworkError(result.error)) {
        return result;
      }

      lastError = result.error;

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (error) {
      lastError = error;
    }
  }

  // All retries failed
  return { data: null, error: lastError };
}

/**
 * Validation helper for common data patterns
 */
export const validate = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password) => {
    return password && password.length >= 6;
  },

  required: (value) => {
    return value !== null && value !== undefined && value !== '';
  },
};

/**
 * Format validation errors for display
 * @param {Object} errors - Object with field names as keys and error messages as values
 * @returns {string} Formatted error message
 */
export function formatValidationErrors(errors) {
  const errorMessages = Object.values(errors).filter(Boolean);
  if (errorMessages.length === 0) return '';

  if (errorMessages.length === 1) {
    return errorMessages[0];
  }

  return 'Please fix the following errors:\n• ' + errorMessages.join('\n• ');
}
