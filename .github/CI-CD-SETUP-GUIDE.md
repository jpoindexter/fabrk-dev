# CI/CD Setup Guide

Complete setup instructions for the Fabrk CI/CD pipeline.

## Quick Start

The pipeline is **ready to use out of the box**. Just push to your repository and workflows will execute automatically.

## Step 1: Verify Basic Setup (Required)

### 1.1 Ensure Required Files Exist

```bash
# Check that all workflow files exist
ls -la .github/workflows/
```

Should show:
- `ci.yml` - Main CI pipeline
- `pr-checks.yml` - Pull request validation
- `deploy.yml` - Production deployment
- `e2e-tests.yml` - End-to-end testing
- `performance.yml` - Performance monitoring
- `release.yml` - Release automation
- `maintenance.yml` - Scheduled maintenance
- `lighthouse.yml` - Performance auditing (already exists)
- `backup.yml` - Database backups (already exists)

### 1.2 Check Package Scripts

All required npm scripts must exist in `package.json`:

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "lint": "npm run scan:hex && ESLINT_USE_FLAT_CONFIG=true eslint src",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ...",
    "format:check": "prettier --check ...",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:e2e": "..."  // See E2E setup below
  }
}
```

Verify with:
```bash
npm run lint
npm run type-check
npm run format:check
npm test
npm run build
```

## Step 2: Enable Required GitHub Features

### 2.1 Branch Protection

1. Go to **Settings** → **Branches**
2. Click **Add rule** under "Branch protection rules"
3. Set **Branch name pattern**: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require code reviews before merging (optional)
5. Under "Status checks that are required to pass before merging", select:
   - ✅ `Lint & Format Check`
   - ✅ `Unit Tests`
   - ✅ `Build & Bundle`
   - ✅ (Optional) `Playwright E2E Tests`

### 2.2 Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Set "Actions permissions": **Allow all actions and reusable workflows**
3. Under "Workflow permissions", select:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

### 2.3 Configure PR Template (Optional)

Already configured in `.github/pull_request_template.md`

## Step 3: Configure Optional Services

### 3.1 Vercel Deployment (Optional)

For automatic deployments to production:

1. Get your Vercel token:
   - Go to https://vercel.com/account/tokens
   - Create a new token with read/write access
   - Copy the token

2. Add GitHub secrets:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Add:
     - `VERCEL_TOKEN`: `<your-vercel-token>`
     - `VERCEL_ORG_ID`: (from `vercel.json` or Vercel dashboard)
     - `VERCEL_PROJECT_ID`: (from `vercel.json` or Vercel dashboard)

3. Create `vercel.json` in project root:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm ci"
   }
   ```

4. Verify in deploy workflow:
   - Deploy workflow will show "Skipped" if secrets not configured
   - Configure secrets to enable

### 3.2 Lighthouse CI (Optional)

For performance monitoring:

1. Install CLI:
   ```bash
   npm install --save-dev @lhci/cli@latest
   ```

2. Create `.lighthouserc.json`:
   ```json
   {
     "ci": {
       "collect": {
         "url": ["http://localhost:3000"],
         "numberOfRuns": 1
       },
       "upload": {
         "target": "github"
       }
     }
   }
   ```

3. Get GitHub App token:
   - Go to https://github.com/settings/personal-access-tokens/new
   - Select repo scope
   - Copy token

4. Add secret:
   - `LHCI_GITHUB_APP_TOKEN`: `<your-github-token>`

### 3.3 AWS S3 Backup (Optional)

For database backup to S3:

1. Create AWS IAM user with S3 access
2. Add GitHub secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `AWS_REGION`: e.g., `us-east-1`
   - `S3_BACKUP_BUCKET`: Your S3 bucket name

3. The backup workflow will automatically use these secrets

## Step 4: E2E Testing Setup

### 4.1 Install Playwright

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### 4.2 Create Test File

Create `e2e/example.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Fabrk/);
});

test('sign up page exists', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signup');
  await expect(page.locator('button')).toContainText('Sign up');
});
```

### 4.3 Configure Playwright

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

### 4.4 Update package.json

```json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

### 4.5 Test Locally

```bash
npm run test:e2e
```

## Step 5: Local Testing

### 5.1 Run All Checks Locally

```bash
# Lint
npm run lint

# Type check
npm run type-check

# Format check
npm run format:check

# Unit tests
npm test

# Coverage report
npm run test:coverage

# Build
npm run build

# E2E tests (requires dev server running)
npm run dev  # Terminal 1
npm run test:e2e  # Terminal 2
```

### 5.2 Run Single Workflow Locally

Using [act](https://github.com/nektos/act) (requires Docker):

```bash
# Install act
brew install act

# Run CI workflow
act push -j lint
act push -j unit-tests
act push -j build

# Run with specific trigger
act pull_request
```

## Step 6: Dependabot Configuration

Dependabot is already configured in `.github/dependabot.yml`.

### 6.1 Enable Dependabot

1. Go to **Settings** → **Security & analysis**
2. Enable:
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Dependabot version updates

### 6.2 Configure Update Schedule

Edit `.github/dependabot.yml`:

- Current schedule: Weekly on Mondays at 9 AM UTC
- Modify `schedule.time` to change time
- Modify `open-pull-requests-limit` to limit concurrent PRs

### 6.3 Auto-Merge Dependabot PRs (Advanced)

Create `.github/workflows/dependabot-auto-merge.yml`:

```yaml
name: Auto-merge Dependabot PRs

on: pull_request

jobs:
  dependabot:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'

    permissions:
      pull-requests: write
      contents: write

    steps:
      - name: Auto-merge minor/patch updates
        uses: actions/github-script@v7
        with:
          script: |
            const { data: pr } = await github.rest.pulls.get({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
            });

            if (pr.title.includes('minor') || pr.title.includes('patch')) {
              await github.rest.pulls.merge({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: context.issue.number,
                merge_method: 'squash',
              });
            }
```

## Step 7: Monitoring

### 7.1 Actions Dashboard

Monitor all workflows:
- Go to **Actions** tab
- View run history, logs, and artifacts
- Check individual job details

### 7.2 GitHub Status Checks

In PR:
- Status checks appear automatically
- Red X = failed check (blocks merge)
- Green ✓ = passed check

### 7.3 View Coverage Reports

1. After tests complete, go to **Actions** → workflow run
2. Download `coverage-report` artifact
3. Extract and open `index.html` in browser

### 7.4 View E2E Test Results

1. After E2E tests complete
2. Download `playwright-report` artifact
3. Extract and open `index.html` in browser

## Troubleshooting

### Issue: CI Fails with "ESLint Error"

**Solution:**
```bash
npm run lint -- --fix  # Auto-fix issues
npm run format         # Format code
git add .
git commit -m "fix: lint and formatting"
git push
```

### Issue: Type Check Fails

**Solution:**
```bash
npm run type-check     # See detailed errors
# Fix errors, then test locally before pushing
```

### Issue: Tests Fail Locally but Pass in CI

**Solution:**
1. Match Node version: `node --version` should be 20.x
2. Ensure database is running
3. Clear caches:
   ```bash
   rm -rf node_modules package-lock.json
   npm ci
   npm test
   ```

### Issue: Build Fails with "DATABASE_URL"

**Solution:**
This is expected - DATABASE_URL is set to dummy values for CI builds.
The build should succeed despite missing real database credentials.

### Issue: Vercel Deploy Skipped

**Solution:**
1. Check secrets are configured:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
2. Verify CI passes before deployment

### Issue: E2E Tests Timeout

**Solution:**
1. Increase timeout in `playwright.config.ts`:
   ```typescript
   timeout: 45000  // 45 seconds
   ```
2. Check server is running:
   ```bash
   curl http://localhost:3000
   ```

### Issue: Coverage Below Threshold

**Solution:**
1. Run locally: `npm run test:coverage`
2. View report: `open coverage/index.html`
3. Add tests to increase coverage
4. Adjust threshold in `ci.yml` if needed (line 178)

## Advanced Configuration

### Add New Status Check

1. Create new workflow file in `.github/workflows/`
2. Update branch protection rules to require it
3. Workflow automatically becomes required

### Add Custom Environment Variables

Add to workflow:
```yaml
env:
  CUSTOM_VAR: 'value'
```

Or add to GitHub secrets and reference:
```yaml
env:
  CUSTOM_VAR: ${{ secrets.CUSTOM_VAR }}
```

### Schedule Custom Jobs

Edit any workflow to add schedule:
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

## Cost Estimation

GitHub Actions pricing (for private repos):

- **Free tier**: 2000 minutes/month
- **Estimated usage**: ~1000 min/month
- **Cost**: Free (within tier)

Optimize:
- Parallel jobs reduce total run time
- Caching speeds up job execution
- Conditional execution skips unnecessary jobs

## Support

For issues:

1. Check [GitHub Actions logs](https://github.com/jpoindexter/fabrk_plate/actions)
2. Review [Workflow README](.github/workflows/README.md)
3. Check GitHub Actions documentation
4. Open an issue on the repository

## Next Steps

1. ✅ Enable all workflows
2. ✅ Configure optional services (Vercel, Lighthouse)
3. ✅ Set branch protection rules
4. ✅ Add CI/CD badges to README
5. ✅ Test with a sample PR
6. ✅ Monitor first few runs
7. 📊 Adjust thresholds based on project needs
