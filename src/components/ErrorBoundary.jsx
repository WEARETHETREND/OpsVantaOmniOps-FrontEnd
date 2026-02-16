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

import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // You can also log the error to an error reporting service here
    // Example: Sentry.captureException(error);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-100 p-4">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
            </div>

            {/* Error Title */}
            <h1 className="mb-4 text-center text-3xl font-bold text-gray-900">
              Oops! Something went wrong
            </h1>

            {/* Error Description */}
            <p className="mb-8 text-center text-gray-600">
              We're sorry for the inconvenience. An unexpected error has occurred.
              {isDevelopment && ' Check the console for more details.'}
            </p>

            {/* Error Details (Development Only) */}
            {isDevelopment && error && (
              <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Error Details:</h3>
                <pre className="max-h-40 overflow-auto text-xs whitespace-pre-wrap text-red-600">
                  {error.toString()}
                </pre>
                {errorInfo && errorInfo.componentStack && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-xs font-semibold text-gray-700">
                      Component Stack
                    </summary>
                    <pre className="mt-2 max-h-40 overflow-auto text-xs whitespace-pre-wrap text-gray-600">
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
              >
                <RefreshCw className="h-5 w-5" />
                Try Again
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
              >
                <Home className="h-5 w-5" />
                Go Home
              </button>
            </div>

            {/* Support Information */}
            <div className="mt-8 border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-500">
                If this problem persists, please contact support at{' '}
                <a
                  href="mailto:support@opsvanta.com"
                  className="text-blue-600 underline hover:text-blue-700"
                >
                  support@opsvanta.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
