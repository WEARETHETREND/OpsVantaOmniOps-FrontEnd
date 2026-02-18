# API Overview

Complete reference for the OpsVanta API.

## Introduction

The OpsVanta API provides programmatic access to all platform features, allowing you to:

- Create and manage projects
- Generate websites with AI
- Publish and deploy sites
- Manage domains and DNS
- Access analytics data
- Configure workflows
- Integrate with third-party services

## API Basics

### Base URL

```
Production: https://api.opsvanta.com/v1
Staging: https://api-staging.opsvanta.com/v1
```

### Authentication

All API requests require authentication using API keys or OAuth 2.0 tokens.

**API Key Authentication:**

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.opsvanta.com/v1/projects
```

**OAuth 2.0:**

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     https://api.opsvanta.com/v1/projects
```

See [Authentication Guide](./authentication.md) for details.

### Request Format

- **Method:** REST-based (GET, POST, PUT, PATCH, DELETE)
- **Content-Type:** `application/json`
- **Encoding:** UTF-8

### Response Format

All responses are JSON:

```json
{
  "success": true,
  "data": {
    "id": "proj_123",
    "name": "My Website"
  },
  "meta": {
    "timestamp": "2026-02-14T01:00:00Z",
    "requestId": "req_abc123"
  }
}
```

### Error Responses

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Project name is required",
    "details": {
      "field": "name",
      "reason": "missing_field"
    }
  },
  "meta": {
    "timestamp": "2026-02-14T01:00:00Z",
    "requestId": "req_abc123"
  }
}
```

## Rate Limiting

### Limits by Plan

| Plan | Requests/Minute | Requests/Hour | Requests/Day |
|------|----------------|---------------|--------------|
| Free | 60 | 1,000 | 10,000 |
| Pro | 300 | 10,000 | 100,000 |
| Team | 600 | 20,000 | 200,000 |
| Enterprise | Custom | Custom | Custom |

### Rate Limit Headers

```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1708387200
```

See [Rate Limits Guide](./rate-limits.md) for details.

## Pagination

List endpoints support cursor-based pagination:

**Request:**

```bash
GET /v1/projects?limit=20&cursor=eyJpZCI6MTIzfQ==
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "hasMore": true,
    "nextCursor": "eyJpZCI6MTQzfQ==",
    "total": 150
  }
}
```

## Filtering & Sorting

### Filtering

```bash
GET /v1/projects?status=published&type=website
```

### Sorting

```bash
GET /v1/projects?sort=createdAt&order=desc
```

### Search

```bash
GET /v1/projects?q=landing+page
```

## API Endpoints

### Projects

- `GET /v1/projects` - List projects
- `POST /v1/projects` - Create project
- `GET /v1/projects/{id}` - Get project
- `PUT /v1/projects/{id}` - Update project
- `DELETE /v1/projects/{id}` - Delete project

See [Projects API](./endpoints/projects.md)

### Websites

- `POST /v1/projects/{id}/generate` - Generate with AI
- `GET /v1/projects/{id}/preview` - Preview website
- `POST /v1/projects/{id}/publish` - Publish website
- `GET /v1/websites/{id}` - Get website details

See [Websites API](./endpoints/websites.md)

### Domains

- `GET /v1/domains` - List domains
- `POST /v1/domains` - Add domain
- `GET /v1/domains/{id}` - Get domain
- `PUT /v1/domains/{id}` - Update domain
- `DELETE /v1/domains/{id}` - Remove domain

See [Domains API](./endpoints/domains.md)

### Workflows

- `GET /v1/workflows` - List workflows
- `POST /v1/workflows` - Create workflow
- `GET /v1/workflows/{id}` - Get workflow
- `PUT /v1/workflows/{id}` - Update workflow
- `POST /v1/workflows/{id}/trigger` - Trigger workflow

See [Workflows API](./endpoints/workflows.md)

### Analytics

- `GET /v1/analytics/overview` - Analytics overview
- `GET /v1/analytics/pageviews` - Pageview data
- `GET /v1/analytics/visitors` - Visitor data
- `GET /v1/analytics/sources` - Traffic sources

See [Analytics API](./endpoints/analytics.md)

## Webhooks

Subscribe to events:

- `project.created`
- `project.updated`
- `project.deleted`
- `website.published`
- `domain.verified`
- `workflow.triggered`

See [Webhooks Guide](./webhooks.md)

## WebSocket API

Real-time updates via WebSocket:

```javascript
const ws = new WebSocket('wss://api.opsvanta.com/v1/ws');
ws.send(JSON.stringify({
  action: 'subscribe',
  channel: 'project:proj_123'
}));
```

See [WebSocket API Guide](./websockets.md)

## SDKs & Libraries

Official SDKs:

- [JavaScript/TypeScript SDK](../sdk/javascript-sdk.md)
- [Python SDK](../sdk/python-sdk.md)
- REST API (any language)
- GraphQL API

## Code Examples

### Create Project

**JavaScript:**

```javascript
const response = await fetch('https://api.opsvanta.com/v1/projects', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'My New Website',
    type: 'landing_page',
    template: 'modern-saas'
  })
});

const data = await response.json();
console.log('Project created:', data.data.id);
```

**Python:**

```python
import requests

response = requests.post(
    'https://api.opsvanta.com/v1/projects',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'My New Website',
        'type': 'landing_page',
        'template': 'modern-saas'
    }
)

data = response.json()
print('Project created:', data['data']['id'])
```

**cURL:**

```bash
curl -X POST https://api.opsvanta.com/v1/projects \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Website",
    "type": "landing_page",
    "template": "modern-saas"
  }'
```

### Generate with AI

```javascript
const response = await fetch(
  `https://api.opsvanta.com/v1/projects/${projectId}/generate`,
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: 'Create a modern landing page for a SaaS product',
      style: 'modern',
      colorScheme: 'blue'
    })
  }
);

const data = await response.json();
console.log('Generation started:', data.data.generationId);
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `SERVER_ERROR` | 500 | Internal server error |

## Versioning

API version is specified in the URL:

- Current: `/v1/`
- Legacy: `/v0/` (deprecated)

Breaking changes will result in a new version. We maintain backward compatibility for at least 12 months.

## Support

**API Support:**
- 📧 Email: api-support@opsvanta.com
- 💬 Discord: #api-help channel
- 📖 Documentation: [Full API Reference](./README.md)
- 🐛 Report Issues: [GitHub Issues](https://github.com/WEARETHETREND/omniops-frontend/issues)

## Next Steps

- [Authentication Guide](./authentication.md)
- [Projects API Reference](./endpoints/projects.md)
- [JavaScript SDK](../sdk/javascript-sdk.md)
- [API Examples](../sdk/code-examples.md)

---

**Start building with the OpsVanta API today!**
