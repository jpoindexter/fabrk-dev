# Testing Guide

This guide covers testing strategies and tools for the Fabrk boilerplate.

## Table of Contents

- [Overview](#overview)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Testing MCP Server](#testing-mcp-server)
- [CI/CD Integration](#cicd-integration)

---

## Overview

The Fabrk boilerplate includes a comprehensive testing setup:

- **Unit Tests**: Test individual components and functions (Vitest + React Testing Library)
- **E2E Tests**: Test complete user flows (Playwright)
- **Accessibility Tests**: Automated a11y testing (axe-playwright)
- **Coverage Reports**: Track test coverage with Vitest

---

## Test Types

### Unit Tests

Located in `tests/unit/`, these test individual components and utilities.

**Technologies:**
- Vitest - Fast unit test framework
- React Testing Library - Component testing utilities
- @testing-library/jest-dom - Custom matchers

**Example:**
```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

### E2E Tests

Located in `tests/e2e/`, these test complete user journeys.

**Technologies:**
- Playwright - Browser automation
- Multiple browsers (Chromium, Firefox, WebKit)
- Mobile device emulation

**Example:**
```typescript
import { test, expect } from "@playwright/test";

test("landing page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Fabrk/i);
});
```

---

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Watch mode (default)
npm run test -- --watch
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run specific test file
npm run test:e2e -- tests/e2e/landing-page.spec.ts

# Run in specific browser
npm run test:e2e -- --project=chromium
```

### All Tests

```bash
# Run unit tests first, then E2E
npm run test && npm run test:e2e
```

---

## Writing Tests

### Unit Test Best Practices

1. **Test user behavior, not implementation**
   ```typescript
   // Good
   expect(screen.getByRole("button")).toBeInTheDocument();

   // Bad
   expect(button.props.className).toContain("bg-blue-500");
   ```

2. **Use accessible queries**
   ```typescript
   // Good - Accessible
   screen.getByRole("button", { name: /submit/i })
   screen.getByLabelText(/email address/i)

   // Bad - Brittle
   screen.getByClassName("submit-button")
   ```

3. **Test loading and error states**
   ```typescript
   it("shows loading state", () => {
     render(<Button loading>Submit</Button>);
     expect(screen.getByRole("button")).toBeDisabled();
     expect(screen.getByText(/loading/i)).toBeInTheDocument();
   });
   ```

### E2E Test Best Practices

1. **Test critical user journeys**
   - Landing page loads
   - Authentication flow
   - Purchase flow
   - Key feature interactions

2. **Use page object pattern for complex flows**
   ```typescript
   // tests/e2e/pages/LoginPage.ts
   export class LoginPage {
     constructor(private page: Page) {}

     async login(email: string, password: string) {
       await this.page.fill('[name="email"]', email);
       await this.page.fill('[name="password"]', password);
       await this.page.click('button[type="submit"]');
     }
   }
   ```

3. **Wait for elements properly**
   ```typescript
   // Good
   await expect(page.locator(".success-message")).toBeVisible();

   // Bad
   await page.waitForTimeout(1000); // Flaky!
   ```

### Accessibility Testing

Include accessibility checks in your E2E tests:

```typescript
import { test } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test("landing page is accessible", async ({ page }) => {
  await page.goto("/");
  await injectAxe(page);
  await checkA11y(page);
});
```

---

## Testing MCP Server

The Testing MCP Server provides tools for Claude Code to run tests:

### Available Tools

- `runTests` - Run unit tests with Vitest
- `runE2eTests` - Run E2E tests with Playwright
- `getTestResults` - Get latest test results
- `getCoverage` - Get coverage reports

### Usage with Claude Code

Once the Testing MCP Server is installed (see [MCP-SERVERS.md](./MCP-SERVERS.md)), you can ask Claude Code to run tests:

```
"Run the unit tests"
"Run E2E tests for the landing page"
"Show me the test coverage"
"Run all tests and show results"
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:coverage

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Test Configuration Files

### vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### playwright.config.ts

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Troubleshooting

### Tests fail with "Cannot find module '@/...'"

**Fix:** Ensure `vitest.config.ts` has the correct path alias:
```typescript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
```

### Playwright tests timeout

**Fix:** Increase timeout in `playwright.config.ts`:
```typescript
use: {
  baseURL: "http://localhost:3000",
  timeout: 30000, // 30 seconds
},
```

### Coverage reports are empty

**Fix:** Run tests with coverage flag:
```bash
npm run test:coverage
```

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated:** 2025-10-30
