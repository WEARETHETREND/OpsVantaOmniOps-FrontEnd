/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * 
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 * 
 * UNAUTHORIZED USE PROHIBITED
 * 
 * This file contains trade secrets. Violators will be prosecuted.
 * See COPYRIGHT.md for terms.
 */

import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>OmniOps Dashboard</h1>

      <ul>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/workflows">Workflows</Link>
        </li>
      </ul>
    </div>
  );
}
