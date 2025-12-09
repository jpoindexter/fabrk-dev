# Admin Security Logs Page Audit

**File**: `src/app/(dashboard)/admin/security/page.tsx`

## Purpose

Security event monitoring with audit log querying and filtering.

## Layout Overview

- **Container**: `space-y-6` (24px vertical spacing)
- **Client Component**: Uses `"use client"` with hooks
- **Grids**:
  - Summary cards: `grid gap-4 md:grid-cols-2 lg:grid-cols-4`

## Key Components Used

- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`
- `Badge` from `@/components/ui/badge`
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`
- Security functions: `queryAuditLogs`, `getSecuritySummary`, `type AuditLogEntry`
- Icons: `AlertTriangle`, `CheckCircle`, `Info`, `XCircle`
- React: `useState`, `useEffect`, `startTransition`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale

- `text-3xl` - Page title "Security Logs" (note: inconsistent)
- `text-muted-foreground` - Subtitle, icons, table cells, empty state
- `text-xs` - Table cells (timestamps, user emails), Select text
- `text-sm` - Card titles, Select trigger text, table text, badge text, capitalize
- `text-2xl` - Summary stat values (font-bold)
- `font-bold` - Page title (tracking-tight), stat values
- `font-medium` - Card titles
- `font-semibold` - Select value, badge text

## Spacing Patterns

- `space-y-6` - Main container (24px)
- `space-y-0` - Stat card headers (0px - uses flex row)
- `gap-4` - Summary grid (16px), icon-value gaps (16px)
- `gap-1` - Badge icon-text gap (4px)
- `pb-2` - Stat card header bottom padding (8px)
- `py-2` - Select trigger padding vertical (8px)

## Font Weights and Families

- `font-bold` - Page title, stat values
- `font-medium` - Card titles
- `font-semibold` - Select, badges

## Colors Used (Semantic Tokens)

- `text-muted-foreground` - Subtitles, icons, table cells, empty state, center text
- `text-destructive` - Critical/High severity icons, result failure icon
- `text-warning` - High severity (in icon), error result icon
- `text-success` - Success result icon
- `text-info` - Medium severity icon, info result icon
- `border-border` - Table borders, Select borders

## Hardcoded Values

- `h-4 w-4` - All icons (16px × 16px except summary card icons)
- `w-[180px]` - Timestamp column width (180px)
- `w-[140px]` - Select trigger width (140px)
- `w-24` - Badge width (96px)

## Helper Functions

```typescript
formatDate(date: Date): string
  // Intl.DateTimeFormat with dateStyle: "short", timeStyle: "medium"

getSeverityColor(severity: string): "destructive" | "default" | "secondary" | "outline"
  // Maps critical/high → destructive, medium → default, low → secondary

getResultIcon(result: string): React.JSX.Element
  // Maps success/failure/error to colored icons
```

## State Management

```typescript
const [logs, setLogs] = useState<AuditLogEntry[]>([]);
const [severityFilter, setSeverityFilter] = useState<string | undefined>();
const [summary, setSummary] =
  useState<Awaited<ReturnType<typeof getSecuritySummary>>>();
```

## Data Loading

Uses `startTransition` + async function:

- Queries audit logs with filters (severity, limit: 50)
- Loads 7-day security summary
- Updates state after queries complete

## Summary Stats (7 days)

4 cards:

1. Total Events (Info icon)
2. Critical (AlertTriangle destructive)
3. High (AlertTriangle warning)
4. Medium (Info icon)

## Filter Pattern

Select dropdown for severity:

- All Severities (default)
- Critical, High, Medium, Low

## Table Structure

Columns:

1. Timestamp (formatted, monospace via `mode.font`)
2. Event Type (monospace)
3. Action
4. User (email or ID)
5. Result (icon + capitalized text)
6. Severity (Badge with color variant)

## Empty State

Single-row colspan message: "No security events found"

## Design System Integration

- ✅ Uses `mode.radius` for cards, table borders, Select
- ✅ Uses `mode.font` for monospace columns
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens with dynamic variants

## TypeScript

Uses imported type: `AuditLogEntry["severity"]` for type narrowing

## Inconsistencies

- **Title size**: Uses `text-3xl` instead of `text-4xl`
- **Fixed badge width**: `w-24` may truncate longer severity labels
- **Hardcoded column width**: `w-[180px]` for timestamp (Tailwind arbitrary value)
