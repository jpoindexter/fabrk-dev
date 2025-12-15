# LIBRARY TEMPLATE AUDIT PROMPT

**Purpose**: Audit and unify all library template pages to follow the Fabrk design system and template patterns.

---

## 0) CONTEXT: FABRK DESIGN SYSTEM

### Visual Canon (Terminal-Flat)
- **Sharp edges**: `rounded-none` on all elements
- **Monospace font**: `font-mono` (JetBrains Mono) everywhere via body tag
- **Design tokens only**: No hardcoded colors (bg-white, #hex forbidden)
- **8-point grid**: Spacing via p-2, p-4, p-6, p-8 (multiples of 8px)
- **Semantic colors**: `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`

### Typography Scale (from design-system/index.ts)
| Token | Class | Usage |
|-------|-------|-------|
| heading.h1 | `text-4xl font-bold` | Page titles |
| heading.h2 | `text-3xl font-bold` | Section titles |
| heading.h3 | `text-2xl font-semibold` | Card titles |
| body.sm | `text-sm` | Body text (default) |
| body.xs | `text-xs` | Labels, meta, terminal output |
| caption | `text-xs text-muted-foreground` | Captions, hints |
| button | `text-xs font-medium` | Button text |

### Terminal Formatting Conventions
- **Labels**: `[LABEL_NAME]:` with brackets
- **Button text**: `> ACTION_TEXT` with prefix
- **Card headers**: `[ [0x00] TITLE ]` with hex code
- **Status**: `[SUCCESS]`, `[ERROR]`, `[PENDING]`
- **Text casing**: UI labels UPPERCASE, body text sentence case

---

## 1) TEMPLATE SYSTEM ARCHITECTURE

### Core Templates (in `src/components/library/`)

#### TemplateShowcasePage
**Purpose**: Individual template showcase pages with preview/code tabs
**Used by**: 22+ pages (blog, profile, settings, notifications, etc.)
**Props**:
```tsx
interface TemplateShowcasePageProps {
  badge: string;              // Header badge text
  title: string;              // Page title
  description: string;        // Page description
  templateId: string;         // For related templates
  category?: { name, href };  // Breadcrumb category
  preview: React.ReactNode;   // Live preview component
  code: string;               // Template source code
  fileStructure: string | FileStructureItem[];
  features: string[];         // Feature list
}
```

#### CategoryShowcasePage
**Purpose**: Category listing pages showing grid of templates
**Used by**: 5 pages (dashboards, authentication, admin-panels, account-pages, marketing)
**Props**:
```tsx
interface CategoryShowcasePageProps {
  categoryId: string;
  badge: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  templates: CategoryTemplate[];
  features: string[];
}
```

#### StyledTabs
**Purpose**: Consistent bordered tab component
**Used by**: All template pages for preview/code switching
**Props**:
```tsx
interface StyledTabsProps {
  code?: string;           // Header hex code (e.g., "0x00")
  title?: string;          // Header title
  tabs: StyledTab[];       // { id, label, icon? }
  value: string;           // Controlled state
  onValueChange: (v) => void;
  children: ReactNode;     // StyledTabsContent children
}
```

---

## 2) AUDIT RESULTS (CURRENT STATE)

### Gate A: Template Compliance - PASS (21/26 using templates)

**Using Templates (21 pages)**:
| Page | Template | Type | Status |
|------|----------|------|--------|
| `account-pages/` | CategoryShowcasePage | Category | OK |
| `admin-panels/` | CategoryShowcasePage | Category | OK |
| `ai-forms/` | TemplateShowcasePage | Individual | OK |
| `analytics-dashboard/` | TemplateShowcasePage | Individual | OK |
| `authentication/` | CategoryShowcasePage | Category | OK |
| `billing-dashboard/` | TemplateShowcasePage | Individual | OK |
| `blog/` | TemplateShowcasePage | Individual | OK |
| `dashboards/` | CategoryShowcasePage | Category | OK |
| `documentation/` | TemplateShowcasePage | Individual | OK |
| `email-templates/` | TemplateShowcasePage | Individual | OK |
| `empty-states/` | TemplateShowcasePage | Individual | OK |
| `landing-variations/` | TemplateShowcasePage | Individual | OK |
| `marketing/` | CategoryShowcasePage | Category | OK |
| `modals/` | TemplateShowcasePage | Individual | OK |
| `notifications/` | TemplateShowcasePage | Individual | OK |
| `pricing-page/` | TemplateShowcasePage | Individual | OK |
| `profile/` | TemplateShowcasePage | Individual | OK |
| `search-results/` | TemplateShowcasePage | Individual | OK |
| `security-privacy/` | TemplateShowcasePage | Individual | OK |
| `settings-page/` | TemplateShowcasePage | Individual | OK |
| `team-dashboard/` | TemplateShowcasePage | Individual | OK |
| `user-management/` | TemplateShowcasePage | Individual | OK |

**Special Cases - Intentionally Custom (5 pages)**:
| Page | Pattern | Reason | Status |
|------|---------|--------|--------|
| `chart-library/` | Custom + StyledTabs | Nested chart type tabs inside preview | OK |
| `docs/` | Hub page | Navigation grid to guides | INTENTIONAL |
| `error-pages/` | Custom + StyledTabs | 9 error types × preview/code | OK |
| `onboarding/` | Custom + StyledTabs | wizard/checklist × preview/code | OK |
| `page.tsx` (index) | Search interface | Unique filter/pagination | INTENTIONAL |

### Gate B: StyledTabs Usage - PASS

| Check | Status |
|-------|--------|
| Base `Tabs` imports in library | **0** (none - all removed) |
| `StyledTabs` imports | **10** files |
| All tabs controlled state | YES |
| Tab labels use `[PREVIEW]`, `[CODE]` | YES |

**Result**: All library pages use StyledTabs for consistent bordered tab styling.

### Gate C: Design Token Compliance
- [ ] Uses `mode.font`, `mode.radius`, `mode.color.text.*`
- [ ] No hardcoded colors (grep for: `bg-white`, `text-gray-`, `#[0-9a-f]`)
- [ ] Spacing follows 8-point grid (no `p-3`, `gap-3`, etc.)
- [ ] Typography uses scale (no `text-[10px]` arbitrary values)

### Gate D: Structure Compliance
Each page should have:
- [ ] Breadcrumb navigation
- [ ] TemplatePageHeader with badge/title/description
- [ ] Preview section with StyledTabs
- [ ] FileStructure card
- [ ] Features card with FeatureList/FeatureItem
- [ ] RelatedTemplates section (optional)

---

## 3) SPECIAL CASE PATTERNS

### Hub Pages (documentation, docs)
**Pattern**: Grid of links to guides
**Components**: Custom layout with DocCard grid
**Status**: Intentionally different, not template-based

### Multi-Variant Pages (error-pages, onboarding)
**Pattern**: Nested tabs (variant selector > preview/code)
**Components**: StyledTabs for both levels
**State**: Two useState hooks (activeVariant, activePreviewTab)

### Chart Library
**Pattern**: Single preview/code with inner chart type tabs
**Components**: StyledTabs for outer, StyledTabs for inner chart selector
**Status**: Uses proper patterns

---

## 4) COMMON VIOLATIONS TO FIX

### Violation: Base Tabs Import
```tsx
// WRONG
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// CORRECT
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
```

### Violation: Uncontrolled Tabs
```tsx
// WRONG
<Tabs defaultValue="preview">

// CORRECT
const [activeTab, setActiveTab] = useState('preview');
<StyledTabs value={activeTab} onValueChange={setActiveTab}>
```

### Violation: Missing Mode Tokens
```tsx
// WRONG
<div className="text-gray-500 text-sm">

// CORRECT
<div className={cn(mode.font, 'text-muted-foreground text-sm')}>
```

### Violation: Arbitrary Spacing
```tsx
// WRONG
<div className="p-3 gap-3">

// CORRECT
<div className="p-4 gap-4">
```

---

## 5) EXECUTION PLAN

### Phase 1: Inventory (Read-Only)
1. List all library pages
2. Categorize by template type (TemplateShowcasePage, CategoryShowcasePage, Custom)
3. Identify violations

### Phase 2: Convert Remaining Pages
For each page marked `CHECK`:
1. Read current implementation
2. Identify if it should use TemplateShowcasePage or CategoryShowcasePage
3. Extract: badge, title, description, preview component, code, features
4. Migrate to template pattern

### Phase 3: Verify StyledTabs
1. Grep for `from '@/components/ui/tabs'` in library folder
2. Convert any remaining base Tabs to StyledTabs
3. Add controlled state where missing

### Phase 4: Token Compliance
1. Run `npm run scan:hex` for hardcoded colors
2. Check for arbitrary spacing values
3. Verify typography scale usage

---

## 6) SUCCESS CRITERIA

After this audit:
- [ ] Zero library pages using base `Tabs` directly
- [ ] All individual templates use `TemplateShowcasePage`
- [ ] All category pages use `CategoryShowcasePage`
- [ ] All tabs use controlled state
- [ ] TypeScript compiles clean (`npm run type-check`)
- [ ] Design token compliance (no hardcoded colors)
- [ ] Consistent visual output across all pages

---

## 7) FILES TO MODIFY

### Templates (if changes needed)
- `src/components/library/template-showcase-page.tsx`
- `src/components/library/category-showcase-page.tsx`
- `src/components/ui/styled-tabs.tsx`

### Pages to Check/Migrate
- `src/app/(marketing)/library/analytics-dashboard/page.tsx`
- `src/app/(marketing)/library/blog/page.tsx`
- `src/app/(marketing)/library/billing-dashboard/page.tsx`
- `src/app/(marketing)/library/empty-states/page.tsx`
- `src/app/(marketing)/library/modals/page.tsx`
- `src/app/(marketing)/library/notifications/page.tsx`
- `src/app/(marketing)/library/pricing-page/page.tsx`
- `src/app/(marketing)/library/profile/page.tsx`
- `src/app/(marketing)/library/search-results/page.tsx`
- `src/app/(marketing)/library/security-privacy/page.tsx`
- `src/app/(marketing)/library/settings-page/page.tsx`
- `src/app/(marketing)/library/team-dashboard/page.tsx`
- `src/app/(marketing)/library/user-management/page.tsx`

---

## 8) CURRENT AUDIT STATUS

```markdown
## AUDIT RESULTS (December 2024)

### Template Compliance: 21/26 pages using templates - PASS
- TemplateShowcasePage: 16 pages
- CategoryShowcasePage: 5 pages
- Special cases (intentional): 5 pages

### StyledTabs Migration: COMPLETE
- Base Tabs imports in library: 0
- StyledTabs imports: 10 files
- All tabs use controlled state

### Token Compliance: VERIFIED
- All pages use mode.font, mode.radius, mode.color
- No hardcoded colors in template files

### TypeScript: PASS
- `npm run type-check` passes

### Recommendation: READY FOR LAUNCH
All library pages follow the template system.
Special cases are intentional and properly documented.
```

---

## 9) WHAT WAS FIXED (Recent Changes)

1. **TemplateShowcasePage** - Updated to use StyledTabs (affects 16+ pages)
2. **CategoryShowcasePage** - Created new template (5 category pages migrated)
3. **error-pages** - Converted nested tabs to StyledTabs
4. **onboarding** - Converted nested tabs to StyledTabs
5. **chart-library** - Converted outer tabs to StyledTabs
6. **ai-forms** - Converted inner tabs to StyledTabs
7. **Cleanup** - Deleted unused email-templates components

---

## 10) REMAINING OPPORTUNITIES

These pages are intentionally custom but could potentially be templatized in the future:

| Page | Current | Potential Template |
|------|---------|-------------------|
| `docs/` | Hub page | Could create `HubShowcasePage` |
| `page.tsx` | Search UI | Unique, no template needed |

**Recommendation**: No action needed. Current system is comprehensive.
