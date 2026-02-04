---
title: 'Testing with Vitest and Playwright: Ship with Confidence'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'testing-vitest-playwright'
description: 'Fabrk includes Vitest for unit tests and Playwright for end-to-end testing. Test your SaaS thoroughly before shipping.'
publishedAt: '2026-01-17T10:00:00.000Z'
---

**Test early. Test often. Ship confidently.**

---

## Testing Stack

Fabrk includes:

- **Vitest** - Fast unit and integration tests
- **Playwright** - Cross-browser E2E tests
- **Testing Library** - React component tests

---

## Running Tests

```bash
# Unit tests
npm test

# Unit tests in watch mode
npm run test:watch

# End-to-end tests
npm run test:e2e

# E2E with UI
npm run test:e2e:ui

# All tests
npm run test:all
```

---

## Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
```

---

## Unit Testing

Test utility functions:

```typescript
// lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency, truncate } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1000)).toBe('$10.00');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('returns short strings unchanged', () => {
    expect(truncate('Hi', 5)).toBe('Hi');
  });
});
```

---

## Component Testing

Test React components:

```typescript
// components/ui/button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>> CLICK</Button>);
    expect(screen.getByText('> CLICK')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## API Route Testing

Test API endpoints:

```typescript
// app/api/users/route.test.ts
import { describe, it, expect, vi } from 'vitest';
import { GET, POST } from './route';

// Mock auth
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(() => ({ user: { id: '1', role: 'admin' } })),
}));

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: vi.fn(() => [{ id: '1', name: 'Test' }]),
      create: vi.fn((data) => ({ id: '2', ...data.data })),
    },
  },
}));

describe('GET /api/users', () => {
  it('returns users', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.users).toHaveLength(1);
  });
});

describe('POST /api/users', () => {
  it('creates a user', async () => {
    const request = new Request('http://test/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: 'New User', email: 'new@test.com' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.user.name).toBe('New User');
  });
});
```

---

## Mocking

Mock external dependencies:

```typescript
// Mock fetch
vi.mock('global', () => ({
  fetch: vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: 'mocked' }),
    })
  ),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/dashboard',
}));

// Mock environment
vi.stubEnv('DATABASE_URL', 'postgresql://test');
```

---

## Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## E2E Tests

Test complete user flows:

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can sign up', async ({ page }) => {
    await page.goto('/register');

    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'securepassword');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('user can sign in', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'existing@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });
});
```

---

## Page Object Pattern

Organize E2E tests with page objects:

```typescript
// e2e/pages/dashboard.ts
import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly statsCards: Locator;
  readonly userMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.statsCards = page.locator('[data-testid="stats-card"]');
    this.userMenu = page.locator('[data-testid="user-menu"]');
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  async getStatValue(name: string) {
    return this.page
      .locator(`[data-testid="stat-${name}"]`)
      .textContent();
  }

  async openUserMenu() {
    await this.userMenu.click();
  }

  async signOut() {
    await this.openUserMenu();
    await this.page.click('text=Sign Out');
  }
}

// Usage
test('dashboard shows stats', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();

  const revenue = await dashboard.getStatValue('revenue');
  expect(revenue).toBeTruthy();
});
```

---

## Accessibility Testing

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test('dashboard is accessible', async ({ page }) => {
  await page.goto('/dashboard');

  const results = await new AxeBuilder({ page })
    .include('[role="main"]')
    .analyze();

  expect(results.violations).toEqual([]);
});
```

---

## Test Commands

```bash
# Run specific test file
npm test -- utils.test.ts

# Run tests matching pattern
npm test -- --grep "button"

# Run with coverage
npm test -- --coverage

# Update snapshots
npm test -- -u

# E2E specific browser
npm run test:e2e -- --project=chromium
```

---

## CI Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test -- --coverage

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
```

---

## Best Practices

1. **Test behavior, not implementation** - What it does, not how
2. **Use meaningful assertions** - Clear failure messages
3. **Isolate tests** - No shared state
4. **Mock external services** - Deterministic results
5. **Run in CI** - Every PR, every push

Ship with confidence.

