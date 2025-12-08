# Dashboard Pages Design Audit

> **Location:** `src/app/(dashboard)/`
> **Compliance Score:** 78/100

---

## Summary

The dashboard pages have significant typography and card header violations. While the core layout is sound, most dashboard-specific components lack the terminal aesthetic styling that the design system requires.

---

## Page-by-Page Analysis

### `/dashboard/page.tsx` (Main Dashboard)

**Overall:** Needs improvement - missing terminal styling on child components

#### Components Used:
- `StatsCards` - Missing font-mono
- `RecentActivity` - Missing font-mono
- `AccountStatus` - Missing font-mono
- `QuickActions` - Needs audit
- `DashboardHeader` - Missing font-mono

---

### `/dashboard/components/stats-cards.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 60 | Missing font-mono | `className="text-sm font-medium"` | `className="font-mono text-sm font-medium"` |
| 62 | Missing font-mono | `className="text-2xl font-bold"` | `className="font-mono text-2xl font-bold"` |
| 64 | Missing font-mono | `className="text-muted-foreground ... text-xs"` | `className="font-mono text-muted-foreground ... text-xs"` |
| 49 | Non-terminal CardHeader | Uses `CardHeader` + `CardTitle` | Should use `StyledCardHeader` with `[ [0xXX] TITLE ]` format |

**Recommended Fix:**
```tsx
// Replace CardHeader with:
<StyledCardHeader title={title.toUpperCase().replace(/ /g, '_')} />
```

---

### `/dashboard/components/dashboard-header.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 20 | Missing font-mono on h1 | `className="text-4xl font-semibold tracking-tight"` | `className="font-mono text-4xl font-semibold tracking-tight"` |
| 23 | Missing font-mono on p | `className="text-muted-foreground"` | `className="font-mono text-muted-foreground text-sm"` |

---

### `/dashboard/components/recent-activity.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 72 | Missing font-mono | `className="text-sm font-medium"` | `className="font-mono text-sm font-medium"` |
| 73 | Missing font-mono | `className="text-muted-foreground ... text-xs"` | `className="font-mono text-muted-foreground ... text-xs"` |
| 41 | Non-terminal CardHeader | Uses standard `CardHeader` | Should use `StyledCardHeader` |

---

### `/dashboard/components/account-status.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 25 | Non-terminal CardHeader | Standard `CardHeader` | `StyledCardHeader` |
| 38 | Missing font-mono | `className="text-sm font-medium"` | `className="font-mono text-sm font-medium"` |
| 47 | Missing font-mono | `className="text-sm font-medium"` | `className="font-mono text-sm font-medium"` |
| 55 | Missing font-mono | `className="text-sm font-medium"` | `className="font-mono text-sm font-medium"` |

---

### `/profile/page.tsx`

**Violations:**

| Line | Issue | Expected Fix |
|------|-------|--------------|
| 53 | Non-terminal CardHeader | Replace with `StyledCardHeader` |
| 83 | Non-terminal CardHeader | Replace with `StyledCardHeader` |

---

### `/account/page.tsx`

**Violations:** 8 instances of non-terminal CardHeader

| Lines | Issue |
|-------|-------|
| 75, 97, 108, 119, 130, 151, 157, 163 | All use standard `CardHeader` + `CardTitle` |

**Recommended Approach:** Create a reusable AccountCard wrapper that includes terminal header styling.

---

### `/admin/users/page.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 30 | Missing font-mono on h1 | `className="text-4xl font-semibold tracking-tight"` | Add `font-mono` |
| 31 | Missing font-mono on p | `className="text-muted-foreground"` | Add `font-mono` |

---

## Pattern Issues

### Issue 1: Consistent Page Header Pattern Missing

All dashboard pages should use a consistent header pattern:

```tsx
// Recommended DashboardPageHeader component
<div className="space-y-2">
  <h1 className="font-mono text-4xl font-semibold tracking-tight">
    {title.toUpperCase().replace(/ /g, '_')}
  </h1>
  <p className="font-mono text-sm text-muted-foreground">
    {description}
  </p>
</div>
```

### Issue 2: Card Header Inconsistency

Dashboard cards use the default shadcn `CardHeader`/`CardTitle` pattern instead of the terminal-styled `StyledCardHeader`.

**Current Pattern (Wrong):**
```tsx
<CardHeader>
  <CardTitle className="text-sm font-medium">{title}</CardTitle>
</CardHeader>
```

**Expected Pattern (Correct):**
```tsx
<StyledCardHeader title="CARD_TITLE" />
```

---

## Recommended Fixes

### Quick Win: Add font-mono to Dashboard Layout

In `src/app/(dashboard)/layout.tsx`, add `font-mono` to the main content wrapper:

```tsx
<main className="font-mono ...">
  {children}
</main>
```

This will cascade terminal font to all dashboard children.

### Component Migration

1. Create `DashboardPageHeader` component with terminal styling
2. Replace all `CardHeader`/`CardTitle` with `StyledCardHeader`
3. Audit all text elements for `font-mono` class

---

## Files to Update

| File | Priority | Estimated Changes |
|------|----------|-------------------|
| `stats-cards.tsx` | High | 4 class changes + CardHeader |
| `dashboard-header.tsx` | High | 2 class changes |
| `recent-activity.tsx` | High | 2 class changes + CardHeader |
| `account-status.tsx` | High | 3 class changes + CardHeader |
| `profile/page.tsx` | Medium | 2 CardHeader replacements |
| `account/page.tsx` | Medium | 8 CardHeader replacements |
| `admin/users/page.tsx` | Medium | 2 class changes |
