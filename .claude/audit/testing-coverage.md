# Testing Coverage Audit

Requirements for unit, integration, and accessibility testing.

---

## Quick Reference

| Category | Min Coverage | Severity |
|----------|--------------|----------|
| Utility functions | 80% | HIGH |
| UI Components | 60% | HIGH |
| Hooks | 70% | HIGH |
| API routes | 70% | CRITICAL |
| Critical paths | 100% | CRITICAL |

---

## Coverage Thresholds

### By File Type

| Type | Statements | Branches | Functions | Lines |
|------|------------|----------|-----------|-------|
| `/lib/utils/` | 80% | 70% | 80% | 80% |
| `/components/ui/` | 60% | 50% | 60% | 60% |
| `/hooks/` | 70% | 60% | 70% | 70% |
| `/app/api/` | 70% | 60% | 70% | 70% |

### vitest.config.ts

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      thresholds: {
        global: {
          statements: 60,
          branches: 50,
          functions: 60,
          lines: 60,
        },
        "src/lib/utils/**": {
          statements: 80,
          branches: 70,
          functions: 80,
          lines: 80,
        },
      },
    },
  },
});
```

---

## Critical Path Testing

### Must Have 100% Coverage

| Path | What to Test |
|------|--------------|
| Authentication | Login, logout, session, protected routes |
| Payment | Checkout, webhooks, subscription changes |
| Data deletion | Account deletion, data export |
| Password reset | Token generation, validation, update |
| Email verification | Token, resend, expiry |

### Auth Testing Example

```typescript
describe("Authentication", () => {
  it("should login with valid credentials", async () => {
    const result = await signIn("credentials", {
      email: "test@example.com",
      password: "password123",
      redirect: false,
    });
    expect(result?.error).toBeUndefined();
  });

  it("should reject invalid credentials", async () => {
    const result = await signIn("credentials", {
      email: "test@example.com",
      password: "wrong",
      redirect: false,
    });
    expect(result?.error).toBe("CredentialsSignin");
  });

  it("should protect routes when unauthenticated", async () => {
    const response = await fetch("/api/protected");
    expect(response.status).toBe(401);
  });
});
```

---

## Component Testing

### What Every Component Test Should Cover

```typescript
describe("Button", () => {
  // 1. Renders correctly
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  // 2. Handles events
  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // 3. Respects disabled state
  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} disabled>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  // 4. Has correct accessibility
  it("has accessible name", () => {
    render(<Button aria-label="Submit form">Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit form" })).toBeInTheDocument();
  });

  // 5. Shows loading state
  it("shows loading indicator", () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });
});
```

---

## Accessibility Testing

### Automated Tests

```typescript
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("Accessibility", () => {
  it("should have no violations on Button", async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have no violations on Form", async () => {
    const { container } = render(
      <Form>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus is visible on all focusable elements
- [ ] Tab order is logical
- [ ] Screen reader announces all content correctly
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 large)
- [ ] No content relies solely on color
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Error messages are announced

---

## Edge Case Testing

### Every Component Should Test

```typescript
describe("UserList", () => {
  // Empty state
  it("shows empty message when no users", () => {
    render(<UserList users={[]} />);
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  // Loading state
  it("shows skeleton when loading", () => {
    render(<UserList users={[]} isLoading />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  // Error state
  it("shows error message on error", () => {
    render(<UserList users={[]} error="Failed to load" />);
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  // Single item
  it("renders single user", () => {
    render(<UserList users={[{ id: 1, name: "John" }]} />);
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  // Many items
  it("renders many users", () => {
    const users = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
    }));
    render(<UserList users={users} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(100);
  });
});
```

---

## API Route Testing

```typescript
import { testApiHandler } from "next-test-api-route-handler";
import handler from "@/app/api/users/route";

describe("GET /api/users", () => {
  it("returns users when authenticated", async () => {
    await testApiHandler({
      appHandler: handler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
          headers: { Authorization: "Bearer valid-token" },
        });
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
      },
    });
  });

  it("returns 401 when unauthenticated", async () => {
    await testApiHandler({
      appHandler: handler,
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });
        expect(response.status).toBe(401);
      },
    });
  });
});
```

---

## Detection Commands

```bash
# Run tests with coverage
npm run test:coverage

# Check coverage thresholds
npm run test -- --coverage --coverageReporters=text-summary

# Find untested files
npm run test -- --coverage --collectCoverageFrom='src/**/*.tsx' | grep "0%"

# Run accessibility tests
npm run test:a11y
```

---

## Checklist

### Before Release:

- [ ] All critical paths have 100% coverage
- [ ] Overall coverage > 60%
- [ ] No accessibility violations (axe)
- [ ] All edge cases tested (empty, loading, error)
- [ ] API routes return correct status codes
- [ ] Authentication tests pass

### Every PR:

- [ ] New code has tests
- [ ] Tests pass
- [ ] Coverage not decreased
- [ ] No new accessibility violations

---

## Common Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| No edge case tests | Bugs in production | Test empty/loading/error |
| Missing a11y tests | Accessibility issues | Add jest-axe |
| Untested API routes | Security risks | Add API tests |
| Low coverage | Regression bugs | Add tests before fix |
