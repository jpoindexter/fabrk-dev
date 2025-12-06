# Billing Invoices Page Audit

**File**: `src/app/(dashboard)/billing/invoices/page.tsx`

## Purpose
Display payment history with invoice download functionality.

## Layout Overview
- **Container**: `container mx-auto max-w-6xl px-6 py-8`
- **Server Component**: Uses `async` for server-side data fetching
- **Grid**: `grid gap-6 md:grid-cols-2` for info cards at bottom

## Key Components Used
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`
- `Badge` from `@/components/ui/badge`
- `Button` from `@/components/ui/button`
- `InvoicesClient` - Client component for download buttons
- `prisma` - Database ORM
- `auth` - NextAuth session
- Icons: `ArrowLeft`, `FileText`, `CheckCircle2`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale
- `text-4xl` - Page title "Invoices & Receipts"
- `text-lg` - Subtitle
- `text-muted-foreground` - Subtitle, empty state text, table cell text
- `text-xs` - Invoice number subtext, card list text
- `text-sm` - Card descriptions, card body text, empty state subtitle
- `font-semibold` - Page title (tracking-tight), table cells
- `font-medium` - Table cells, card text

## Spacing Patterns
- `px-6 py-8` - Container padding (24px horizontal, 32px vertical)
- `mb-8` - Header bottom margin (32px)
- `mb-4` - Back button bottom margin (16px)
- `mb-2` - Title bottom margin (8px)
- `mb-1` - Subtext margins (4px)
- `mt-8` - Info cards top margin (32px)
- `mt-2` - Card spacing (8px)
- `space-y-4` - Card content spacing, list spacing (16px)
- `space-y-2` - List item spacing (8px)
- `space-y-1` - List item content spacing (4px)
- `gap-6` - Grid gap (24px), icon gap (24px)
- `gap-2` - Icon-title gap (8px)
- `pt-6` - Empty state card top padding (24px)

## Font Weights and Families
- `font-semibold` - Title, table cells
- `font-medium` - Table cells, card titles

## Colors Used (Semantic Tokens)
- `text-muted-foreground` - Subtitles, secondary text, icons, table cells
- `bg-muted` - (implied for empty state)
- `border-border` - Table borders (implied from Table component)

## Hardcoded Values
- `max-w-6xl` - Container max width (72rem / 1152px)
- `h-12 w-12` - Empty state icon size (48px × 48px)
- `h-5 w-5` - Card title icons (20px × 20px)
- `h-4 w-4` - Back button icon (16px × 16px)

## Table Structure
Columns:
1. Date
2. Description (product + invoice # subtext)
3. Amount (uses `mode.font` for monospace)
4. Status (Badge component)
5. Invoice (Download button from InvoicesClient)

## Server-Side Patterns
- ✅ Fetches payments from database (last 50)
- ✅ Auth check with redirect
- ✅ Helper functions for formatting (currency, date, status badge)
- ✅ Conditional rendering (empty state vs table)

## Helper Functions
```typescript
getStatusBadge(status: string) → Badge component
formatCurrency(amount: number) → Intl.NumberFormat
formatDate(date: Date) → Intl.DateTimeFormat
```

## Empty State Pattern
- Icon + heading + description
- Centered in card
- Clear messaging

## Design System Integration
- ✅ Uses `mode.font` for monospace amount display (terminal theme)
- ✅ Uses `mode.radius` for all styled elements
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens

## Client/Server Split
- Server: Data fetching, table rendering
- Client: Download invoice buttons (in `InvoicesClient`)

## Metadata
- ✅ Static metadata export
- Title: "Invoices | Fabrk"
- Description: "View and download your payment invoices and receipts"

## Inconsistencies
- **Status badge variants**: Hardcoded mapping (succeeded→default, failed→outline, else→secondary)
- **Table formatting**: Amount uses `mode.font`, other cells don't
