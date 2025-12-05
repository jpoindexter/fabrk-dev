# Marketing Pages Design Audit

> **Location:** `src/app/about/`, `src/app/features/`, `src/app/contact/`
> **Compliance Score:** 85/100

---

## Summary

The marketing pages are mostly compliant but have typography violations where headings lack the `font-mono` class. The terminal aesthetic is partially applied.

---

## About Page (`/about/`)

### `/about/components/about-hero.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 31 | Missing font-mono | `className="mb-2 text-sm text-muted-foreground"` | Add `font-mono` |
| 34 | Missing font-mono | `className="mb-6 text-3xl font-bold tracking-tight lg:text-4xl"` | Add `font-mono` |

---

### `/about/components/mission-section.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 43 | Missing font-mono | `className="text-2xl font-bold lg:text-3xl"` | Add `font-mono` |

---

### `/about/components/story-section.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 50 | Missing font-mono | `className="text-2xl font-bold lg:text-3xl mb-4"` | Add `font-mono` |

---

### `/about/components/values-section.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 76 | Missing font-mono | `className="text-2xl font-bold lg:text-3xl mb-4"` | Add `font-mono` |
| 95 | Missing font-mono | `className="text-sm font-semibold mb-2"` | Add `font-mono` |

---

## Features Page (`/features/`)

### `/features/components/features-hero.tsx`

**Status:** Needs audit for font-mono compliance

---

### `/features/components/quality-section.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 31 | Missing font-mono | `className="text-2xl font-bold tracking-tight mb-4"` | Add `font-mono` |
| 43 | Missing font-mono | `className="text-lg font-bold mb-2"` | Add `font-mono` |
| 54 | Missing font-mono | `className="text-lg font-bold mb-2"` | Add `font-mono` |
| 65 | Missing font-mono | `className="text-lg font-bold mb-2"` | Add `font-mono` |

---

### `/features/components/feature-category-card.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 45 | Missing font-mono | `className="text-2xl font-bold tracking-tight"` | Add `font-mono` |

---

### `/features/components/category-navigation.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 20 | Missing font-mono | Navigation text missing terminal font | Add `font-mono` |

---

## Contact Page (`/contact/`)

### `/contact/components/page-header.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 21 | Missing font-mono | `className="text-2xl font-bold lg:text-3xl mb-2"` | Add `font-mono` |
| 22 | Missing font-mono | `className="text-sm text-muted-foreground"` | Add `font-mono` |

---

### `/contact/components/faq-section.tsx`

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 27 | Missing font-mono | `className="mb-2 text-xl font-bold"` | Add `font-mono` |
| 52 | Missing font-mono | AccordionTrigger text | Add `font-mono` |

---

## Pattern Analysis

### Common Issue: Heading Elements Missing font-mono

All marketing page headings (`h1`, `h2`, `h3`) should include `font-mono` for terminal aesthetic:

```tsx
// Current (Wrong)
<h2 className="text-2xl font-bold tracking-tight">SECTION_TITLE</h2>

// Expected (Correct)
<h2 className="font-mono text-2xl font-bold tracking-tight">SECTION_TITLE</h2>
```

### Compliant Patterns Found

- Terminal-style section labels (`[0xXX] LABEL`)
- Uppercase snake_case titles
- Border styling using design tokens
- Color token usage

---

## Recommended Fixes

### Option 1: Add font-mono to Each Heading

Update each heading element individually:

```tsx
// Before
<h2 className="text-2xl font-bold">TITLE</h2>

// After
<h2 className="font-mono text-2xl font-bold">TITLE</h2>
```

### Option 2: Create Marketing Heading Components

Create reusable heading components with terminal styling baked in:

```tsx
// components/marketing/marketing-heading.tsx
export function MarketingH1({ children, className }: Props) {
  return (
    <h1 className={cn(
      "font-mono text-3xl font-bold tracking-tight lg:text-4xl",
      className
    )}>
      {children}
    </h1>
  );
}

export function MarketingH2({ children, className }: Props) {
  return (
    <h2 className={cn(
      "font-mono text-2xl font-bold tracking-tight",
      className
    )}>
      {children}
    </h2>
  );
}
```

---

## Files to Update

| File | Priority | Changes Needed |
|------|----------|----------------|
| `about-hero.tsx` | High | 2 font-mono additions |
| `mission-section.tsx` | High | 1 font-mono addition |
| `story-section.tsx` | High | 1 font-mono addition |
| `values-section.tsx` | High | 2 font-mono additions |
| `quality-section.tsx` | High | 4 font-mono additions |
| `feature-category-card.tsx` | Medium | 1 font-mono addition |
| `category-navigation.tsx` | Medium | 1 font-mono addition |
| `page-header.tsx` | High | 2 font-mono additions |
| `faq-section.tsx` | Medium | 2 font-mono additions |

**Total:** ~16 class additions across 9 files
