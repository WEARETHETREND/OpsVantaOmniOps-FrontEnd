import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BuilderDashboard from './pages/BuilderDashboard';
import Projects from './pages/Projects';
import { HubLayout } from './pages/Hub/Layout';
import Today from './pages/Hub/Today';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/builder" replace />} />
        <Route path="/builder" element={<BuilderDashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/builder/editor/:id" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Editor Page (To be implemented)</h1></div>} />
        <Route path="/builder/preview/:id" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Preview Page (To be implemented)</h1></div>} />
        
        {/* Hub Routes */}
        <Route path="/hub" element={<HubLayout />}>
          <Route index element={<Navigate to="/hub/today" replace />} />
          <Route path="today" element={<Today />} />
          <Route path="autopilot" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Autopilot (Coming Soon)</h1></div>} />
          <Route path="inbox" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Inbox (Coming Soon)</h1></div>} />
          <Route path="playbooks" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Playbooks (Coming Soon)</h1></div>} />
          <Route path="revenue" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Revenue (Coming Soon)</h1></div>} />
          <Route path="settings" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Settings (Coming Soon)</h1></div>} />
        </Route>
      </Routes>
    </Router>
  );
}
