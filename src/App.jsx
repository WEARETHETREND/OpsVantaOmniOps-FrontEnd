/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * 
 * © 2026 OpsVanta LLC
 * ALL RIGHTS RESERVED
 * 
 * UNAUTHORIZED ACCESS, USE, OR DISTRIBUTION PROHIBITED
 * 
 * This file contains trade secrets and confidential information.
 * Violators will be prosecuted under trade secret law.
 * 
 * For licensing: contact@opsvanta.com
 */


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load page components for better performance
const BuilderDashboard = lazy(() => import('./pages/BuilderDashboard'));
const Projects = lazy(() => import('./pages/Projects'));

// Loading component
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/builder" replace />} />
            <Route path="/builder" element={<BuilderDashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/builder/editor/:id"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Editor Page (To be implemented)</h1>
                </div>
              }
            />
            <Route
              path="/builder/preview/:id"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Preview Page (To be implemented)</h1>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
