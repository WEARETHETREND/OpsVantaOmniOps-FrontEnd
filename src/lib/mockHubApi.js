// Mock Hub API implementation
// This provides realistic data for development without needing a backend
import { generateAlerts } from './mockData/alerts';
import { generateMoves } from './mockData/moves';
import { generateLogs } from './mockData/logs';
import { generatePlaybooks } from './mockData/playbooks';
import { generateInboxItems } from './mockData/inbox';
import { generateRevenueData } from './mockData/revenue';

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Autopilot state (stored in memory for this session)
let autopilotState = {
  level: 2,
  enabled: true,
  timebox: {
    enabled: true,
    start: '02:00',
    end: '04:00',
    timezone: 'America/Los_Angeles'
  },
  products: {
    omniops: true,
    contentspark: true,
    govcon: true,
    opsvanta: false
  },
  guardrails: {
    maxSpendPerDay: 50,
    maxPRsPerDay: 5,
    noFridayDeploys: true,
    requireApprovalOver: 100
  },
  trustScore: 87,
  trustHistory: generateTrustHistory()
};

function generateTrustHistory() {
  const history = [];
  const now = Date.now();
  for (let i = 30; i >= 0; i--) {
    history.push({
      date: new Date(now - i * 24 * 60 * 60 * 1000).toISOString(),
      score: Math.min(95, Math.max(70, 75 + (30 - i) * 0.5 + Math.random() * 5))
    });
  }
  return history;
}

// API key vault state
let apiKeys = {
  github: {
    id: 'github',
    name: 'GitHub Personal Access Token',
    value: null,
    enabled: false,
    last_used: null,
    status: 'not_configured'
  },
  supabase_url: {
    id: 'supabase_url',
    name: 'Supabase URL',
    value: null,
    enabled: false,
    last_used: null,
    status: 'not_configured'
  },
  supabase_key: {
    id: 'supabase_key',
    name: 'Supabase Anon Key',
    value: null,
    enabled: false,
    last_used: null,
    status: 'not_configured'
  },
  stripe: {
    id: 'stripe',
    name: 'Stripe Publishable Key',
    value: null,
    enabled: false,
    last_used: null,
    status: 'not_configured'
  },
  openai: {
    id: 'openai',
    name: 'OpenAI API Key',
    value: null,
    enabled: false,
    last_used: null,
    status: 'not_configured'
  }
};

// Mock Hub API
export const mockHubApi = {
  // Today screen data
  getToday: async () => {
    await delay(300);
    return {
      alerts: generateAlerts().slice(0, 3),
      moves: generateMoves().slice(0, 3),
      autopilotLog: generateLogs().slice(0, 10)
    };
  },

  // Autopilot
  getAutopilot: async () => {
    await delay(200);
    return autopilotState;
  },

  updateAutopilot: async (data) => {
    await delay(300);
    autopilotState = { ...autopilotState, ...data };
    return autopilotState;
  },

  // Inbox
  getInbox: async (filters = {}) => {
    await delay(400);
    let items = generateInboxItems();
    
    if (filters.product) {
      items = items.filter(item => item.product === filters.product);
    }
    if (filters.priority) {
      items = items.filter(item => item.priority === filters.priority);
    }
    
    return items;
  },

  approveInboxItem: async (itemId, customization = {}) => {
    await delay(500);
    return {
      success: true,
      itemId,
      message: 'Item approved and queued for execution',
      estimatedCompletion: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    };
  },

  rejectInboxItem: async (itemId, reason = '') => {
    await delay(300);
    return {
      success: true,
      itemId,
      message: 'Item rejected',
      reason
    };
  },

  // Playbooks
  getPlaybooks: async () => {
    await delay(400);
    return generatePlaybooks();
  },

  getPlaybook: async (id) => {
    await delay(200);
    const playbooks = generatePlaybooks();
    return playbooks.find(p => p.id === id);
  },

  togglePlaybook: async (id) => {
    await delay(300);
    const playbooks = generatePlaybooks();
    const playbook = playbooks.find(p => p.id === id);
    if (playbook) {
      playbook.enabled = !playbook.enabled;
      return playbook;
    }
    throw new Error('Playbook not found');
  },

  executePlaybook: async (id, params = {}) => {
    await delay(1000);
    return {
      success: true,
      playbookId: id,
      executionId: `exec-${Date.now()}`,
      message: 'Playbook execution started',
      estimatedCompletion: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    };
  },

  // Revenue
  getRevenue: async () => {
    await delay(600);
    return generateRevenueData();
  },

  // API Keys
  getKeys: async () => {
    await delay(200);
    return Object.values(apiKeys);
  },

  saveKey: async (keyData) => {
    await delay(300);
    const { id, value, enabled } = keyData;
    if (apiKeys[id]) {
      apiKeys[id] = {
        ...apiKeys[id],
        value: value || apiKeys[id].value,
        enabled: enabled !== undefined ? enabled : apiKeys[id].enabled,
        status: value ? 'configured' : apiKeys[id].status,
        last_used: value ? new Date().toISOString() : apiKeys[id].last_used
      };
      return apiKeys[id];
    }
    throw new Error('Invalid key ID');
  },

  toggleKey: async (keyId) => {
    await delay(200);
    if (apiKeys[keyId]) {
      apiKeys[keyId].enabled = !apiKeys[keyId].enabled;
      return apiKeys[keyId];
    }
    throw new Error('Key not found');
  },

  testKey: async (keyId) => {
    await delay(1000);
    if (apiKeys[keyId] && apiKeys[keyId].value) {
      // Simulate success/failure
      const success = Math.random() > 0.2; // 80% success rate
      return {
        success,
        message: success ? 'Connection successful' : 'Connection failed: Invalid credentials',
        keyId
      };
    }
    throw new Error('Key not configured');
  },

  // System Health
  getHealth: async () => {
    await delay(300);
    return {
      api: {
        status: 'healthy',
        responseTime: 145,
        uptime: 99.97
      },
      database: {
        status: 'healthy',
        connections: 12,
        maxConnections: 100
      },
      services: {
        github: apiKeys.github.enabled ? 'connected' : 'not_configured',
        stripe: apiKeys.stripe.enabled ? 'connected' : 'not_configured',
        supabase: apiKeys.supabase_url.enabled ? 'connected' : 'not_configured',
        openai: apiKeys.openai.enabled ? 'connected' : 'not_configured'
      },
      lastSync: new Date().toISOString(),
      errors: []
    };
  }
};

// Export as default for easier switching between mock and real API
export default mockHubApi;
