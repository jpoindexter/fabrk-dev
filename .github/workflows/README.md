# GitHub Actions CI/CD Pipeline

Comprehensive, production-grade CI/CD pipeline for the Fabrk boilerplate project.

## Overview

This pipeline provides:
- Automated code quality checks (ESLint, TypeScript, Prettier)
- Unit and integration tests with coverage reporting
- Automated builds with bundle size analysis
- End-to-end testing with Playwright
- Security audits and dependency scanning
- Performance monitoring with Lighthouse
- Automated releases and deployments
- Scheduled maintenance tasks

## Workflows

### 1. CI (Continuous Integration)

**File:** `.github/workflows/ci.yml`

**Triggers:** Push to `main` or `develop`, Pull Requests

**Jobs:**

| Job | Purpose | Time |
|-----|---------|------|
| Setup & Cache | Install dependencies and cache them | ~1 min |
| Lint & Format | ESLint, TypeScript checks, Prettier | ~3 min |
| Unit Tests | Vitest with coverage reporting | ~8 min |
| Build | Next.js build and bundle analysis | ~5 min |
| Security | npm audit and outdated check | ~3 min |
| Summary | Report overall pipeline status | ~1 min |

**Key Features:**
- Node 20.x environment
- PostgreSQL 15 service for database tests
- Coverage threshold enforcement (50%)
- PR comments with test results
- Bundle size analysis
- Concurrent job execution where possible

**Estimated Run Time:** 10-15 minutes

### 2. PR Checks

**File:** `.github/workflows/pr-checks.yml`

**Triggers:** Pull Request events (opened, synchronized, reopened)

**Jobs:**

| Job | Purpose |
|-----|---------|
| Lint & Type | Code quality checks |
| Test Changes | Run full test suite |
| Build Check | Verify build succeeds |
| PR Summary | Post results to PR |

**Key Features:**
- Concurrent execution of checks
- PR comment with pass/fail summary
- Blocks merge if critical checks fail
- Coverage report artifacts

**Estimated Run Time:** 15-20 minutes

### 3. Deploy

**File:** `.github/workflows/deploy.yml`

**Triggers:** Push to `main` branch, Manual workflow dispatch

**Jobs:**

| Job | Purpose |
|-----|---------|
| CI Checks | Run full CI pipeline |
| Deploy to Vercel | Push to production |
| Notification | Post deployment summary |

**Key Features:**
- Requires all CI checks to pass
- Vercel integration (optional, requires `VERCEL_TOKEN` secret)
- Deployment notifications
- Automatic skip if Vercel not configured

**Estimated Run Time:** 20-30 minutes

**Required Secrets:**
- `VERCEL_TOKEN` (optional) - Vercel API token
- `VERCEL_ORG_ID` (optional) - Vercel organization ID
- `VERCEL_PROJECT_ID` (optional) - Vercel project ID

### 4. E2E Tests

**File:** `.github/workflows/e2e-tests.yml`

**Triggers:** Push to `main`/`develop`, Pull Requests, Daily at 2 AM UTC

**Jobs:**

| Job | Purpose |
|-----|---------|
| Playwright E2E Tests | Run end-to-end tests |

**Key Features:**
- Playwright test execution
- Test report uploading
- Server health checks
- PR comments with test results
- Daily scheduled runs

**Estimated Run Time:** 15-25 minutes

**Setup Required:**
```bash
npm install --save-dev @playwright/test
npx playwright install
```

Add to `package.json`:
```json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

### 5. Performance

**File:** `.github/workflows/performance.yml`

**Triggers:** Push to `main`/`develop`, Pull Requests

**Jobs:**

| Job | Purpose |
|-----|---------|
| Bundle Analysis | Analyze bundle size |
| Lighthouse CI | Performance metrics |

**Key Features:**
- Bundle size reporting
- Lighthouse performance audits
- PR comments with metrics
- Historical artifact tracking

**Estimated Run Time:** 20-30 minutes

**Optional Setup (Lighthouse CI):**
```bash
npm install --save-dev @lhci/cli@latest
npx lhci wizard
```

### 6. Release

**File:** `.github/workflows/release.yml`

**Triggers:** Git tags matching `v*` pattern, Manual workflow dispatch

**Jobs:**

| Job | Purpose |
|-----|---------|
| Verify Release | Full CI validation |
| Create Release | GitHub release with changelog |

**Key Features:**
- Full CI validation before release
- Automatic changelog generation
- GitHub release creation
- Release notes with installation instructions

**Usage:**
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 7. Lighthouse

**File:** `.github/workflows/lighthouse.yml`

**Triggers:** Push to `main`, Pull Requests, Weekly on Sundays at 2 AM UTC

**Features:**
- Performance, accessibility, best practices, and SEO scoring
- PR comments with detailed metrics
- Historical results tracking
- Manual review of performance failures

**Optional Setup:**
Requires `LHCI_GITHUB_APP_TOKEN` secret for full integration.

### 8. Backup

**File:** `.github/workflows/backup.yml`

**Triggers:** Daily at 2 AM UTC, Manual workflow dispatch

**Features:**
- PostgreSQL database backups
- GitHub Artifacts storage (30 days)
- Optional AWS S3 backup
- Failure notifications

**Optional Setup:**
Set these secrets for S3 backup:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BACKUP_BUCKET`

### 9. Maintenance

**File:** `.github/workflows/maintenance.yml`

**Triggers:** Daily at 1 AM UTC, Manual workflow dispatch

**Jobs:**

| Job | Purpose |
|-----|---------|
| Mark Stale Issues | Auto-close inactive issues |
| Check Security | Scan for vulnerabilities |
| Cleanup Artifacts | Remove old build artifacts |
| Health Check | Repository statistics |

**Features:**
- Automatic stale issue/PR management
- Security vulnerability detection
- Artifact cleanup (>30 days)
- Repository health reporting

## Environment Variables

### Required
```env
# Already set in workflow
NODE_VERSION=20.x
NEXTAUTH_SECRET=test-secret-for-ci-only
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://test:test@localhost:5432/test
```

### Optional (Secrets)
```env
VERCEL_TOKEN                 # For Vercel deployment
VERCEL_ORG_ID               # Vercel organization
VERCEL_PROJECT_ID           # Vercel project
LHCI_GITHUB_APP_TOKEN       # Lighthouse CI integration
AWS_ACCESS_KEY_ID           # For S3 backups
AWS_SECRET_ACCESS_KEY       # For S3 backups
AWS_REGION                  # For S3 backups
S3_BACKUP_BUCKET            # S3 bucket name
```

## Badge URLs

Add these to your README.md:

```markdown
[![CI](https://github.com/your-username/fabrk/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/fabrk/actions/workflows/ci.yml)
[![Deploy](https://github.com/your-username/fabrk/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-username/fabrk/actions/workflows/deploy.yml)
[![E2E Tests](https://github.com/your-username/fabrk/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/your-username/fabrk/actions/workflows/e2e-tests.yml)
[![Performance](https://github.com/your-username/fabrk/actions/workflows/performance.yml/badge.svg)](https://github.com/your-username/fabrk/actions/workflows/performance.yml)
```

Raw URLs (replace `your-username/fabrk` with your repo):
- CI: `https://github.com/your-username/fabrk/actions/workflows/ci.yml/badge.svg`
- Deploy: `https://github.com/your-username/fabrk/actions/workflows/deploy.yml/badge.svg`
- E2E: `https://github.com/your-username/fabrk/actions/workflows/e2e-tests.yml/badge.svg`
- Performance: `https://github.com/your-username/fabrk/actions/workflows/performance.yml/badge.svg`

## Configuration

### Dependabot

`.github/dependabot.yml` is pre-configured with:

**NPM Updates:**
- Weekly checks on Mondays at 9 AM UTC
- Grouped by dependency type
- Security patches always allowed
- Major version updates require manual review

**GitHub Actions Updates:**
- Weekly checks on Mondays at 10 AM UTC
- Maximum 3 open PRs
- Automatic labeling

### Node Version

Default: Node 20.x (LTS)

To change, update `NODE_VERSION` env variable in each workflow.

### Database

Default: PostgreSQL 15 Alpine

Services run in:
- `ci.yml` - unit-tests job
- `e2e-tests.yml`
- `performance.yml`

## Performance

### Typical Run Times

| Workflow | Time | Parallelization |
|----------|------|-----------------|
| CI | 15-20 min | 4 parallel jobs |
| PR Checks | 15-20 min | 3 parallel jobs |
| Deploy | 25-35 min | Sequential |
| E2E Tests | 15-25 min | Single job |
| Performance | 20-30 min | 2 parallel jobs |
| Release | 20-30 min | Sequential |
| Maintenance | 10-15 min | 4 parallel jobs |

### Optimization Tips

1. **Use caching:** npm cache is automatically managed via `actions/setup-node`
2. **Parallel jobs:** Multiple jobs run simultaneously when possible
3. **Conditional execution:** Skip jobs when not needed (e.g., skip Vercel deploy if no token)
4. **Artifacts:** Kept for 7 days to balance storage and CI costs

### Cost Estimation

GitHub Actions provides 2000 free minutes/month for public repos.

**Monthly costs** (approximate):
- CI runs: 20-30 per month × 15 min = 300-450 min
- E2E tests: 8 per month × 20 min = 160 min
- Performance: 8 per month × 25 min = 200 min
- Other workflows: ~200 min

**Total:** ~1000 min/month (well within free tier)

## Troubleshooting

### Common Issues

**Build fails with "Unable to acquire lock"**
- All dev server instances killed automatically
- Uses `npm ci` instead of `npm install` for deterministic builds

**Database connection timeout**
- PostgreSQL service health check enforces readiness
- Retries up to 5 times with 10s intervals

**E2E tests fail due to server not starting**
- 10-second sleep before health check
- 30-second timeout for server readiness
- Server logs available in artifacts

**Coverage below threshold**
- Default threshold: 50%
- Edit `ci.yml` line 178 to adjust
- Run `npm run test:coverage` locally to debug

### Debugging

1. **View logs:** Click "Actions" tab → workflow → job → step
2. **Download artifacts:** Click "Artifacts" section after run completes
3. **Run locally:** Use same Node version and environment variables
4. **Use workflow_dispatch:** Manually trigger workflows for testing

## Best Practices

### For Contributors

1. **Run checks locally before pushing:**
   ```bash
   npm run lint
   npm run type-check
   npm run format:check
   npm test
   ```

2. **Fix Prettier issues:**
   ```bash
   npm run format
   ```

3. **Review PR feedback immediately** - CI comments appear on your PR

### For Maintainers

1. **Monitor Actions tab** for failed builds
2. **Review security alerts** in Maintenance workflow
3. **Keep dependencies updated** via Dependabot PRs
4. **Monitor performance metrics** via Performance workflow
5. **Check backup success** in Backup workflow

## Integration Examples

### Adding Sentry Error Tracking

```yaml
- name: Report errors to Sentry
  if: failure()
  uses: actions/github-script@v7
  with:
    script: |
      const sentry = require('@sentry/node');
      sentry.captureException(new Error('CI failed'));
```

### Adding Slack Notifications

```yaml
- name: Slack notification
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Deployment completed: ${{ needs.deploy.result }}"
      }
```

### Adding Test Report Portal

```yaml
- name: Upload to Test Report Portal
  run: npx jest-html-reporters --reportDir=test-results
```

## Future Improvements

1. **Windows/macOS runners** for cross-platform testing
2. **Docker image builds** and registry push
3. **Load testing** with k6 or Artillery
4. **Database snapshots** for regression testing
5. **Visual regression testing** with Percy or Chromatic
6. **API documentation** generation with OpenAPI
7. **Semantic versioning** automation with semantic-release
8. **Database migration validation** in CI

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Context and Expressions](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
