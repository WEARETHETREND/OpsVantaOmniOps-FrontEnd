# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (`main`) | ✅ Yes |

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Report security issues privately by emailing:

📧 **security@opsvanta.com**

Include in your report:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested remediation (if any)

### Response Timeline

| Stage | Target |
|-------|--------|
| Acknowledgement | Within 48 hours |
| Assessment | Within 5 business days |
| Fix (Critical/High) | Within 14 days |
| Fix (Medium/Low) | Next scheduled release |

## Security Measures

This repository uses the following automated security controls:

- **CodeQL scanning** — static analysis runs on every push and pull request targeting `main`, and weekly on a schedule.
- **Secret scanning** — GitHub secret scanning is enabled to detect accidentally committed credentials.
- **Dependabot** — automated dependency update PRs are opened weekly for both npm packages and GitHub Actions.
- **Branch protection** — direct pushes to `main` are blocked; at least one approved review and passing CodeQL status check are required.

## Scope

The following are in scope for responsible disclosure:

- Authentication and authorization flaws
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Injection vulnerabilities
- Sensitive data exposure
- Insecure direct object references

## Legal

OpsVanta LLC supports responsible disclosure. Good-faith security research conducted within this policy will not result in legal action. We ask that you:

- Give us reasonable time to address the issue before public disclosure
- Avoid accessing, modifying, or deleting data that does not belong to you
- Avoid disrupting production services

© 2026 OpsVanta LLC / WEARETHETREND. All rights reserved.
