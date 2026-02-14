# System Requirements

Minimum and recommended system requirements for OpsVanta.

## Server Requirements

### Minimum Requirements

**Operating System:**
- Ubuntu 20.04 LTS or newer
- Debian 11 or newer
- CentOS 8 or newer
- macOS 11 (Big Sur) or newer
- Windows Server 2019 or newer (with WSL2)

**Hardware:**
- CPU: 2 cores (2.0 GHz+)
- RAM: 4 GB
- Storage: 20 GB available
- Network: 1 Gbps

**Software:**
- Node.js 18.x or higher
- npm 8.x or higher
- Git 2.x or higher

### Recommended Requirements

**Hardware:**
- CPU: 4+ cores (3.0 GHz+)
- RAM: 8 GB or more
- Storage: 50 GB SSD
- Network: 10 Gbps

**Software:**
- Node.js 20.x (LTS)
- npm 10.x
- Git 2.40+

## Database Requirements

### PostgreSQL

**Minimum:**
- PostgreSQL 14.x
- 2 GB RAM
- 10 GB storage

**Recommended:**
- PostgreSQL 15.x or 16.x
- 4 GB RAM
- 50 GB SSD storage
- Automated backups configured

### Redis

**Minimum:**
- Redis 6.x
- 512 MB RAM
- 1 GB storage

**Recommended:**
- Redis 7.x
- 2 GB RAM
- 5 GB storage
- Persistence enabled

## Storage Requirements

### File Storage

**Options:**
- AWS S3
- Google Cloud Storage
- Azure Blob Storage
- MinIO (self-hosted S3-compatible)

**Capacity:**
- Minimum: 10 GB
- Recommended: 100 GB+
- Enterprise: 1 TB+

### Backup Storage

**Requirements:**
- Separate from primary storage
- Encrypted
- Geographically distributed
- Minimum 2x primary storage

## Network Requirements

### Bandwidth

**Minimum:**
- 100 Mbps upload/download
- 1 TB monthly transfer

**Recommended:**
- 1 Gbps upload/download
- 5 TB monthly transfer

**Enterprise:**
- 10 Gbps upload/download
- Unlimited transfer

### Ports

**Required Open Ports:**
- 80 (HTTP)
- 443 (HTTPS)
- 22 (SSH, for management)

**Optional:**
- 3000 (Development)
- 5432 (PostgreSQL, internal)
- 6379 (Redis, internal)

### SSL/TLS

**Requirements:**
- TLS 1.2 minimum
- TLS 1.3 recommended
- Valid SSL certificate
- Automatic renewal

## External Services

### Required Services

**Email (SMTP):**
- SendGrid, Amazon SES, or similar
- 1,000+ emails/month capacity
- SPF/DKIM configured

**CDN:**
- CloudFlare, Fastly, or AWS CloudFront
- Global edge locations
- HTTPS support

**DNS:**
- Reliable DNS provider
- API access for automation
- DNSSEC support

### Optional Services

**Monitoring:**
- Datadog, New Relic, or similar
- Application performance monitoring
- Infrastructure monitoring

**Analytics:**
- Google Analytics
- Mixpanel
- Custom analytics

## Browser Requirements

### Supported Browsers

**Minimum Versions:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Recommended Versions:**
- Latest stable versions
- Auto-update enabled

**Not Supported:**
- Internet Explorer (all versions)
- Legacy browsers

### JavaScript

**Requirements:**
- JavaScript enabled
- ES2020 support
- WebAssembly support (optional)

## Development Environment

### Local Development

**Requirements:**
- Node.js 18+ installed
- npm or yarn
- Git
- Code editor (VS Code recommended)
- 8 GB RAM
- 10 GB free storage

**Recommended:**
- Docker Desktop
- Postman or similar API client
- Browser DevTools
- 16 GB RAM

## Production Environment

### High Availability Setup

**Load Balancer:**
- AWS ALB, NGINX, or HAProxy
- Health checks configured
- SSL termination

**Application Servers:**
- Minimum: 2 instances
- Recommended: 3+ instances
- Auto-scaling configured
- Health monitoring

**Database:**
- Primary-replica setup
- Automated failover
- Regular backups
- Point-in-time recovery

### Monitoring & Logging

**Requirements:**
- Centralized logging (ELK, Splunk)
- Real-time monitoring
- Alerting system
- Log retention (30+ days)

## Security Requirements

### Firewall

**Requirements:**
- WAF (Web Application Firewall)
- DDoS protection
- Rate limiting
- IP whitelisting (optional)

### Backup

**Requirements:**
- Automated daily backups
- Encrypted backups
- Off-site backup storage
- Tested restore procedures

### Updates

**Requirements:**
- Regular security updates
- Patch management
- Vulnerability scanning
- Dependency updates

## Compliance Requirements

### Data Protection

**Required:**
- Data encryption at rest and in transit
- Secure data deletion
- Data backup and recovery
- Access logging

### Certifications

**Supported:**
- SOC 2 Type II
- GDPR
- HIPAA (Enterprise)
- ISO 27001

## Scalability Considerations

### Small Deployment (< 100 users)

- 1 application server
- 1 database server
- Shared services
- ~$100-200/month

### Medium Deployment (100-1000 users)

- 2-3 application servers
- 1 primary + 1 replica database
- Dedicated cache
- ~$500-1000/month

### Large Deployment (1000+ users)

- 5+ application servers
- Database cluster
- Distributed cache
- CDN
- ~$2000+/month

### Enterprise Deployment

- Auto-scaling clusters
- Multi-region deployment
- High availability
- Dedicated support
- Custom pricing

## Next Steps

- [Installation Guide](./installation.md)
- [Environment Setup](./environment-setup.md)
- [Database Setup](./database-setup.md)
- [Deployment Guide](./deployment.md)
