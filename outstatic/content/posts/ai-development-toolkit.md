---
title: 'AI Development Toolkit: Cost Tracking, Validation, and Testing'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'ai-development-toolkit'
description: 'Fabrk includes a complete AI development toolkit for building cost-aware, type-safe AI features. Track API costs, validate generated code, and test AI outputs.'
publishedAt: '2026-01-28T10:00:00.000Z'
---

Building AI features without cost awareness is like driving without a speedometer. You might get there, but you'll have no idea what it cost until the bill arrives. Fabrk includes a complete AI development toolkit for building production-ready AI features with cost tracking, code validation, and comprehensive testing.

---

## Overview

The AI development toolkit provides:

- **Cost Tracking** - Monitor API costs by feature, user, and model
- **Code Validation** - Security scanning for AI-generated code
- **AI Testing** - Test harness for AI function outputs
- **React Components** - UI widgets for cost display
- **Budget Management** - Prevent runaway costs

---

## Cost Tracking

### Setting Up the Cost Tracker

```typescript
// src/lib/ai/cost.ts
import { prisma } from '@/lib/prisma';

// Claude model pricing (per million tokens)
const PRICING = {
  'claude-opus-4-5-20250514': { input: 15, output: 75 },
  'claude-sonnet-4-20250514': { input: 3, output: 15 },
  'claude-3-5-haiku-20241022': { input: 0.25, output: 1.25 },
} as const;

type ClaudeModel = keyof typeof PRICING;

interface TrackOptions<T> {
  model: ClaudeModel;
  feature: string;
  userId: string;
  fn: () => Promise<T>;
}

export function getCostTracker() {
  return {
    async trackClaudeCall<T>({ model, feature, userId, fn }: TrackOptions<T>): Promise<T> {
      const startTime = Date.now();
      const result = await fn();

      // Extract token counts from response
      const usage = extractUsage(result);
      const cost = calculateCost(model, usage);

      // Store in database
      await prisma.aiUsage.create({
        data: {
          userId,
          model,
          feature,
          inputTokens: usage.inputTokens,
          outputTokens: usage.outputTokens,
          cost,
          durationMs: Date.now() - startTime,
        },
      });

      return result;
    },

    async checkBudget(userId: string) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { dailyBudget: true },
      });

      const todayUsage = await prisma.aiUsage.aggregate({
        where: {
          userId,
          createdAt: { gte: startOfDay() },
        },
        _sum: { cost: true },
      });

      const used = todayUsage._sum.cost || 0;
      const limit = user?.dailyBudget || 10;

      return {
        used,
        limit,
        remaining: limit - used,
        withinBudget: used < limit,
        percentUsed: (used / limit) * 100,
      };
    },
  };
}

function calculateCost(model: ClaudeModel, usage: { inputTokens: number; outputTokens: number }) {
  const pricing = PRICING[model];
  const inputCost = (usage.inputTokens / 1_000_000) * pricing.input;
  const outputCost = (usage.outputTokens / 1_000_000) * pricing.output;
  return inputCost + outputCost;
}
```

### Using Cost Tracking in API Routes

```typescript
// src/app/api/ai/generate/route.ts
import { auth } from '@/lib/auth';
import { getCostTracker } from '@/lib/ai/cost';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();
const costTracker = getCostTracker();

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check budget before making expensive call
  const budget = await costTracker.checkBudget(session.user.id);
  if (!budget.withinBudget) {
    return Response.json({
      error: 'Daily budget exceeded',
      used: budget.used,
      limit: budget.limit,
    }, { status: 429 });
  }

  const { prompt, feature } = await request.json();

  // Track the API call
  const result = await costTracker.trackClaudeCall({
    model: 'claude-sonnet-4-20250514',
    feature: feature || 'general',
    userId: session.user.id,
    fn: async () => {
      return anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });
    },
  });

  return Response.json({
    content: result.content[0].text,
    usage: result.usage,
  });
}
```

---

## Code Validation

Validate AI-generated code for security issues before execution:

```typescript
// src/lib/ai/validation.ts
const DANGEROUS_PATTERNS = [
  { pattern: /eval\s*\(/, message: 'eval() usage detected', severity: 'critical' },
  { pattern: /Function\s*\(/, message: 'Function constructor detected', severity: 'critical' },
  { pattern: /document\.write/, message: 'document.write detected', severity: 'error' },
  { pattern: /innerHTML\s*=/, message: 'innerHTML assignment detected', severity: 'warning' },
  { pattern: /exec\s*\(/, message: 'Command execution detected', severity: 'critical' },
  { pattern: /spawn\s*\(/, message: 'Process spawn detected', severity: 'critical' },
];

export function validateCode(code: string) {
  const issues = [];

  for (const { pattern, message, severity } of DANGEROUS_PATTERNS) {
    if (pattern.test(code)) {
      const lines = code.split('\n');
      lines.forEach((line, index) => {
        if (pattern.test(line)) {
          issues.push({ type: 'security', message, line: index + 1, severity });
        }
      });
    }
  }

  // Check for hardcoded secrets
  const secretPatterns = [
    /(?:api[_-]?key|secret|password|token)\s*[:=]\s*['"][^'"]{8,}['"]/i,
    /sk[_-](?:live|test)[_-][a-zA-Z0-9]{24,}/,
  ];

  for (const pattern of secretPatterns) {
    if (pattern.test(code)) {
      issues.push({
        type: 'hardcoded-secret',
        message: 'Potential hardcoded secret detected',
        severity: 'critical',
      });
    }
  }

  const hasCritical = issues.some((i) => i.severity === 'critical');
  const hasError = issues.some((i) => i.severity === 'error');

  return {
    valid: !hasCritical && !hasError,
    issues,
    severity: hasCritical ? 'critical' : hasError ? 'error' : issues.length ? 'warning' : 'none',
  };
}

export function isCodeSafe(code: string): boolean {
  return validateCode(code).valid;
}
```

### Using Validation

```typescript
const validation = validateCode(generatedCode);

if (!validation.valid) {
  console.error('Unsafe code generated:', validation.issues);
  return Response.json({ error: 'Code validation failed' }, { status: 400 });
}
```

---

## AI Testing Framework

Test AI-generated functions with type validation:

```typescript
// src/lib/ai/testing.ts
import { z } from 'zod';

export class AITest<T extends (...args: any[]) => any> {
  private fn: T;
  private checks: Array<() => Promise<{ passed: boolean; errors: string[] }>> = [];

  constructor(fn: T) {
    this.fn = fn;
  }

  isAsync(): this {
    this.checks.push(async () => ({
      passed: this.fn.constructor.name === 'AsyncFunction',
      errors: this.fn.constructor.name !== 'AsyncFunction' ? ['Function is not async'] : [],
    }));
    return this;
  }

  shouldNotThrow(inputs: Parameters<T>[]): this {
    this.checks.push(async () => {
      const errors: string[] = [];
      for (const input of inputs) {
        try {
          await this.fn(...input);
        } catch (error) {
          errors.push(`Threw for input ${JSON.stringify(input)}`);
        }
      }
      return { passed: errors.length === 0, errors };
    });
    return this;
  }

  shouldReturnType<S extends z.ZodType>(schema: S, inputs: Parameters<T>[]): this {
    this.checks.push(async () => {
      const errors: string[] = [];
      for (const input of inputs) {
        const result = await this.fn(...input);
        const parsed = schema.safeParse(result);
        if (!parsed.success) {
          errors.push(`Type mismatch for ${JSON.stringify(input)}`);
        }
      }
      return { passed: errors.length === 0, errors };
    });
    return this;
  }

  shouldCompleteInMs(ms: number, inputs: Parameters<T>[]): this {
    this.checks.push(async () => {
      const errors: string[] = [];
      for (const input of inputs) {
        const start = Date.now();
        await this.fn(...input);
        if (Date.now() - start > ms) {
          errors.push(`Exceeded ${ms}ms for ${JSON.stringify(input)}`);
        }
      }
      return { passed: errors.length === 0, errors };
    });
    return this;
  }

  async verifyOrThrow(): Promise<void> {
    for (const check of this.checks) {
      const { passed, errors } = await check();
      if (!passed) {
        throw new Error(`AI function failed: ${errors.join(', ')}`);
      }
    }
  }
}
```

### Usage

```typescript
await new AITest(generatedFn)
  .isAsync()
  .shouldNotThrow([['valid-input']])
  .shouldReturnType(z.object({ id: z.string() }), [['valid-input']])
  .shouldCompleteInMs(5000, [['valid-input']])
  .verifyOrThrow();
```

---

## React Components for Cost Display

### Cost Badge

```tsx
// src/components/ai/cost-badge.tsx
'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

export function CostBadge() {
  const [cost, setCost] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/ai/cost/today')
      .then((r) => r.json())
      .then((data) => setCost(data.total));
  }, []);

  if (cost === null) return null;

  return (
    <Badge variant={cost > 8 ? 'destructive' : 'default'} className="font-mono text-xs">
      ${cost.toFixed(2)} TODAY
    </Badge>
  );
}
```

### Cost Widget

```tsx
// src/components/ai/cost-widget.tsx
'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function CostWidget({ showFeatures = false }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/ai/cost/summary').then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <div className="animate-pulse h-32 bg-muted rounded" />;

  return (
    <Card>
      <CardHeader>
        <span className="text-xs text-muted-foreground">[ AI USAGE ]</span>
        <span className="font-mono text-2xl">${data.total.toFixed(2)}</span>
      </CardHeader>
      <CardContent>
        <Progress value={(data.total / data.limit) * 100} />
        {showFeatures && data.byFeature.map((f) => (
          <div key={f.feature} className="flex justify-between text-xs">
            <span>{f.feature}</span>
            <span>${f.cost.toFixed(3)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
```

### Budget Alert

```tsx
// src/components/ai/budget-alert.tsx
'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export function BudgetAlert({ threshold = 80 }) {
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    fetch('/api/ai/cost/budget').then((r) => r.json()).then(setBudget);
  }, []);

  if (!budget || budget.percentUsed < threshold) return null;

  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        {budget.percentUsed.toFixed(0)}% of daily AI budget used.
      </AlertDescription>
    </Alert>
  );
}
```

---

## Database Schema

```prisma
// prisma/schema.prisma

model AiUsage {
  id           String   @id @default(cuid())
  userId       String
  model        String
  feature      String
  inputTokens  Int
  outputTokens Int
  cost         Float
  durationMs   Int
  createdAt    DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([feature])
  @@index([createdAt])
}

model User {
  dailyBudget Float @default(10.00)
  aiUsage     AiUsage[]
}
```

---

## CLI Commands

```bash
# Generate cost report
npm run ai:cost-report

# Validate AI code patterns
npm run ai:validate

# Security scan
npm run ai:security

# Run all AI checks before deployment
npm run ai:pre-deploy
```

---

## Best Practices

1. **Always track costs** - Use `trackClaudeCall` for every AI API call
2. **Set budgets** - Prevent runaway costs with `checkBudget`
3. **Validate generated code** - Never execute unvalidated AI output
4. **Test AI functions** - Use `AITest` for type-safe testing
5. **Monitor by feature** - Track which features cost the most
6. **Use cheaper models** - Default to Haiku, upgrade when needed

---

## Next Steps

1. **Add the database schema** - Run migrations for AiUsage table
2. **Configure cost tracking** - Import getCostTracker in your AI routes
3. **Set budget limits** - Configure dailyBudget for users
4. **Add UI components** - Display costs in the dashboard
5. **Monitor usage** - Set up alerts for unusual patterns

Build AI features with confidence. Know what they cost.
