# Examples Admin Page Audit

**File**: `src/app/(dashboard)/examples/admin/page.tsx`

## Purpose

Demonstration of DataTable component with user management example.

## Layout Overview

- **Container**: `space-y-6` (24px vertical spacing)
- **Client Component**: Uses `"use client"` for table interactivity
- **Grids**:
  - Stats cards: `grid gap-4 md:grid-cols-3`

## Key Components Used

- `DataTable` from `@/components/ui/data-table`
- `DataTableColumnHeader` from `@/components/ui/data-table/data-table-column-header`
- `Button`, `DropdownMenu` components
- TanStack Table: `ColumnDef` type
- Icons: `MoreHorizontal`, `Mail`, `Shield`, `User`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale

- `text-foreground` - Explicit text color (title, user names, stats, labels)
- `text-muted-foreground` - Secondary text (subtitle, emails, dates)
- `text-3xl` - Page title "User Management"
- `text-sm` - Subtitle, card labels, table text, dropdown items
- `text-xs` - Status badges, role badges
- `text-2xl` - Stat values (numbers only, not currency)
- `font-bold` - Page title, user names, stat values
- `font-medium` - User names in table
- `font-semibold` - Status badges, role badges

## Spacing Patterns

- `space-y-6` - Main container (24px)
- `gap-4` - Stats grid (16px)
- `gap-2` - Icon-text gaps, status indicator gaps (8px)
- `p-6` - Card padding (24px)

## Font Weights and Families

- `font-bold` - Page title, stat values
- `font-medium` - User names
- `font-semibold` - Badges

## Colors Used (Semantic Tokens)

- `text-foreground` - Primary text (explicitly set)
- `text-muted-foreground` - Secondary text, icons
- `text-primary` - Admin role badges, active users stat
- `text-success` - Active status
- `text-warning` - Pending status (inferred from pattern)
- `text-destructive` - Inactive status, delete menu item
- `bg-card` - Card backgrounds
- `bg-primary/10` - User avatar backgrounds
- `bg-primary/20` - Admin role badge background
- `bg-muted` - Member role background
- `bg-success/20` - Active status background
- `bg-warning/20` - Pending status background
- `bg-destructive/20` - Inactive status background
- `text-success-foreground`, `text-warning-foreground`, `text-destructive-foreground` - Status text colors
- `bg-primary text-primary-foreground hover:bg-primary/90` - Add button
- `border-border` - All borders
- `hover:bg-primary text-primary-foreground` - Button hover (Add User button)

## Hardcoded Values

- `h-8 w-8` - Avatar containers (32px × 32px)
- `h-4 w-4` - All icons (16px × 16px)
- `h-8 w-8 p-0` - Dropdown menu trigger button (32px × 32px, no padding)

## Mock Data

Hardcoded array of 5 users with:

- id, name, email, role (USER/ADMIN), status (active/inactive/pending), createdAt

## Column Definitions

Uses TanStack Table `ColumnDef<User>[]`:

1. **Name column**:
   - Sortable with `DataTableColumnHeader`
   - Avatar (User icon in primary/10 background) + name
   - Uses `mode.radius` for avatar

2. **Email column**:
   - Sortable
   - Mail icon + email text
   - Muted foreground color

3. **Role column**:
   - Sortable
   - Shield icon + badge
   - Conditional styling: ADMIN → primary, USER → muted
   - Uses `mode.radius` for badge

4. **Status column**:
   - Sortable
   - Badge with color variants:
     - active → success (green)
     - pending → warning (yellow)
     - inactive → destructive (red)
   - Uses `mode.radius` for badge

5. **createdAt column** (Joined):
   - Sortable
   - Muted foreground

6. **actions column**:
   - Dropdown menu with MoreHorizontal icon
   - Actions: Copy ID, View, Edit, Delete
   - Delete item has destructive text color

## Stats Cards Pattern

3 cards showing:

1. Total Users count
2. Active Users (success color)
3. Admins (primary color)

Calculated from mock data with `.filter()`

## DataTable Props

```typescript
<DataTable
  columns={columns}
  data={users}
  searchKey="name"
  searchPlaceholder="Search users..."
  onRowClick={(_user) => { /* handle */ }}
/>
```

## Design System Integration

- ✅ Uses `mode.radius` for avatars, badges, cards
- ✅ Uses `cn()` utility with template literals
- ✅ Semantic color tokens throughout
- ❌ Uses `bg-primary text-primary-foreground` instead of Button component variant
- ❌ Uses template literals for conditional classes instead of `cn()` in some places

## Template Literal Pattern

Multiple instances of:

```typescript
className={`... ${condition ? "class-a" : "class-b"}`}
```

Instead of cleaner `cn()` pattern

## Inconsistencies

- **Explicit text-foreground**: Most pages rely on inherited color
- **Template literals**: Mixes `cn()` and template literals for conditional classes
- **Button styling**: Inline classes instead of variant prop
- **No server data**: All mock data (appropriate for example)
