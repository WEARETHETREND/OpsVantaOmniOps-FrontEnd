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


import { useEffect, useState } from 'react';
import { getWorkflows } from '../api/omniops';

export default function Workflows() {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getWorkflows();
      setWorkflows(data);
    }
    load();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h2>Workflows</h2>

      <ul>
        {workflows.map((wf) => (
          <li key={wf.id}>{wf.name}</li>
        ))}
      </ul>
    </div>
  );
}
