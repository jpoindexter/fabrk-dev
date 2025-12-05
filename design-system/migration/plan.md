# Design System Migration Plan

> Controlled migration from current state to unified design system.

## Executive Summary

**Current State**: 206 pages, 89% average compliance, fragmented token usage
**Target State**: 95%+ template coverage, 98%+ design system compliance
**Strategy**: Bottom-up migration (tokens → components → templates → pages)
**Risk Level**: LOW (backwards compatibility layer in place)

---

## Migration Strategy

### Principle 1: Bottom-Up Layering

```
┌─────────────────────────────────────────────────────────────┐
│  PHASE E: Cleanup                                           │
│  Remove dead code, deprecated exports, unused styles        │
├─────────────────────────────────────────────────────────────┤
│  PHASE D: Pages                                             │
│  Migrate pages to use templates, verify visual consistency  │
├─────────────────────────────────────────────────────────────┤
│  PHASE C: Templates                                         │
│  Build 8 page templates using normalized components         │
├─────────────────────────────────────────────────────────────┤
│  PHASE B: Components                                        │
│  Normalize 40+ UI components to use tokens exclusively      │
├─────────────────────────────────────────────────────────────┤
│  PHASE A: Tokens & Themes                                   │
│  Wire up CSS variables, verify theme switching works        │
└─────────────────────────────────────────────────────────────┘
```

**Why bottom-up?**
1. Each layer builds on stable foundations
2. Easier to test in isolation
3. No "big bang" refactor - incremental progress
4. Can ship improvements between phases

### Principle 2: Backwards Compatibility First

The `mode` object and helper functions (`formatLabel`, `formatButtonText`, `formatCardTitle`) remain functional throughout migration. Components continue to work during transition.

**Deprecation path:**
1. Phase A-B: `mode` still works, components migrate to tokens
2. Phase C-D: Templates use tokens directly, pages migrate
3. Phase E: Remove `mode` and deprecated exports

### Principle 3: Visual Regression Testing

Every change must be visually verified:
1. **Before**: Screenshot current state
2. **After**: Screenshot new state
3. **Compare**: Diff should show intentional changes only

Tools:
- `/visual-test` page for side-by-side comparison
- Component showcase for isolated testing
- Manual spot-checks on key pages

---

## Phase Breakdown

### Phase A: Tokens & Themes (Foundation)

**Goal**: CSS variables wired up, theme switching functional

**Duration**: 1-2 sessions

**Steps**:
1. Generate CSS from `tokens/primitives.ts`
2. Create CSS variable mapping in `globals.css`
3. Wire up `ThemeProvider` in app layout
4. Verify `data-theme` attribute switches correctly
5. Test all 3 themes: terminal, modern, soft

**Validation**:
- [ ] Theme toggle works without page refresh
- [ ] No flash of unstyled content (FOUC)
- [ ] All semantic tokens resolve to correct values
- [ ] Dark/light mode switching works

**Risk**: LOW - additive changes only, no breaking changes

---

### Phase B: Components (Normalization)

**Goal**: All 40+ UI components use tokens exclusively

**Duration**: 3-5 sessions

**Order** (by dependency):
1. **Typography** - Text, Heading, Label components
2. **Layout** - Container, Stack, Grid, Flex
3. **Surfaces** - Card, Panel, Section
4. **Forms** - Input, Textarea, Select, Checkbox, Radio
5. **Actions** - Button, IconButton, Link
6. **Feedback** - Alert, Toast, Badge, Progress
7. **Navigation** - Tabs, Breadcrumb, Pagination
8. **Data** - Table, List, DataTable
9. **Overlays** - Modal, Sheet, Dropdown, Tooltip

**Per-component checklist**:
- [ ] Remove hardcoded values
- [ ] Apply semantic tokens
- [ ] Use `mode.font`, `mode.radius` from design system
- [ ] Verify terminal aesthetic (rounded-none, font-mono)
- [ ] Test all variants
- [ ] Update component documentation

**Validation**:
- [ ] Component showcase renders correctly
- [ ] All variants work
- [ ] No visual regressions
- [ ] TypeScript types still valid

**Risk**: MEDIUM - changes affect all pages using components

**Mitigation**:
- One component at a time
- Run type-check and build after each
- Visual regression on showcase page

---

### Phase C: Templates (Implementation)

**Goal**: 8 page templates built and tested

**Duration**: 4-6 sessions

**Order** (by priority from spec):
1. **AuthPageTemplate** - Sign in/up flows (6 pages)
2. **ListPageTemplate** - Tables and lists (15 pages)
3. **DashboardPageTemplate** - Overview pages (8 pages)
4. **DetailPageTemplate** - Entity views (10 pages)
5. **SettingsPageTemplate** - Config forms (8 pages)
6. **MarketingPageTemplate** - Landing pages (10 pages)
7. **LegalPageTemplate** - Policy pages (4 pages)
8. **UtilityPageTemplate** - Error pages (5 pages)

**Per-template checklist**:
- [ ] Create template component in `src/components/templates/`
- [ ] Implement contract from `spec/templates.md`
- [ ] Use normalized components only
- [ ] Add to `/templates/` showcase
- [ ] Test with mock data
- [ ] Document props and usage

**Validation**:
- [ ] Template renders correctly in showcase
- [ ] All slots/props work as expected
- [ ] Responsive behavior correct
- [ ] Matches terminal aesthetic

**Risk**: LOW - new code, no changes to existing pages yet

---

### Phase D: Pages (Migration)

**Goal**: All 191 template-candidate pages use templates

**Duration**: 8-12 sessions

**Order** (by compliance score, highest first):
1. **Docs pages** - Already complete (151 pages, 100%)
2. **Auth pages** - 6 pages, 90% compliance
3. **Template showcase** - 30 pages, 92% compliance
4. **Dashboard pages** - 8 pages, 88% compliance
5. **List pages** - 15 pages, 82% compliance
6. **Detail pages** - 10 pages, 80% compliance
7. **Settings pages** - 8 pages, 75% compliance
8. **Marketing pages** - 10 pages, 85% compliance
9. **Legal pages** - 4 pages, 70% compliance
10. **Utility pages** - 5 pages, 85% compliance

**Per-page checklist**:
- [ ] Identify target template
- [ ] Extract page-specific content
- [ ] Wrap with template component
- [ ] Remove redundant layout code
- [ ] Verify visual match
- [ ] Run type-check

**Validation**:
- [ ] Page renders correctly
- [ ] No layout regressions
- [ ] Functionality preserved
- [ ] Build passes

**Risk**: MEDIUM-HIGH - changes visible to users

**Mitigation**:
- Start with lowest-traffic pages
- One page category at a time
- Feature flag for A/B testing if needed

---

### Phase E: Cleanup (Finalization)

**Goal**: Remove deprecated code, dead styles, unused exports

**Duration**: 1-2 sessions

**Steps**:
1. Remove `mode` backwards compatibility layer
2. Delete deprecated token exports
3. Remove unused CSS classes
4. Clean up component exports
5. Update all documentation
6. Final audit pass

**Checklist**:
- [ ] No console warnings about deprecated usage
- [ ] No unused exports in design-system/
- [ ] No orphaned CSS variables
- [ ] Documentation reflects final API
- [ ] All tests pass

**Validation**:
- [ ] Full build succeeds
- [ ] All pages render correctly
- [ ] No TypeScript errors
- [ ] Bundle size reduced

**Risk**: LOW - cleanup only, core functionality stable

---

## Avoiding Breakage

### Pre-Migration Safeguards

1. **Snapshot current state**
   - Screenshot all key pages
   - Export current component props
   - Document current behavior

2. **Feature flags** (if needed)
   - `USE_NEW_TOKENS` - switch token source
   - `USE_NEW_TEMPLATES` - switch page templates
   - Gradual rollout capability

3. **Automated checks**
   - Type-check on every commit
   - Build verification
   - Visual regression (manual initially)

### During Migration

1. **Atomic commits**
   - One component/page per commit
   - Clear commit messages
   - Easy to revert

2. **Continuous validation**
   - Run `npm run type-check` after each change
   - Run `npm run build` before push
   - Spot-check affected pages

3. **Parallel paths**
   - Keep old code until new is verified
   - Don't delete until migrated pages are stable

### Post-Migration Verification

1. **Full regression test**
   - Visit all page categories
   - Test all interactive features
   - Verify theme switching

2. **Performance check**
   - Bundle size comparison
   - Initial load time
   - Runtime performance

3. **Accessibility audit**
   - Color contrast verification
   - Keyboard navigation
   - Screen reader testing

---

## Visual Validation Approach

### Level 1: Component Isolation

**Where**: `/component-showcase`

**Method**:
1. Render component in all variants
2. Compare to design spec
3. Test interactive states

**Frequency**: After each component update

### Level 2: Template Verification

**Where**: `/templates/*`

**Method**:
1. Render template with mock data
2. Compare layout to spec
3. Test responsive breakpoints

**Frequency**: After each template build

### Level 3: Page Regression

**Where**: Actual pages in app

**Method**:
1. Before/after screenshots
2. Side-by-side comparison
3. Diff highlighting

**Frequency**: After each page migration

### Level 4: Full App Sweep

**Where**: All routes

**Method**:
1. Automated crawl (future)
2. Manual walkthrough (current)
3. User testing (optional)

**Frequency**: End of each phase

---

## Timeline Estimate

| Phase | Sessions | Pages/Components | Risk |
|-------|----------|------------------|------|
| A: Tokens | 1-2 | N/A (foundation) | LOW |
| B: Components | 3-5 | 40+ components | MEDIUM |
| C: Templates | 4-6 | 8 templates | LOW |
| D: Pages | 8-12 | 191 pages | MEDIUM-HIGH |
| E: Cleanup | 1-2 | N/A (cleanup) | LOW |

**Total**: 17-27 sessions

**Parallel opportunities**:
- Phase B components can be done in parallel
- Phase D page categories can be parallelized
- Phase E can start before Phase D completes for stable sections

---

## Success Metrics

### Quantitative

| Metric | Current | Target |
|--------|---------|--------|
| Template coverage | 75% | 95%+ |
| Design system compliance | 89% | 98%+ |
| Hardcoded colors | 0 | 0 |
| Off-grid spacing | ~50 | 0 |
| Typography violations | ~30 | 0 |

### Qualitative

- [ ] Theme switching works flawlessly
- [ ] All pages feel cohesive
- [ ] Terminal aesthetic consistent
- [ ] New pages are easy to create
- [ ] Documentation is complete

---

## Rollback Strategy

### If Component Breaks

1. Revert component changes
2. Keep old implementation
3. Debug in isolation
4. Re-attempt with fix

### If Template Breaks

1. Revert template
2. Pages fall back to inline layout
3. Fix template
4. Re-migrate pages

### If Page Breaks

1. Revert page to pre-migration
2. Keep using old layout
3. Debug template integration
4. Re-attempt migration

### Nuclear Option

1. Revert to pre-Phase-A commit
2. All pages use old patterns
3. Backwards compatibility layer still works
4. Restart migration with lessons learned

---

## Recommended AI Execution Approach

### Session Strategy

Execute migration in focused sessions, each completing atomic units of work:

#### Phase A Sessions (1-2 sessions)
- Session A.1: Create CSS files (primitives.css, semantic.css)
- Session A.2: Wire ThemeProvider + test theme switching

#### Phase B Sessions (3-5 sessions)
- Session B.1: Critical bug fixes (InputOTP, InputGroup, InputPassword, InputNumber)
- Session B.2: Atoms (Button, Input, Badge, Label, Separator)
- Session B.3: Input family (6 components)
- Session B.4: Cards (16 sub-components)
- Session B.5: Navigation + Feedback (Tabs, Menu, Alert, Toast)

#### Phase C Sessions (4-6 sessions)
- Session C.1: AuthPageTemplate + test with 2 pages
- Session C.2: ListPageTemplate + test with 2 pages
- Session C.3: DashboardPageTemplate + DetailPageTemplate
- Session C.4: SettingsPageTemplate + MarketingPageTemplate
- Session C.5: LegalPageTemplate + UtilityPageTemplate

#### Phase D Sessions (8-12 sessions)
- Session D.1-2: Auth pages (6 pages)
- Session D.3-5: Dashboard + Admin pages (16 pages)
- Session D.6-8: List + Detail pages (25 pages)
- Session D.9-10: Settings pages (8 pages)
- Session D.11-12: Marketing + Legal + Utility (19 pages)

#### Phase E Sessions (1-2 sessions)
- Session E.1: Remove deprecated code, clean CSS
- Session E.2: Final audit, documentation update

### Command Patterns

Use these command patterns when executing migration:

**Component Migration:**
```
"Migrate the Button component to the new design system.
1. Read the component file
2. Check spec/components.md for token mappings
3. Replace hardcoded values with semantic tokens
4. Verify mode.radius, mode.font, mode.textTransform work
5. Test all variants (primary, secondary, outline, ghost, danger, link)
6. Run lint and type-check
7. Commit if passing"
```

**Page Migration:**
```
"Migrate the Admin Users page to ListPageTemplate.
1. Read the current page implementation
2. Read the ListPageTemplate contract from spec/templates.md
3. Extract page-specific data and columns
4. Wrap with ListPageTemplate
5. Remove redundant layout code
6. Verify visual match with before state
7. Run build
8. Commit if passing"
```

**Validation Command:**
```
"Run full design system validation:
1. npm run type-check
2. npm run lint
3. npm run scan:hex
4. Check no text-3xl (should be text-4xl)
5. Check no rounded-sm/md/lg (should be rounded-none or mode.radius)
6. Report any violations found"
```

### Session Boundaries

Each session should:
1. **Start** with reading the current file(s) to migrate
2. **Check** the relevant spec file for target state
3. **Execute** one atomic unit (1 component, 1 template, or 2-5 pages)
4. **Validate** with type-check and lint
5. **Commit** with clear message: `"Phase X.Y: Migrate ComponentName to design system"`

### Commit Message Format

```
Phase A.1: Add primitives.css with OKLCH color tokens

Phase B.2: Migrate Button component to semantic tokens
- Replace hardcoded radius with mode.radius
- Add mode.textTransform for uppercase
- Verify all 9 variants work

Phase C.1: Implement AuthPageTemplate
- Create template component with contract from spec
- Test with SignIn and SignUp pages
- Add to /templates/ showcase

Phase D.3: Migrate Admin Users page to ListPageTemplate
- Extract columns and data fetching
- Wrap with template
- Verify visual match
```

---

## Critical Issues to Fix First

Before starting Phase B component migration, these critical bugs must be fixed:

### Bug 1: InputOTP Template Literal
**File:** `src/components/ui/input-otp.tsx`
**Issue:** `first:${mode.radius}` in className doesn't work with Tailwind JIT
**Fix:** Use mode helper or conditional class

### Bug 2: InputGroup Template Literal
**File:** `src/components/ui/input-group.tsx`
**Issue:** `[&>kbd]:${mode.radius}` in className doesn't work
**Fix:** Use mode helper or conditional class

### Bug 3: InputPassword Malformed className
**File:** `src/components/ui/input-password.tsx`
**Issue:** Extra quotes in className string
**Fix:** Remove extra quotes

### Bug 4: InputNumber Mode Integration
**File:** `src/components/ui/input-number.tsx`
**Issue:** Fragile string comparison on mode.radius
**Fix:** Use proper mode helper function

---

## Key Files Reference

### Files to Create

| File | Purpose | Phase |
|------|---------|-------|
| `design-system/css/primitives.css` | Raw OKLCH values | A.1 |
| `design-system/css/semantic.css` | Role-based tokens | A.1 |
| `design-system/css/themes/terminal.css` | Terminal theme | A.1 |
| `design-system/css/themes/modern.css` | Modern theme | A.1 |
| `design-system/css/themes/soft.css` | Soft theme | A.1 |
| `design-system/providers/ThemeProvider.tsx` | React context | A.2 |
| `src/components/templates/AuthPageTemplate.tsx` | Auth template | C.1 |
| `src/components/templates/ListPageTemplate.tsx` | List template | C.2 |
| `src/components/templates/DashboardPageTemplate.tsx` | Dashboard template | C.3 |
| `src/components/templates/DetailPageTemplate.tsx` | Detail template | C.3 |
| `src/components/templates/SettingsPageTemplate.tsx` | Settings template | C.4 |
| `src/components/templates/MarketingPageTemplate.tsx` | Marketing template | C.4 |
| `src/components/templates/LegalPageTemplate.tsx` | Legal template | C.5 |
| `src/components/templates/UtilityPageTemplate.tsx` | Utility template | C.5 |

### Files to Update

| File | Changes | Phase |
|------|---------|-------|
| `src/app/layout.tsx` | Add ThemeProvider | A.2 |
| `src/app/globals.css` | Import new tokens | A.1 |
| `src/components/ui/button.tsx` | Semantic tokens | B.2 |
| `src/components/ui/input.tsx` | Semantic tokens | B.2 |
| `src/components/ui/badge.tsx` | Semantic tokens | B.2 |
| `src/components/ui/card.tsx` | Semantic tokens | B.4 |
| All 18 admin/example pages | Title text-3xl → text-4xl | D.* |

---

## Next Steps

1. **Review and approve this plan**
2. **Create checklist.md** with step-by-step tasks
3. **Create map.json** with component/page issue mapping
4. **Start Phase A.1**: Generate CSS from tokens

See `checklist.md` for detailed step-by-step tasks.
See `map.json` for component/page mapping with issues.
