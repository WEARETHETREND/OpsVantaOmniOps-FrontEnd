const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

export async function getProjects() {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function getWorkflows() {
  const res = await fetch(`${API_URL}/workflow`);
  if (!res.ok) throw new Error("Failed to fetch workflows");
  return res.json();
}
