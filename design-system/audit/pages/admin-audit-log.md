# Admin Audit Log Page Audit

**File**: `src/app/(dashboard)/admin/audit-log/page.tsx`

## Purpose
Immutable audit trail viewer for security-sensitive operations.

## Layout Overview
- **Container**: `space-y-6` (24px vertical spacing)
- **Server Component**: Uses `async` with Suspense
- **Grid**: None - single column

## Key Components Used
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Badge` from `@/components/ui/badge`
- `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`
- `Suspense` for async loading
- `prisma` - Database queries
- `format` from `date-fns` for date formatting
- Icons: `Shield`, `User`, `Building`, `Key`, `Flag`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale
- `text-3xl` - Page title "Audit Log" (note: inconsistent with `text-4xl` on other pages)
- `text-muted-foreground` - Subtitle, table text, user emails, empty state
- `text-xs` - Table cells (timestamps, resource IDs), description text, badge font
- `text-sm` - Table cells (user names), card text, link text, badge text
- `text-warning dark:text-warning` - Security notice heading
- `font-bold` - Page title (tracking-tight), user names
- `font-semibold` - Security notice heading, badge text

## Spacing Patterns
- `space-y-6` - Main container (24px)
- `space-y-1` - User name/email stack (4px)
- `space-y-2` - Card list items (8px)
- `mb-2` - Security notice heading bottom margin (8px)
- `gap-2` - Icon-badge gap (8px)
- `p-4` - Border padding, security notice padding (16px)
- `mt-2` - Metadata disclosure margin (8px)

## Font Weights and Families
- `font-bold` - Page title
- `font-semibold` - Security notice, badges

## Colors Used (Semantic Tokens)
- `text-muted-foreground` - Subtitles, secondary text, table cells
- `text-primary` - Metadata view link
- `text-warning` - Security notice heading
- `hover:underline` - Metadata link hover
- `bg-muted` - Metadata pre block background
- `bg-warning/10` - Security notice background
- `border-warning/20` - Security notice border

## Hardcoded Values
- `h-4 w-4` - All icons (16px × 16px except Security notice icon)
- `h-48` - Loading placeholder height (192px)
- `w-24` - Badge width (96px)
- `max-w-md` - Metadata pre max width (28rem / 448px)

## Helper Functions
```typescript
getActionIcon(action: string) → JSX.Element
  - Maps action prefix to icon (user.* → User, org.* → Building, etc.)

getActionBadgeVariant(action: string) → "default" | "outline" | "secondary"
  - Maps action type to badge variant
```

## Table Structure
Columns:
1. **Timestamp** - Formatted with `date-fns` (yyyy-MM-dd HH:mm:ss), uses `mode.font`
2. **User** - Name + email stacked
3. **Action** - Icon + Badge with uppercased action text
4. **Resource** - Capitalized resource type + truncated ID
5. **Details** - Disclosure widget for metadata JSON

## Metadata Display Pattern
Uses `<details>` HTML element:
- Summary: "View metadata" link
- Content: JSON.stringify with 2-space indent in `<pre>` block
- Scrollable with max-width constraint

## Security Notice
Warning-styled card:
- Yellow/warning theme
- Shield icon
- Explains immutability and retention policy

## Server-Side Query
```typescript
prisma.auditLog.findMany({
  include: {
    user: { select: { id, email, name } }
  },
  orderBy: { createdAt: "desc" },
  take: 100
})
```

## Design System Integration
- ✅ Uses `mode.radius` for cards and badges
- ✅ Uses `mode.font` for monospace timestamps and IDs
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens

## Empty State
Centered text: "No audit logs found"

## Inconsistencies
- **Title size**: Uses `text-3xl` instead of `text-4xl`
- **Badge width**: Fixed `w-24` may truncate long action names
- **Action text**: Uses `.replace(/\./g, " ").toUpperCase()` - adds extra processing
