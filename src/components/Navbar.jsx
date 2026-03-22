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

import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/builder', label: 'Builder' },
  { to: '/projects', label: 'Projects' },
  { to: '/workflows', label: 'Workflows' },
  { to: '/domains', label: 'Domains' },
];

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header className="border-b border-white/10 bg-[#0d1117]">
      <nav className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mr-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
            <svg
              width="18"
              height="18"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4L28 10V22L16 28L4 22V10L16 4Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M16 4V28M4 10L28 22M28 10L4 22"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
            </svg>
          </div>
          <span className="text-base font-bold text-white">OmniOps</span>
        </div>

        {/* Nav links */}
        <div className="flex flex-1 items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="ml-4 rounded-md px-3 py-1.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          Sign Out
        </button>
      </nav>
    </header>
  );
}
