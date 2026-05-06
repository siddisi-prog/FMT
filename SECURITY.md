# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.x (latest) | Yes |
| < 1.0 | No |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please **do not** open a public GitHub issue. Instead, report it responsibly by emailing the security team at **security@example.com**.

Please include the following information in your report:

- A description of the vulnerability and its potential impact.
- Steps to reproduce the issue.
- Any suggested mitigations or patches.

We will acknowledge receipt of your report within 48 hours and aim to provide a resolution timeline within 7 business days.

## Security Considerations

This platform handles sensitive healthcare asset and financial data. The following security controls are implemented:

- All API endpoints require a valid JWT issued by the Identity & Access Service.
- All data in transit is encrypted using TLS 1.2+.
- All data at rest is encrypted using AES-256.
- PHI (Protected Health Information) is stored in a separate, access-controlled data store.
- All create, update, and delete operations are logged immutably in the audit log.
- Dependency vulnerabilities are monitored via GitHub Dependabot.
