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

export default function Dashboard() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>OpsVanta Dashboard</h1>

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
