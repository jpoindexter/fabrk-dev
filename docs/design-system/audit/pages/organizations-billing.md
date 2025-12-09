# Organization Billing Page Audit

**File**: `src/app/(dashboard)/organizations/[slug]/billing/page.tsx`

## Purpose

Organization-level billing management with subscription, usage, and invoices.

## Layout Overview

- **Container**: `mx-auto max-w-6xl space-y-6`
- **Client Component**: Uses `"use client"` with state management
- **Layout**: Vertical stack of billing cards

## Key Components Used

- `Card`, `CardContent`
- `Button` from `@/components/ui/button`
- `BillingHeader`, `CurrentPlanCard`, `UsageStatsCard`, `BillingHistoryCard` - Custom billing components
- `useRouter`, `useParams` from next/navigation
- `useSession` from next-auth
- Icons: `Loader2`
- `toast` from sonner
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`
- TypeScript types: `Organization`, `Subscription`, `Invoice`, `Usage`

## Typography Scale

- `text-lg` - Empty state heading
- `text-muted-foreground` - Empty state text
- `font-medium` - Empty state heading

## Spacing Patterns

- `mx-auto max-w-6xl` - Centered wide container (72rem / 1152px)
- `space-y-6` - Main container (24px)
- `py-12` - Loading/error state padding (48px)

## Font Weights and Families

- `font-medium` - Empty state heading

## Colors Used (Semantic Tokens)

- `text-muted-foreground` - Loading/empty state text
- `border-border` - Card borders

## Hardcoded Values

- `max-w-6xl` - Container max width (72rem / 1152px)
- `h-8 w-8` - Loading spinner (32px × 32px)

## Type Definitions

Imports from `./components/types`:

- `Organization` - org data
- `Subscription` - subscription details
- `Invoice` - billing history
- `Usage` - resource usage metrics

## State Management

```typescript
const [loading, setLoading] = useState(true);
const [organization, setOrganization] = useState<Organization | null>(null);
const [subscription, setSubscription] = useState<Subscription | null>(null);
const [invoices, setInvoices] = useState<Invoice[]>([]);
const [usage, setUsage] = useState<Usage | null>(null);
const [loadingPortal, setLoadingPortal] = useState(false);
```

## Data Fetching (useEffect)

Sequential fetch pattern:

1. GET `/api/organizations/:slug` - Fetch organization
2. If `customerId` exists, parallel fetch:
   - GET `/api/organizations/:id/billing/subscription`
   - GET `/api/organizations/:id/billing/invoices`
   - GET `/api/organizations/:id/billing/usage`

## API Integration

Billing endpoints:

1. `GET /api/organizations/:id/billing/subscription` - Current plan
2. `GET /api/organizations/:id/billing/invoices` - Payment history
3. `GET /api/organizations/:id/billing/usage` - Resource consumption
4. `POST /api/organizations/:id/billing/portal` - Stripe portal session

## Handler Functions

```typescript
handleManageBilling()
  - POST to billing portal endpoint
  - Redirects to Stripe hosted portal
  - Loading state prevents double-click

handleUpgrade()
  - Client-side navigation to upgrade page
  - `/organizations/:slug/billing/upgrade`
```

## Permission Gating

`isOwnerOrAdmin` = role in ["OWNER", "ADMIN"]

- Controls visibility of management buttons
- Passed to child components

## Component Composition

Clean separation of concerns:

1. **BillingHeader** - Title + organization info
2. **CurrentPlanCard** - Subscription status + CTA buttons
3. **UsageStatsCard** - Resource consumption (conditional render)
4. **BillingHistoryCard** - Invoice list

## Loading State

Centered spinner: "Loading billing information..."

## Empty State (Organization not found)

Centered card with back button

## Error Handling

- Try/catch on data fetching
- Toast for billing portal errors
- Console error logging

## Design System Integration

- ✅ Uses `mode.radius` for cards
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens
- ✅ Excellent component composition

## Conditional Rendering

- Usage card only shown if `usage` data exists
- Billing sections only fetched if `customerId` exists
- Graceful handling of missing data

## Inconsistencies

- **No empty state for no subscription**: Just doesn't render components
- **Silent failure**: If billing API calls fail, components just don't render
