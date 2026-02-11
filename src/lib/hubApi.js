// Hub API Client
// TODO: Switch to real API when backend is ready
import mockHubApi from './mockHubApi';

// Use mock API for now - replace with real API calls later
const USE_MOCK = true;

const BASE_URL = import.meta.env.VITE_HUB_API_URL || 'http://localhost:3001/api/hub';
const AUTH_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : '',
};

// Real API implementation (for future use)
const realApi = {
  getToday: async () => {
    const response = await fetch(`${BASE_URL}/today`, { headers });
    return response.json();
  },

  getKeys: async () => {
    const response = await fetch(`${BASE_URL}/keys`, { headers });
    return response.json();
  },

  saveKey: async (keyData) => {
    const response = await fetch(`${BASE_URL}/keys`, {
      method: 'POST',
      headers,
      body: JSON.stringify(keyData),
    });
    return response.json();
  },

  toggleKey: async (keyId) => {
    const response = await fetch(`${BASE_URL}/keys/${keyId}/toggle`, {
      method: 'PATCH',
      headers,
    });
    return response.json();
  },

  getInbox: async () => {
    const response = await fetch(`${BASE_URL}/inbox`, { headers });
    return response.json();
  },

  approveInboxItem: async (itemId) => {
    const response = await fetch(`${BASE_URL}/inbox/${itemId}/approve`, {
      method: 'POST',
      headers,
    });
    return response.json();
  },

  getAutopilot: async () => {
    const response = await fetch(`${BASE_URL}/autopilot`, { headers });
    return response.json();
  },

  updateAutopilot: async (autopilotData) => {
    const response = await fetch(`${BASE_URL}/autopilot`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(autopilotData),
    });
    return response.json();
  },

  getRevenue: async () => {
    const response = await fetch(`${BASE_URL}/revenue`, { headers });
    return response.json();
  },

  getHealth: async () => {
    const response = await fetch(`${BASE_URL}/health`, { headers });
    return response.json();
  },
};

// Export either mock or real API based on USE_MOCK flag
export const getToday = USE_MOCK ? mockHubApi.getToday : realApi.getToday;
export const getKeys = USE_MOCK ? mockHubApi.getKeys : realApi.getKeys;
export const saveKey = USE_MOCK ? mockHubApi.saveKey : realApi.saveKey;
export const toggleKey = USE_MOCK ? mockHubApi.toggleKey : realApi.toggleKey;
export const getInbox = USE_MOCK ? mockHubApi.getInbox : realApi.getInbox;
export const approveInboxItem = USE_MOCK ? mockHubApi.approveInboxItem : realApi.approveInboxItem;
export const getAutopilot = USE_MOCK ? mockHubApi.getAutopilot : realApi.getAutopilot;
export const updateAutopilot = USE_MOCK ? mockHubApi.updateAutopilot : realApi.updateAutopilot;
export const getRevenue = USE_MOCK ? mockHubApi.getRevenue : realApi.getRevenue;
export const getHealth = USE_MOCK ? mockHubApi.getHealth : realApi.getHealth;
export const getPlaybooks = USE_MOCK ? mockHubApi.getPlaybooks : null;
export const getPlaybook = USE_MOCK ? mockHubApi.getPlaybook : null;
export const executePlaybook = USE_MOCK ? mockHubApi.executePlaybook : null;
export const togglePlaybook = USE_MOCK ? mockHubApi.togglePlaybook : null;
export const rejectInboxItem = USE_MOCK ? mockHubApi.rejectInboxItem : null;
export const testKey = USE_MOCK ? mockHubApi.testKey : null;

