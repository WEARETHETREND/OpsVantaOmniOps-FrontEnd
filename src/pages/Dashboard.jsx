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

import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/builder', label: 'App Builder', description: 'Build and deploy apps visually' },
  { to: '/projects', label: 'Projects', description: 'Manage your active projects' },
  { to: '/workflows', label: 'Workflows', description: 'Automate your operations' },
  { to: '/domains', label: 'Domains', description: 'Manage custom domains' },
];

export default function Dashboard() {
  return (
    <div className="animate-fadeIn py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome to OmniOps</h1>
        <p className="mt-1 text-gray-400">Your operations platform is ready.</p>
      </div>

      {/* Quick links grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {quickLinks.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-blue-500/40 hover:bg-white/8"
          >
            <h2 className="text-base font-semibold text-white group-hover:text-blue-400">
              {item.label}
            </h2>
            <p className="mt-1 text-sm text-gray-400">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
