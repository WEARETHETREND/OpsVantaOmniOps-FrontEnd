import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/omniops";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  async function load() {
    const data = await getProjects();
    setProjects(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function addProject() {
    await createProject({ name });
    setName("");
    load();
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Projects</h2>

      <input
        value={name}
        placeholder="Project name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addProject}>Add</button>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
