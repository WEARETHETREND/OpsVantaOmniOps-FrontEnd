/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * 
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 * 
 * UNAUTHORIZED ACCESS, USE, OR DISTRIBUTION PROHIBITED
 * 
 * This file contains trade secrets and confidential information.
 * Violators will be prosecuted under trade secret law.
 * 
 * For licensing: young.monte@omniops-ai.com
 */


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BuilderDashboard from './pages/BuilderDashboard';
import Projects from './pages/Projects';

export default function App() {
  return (
    <Router>
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
    </Router>
  );
}
