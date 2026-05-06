# Contributing to the Healthcare Asset Management Platform

Thank you for your interest in contributing. This document outlines the standards and processes for contributing to this repository.

## Code of Conduct

All contributors are expected to adhere to the project's Code of Conduct. Please treat all collaborators with respect and professionalism.

## Branching Strategy

This project follows the **GitHub Flow** branching model:

- `main` — production-ready code; protected branch, requires pull request and review.
- `develop` — integration branch for features in progress.
- `feature/<name>` — feature branches created from `develop`.
- `fix/<name>` — bug fix branches.
- `chore/<name>` — maintenance tasks (dependency updates, refactoring).

## Commit Message Convention

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

**Examples**:
```
feat(asset-management): add compliance record expiry alerts
fix(capital-planning): correct NPV calculation for multi-year cycles
docs(readme): update getting started instructions
```

## Pull Request Process

1. Ensure your branch is up to date with `develop` before opening a PR.
2. All CI checks (lint, test, Docker build) must pass.
3. At least one reviewer must approve the PR before merging.
4. Squash commits on merge to keep the history clean.
5. Reference any related issues in the PR description using `Closes #<issue-number>`.

## Code Style

- **JavaScript/TypeScript**: ESLint with the project's `.eslintrc` configuration.
- **Formatting**: Prettier with the project's `.prettierrc` configuration.
- **Naming**: Use `camelCase` for variables and functions, `PascalCase` for classes and components.

## Testing Requirements

- All new features must include unit tests.
- Integration tests are required for new API endpoints.
- Minimum code coverage threshold: **80%**.
- Run tests locally before opening a PR: `npm test`.

## Documentation

- Update the relevant service `README.md` for any API or configuration changes.
- Add or update OpenAPI specifications in `docs/api/` for any API changes.
- Create an Architecture Decision Record (ADR) in `docs/architecture/adr/` for significant architectural decisions.
