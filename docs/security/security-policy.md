# Security Policy

OpsVanta takes security seriously. This document outlines our security practices and policies.

## Reporting Security Issues

### How to Report

**DO NOT** create public GitHub issues for security vulnerabilities.

Instead, report security issues to:
- 📧 Email: security@opsvanta.com
- 🔐 PGP Key: Available at [opsvanta.com/security/pgp](https://opsvanta.com/security/pgp)

### What to Include

Please provide:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fixes (if any)
- Your contact information

### Response Timeline

- **Initial Response:** Within 24 hours
- **Assessment:** Within 72 hours
- **Fix Timeline:** Varies by severity
  - Critical: 24-48 hours
  - High: 1 week
  - Medium: 2 weeks
  - Low: Next release

## Security Measures

### Data Protection

✅ **Encryption at Rest**
- All sensitive data encrypted using AES-256
- Database encryption enabled
- Encrypted backups

✅ **Encryption in Transit**
- TLS 1.3 for all connections
- HTTPS enforced
- Secure WebSocket connections

✅ **Access Controls**
- Role-based access control (RBAC)
- Principle of least privilege
- Multi-factor authentication
- Regular access audits

### Application Security

✅ **Secure Development**
- Security code reviews
- Static code analysis
- Dependency scanning
- Regular security testing

✅ **Authentication**
- Secure password hashing (bcrypt)
- JWT with short expiration
- Session management
- Rate limiting

✅ **Input Validation**
- Server-side validation
- SQL injection prevention
- XSS protection
- CSRF protection

### Infrastructure Security

✅ **Network Security**
- Firewall configuration
- DDoS protection
- VPC isolation
- Network monitoring

✅ **Monitoring & Logging**
- Security event logging
- Intrusion detection
- Anomaly detection
- 24/7 monitoring

✅ **Backup & Recovery**
- Automated daily backups
- Encrypted backups
- Off-site backup storage
- Disaster recovery plan

## Compliance

### Standards & Certifications

- ✅ **SOC 2 Type II** - Certified
- ✅ **GDPR** - Compliant
- ✅ **HIPAA** - Compliant (Enterprise)
- ✅ **ISO 27001** - In progress

### Data Handling

- Data minimization
- Purpose limitation
- Storage limitation
- Data subject rights
- Privacy by design

## Security Best Practices

### For Users

1. **Use strong passwords**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols
   - Unique per account

2. **Enable 2FA**
   - Use authenticator app
   - Store backup codes securely

3. **Keep software updated**
   - Update browsers regularly
   - Apply security patches

4. **Be cautious**
   - Verify email senders
   - Don't share credentials
   - Report suspicious activity

### For Administrators

1. **Access Management**
   - Regular access reviews
   - Remove unused accounts
   - Monitor admin activities
   - Use separate admin accounts

2. **Configuration**
   - Enable security features
   - Use strong encryption
   - Configure firewalls
   - Regular security audits

3. **Monitoring**
   - Review security logs
   - Set up alerts
   - Monitor anomalies
   - Incident response ready

## Security Updates

We provide security updates for:
- Current major version: Immediate fixes
- Previous major version: 6 months support
- Older versions: No security updates

## Bug Bounty Program

We offer rewards for security vulnerability discoveries:
- **Critical:** $2,000 - $10,000
- **High:** $500 - $2,000
- **Medium:** $100 - $500
- **Low:** Recognition + swag

See [Bug Bounty Program](https://opsvanta.com/security/bug-bounty) for details.

## Contact

**Security Team:**
- 📧 Email: security@opsvanta.com
- 🔐 PGP Key: [opsvanta.com/security/pgp](https://opsvanta.com/security/pgp)

**General Support:**
- 📧 Email: support@opsvanta.com
- 💬 Discord: [discord.gg/opsvanta](https://discord.gg/opsvanta)

## Related Documents

- [Vulnerability Disclosure Policy](./vulnerability-disclosure.md)
- [Data Protection](./data-protection.md)
- [Incident Response Plan](./incident-response.md)
- [Privacy Policy](./privacy-policy.md)

---

**Last Updated:** February 2026
**Version:** 1.0
