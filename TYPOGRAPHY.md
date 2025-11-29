# Typography Design System

Complete audit of all typography styles used across the Fabrk codebase.

---

## Table of Contents

1. [Base UI Components](#base-ui-components)
2. [CSS Design System (globals.css)](#css-design-system-globalscss)
3. [Documentation Pages](#documentation-pages)
4. [Marketing Pages](#marketing-pages)
5. [Legal Pages](#legal-pages)
6. [Dashboard Pages](#dashboard-pages)
7. [Style Usage Statistics](#style-usage-statistics)

---

## Base UI Components

### Typography Component (`src/components/ui/typography.tsx`)

Centralized typography system with reusable components:

| Component | Size | Weight | Color | Line Height | Usage |
|-----------|------|--------|-------|-------------|-------|
| `H1` | text-4xl / lg:text-6xl | font-bold | text-foreground | leading-tight | Page titles, hero headings |
| `H2` | text-3xl / md:text-4xl | font-bold | text-foreground | leading-tight | Section headings |
| `H3` | text-xl | font-semibold | text-foreground | leading-tight | Subsection headings |
| `H4` | text-lg | font-semibold | text-foreground | leading-tight | Minor headings |
| `Body` | text-base | font-normal | text-foreground | leading-relaxed | Main content |
| `BodyMuted` | text-base | font-normal | text-muted-foreground | leading-relaxed | Supporting text |
| `Lead` | text-lg | font-normal | text-foreground | leading-relaxed | Introductions |
| `Small` | text-sm | font-normal | text-muted-foreground | leading-relaxed | Fine print |
| `Code` | text-sm | font-mono | inherit | inherit | Inline code |
| `Strong` | inherit | font-semibold | inherit | inherit | Emphasis |
| `Link` | inherit | inherit | text-primary | inherit | Inline links |
| `List` | text-base | inherit | text-foreground | leading-relaxed | Bullet/number lists |

---

## CSS Design System (globals.css)

### Typography Utility Classes

```css
/* Location: src/app/globals.css lines 969-1001 */

.heading-section {
  @apply font-mono text-lg font-bold text-primary;
}

.heading-subsection {
  @apply font-mono text-base font-semibold text-foreground;
}

.body-text {
  @apply font-mono text-sm text-muted-foreground leading-relaxed;
}

.docs-h2 {
  @apply font-mono text-lg font-bold text-primary mt-8 mb-4;
}

.docs-h3 {
  @apply font-mono text-base font-semibold text-foreground mb-2;
}

.docs-body {
  @apply font-mono text-sm text-muted-foreground leading-relaxed;
}

.section-spacing {
  @apply space-y-4; /* 16px between heading and content */
}

.section-spacing-lg {
  @apply space-y-16; /* 64px between major sections */
}
```

### Terminal Styling Classes

```css
/* Location: src/app/globals.css lines 862-960 */

.terminal-label {
  font-family: var(--font-jetbrains-mono), monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.terminal-status {
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid oklch(var(--border));
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Font Families

```css
/* Location: src/app/globals.css lines 73-75 */
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
```

---

## Documentation Pages

### Standard Docs Typography Pattern

All 55 documentation pages follow this pattern:

#### Page Header
```tsx
<div className="space-y-4">
  <div className="inline-block border border-border bg-card px-3 py-1">
    <span className="font-mono text-sm text-muted-foreground">[ [0xXX] SECTION ] PAGE_NAME</span>
  </div>
  <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">PAGE_TITLE</h1>
  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
    &gt; Page description text
  </p>
</div>
```

#### Section Headings (h2)
```tsx
<h2 className="font-mono text-lg font-bold text-primary">SECTION_TITLE</h2>
```

#### Subsection Headings (h3)
```tsx
<h3 className="font-mono text-base font-semibold text-foreground">SUBSECTION_TITLE</h3>
```

#### Body Text
```tsx
<p className="font-mono text-sm text-muted-foreground leading-relaxed">
  Content text...
</p>
```

#### Lists
```tsx
<ul className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
  <li>├─ Item with tree structure</li>
  <li>└─ Last item</li>
</ul>
```

#### Inline Code
```tsx
<code className="bg-muted px-1.5 py-0.5 font-mono text-xs">code snippet</code>
```

#### Step Numbers
```tsx
<span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">1</span>
```

### Section Spacing
- Outer container: `space-y-16` (64px between major sections)
- Inner sections: `space-y-4` (16px between heading and content)
- Step sections: `space-y-10` (40px between steps)

### Files Using This Pattern
- `src/app/docs/getting-started/page.tsx`
- `src/app/docs/architecture/page.tsx`
- `src/app/docs/features/*.tsx` (17 pages)
- `src/app/docs/tutorials/*.tsx` (8 pages)
- `src/app/docs/deployment/*.tsx` (3 pages)
- `src/app/docs/security/*.tsx` (6 pages)
- `src/app/docs/components/*.tsx` (14 pages)
- `src/app/docs/extras/*.tsx` (2 pages)
- `src/app/docs/launch/checklist/page.tsx`

---

## Marketing Pages

### Landing Page (`src/app/page.tsx`)

Uses home components in `src/components/home/`:

| Element | Style |
|---------|-------|
| Hero h1 | `text-4xl font-bold tracking-tight lg:text-6xl` |
| Hero subtitle | `text-lg text-muted-foreground` |
| Section h2 | `text-3xl font-bold tracking-tight lg:text-4xl` |
| Body text | `text-sm text-muted-foreground` |

### Pricing Page (`src/app/pricing/page.tsx`)

```tsx
<h1 className="mb-4 font-mono text-3xl font-bold tracking-tight lg:text-4xl">
<p className="mx-auto max-w-2xl font-mono text-sm text-muted-foreground">
```

### Features Page (`src/app/features/page.tsx`)

```tsx
<h1 className="mb-2 text-sm text-muted-foreground">  /* Category label */
<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-4xl">  /* Main title */
<h2 className="text-2xl font-bold tracking-tight">  /* Section headers */
<h3 className="text-lg font-bold mb-2">  /* Card headers */
<p className="text-sm text-muted-foreground">  /* Body text */
<span className="text-xs text-muted-foreground">  /* Labels */
```

### About Page (`src/app/about/page.tsx`)

```tsx
<h1 className="mb-2 text-sm text-muted-foreground">  /* Eyebrow label */
<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-4xl">  /* Hero title */
<h2 className="text-2xl font-bold lg:text-3xl">  /* Section titles */
<h2 className="text-2xl font-bold lg:text-3xl mb-4">  /* Section titles with margin */
```

### Contact Page (`src/app/contact/page.tsx`)

```tsx
<h1 className="text-2xl font-bold lg:text-3xl mb-2">CONTACT_US</h1>
<h2 className="text-xl font-bold mb-2">  /* FAQ header */
<p className="text-sm text-muted-foreground">  /* Body text */
```

### Templates Page (`src/app/templates/page.tsx`)

```tsx
<h1 className="text-4xl font-bold">Template Gallery</h1>
```

---

## Legal Pages

All legal pages follow identical terminal-style pattern:

### Location
- `src/app/(legal)/privacy/page.tsx`
- `src/app/(legal)/terms/page.tsx`
- `src/app/(legal)/cookies/page.tsx`
- `src/app/(legal)/refund/page.tsx`

### Typography Pattern

```tsx
/* Page header */
<span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
  [FABRK_LEGAL]
</span>

<h1 className="mb-2 text-sm text-muted-foreground">FABRK_LEGAL:</h1>
<h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">PAGE_TITLE</h2>
<span className="text-xs text-muted-foreground">LAST_UPDATED: Date</span>

/* Section headers */
<div className="mb-2 text-xs text-muted-foreground">[SECTION_HEX]</div>
<span className="text-xs text-muted-foreground">[0xXX]</span>
<h2 className="text-lg font-bold">SECTION_TITLE</h2>

/* Subsection headers */
<h3 className="text-sm font-semibold mb-2">[X.X] SUBSECTION_TITLE</h3>

/* Body text */
<p className="text-xs text-muted-foreground">Content...</p>

/* Lists */
<ul className="space-y-1 text-xs text-muted-foreground pl-4">
  <li>├─ Item</li>
</ul>

/* Footer navigation */
<div className="flex flex-wrap gap-4 text-xs">
```

---

## Dashboard Pages

### Location
- `src/app/(dashboard)/admin/*.tsx`
- `src/app/(dashboard)/billing/*.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/app/(dashboard)/profile/page.tsx`
- `src/app/(dashboard)/settings/*.tsx`
- `src/app/(dashboard)/organizations/**/*.tsx`

### Common Dashboard Patterns

```tsx
/* Page title */
<h1 className="text-2xl font-bold">Page Title</h1>

/* Section headers */
<h2 className="text-lg font-semibold">Section Title</h2>

/* Card titles */
<h3 className="font-semibold">Card Title</h3>

/* Body text */
<p className="text-sm text-muted-foreground">Description text</p>

/* Labels */
<span className="text-xs text-muted-foreground">Label</span>
```

---

## Style Usage Statistics

### Text Sizes (Total Occurrences)

| Class | Count | Percentage |
|-------|-------|------------|
| `text-sm` | 1,481 | 36.9% |
| `text-xs` | 1,353 | 33.7% |
| `text-lg` | 505 | 12.6% |
| `text-base` | 254 | 6.3% |
| `text-3xl` | 152 | 3.8% |
| `text-2xl` | 150 | 3.7% |
| `text-4xl` | 62 | 1.5% |
| `text-xl` | 26 | 0.6% |
| `text-5xl` | 13 | 0.3% |
| `text-6xl` | 6 | 0.1% |

### Font Weights (Total Occurrences)

| Class | Count |
|-------|-------|
| `font-mono` | 2,666 |
| `font-bold` | 782 |
| `font-semibold` | 641 |
| `font-medium` | 258 |
| `font-normal` | 49 |
| `font-black` | 33 |
| `font-sans` | 3 |

### Text Colors (Total Occurrences)

| Class | Count |
|-------|-------|
| `text-muted-foreground` | 2,178 |
| `text-primary` | 689 |
| `text-foreground` | 611 |
| `text-success` | 208 |
| `text-destructive` | 179 |
| `text-primary-foreground` | 173 |
| `text-warning` | 30 |
| `text-accent-foreground` | 24 |
| `text-card-foreground` | 11 |
| `text-info` | 10 |
| `text-secondary-foreground` | 8 |
| `text-popover-foreground` | 5 |

### Line Heights (Total Occurrences)

| Class | Count |
|-------|-------|
| `leading-relaxed` | 460 |
| `leading-tight` | 19 |
| `leading-none` | 10 |
| `leading-snug` | 3 |
| `leading-normal` | 1 |

### Letter Spacing (Total Occurrences)

| Class | Count |
|-------|-------|
| `tracking-tight` | 130 |
| `tracking-widest` | 4 |
| `tracking-wider` | 4 |
| `tracking-wide` | 4 |
| `tracking-tighter` | 1 |
| `tracking-normal` | 1 |

### Vertical Spacing (Total Occurrences)

| Class | Count |
|-------|-------|
| `space-y-4` | 571 |
| `space-y-1` | 211 |
| `space-y-2` | 200 |
| `space-y-6` | 105 |
| `space-y-16` | 62 |
| `space-y-0` | 36 |
| `space-y-3` | 33 |
| `space-y-8` | 14 |
| `space-y-12` | 10 |
| `space-y-10` | 1 |

### Margin Bottom (Top 10)

| Class | Count |
|-------|-------|
| `mb-4` | 444 |
| `mb-2` | 238 |
| `mb-3` | 134 |
| `mb-8` | 80 |
| `mb-6` | 56 |
| `mb-1` | 50 |
| `mb-12` | 37 |
| `mb-16` | 8 |

### Gap Spacing (Top 10)

| Class | Count |
|-------|-------|
| `gap-2` | 485 |
| `gap-3` | 175 |
| `gap-4` | 145 |
| `gap-1` | 131 |
| `gap-6` | 60 |
| `gap-8` | 12 |
| `gap-12` | 10 |
| `gap-16` | 6 |

### Heading Element Usage

| Element | Count |
|---------|-------|
| `<h2>` | 483 |
| `<h3>` | 424 |
| `<h1>` | 142 |
| `<h4>` | 32 |
| `<h5>` | 2 |
| `<h6>` | 2 |

---

## Recommendations

### Inconsistencies Found

1. **Legal pages use `text-xs` body text** while docs use `text-sm`
2. **Marketing pages lack `font-mono`** in most places (terminal aesthetic missing)
3. **h1 usage varies** - some pages use `text-2xl`, others `text-4xl`
4. **h2 colors vary** - docs use `text-primary`, marketing uses `text-foreground`
5. **h3 weight varies** - some use `font-semibold`, some `font-bold`

### Standardization Targets

| Element | Docs Style | Marketing Style | Recommended |
|---------|------------|-----------------|-------------|
| h1 | `text-2xl font-bold tracking-tight lg:text-3xl font-mono` | `text-3xl/4xl font-bold tracking-tight lg:text-4xl/6xl` | Keep both (context-appropriate) |
| h2 | `text-lg font-bold text-primary font-mono` | `text-2xl/3xl font-bold tracking-tight` | Add `text-primary` to marketing |
| h3 | `text-base font-semibold text-foreground font-mono` | `text-lg font-bold` | Standardize to `font-semibold text-foreground` |
| body | `text-sm text-muted-foreground font-mono` | `text-sm text-muted-foreground` | Add `font-mono` to marketing |
| code | `bg-muted px-1.5 py-0.5 font-mono text-xs` | Same | Consistent |

---

## Files Reference

### Base UI Components
- `src/components/ui/typography.tsx` - Reusable typography components
- `src/components/ui/typography.stories.tsx` - Storybook stories

### CSS
- `src/app/globals.css` - Typography utility classes and terminal styling

### Documentation (55 pages)
- `src/app/docs/page.tsx` - Docs index
- `src/app/docs/getting-started/page.tsx`
- `src/app/docs/architecture/page.tsx`
- `src/app/docs/features/*.tsx` (17 files)
- `src/app/docs/tutorials/*.tsx` (8 files)
- `src/app/docs/deployment/*.tsx` (3 files)
- `src/app/docs/security/*.tsx` (6 files)
- `src/app/docs/components/*.tsx` (14 files)
- `src/app/docs/extras/*.tsx` (2 files)
- `src/app/docs/launch/checklist/page.tsx`

### Marketing
- `src/app/page.tsx` - Landing page
- `src/app/pricing/page.tsx`
- `src/app/features/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/templates/page.tsx`
- `src/app/templates/*/*.tsx` (11 template pages)
- `src/app/demo/page.tsx`
- `src/app/landing-alt/page.tsx`
- `src/app/components/page.tsx`

### Legal
- `src/app/(legal)/privacy/page.tsx`
- `src/app/(legal)/terms/page.tsx`
- `src/app/(legal)/cookies/page.tsx`
- `src/app/(legal)/refund/page.tsx`

### Dashboard
- `src/app/(dashboard)/admin/*.tsx` (8 pages)
- `src/app/(dashboard)/billing/*.tsx` (2 pages)
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/app/(dashboard)/profile/page.tsx`
- `src/app/(dashboard)/settings/*.tsx` (2 pages)
- `src/app/(dashboard)/organizations/**/*.tsx` (6 pages)
- `src/app/(dashboard)/developer/api-keys/page.tsx`
- `src/app/(dashboard)/examples/*.tsx` (3 pages)

### Other
- `src/app/success/page.tsx`
- `src/app/purchase/success/page.tsx`
- `src/app/maintenance/page.tsx`
- `src/app/test-posthog/page.tsx`
- `src/app/studio/[[...index]]/page.tsx`
