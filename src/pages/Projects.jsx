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
import { getProjects, createProject } from '../api/omniops';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');

  async function load() {
    const data = await getProjects();
    setProjects(data);
  }

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
    }
    loadProjects();
  }, []);

  async function addProject() {
    await createProject({ name });
    setName('');
    load();
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Projects</h2>

      <input value={name} placeholder="Project name" onChange={(e) => setName(e.target.value)} />
      <button onClick={addProject}>Add</button>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
