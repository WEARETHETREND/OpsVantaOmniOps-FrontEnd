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
