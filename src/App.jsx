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

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load page components for better performance
const BuilderDashboard = lazy(() => import('./pages/BuilderDashboard'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Domains = lazy(() => import('./pages/Domains'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Projects = lazy(() => import('./pages/Projects'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const RoutesPage = lazy(() => import('./pages/RoutesPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const TechniciansPage = lazy(() => import('./pages/TechniciansPage'));
const Workflows = lazy(() => import('./pages/Workflows'));

// Loading component
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const NotFoundPage = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold">Page not found</h1>
    <p className="mt-2 text-gray-600">The page you requested does not exist.</p>
  </div>
);

const AppShell = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/builder" replace />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/builder"
              element={
                <AppShell>
                  <BuilderDashboard />
                </AppShell>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AppShell>
                  <Dashboard />
                </AppShell>
              }
            />
            <Route
              path="/projects"
              element={
                <AppShell>
                  <Projects />
                </AppShell>
              }
            />
            <Route
              path="/workflows"
              element={
                <AppShell>
                  <Workflows />
                </AppShell>
              }
            />
            <Route
              path="/domains"
              element={
                <AppShell>
                  <Domains />
                </AppShell>
              }
            />
            <Route
              path="/technicians"
              element={
                <AppShell>
                  <TechniciansPage />
                </AppShell>
              }
            />
            <Route
              path="/jobs"
              element={
                <AppShell>
                  <JobsPage />
                </AppShell>
              }
            />
            <Route
              path="/routes"
              element={
                <AppShell>
                  <RoutesPage />
                </AppShell>
              }
            />
            <Route
              path="/reports"
              element={
                <AppShell>
                  <ReportsPage />
                </AppShell>
              }
            />
            <Route
              path="/settings"
              element={
                <AppShell>
                  <SettingsPage />
                </AppShell>
              }
            />

            <Route
              path="/builder/editor/:id"
              element={
                <AppShell>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Editor Page (To be implemented)</h1>
                  </div>
                </AppShell>
              }
            />
            <Route
              path="/builder/preview/:id"
              element={
                <AppShell>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Preview Page (To be implemented)</h1>
                  </div>
                </AppShell>
              }
            />

            <Route
              path="*"
              element={
                <AppShell>
                  <NotFoundPage />
                </AppShell>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
