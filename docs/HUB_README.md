# 🧠 Supreme Hub - Intelligence & Operations Center

The Supreme Hub is a unified command center for managing all WEARETHETREND products with AI-powered automation and insights.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Using the Hub](#using-the-hub)
- [Mock API vs Real Backend](#mock-api-vs-real-backend)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The Supreme Hub provides:
- **Today Screen**: View critical alerts, recommended moves, and recent autopilot actions
- **Autopilot Control**: Configure AI autonomy levels (0-5) with guardrails and timeboxing
- **Inbox**: Approve or reject pending actions requiring manual review
- **Playbooks**: Manage automation workflows with built-in and custom playbooks
- **Revenue Dashboard**: Track MRR/ARR, customers, churn, and revenue trends
- **Settings**: Secure API key vault and system health monitoring
- **Command Bus (Cmd+K)**: Natural language command interface for quick actions

---

## ✨ Features

### 1. **Today Screen** (`/hub/today`)
- 🚨 **Critical Alerts**: Top 3 alerts requiring immediate attention
- 💡 **Recommended Moves**: Top 3 AI-suggested actions with impact estimates
- 📜 **Autopilot Log**: Last 10 autonomous actions taken by the system
- ⚡ Auto-refreshes every 30 seconds

### 2. **Autopilot Control** (`/hub/autopilot`)
- **6 Autonomy Levels**:
  - Level 0: Observe Only
  - Level 1: Advisory (suggest, you approve)
  - Level 2: Conditional (auto-execute low-risk)
  - Level 3: Sovereign with Guardrails
  - Level 4: Sovereign with Timeboxing
  - Level 5: Full Sovereign (requires confirmation)
- **Timebox Controls**: Restrict actions to specific time windows
- **Product Scope**: Enable/disable per product
- **Guardrails**: Set spending limits, PR limits, deployment rules
- **Trust Chart**: Visualize trust score over time

### 3. **Inbox & Approvals** (`/hub/inbox`)
- Review pending actions requiring approval
- Filter by product, priority, and type
- Approve, reject, or customize actions
- View estimated impact and risk levels

### 4. **Playbooks** (`/hub/playbooks`)
- **6 Default Playbooks**:
  - Security Patch Critical CVE
  - Fix Failing CI Build
  - Deploy Hotfix
  - Scale Infrastructure on Traffic Spike
  - Pause Low-Converting Ads
  - Auto-Upsell High-Value Users
- Create custom playbooks with trigger conditions
- View execution history and success rates
- Execute manually or automatically

### 5. **Revenue Dashboard** (`/hub/revenue`)
- MRR/ARR metrics with growth indicators
- Revenue by product breakdown
- 30-day revenue trend chart
- Top customers with health scores
- LTV/CAC ratios and churn metrics

### 6. **Settings** (`/hub/settings`)
- **API Key Vault** (encrypted storage):
  - GitHub Personal Access Token
  - Supabase URL & Keys
  - Stripe API Keys
  - OpenAI API Key
- System health monitoring
- Connection testing

### 7. **Command Bus** (Cmd+K)
- Natural language command interface
- Quick action suggestions
- AI-powered intent parsing

---

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd /path/to/omniops-frontend
npm install
```

This installs:
- `@tanstack/react-query` - Data fetching and caching
- `lucide-react` - Icons (already present)
- Other existing dependencies

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
# Hub API Configuration
VITE_HUB_API_URL=http://localhost:3001/api/hub

# GitHub Integration
VITE_GITHUB_TOKEN=your_github_token_here

# Stripe Integration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

> **Note**: The app works with mock data by default. Environment variables are optional until you connect a real backend.

### 3. Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:5173/hub/today`

### 4. Build for Production
```bash
npm run build
```

---

## 🎮 Using the Hub

### Accessing Hub Screens

Navigate to any Hub screen:
- **Today**: `/hub/today` - Your daily dashboard
- **Autopilot**: `/hub/autopilot` - Configure AI autonomy
- **Inbox**: `/hub/inbox` - Pending approvals
- **Playbooks**: `/hub/playbooks` - Automation workflows
- **Revenue**: `/hub/revenue` - Financial metrics
- **Settings**: `/hub/settings` - API keys & system health

### Command Bus (Cmd+K)

Press `Cmd+K` (or `Ctrl+K` on Windows/Linux) to open the command palette:

Example commands:
- "Fix the failing build in omniops-backend"
- "Deploy ContentSpark to production"
- "Send upgrade prompts to power users"
- "Pause low-converting ad campaigns"

### Configuring Autopilot

1. Go to **Autopilot** (`/hub/autopilot`)
2. Select your desired autonomy level (0-5)
3. Configure timebox (optional): Set execution windows
4. Enable products: Choose which products autopilot manages
5. Set guardrails: Max spend, max PRs, deployment rules
6. Click **Save Changes**

### Managing API Keys

1. Go to **Settings** (`/hub/settings`)
2. Click **Configure** for any API key
3. Enter your key value
4. Click **Save**
5. Toggle **Enabled** to activate
6. Use **Test** button to verify connection

---

## 🔄 Mock API vs Real Backend

### Current Setup (Mock API)

The Hub currently uses **mock data** (`src/lib/mockHubApi.js`) for development and testing. This provides:
- Realistic sample data for all screens
- Simulated network delays
- No backend required

### Switching to Real Backend

When your backend is ready:

1. **Update `src/lib/hubApi.js`**:
   ```javascript
   // Change this flag
   const USE_MOCK = false; // Set to false for real API
   ```

2. **Configure Environment Variables**:
   Ensure `VITE_HUB_API_URL` points to your backend.

3. **Backend API Contract**:
   The mock API (`src/lib/mockHubApi.js`) defines the expected API structure:
   - `GET /api/hub/today` - Today screen data
   - `GET /api/hub/autopilot` - Autopilot configuration
   - `PUT /api/hub/autopilot` - Update autopilot settings
   - `GET /api/hub/inbox` - Pending approval items
   - `POST /api/hub/inbox/:id/approve` - Approve action
   - `GET /api/hub/playbooks` - List playbooks
   - `POST /api/hub/playbooks/:id/execute` - Execute playbook
   - `GET /api/hub/revenue` - Revenue metrics
   - `GET /api/hub/keys` - API keys
   - `POST /api/hub/keys` - Save API key
   - `GET /api/hub/health` - System health

---

## ⌨️ Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open Command Bus
- `Cmd/Ctrl + T` - Go to Today (when implemented)
- `Cmd/Ctrl + A` - Go to Autopilot (when implemented)
- `Cmd/Ctrl + I` - Go to Inbox (when implemented)
- `Escape` - Close modals and overlays

---

## 🐛 Troubleshooting

### Common Issues

**1. Pages not loading / showing errors**
- Check browser console for errors
- Ensure all dependencies are installed: `npm install`
- Clear browser cache and reload

**2. Mock data not showing**
- Verify `USE_MOCK = true` in `src/lib/hubApi.js`
- Check React Query DevTools in browser console

**3. Command Bus (Cmd+K) not opening**
- Ensure you're on a Hub page (`/hub/*`)
- Try `Ctrl+K` on Windows/Linux instead of `Cmd+K`

**4. Build errors**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`

**5. API connection issues (with real backend)**
- Check `VITE_HUB_API_URL` in `.env`
- Verify backend is running
- Check CORS configuration on backend
- Review network tab in browser DevTools

### Getting Help

- Check the [GitHub Issues](https://github.com/WEARETHETREND/omniops-frontend/issues)
- Review the mock API implementation: `src/lib/mockHubApi.js`
- Inspect component props and structure in React DevTools

---

## 📁 File Structure

```
src/
├── pages/Hub/
│   ├── Layout.jsx          # Main layout with navigation
│   ├── Today.jsx           # Today dashboard
│   ├── Autopilot.jsx       # Autopilot control screen
│   ├── Inbox.jsx           # Pending approvals
│   ├── Playbooks.jsx       # Playbook management
│   ├── Revenue.jsx         # Revenue dashboard
│   └── Settings.jsx        # API keys & settings
├── components/Hub/
│   ├── AutopilotDial.jsx   # 0-5 level selector
│   ├── PlaybookCard.jsx    # Playbook display card
│   ├── InboxCard.jsx       # Inbox item card
│   ├── CommandBus.jsx      # Cmd+K command modal
│   ├── MetricCard.jsx      # Revenue metric display
│   ├── TrustChart.jsx      # Trust score chart
│   └── EmptyState.jsx      # Empty state component
├── lib/
│   ├── hubApi.js           # API client (switch between mock/real)
│   ├── mockHubApi.js       # Mock API implementation
│   ├── queryClient.js      # React Query configuration
│   └── mockData/
│       ├── alerts.js       # Sample alerts
│       ├── moves.js        # Sample recommendations
│       ├── logs.js         # Sample autopilot logs
│       ├── playbooks.js    # Sample playbooks
│       ├── inbox.js        # Sample inbox items
│       └── revenue.js      # Sample revenue data
└── App.jsx                 # App with Hub routes
```

---

## 🎨 Design System

The Hub uses Tailwind CSS with a consistent color scheme:
- **Blue** (#2563eb): Primary actions, links, active states
- **Green** (#10b981): Success, revenue growth, positive metrics
- **Yellow** (#f59e0b): Warnings, pending items
- **Red** (#ef4444): Critical alerts, errors, negative metrics
- **Gray** (#64748b): Neutral text, disabled states

---

## 🚀 Next Steps

1. **Test all Hub features** with mock data
2. **Build your backend API** following the contract in `mockHubApi.js`
3. **Configure API keys** in Settings once backend is ready
4. **Switch to real API** by setting `USE_MOCK = false`
5. **Deploy to production** and start automating your empire!

---

**Built with ❤️ by WEARETHETREND** - The Supreme Hub is your AI-powered command center for managing the entire product empire.