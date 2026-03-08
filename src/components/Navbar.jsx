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

import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/builder', label: 'Builder' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/projects', label: 'Projects' },
  { to: '/workflows', label: 'Workflows' },
  { to: '/domains', label: 'Domains' },
];

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <div className="mr-4 text-lg font-bold text-gray-900">OpsVanta</div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
