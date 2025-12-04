# Design System Violations Report

**Generated:** 2025-12-04
**Total Files Scanned:** 863
**Total Patterns Found:** 38,170

---

## Executive Summary

| Category | Violations | Priority |
|----------|------------|----------|
| **Colored Dots Pattern** | 53 files | 🔴 CRITICAL |
| **Shadows** | 41 files (127 occurrences) | 🟡 HIGH |
| **Hex Colors** | 20 files (461 occurrences) | 🟡 HIGH |
| **Border Radius** | 2 files (4 occurrences) | 🟢 LOW |

---

## 🔴 CRITICAL: Colored Dots Pattern (53 files)

These files use the old macOS-style colored dots instead of `TerminalCardHeader`:

### Template Components (36 files)
```
src/app/templates/billing-dashboard/components/
├── billing-history-table.tsx:35
├── current-plan-card.tsx:29
├── payment-methods-card.tsx:27
├── plan-cards.tsx:36
├── recent-invoices-card.tsx:36
├── template-features-card.tsx:11
└── usage-metrics-card.tsx:32

src/app/templates/team-dashboard/components/
├── implementation-note.tsx:11
├── invite-section.tsx:36
├── members-table.tsx:77
├── pending-invitations.tsx:31
└── role-permissions.tsx:39

src/app/templates/security-privacy/components/
├── audit-tab.tsx:25
├── compliance-tab.tsx:53,94
├── implementation-note.tsx:10
├── privacy-tab.tsx:28,62
└── security-tab.tsx:38,77,132

src/app/templates/search-results/components/
├── features-card.tsx:11
├── filters-sidebar.tsx:47
├── pagination.tsx:22
├── results-header.tsx:35
└── search-bar.tsx:21

src/app/templates/pricing-page/components/
├── comparison-table.tsx:35
├── faq-section.tsx:28
├── features-card.tsx:11
└── pricing-cards.tsx:43

src/app/templates/profile/components/
├── badges-section.tsx:26
└── profile-tabs.tsx:47

src/app/templates/email-templates/components/
├── email-features.tsx:10
├── email-preview.tsx:52
└── email-tab-navigation.tsx:17

src/app/templates/documentation/components/
├── table-of-contents.tsx:24
└── template-features.tsx:24

src/app/templates/modals/components/
└── pattern-comparison.tsx:11

src/app/templates/settings-page/components/
└── terminal-window.tsx:20

src/app/templates/user-management/components/
└── features-note.tsx:10
```

### Landing Component (1 file)
```
src/components/landing/pricing-section.tsx:83
```

### Docs Pages (8 files)
```
src/app/docs/components/autocomplete/page.tsx:204
src/app/docs/components/footer/page.tsx:43
src/app/docs/components/form/page.tsx:208
src/app/docs/components/form-error/page.tsx:123
src/app/docs/components/hero/page.tsx:42,135,152
src/app/docs/components/label/page.tsx:122,159
src/app/docs/components/simple-icon/page.tsx:183,205
src/app/docs/features/cookie-consent/page.tsx:23
```

### Fix Pattern
```tsx
// BEFORE (BAD)
<div className="flex items-center gap-2 border-b border-border px-4 py-2">
  <div className="flex gap-2">
    <div className="size-2 rounded-none bg-destructive/50" />
    <div className="size-2 rounded-none bg-warning/50" />
    <div className="size-2 rounded-none bg-success/50" />
  </div>
  <span className="font-mono text-xs text-muted-foreground">filename.sh</span>
</div>

// AFTER (GOOD)
import { TerminalCardHeader } from "@/components/ui/card";

<TerminalCardHeader code="0x00" title="FILENAME" />
```

---

## 🟡 HIGH: Shadow Violations (41 files)

Terminal aesthetic = no shadows. These files use `shadow-sm`, `shadow-md`, etc:

### Dashboard Pages (9 files)
| File | Violations |
|------|------------|
| `app/(dashboard)/examples/user-profile/page.tsx` | 7 |
| `app/(dashboard)/examples/analytics/page.tsx` | 5 |
| `app/(dashboard)/examples/admin/page.tsx` | 3 |
| `app/(dashboard)/organizations/[slug]/settings/page.tsx` | 2 |
| `app/(dashboard)/organizations/[slug]/members/page.tsx` | 1 |
| `app/(dashboard)/organizations/[slug]/billing/components/*` | 3 |
| `app/(dashboard)/organizations/new/components/progress-steps.tsx` | 1 |

### UI Components (18 files)
| File | Violations |
|------|------------|
| `components/ui/role-selector.tsx` | 11 |
| `components/ui/member-card.tsx` | 6 |
| `components/ui/activity-timeline.tsx` | 4 |
| `components/ui/notification-center.tsx` | 3 |
| `components/ui/rich-text-editor.tsx` | 3 |
| `components/ui/menubar.tsx` | 3 |
| `components/ui/markdown-editor.tsx` | 2 |
| `components/ui/image-uploader.tsx` | 2 |
| `components/ui/navigation-menu.tsx` | 2 |
| `components/ui/heatmap.tsx` | 2 |
| `components/ui/command.tsx` | 1 |
| `components/ui/data-table/data-table.tsx` | 1 |
| `components/ui/invite-form.tsx` | 1 |
| `components/ui/notification-badge.tsx` | 1 |
| `components/ui/slider.tsx` | 1 |
| `components/ui/switch.tsx` | 1 |

### Landing/Marketing (8 files)
| File | Violations |
|------|------------|
| `app/contact/components/faq-section.tsx` | 4 |
| `app/layout.tsx` | 3 |
| `components/dashboard/dashboard-header.tsx` | 3 |
| `components/landing/hero-split.tsx` | 2 |
| `components/showcase/showcase-nav.tsx` | 2 |
| `components/organization/org-card.tsx` | 2 |
| `components/marketing/pricing-comparison.tsx` | 1 |
| `components/landing/interactive-demo.tsx` | 1 |

### Fix Pattern
```tsx
// BEFORE (BAD)
<Card className="shadow-sm">

// AFTER (GOOD)
<Card className="">  // Remove shadow entirely
```

---

## 🟡 HIGH: Hardcoded Hex Colors (20 files)

These files use hex colors instead of design tokens:

### Acceptable (Data/Theme files)
- `components/ui/color-picker.tsx` - Color picker needs hex values
- `components/theme/color-theme-switcher.tsx` - Theme previews
- `components/theme/theme-dropdown.tsx` - Theme previews
- `app/docs/components/color-picker/page.tsx` - Documentation
- `app/docs/extras/theming/page.tsx` - Documentation

### Email Templates (Acceptable - HTML emails need inline styles)
- `emails/purchase-confirmation.ts`
- `emails/reset-password.ts`
- `emails/subscription-update.ts`
- `emails/templates/onboarding.ts`
- `emails/verify-email.ts`
- `emails/welcome-html.ts`
- `app/templates/email-templates/components/email-template-data.ts`

### Need Review
| File | Hex Colors | Action |
|------|------------|--------|
| `app/docs/features/google-oauth/page.tsx` | 4 | Google brand colors - OK |
| `app/docs/features/emails/page.tsx` | 3 | Example code - OK |
| `app/docs/tutorials/email-templates/page.tsx` | 3 | Example code - OK |
| `app/api/contact/route.ts` | 7 | **Review** |

---

## 🟢 LOW: Border Radius Violations (2 files)

Terminal aesthetic = `rounded-none`. Only 4 violations:

| File | Code | Action |
|------|------|--------|
| `app/blog/[slug]/page.tsx` | `rounded-full` | Avatar - OK |
| `lib/design-tokens.ts` | `rounded-sm/md/lg` | Token definitions - OK |

---

## Verification Commands

After fixing, run these to verify:

```bash
# Colored dots (should return 0)
grep -r "bg-destructive/50.*size-2\|size-2.*bg-destructive/50" src/ --include="*.tsx" | wc -l

# Shadows (should return only acceptable uses)
grep -r "shadow-sm\|shadow-md\|shadow-lg" src/ --include="*.tsx" | wc -l

# Non-token colors (review each)
grep -r "bg-white\|text-white\|bg-black\|text-black" src/ --include="*.tsx" | wc -l
```

---

## Priority Fix Order

1. **Colored Dots** (53 files) - Immediate visual inconsistency
2. **Shadows** (41 files) - Breaks terminal aesthetic
3. **Colors** (Review 1 file) - Minor issue

**Estimated effort:** 2-3 hours for colored dots, 1 hour for shadows
