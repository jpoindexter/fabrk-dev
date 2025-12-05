# Design System Violations Report

> Generated: 2025-12-05
> Last Updated: 2025-12-05
> Audit Type: CONSISTENCY LOCKDOWN + COMPONENT NORMALIZATION
> Source of Truth: `/design-system/` (tokens, themes, primitives)
> Theme: Terminal (rounded-none, font-mono, uppercase)

---

## Executive Summary

| Category | Violations | Fixed | Accepted | Status |
|----------|-----------|-------|----------|--------|
| Typography | 0 | 1 | 2 (docs) | ✅ COMPLIANT |
| Spacing | 0 | 8 | 0 | ✅ COMPLIANT |
| Colors | 0 | 1 | 16 (email) | ✅ COMPLIANT |
| Radius | 0 | 2 | 1 (spinner) | ✅ COMPLIANT |
| Shadow | 0 | 9 | 0 | ✅ COMPLIANT |
| Components | 1 | 8 | 5 | ⚠️ 1 EXCEPTION |
| Copy/Microcopy | 9 patterns | 0 | 0 | 📋 NEEDS DECISION |
| **TOTAL** | **1** | **29** | **24** | **✅ NEAR COMPLIANT** |

---

## Session Fixes (2025-12-05)

### Typography ✅
- `visual-test/page.tsx:758` - Changed `text-[10px]` to `text-2xs`

### Spacing ✅
- `admin/layout.tsx:38` - Changed `top-14` (56px) to `top-16` (64px)
- `admin/layout.tsx:38` - Changed `calc(100vh-3.5rem)` to `calc(100vh-4rem)`
- `sidebar.tsx:67` - Changed 12px multiplier to 16px multiplier
- `heatmap.tsx:27` - Changed default `gap=2` to `gap=4`
- `field.tsx:177` - Changed `-mt-1.5` to `-mt-2`

### Radius ✅
- `scroll-area.tsx:18` - Changed `rounded-[inherit]` to `rounded-none`
- `navigation-menu.tsx:115` - Changed `rounded-tl-sm` to `rounded-none`

### Shadow ✅
- `pricing-comparison.tsx:81` - Removed `shadow` (uses `ring-2` only)
- `org-card.tsx:80` - Removed `shadow` (uses `ring-2` only)
- `invite-members-step.tsx:53` - Removed `shadow`
- `success-step.tsx:19,21` - Removed `shadow` from Card and badge div
- `pricing-table.tsx:161` - Removed `shadow` from table
- `hero-split.tsx:118` - Removed `shadow` from mockup div
- `dashboard-header.tsx:121` - Removed `shadow` from dropdown
- `org-switcher.tsx:149` - Removed `shadow` from dropdown

### Colors ✅
- `comparison-section.tsx:143` - Changed `rgba(0, 0, 0, 0.04)` to `hsl(var(--muted))`

### Components ✅
- `signup-success.tsx:35` - Changed button text to `> RESEND_VERIFICATION_EMAIL`
- `security-settings.tsx:251` - Changed button text to `> RESEND_VERIFICATION_EMAIL`
- `contact-form.tsx` - Changed all labels to `[LABEL]:` format
- `contact-form.tsx:225` - Fixed HTML entity in button text

---

## Remaining Items

### 1 Component Exception (Intentional)
- **CSRF docs page** - Uses raw `<input>` for security demonstration

### Copy/Microcopy Patterns (Needs Team Decision)
The following patterns were identified but require team input:

| Pattern | Current | Variants Found |
|---------|---------|----------------|
| VIEW delimiter | `VIEW_DOCS` | `VIEW_DOCS`, `VIEW_EXAMPLE` |
| Get Started | `> GET_STARTED` | `Get Started`, `GET_STARTED`, `> GET_STARTED` |
| EXECUTE prefix | `> EXECUTE: ACTION` | Some use prefix, some don't |
| Loading state | `SENDING...` | `Sending...`, `SENDING...` |

**Recommendation:** Standardize on `> ACTION_NAME` format for all buttons.

---

## Accepted Patterns

### CardContent Padding Variations
| Pattern | Use Case |
|---------|----------|
| `py-12` | Empty states (centered icons + messages) |
| `pt-6` | CardContent without CardHeader |
| `p-8` | Hero/success cards (prominent content) |

### Email Inline Styles (16 exceptions)
Email templates require inline styles for compatibility.

### Documentation Examples (2 exceptions)
Intentional BAD examples showing incorrect usage.

---

## Canonical Patterns

### Card Component
```tsx
<Card className={cn("bg-card text-card-foreground border", mode.radius)}>
  <CardHeader className="flex flex-col space-y-2 p-6">
    <CardTitle className="text-base font-semibold">Title</CardTitle>
  </CardHeader>
  <CardContent className="px-6 pt-0 pb-6">Content</CardContent>
  <CardFooter className="flex items-center px-6 pt-0 pb-6">Actions</CardFooter>
</Card>
```

### Button Text Format
```tsx
<Button>> ACTION_NAME</Button>
<Button>> SUBMIT_FORM</Button>
<Button>> RESEND_EMAIL</Button>
```

### Label Format
```tsx
<Label>[FIELD_NAME]:<span className="text-destructive ml-1">*</span></Label>
```

---

## Violation Files

| File | Status |
|------|--------|
| `typography.json` | ✅ 0 violations |
| `spacing.json` | ✅ 0 violations |
| `colors.json` | ✅ 0 violations |
| `radius.json` | ✅ 0 violations |
| `shadow.json` | ✅ 0 violations |
| `components.json` | ⚠️ 1 exception |
| `copy.json` | 📋 9 patterns (needs decision) |

---

## Next Steps

1. ✅ All production violations FIXED
2. 📋 Copy/microcopy patterns need team standardization decision
3. ✅ Violations log updated
