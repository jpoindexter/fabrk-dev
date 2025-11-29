import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Testing Guide - Fabrk Docs",
  description: "Test your Fabrk app with Vitest and Playwright. 130+ tests included for unit, E2E, and accessibility testing.",
};

export default function TestingGuidePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-2 py-1">
          <span className="font-mono text-[10px] text-muted-foreground">[ [0xB0] EXTRAS ] TESTING</span>
        </div>
        <h1 className="font-mono text-xl font-bold tracking-tight">TESTING_GUIDE</h1>
        <p className="font-mono text-xs text-muted-foreground">
          &gt; Comprehensive testing with Vitest for unit tests and Playwright for E2E tests.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-4">
          <h3 className="mb-2 font-mono text-xs font-semibold">TEST_COVERAGE</h3>
          <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
            <div>├─ 130+ total tests</div>
            <div>├─ Unit tests with Vitest</div>
            <div>├─ E2E tests with Playwright</div>
            <div>├─ Accessibility tests with axe-core</div>
            <div>└─ Visual tests with Storybook</div>
          </div>
        </CardContent>
      </Card>

      {/* Running Tests */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">RUNNING_TESTS</h2>
        <p className="font-mono text-xs text-muted-foreground">Available test commands:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Unit tests (Vitest)
npm test                 # Run all unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open Vitest UI

# E2E tests (Playwright)
npm run test:e2e         # Run all E2E tests
npm run test:e2e:ui      # Open Playwright UI
npm run test:e2e:headed  # Run with visible browser

# Accessibility tests
npm run test:a11y        # Run accessibility tests

# All tests
npm run test:all         # Run Vitest + Playwright`} />
        </div>
      </div>

      {/* Vitest Configuration */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">VITEST_CONFIGURATION</h2>
        <p className="font-mono text-xs text-muted-foreground">
          Configuration in <code className="bg-muted px-1 font-mono text-[10px]">vitest.config.ts</code>:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// vitest.config.ts

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.d.ts",
        "**/*.config.*",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});`} />
        </div>
      </div>

      {/* Writing Unit Tests */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">WRITING_UNIT_TESTS</h2>
        <p className="font-mono text-xs text-muted-foreground">
          Test components, hooks, and utilities:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`// tests/unit/components/button.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });
});`} />
        </div>
      </div>

      {/* Testing Hooks */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">TESTING_CUSTOM_HOOKS</h2>
        <p className="font-mono text-xs text-muted-foreground">Example hook test with timer mocking:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// tests/unit/hooks/use-debounce.test.ts

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "@/hooks/use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("debounces value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    // Change value
    rerender({ value: "updated", delay: 500 });

    // Should still be initial
    expect(result.current).toBe("initial");

    // Fast-forward timers
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now should be updated
    expect(result.current).toBe("updated");
  });
});`} />
        </div>
      </div>

      {/* Testing API Routes */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">TESTING_API_ROUTES</h2>
        <p className="font-mono text-xs text-muted-foreground">Test API endpoints with mocked dependencies:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// tests/unit/api/users.test.ts

import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/users/route";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

// Mock Prisma
vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe("POST /api/users", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a new user", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
    };

    (prisma.user.create as any).mockResolvedValue(mockUser);

    const request = new NextRequest("http://localhost/api/users", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        name: "Test User",
        password: "password123",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.email).toBe("test@example.com");
  });

  it("returns 400 for invalid email", async () => {
    const request = new NextRequest("http://localhost/api/users", {
      method: "POST",
      body: JSON.stringify({
        email: "invalid-email",
        name: "Test User",
        password: "password123",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });
});`} />
        </div>
      </div>

      {/* Playwright E2E Tests */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">PLAYWRIGHT_E2E_TESTS</h2>
        <p className="font-mono text-xs text-muted-foreground">
          Test complete user flows:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// tests/e2e/auth.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("user can sign up", async ({ page }) => {
    await page.goto("/signup");

    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "SecurePass123!");
    await page.fill('input[name="name"]', "Test User");

    await page.click('button[type="submit"]');

    // Should redirect to dashboard or verification page
    await expect(page).toHaveURL(/dashboard|verify/);
  });

  test("user can sign in", async ({ page }) => {
    await page.goto("/signin");

    await page.fill('input[name="email"]', "existing@example.com");
    await page.fill('input[name="password"]', "password123");

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/dashboard");
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("shows error for invalid credentials", async ({ page }) => {
    await page.goto("/signin");

    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "wrongpassword");

    await page.click('button[type="submit"]');

    await expect(page.locator(".text-destructive")).toBeVisible();
  });
});`} />
        </div>
      </div>

      {/* Playwright Configuration */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">PLAYWRIGHT_CONFIGURATION</h2>
        <p className="font-mono text-xs text-muted-foreground">Configure Playwright for E2E testing:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// playwright.config.ts

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});`} />
        </div>
      </div>

      {/* Accessibility Testing */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">ACCESSIBILITY_TESTING</h2>
        <p className="font-mono text-xs text-muted-foreground">Test for accessibility violations:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// tests/accessibility/home.spec.ts

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility", () => {
  test("home page has no a11y violations", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });

  test("dashboard has no a11y violations", async ({ page }) => {
    // Login first
    await page.goto("/signin");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await page.waitForURL("/dashboard");

    const results = await new AxeBuilder({ page })
      .exclude(".third-party-widget") // Exclude known issues
      .analyze();

    expect(results.violations).toEqual([]);
  });
});`} />
        </div>
      </div>

      {/* Test Setup */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">TEST_SETUP_FILE</h2>
        <p className="font-mono text-xs text-muted-foreground">Configure test environment and mocks:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// tests/setup.ts

import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      },
    },
    status: "authenticated",
  }),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
process.env.NEXTAUTH_SECRET = "test-secret-at-least-32-characters";`} />
        </div>
      </div>

      {/* Testing Best Practices */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">TESTING_BEST_PRACTICES</h2>
        <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
          <div>├─ <strong>Test behavior, not implementation</strong> - Focus on what the user sees/does</div>
          <div>├─ <strong>Use data-testid sparingly</strong> - Prefer semantic queries (role, label)</div>
          <div>├─ <strong>Mock external services</strong> - Don't hit real APIs in unit tests</div>
          <div>├─ <strong>Keep tests isolated</strong> - Each test should be independent</div>
          <div>├─ <strong>Use meaningful assertions</strong> - Test what matters, not everything</div>
          <div>└─ <strong>Write tests that fail first</strong> - TDD when appropriate</div>
        </div>
      </div>

      {/* CI Integration */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">CI_INTEGRATION</h2>
        <p className="font-mono text-xs text-muted-foreground">GitHub Actions workflow for automated testing:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="yaml" code={`# .github/workflows/test.yml

name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: |
            coverage/
            playwright-report/`} />
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-3">
        <h2 className="font-mono text-sm font-semibold">NEXT_STEPS</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/docs/deployment/vercel">
            <Card className="rounded-none h-full transition-all hover:border-primary/50">
              <CardContent className="p-3">
                <h3 className="font-mono text-xs font-semibold">DEPLOY_TO_VERCEL</h3>
                <p className="font-mono text-[10px] text-muted-foreground">
                  Deploy your tested app to production
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/validation">
            <Card className="rounded-none h-full transition-all hover:border-primary/50">
              <CardContent className="p-3">
                <h3 className="font-mono text-xs font-semibold">SCHEMA_VALIDATION</h3>
                <p className="font-mono text-[10px] text-muted-foreground">
                  Validate inputs for better tests
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
