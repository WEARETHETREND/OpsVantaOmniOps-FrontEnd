const BASE_URL = 'https://api.example.com'; // Replace with actual API base URL
const AUTH_TOKEN = 'YOUR_AUTH_TOKEN'; // Replace with actual token or implement a function to obtain it

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${AUTH_TOKEN}`,
};

export const getToday = async () => {
  const response = await fetch(`${BASE_URL}/today`, { headers });
  return response.json();
};

export const getKeys = async () => {
  const response = await fetch(`${BASE_URL}/keys`, { headers });
  return response.json();
};

export const saveKey = async (keyData) => {
  const response = await fetch(`${BASE_URL}/keys`, {
    method: 'POST',
    headers,
    body: JSON.stringify(keyData),
  });
  return response.json();
};

export const toggleKey = async (keyId) => {
  const response = await fetch(`${BASE_URL}/keys/${keyId}/toggle`, {
    method: 'PATCH',
    headers,
  });
  return response.json();
};

export const getInbox = async () => {
  const response = await fetch(`${BASE_URL}/inbox`, { headers });
  return response.json();
};

export const approveInboxItem = async (itemId) => {
  const response = await fetch(`${BASE_URL}/inbox/${itemId}/approve`, {
    method: 'POST',
    headers,
  });
  return response.json();
};

export const getAutopilot = async () => {
  const response = await fetch(`${BASE_URL}/autopilot`, { headers });
  return response.json();
};

export const updateAutopilot = async (autopilotData) => {
  const response = await fetch(`${BASE_URL}/autopilot`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(autopilotData),
  });
  return response.json();
};

export const getRevenue = async () => {
  const response = await fetch(`${BASE_URL}/revenue`, { headers });
  return response.json();
};

export const getHealth = async () => {
  const response = await fetch(`${BASE_URL}/health`, { headers });
  return response.json();
};
