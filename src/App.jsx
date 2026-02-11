import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BuilderDashboard from './pages/BuilderDashboard';
import Projects from './pages/Projects';
import { HubLayout } from './pages/Hub/Layout';
import Today from './pages/Hub/Today';
import Autopilot from './pages/Hub/Autopilot';
import Inbox from './pages/Hub/Inbox';
import Playbooks from './pages/Hub/Playbooks';
import Revenue from './pages/Hub/Revenue';
import Settings from './pages/Hub/Settings';

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
          <Route path="autopilot" element={<Autopilot />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="playbooks" element={<Playbooks />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
