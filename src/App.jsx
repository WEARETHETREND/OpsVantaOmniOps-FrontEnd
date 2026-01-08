import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

/* =========================
   Supabase Client
   ========================= */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* =========================
   App
   ========================= */
export default function App() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRuns = async () => {
    setError(null);
    try {
      const { data, error } = await supabase
        .from("automation_runs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(25);

      if (error) throw error;
      setRuns(data || []);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRuns();
    const interval = setInterval(fetchRuns, 5000);
    return () => clearInterval(interval);
  }, []);

  const triggerRun = async () => {
    const now = new Date().toISOString();

    try {
      const { error } = await supabase.from("automation_runs").insert({
        run_id: `monte-local-${Date.now()}`,
        status: "SUCCESS",
        cost: Math.floor(Math.random() * 50) + 10,
        started_at: now,
        ended_at: now,
      });

      if (error) throw error;
      fetchRuns();
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        background: "#0b1020",
        color: "white",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
      }}
    >
      <h1 style={{ fontSize: 36 }}>OpsVanta Dashboard</h1>
      <p style={{ opacity: 0.7 }}>Live automation runs</p>

      <div style={{ margin: "20px 0", display: "flex", gap: 12 }}>
        <button
          onClick={triggerRun}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Trigger Test Run
        </button>

        <button
          onClick={fetchRuns}
          style={{
            padding: "12px 20px",
            background: "#1f2937",
            color: "white",
            border: "1px solid #374151",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div style={{ color: "#f87171", marginBottom: 12 }}>
          Error: {error}
        </div>
      )}

      {loading ? (
        <p>Loading…</p>
      ) : runs.length === 0 ? (
        <p>No runs yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1e293b" }}>
              <th style={th}>Run ID</th>
              <th style={th}>Status</th>
              <th style={th}>Cost</th>
              <th style={th}>Time</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid #1f2937" }}>
                <td style={td}>{r.run_id}</td>
                <td style={td}>{r.status}</td>
                <td style={td}>${r.cost ?? 0}</td>
                <td style={td}>
                  {new Date(r.created_at || r.started_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = { padding: 12, textAlign: "left" };
const td = { padding: 12 };
