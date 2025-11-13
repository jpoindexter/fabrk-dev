# Playwright E2E Testing - Quick Start Guide

## 5-Minute Setup

### 1. Installation (Already Done)
```bash
npm install --save-dev @playwright/test  # ✓ Complete
npx playwright install                   # ✓ Complete
```

### 2. Run Your First Test
```bash
# Start dev server in one terminal
npm run dev

# In another terminal, run tests
npm run test:e2e
```

### 3. See Tests Running
```bash
npm run test:e2e:headed
```
This opens browser windows so you can watch tests execute.

## Common Commands

| Command | What It Does |
|---------|-------------|
| `npm run test:e2e` | Run all E2E tests (headless) |
| `npm run test:e2e:ui` | Interactive UI with test browser |
| `npm run test:e2e:headed` | See browser windows during test |
| `npm run test:e2e:debug` | Step-by-step debugging mode |
| `npm run test:all` | Run unit tests + E2E tests |

## Test Files

```
tests/e2e/
├── landing.spec.ts      # Landing page tests (11 tests)
├── auth.spec.ts         # Authentication tests (13 tests)
├── navigation.spec.ts   # Navigation tests (11 tests)
├── helpers.ts           # Shared utilities & fixtures
├── README.md            # Detailed documentation
└── QUICK-START.md       # This file
```

## What's Tested

### Landing Page (`landing.spec.ts`)
- ✓ Page loads with correct title
- ✓ Hero section displays
- ✓ CTA buttons work
- ✓ Navigation is responsive
- ✓ Images load without errors
- ✓ Accessibility checks

### Authentication (`auth.spec.ts`)
- ✓ Registration flow
- ✓ Login flow
- ✓ Form validation
- ✓ Password reset
- ✓ Session management

### Navigation (`navigation.spec.ts`)
- ✓ All links work
- ✓ Page transitions smooth
- ✓ Mobile nav responsive
- ✓ Back button works
- ✓ Accessibility compliant

## First Time Running Tests

### Step 1: Start Dev Server
```bash
npm run dev
```
Wait for `ready - started server on 0.0.0.0:3000`

### Step 2: Run Tests in UI Mode (Recommended for First Time)
```bash
npm run test:e2e:ui
```

This opens an interactive UI where you can:
- Run individual tests
- Watch them execute
- See detailed failure info
- Inspect test traces

### Step 3: View Test Report
```bash
npx playwright show-report
```
Opens HTML report of latest test run.

## Writing Your Own Tests

### Simple Test Template
```typescript
import { test, expect } from '@playwright/test';

test('should display user welcome message', async ({ page }) => {
  await page.goto('/dashboard');
  
  const welcome = page.locator('h1:has-text("Welcome")');
  await expect(welcome).toBeVisible();
});
```

### Using Helpers
```typescript
import { test, expect } from '@playwright/test';
import { TestHelpers, testData } from './helpers';

test('should fill form and submit', async ({ page }) => {
  await page.goto('/form');
  
  // Use helper to fill input
  await TestHelpers.fillInput(page, 'input[type="email"]', testData.validEmail);
  
  // Click with retry (more robust)
  await TestHelpers.clickWithRetry(page, 'button[type="submit"]');
  
  // Verify success
  await TestHelpers.expectElementVisible(page, '.success-message');
});
```

## Troubleshooting

### Tests Can't Connect to App
```bash
# Make sure dev server is running
npm run dev

# In another terminal
npm run test:e2e
```

### Tests Run But Fail
```bash
# Run with headed browser to see what's happening
npm run test:e2e:headed

# Or use debug mode
npm run test:e2e:debug
```

### Want to See Detailed Reports
```bash
# After tests run
npx playwright show-report
```

## Best Practices

1. **Always wait for elements to be visible:**
   ```typescript
   await page.locator('button').first().waitFor({ state: 'visible' });
   ```

2. **Use data-testid for reliable selection:**
   ```html
   <button data-testid="submit-btn">Submit</button>
   ```
   ```typescript
   await page.locator('[data-testid="submit-btn"]').click();
   ```

3. **Keep tests independent:**
   ```typescript
   // Each test should setup its own state
   test.beforeEach(async ({ page }) => {
     await page.goto('/');
   });
   ```

4. **Use meaningful names:**
   ```typescript
   // Bad
   test('test 1', async ({ page }) => { ... });
   
   // Good
   test('should show error when email is invalid', async ({ page }) => { ... });
   ```

5. **Avoid hard-coded waits:**
   ```typescript
   // Bad
   await page.waitForTimeout(2000);
   
   // Good
   await page.locator('.modal').waitFor({ state: 'visible' });
   ```

## Configuration

Tests use `playwright.config.ts` at project root:
- Base URL: `http://localhost:3000`
- Browsers: Chromium, Firefox, WebKit
- Screenshots on failure: `test-results/`
- Videos on failure: `test-results/`
- Report: `playwright-report/`

## Next Steps

1. Read full docs: [tests/e2e/README.md](./README.md)
2. Add tests for your features
3. Run tests in CI/CD pipeline
4. Integrate with GitHub Actions

## Getting Help

- Playwright Docs: https://playwright.dev
- Debugging Guide: https://playwright.dev/docs/debug
- Best Practices: https://playwright.dev/docs/best-practices
- API Reference: https://playwright.dev/docs/api/class-test

## Summary

You now have:
- ✓ Playwright installed with 5 browsers
- ✓ 35 pre-written tests covering critical flows
- ✓ Test utilities for easy test writing
- ✓ 4 npm commands to run tests
- ✓ Full debugging capabilities

Start with: `npm run dev` then `npm run test:e2e:ui`
