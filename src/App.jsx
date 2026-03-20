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

const renderProtected = (page) => (
  <ProtectedRoute>
    <Layout>{page}</Layout>
  </ProtectedRoute>
);

const protectedRoutes = [
  { path: '/builder', element: <BuilderDashboard /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/projects', element: <Projects /> },
  { path: '/workflows', element: <Workflows /> },
  { path: '/domains', element: <Domains /> },
  { path: '/technicians', element: <TechniciansPage /> },
  { path: '/jobs', element: <JobsPage /> },
  { path: '/routes', element: <RoutesPage /> },
  { path: '/reports', element: <ReportsPage /> },
  { path: '/settings', element: <SettingsPage /> },
  {
    path: '/builder/editor/:id',
    element: (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Editor Page (To be implemented)</h1>
      </div>
    ),
  },
  {
    path: '/builder/preview/:id',
    element: (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Preview Page (To be implemented)</h1>
      </div>
    ),
  },
  { path: '*', element: <NotFoundPage /> },
];

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/builder" replace />} />
            <Route path="/login" element={<LoginPage />} />

            {protectedRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={renderProtected(element)} />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
