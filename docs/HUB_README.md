# 🏢 WEARETHETREND Empire Hub

The supreme command center for managing all WEARETHETREND products.

## 🎯 What This Is

A unified control panel that manages:
- **OmniOps** (Website Builder)
- **OpsVanta** (Intelligence Platform)
- **ContentSpark** (Video Editor)
- **GovCon Connect** (Government Contracts)
- **OMNIOPS** (Operations Platform)
- **OpsVanta Platform** (Intelligence SaaS)

## ✨ Features

### Phase 1: Foundation (Current)
- ✅ **Today Screen** - 5-minute daily overview
- ✅ **API Key Vault** - Centralized, encrypted key management
- ✅ **System Health** - Monitor all 6 repos
- ✅ **Alerts & Recommendations** - AI-powered insights
- ✅ **Autopilot Log** - Track autonomous actions

### Phase 2: Intelligence (Coming Soon)
- 🚀 AI Auto-Fix (security patches, build failures)
- 🚀 Decision Engine (Advisory/Conditional/Sovereign modes)
- 🚀 GitHub Monitoring (10s interval checks)
- 🚀 Competitive Intelligence
- 🚀 Empire Memory (learn from decisions)

### Phase 3: Revenue (Coming Soon)
- 💰 Unified Stripe dashboard
- 💰 Multi-product revenue tracking
- 💰 Customer analytics
- 💰 Bundle optimization
- 💰 Product gravity engine

### Phase 4: Advanced (Coming Soon)
- 🧠 Natural language command bus
- 🧠 Financial autopilot
- 🧠 Weekly intelligence reports
- 🧠 Predictive analytics
- 🧠 Autonomous optimization

## 🚀 Quick Start

### 1. Database Setup

Run the migration:
```bash
# If using Supabase CLI
supabase migration up

# Or run the SQL file directly
psql $DATABASE_URL -f supabase/migrations/20260211000000_hub_foundation.sql
```

### 2. Environment Variables

Add to your `.env`:
```bash
# Hub Encryption Key (generate with: openssl rand -base64 32)
HUB_ENCRYPTION_KEY=your-32-character-encryption-key-here

# Existing Supabase keys (already configured)
VITE_SUPABASE_URL=https://pxvjnunxrvbaowbyqlnf.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

### 3. Install Dependencies

```bash
npm install @tanstack/react-query lucide-react
```

### 4. Add Routes

In your `src/App.jsx` or router file, add:

```jsx
import { HubLayout } from './pages/Hub/Layout';
import Today from './pages/Hub/Today';

// In your routes:
<Route path="/hub" element={<HubLayout />}>  
  <Route path="today" element={<Today />} />
  <Route index element={<Navigate to="/hub/today" replace />} />
</Route>
```

### 5. Access Hub

Navigate to: `http://localhost:5173/hub/today`

## 📊 Database Schema

The Hub uses 9 core tables:

1. **hub_api_keys** - Encrypted API key storage
2. **playbooks** - Automation logic templates
3. **hub_alerts** - Things needing attention
4. **hub_moves** - Recommended actions
5. **hub_autopilot_log** - Autonomous action history
6. **hub_inbox** - Pending approvals
7. **founder_preferences** - User settings
8. **hub_revenue** - Revenue tracking
9. **system_health** - Repo monitoring

## 🔐 Security

- All API keys are encrypted using AES-256
- Row Level Security (RLS) enabled on all tables
- Authentication required for all endpoints
- Keys never logged or exposed in responses
- Audit trail for all sensitive actions

## 🎨 UI Components

### Today Screen
- **AlertCard** - Displays critical issues
- **MoveCard** - Shows recommended actions
- **LogCard** - Autopilot activity log

### Coming Soon
- **AutopilotDial** - 0-5 autonomy level control
- **CommandBus** - Natural language interface
- **TrustChart** - System confidence visualization
- **RevenueChart** - Multi-product revenue tracking

## 📡 API Endpoints

### Today
```
GET /api/hub/today
Returns: { alerts: [], moves: [], autopilotLog: [] }
```

### API Keys
```
GET /api/hub/keys
POST /api/hub/keys
PATCH /api/hub/keys/:id/toggle
```

### Inbox
```
GET /api/hub/inbox
POST /api/hub/inbox/:id/approve
POST /api/hub/inbox/:id/reject
```

### Autopilot
```
GET /api/hub/autopilot
POST /api/hub/autopilot
```

### Revenue
```
GET /api/hub/revenue
```

### System Health
```
GET /api/hub/health
```

## 🧪 Testing

```bash
# Run tests
npm test

# Test specific feature
npm test hub

# E2E tests
npm run test:e2e
```

## 📈 Roadmap

### v1.0 - Foundation (Current)
- [x] Database schema
- [x] API key vault
- [x] Today screen
- [x] Basic monitoring
- [ ] Backend API implementation

### v1.1 - Intelligence
- [ ] GitHub auto-fix
- [ ] Decision engine
- [ ] Competitive monitoring
- [ ] Empire memory

### v1.2 - Revenue
- [ ] Stripe integration
- [ ] Multi-product tracking
- [ ] Customer analytics
- [ ] Bundle engine

### v1.3 - Autonomy
- [ ] Command bus
- [ ] Financial autopilot
- [ ] Weekly reports
- [ ] Predictive analytics

## 🆘 Support

- **Docs**: `/docs/HUB_*.md`
- **Issues**: GitHub Issues
- **Questions**: Open a discussion

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         WEARETHETREND Hub               │
├─────────────────────────────────────────┤
│  Frontend (React + Vite + Tailwind)     │
│  - Today Screen                          │
│  - Autopilot Controls                    │
│  - Revenue Dashboard                     │
│  - API Key Vault                         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  Backend API (Node.js + Express)        │
│  - Hub routes (/api/hub/*)               │
│  - Authentication                        │
│  - Encryption/Decryption                 │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  Database (PostgreSQL via Supabase)     │
│  - 9 core tables                         │
│  - Row Level Security                    │
│  - Real-time subscriptions               │
└─────────────────────────────────────────┘
```

## 🎯 Philosophy

The Hub is designed around three principles:

1. **Friction-Free**: Everything you need in 3 screens
2. **Trust-First**: Explainable AI with rollback options
3. **Money-Centric**: All metrics in $ impact

## 📝 License

Private - WEARETHETREND Internal Tool

---

**Built with 💪 by WEARETHETREND**