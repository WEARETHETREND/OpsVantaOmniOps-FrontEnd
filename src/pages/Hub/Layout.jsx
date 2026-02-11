import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Home, Settings, Inbox, Zap, TrendingUp, Book, Command } from 'lucide-react';
import CommandBus from '../../components/Hub/CommandBus';

export function HubLayout() {
  const location = useLocation();
  const [commandBusOpen, setCommandBusOpen] = useState(false);
  
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/hub/today" className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  H
                </div>
                Hub
              </Link>
              
              <div className="flex gap-1">
                <NavLink to="/hub/today" icon={Home} isActive={isActive('/hub/today')}> 
                  Today
                </NavLink>
                <NavLink to="/hub/autopilot" icon={Zap} isActive={isActive('/hub/autopilot')}> 
                  Autopilot
                </NavLink>
                <NavLink to="/hub/inbox" icon={Inbox} isActive={isActive('/hub/inbox')}> 
                  Inbox
                </NavLink>
                <NavLink to="/hub/playbooks" icon={Book} isActive={isActive('/hub/playbooks')}> 
                  Playbooks
                </NavLink>
                <NavLink to="/hub/revenue" icon={TrendingUp} isActive={isActive('/hub/revenue')}> 
                  Revenue
                </NavLink>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCommandBusOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                title="Command Bus (Cmd+K)"
              >
                <Command className="w-4 h-4" />
                <span className="hidden md:inline">Cmd+K</span>
              </button>
              
              <Link 
                to="/hub/settings" 
                className="text-slate-600 hover:text-slate-900 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>WEARETHETREND Empire Hub • Managing 6 products • Powered by AI</p>
        </div>
      </footer>
      
      {/* Command Bus Modal */}
      <CommandBus isOpen={commandBusOpen} onClose={() => setCommandBusOpen(!commandBusOpen)} />
    </div>
  );
}

function NavLink({ to, icon: Icon, children, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive
          ? 'bg-blue-100 text-blue-700 shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </Link>
  );
}