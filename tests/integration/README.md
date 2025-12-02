# API Integration Tests

This directory contains integration tests for the key API routes in the Fabrk boilerplate.

## Test File

### `/tests/integration/api.test.ts`

Comprehensive integration tests covering:

#### Contact API (`/api/contact`)
- ✅ Valid contact form submissions
- ✅ Email validation
- ✅ Required field validation
- ✅ Message length validation
- ✅ Email sending error handling
- ✅ All subject types (sales, support, billing, feature, bug, partnership, other)

#### Polar API (`/api/polar`)
- ✅ Checkout session creation (configured)
- ✅ Mock checkout fallback (unconfigured)
- ✅ Error handling

#### Polar Webhooks (`/api/webhooks/polar`)
- ✅ Signature validation (missing/invalid)
- ✅ `order.paid` event processing
  - User upsert
  - Payment record creation
  - Welcome email queueing
  - License key generation
- ✅ `order.refunded` event processing
  - Access revocation
  - Payment status update
- ✅ Unhandled event types

#### Stripe Webhooks (`/api/stripe/webhook`)
- Note: Stripe webhook tests are placeholder tests due to mocking complexity
- The Stripe client is instantiated inside the route handler, making it difficult to mock
- These endpoints should be tested with E2E tests (Playwright) or by refactoring the route to accept a Stripe instance

#### Security & Error Handling
- ✅ HTML/XSS sanitization in contact forms
- ✅ Message length limits enforcement

## Running Tests

```bash
# Run all integration tests
npm test -- tests/integration/

# Run specific test file
npm test -- tests/integration/api.test.ts

# Run with coverage
npm test -- --coverage tests/integration/
```

## Test Coverage

Current coverage: **19 passing tests**

- Contact API: 6 tests
- Polar Checkout: 3 tests
- Polar Webhooks: 5 tests
- Stripe Webhooks: 3 tests (placeholders)
- Security: 2 tests

## Mocking Strategy

The tests use Vitest mocks for:
- `@/lib/email` - Email sending
- `@/lib/logger` - Logging
- `@/lib/prisma` - Database operations
- `@/lib/polar` - Polar.sh API
- `@/lib/license` - License key generation
- `@/lib/tokens` - Token generation
- `@/lib/stripe/idempotency` - Webhook idempotency
- `next/headers` - Next.js headers
- Stripe webhook handlers

## Known Limitations

### Stripe Webhook Testing

The Stripe webhook endpoint (`/api/stripe/webhook`) is difficult to test with unit/integration tests because:

1. The Stripe client is instantiated inside the route handler
2. Mock hoisting makes it challenging to override the constructor behavior
3. The route uses dynamic imports for handlers

**Recommended approaches:**

1. **E2E Testing** (Recommended): Use Playwright to test webhook endpoints with real HTTP requests
2. **Refactoring**: Extract Stripe client creation to a factory function that can be mocked
3. **Stripe CLI Testing**: Use `stripe listen --forward-to` for local testing

Example refactor:
```typescript
// lib/stripe/client.ts
export function createStripeClient() {
  return new Stripe(env.server.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-10-29.clover",
  });
}

// In route handler
const stripe = createStripeClient(); // Can be mocked
```

## Adding New Tests

When adding new API routes, follow this pattern:

```typescript
describe("New API Route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle valid request", async () => {
    // Mock dependencies
    const { dependency } = await import("@/lib/dependency");
    (dependency as any).mockResolvedValue({ success: true });

    // Create request
    const req = new NextRequest("http://localhost:3000/api/new-route", {
      method: "POST",
      body: JSON.stringify({ data: "test" }),
    });

    // Call handler
    const response = await POST(req);
    const json = await response.json();

    // Assertions
    expect(response.status).toBe(200);
    expect(json).toEqual({ success: true });
  });
});
```

## Testing Best Practices

1. **Always clear mocks** in `beforeEach()`
2. **Test happy path first**, then error cases
3. **Use descriptive test names** that explain what's being tested
4. **Mock external dependencies** (email, database, payment providers)
5. **Test validation** for all input fields
6. **Test error handling** for all failure scenarios
7. **Keep tests isolated** - each test should be independent

## Related Documentation

- [Vitest Configuration](/vitest.config.ts)
- [Test Setup](/src/test/setup.ts)
- [Test Utilities](/src/test/test-utils.tsx)
- [E2E Tests](/tests/e2e/)
- [Unit Tests](/tests/unit/)
