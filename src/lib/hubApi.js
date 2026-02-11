const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const hubApi = {
  // Today screen
  getToday: async () => {
    const res = await fetch(`${API_URL}/api/hub/today`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch today data');
    return res.json();
  },

  // API Keys
  getKeys: async () => {
    const res = await fetch(`${API_URL}/api/hub/keys`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch keys');
    return res.json();
  },

  saveKey: async (data) => {
    const res = await fetch(`${API_URL}/api/hub/keys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to save key');
    return res.json();
  },

  toggleKey: async (id, system, active) => {
    const res = await fetch(`${API_URL}/api/hub/keys/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ system, active })
    });
    if (!res.ok) throw new Error('Failed to toggle key');
    return res.json();
  },

  // Inbox
  getInbox: async () => {
    const res = await fetch(`${API_URL}/api/hub/inbox`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch inbox');
    return res.json();
  },

  approveInboxItem: async (id) => {
    const res = await fetch(`${API_URL}/api/hub/inbox/${id}/approve`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('Failed to approve');
    return res.json();
  },

  // Autopilot
  getAutopilot: async () => {
    const res = await fetch(`${API_URL}/api/hub/autopilot`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch autopilot');
    return res.json();
  },

  updateAutopilot: async (settings) => {
    const res = await fetch(`${API_URL}/api/hub/autopilot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update autopilot');
    return res.json();
  },

  // Revenue
  getRevenue: async () => {
    const res = await fetch(`${API_URL}/api/hub/revenue`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch revenue');
    return res.json();
  },

  // System Health
  getSystemHealth: async () => {
    const res = await fetch(`${API_URL}/api/hub/health`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch system health');
    return res.json();
  },

  // Command Bus
  executeCommand: async (command) => {
    const res = await fetch(`${API_URL}/api/hub/command`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ command })
    });
    if (!res.ok) throw new Error('Failed to execute command');
    return res.json();
  }
};
