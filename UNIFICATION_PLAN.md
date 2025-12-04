# Fabrk Complete Design System Unification Plan

## The Goal
**Change ONE file → entire site updates.** No more touching 50 files to change a color.

### CRITICAL: Aesthetic Switching
You want to be able to switch from **terminal style** to **standard ShadCN/rounded style** by changing ONE config - not editing 200+ files.

**The Problem:** Currently "terminal" is HARDCODED:
- `rounded-none` written directly in 200+ components
- `font-mono` scattered throughout JSX
- `> PREFIX` button text hardcoded
- `[ BRACKETS ]` labels embedded everywhere

**The Solution:** Create a **Visual Mode System** that controls all aesthetic decisions from ONE place.

---

## Current State Analysis

### What's Already Good ✅
| Area | Status | Source of Truth |
|------|--------|-----------------|
| CSS Variables | Centralized | `globals.css` (1,800 lines) |
| Color Themes | 20 themes | `globals.css` |
| UI Components | 93% compliant | `src/components/ui/*` |
| Docs Pages | 100% templatized | `ComponentShowcaseTemplate` |
| Template Gallery | Templatized | `TemplateCategoryPage` |

### What's Broken ❌
| Issue | Impact | Files Affected |
|-------|--------|----------------|
| Marketing pages are ONE-OFFS | Must edit each page individually | 6 pages |
| Colored dots pattern | Inconsistent headers | 53 files |
| Shadow violations | Breaks terminal aesthetic | 41 files |
| Redundant token files | Confusion about source of truth | 3 files |
| No build-time validation | Violations slip through | Ongoing |
| **Hardcoded aesthetic** | Can't switch terminal → standard | 200+ files |

---

## The Fix: 6-Phase Plan

### Phase 0: Create Visual Mode System (2-3 hours) ⭐ CRITICAL
**Goal:** Switch entire aesthetic by changing ONE line

**Create Visual Mode Config:**
```tsx
// src/lib/design-system/visual-mode.ts
export type VisualMode = "terminal" | "standard" | "minimal";

export const visualModes = {
  terminal: {
    radius: "rounded-none",
    font: "font-mono",
    shadow: "",
    buttonPrefix: "> ",
    labelFormat: "brackets",     // [LABEL]:
    cardHeader: "terminal",      // [ [0x00] TITLE ]
    textTransform: "uppercase",
  },
  standard: {
    radius: "rounded-lg",
    font: "font-sans",
    shadow: "shadow-sm",
    buttonPrefix: "",
    labelFormat: "plain",        // Label
    cardHeader: "simple",        // Title
    textTransform: "normal",
  },
  minimal: {
    radius: "rounded-md",
    font: "font-sans",
    shadow: "",
    buttonPrefix: "",
    labelFormat: "plain",
    cardHeader: "minimal",
    textTransform: "normal",
  },
};

// THE ONE LINE TO CHANGE
export const CURRENT_MODE: VisualMode = "terminal";
```

**Create Mode-Aware Utilities:**
```tsx
// src/lib/design-system/use-visual-mode.ts
export function useVisualMode() {
  return visualModes[CURRENT_MODE];
}

// Convenience exports
export const mode = visualModes[CURRENT_MODE];
```

**Update Components to Use Mode:**
```tsx
// BEFORE (hardcoded)
<Button className="rounded-none font-mono">> SUBMIT</Button>

// AFTER (mode-aware)
import { mode } from "@/lib/design-system";
<Button className={cn(mode.radius, mode.font)}>
  {mode.buttonPrefix}SUBMIT
</Button>
```

**Files to Create:**
- `src/lib/design-system/visual-mode.ts`
- `src/lib/design-system/use-visual-mode.ts`

**Files to Update (UI Components):**
- `src/components/ui/button.tsx` - Use `mode.radius`, `mode.font`, `mode.buttonPrefix`
- `src/components/ui/input.tsx` - Use `mode.radius`, `mode.font`
- `src/components/ui/card.tsx` - Use `mode.radius`, `mode.cardHeader`
- `src/components/ui/select.tsx` - Use `mode.radius`, `mode.font`
- `src/components/ui/dialog.tsx` - Use `mode.radius`
- `src/components/ui/badge.tsx` - Use `mode.radius`, `mode.textTransform`
- ... (all 40+ UI components)

**Result:** Change `CURRENT_MODE = "standard"` → entire site switches to rounded ShadCN style.

---

### Phase 1: Consolidate Design Tokens (1 hour)
**Goal:** ONE source of truth for all design decisions

**Current Problem:**
```
globals.css ──────> CSS Variables (OKLCH)
tokens.ts ─────────> Zod Schema (HSL) ← REDUNDANT
design-tokens.json ─> JSON Definition ← REDUNDANT
```

**Solution:**
```
globals.css ──────> CSS Variables (OKLCH) ← SINGLE SOURCE
lib/design-system/
├── index.ts ──────> Exports token references (not values)
└── README.md ─────> Documents the system
```

**Files to Modify:**
- DELETE: `src/lib/design-tokens.ts` (unused, redundant)
- DELETE: `src/lib/design-system/tokens.ts` (redundant)
- KEEP: `globals.css` (source of truth)
- KEEP: `config/design-tokens.json` (documentation/Figma export only)
- UPDATE: `src/lib/design-system/index.ts` (export utilities only)

---

### Phase 2: Create Marketing Page Template (2 hours)
**Goal:** All marketing pages use ONE template

**Current Problem:**
```
/about ──────> 6 custom components, unique structure
/features ───> 8 custom components, unique structure
/pricing ────> 2 components, partial reuse
/contact ────> 4 custom components, unique structure
/page.tsx ───> 6 components, custom composition
```

**Solution - Create `MarketingPageTemplate`:**

**Recommendation:** Strict structure with flexible slots. This ensures:
- All pages LOOK consistent (same nav, footer, spacing)
- Content is flexible (pass any components you want)
- Easy to add new pages (just use the template)
- Easy to change all pages at once (edit the template)

```tsx
// src/components/templates/marketing-page-template.tsx
interface MarketingPageTemplateProps {
  // REQUIRED - ensures consistency
  hero: React.ReactNode;

  // FLEXIBLE - array of any sections
  sections: Array<{
    id: string;
    component: React.ReactNode;
    background?: "default" | "muted" | "accent";
  }>;

  // OPTIONAL - can omit if page doesn't need CTA
  cta?: React.ReactNode;

  // METADATA
  title: string;
  description: string;
}

<MarketingPageTemplate
  title="About Us"
  description="Learn about Fabrk"
  hero={<HeroSection variant="centered" title="About Us" />}
  sections={[
    { id: "mission", component: <MissionSection /> },
    { id: "team", component: <TeamSection />, background: "muted" },
    { id: "values", component: <ValuesSection /> },
  ]}
  cta={<CTASection />}
/>
```

**Template Structure:**
```
MarketingPageTemplate
├── Navigation (ALWAYS from site-navigation.tsx)
├── <main>
│   ├── Hero Section (REQUIRED - passed as prop)
│   ├── Content Sections (FLEXIBLE - array of components)
│   │   └── Each section wrapped in consistent container
│   └── CTA Section (OPTIONAL - passed as prop)
├── Footer (ALWAYS from footer.tsx)
└── Metadata (title, description for SEO)
```

**Files to Create:**
- `src/components/templates/marketing-page-template.tsx`
- `src/components/templates/marketing-hero.tsx` (unified hero variants)
- `src/components/templates/marketing-cta.tsx` (unified CTA section)

**Files to Refactor:**
- `src/app/page.tsx` → Use MarketingPageTemplate
- `src/app/about/page.tsx` → Use MarketingPageTemplate
- `src/app/features/page.tsx` → Use MarketingPageTemplate
- `src/app/pricing/page.tsx` → Use MarketingPageTemplate
- `src/app/contact/page.tsx` → Use MarketingPageTemplate

---

### Phase 3: Fix Visual Inconsistencies (3 hours)
**Goal:** Eliminate colored dots and shadows

#### 3A: Replace Colored Dots with TerminalCardHeader (53 files)

**Current Pattern (BAD):**
```tsx
<div className="flex gap-2">
  <div className="size-2 rounded-none bg-destructive/50" />
  <div className="size-2 rounded-none bg-warning/50" />
  <div className="size-2 rounded-none bg-success/50" />
</div>
<span>filename.sh</span>
```

**Target Pattern (GOOD):**
```tsx
import { TerminalCardHeader } from "@/components/ui/card";
<TerminalCardHeader code="0x00" title="FILENAME" />
```

**Files to Fix:**
- 36 template components in `src/app/templates/*/components/*`
- 8 docs pages in `src/app/docs/components/*`
- 1 landing component: `src/components/landing/pricing-section.tsx`

#### 3B: Remove Shadow Classes (41 files)

**Current Pattern (BAD):**
```tsx
<Card className="shadow-sm">
```

**Target Pattern (GOOD):**
```tsx
<Card className="">  // No shadow for terminal aesthetic
```

**Files to Fix:**
- 9 dashboard pages
- 18 UI components
- 8 landing/marketing files
- See `DESIGN_SYSTEM_VIOLATIONS.md` for complete list

---

### Phase 4: Add Build-Time Validation (1 hour)
**Goal:** Prevent future violations automatically

**Solution: Enhance Pre-commit Hook**

**Current Hook** (`scripts/utilities/pre-commit-audit.mjs`):
- Checks for `rounded-sm/md/lg/xl`
- Checks for `shadow-md/lg/xl`
- Checks for `bg-white/black`

**Additions:**
```javascript
// Add to pre-commit-audit.mjs
const BLOCKED_PATTERNS = [
  // Existing...
  { pattern: /bg-destructive\/50.*size-2/g, message: "Use TerminalCardHeader instead of colored dots" },
  { pattern: /shadow-sm/g, message: "Terminal aesthetic = no shadows" },
  { pattern: /#[0-9a-fA-F]{3,6}/g, message: "Use design tokens, not hex colors" },
];
```

**Files to Modify:**
- `scripts/utilities/pre-commit-audit.mjs`
- `.husky/pre-commit` (if needed)

---

### Phase 5: Documentation & Enforcement (30 min)
**Goal:** Team knows the rules, violations are caught

**Update `DESIGN_SYSTEM.md`:**
- Add "How to Change Colors" section
- Add "How to Add a New Page" section
- Add "Template Usage Guide"
- Document the single source of truth

**Update `CLAUDE.md`:**
- Reference the template system
- Add instructions for marketing page changes

---

## Implementation Order

```
Week 1:
├── Day 1: Phase 0 (Visual Mode System) - CRITICAL
├── Day 2: Phase 1 (Consolidate tokens) + Phase 4 (Pre-commit)
├── Day 3: Phase 3A (Fix colored dots - 53 files)
└── Day 4: Phase 3B (Fix shadows - 41 files)

Week 2:
├── Day 1: Phase 2 (Create MarketingPageTemplate)
├── Day 2: Refactor Home + About pages
├── Day 3: Refactor Features + Pricing + Contact pages
└── Day 4: Phase 5 (Documentation) + Testing
```

---

## File Changes Summary

### Files to CREATE:
```
src/lib/design-system/visual-mode.ts
src/lib/design-system/use-visual-mode.ts
src/components/templates/marketing-page-template.tsx
src/components/templates/marketing-hero.tsx
src/components/templates/marketing-cta.tsx
```

### Files to DELETE:
```
src/lib/design-tokens.ts (redundant)
src/lib/design-system/tokens.ts (redundant)
```

### Files to MODIFY:
```
# Visual Mode System (40+ components)
src/components/ui/button.tsx
src/components/ui/input.tsx
src/components/ui/card.tsx
src/components/ui/select.tsx
src/components/ui/dialog.tsx
src/components/ui/badge.tsx
... (all UI components)

# Marketing pages (use new template)
src/app/page.tsx
src/app/about/page.tsx
src/app/features/page.tsx
src/app/pricing/page.tsx
src/app/contact/page.tsx

# Colored dots fix (53 files)
src/app/templates/*/components/*.tsx (36 files)
src/app/docs/components/*.tsx (8 files)
src/components/landing/pricing-section.tsx

# Shadow fix (41 files)
src/app/(dashboard)/**/*.tsx (9 files)
src/components/ui/*.tsx (18 files)
src/components/landing/*.tsx (8 files)
src/components/marketing/*.tsx
src/components/organization/*.tsx

# Build validation
scripts/utilities/pre-commit-audit.mjs

# Documentation
DESIGN_SYSTEM.md
CLAUDE.md
```

---

## End Result

After implementation:

| Change | Action |
|--------|--------|
| **Switch entire aesthetic** | Change 1 line: `CURRENT_MODE = "standard"` |
| Change primary color | Edit 1 line in `globals.css` |
| Change all marketing page structure | Edit `marketing-page-template.tsx` |
| Change terminal card headers | Edit `TerminalCardHeader` in `card.tsx` |
| Add new marketing page | Create page using `MarketingPageTemplate` |
| Add new component | Follow existing patterns, pre-commit validates |

### Visual Mode Examples

**Terminal Mode** (current):
```
┌─────────────────────────────────┐
│ [ [0x00] SETTINGS ]             │  ← Sharp corners
├─────────────────────────────────┤     Monospace font
│ [EMAIL]:                        │     Brackets
│ ┌─────────────────────────────┐ │     > PREFIX buttons
│ │ user@example.com            │ │
│ └─────────────────────────────┘ │
│ > SAVE_CHANGES                  │
└─────────────────────────────────┘
```

**Standard Mode** (one config change):
```
╭─────────────────────────────────╮
│ Settings                        │  ← Rounded corners
├─────────────────────────────────┤     Sans-serif font
│ Email                           │     Plain labels
│ ╭─────────────────────────────╮ │     Normal buttons
│ │ user@example.com            │ │
│ ╰─────────────────────────────╯ │
│      Save Changes               │
╰─────────────────────────────────╯
```

---

## Crawler Feedback for Design System Audits

### What the Crawler Should Detect

For comprehensive design system audits, the crawler should flag these patterns:

#### 1. Hardcoded Aesthetic Patterns
```javascript
// Detect hardcoded terminal aesthetic
const AESTHETIC_PATTERNS = {
  hardcodedRadius: /className="[^"]*rounded-none[^"]*"/g,  // Should use mode.radius
  hardcodedFont: /className="[^"]*font-mono[^"]*"/g,       // Should use mode.font
  buttonPrefix: /> [A-Z_]+/g,                              // Should use mode.buttonPrefix
  bracketLabels: /\[[A-Z_]+\]:/g,                          // Should use mode.labelFormat
};
```

#### 2. Design Token Violations
```javascript
const TOKEN_VIOLATIONS = {
  hexColors: /#[0-9a-fA-F]{3,6}/g,
  rgbColors: /rgb\([^)]+\)/g,
  hardcodedWhite: /bg-white|text-white/g,
  hardcodedBlack: /bg-black|text-black/g,
  grayScale: /bg-gray-\d+|text-gray-\d+/g,
};
```

#### 3. Terminal Violations (Current Mode)
```javascript
const TERMINAL_VIOLATIONS = {
  coloredDots: /bg-(destructive|warning|success)\/50.*size-2/g,
  roundedCorners: /rounded-(sm|md|lg|xl|2xl|3xl|full)/g,
  shadows: /shadow-(sm|md|lg|xl|2xl)/g,
};
```

#### 4. Consistency Patterns to Track
```javascript
const CONSISTENCY_CHECKS = {
  // Track which visual mode patterns are used where
  componentUsage: {
    TerminalCardHeader: "should be used for all card headers",
    TerminalCard: "should wrap terminal-style cards",
    mode: "should be imported from design-system",
  },
  // Track file-by-file compliance
  perFileCompliance: {
    usesVisualMode: boolean,
    hasHardcodedAesthetic: boolean,
    violations: string[],
  },
};
```

### Ideal Crawler Output Format

```json
{
  "designSystemAudit": {
    "summary": {
      "totalFiles": 863,
      "compliantFiles": 820,
      "violatingFiles": 43,
      "complianceScore": "95%"
    },
    "visualModeAdoption": {
      "filesUsingMode": 0,
      "filesWithHardcodedAesthetic": 200,
      "ready": false
    },
    "violations": {
      "coloredDots": {
        "count": 53,
        "files": ["path:line", ...]
      },
      "shadows": {
        "count": 41,
        "files": ["path:line", ...]
      },
      "hexColors": {
        "count": 20,
        "files": ["path:line", ...]
      }
    },
    "recommendations": [
      "Implement Visual Mode System to enable aesthetic switching",
      "Fix 53 colored dots violations",
      "Remove 41 shadow violations"
    ]
  }
}
```

---

**Total effort: ~12-16 hours**

**Result:**
- Never touch 50 files for one change again
- Switch between terminal/standard/custom aesthetics with ONE line change
- All marketing pages use consistent templates
- Pre-commit prevents future violations
