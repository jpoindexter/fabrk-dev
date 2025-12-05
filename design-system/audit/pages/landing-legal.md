# Landing Page Audit - Legal Pages

**Files:**
- `/src/app/(legal)/privacy/page.tsx`
- `/src/app/(legal)/terms/page.tsx`
- `/src/app/(legal)/refund/page.tsx`
- `/src/app/(legal)/cookies/page.tsx`

**Pattern:** NO template usage - All custom layouts

---

## Shared Architecture Pattern

### Common Structure
```tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16 font-mono">
      {/* Header */}
      {/* Introduction */}
      {/* Sections */}
      {/* Related Links */}
    </main>
  );
}
```

### Shared Characteristics
1. **All client components** - `"use client"` for animations
2. **No MarketingPageTemplate** - Custom layout every page
3. **No Navigation/Footer** - Standalone pages
4. **Same container** - `max-w-4xl px-6 py-16 font-mono`
5. **Framer Motion** - Consistent animation patterns

---

## Layout Breakdown

### Container
```tsx
<main className="container mx-auto max-w-4xl px-6 py-16 font-mono">
```

**Observations:**
- Width: `max-w-4xl` (narrower than marketing pages' `max-w-7xl`)
- Padding: `px-6 py-16` (no responsive variants like other pages)
- Typography: `font-mono` applied to entire container

---

## Header Pattern (All Pages)

### Structure
```tsx
<div className="mb-12 text-center">
  {/* Badge */}
  <motion.div {...} className="mb-6">
    <span className="inline-block border border-border bg-card px-4 py-1 text-xs text-muted-foreground">
      [ [0x00] LEGAL ] PAGE_NAME
    </span>
  </motion.div>

  {/* Title */}
  <motion.div {...}>
    <h1 className="mb-2 text-sm text-muted-foreground">FABRK_LEGAL:</h1>
    <h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
      PAGE_TITLE
    </h2>
  </motion.div>

  {/* Last Updated */}
  <motion.div {...}>
    <span className="text-xs text-muted-foreground">LAST_UPDATED: November 26, 2025</span>
  </motion.div>
</div>
```

### Animation Pattern
```tsx
initial={{ opacity: 0, scale: 0.95 }}  // Badge
initial={{ opacity: 0, y: 12 }}        // Title
transition={{ duration: 0.5/0.6, delay: 0/0.1/0.2 }}
```

**Stagger delays:** 0s → 0.1s → 0.2s

---

## Introduction Block Pattern

### Structure
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="mb-12 border border-border bg-card p-6"
>
  <div className="mb-2 text-xs text-muted-foreground">
    [ [0x01] OVERVIEW/NOTICE ]────────────────────────
  </div>
  <p className="text-sm text-muted-foreground">
    Introduction text...
  </p>
</motion.div>
```

### Variations
- **Privacy/Terms/Cookies:** "OVERVIEW" or "NOTICE"
- **Refund:** Uses `border-destructive/30 bg-destructive/5` (warning style)

---

## Section Pattern

### Standard Section
```tsx
<section className="border border-border bg-card p-6">
  <div className="flex items-center gap-2 mb-4">
    <span className="text-xs text-muted-foreground">[0x10]</span>
    <h2 className="text-lg font-bold">SECTION_TITLE</h2>
  </div>

  {/* Content */}
</section>
```

### Spacing
- **Between sections:** `space-y-6` (24px) or `space-y-8` (32px)
- **Section padding:** `p-6` (24px)
- **Header margin:** `mb-4` (16px)

### Section Hex Codes
- **0x10** - First major section
- **0x20** - Second section
- **0x30** - Third section
- ...increments by 0x10...
- **0xA0**, **0xB0**, **0xC0** - Final sections

**Pattern:** Hex increments create visual hierarchy

---

## Typography Patterns

### Headers
```tsx
<h2 className="text-lg font-bold">SECTION_TITLE</h2>           // Main sections
<h3 className="text-sm font-semibold mb-2">[1.1] SUB_SECTION</h3>  // Subsections
```

### Body Text
```tsx
<p className="text-sm text-muted-foreground">Body text...</p>
<span className="text-foreground">Highlighted term</span>
```

### Lists
```tsx
<ul className="space-y-1 text-sm text-muted-foreground pl-4">
  <li>├─ <span className="text-foreground">LABEL:</span> Description</li>
  <li>├─ Item 2</li>
  <li>└─ Last item (corner branch)</li>
</ul>
```

**Tree symbols:** `├─` (branch), `└─` (last branch)

### Links
```tsx
<Link href="/path" className="text-primary hover:underline">
  LINK_TEXT
</Link>
```

---

## Special Components

### 1. Tables (Cookies Page Only)

```tsx
<div className="border border-border bg-background p-4 overflow-x-auto">
  <table className="w-full text-xs">
    <thead>
      <tr className="border-b border-border">
        <th className="text-left py-2 pr-4 text-muted-foreground">COLUMN</th>
      </tr>
    </thead>
    <tbody className="text-muted-foreground">
      <tr className="border-b border-border/50">
        <td className="py-2 pr-4 text-foreground">Value</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Styling:**
- Container: `bg-background` (nested contrast)
- Header: `border-b border-border`
- Rows: `border-b border-border/50` (lighter dividers)
- Font: `text-xs`

### 2. Warning/Destructive Sections (Refund Page)

```tsx
<section className="border border-destructive/30 bg-destructive/5 p-6">
  <p className="text-xs text-foreground">
    <span className="text-destructive font-semibold">WARNING:</span> Text
  </p>
</section>
```

**Colors:**
- Border: `border-destructive/30` (30% opacity)
- Background: `bg-destructive/5` (5% opacity)
- Text: `text-destructive` (full color)

### 3. Checkmark/X Lists (Terms/Refund)

```tsx
<li>
  ├─ <span className="text-destructive">✗</span> Prohibited action
</li>
<li>
  ├─ <span className="text-success">✓</span> Allowed action
</li>
```

---

## Related Links Footer

### Structure (All Pages)
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="mt-12 border border-border bg-card p-6"
>
  <span className="block mb-4 text-xs text-muted-foreground">
    [ RELATED_DOCUMENTS ]
  </span>
  <div className="flex flex-wrap gap-4 text-xs">
    <Link href="/terms" className="text-primary hover:underline">
      &gt; TERMS_OF_SERVICE
    </Link>
    {/* More links */}
  </div>
</motion.div>
```

**Animation:** `whileInView` instead of `animate` (lazy load)

---

## Page-Specific Patterns

### 1. Privacy Page
**File:** `/src/app/(legal)/privacy/page.tsx`

**Unique elements:**
- Most comprehensive (360 lines)
- GDPR and CCPA rights sections
- Data retention timelines
- Service provider list

**Section count:** 12 sections (0x10 to 0xC0)

---

### 2. Terms Page
**File:** `/src/app/(legal)/terms/page.tsx`

**Unique elements:**
- License restrictions with `✗` symbols
- Liability disclaimers in caps
- Per-seat licensing details
- Governing law section

**Section count:** 13 sections (0x10 to 0xC0)

**Typography variation:**
```tsx
<p className="text-muted-foreground text-sm">
  FABRK IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES...
</p>
```

Uses ALL CAPS for legal emphasis.

---

### 3. Refund Page
**File:** `/src/app/(legal)/refund/page.tsx`

**Unique elements:**
- Warning banner at top (destructive colors)
- Chargeback warning section (destructive/5 bg)
- EU consumer rights explanation
- Pre-purchase checklist with links

**Special intro:**
```tsx
className="mb-12 border border-destructive/30 bg-destructive/5 p-6"
```

**Section count:** 10 sections (0x10 to 0xA0)

---

### 4. Cookies Page
**File:** `/src/app/(legal)/cookies/page.tsx`

**Unique elements:**
- Cookie tables (4 tables)
- Browser instructions list
- Third-party policy links
- Cookie management CTA box

**Special CTA block:**
```tsx
<motion.div
  {...}
  className="mt-12 border border-primary/30 bg-primary/5 p-6"
>
  <h3 className="text-sm font-semibold mb-2">[MANAGE_PREFERENCES]</h3>
  <Link href="/settings" className="text-xs text-primary hover:underline">
    &gt; COOKIE_SETTINGS
  </Link>
</motion.div>
```

Uses `bg-primary/5` instead of `bg-card` for visual distinction.

**Section count:** 6 sections (0x10 to 0x60)

---

## Design System Compliance

### ✅ EXCELLENT
1. **100% semantic colors** - No hardcoded values
2. **Consistent terminal aesthetic** - Hex codes, brackets, tree symbols
3. **Monospace typography** - `font-mono` on entire container
4. **Animation patterns** - Framer Motion with viewport awareness
5. **Rounded-none compliance** - All borders sharp ✓
6. **Typography hierarchy** - Clear lg/sm/xs scale

### ⚠️ OBSERVATIONS

#### 1. No Template Usage
- Every page manually structures layout
- No shared Navigation/Footer components
- Could benefit from `LegalPageTemplate`

#### 2. Padding Inconsistency
- Legal pages: `px-6 py-16` (static)
- Marketing pages: `px-6 sm:px-8 lg:px-12` (responsive)
- Different design philosophy

#### 3. Container Width
- Legal: `max-w-4xl` (896px)
- Marketing: `max-w-7xl` (1280px)
- **Intentional** - Legal pages are text-heavy

#### 4. Section Spacing Variance
- Privacy/Terms: `space-y-6` (24px)
- Refund: `space-y-6` (24px)
- Cookies: `space-y-6` (24px)
- **Status:** Consistent within legal pages ✓

---

## Color Token Usage

### Semantic Tokens Used
```tsx
// Backgrounds
bg-background, bg-card, bg-muted
bg-destructive/5, bg-destructive/10
bg-primary/5, bg-primary/10
bg-success/10, bg-warning/10

// Borders
border-border
border-destructive/30
border-primary/30
border-success/30

// Text
text-foreground
text-muted-foreground
text-primary
text-destructive
text-success
text-warning
text-warning-foreground
```

**All semantic - No hardcoded colors** ✓

---

## Animation Performance

### Pattern Analysis
```tsx
// Header animations
initial={{ opacity: 0, scale: 0.95 }}  // Badge
initial={{ opacity: 0, y: 12 }}        // Titles

// Section animations
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

**Observations:**
1. **Stagger pattern:** 0s, 0.1s, 0.2s, 0.3s for header
2. **Viewport awareness:** `whileInView` for sections (lazy animation)
3. **Once flag:** Animations don't repeat on scroll (performance)

---

## Accessibility Notes

### Link Patterns
```tsx
<Link href="/path" className="text-primary hover:underline">
```

**Good:** Hover states for all links

### External Links
```tsx
<a href="https://..." target="_blank" rel="noopener noreferrer">
```

**Good:** Security attributes present

### Typography Contrast
- `text-muted-foreground` on `bg-card` - Needs contrast check
- `text-destructive` on `bg-destructive/5` - Needs contrast check

---

## Recommendations

### 1. Create LegalPageTemplate
```tsx
<LegalPageTemplate
  badge="PRIVACY_POLICY"
  title="Privacy Policy"
  lastUpdated="November 26, 2025"
  sections={[...]}
  relatedLinks={[...]}
/>
```

Benefits:
- Reduces duplication
- Ensures consistency
- Easier to update all legal pages

### 2. Add Navigation/Footer
- Legal pages feel disconnected without site nav
- Users can't easily return to main site
- Consider adding minimal nav bar

### 3. Standardize Section Spacing
- Current: `space-y-6` everywhere
- Consider: `space-y-8` for better breathing room

### 4. Contrast Audit
- Test all color combinations for WCAG AA
- Especially muted text on card backgrounds

---

## Metrics

| Metric | Privacy | Terms | Refund | Cookies |
|--------|---------|-------|--------|---------|
| **Lines of Code** | 360 | 442 | 277 | 356 |
| **Sections** | 12 | 13 | 10 | 6 |
| **Tables** | 0 | 0 | 0 | 4 |
| **Lists** | 15+ | 20+ | 10+ | 8+ |
| **Links** | 8+ | 5+ | 10+ | 8+ |
| **Animations** | 15+ | 15+ | 15+ | 15+ |

**Total LOC:** 1,435 lines across 4 legal pages

---

## Cross-Page Consistency

### ✅ CONSISTENT
1. Container layout
2. Header pattern
3. Section hex codes
4. Typography scale
5. Color tokens
6. Animation delays
7. Related links footer

### ⚠️ MINOR VARIATIONS
1. Intro block styling (warning vs normal)
2. Special components (tables, CTAs)
3. Section spacing (6 vs 8 in some pages)

**Status:** Very consistent overall ✓

---

## Next Steps

1. Create LegalPageTemplate component
2. Audit related link correctness (all pages link to each other)
3. Contrast ratio testing for all color combinations
4. Consider adding breadcrumb navigation
5. Responsive table testing (cookies page)
