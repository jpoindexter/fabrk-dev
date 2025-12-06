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
| Components | 0 | 8 | 1 (CSRF docs) | ✅ COMPLIANT |
| Copy/Microcopy | 0 | 15 | 4 (docs) | ✅ COMPLIANT |
| **TOTAL** | **0** | **44** | **24** | **✅ FULLY COMPLIANT** |

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
- `signup-success.tsx:33` - Changed button text to `> RESEND_VERIFICATION_EMAIL`
- `security-settings.tsx:248` - Changed button text to `> RESEND_VERIFICATION_EMAIL`
- `contact-form.tsx` - Changed all labels to `[LABEL]:` format
- `contact-form.tsx:214` - Fixed HTML entity in button text

### Copy/Microcopy ✅ (New Session Fixes)
**Decisions Made:**
- ✅ EXECUTE prefix: **REMOVED** from all buttons (use `> ACTION_NAME`)
- ✅ VIEW delimiter: **UNDERSCORE** format (`> VIEW_TARGET`)
- ✅ Doc examples: Allowed to use typical (non-terminal) patterns

**Files Fixed:**
- `hero-section.tsx:283` - `> EXECUTE: GET_FABRK` → `> GET_FABRK`
- `hero-section.tsx:286` - `> VIEW: LIVE_DEMO` → `> VIEW_LIVE_DEMO`
- `hero-video.tsx:111` - Removed EXECUTE prefix (dynamic)
- `hero-video.tsx:124` - Changed to VIEW_ underscore format (dynamic)
- `pricing-section.tsx:144` - `> EXECUTE: GET_LIFETIME_ACCESS` → `> GET_LIFETIME_ACCESS`
- `pricing-table.tsx:105` - `Get Fabrk Now` → `> GET_FABRK`
- `checkout-button.tsx:26` - `Get Fabrk - $199` → `> GET_FABRK - $199`
- `features-hero.tsx:66` - `> EXECUTE: GET_FABRK` → `> GET_FABRK`
- `features-hero.tsx:71` - `> VIEW: DOCUMENTATION` → `> VIEW_DOCUMENTATION`
- `about-cta.tsx:51` - `> EXECUTE: GET_FABRK` → `> GET_FABRK`
- `about-cta.tsx:56` - `> VIEW: ALL_FEATURES` → `> VIEW_ALL_FEATURES`
- `features-cta.tsx:34` - `> EXECUTE: GET_STARTED` → `> GET_STARTED`
- `features-cta.tsx:39` - `> VIEW: TEMPLATES` → `> VIEW_TEMPLATES`

---

## Accepted Exceptions

### 1 Component Exception (Intentional)
- **CSRF docs page** - Uses raw `<input>` for security demonstration

### 4 Copy Exceptions (Documentation Examples)
- `magic-links/page.tsx:174` - "Sending..." / "Send Magic Link" (code example)
- `loading/page.tsx:113` - "Saving..." (code example showing typical usage)
- `polar/page.tsx`, `payments/page.tsx`, `lemonsqueezy/page.tsx` - Third-party integration examples

### CardContent Padding Variations
| Pattern | Use Case |
|---------|----------|
| `py-12` | Empty states (centered icons + messages) |
| `pt-6` | CardContent without CardHeader |
| `p-8` | Hero/success cards (prominent content) |

### Email Inline Styles (16 exceptions)
Email templates require inline styles for compatibility.

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
<Button>> GET_STARTED</Button>
<Button>> VIEW_DOCUMENTATION</Button>
<Button>> SEND_MESSAGE</Button>
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
| `components.json` | ✅ 0 violations (1 exception) |
| `copy.json` | ✅ 0 violations (4 exceptions) |

---

## Summary

**Status: ✅ FULLY COMPLIANT**

All production violations have been fixed. The design system is now consistent across:
- 44 total fixes applied
- 24 accepted exceptions (emails, docs examples)
- 0 remaining violations

### Key Decisions Made
1. **Button text format**: `> ACTION_NAME` (no EXECUTE prefix)
2. **VIEW pattern**: Underscore format `> VIEW_TARGET`
3. **Loading states**: UPPERCASE in production, Title Case allowed in docs
4. **Labels**: `[FIELD]:` bracket format
5. **Card headers**: `[ [0x00] TITLE ]` terminal format
