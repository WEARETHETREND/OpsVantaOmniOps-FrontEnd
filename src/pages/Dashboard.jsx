import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>OmniOps Dashboard</h1>

      <ul>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/workflows">Workflows</Link></li>
      </ul>
    </div>
  );
}
