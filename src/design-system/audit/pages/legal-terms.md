# Legal: Terms of Service Page Audit

**File:** `src/app/(legal)/terms/page.tsx`
**Status:** Production-ready
**Layout:** Long-form legal document (442 lines) - Terminal styling with license terms

---

## Purpose

Terms of Service defining legal agreement, license grant, restrictions, payment terms, IP, disclaimers. Comprehensive terminal-styled legal document.

---

## Layout Overview

### Structure

- Client component ("use client")
- Framer Motion animations
- Container: `container mx-auto max-w-4xl px-6 py-16 font-mono`
- 13 sections (0x10 through 0xC0)
- Multiple subsections with detailed license terms

### Component Hierarchy

```
main (container)
├── Header (badge + title + date)
├── Introduction Card
└── Sections (space-y-6)
    ├── 0x10: Agreement to Terms
    ├── 0x20: Description of Service
    │   ├── [2.1] Perpetual License Grant
    │   ├── [2.1.1] Per Seat License
    │   └── [2.2] License Restrictions
    ├── 0x30: User Accounts
    ├── 0x40: Payment Terms
    ├── 0x50: Intellectual Property
    ├── 0x60: Prohibited Uses
    ├── 0x70: Disclaimers & Liability
    ├── 0x80: Updates & Versioning
    ├── 0x90: Indemnification
    ├── 0xA0: Governing Law
    ├── 0xB0: Terms Changes
    ├── 0xC0: Contact Info
    └── Related Links
```

---

## Key Components Used

1. **Framer Motion** - Page animations
2. **Next Link** - Internal navigation
3. **Lists** - Structured legal terms
4. **Warning sections** - Destructive colors for violations

---

## Typography Scale Observed

### Header (Same as other legal pages)

- **Badge:** `text-xs text-muted-foreground border-border bg-card`
- **Subtitle:** `text-sm text-muted-foreground`
- **Title:** `text-4xl font-semibold tracking-tight`
- **Date:** `text-xs text-muted-foreground`

### Sections

- **Code:** `text-xs text-muted-foreground` → `[0x10]`
- **Title:** `text-lg font-semibold` → `AGREEMENT_TO_TERMS`
- **Subheadings:** `text-sm font-semibold mb-2` → `[2.1] PERPETUAL_LICENSE_GRANT`
- **Body:** `text-sm text-muted-foreground`
- **List items:** `text-sm text-muted-foreground pl-4 space-y-1`
- **Strong labels:** `text-foreground font-semibold`
- **Destructive text:** `text-destructive` (for violations)
- **Links:** `text-primary hover:underline`

### Special Sections

- **No Refunds Banner:** `border-destructive/30 bg-destructive/5 p-4`
- **Warning text:** `text-xs text-foreground` with `text-destructive font-semibold`

---

## Spacing Patterns Observed

### Page Level

- **Container:** `px-6 py-16 max-w-4xl`
- **Header margin:** `mb-12 text-center`
- **Section gap:** `space-y-6` (24px between sections)

### Introduction

- **Border:** `border-border bg-card`
- **Padding:** `p-6`
- **Margin:** `mb-12`

### Section Cards

- **Border:** `border-border bg-card`
- **Padding:** `p-6`
- **Section header gap:** `gap-2 mb-4`
- **Subsection spacing:** `space-y-4` to `space-y-6`
- **List spacing:** `space-y-1` (tight for legal lists)

### License Restrictions

- **List icons:** `text-destructive` (✗ symbol)
- **Gap:** `space-y-1`
- **Warning footer:** `text-xs text-destructive mt-2`

---

## Inconsistencies / Ad-Hoc Styles

### Same as other legal pages

⚠️ **Font-mono only on container** - Readability trade-off for legal content

### Appropriate Destructive Usage

✅ **Red text for violations** - `text-destructive` used appropriately
✅ **Warning banners** - `border-destructive/30 bg-destructive/5`
✅ **Checkmarks vs X marks** - Visual hierarchy for do's/don'ts

### Consistent Patterns

✅ **Design tokens** throughout
✅ **No hardcoded colors**
✅ **Spacing hierarchy** maintained

---

## Design System Compliance

⚠️ **REVIEW** - Font-mono only on container (readability exception for legal?)
✅ **PASS** - Design tokens used exclusively
✅ **PASS** - No hardcoded colors
✅ **PASS** - Spacing follows 8-point grid
✅ **PASS** - Appropriate use of destructive variants
✅ **PASS** - Semantic HTML (proper heading levels)
✅ **PASS** - Accessible (good contrast, proper structure)
✅ **PASS** - Links properly styled

---

## Recommendations

1. **Keep legal structure** - Well-organized with hex codes
2. **Verify legal accuracy** - License terms, liability caps
3. **Consider TOC** - 442 lines = benefits from navigation
4. **Test responsive** - Ensure lists/tables work on mobile

---

## Related Files

- `src/app/(legal)/privacy/page.tsx` (same pattern)
- `src/app/(legal)/cookies/page.tsx` (same pattern)
- `src/app/(legal)/refund/page.tsx` (same pattern)

---

## Summary of All Legal Pages

All 4 legal pages follow consistent pattern:

- Container: `max-w-4xl px-6 py-16 font-mono`
- Framer Motion animations
- Hex-coded sections (0x10, 0x20, etc.)
- Design tokens exclusively
- Intentional font-mono on container only (readability)
- Proper use of destructive colors for warnings
- Terminal-styled but prioritizes legal readability
