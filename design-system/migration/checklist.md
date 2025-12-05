# Design System Migration Checklist

> Step-by-step tasks for migrating to the new design system. Each task is small, executable in a single AI run or human commit, and verifiable.

**Version:** 1.0.0
**Date:** 2025-12-05

---

## How to Use This Checklist

1. Work through tasks in order (dependencies exist between phases)
2. Mark each task complete with `[x]` when done
3. Run validation commands after each task
4. Commit after each completed step
5. Don't skip ahead - each phase builds on previous

### Validation Commands

After each task, run:
```bash
npm run type-check    # TypeScript validation
npm run lint          # ESLint + hex color scan
npm run build         # Verify build passes
```

---

## Phase A: Foundation (Tokens & Themes)

### A.1: Create Primitive Tokens CSS

**Goal:** Raw CSS variables for all design tokens

- [ ] Create `design-system/css/primitives.css`
- [ ] Add gray color palette (50-950) using OKLCH
- [ ] Add primary color palette (50-950) using OKLCH
- [ ] Add red/danger palette (50-950)
- [ ] Add green/success palette (50-950)
- [ ] Add amber/warning palette (50-950)
- [ ] Add blue/info palette (50-950)
- [ ] Add spacing scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)
- [ ] Add radius scale (none, sm, md, lg, xl, 2xl, full)
- [ ] Add shadow scale (none, xs, sm, md, lg, xl, 2xl, inner)
- [ ] Add font family declarations (sans, mono)
- [ ] Verify file loads without errors

**Validation:**
```bash
# Import in globals.css temporarily and check browser devtools
# All --gray-*, --primary-*, etc. variables should appear in :root
```

### A.2: Create Semantic Tokens CSS

**Goal:** Role-based tokens that reference primitives

- [ ] Create `design-system/css/semantic.css`
- [ ] Add background tokens (base, surface, surface-raised, muted, accent, etc.)
- [ ] Add text tokens (primary, secondary, muted, disabled, inverse, accent, etc.)
- [ ] Add border tokens (default, muted, strong, accent, focus)
- [ ] Add component radius tokens (button, input, card, modal, badge)
- [ ] Add component shadow tokens (card, dropdown, modal)
- [ ] Add font tokens (body, heading, code)
- [ ] Add text-transform tokens (button, label, heading)
- [ ] Map all tokens to Terminal theme defaults
- [ ] Verify semantic tokens reference primitives correctly

**Validation:**
```bash
# In devtools, verify semantic tokens resolve to primitive values
# e.g., --color-bg-surface should show actual color value
```

### A.3: Create Theme CSS Files

**Goal:** Theme-specific overrides for semantic tokens

- [ ] Create `design-system/css/themes/terminal.css`
  - [ ] Set radius tokens to 0
  - [ ] Set shadow-card to none
  - [ ] Set font-body to mono
  - [ ] Set text-transform-button to uppercase
- [ ] Create `design-system/css/themes/modern.css`
  - [ ] Set radius-button to 6px
  - [ ] Set radius-card to 8px
  - [ ] Set shadow-card to sm
  - [ ] Set font-body to sans
  - [ ] Set text-transform-button to none
- [ ] Create `design-system/css/themes/soft.css`
  - [ ] Set radius-button to 8px
  - [ ] Set radius-card to 12px
  - [ ] Set shadow-card to md
  - [ ] Set font-body to sans
  - [ ] Set text-transform-button to none
- [ ] Add dark mode variants to each theme file

**Validation:**
```bash
# Manually test by adding data-theme="modern" to <html>
# Verify radius and shadows change appropriately
```

### A.4: Wire Up ThemeProvider

**Goal:** React context for theme management

- [ ] Create `design-system/providers/ThemeProvider.tsx`
- [ ] Define ThemeMode type ("terminal" | "modern" | "soft")
- [ ] Define ColorScheme type ("light" | "dark" | "system")
- [ ] Create ThemeContext with theme state
- [ ] Implement setTheme function
- [ ] Add useEffect to sync data-theme attribute
- [ ] Add useEffect to sync dark/light class
- [ ] Implement localStorage persistence
- [ ] Export useTheme hook
- [ ] Update `src/app/layout.tsx` to wrap with ThemeProvider
- [ ] Verify theme context available throughout app

**Validation:**
```bash
npm run type-check  # No TypeScript errors
npm run build       # Build passes
# In browser, verify ThemeProvider wraps app
```

### A.5: Import Token System in globals.css

**Goal:** Connect new token system to existing styles

- [ ] Add import for primitives.css at top of globals.css
- [ ] Add import for semantic.css after primitives
- [ ] Add import for terminal.css (default theme)
- [ ] Add conditional imports for other themes
- [ ] Verify no style conflicts with existing CSS
- [ ] Run full app and check for visual regressions

**Validation:**
```bash
npm run build
npm run dev
# Manually verify all pages still render correctly
```

### A.6: Add Theme Switcher UI

**Goal:** UI for testing theme switching

- [ ] Add theme toggle to settings page
- [ ] Create dropdown with Terminal/Modern/Soft options
- [ ] Add dark/light/system toggle
- [ ] Verify theme persists across page reload
- [ ] Verify no FOUC (flash of unstyled content)

**Validation:**
```bash
# Test theme switching:
# 1. Select Modern theme
# 2. Refresh page
# 3. Theme should still be Modern
```

---

## Phase B: Core Components

### B.0: Critical Bug Fixes (FIRST!)

**Goal:** Fix known bugs before component migration

**Status:** ✅ COMPLETED (2025-12-05)

- [x] Fix InputOTP template literal bug
  - [x] Read `src/components/ui/input-otp.tsx`
  - [x] **Finding:** No template literal bug found. Code uses static `first:rounded-none` which is correct for terminal mode.
  - [x] **Fixed:** Removed unnecessary trailing empty strings from cn() calls, normalized class order
  - [x] Test OTP input renders correctly ✅

- [x] Fix InputGroup template literal bug
  - [x] Read `src/components/ui/input-group.tsx`
  - [x] **Finding:** No template literal bug found. Code uses `[&>kbd]:rounded-none` which is a static class.
  - [x] Uses mode.radius and mode.font correctly throughout
  - [x] Test InputGroup with kbd renders correctly ✅

- [x] Fix InputPassword className quotes
  - [x] Read `src/components/ui/input-password.tsx`
  - [x] **Fixed:** Replaced template literal with cn() utility for consistency
  - [x] **Fixed:** Normalized icon class order (size first: `h-4 w-4 text-muted-foreground`)
  - [x] Test password input renders correctly ✅

- [x] Fix InputNumber mode integration
  - [x] Read `src/components/ui/input-number.tsx`
  - [x] **Fixed:** Replaced fragile `mode.radius === "rounded-none"` with `isSharpMode()` helper
  - [x] Test number input renders correctly ✅

**Validation:**
```bash
npm run type-check  # ✅ Passed
npm run build       # ✅ Passed
```

### B.1: Migrate Typography Components

**Goal:** Text/Heading/Label use semantic tokens

- [ ] Update Label component
  - [ ] Replace hardcoded font-medium with weight token
  - [ ] Add mode.font support
  - [ ] Verify terminal style (uppercase brackets)
  - [ ] Commit: "Migrate Label to design system"

- [ ] Update any Text/Heading wrapper components
  - [ ] Use typography tokens from spec
  - [ ] Support size variants from scale
  - [ ] Commit: "Migrate Typography to design system"

**Validation:**
```bash
# Verify labels render with [LABEL]: format in terminal theme
# Verify sans font in modern theme
```

### B.2: Migrate Button Component

**Goal:** Button uses semantic tokens exclusively

- [ ] Read `src/components/ui/button.tsx`
- [ ] Replace radius with `mode.radius`
- [ ] Replace font with `mode.font`
- [ ] Add `mode.textTransform` for uppercase
- [ ] Verify all 9 variants work:
  - [ ] default
  - [ ] primary
  - [ ] secondary
  - [ ] outline
  - [ ] ghost
  - [ ] danger/destructive
  - [ ] link
  - [ ] icon
  - [ ] (any others)
- [ ] Verify all sizes work (sm, md, lg)
- [ ] Verify states work (hover, focus, disabled, loading)
- [ ] Test terminal format: `> BUTTON_TEXT`
- [ ] Test modern format: `Button Text`
- [ ] Commit: "Migrate Button to design system"

**Validation:**
```bash
npm run type-check
# Visit /component-showcase or /docs/components/button
# Test all variants in Terminal, Modern, Soft themes
```

### B.3: Migrate Input Component

**Goal:** Input uses semantic tokens exclusively

- [ ] Read `src/components/ui/input.tsx`
- [ ] Replace radius with `mode.radius`
- [ ] Replace font with `mode.font`
- [ ] Use semantic border tokens
- [ ] Use semantic background tokens
- [ ] Verify placeholder uses text-muted
- [ ] Test focus ring (2px, primary color)
- [ ] Test error state (red border)
- [ ] Test disabled state (opacity, no cursor)
- [ ] Commit: "Migrate Input to design system"

**Validation:**
```bash
# Test input in all themes
# Verify sharp corners in Terminal, rounded in Modern/Soft
```

### B.4: Migrate Badge Component

**Goal:** Badge uses semantic tokens exclusively

- [ ] Read `src/components/ui/badge.tsx`
- [ ] Replace radius with semantic radius-badge
- [ ] Add mode.textTransform (uppercase in Terminal)
- [ ] Verify all 6 variants:
  - [ ] default
  - [ ] primary
  - [ ] success
  - [ ] warning
  - [ ] danger
  - [ ] outline
- [ ] Verify sizes (sm, md, lg)
- [ ] Commit: "Migrate Badge to design system"

**Validation:**
```bash
# Test badges in all themes
# Terminal: small radius, uppercase
# Modern/Soft: pill shape, sentence case
```

### B.5: Migrate Separator Component

**Goal:** Separator uses semantic tokens

- [ ] Read `src/components/ui/separator.tsx`
- [ ] Use border-default token
- [ ] Verify horizontal and vertical variants
- [ ] Commit: "Migrate Separator to design system"

### B.6: Migrate Input Family

**Goal:** All input variants use semantic tokens

- [ ] Migrate InputPassword
  - [ ] Use mode.radius, mode.font
  - [ ] Verify eye icon toggles
  - [ ] Commit: "Migrate InputPassword to design system"

- [ ] Migrate InputSearch
  - [ ] Use mode.radius, mode.font
  - [ ] Verify search icon
  - [ ] Commit: "Migrate InputSearch to design system"

- [ ] Migrate InputNumber
  - [ ] Use mode.radius, mode.font
  - [ ] Verify +/- buttons
  - [ ] Commit: "Migrate InputNumber to design system"

- [ ] Migrate InputOTP
  - [ ] Use mode.radius, mode.font
  - [ ] Verify all slots render
  - [ ] Commit: "Migrate InputOTP to design system"

- [ ] Migrate InputGroup
  - [ ] Use mode.radius, mode.font
  - [ ] Verify addons render correctly
  - [ ] Commit: "Migrate InputGroup to design system"

- [ ] Migrate Textarea
  - [ ] Use mode.radius, mode.font
  - [ ] Verify resize behavior
  - [ ] Commit: "Migrate Textarea to design system"

### B.7: Migrate Form Controls

**Goal:** Checkbox, Radio, Switch use semantic tokens

- [ ] Migrate Checkbox
  - [ ] Use semantic colors
  - [ ] Verify checked/unchecked states
  - [ ] Commit: "Migrate Checkbox to design system"

- [ ] Migrate RadioGroup
  - [ ] Use semantic colors
  - [ ] Verify selected state
  - [ ] Commit: "Migrate RadioGroup to design system"

- [ ] Migrate Switch
  - [ ] Use semantic colors
  - [ ] Verify on/off states
  - [ ] Commit: "Migrate Switch to design system"

### B.8: Migrate Card Components

**Goal:** All 16 card sub-components use semantic tokens

- [ ] Migrate Card base
  - [ ] Use mode.radius, bg-surface, border-default
  - [ ] Add shadow-card token
  - [ ] Commit: "Migrate Card to design system"

- [ ] Migrate CardHeader
  - [ ] Terminal format: `[ [0x00] TITLE ]`
  - [ ] Use border-b border-border
  - [ ] Commit: "Migrate CardHeader to design system"

- [ ] Migrate CardTitle
  - [ ] Use mode.font
  - [ ] Commit: "Migrate CardTitle to design system"

- [ ] Migrate CardDescription
  - [ ] Use text-muted-foreground
  - [ ] Commit: "Migrate CardDescription to design system"

- [ ] Migrate CardContent
  - [ ] Standard padding
  - [ ] Commit: "Migrate CardContent to design system"

- [ ] Migrate CardFooter
  - [ ] Border and alignment
  - [ ] Commit: "Migrate CardFooter to design system"

- [ ] Migrate any specialized cards (Stat, Feature, etc.)
  - [ ] Apply consistent tokens
  - [ ] Commit: "Migrate specialized cards to design system"

### B.9: Migrate Alert Component

**Goal:** Alert uses semantic tokens

- [ ] Read Alert component
- [ ] Use semantic status colors (info, success, warning, danger)
- [ ] Use mode.radius
- [ ] Verify all variants
- [ ] Commit: "Migrate Alert to design system"

### B.10: Migrate Tabs Component

**Goal:** Tabs use semantic tokens

- [ ] Read Tabs components
- [ ] Use mode.font
- [ ] Use semantic colors for active/inactive
- [ ] Terminal format: `[ TAB_NAME ]`
- [ ] Commit: "Migrate Tabs to design system"

### B.11: Migrate Menu/Dropdown

**Goal:** Menu uses semantic tokens

- [ ] Read Menu/Dropdown components
- [ ] Use mode.radius
- [ ] Use shadow-dropdown
- [ ] Use semantic hover colors
- [ ] Commit: "Migrate Menu to design system"

### B.12: Migrate Navigation Components

**Goal:** Sidebar, Navbar use semantic tokens

- [ ] Migrate Sidebar
  - [ ] Use semantic colors
  - [ ] Use mode.font
  - [ ] Commit: "Migrate Sidebar to design system"

- [ ] Migrate Navbar (if exists)
  - [ ] Use semantic colors
  - [ ] Commit: "Migrate Navbar to design system"

---

## Phase C: Templates

### C.1: Implement AuthPageTemplate

**Goal:** Reusable template for auth pages

- [ ] Read contract from `spec/templates.md`
- [ ] Create `src/components/templates/AuthPageTemplate.tsx`
- [ ] Implement props interface:
  - [ ] title, description
  - [ ] fields array
  - [ ] submitLabel
  - [ ] socialAuth boolean
  - [ ] alternateLink
  - [ ] forgotPasswordLink
- [ ] Use semantic tokens throughout
- [ ] Terminal format for labels and buttons
- [ ] Add to `/templates/` showcase
- [ ] Test with SignIn page
- [ ] Test with SignUp page
- [ ] Verify responsive layout
- [ ] Commit: "Implement AuthPageTemplate"

**Validation:**
```bash
# Visit /templates/auth/sign-in
# Verify terminal style renders correctly
# Switch to Modern theme, verify clean style
```

### C.2: Implement ListPageTemplate

**Goal:** Reusable template for table/list pages

- [ ] Read contract from `spec/templates.md`
- [ ] Create `src/components/templates/ListPageTemplate.tsx`
- [ ] Implement props interface:
  - [ ] title
  - [ ] columns
  - [ ] data
  - [ ] searchPlaceholder
  - [ ] filters
  - [ ] createAction
  - [ ] bulkActions
  - [ ] pagination
  - [ ] emptyState
- [ ] Integrate with DataTable component
- [ ] Add to `/templates/` showcase
- [ ] Test with mock data
- [ ] Test empty state
- [ ] Commit: "Implement ListPageTemplate"

### C.3: Implement DashboardPageTemplate

**Goal:** Reusable template for overview pages

- [ ] Read contract from `spec/templates.md`
- [ ] Create `src/components/templates/DashboardPageTemplate.tsx`
- [ ] Implement props interface:
  - [ ] title
  - [ ] stats array
  - [ ] actions
  - [ ] dateRange
  - [ ] children
- [ ] Stats grid (4 columns on desktop)
- [ ] Add to `/templates/` showcase
- [ ] Commit: "Implement DashboardPageTemplate"

### C.4: Implement DetailPageTemplate

**Goal:** Reusable template for entity detail pages

- [ ] Read contract from `spec/templates.md`
- [ ] Create `src/components/templates/DetailPageTemplate.tsx`
- [ ] Implement props interface:
  - [ ] title
  - [ ] breadcrumbs
  - [ ] actions
  - [ ] tabs
  - [ ] children
  - [ ] metadata
- [ ] Tabbed content support
- [ ] Metadata sidebar
- [ ] Add to `/templates/` showcase
- [ ] Commit: "Implement DetailPageTemplate"

### C.5: Implement SettingsPageTemplate

**Goal:** Reusable template for settings pages

- [ ] Read contract from `spec/templates.md`
- [ ] Create `src/components/templates/SettingsPageTemplate.tsx`
- [ ] Implement props interface:
  - [ ] title
  - [ ] sections array
  - [ ] children
  - [ ] onSave
  - [ ] onReset
- [ ] Sidebar navigation
- [ ] Danger zone styling
- [ ] Add to `/templates/` showcase
- [ ] Commit: "Implement SettingsPageTemplate"

### C.6: Implement MarketingPageTemplate

**Goal:** Reusable template for marketing pages

- [ ] Read contract from `spec/templates.md`
- [ ] Create `src/components/templates/MarketingPageTemplate.tsx`
- [ ] Implement props interface:
  - [ ] title, description
  - [ ] hero section
  - [ ] features array
  - [ ] testimonials array
  - [ ] faq array
  - [ ] cta section
- [ ] Add to `/templates/` showcase
- [ ] Commit: "Implement MarketingPageTemplate"

### C.7: Implement LegalPageTemplate

**Goal:** Reusable template for legal pages

- [ ] Read contract from `spec/templates.md`
- [ ] Create `src/components/templates/LegalPageTemplate.tsx`
- [ ] Implement props interface:
  - [ ] title
  - [ ] lastUpdated
  - [ ] content
  - [ ] tableOfContents
  - [ ] printButton
- [ ] Add to `/templates/` showcase
- [ ] Commit: "Implement LegalPageTemplate"

### C.8: Implement UtilityPageTemplate

**Goal:** Reusable template for error/utility pages

- [ ] Read contract from `spec/templates.md`
- [ ] Create `src/components/templates/UtilityPageTemplate.tsx`
- [ ] Implement props interface:
  - [ ] code (404, 500, etc.)
  - [ ] title
  - [ ] description
  - [ ] primaryAction
  - [ ] secondaryAction
  - [ ] icon
- [ ] Centered layout
- [ ] Add to `/templates/` showcase
- [ ] Commit: "Implement UtilityPageTemplate"

---

## Phase D: Page Migration

### D.1: Migrate Auth Pages

**Goal:** All 6 auth pages use AuthPageTemplate

- [ ] Migrate `/auth/signin`
  - [ ] Replace inline layout with AuthPageTemplate
  - [ ] Configure fields, actions, links
  - [ ] Verify visual match
  - [ ] Commit: "Migrate SignIn to AuthPageTemplate"

- [ ] Migrate `/auth/signup`
  - [ ] Replace inline layout with AuthPageTemplate
  - [ ] Commit: "Migrate SignUp to AuthPageTemplate"

- [ ] Migrate `/auth/forgot`
  - [ ] Replace inline layout with AuthPageTemplate
  - [ ] Commit: "Migrate ForgotPassword to AuthPageTemplate"

- [ ] Migrate `/auth/reset`
  - [ ] Replace inline layout with AuthPageTemplate
  - [ ] Commit: "Migrate ResetPassword to AuthPageTemplate"

- [ ] Migrate `/auth/2fa`
  - [ ] Replace inline layout with AuthPageTemplate
  - [ ] Commit: "Migrate TwoFactor to AuthPageTemplate"

- [ ] Migrate `/auth/verify`
  - [ ] Replace inline layout with AuthPageTemplate
  - [ ] Commit: "Migrate EmailVerify to AuthPageTemplate"

### D.2: Fix Typography Inconsistency

**Goal:** All page titles use text-4xl

- [ ] Update `/dashboard/admin/page.tsx` - text-3xl → text-4xl
- [ ] Update `/dashboard/admin/users/page.tsx` - text-3xl → text-4xl
- [ ] Update `/dashboard/admin/analytics/page.tsx` - text-3xl → text-4xl
- [ ] Update `/dashboard/admin/audit-log/page.tsx` - text-3xl → text-4xl
- [ ] Update `/dashboard/admin/monitoring/page.tsx` - text-3xl → text-4xl
- [ ] Update `/dashboard/admin/security/page.tsx` - text-3xl → text-4xl
- [ ] Update `/dashboard/admin/feature-flags-db/page.tsx` - text-3xl → text-4xl
- [ ] Update `/examples/admin/page.tsx` - text-3xl → text-4xl
- [ ] Update `/examples/analytics/page.tsx` - text-3xl → text-4xl
- [ ] Update `/examples/user-profile/page.tsx` - text-3xl → text-4xl
- [ ] Commit: "Standardize page titles to text-4xl"

### D.3: Migrate Dashboard Pages

**Goal:** Dashboard pages use DashboardPageTemplate

- [ ] Migrate `/dashboard` main
- [ ] Migrate `/dashboard/admin` overview
- [ ] Migrate `/dashboard/admin/analytics`
- [ ] Migrate `/dashboard/admin/monitoring`
- [ ] Migrate `/examples/analytics`
- [ ] Migrate `/examples/admin`
- [ ] Migrate `/dashboard/billing` overview
- [ ] Migrate `/dashboard/org/[id]`

### D.4: Migrate List Pages

**Goal:** List pages use ListPageTemplate

- [ ] Migrate `/dashboard/admin/users`
- [ ] Migrate `/dashboard/admin/audit-log`
- [ ] Migrate `/dashboard/admin/security`
- [ ] Migrate `/dashboard/admin/feature-flags`
- [ ] Migrate `/dashboard/billing/invoices`
- [ ] Migrate `/dashboard/billing/payment-methods`
- [ ] Migrate `/dashboard/developer/api-keys`
- [ ] Migrate `/dashboard/org/[id]/members`
- [ ] Migrate remaining list pages

### D.5: Migrate Detail Pages

**Goal:** Detail pages use DetailPageTemplate

- [ ] Migrate `/dashboard/profile`
- [ ] Migrate `/dashboard/account`
- [ ] Migrate `/dashboard/org/[id]/settings`
- [ ] Migrate remaining detail pages

### D.6: Migrate Settings Pages

**Goal:** Settings pages use SettingsPageTemplate

- [ ] Migrate `/dashboard/settings`
- [ ] Migrate `/dashboard/settings/security`
- [ ] Migrate `/dashboard/settings/notifications`
- [ ] Migrate `/dashboard/settings/privacy`
- [ ] Migrate remaining settings pages

### D.7: Migrate Marketing Pages

**Goal:** Marketing pages use MarketingPageTemplate

- [ ] Migrate landing page `/`
- [ ] Migrate `/features`
- [ ] Migrate `/pricing`
- [ ] Migrate `/about`
- [ ] Migrate `/contact`
- [ ] Migrate `/blog`
- [ ] Migrate `/blog/[slug]`

### D.8: Migrate Legal Pages

**Goal:** Legal pages use LegalPageTemplate

- [ ] Migrate `/terms`
- [ ] Migrate `/privacy`
- [ ] Migrate `/cookies`
- [ ] Migrate `/refund`

### D.9: Migrate Utility Pages

**Goal:** Utility pages use UtilityPageTemplate

- [ ] Migrate `/not-found`
- [ ] Migrate `/error`
- [ ] Migrate `/maintenance`
- [ ] Migrate `/loading`

---

## Phase E: Cleanup

### E.1: Remove Deprecated Code

**Goal:** Clean up backwards compatibility layer

- [ ] Identify unused mode helper functions
- [ ] Remove deprecated token exports
- [ ] Remove unused CSS variables
- [ ] Update all imports to new system
- [ ] Commit: "Remove deprecated design system code"

### E.2: Consolidate CSS

**Goal:** Single source of truth for styles

- [ ] Merge token imports into globals.css
- [ ] Remove redundant utility classes
- [ ] Clean up unused Tailwind classes
- [ ] Verify bundle size not increased
- [ ] Commit: "Consolidate CSS"

### E.3: Delete Dead Components

**Goal:** Remove replaced/unused components

- [ ] Identify components replaced by templates
- [ ] Identify duplicate component variations
- [ ] Delete unused files
- [ ] Update component index exports
- [ ] Commit: "Remove unused components"

### E.4: Update Documentation

**Goal:** Documentation reflects new system

- [ ] Update DESIGN_SYSTEM.md
- [ ] Update CLAUDE.md if needed
- [ ] Update component documentation pages
- [ ] Update template documentation
- [ ] Verify all examples work
- [ ] Commit: "Update documentation for new design system"

### E.5: Final Audit

**Goal:** Verify 98%+ compliance

- [ ] Run full design system audit
- [ ] Fix any remaining violations
- [ ] Verify all pages render correctly
- [ ] Verify theme switching works everywhere
- [ ] Test in all browsers (Chrome, Firefox, Safari)
- [ ] Test responsive layouts (320px - 1536px)
- [ ] Test accessibility (keyboard, screen reader)
- [ ] Commit: "Complete design system migration"

---

## Verification Checklist

### Per-Phase Verification

**After Phase A:**
- [ ] Theme switching works
- [ ] No FOUC
- [ ] All tokens available in devtools
- [ ] No visual regressions

**After Phase B:**
- [ ] All components render correctly
- [ ] All variants work
- [ ] Terminal aesthetic preserved
- [ ] Modern/Soft themes work

**After Phase C:**
- [ ] All templates render correctly
- [ ] Templates are responsive
- [ ] Templates follow contracts

**After Phase D:**
- [ ] All pages render correctly
- [ ] No layout regressions
- [ ] Functionality preserved

**After Phase E:**
- [ ] No deprecated code remains
- [ ] Bundle size acceptable
- [ ] All tests pass
- [ ] Documentation complete

---

## Progress Tracking

| Phase | Total Tasks | Completed | Status |
|-------|-------------|-----------|--------|
| A: Foundation | 6 | 0 | Not Started |
| B: Components | 12 | 1 | **B.0 Complete** |
| C: Templates | 8 | 0 | Not Started |
| D: Pages | 9 | 0 | Not Started |
| E: Cleanup | 5 | 0 | Not Started |

**Overall: 1 / 40 major tasks**

### Execution Log

| Date | Phase | Task | Files Changed | Notes |
|------|-------|------|---------------|-------|
| 2025-12-05 | B.0 | Critical Bug Fixes | 3 files | InputNumber, InputPassword, InputOTP |

---

*Checklist Version 1.0.0*
