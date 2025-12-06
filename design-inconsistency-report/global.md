# Global Design System Audit Report

> **Audit Date:** December 5, 2025
> **Auditor:** Claude (Visual Systems Architect)
> **Codebase:** Fabrk Boilerplate
> **Total Files Analyzed:** 619 (.tsx files across src/)

---

## Executive Summary

The Fabrk boilerplate demonstrates **strong overall adherence** to its terminal-inspired design system. The architecture is well-designed with centralized design token management via the Visual Mode System. However, several systemic issues were identified that require attention.

### Compliance Scores by Area

| Area | Score | Status |
|------|-------|--------|
| **UI Components** | 95/100 | Excellent |
| **Landing Components** | 98/100 | Excellent |
| **Docs Components** | 94/100 | Excellent |
| **Dashboard Pages** | 78/100 | Needs Improvement |
| **Email Templates** | 40/100 | Major Refactor Needed |
| **Overall** | **85/100** | Good |

---

## Top Systemic Violations

### 1. Typography: Missing `font-mono` on UI Text (HIGH)

**Scope:** 18+ files across dashboard and marketing pages
**Impact:** Breaks terminal aesthetic consistency

The terminal design system mandates `font-mono` on all UI text, but many dashboard components use default sans-serif fonts.

**Affected Areas:**
- Dashboard stats cards
- Dashboard headers
- Account/profile pages
- Admin pages
- About page sections
- Features page sections

**Root Cause:** Components created before design system was finalized, or copied from external sources without terminal styling.

---

### 2. Card Headers: Missing Terminal Format (HIGH)

**Scope:** 14+ files in dashboard and security components
**Impact:** Visual inconsistency across cards

Card headers should follow the terminal format:
```tsx
<div className="border-b border-border px-4 py-2">
  <span className="font-mono text-xs text-muted-foreground">
    [ [0x00] SECTION_TITLE ]
  </span>
</div>
```

**Affected Components:**
- `security-password-card.tsx`
- `security-2fa-card.tsx`
- `security-accounts-card.tsx`
- `security-sessions-card.tsx`
- `security-recommendations-card.tsx`
- `stats-cards.tsx`
- `account-status.tsx`
- `recent-activity.tsx`
- `profile/page.tsx`
- `account/page.tsx` (8 instances)
- `current-plan-card.tsx`
- `role-permissions-card.tsx`
- `profile-form.tsx`

---

### 3. Spacing: Off-Grid Values (MEDIUM)

**Scope:** 23+ files
**Impact:** Visual rhythm inconsistency

The 8-point grid system is violated with off-grid spacing values:

| Off-Grid Value | Pixel Value | Occurrences | Correct Alternative |
|----------------|-------------|-------------|---------------------|
| `p-3`, `py-3`, `px-3` | 12px | 11 | `p-2` or `p-4` |
| `gap-3` | 12px | 3 | `gap-2` or `gap-4` |
| `mb-3`, `mt-3` | 12px | 6 | `m-2` or `m-4` |
| `pl-7`, `pr-7` | 28px | 3 | `p-6` or `p-8` |
| `py-1.5` | 6px | 1 | `py-1` or `py-2` |

**Root Cause:**
- Grid/Stack components define off-grid variants (gap-5, gap-7, gap-9, gap-10)
- Manual spacing values added without grid awareness

---

### 4. Email Templates: Hardcoded Colors (HIGH)

**Scope:** 6 email template files (~200+ instances)
**Impact:** No theme consistency in emails

All email templates use hardcoded hex values instead of any theming system:
- `#f4f4f5`, `#ffffff`, `#e4e4e7`, `#18181b`, `#3f3f46`
- `#2563eb`, `#007AFF`, `#22c55e`, `#fef3c7`, etc.

**Affected Files:**
- `src/emails/welcome-html.ts`
- `src/emails/verify-email.ts`
- `src/emails/reset-password.ts`
- `src/emails/purchase-confirmation.ts`
- `src/emails/subscription-update.ts`
- `src/app/api/contact/route.ts` (inline HTML)

**Note:** HTML emails have limited CSS support, but a centralized color constants file could improve maintainability.

---

### 5. Button Text: Non-Terminal Format (LOW)

**Scope:** 5 instances in docs components
**Impact:** Minor visual inconsistency

Buttons should use `"> COMMAND_TEXT"` format with uppercase and underscores.

**Violations:**
- `lightbox/page.tsx`: "Open Lightbox Gallery" → "> OPEN_LIGHTBOX_GALLERY"
- `lightbox/page.tsx`: "View Single Image" → "> VIEW_SINGLE_IMAGE"
- `lightbox/page.tsx`: "Open with Thumbnails" → "> OPEN_WITH_THUMBNAILS"
- `lightbox/page.tsx`: "Open without Zoom" → "> OPEN_WITHOUT_ZOOM"
- `hover-card/page.tsx`: "@nextjs" → "> @NEXTJS"

---

### 6. Shadow Violation (LOW)

**Scope:** 1 file
**Impact:** Minor visual inconsistency

**File:** `src/components/ui/input-group.tsx`
**Line 45:** Uses `shadow-xs` (non-standard class) on static element

Terminal aesthetic prohibits shadows on static elements.

---

## Anti-Patterns Detected

### 1. Inconsistent Class Ordering in `cn()`

Some files use `cn(mode.radius, "other-classes")` while others use `cn("other-classes", mode.radius)`.

**Recommendation:** Standardize to `cn(mode.radius, mode.font, "additional-classes")`

### 2. Direct Color Classes Instead of Semantic Tokens

While rare, some components use opacity-based colors like `bg-primary/10` instead of semantic tokens like `bg-muted`.

**Recommendation:** Document when opacity variants are acceptable vs. when to use semantic tokens.

### 3. Mixed Card Header Implementations

The codebase has multiple card header patterns:
- `CardHeader` + `CardTitle` (shadcn default)
- `StyledCardHeader` (terminal aesthetic)
- Custom divs with terminal styling

**Recommendation:** Deprecate `CardHeader`/`CardTitle` in favor of `StyledCardHeader` for all user-facing cards.

---

## Suggested System-Level Fixes

### Priority 1: Critical (Do First)

1. **Create `TerminalCardHeader` component** - A single source of truth for all card headers
2. **Add `font-mono` to dashboard base layout** - Apply terminal font at layout level
3. **Remove off-grid variants from Grid/Stack** - Only allow 8-point grid values

### Priority 2: High

4. **Audit all CardHeader usage** - Replace with StyledCardHeader
5. **Create email color constants file** - Centralize email template colors
6. **Fix typography on all dashboard pages** - Add missing `font-mono` classes

### Priority 3: Medium

7. **Standardize button text across docs** - Apply formatButtonText()
8. **Remove shadow-xs from InputGroup** - Use shadow-none
9. **Audit spacing values** - Replace all off-grid values

### Priority 4: Low (Polish)

10. **Standardize cn() argument ordering** - mode properties first
11. **Document opacity color usage guidelines** - When to use `bg-primary/10` vs `bg-muted`

---

## Recommended Workflows

### Pre-Commit Hook Enhancement

Add these patterns to the pre-commit audit script:

```javascript
// Check for missing font-mono on interactive elements
const fontMonoPatterns = [
  /className="[^"]*\btext-(xs|sm|base|lg|xl)[^"]*"(?![^"]*font-mono)/,
];

// Check for off-grid spacing
const offGridPatterns = [
  /\b(p|m|gap)-(3|5|7|9|10|11|14)\b/,
  /\b(px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr)-(3|5|7|9|10|11|14)\b/,
];

// Check for non-terminal card headers
const cardHeaderPatterns = [
  /<CardHeader(?![^>]*StyledCardHeader)/,
];
```

### Component Creation Checklist

When creating new components:

- [ ] Uses `mode.radius` from design system
- [ ] Uses `mode.font` for all text
- [ ] All colors use semantic tokens
- [ ] Spacing follows 8-point grid
- [ ] Card headers use terminal format
- [ ] Button text uses `formatButtonText()`
- [ ] Labels use `formatLabel()`

---

## Files Requiring Immediate Attention

### Critical Priority
1. `src/components/ui/grid.tsx` - Remove off-grid gap variants
2. `src/components/ui/stack.tsx` - Remove off-grid gap variants
3. `src/components/ui/input-group.tsx` - Remove shadow-xs

### High Priority
4. `src/app/(dashboard)/dashboard/components/stats-cards.tsx`
5. `src/app/(dashboard)/dashboard/components/dashboard-header.tsx`
6. `src/app/(dashboard)/dashboard/components/recent-activity.tsx`
7. `src/app/(dashboard)/dashboard/components/account-status.tsx`
8. `src/components/security/*.tsx` (5 files)

### Medium Priority
9. `src/app/about/components/*.tsx` (5 files)
10. `src/app/features/components/*.tsx` (7 files)
11. `src/app/contact/components/*.tsx` (4 files)

---

## Conclusion

The Fabrk design system is well-architected with proper centralization via the Visual Mode System. The main issues stem from:

1. **Legacy components** created before the design system was finalized
2. **Dashboard components** that were scaffolded without terminal styling
3. **Email templates** that necessarily use inline styles but lack any centralization

The recommended approach is to:
1. Fix the Grid/Stack component variants (removes ability to use off-grid values)
2. Create a migration guide for converting CardHeader to StyledCardHeader
3. Apply font-mono at the dashboard layout level
4. Create a centralized email color system

**Estimated effort to resolve all issues:** 4-6 hours of focused refactoring
