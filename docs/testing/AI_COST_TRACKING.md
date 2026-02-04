# Testing AI Cost Tracking

Complete guide to testing the AI cost tracking system and Neon PostgreSQL integration.

---

## Overview

The AI cost tracking system consists of:

1. **Neon Integration Layer** (`src/lib/ai/neon-integration.ts`)
   - Serverless PostgreSQL driver for high-performance queries
   - Falls back to Prisma if Neon not configured
   - Functions: `getNeonClient()`, `insertCostEvent()`, `getCostSummary()`, `getCostsByFeature()`

2. **Prisma Database Model** (`prisma/schema.prisma`)
   - `AICostEvent` model for storing API calls, costs, and metrics
   - Indexed for efficient queries by timestamp, feature, userId

3. **Cost API Endpoint** (`src/app/api/ai/costs/route.ts`)
   - GET endpoint that aggregates and analyzes cost data
   - Requires authentication (must be logged in)
   - Query params: `?days=7` (default 7 days)

4. **Admin Dashboard** (`src/app/(platform)/admin/ai-costs/page.tsx`)
   - Displays cost trends, feature breakdown, budget status
   - Charts: cost trend, daily requests, cost by feature, model usage
   - Accessible only to authenticated admin users

---

## Quick Start (3 Steps)

### Step 1: Test Neon Integration

```bash
npm run test:neon
```

This tests the Neon functions directly:
- ✅ Initializes Neon client (or falls back to Prisma)
- ✅ Inserts a test cost event
- ✅ Retrieves cost summary (7 days)
- ✅ Retrieves costs by feature

**Output example:**
```
🧪 Testing Neon Integration...

1️⃣ Testing getNeonClient()...
   ✅ Neon client initialized

2️⃣ Testing insertCostEvent()...
   ✅ Event inserted with ID: cuid123...

3️⃣ Testing getCostSummary()...
   ✅ Cost summary retrieved:
      Total cost: $0.0234
      Total tokens: 2300
      Requests: 1
      Success: 1/1
```

### Step 2: Seed Test Data

```bash
npm run seed:ai-costs
```

This creates 30 days of realistic cost data:
- Multiple features (form-generation, code-analysis, etc.)
- 3 Claude models with realistic pricing
- 95% success rate with simulated errors
- ~250 total cost events

**Output example:**
```
🌱 Seeding AI cost events...

✅ Seeding complete!
   📊 Inserted 250 cost events
   💰 Total cost: $3.4567
   ✓ Success rate: 95.0%

🔗 View dashboard: http://localhost:3000/(platform)/admin/ai-costs
```

### Step 3: View Dashboard

1. Start dev server: `npm run dev`
2. Create an account or login at http://localhost:3000/(auth)/signup
3. Navigate to: http://localhost:3000/(platform)/admin/ai-costs
4. Explore cost trends, features, models, and budget status

---

## Testing Scenarios

### Scenario A: Direct Function Testing

Test Neon integration functions with custom data:

```typescript
import {
  insertCostEvent,
  getCostSummary,
  getCostsByFeature,
} from '@/lib/ai/neon-integration';

// Insert custom event
await insertCostEvent({
  model: 'claude-opus-4-20250514',
  provider: 'anthropic',
  promptTokens: 2000,
  completionTokens: 1000,
  totalTokens: 3000,
  costUSD: 0.15,
  feature: 'custom-feature',
  success: true,
  durationMs: 2500,
  userId: 'user-123',
  metadata: { custom: 'data' },
});

// Get summary
const summary = await getCostSummary(7, 'user-123');
console.log(summary);
// { totalCost: 0.15, totalTokens: 3000, requestCount: 1, successCount: 1 }

// Get by feature
const features = await getCostsByFeature(7);
console.log(features);
// [{ feature: 'custom-feature', costUSD: 0.15, ... }]
```

### Scenario B: API Endpoint Testing

Test the cost API endpoint directly:

```bash
# Using curl (after logging in)
curl -H "Cookie: [your-session-cookie]" \
  http://localhost:3000/api/ai/costs?days=7

# Or use fetch in browser console after logging in
fetch('/api/ai/costs?days=7')
  .then(r => r.json())
  .then(console.log)
```

**Response structure:**
```json
{
  "today": {
    "cost": 0.5,
    "requests": 3,
    "successRate": 1.0,
    "avgDuration": 1200,
    "tokens": 4500
  },
  "period": {
    "cost": 3.45,
    "requests": 250,
    "successRate": 0.95,
    "avgDuration": 1300,
    "tokens": 750000,
    "days": 7,
    "label": "daily"
  },
  "trend": [
    { "date": "2026-01-01", "cost": 0.5, "requests": 30, "errors": 1 },
    ...
  ],
  "features": [
    { "feature": "form-generation", "costUSD": 1.2, "requests": 45, ... },
    ...
  ],
  "models": [
    { "model": "claude-sonnet-4-20250514", "cost": 2.0, "requests": 180, ... },
    ...
  ],
  "recentErrors": [
    { "id": "...", "feature": "...", "error": "Rate limit exceeded", ... }
  ],
  "budget": {
    "daily": 50,
    "used": 0.5,
    "remaining": 49.5,
    "percentUsed": 1.0
  }
}
```

### Scenario C: Error Injection

Test error handling by manually creating failed events:

```bash
# Run this in a Node script or browser console
const failed = await insertCostEvent({
  model: 'claude-opus-4-20250514',
  provider: 'anthropic',
  promptTokens: 1000,
  completionTokens: 0,
  totalTokens: 1000,
  costUSD: 0.01,
  feature: 'test-feature',
  success: false,
  durationMs: 500,
  errorMessage: 'Rate limit exceeded',
});
```

Then check the dashboard "RECENT ERRORS" section.

### Scenario D: Multi-User Tracking

Test per-user cost tracking:

```typescript
// Insert events for different users
await insertCostEvent({
  model: 'claude-sonnet-4-20250514',
  provider: 'anthropic',
  promptTokens: 1000,
  completionTokens: 500,
  totalTokens: 1500,
  costUSD: 0.03,
  feature: 'feature-a',
  success: true,
  durationMs: 1000,
  userId: 'user-1', // Different user
});

// Get costs for specific user
const userCosts = await getCostSummary(7, 'user-1');
```

---

## Troubleshooting

### API returns "AI features are not enabled on this site"

**Problem:** Trying to access `/api/ai/costs` on public-facing pages.

**Solution:** This endpoint is intentionally disabled on the marketing site for security (no auth system). Access it from authenticated pages only:
- ✅ `/admin/ai-costs` (platform dashboard)
- ❌ `/api/ai/costs` (public endpoint - blocked)

### No cost data appears in dashboard

**Causes:**
1. Seeded data hasn't been created: `npm run seed:ai-costs`
2. Not logged in (dashboard requires authentication)
3. Neon database not connected (check `DATABASE_URL` in `.env.local`)

**Fix:**
```bash
# 1. Start dev server
npm run dev

# 2. Create account and login

# 3. Seed test data
npm run seed:ai-costs

# 4. Refresh dashboard at /admin/ai-costs
```

### "Unauthorized" error when accessing dashboard

**Cause:** Not authenticated.

**Fix:**
1. Create account at `http://localhost:3000/(auth)/signup`
2. Login with your credentials
3. Navigate to admin dashboard

### Neon client not initializing

**Cause:** `DATABASE_URL` doesn't point to Neon (missing "neon.tech" in connection string).

**Solution:**
- Update `.env.local` with Neon connection string
- Or keep using Prisma (automatic fallback)

Check `src/lib/ai/neon-integration.ts` line 23-25:
```typescript
if (!databaseUrl || !databaseUrl.includes('neon.tech')) {
  return null; // Use Prisma instead
}
```

---

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm run test:neon` | Test Neon functions directly |
| `npm run seed:ai-costs` | Create 30 days of test cost data |
| `npm run dev` | Start dev server (required first) |

---

## Files Involved

- **Integration**: `src/lib/ai/neon-integration.ts`
- **API Route**: `src/app/api/ai/costs/route.ts`
- **Dashboard**: `src/app/(platform)/admin/ai-costs/page.tsx`
- **Schema**: `prisma/schema.prisma` (AICostEvent model)
- **Seed Script**: `scripts/seed-ai-costs.ts`
- **Test Script**: `scripts/test-neon-integration.ts`

---

## Cost Pricing Reference

Used in seed data generation:

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| claude-opus-4-20250514 | $15 | $45 |
| claude-sonnet-4-20250514 | $3 | $15 |
| claude-haiku-4-5-20251001 | $0.80 | $4 |

---

## Next Steps

1. ✅ Run `npm run test:neon` to verify integration
2. ✅ Run `npm run seed:ai-costs` to create test data
3. ✅ Visit `/admin/ai-costs` to view dashboard
4. 📊 Integrate cost tracking into your features using `@/lib/ai/cost`
5. 💾 Monitor costs in production with budget alerts

See `docs/11-ai-development/` for full AI integration guide.
