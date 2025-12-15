# 🧨 TEMPLATE UNIFICATION REFACTOR — FABRK LIBRARY SYSTEM
**One Template • Zero Duplication • Bordered Tabs • Terminal Aesthetic**

**STATUS**: Ready for Execution
**SCOPE**: `src/app/(marketing)/library/` (40 pages)
**GOAL**: Unify all library pages under ONE canonical template system
**CRITICAL**: Must use `StyledTabs` (bordered style), not base `Tabs` (underline style)

---

## 0) CODEBASE CONTEXT (MUST READ FIRST)

### Current State
- **Existing Template**: `src/components/library/template-showcase-page.tsx`
  - Already used by ~15 pages
  - Currently uses base `Tabs` (WRONG - underline style)
  - Needs to be refactored to use `StyledTabs` (bordered style)
- **Total Library Pages**: 40 pages in `src/app/(marketing)/library/`
- **Page Patterns Identified**:
  1. Category pages (~5) - show grid of multiple templates
  2. Individual template pages (~15) - use `TemplateShowcasePage`
  3. Custom layout pages (~4) - unique structures (onboarding, chart-library, docs, error-pages)
  4. Manual implementations (~16) - duplicated code, not using template

### Critical Components
- **`StyledTabs`**: `src/components/ui/styled-tabs.tsx`
  - Bordered tab style (desired appearance)
  - Used in analytics-dashboard (reference implementation)
  - Wraps tabs in Card with CardHeader
  - **MUST use this instead of base Tabs component**

- **Base `Tabs`**: `src/components/ui/tabs.tsx`
  - Underline style (NOT what we want)
  - Currently used in `TemplateShowcasePage` (WRONG)

### Design System Requirements
- **Terminal Aesthetic**:
  - `rounded-none` on all elements
  - `font-mono` for all text
  - Bracket notation: `[PREVIEW]`, `[CODE]`, `[0x00]`
  - Design tokens only (no hardcoded colors)
- **Design Tokens**:
  - Import from `@/design-system`: `mode.font`, `mode.radius`, `mode.color`
  - NO hardcoded colors, spacing, or typography
- **File Size Limit**: 300 lines maximum per file
- **Component Rules**:
  - Base UI components in `src/components/ui/` are LOCKED
  - Templates in `src/components/library/` can be modified
  - Pages in `src/app/` can be freely modified

### Technical Constraints
- **Next.js 16 App Router**
- **TypeScript strict mode**
- **Server Components by default** (use `'use client'` only when needed)
- **Pre-commit hooks enforce**:
  - TypeScript compilation
  - No hardcoded colors (`npm run scan:hex`)
  - File size limits
  - Accessibility (aria-labels)

---

## 1) NON-NEGOTIABLE OUTCOMES

After this refactor:

✅ **ONE canonical template system** handles all library page layouts
✅ **StyledTabs component** used for ALL tabs (bordered style, not underline)
✅ **Zero duplication** - no copy-paste layout code
✅ **Pages are composition** - content only, no layout logic
✅ **Design system compliant** - tokens only, no hardcoded values
✅ **Terminal aesthetic** - `rounded-none`, `font-mono`, bracket notation
✅ **File size < 300 lines** for all templates and pages
✅ **Extensibility** - new pages created via composition, not copy-paste

**FAILURE CONDITIONS**:
- ❌ Any template bypasses the unified system
- ❌ Any tabs use base `Tabs` instead of `StyledTabs`
- ❌ Any hardcoded colors, spacing, or typography
- ❌ Any layout duplication across pages
- ❌ Any file > 300 lines

---

## 2) REFACTOR STRATEGY (INCREMENTAL, NOT BIG-BANG)

### Phase 1: Analysis & Design (PRE-EXECUTION)
**DO THIS FIRST - DO NOT SKIP**

1. **Inventory Current State**:
   ```bash
   # Count pages by pattern
   find src/app/\(marketing\)/library -name "page.tsx" | wc -l

   # Find pages using TemplateShowcasePage
   grep -r "TemplateShowcasePage" src/app/\(marketing\)/library --include="*.tsx"

   # Find pages using base Tabs
   grep -r "from '@/components/ui/tabs'" src/app/\(marketing\)/library --include="*.tsx"
   ```

2. **Classify All 40 Pages**:
   - List each page path
   - Identify pattern (category/individual/custom/manual)
   - Note which use template vs manual layout
   - Note which use base Tabs vs StyledTabs

3. **Design Unified Template API**:
   - Define props that handle ALL patterns:
     - Individual template pages (preview + code)
     - Category pages (grid of templates)
     - Custom layouts (special cases)
   - Ensure `StyledTabs` integration
   - Document slot/variant system

4. **Get Confirmation**:
   - Present analysis and design
   - Wait for user approval
   - **DO NOT PROCEED TO PHASE 2 WITHOUT APPROVAL**

### Phase 2: Refactor TemplateShowcasePage
**ONLY AFTER PHASE 1 APPROVAL**

1. **Update to use StyledTabs**:
   - Replace base `Tabs`/`TabsList`/`TabsTrigger` imports
   - Replace with `StyledTabs`/`StyledTabsContent`
   - Maintain all existing functionality
   - Test one page using the updated template

2. **Add Flexibility**:
   - Add optional `templates` prop for category pages
   - Add optional `customContent` prop for special layouts
   - Maintain backward compatibility with existing pages

3. **Verify**:
   - Check type safety (TypeScript compilation)
   - Visual check (run dev server, view pages)
   - Ensure StyledTabs renders correctly

### Phase 3: Migrate Pages (ONE CATEGORY AT A TIME)
**INCREMENTAL MIGRATION - COMMIT AFTER EACH CATEGORY**

1. **Order of Migration**:
   - Start with easiest: pages already using TemplateShowcasePage (just update imports)
   - Then: manual individual pages (convert to TemplateShowcasePage)
   - Then: category pages (use new `templates` prop)
   - Finally: custom layouts (case-by-case assessment)

2. **Per-Category Checklist**:
   - [ ] Identify all pages in category
   - [ ] Refactor to use unified template
   - [ ] Visual verification (dev server)
   - [ ] TypeScript compilation (`npm run type-check`)
   - [ ] Commit changes
   - [ ] Test in browser (Chrome, Safari, Firefox)
   - [ ] **STOP - GET APPROVAL BEFORE NEXT CATEGORY**

3. **Rollback Plan**:
   - Each category is a separate commit
   - If issues found, `git revert <commit-hash>`
   - Fix template, then retry migration

### Phase 4: Cleanup & Documentation
**ONLY AFTER ALL MIGRATIONS COMPLETE**

1. **Delete Obsolete Files**:
   - Remove any duplicated templates
   - Remove any unused components
   - Document deletions

2. **Update Documentation**:
   - Update `CLAUDE.md` with new template usage
   - Add examples to template file comments
   - Update any relevant docs in `docs/`

3. **Final Verification**:
   - Run all pre-commit hooks: `npm run lint`, `npm run type-check`, `npm run scan:hex`
   - Visual test ALL 40 pages
   - Accessibility audit (`npm run audit:a11y` if available)
   - Performance check (no regressions)

---

## 3) CANONICAL TEMPLATE API DESIGN

### Required Props Interface
```typescript
export interface UnifiedLibraryTemplateProps {
  // COMMON (all page types)
  badge: string;                          // e.g., "ANALYTICS"
  title: string;                          // e.g., "Analytics Dashboard"
  description: string;                    // SEO description

  // INDIVIDUAL TEMPLATE MODE
  templateId?: string;                    // For related templates
  category?: { name: string; href: string }; // Breadcrumb
  preview?: React.ReactNode;              // Live preview component
  code?: string;                          // Source code
  fileStructure?: string | FileStructureItem[];
  features?: string[];                    // Feature list
  showRelated?: boolean;                  // Show related templates

  // CATEGORY MODE
  templates?: TemplateListItem[];         // Grid of templates
  categoryOverview?: string;              // Overview code/docs

  // CUSTOM MODE
  customContent?: React.ReactNode;        // Escape hatch for special pages

  // TABS CONFIGURATION
  tabs?: StyledTab[];                     // Custom tab definitions
  defaultTab?: string;                    // Default active tab
}
```

### Tab System (CRITICAL)
```typescript
// MUST use StyledTabs component
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';

// Example in template:
<StyledTabs
  code="0x00"
  title="TEMPLATE_PREVIEW"
  tabs={[
    { id: "preview", label: "[PREVIEW]" },
    { id: "code", label: "[CODE]" },
  ]}
  value={activeTab}
  onValueChange={setActiveTab}
>
  <StyledTabsContent value="preview">
    <Card><CardHeader code="0x01" title="LIVE_PREVIEW" />
      {preview}
    </Card>
  </StyledTabsContent>
  <StyledTabsContent value="code">
    <Card><CardHeader code="0x01" title="SOURCE_CODE" />
      <CodeBlock code={code} language="tsx" />
    </Card>
  </StyledTabsContent>
</StyledTabs>
```

### Usage Examples
```tsx
// Individual template page
<UnifiedLibraryTemplate
  badge="ANALYTICS"
  title="Analytics Dashboard"
  description="Full-featured analytics dashboard"
  templateId="analytics-dashboard"
  preview={<AnalyticsPreview />}
  code={templateCode}
  fileStructure="app/dashboard/analytics/page.tsx"
  features={["Charts", "Metrics", "Filters"]}
/>

// Category page
<UnifiedLibraryTemplate
  badge="ADMIN PANELS"
  title="Admin Panels"
  description="Backend admin interfaces"
  templates={[
    { id: "user-management", name: "User Management", ... },
    { id: "webhooks", name: "Webhooks", ... },
  ]}
  categoryOverview={overviewCode}
/>

// Custom layout (escape hatch)
<UnifiedLibraryTemplate
  badge="ONBOARDING"
  title="Onboarding Flow"
  description="Multi-step wizard and checklist variants"
  customContent={<CustomOnboardingLayout />}
/>
```

---

## 4) HARD ENGINEERING STANDARDS (ZERO TOLERANCE)

### File Size
- **Templates**: ≤ 300 lines
- **Pages using templates**: ≤ 150 lines (composition only, no layout)
- **Violations**: MUST be refactored before commit

### Design System Compliance
```bash
# Run before EVERY commit
npm run scan:hex           # Detects hardcoded colors
npm run type-check         # TypeScript compilation
npm run lint               # ESLint + Prettier
```

**Violations**:
- ❌ `bg-white`, `text-gray-500`, `#hexcolor`
- ❌ `rounded-sm/md/lg/xl` (use `rounded-none`)
- ❌ `shadow-md/lg/xl` (use `shadow-sm`)
- ❌ Direct `process.env` access (use `@/lib/env`)
- ❌ `<img>` without `alt` attribute
- ❌ Icon-only buttons without `aria-label`

**Correct Patterns**:
- ✅ `bg-background`, `text-foreground`, `border-border`
- ✅ `mode.font`, `mode.radius`, `mode.color.text.muted`
- ✅ `rounded-none` on all elements
- ✅ `font-mono` from body tag (JetBrains Mono applied globally)

### Terminal Aesthetic Enforcement
```tsx
// CORRECT
<Button className={cn(mode.radius, mode.font, "text-xs")}>
  > SUBMIT
</Button>

// WRONG
<Button className="rounded-md text-sm">Submit</Button>
```

### Tab Component Enforcement
```tsx
// CORRECT - StyledTabs with borders
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';

<StyledTabs
  code="0x00"
  title="NAVIGATION"
  tabs={[{ id: "tab1", label: "[TAB]" }]}
  value={tab}
  onValueChange={setTab}
>
  <StyledTabsContent value="tab1">Content</StyledTabsContent>
</StyledTabs>

// WRONG - Base tabs with underline
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
<Tabs><TabsList><TabsTrigger>Tab</TabsTrigger></TabsList></Tabs>
```

---

## 5) VERIFICATION GATES (MUST PASS ALL)

Run these checks at EVERY phase:

### Gate A: Single Template Authority
```bash
# All library pages should use unified template
grep -r "export default function" src/app/\(marketing\)/library --include="page.tsx" | \
grep -v "UnifiedLibraryTemplate"
# Expected: 0 results (all pages use template)
```

### Gate B: Zero Duplication
```bash
# No duplicate tab structures
grep -rn "TabsList" src/app/\(marketing\)/library --include="*.tsx"
# Expected: 0 results (template handles tabs)

# No duplicate card headers
grep -rn "CardHeader.*0x0" src/app/\(marketing\)/library --include="page.tsx"
# Expected: 0 results (template handles headers)
```

### Gate C: StyledTabs Usage
```bash
# All templates use StyledTabs, not base Tabs
grep -r "from '@/components/ui/tabs'" src/components/library --include="*.tsx"
# Expected: 0 results

grep -r "StyledTabs" src/components/library --include="*.tsx"
# Expected: 1+ results (template uses StyledTabs)
```

### Gate D: Design System Compliance
```bash
npm run scan:hex           # Expected: 0 violations
npm run type-check         # Expected: 0 errors
npm run lint               # Expected: 0 errors
```

### Gate E: File Size Compliance
```bash
find src/components/library src/app/\(marketing\)/library -name "*.tsx" -exec wc -l {} + | \
awk '$1 > 300 { print "VIOLATION:", $2, "(" $1, "lines)" }'
# Expected: 0 violations
```

### Gate F: Accessibility
```bash
# All icon-only buttons have aria-label
node scripts/check-aria-labels.mjs
# Expected: 100% compliance
```

### Gate G: Visual Verification
**Manual Testing Required**:
- [ ] All 40 pages render correctly
- [ ] Tabs have bordered style (not underline)
- [ ] Terminal aesthetic maintained (sharp edges, monospace)
- [ ] No layout shifts or visual regressions
- [ ] Mobile responsive (test on iPhone/Android)
- [ ] Dark mode works (if applicable)

**FAILURE**: If ANY gate fails, STOP and fix before proceeding.

---

## 6) OUTPUT REQUIREMENTS (STRICT FORMAT)

### A) GO / NO-GO Verdict
```
✅ GO - All library pages unified under one template system
OR
❌ NO-GO - [Specific blockers listed]
```

### B) Executive Summary
- **What was wrong**: [Brief description]
- **What changed**: [Key refactors]
- **Impact**: [Pages affected, lines removed, improvements]

### C) Canonical Template Design
```typescript
// Template name, file location
// Prop interface
// Usage examples (3 modes: individual, category, custom)
```

### D) Refactor Summary
**Files Modified**:
- `src/components/library/template-showcase-page.tsx` - Updated to StyledTabs
- `src/app/(marketing)/library/*/page.tsx` (list all)

**Files Deleted**:
- [List any obsolete templates/components]

**Lines of Code**:
- Before: X lines across Y files
- After: X lines across Y files
- Removed: X lines (Y% reduction)

### E) File Coverage Manifest
| File Path | Pattern Before | Pattern After | Status |
|-----------|---------------|---------------|--------|
| `src/app/(marketing)/library/analytics-dashboard/page.tsx` | Individual | Unified Template | ✅ Migrated |
| ... | ... | ... | ... |

**Total**: 40/40 pages migrated (100%)

### F) Gate Results
| Gate | Result | Notes |
|------|--------|-------|
| A - Single Template Authority | ✅ PASS | All pages use UnifiedLibraryTemplate |
| B - Zero Duplication | ✅ PASS | No duplicate tab/card structures |
| C - StyledTabs Usage | ✅ PASS | All tabs use bordered style |
| D - Design System Compliance | ✅ PASS | 0 hex colors, types clean |
| E - File Size Compliance | ✅ PASS | All files < 300 lines |
| F - Accessibility | ✅ PASS | 100% aria-label compliance |
| G - Visual Verification | ✅ PASS | All 40 pages tested |

### G) Post-Refactor Guidelines

**How to Add a New Library Page**:
```tsx
// 1. Create page file
// src/app/(marketing)/library/new-template/page.tsx

import { UnifiedLibraryTemplate } from '@/components/library';

export default function NewTemplatePage() {
  return (
    <UnifiedLibraryTemplate
      badge="NEW"
      title="New Template"
      description="Description for SEO"
      preview={<PreviewComponent />}
      code={sourceCode}
      fileStructure="app/new/page.tsx"
      features={["Feature 1", "Feature 2"]}
    />
  );
}

// 2. Add to library-data.ts
// 3. Test locally
// 4. Commit
```

**How NOT to Break the System**:
- ❌ Never use base `Tabs` component (use `StyledTabs`)
- ❌ Never duplicate layout code (use template slots)
- ❌ Never hardcode colors/spacing (use design tokens)
- ❌ Never exceed 150 lines in page files (composition only)
- ❌ Never skip pre-commit hooks (`--no-verify`)

**Maintenance**:
- All layout changes happen in ONE file: `src/components/library/template-showcase-page.tsx`
- Updating tabs? Update `StyledTabs` component once → affects all pages
- Adding new section? Add slot to template → all pages get it

---

## 7) EXECUTION CHECKLIST

### Pre-Execution (MANDATORY)
- [ ] Read this entire prompt
- [ ] Review `src/components/library/template-showcase-page.tsx`
- [ ] Review `src/components/ui/styled-tabs.tsx`
- [ ] Review analytics-dashboard page (reference implementation)
- [ ] Understand design system constraints from `CLAUDE.md`
- [ ] Run inventory script (count pages, identify patterns)
- [ ] Create git branch: `refactor/unified-library-template`

### Phase 1 (Analysis)
- [ ] Inventory all 40 pages with classification
- [ ] Design unified template API
- [ ] Document slot system
- [ ] Present analysis to user
- [ ] **WAIT FOR APPROVAL**

### Phase 2 (Template Update)
- [ ] Update TemplateShowcasePage to use StyledTabs
- [ ] Add flexibility props (templates, customContent)
- [ ] Test with one existing page
- [ ] TypeScript compilation clean
- [ ] Visual verification (bordered tabs visible)
- [ ] Commit: "refactor: update TemplateShowcasePage to use StyledTabs"

### Phase 3 (Migration)
For each category:
- [ ] Refactor pages to use unified template
- [ ] TypeScript compilation clean
- [ ] Visual verification (dev server)
- [ ] Browser testing (Chrome/Safari/Firefox)
- [ ] Mobile testing (responsive)
- [ ] Commit: "refactor: migrate [category] to unified template"
- [ ] **WAIT FOR APPROVAL BEFORE NEXT**

### Phase 4 (Cleanup)
- [ ] Delete obsolete files
- [ ] Update CLAUDE.md
- [ ] Add usage examples to template comments
- [ ] Run all gates (A-G)
- [ ] Final visual verification (all 40 pages)
- [ ] Commit: "docs: update template documentation"

### Final Checks
- [ ] All 7 gates PASS
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] No hardcoded colors (`npm run scan:hex`)
- [ ] File sizes < 300 lines
- [ ] All 40 pages render correctly
- [ ] Tabs have bordered style everywhere
- [ ] Terminal aesthetic maintained

---

## 8) TONE & ENFORCEMENT

**Ruthless Refactoring**:
- If a template is redundant → DELETE
- If a page bypasses the system → REFACTOR
- If duplication exists → ELIMINATE
- No "future cleanup" promises → FIX NOW

**Zero Tolerance**:
- Hardcoded colors → BLOCKED
- File size > 300 lines → BLOCKED
- Base Tabs usage → BLOCKED
- Duplication → BLOCKED
- Broken terminal aesthetic → BLOCKED

**Quality Bar**:
This is the foundation of the product.
This is what customers see first.
This must be perfect.

**No Compromises**:
- No "good enough for now"
- No "we'll fix it later"
- No "backward compatibility excuses"
- No "just this one exception"

---

## 9) SUCCESS CRITERIA

**LAUNCH READY** when:
✅ ONE template system controls ALL library pages
✅ ALL tabs use `StyledTabs` (bordered style)
✅ ZERO duplication in layout code
✅ 100% design system compliance
✅ 100% accessibility compliance
✅ All 7 gates PASS
✅ All 40 pages tested and verified
✅ Documentation updated
✅ System is maintainable and extensible

**MEASUREMENT**:
- Pages using unified template: **40/40 (100%)**
- Design system violations: **0**
- File size violations: **0**
- Lines of duplicate code: **0**
- Gates passed: **7/7 (100%)**

---

## 10) ROLLBACK PLAN

If something breaks:

1. **Identify Issue**:
   - Which gate failed?
   - Which page(s) affected?
   - Visual regression or compilation error?

2. **Revert**:
   ```bash
   # Revert last commit
   git revert HEAD

   # Or revert specific category
   git revert <commit-hash>
   ```

3. **Fix**:
   - Update template to fix issue
   - Re-test on problematic page
   - Verify all gates pass

4. **Retry**:
   - Re-apply migration
   - Test again
   - Commit when clean

**Emergency Stop**:
If multiple issues found, stop migration and reassess approach.
Do NOT continue breaking things.

---

## 11) FINAL NOTES

**This is a foundation-level refactor.**

Every customer sees these pages.
Every template depends on this system.
Every future page will use this pattern.

Get it right.

**Incremental execution prevents disasters.**
Commit after each category.
Test thoroughly.
No shortcuts.

**The goal is not "done fast".**
The goal is "done right."

---

**END OF PROMPT**

**READY TO EXECUTE?**
- [ ] Read entire prompt
- [ ] Understand all gates
- [ ] Understand all constraints
- [ ] Create branch
- [ ] Start with Phase 1 (Analysis)
- [ ] **DO NOT SKIP TO IMPLEMENTATION**
