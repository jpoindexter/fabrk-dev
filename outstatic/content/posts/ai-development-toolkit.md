---
title: 'AI Development Toolkit: Cost Tracking, Validation, and Testing'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'ai-development-toolkit'
description: 'Build cost-aware AI features with Fabrk''s AI development toolkit. Track API costs, validate generated code, and test AI functions safely.'
publishedAt: '2026-01-30T10:00:00.000Z'
---

**Build AI features without budget surprises.**

---

## The AI Cost Problem

AI API calls are expensive. A single Claude Opus call can cost $0.15+. Without tracking, costs spiral out of control.

Fabrk includes a complete AI development toolkit:

- Cost tracking per user and feature
- Budget limits and alerts
- Code validation for AI-generated code
- Type-safe testing utilities

---

## Cost Tracking

Track every AI API call automatically:

```typescript
import { getCostTracker } from '@/lib/ai/cost';

const tracker = getCostTracker();

const result = await tracker.trackClaudeCall({
  model: 'claude-sonnet-4-20250514',
  feature: 'form-generation',
  userId: session.user.id,
  fn: async () => {
    return await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });
  },
});
```

Costs are calculated automatically based on input/output tokens.

---

## Budget Limits

Set per-user budget limits:

```typescript
const budget = await tracker.checkBudget(userId);

if (!budget.withinBudget) {
  throw new AppError(
    'BUDGET_EXCEEDED',
    'Daily AI budget exceeded',
    429
  );
}

// Show remaining budget
console.log(`Remaining: $${budget.remaining}`);
```

---

## Model Pricing

Fabrk includes current pricing for all major models:

| Model | Input (per 1M) | Output (per 1M) |
|-------|----------------|-----------------|
| claude-opus-4-5 | $15.00 | $75.00 |
| claude-sonnet-4 | $3.00 | $15.00 |
| claude-haiku-3.5 | $0.25 | $1.25 |
| gpt-4o | $5.00 | $15.00 |
| gpt-4o-mini | $0.15 | $0.60 |

Pricing is configurable in `src/lib/ai/pricing.ts`.

---

## Code Validation

Validate AI-generated code before execution:

```typescript
import { validateCode, isCodeSafe } from '@/lib/ai/validation';

const generatedCode = await getAIGeneratedCode();

const result = validateCode(generatedCode);

if (!result.valid) {
  console.error('Validation failed:', result.issues);
  // Don't execute unsafe code
  return;
}

// Safe to use
eval(generatedCode); // Only if validated!
```

---

## Security Checks

The validator catches common issues:

```typescript
import { getSecurityIssues } from '@/lib/ai/validation';

const issues = getSecurityIssues(code);

// Detects:
// - eval() usage
// - dangerouslySetInnerHTML
// - SQL injection patterns
// - Command injection
// - Hardcoded secrets
// - Unsafe file operations
```

---

## AI Testing Utilities

Test AI-generated functions safely:

```typescript
import { AITest, commonSchemas } from '@/lib/ai/testing';

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

await new AITest(generatedFunction)
  .isAsync()
  .shouldNotThrow(['valid-input'])
  .shouldReturnType(userSchema, ['valid-input'])
  .shouldHandleNull()
  .shouldCompleteInMs(5000, ['valid-input'])
  .verifyOrThrow();
```

---

## Type-Safe Responses

Use type utilities for AI API responses:

```typescript
import {
  APIResponse,
  AppError,
  successResponse,
  errorResponse,
} from '@/types/ai';

async function generateContent(): Promise<APIResponse<Content>> {
  try {
    const content = await callAI();
    return successResponse(content);
  } catch (error) {
    return errorResponse('AI_ERROR', 'Generation failed');
  }
}
```

---

## React Components

Display costs to users with pre-built components:

```tsx
import { CostBadge, CostWidget, BudgetAlert } from '@/components/ai';

// Header badge showing daily spend
<CostBadge />

// Dashboard widget with breakdown
<CostWidget showFeatures />

// Alert when approaching budget
<BudgetAlert threshold={70} />
```

---

## Hooks

Use hooks for real-time cost data:

```tsx
import { useCostTracking, useCostBudget } from '@/hooks/use-cost-tracking';

function Dashboard() {
  const { todayCost, monthCost, isLoading } = useCostTracking();
  const { percentUsed, isOverBudget } = useCostBudget();

  return (
    <div>
      <p>Today: ${todayCost.toFixed(2)}</p>
      <p>Budget: {percentUsed}% used</p>
      {isOverBudget && <Alert>Budget exceeded!</Alert>}
    </div>
  );
}
```

---

## Cost Reports

Generate cost reports with:

```bash
npm run ai:cost-report
```

Reports include:
- Daily/weekly/monthly totals
- Per-feature breakdown
- Per-user breakdown
- Trend analysis

---

## Pre-Deploy Validation

Run all AI checks before deployment:

```bash
npm run ai:pre-deploy
```

This runs:
- `ai:validate` - Code validation
- `ai:lint` - AI best practices
- `ai:security` - Vulnerability scan

---

## Best Practices

1. **Always track costs** - Use `trackClaudeCall` for every AI API call
2. **Set budgets** - Prevent runaway costs with `checkBudget`
3. **Validate generated code** - Never execute unvalidated AI output
4. **Test AI functions** - Use `AITest` for type-safe testing
5. **Monitor in production** - Use `CostWidget` for visibility

---

## Getting Started

1. Import cost tracker: `import { getCostTracker } from '@/lib/ai/cost'`
2. Wrap AI calls with `trackClaudeCall`
3. Add `<CostBadge />` to your header
4. Set budget limits in environment variables
5. Run `npm run ai:cost-report` weekly

AI features, under control.

