const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export async function getProjects() {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export async function getWorkflows() {
  const res = await fetch(`${API_URL}/workflow`);
  if (!res.ok) throw new Error('Failed to fetch workflows');
  return res.json();
}

// AI Website Generation
export async function generateWebsite(data) {
  const res = await fetch(`${API_URL}/projects/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to generate website');
  return res.json();
}

export async function getGenerationProgress(projectId) {
  const res = await fetch(`${API_URL}/projects/${projectId}/progress`);
  if (!res.ok) throw new Error('Failed to fetch generation progress');
  return res.json();
}

export async function getProject(projectId) {
  const res = await fetch(`${API_URL}/projects/${projectId}`);
  if (!res.ok) throw new Error('Failed to fetch project');
  return res.json();
}

export async function updateProject(projectId, data) {
  const res = await fetch(`${API_URL}/projects/${projectId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}

export async function deleteProject(projectId) {
  const res = await fetch(`${API_URL}/projects/${projectId}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
}

// Domain Management
export async function searchDomains(query) {
  const res = await fetch(`${API_URL}/domains/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search domains');
  return res.json();
}

export async function getDomains(projectId) {
  const res = await fetch(`${API_URL}/projects/${projectId}/domains`);
  if (!res.ok) throw new Error('Failed to fetch domains');
  return res.json();
}

export async function connectDomain(projectId, domain) {
  const res = await fetch(`${API_URL}/projects/${projectId}/domains`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain }),
  });

  if (!res.ok) throw new Error('Failed to connect domain');
  return res.json();
}
