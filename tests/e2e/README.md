# End-to-End Testing with Playwright

This directory contains comprehensive E2E tests for the Fabrk boilerplate using Playwright.

## Overview

The E2E test suite validates critical user flows across the application:

- **Landing Page Tests** (`landing.spec.ts`) - Hero section, CTA buttons, feature displays
- **Authentication Tests** (`auth.spec.ts`) - Registration, login, password reset flows
- **Navigation Tests** (`navigation.spec.ts`) - Site navigation, page accessibility
- **Helper Utilities** (`helpers.ts`) - Reusable test utilities and fixtures

## Setup

### Installation

Playwright is already installed. If you need to reinstall browsers:

```bash
npx playwright install chromium firefox webkit
```

### Configuration

Playwright configuration is in `playwright.config.ts` at the project root:

- **Base URL:** `http://localhost:3000`
- **Test Directory:** `tests/e2e/`
- **Browsers:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Screenshots:** Captured on test failure
- **Videos:** Recorded on failure for debugging
- **Reports:** HTML report in `playwright-report/`

## Running Tests

### Run All E2E Tests
```bash
npm run test:e2e
```

### Run Tests in UI Mode (Interactive)
```bash
npm run test:e2e:ui
```
This opens an interactive UI where you can run tests, view traces, and debug failures.

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:e2e:headed
```
Browser windows open so you can watch tests execute.

### Run Tests in Debug Mode
```bash
npm run test:e2e:debug
```
Launches Playwright Inspector for step-by-step debugging.

### Run Specific Test File
```bash
npx playwright test tests/e2e/landing.spec.ts
```

### Run Tests Matching Pattern
```bash
npx playwright test -g "should load landing page"
```

### Run Tests for Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run All Tests (Unit + E2E)
```bash
npm run test:all
```

## Test Structure

### Landing Page Tests (`landing.spec.ts`)
- Page loads successfully with correct title
- Hero section displays with heading
- Description text is visible
- CTA buttons are functional and enabled
- Multiple CTA buttons exist
- Navigation to features page works
- Features section displays
- Pricing section exists
- Navigation header is responsive
- Images load without errors
- Accessibility: alt text on images

### Authentication Tests (`auth.spec.ts`)
- **Registration:**
  - Form displays email, password, submit button
  - Invalid email shows validation error
  - Weak password validation
  - Form submission handling

- **Login:**
  - Login form displays correctly
  - Non-existent user shows error
  - Invalid password shows error
  - Successful login flow

- **Password Reset:**
  - Forgot password link visible
  - Password reset form displays
  - Token validation flow

- **Session Management:**
  - Session tokens persist
  - User authentication maintained

### Navigation Tests (`navigation.spec.ts`)
- Header/navigation is visible
- Links navigate to correct pages:
  - Features page
  - Components showcase
  - Templates gallery
  - Contact page
  - About page
  - Privacy policy
  - Terms of service
- Logo link returns to home
- Navigation consistent across pages
- Mobile navigation responsive
- Navigation accessible

## Test Helpers

The `helpers.ts` file provides utility functions for common test operations:

```typescript
import { TestHelpers, testData } from './helpers';

// Wait for page to be fully loaded
await TestHelpers.waitForPageReady(page);

// Fill input with text
await TestHelpers.fillInput(page, 'input[type="email"]', 'test@example.com');

// Type text slowly (useful for form interactions)
await TestHelpers.typeText(page, 'input[name="username"]', 'myuser', 100);

// Click with retry logic
await TestHelpers.clickWithRetry(page, 'button[type="submit"]');

// Verify element is visible
await TestHelpers.expectElementVisible(page, 'h1.hero-heading');

// Check if element is in viewport
const isVisible = await TestHelpers.isInViewport(page, '.feature-section');

// Get table data as array of objects
const tableData = await TestHelpers.getTableData(page, 'table.users');

// Capture network requests
const requests = await TestHelpers.captureNetworkRequest(
  page,
  /api\/auth/,
  async () => {
    await page.click('button[type="submit"]');
  }
);

// Switch theme
await TestHelpers.switchTheme(page, 'dark');

// Get page content as text
const content = await TestHelpers.getPageContent(page);

// Take debug screenshot
await TestHelpers.takeDebugScreenshot(page, 'form-error');

// Capture console logs
const logs = await TestHelpers.captureConsoleLogs(page, async () => {
  await page.click('button');
});

// Check for JavaScript errors
const errors = await TestHelpers.checkForErrors(page);
```

## Test Data

Use the `testData` export for consistent test data:

```typescript
import { testData } from './helpers';

const email = testData.validEmail;        // 'test@example.com'
const password = testData.validPassword;  // 'TestPassword123!@#'
const weakPass = testData.weakPassword;   // 'weak'
const strongPass = testData.strongPassword; // 'SecurePassword123!@#'
```

## Writing New Tests

### Template
```typescript
import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup
    await page.goto('/');
    await TestHelpers.waitForPageReady(page);
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('selector');

    // Act
    await element.click();

    // Assert
    await expect(element).toHaveAttribute('disabled');
  });
});
```

### Best Practices

1. **Use data-testid attributes** for reliable element selection:
   ```html
   <button data-testid="submit-button">Submit</button>
   ```
   ```typescript
   await page.locator('[data-testid="submit-button"]').click();
   ```

2. **Wait for elements before interaction:**
   ```typescript
   await page.locator('button').first().waitFor({ state: 'visible' });
   ```

3. **Use meaningful test names:**
   ```typescript
   test('should show validation error when email is invalid');
   test('should navigate to dashboard after successful login');
   ```

4. **Keep tests independent:**
   - No shared state between tests
   - Use `test.beforeEach` for setup
   - Clean up after tests with `test.afterEach`

5. **Avoid fixed timeouts:**
   ```typescript
   // Bad
   await page.waitForTimeout(2000);

   // Good
   await page.locator('modal').waitFor({ state: 'visible' });
   ```

6. **Test user behavior, not implementation:**
   ```typescript
   // Bad
   expect(component.state.loading).toBe(false);

   // Good
   await expect(page.locator('h1')).toBeVisible();
   ```

## Debugging

### View Test Report
```bash
npx playwright show-report
```

### Debug Specific Test
```bash
npx playwright test tests/e2e/landing.spec.ts --debug
```

### Capture Screenshots
Screenshots are automatically captured on failure in `test-results/`.

### Capture Videos
Videos are automatically recorded on failure in `test-results/`.

### View Trace Files
Traces record network, console, and DOM snapshots:
```bash
npx playwright show-trace test-results/trace.zip
```

## CI/CD Integration

For CI environments (GitHub Actions, etc.):

1. Install browsers: `npx playwright install --with-deps`
2. Run tests: `npm run test:e2e`
3. Upload artifacts: `test-results/` and `playwright-report/`

Example GitHub Actions workflow:
```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npm run test:e2e

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
```

## Performance Considerations

- Tests run in parallel by default for faster execution
- Use `test.describe.serial()` if tests must run sequentially
- Reuse browser context to speed up tests
- Set `reuseExistingServer: true` to avoid restarting dev server

## Troubleshooting

### Tests Timeout
- Increase `navigationTimeout` in playwright.config.ts
- Check if dev server is running: `npm run dev`
- Verify network connectivity

### Element Not Found
- Use `test:e2e:headed` to see what's happening
- Check selector with browser DevTools
- Verify page actually loaded with correct URL

### Flaky Tests
- Add `test.slow()` to give test more time
- Use proper wait conditions instead of timeouts
- Ensure elements are in viewport before interaction

### Dev Server Issues
- Kill existing processes: `lsof -ti:3000 | xargs kill -9`
- Ensure port 3000 is available
- Check `.env.local` is configured correctly

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Test Isolation](https://playwright.dev/docs/test-isolation)
- [Debugging Guide](https://playwright.dev/docs/debug)
