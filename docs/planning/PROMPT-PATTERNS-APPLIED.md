# Prompt Pattern Library - Applied to Fabrk Boilerplate

This document analyzes which patterns from the Prompt Pattern Library are relevant to this SaaS boilerplate and provides implementation guidance.

---

## ✅ Already Implemented Patterns

### 1. Template Pattern
**Purpose:** Provide reusable structures for common tasks

**Implementation in Fabrk:**
- `/templates` gallery with 8 copy-paste layouts
- `/variations` with 4 landing page styles
- UI component library (25+ components)
- Consistent file structure patterns

**Evidence:**
- `src/app/templates/page.tsx` - Template gallery
- `src/app/templates/analytics-dashboard/page.tsx` - Example template
- `src/components/ui/*` - 25+ reusable components

### 2. Persona Pattern
**Purpose:** Different behaviors for different user types

**Implementation in Fabrk:**
- Role-based authentication (USER, ADMIN)
- Middleware protects routes based on role
- Session includes role information

**Evidence:**
- `prisma/schema.prisma:12` - User model with `role` enum
- `src/middleware.ts` - Route protection by role
- `src/types/next-auth.d.ts` - Session includes role

### 3. Recipe Pattern
**Purpose:** Step-by-step guides for common tasks

**Implementation in Fabrk:**
- `CLAUDE.md` contains development recipes
- Common tasks documented with exact commands
- Webhook testing recipes included

**Evidence:**
- `CLAUDE.md:42-60` - Development commands section
- `CLAUDE.md:240-247` - Testing Stripe webhooks locally

### 4. Outline Expansion Pattern
**Purpose:** Start with outline, expand with details

**Implementation in Fabrk:**
- Documentation follows outline → detail structure
- Component showcase organized by category
- Templates grouped by type

**Evidence:**
- `src/app/components/page.tsx:63-68` - Category navigation
- `src/app/templates/page.tsx:109-126` - Templates by category
- `CLAUDE.md` - Structured documentation

### 5. Fact Check List Pattern
**Purpose:** Verify critical requirements are met

**Implementation in Fabrk:**
- Security checklist in PERFECTION-ACHIEVED.md
- Production readiness checklist
- Environment variables documented

**Evidence:**
- `PERFECTION-ACHIEVED.md:276-327` - Production checklist
- `.env.example` - Required variables with examples
- `SECURITY-IMPROVEMENTS.md` - Security verification

---

## 🚀 Recommended Patterns to Implement

### 6. Context Manager Pattern
**Purpose:** Maintain and reference conversation context

**How to Apply:**
Create a global state management system for user preferences and app state.

**Implementation Plan:**
```typescript
// src/lib/context-manager.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppContext {
  colorScheme: string;
  lastVisitedPage: string;
  onboardingComplete: boolean;
  preferences: UserPreferences;
}

export const useAppContext = create<AppContext>()(
  persist(
    (set) => ({
      colorScheme: 'purple',
      lastVisitedPage: '/',
      onboardingComplete: false,
      preferences: {},

      updateColorScheme: (scheme: string) =>
        set({ colorScheme: scheme }),

      markOnboardingComplete: () =>
        set({ onboardingComplete: true }),
    }),
    { name: 'app-context' }
  )
);
```

**Benefits:**
- Persistent user preferences across sessions
- Faster page loads (remember user state)
- Better UX with context-aware features

**Files to Create:**
- `src/lib/context-manager.ts`
- `src/hooks/use-app-context.ts`

**Dependencies Needed:**
```bash
npm install zustand
```

### 7. Menu Actions Pattern
**Purpose:** Provide clear action options at decision points

**How to Apply:**
Add action menus to dashboard, settings, and admin pages.

**Implementation Plan:**
```typescript
// src/components/action-menu.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ActionMenu({ actions }: { actions: Action[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions.map((action, i) => (
          <DropdownMenuItem key={i} onClick={action.handler}>
            <action.icon className="mr-2 h-4 w-4" />
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

**Use Cases:**
- Dashboard: "Export Data", "Generate Report", "Settings"
- User table: "Edit", "Delete", "View Details"
- Billing: "Download Invoice", "Change Plan", "Cancel"

**Files to Create:**
- `src/components/action-menu.tsx`
- `src/hooks/use-actions.ts`

### 8. Helpful Assistant Pattern
**Purpose:** Guide users through complex tasks

**How to Apply:**
Add an onboarding flow and help tooltips throughout the app.

**Implementation Plan:**
```typescript
// src/components/onboarding/onboarding-tour.tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const steps = [
  {
    target: '#dashboard',
    title: 'Welcome to Fabrk!',
    content: 'This is your dashboard where you can see all your metrics.',
  },
  {
    target: '#settings',
    title: 'Customize Your Experience',
    content: 'Update your preferences, billing, and account settings here.',
  },
  // ... more steps
];

export function OnboardingTour({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <Card className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{steps[currentStep].content}</p>
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            Next ({currentStep + 1}/{steps.length})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Use Cases:**
- First-time user onboarding
- New feature announcements
- Complex form assistance
- Dashboard navigation help

**Files to Create:**
- `src/components/onboarding/onboarding-tour.tsx`
- `src/components/ui/tooltip-help.tsx`
- `src/hooks/use-onboarding.ts`

**Dependencies Needed:**
```bash
npm install react-joyride  # For guided tours
```

### 9. Semantic Filter Pattern
**Purpose:** Filter content based on semantic meaning

**How to Apply:**
Add advanced search and filtering to data tables and user lists.

**Implementation Plan:**
```typescript
// src/components/semantic-search.tsx
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SemanticSearchProps {
  data: any[];
  onFilter: (filtered: any[]) => void;
  searchFields: string[];
}

export function SemanticSearch({ data, onFilter, searchFields }: SemanticSearchProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filterData = () => {
    let filtered = data;

    // Text search across multiple fields
    if (query) {
      filtered = filtered.filter((item) =>
        searchFields.some((field) =>
          item[field]?.toLowerCase().includes(query.toLowerCase())
        )
      );
    }

    // Apply semantic filters (role, status, tier, etc.)
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((item) => item[key] === value);
      }
    });

    onFilter(filtered);
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          filterData();
        }}
      />
      <div className="flex gap-2">
        <Badge onClick={() => setFilters({ ...filters, role: 'ADMIN' })}>
          Admin Only
        </Badge>
        <Badge onClick={() => setFilters({ ...filters, status: 'active' })}>
          Active Users
        </Badge>
      </div>
    </div>
  );
}
```

**Use Cases:**
- User management (filter by role, status, tier)
- Payment history (filter by amount, date, status)
- Analytics (filter by timeframe, metrics)

**Files to Create:**
- `src/components/semantic-search.tsx`
- `src/hooks/use-search.ts`
- `src/lib/search-utils.ts`

### 10. Tail Generation Pattern
**Purpose:** Complete partial implementations

**How to Apply:**
Add code generation helpers for common boilerplate tasks.

**Implementation Plan:**
Create CLI commands to generate common patterns:

```typescript
// scripts/generate-page.ts
import fs from 'fs';
import path from 'path';

const templates = {
  'dashboard-page': `
    import { auth } from "@/lib/auth";
    import { redirect } from "next/navigation";

    export default async function {{NAME}}Page() {
      const session = await auth();
      if (!session) redirect("/login");

      return (
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold">{{NAME}}</h1>
          {/* Add your content here */}
        </div>
      );
    }
  `,
  'api-route': `
    import { NextRequest, NextResponse } from "next/server";
    import { auth } from "@/lib/auth";
    import { prisma } from "@/lib/prisma";

    export async function GET(req: NextRequest) {
      try {
        const session = await auth();
        if (!session?.user) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Add your logic here

        return NextResponse.json({ data: {} });
      } catch (error) {
        console.error("{{NAME}} error:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
      }
    }
  `,
};

// Usage: npm run generate page dashboard new-feature
function generateFromTemplate(type: string, name: string) {
  const template = templates[type];
  const code = template.replace(/{{NAME}}/g, name);
  // Write to appropriate location
}
```

**Use Cases:**
- Generate new API routes with auth boilerplate
- Create new dashboard pages with layout
- Add new database models with types
- Generate email templates

**Files to Create:**
- `scripts/generate-page.ts`
- `scripts/generate-api.ts`
- `scripts/generate-model.ts`

**Add to package.json:**
```json
{
  "scripts": {
    "generate:page": "tsx scripts/generate-page.ts",
    "generate:api": "tsx scripts/generate-api.ts"
  }
}
```

### 11. Audience Persona Pattern
**Purpose:** Tailor content for different user types

**How to Apply:**
Create role-specific dashboards and content.

**Implementation Plan:**
```typescript
// src/components/dashboard/role-specific-content.tsx
import { useSession } from "next-auth/react";

export function RoleSpecificDashboard() {
  const { data: session } = useSession();

  if (session?.user.role === "ADMIN") {
    return <AdminDashboard />;
  }

  if (session?.user.subscriptionTier === "ENTERPRISE") {
    return <EnterpriseDashboard />;
  }

  return <StandardDashboard />;
}
```

**Use Cases:**
- Admin sees user management tools
- Enterprise users see advanced analytics
- Free tier users see upgrade prompts
- Different onboarding flows per persona

**Files to Modify:**
- `src/app/(dashboard)/dashboard/page.tsx`
- Create: `src/components/dashboard/admin-dashboard.tsx`
- Create: `src/components/dashboard/enterprise-dashboard.tsx`

### 12. Infinite Generation Pattern
**Purpose:** Continue generating until criteria met

**How to Apply:**
Add pagination and infinite scroll to data tables.

**Implementation Plan:**
```typescript
// src/components/infinite-list.tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export function InfiniteUserList() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 0 }) => fetchUsers({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      {data?.pages.map((page) =>
        page.users.map((user) => <UserCard key={user.id} user={user} />)
      )}
      <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
    </div>
  );
}
```

**Use Cases:**
- User list with infinite scroll
- Payment history pagination
- Activity feed continuous loading
- Search results

**Dependencies Needed:**
```bash
npm install @tanstack/react-query react-intersection-observer
```

**Files to Create:**
- `src/components/infinite-list.tsx`
- `src/hooks/use-infinite-scroll.ts`

### 13. Visualization Generator Pattern
**Purpose:** Create visual representations of data

**How to Apply:**
Add interactive charts to analytics dashboard.

**Implementation Plan:**
```typescript
// src/components/charts/revenue-chart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function RevenueChart({ data }: { data: RevenueData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

**Use Cases:**
- Revenue over time charts
- User growth graphs
- Conversion funnel visualization
- Geographic distribution maps

**Dependencies Needed:**
```bash
npm install recharts
```

**Files to Create:**
- `src/components/charts/revenue-chart.tsx`
- `src/components/charts/user-growth-chart.tsx`
- `src/components/charts/conversion-funnel.tsx`

### 14. Game Play Pattern
**Purpose:** Make interactions engaging and rewarding

**How to Apply:**
Add progress indicators and achievement systems.

**Implementation Plan:**
```typescript
// src/components/gamification/progress-tracker.tsx
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward?: string;
}

export function AchievementTracker({ achievements }: Props) {
  return (
    <div className="space-y-4">
      {achievements.map((achievement) => {
        const percentage = (achievement.progress / achievement.total) * 100;
        const isComplete = percentage === 100;

        return (
          <Card key={achievement.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{achievement.title}</CardTitle>
                {isComplete && <Badge>Unlocked!</Badge>}
              </div>
              <CardDescription>{achievement.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={percentage} />
              <p className="text-sm text-muted-foreground mt-2">
                {achievement.progress} / {achievement.total}
              </p>
              {achievement.reward && (
                <p className="text-sm text-primary mt-2">
                  Reward: {achievement.reward}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
```

**Use Cases:**
- "Complete your profile" progress
- "Invite 5 friends" achievements
- Onboarding completion tracker
- Feature usage milestones

**Files to Create:**
- `src/components/gamification/achievement-tracker.tsx`
- `src/lib/achievements.ts`
- `prisma/schema.prisma` - Add Achievement model

### 15. Reflection Pattern
**Purpose:** Review and critique outputs

**How to Apply:**
Add code review and quality checks to CI/CD.

**Implementation Plan:**
```yaml
# .github/workflows/quality-check.yml
name: Code Quality Check

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Type Check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test

      - name: Security Audit
        run: npm audit --audit-level=moderate

      - name: Bundle Size Check
        run: |
          npm run build
          npx bundlesize
```

**Use Cases:**
- Automated type checking on PR
- Lint enforcement before merge
- Security vulnerability scanning
- Bundle size monitoring

**Files to Create:**
- `.github/workflows/quality-check.yml`
- `.github/workflows/security-scan.yml`

---

## 📊 Implementation Priority

### High Priority (Immediate Value)
1. **Context Manager Pattern** - Better UX with persistent state
2. **Menu Actions Pattern** - Clear user actions everywhere
3. **Visualization Generator Pattern** - Make analytics useful

### Medium Priority (Enhanced Experience)
4. **Helpful Assistant Pattern** - Onboarding & help
5. **Semantic Filter Pattern** - Better search
6. **Infinite Generation Pattern** - Smooth data loading

### Low Priority (Nice to Have)
7. **Tail Generation Pattern** - Developer productivity
8. **Game Play Pattern** - User engagement
9. **Reflection Pattern** - Code quality automation

---

## 📝 Implementation Checklist

### Phase 1: Foundation (Week 1)
- [ ] Install Zustand for state management
- [ ] Create Context Manager with color scheme, preferences
- [ ] Add Action Menus to dashboard and settings
- [ ] Install Recharts for visualizations

### Phase 2: Enhanced UX (Week 2)
- [ ] Build onboarding tour component
- [ ] Add semantic search to user table
- [ ] Create interactive charts for analytics
- [ ] Add infinite scroll to lists

### Phase 3: Developer Experience (Week 3)
- [ ] Create code generation scripts
- [ ] Add GitHub Actions for quality checks
- [ ] Build CLI tools for common tasks
- [ ] Document all patterns in CLAUDE.md

### Phase 4: Engagement (Week 4)
- [ ] Add achievement system
- [ ] Create progress trackers
- [ ] Build notification system
- [ ] Add help tooltips throughout

---

## 🎯 Success Metrics

After implementing these patterns, measure:

1. **User Engagement**
   - Onboarding completion rate
   - Feature discovery rate
   - Time to first value

2. **Developer Productivity**
   - Time to add new feature
   - Code review approval rate
   - Bug fix turnaround time

3. **Code Quality**
   - TypeScript error rate
   - Test coverage percentage
   - Bundle size trends

---

## 📚 Resources

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Pattern Library Documentation](https://github.com/prompt-patterns)
- [SaaS Best Practices](https://saasboilerplate.dev)

---

**Last Updated:** 2025-11-07
**Status:** Ready for implementation
**Priority Patterns:** Context Manager, Menu Actions, Visualization Generator
