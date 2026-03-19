# Internal Development Process

This repository is maintained by authorized OpsVanta personnel and approved contractors only.

Access to contribute is restricted. See [ACCESS_POLICY.md](./ACCESS_POLICY.md) for access rules.

---

## Change Control

- All changes must be made through protected branches
- All pull requests require review and approval from a CODEOWNER
- All production-impacting changes require test validation before merge
- Access is restricted to authorized collaborators operating under NDA
- Secrets, credentials, and environment files must never be committed

## Branch Naming

| Type | Pattern |
|------|---------|
| Feature | `feature/<short-description>` |
| Bug fix | `fix/<short-description>` |
| Hotfix | `hotfix/<short-description>` |
| Release | `release/<version>` |

## Pull Request Requirements

1. Target the appropriate protected branch (`main` or `develop`)
2. Provide a clear description of the change and its business justification
3. Ensure all automated checks pass before requesting review
4. Request review from at least one authorized CODEOWNER
5. Do not merge without explicit approval

## Coding Standards

- Follow the ESLint configuration in `eslint.config.js`
- Format code with Prettier before committing
- Write meaningful commit messages describing the change
- Update relevant documentation alongside code changes

## Contributor Rights Assignment

By submitting any contribution (code, documentation, pull requests) to this repository,
contributors assign all rights to OpsVanta LLC and agree the contribution is proprietary
and confidential under the terms of their executed NDA and authorized access agreement.

---

For questions or access requests: contact@opsvanta.com
