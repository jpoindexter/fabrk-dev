# Card Component Audit

**File:** `src/components/ui/card.tsx`
**Lines:** 544
**Last Updated:** 2025-12-05

---

## Component Overview

Comprehensive card system with 14 exported components covering basic cards, styled terminal-aesthetic cards, and specialized template documentation components.

---

## Components Exported

### Base Card Components (6)

1. **Card** - Container with border and background
2. **CardHeader** - Title area with spacing
3. **CardTitle** - Semantic heading (h1-h6)
4. **CardDescription** - Muted description text
5. **CardContent** - Main content area
6. **CardFooter** - Action area

### Styled Terminal Components (5)

7. **StyledCard** - Terminal-aesthetic card wrapper
8. **StyledCardHeader** - Header with hex code prefix `[ [0x00] TITLE ]`
9. **StyledLabel** - Bracketed label `[LABEL]:`
10. **FeatureItem** - List item with prefix (`>`, `✓`, `•`)
11. **FeatureList** - Container for feature items

### Template Documentation Components (3)

12. **InfoNote** - Note text with `[NOTE]:` prefix
13. **PageBadge** - Badge with `[TEMPLATE]: NAME` format
14. **TemplatePageHeader** - Complete page header (badge + title + description)
15. **FeaturesCard** - Complete feature card with header and list
16. **CodeOutput** - Code/CLI output window with header

---

## Props API

### Card

| Prop        | Type                              | Default | Description        |
| ----------- | --------------------------------- | ------- | ------------------ |
| `as`        | `"div" \| "article" \| "section"` | `"div"` | Semantic element   |
| `className` | `string`                          | -       | Additional classes |

### CardTitle

| Prop        | Type                                           | Default | Description        |
| ----------- | ---------------------------------------------- | ------- | ------------------ |
| `as`        | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h3"`  | Heading level      |
| `className` | `string`                                       | -       | Additional classes |

### StyledCardHeader

| Prop        | Type              | Default      | Description                   |
| ----------- | ----------------- | ------------ | ----------------------------- |
| `code`      | `string`          | `"0x00"`     | Hex code in brackets          |
| `title`     | `string`          | **Required** | Title in UPPERCASE_SNAKE_CASE |
| `icon`      | `React.ReactNode` | -            | Optional icon before title    |
| `className` | `string`          | -            | Additional classes            |

### FeatureItem

| Prop       | Type                          | Default      | Description      |
| ---------- | ----------------------------- | ------------ | ---------------- |
| `icon`     | `"arrow" \| "check" \| "dot"` | `"arrow"`    | Prefix icon type |
| `children` | `React.ReactNode`             | **Required** | Feature text     |

### FeaturesCard

| Prop          | Type                          | Default               | Description             |
| ------------- | ----------------------------- | --------------------- | ----------------------- |
| `title`       | `string`                      | `"TEMPLATE_FEATURES"` | Card header title       |
| `code`        | `string`                      | `"0x00"`              | Hex code for header     |
| `features`    | `string[]`                    | **Required**          | List of feature strings |
| `note`        | `string`                      | -                     | Optional note at bottom |
| `featureIcon` | `"arrow" \| "check" \| "dot"` | `"arrow"`             | Icon type for features  |

### TemplatePageHeader

| Prop          | Type     | Default      | Description          |
| ------------- | -------- | ------------ | -------------------- |
| `badge`       | `string` | **Required** | Badge text           |
| `title`       | `string` | **Required** | Page title           |
| `description` | `string` | -            | Optional description |
| `badgePrefix` | `string` | `"TEMPLATE"` | Badge prefix label   |

### PageBadge

| Prop       | Type              | Default      | Description   |
| ---------- | ----------------- | ------------ | ------------- |
| `prefix`   | `string`          | `"TEMPLATE"` | Prefix label  |
| `children` | `React.ReactNode` | **Required** | Badge content |

### StyledLabel

| Prop        | Type              | Default      | Description               |
| ----------- | ----------------- | ------------ | ------------------------- |
| `showColon` | `boolean`         | `true`       | Show colon after brackets |
| `children`  | `React.ReactNode` | **Required** | Label text                |

### InfoNote

| Prop       | Type              | Default      | Description  |
| ---------- | ----------------- | ------------ | ------------ |
| `label`    | `string`          | `"NOTE"`     | Label text   |
| `children` | `React.ReactNode` | **Required** | Note content |

### CodeOutput

| Prop       | Type              | Default       | Description  |
| ---------- | ----------------- | ------------- | ------------ |
| `title`    | `string`          | `"bracketed"` | Header title |
| `children` | `React.ReactNode` | **Required**  | Code content |

---

## Design Token Usage

### Base Card Components

| Component           | Background | Text                    | Border             | Radius        |
| ------------------- | ---------- | ----------------------- | ------------------ | ------------- |
| **Card**            | `bg-card`  | `text-card-foreground`  | `border` (default) | `mode.radius` |
| **CardTitle**       | -          | `text-card-foreground`  | -                  | -             |
| **CardDescription** | -          | `text-muted-foreground` | -                  | -             |

**Focus State:**

- `focus-within:ring-primary focus-within:ring-2`

### Styled Terminal Components

| Component              | Background | Text                    | Border                   | Radius       |
| ---------------------- | ---------- | ----------------------- | ------------------------ | ------------ |
| **StyledCard**         | `bg-card`  | -                       | `border-border`          | None (sharp) |
| **StyledCardHeader**   | -          | `text-muted-foreground` | `border-border border-b` | None (sharp) |
| **StyledLabel**        | -          | `text-muted-foreground` | -                        | -            |
| **FeatureItem**        | -          | `text-foreground`       | -                        | -            |
| **FeatureItem** (icon) | -          | `text-success`          | -                        | -            |

### Template Documentation Components

| Component               | Background | Text                    | Border                      | Radius        |
| ----------------------- | ---------- | ----------------------- | --------------------------- | ------------- |
| **PageBadge**           | -          | `text-muted-foreground` | `border-border`             | `mode.radius` |
| **TemplatePageHeader**  | -          | `text-foreground`       | -                           | -             |
| **CodeOutput**          | `bg-card`  | `text-foreground`       | `border-border`             | `mode.radius` |
| **CodeOutput** (header) | -          | `text-muted-foreground` | `border-border/50 border-b` | -             |

**Status:** ✅ All components use semantic design tokens

---

## Spacing (8-Point Grid)

### Base Card Components

| Component       | Padding          | Gap               | Notes            |
| --------------- | ---------------- | ----------------- | ---------------- |
| **CardHeader**  | `p-6` (24px)     | `space-y-2` (8px) | Vertical spacing |
| **CardContent** | `px-6 pt-0 pb-6` | -                 | No top padding   |
| **CardFooter**  | `px-6 pt-0 pb-6` | -                 | Flex container   |

### Styled Components

| Component              | Padding                   | Gap                 | Notes            |
| ---------------------- | ------------------------- | ------------------- | ---------------- |
| **StyledCardHeader**   | `px-4 py-2` (16px, 8px)   | `gap-2` (8px)       | Compact header   |
| **StyledCard** content | `p-4` (16px)              | -                   | Applied manually |
| **FeatureList**        | -                         | `space-y-1.5` (6px) | Tight spacing    |
| **InfoNote**           | -                         | `mt-4` (16px)       | Top margin       |
| **CodeOutput** header  | `px-4 py-1.5` (16px, 6px) | `gap-2` (8px)       | Compact          |
| **CodeOutput** content | `p-4` (16px)              | `space-y-0.5` (2px) | Very tight       |

**Status:** ✅ Follows 8-point grid (with intentional 6px exceptions for tight terminal spacing)

---

## Visual Mode System Integration

### Base Card Components

| Component           | Mode Properties Used |
| ------------------- | -------------------- |
| **Card**            | `mode.radius`        |
| **CardTitle**       | `mode.font`          |
| **CardDescription** | `mode.font`          |

### Styled Terminal Components

| Component              | Mode Properties Used                |
| ---------------------- | ----------------------------------- |
| **StyledCardHeader**   | `mode.font`                         |
| **StyledLabel**        | `mode.font`                         |
| **FeatureItem**        | `mode.font`                         |
| **FeatureList**        | `mode.font`                         |
| **PageBadge**          | `mode.font`, `mode.radius`          |
| **TemplatePageHeader** | `mode.font` (on title, description) |
| **CodeOutput**         | `mode.font`, `mode.radius`          |

**Implementation Pattern:**

```tsx
// Base Card - applies radius dynamically
<Component
  className={cn(
    "bg-card border",
    mode.radius,  // rounded-none or rounded-md
    className
  )}
/>

// Styled Components - monospace font
<span className={cn("text-xs", mode.font)}>
  [ {text} ]
</span>
```

**Status:** ✅ Correctly implements Visual Mode System

---

## Typography

### Base Card Components

| Component           | Font Size          | Font Weight     | Font Family |
| ------------------- | ------------------ | --------------- | ----------- |
| **CardTitle**       | `text-base` (16px) | `font-semibold` | `mode.font` |
| **CardDescription** | `text-xs` (12px)   | `font-normal`   | `mode.font` |

### Styled Terminal Components

| Component                      | Font Size         | Font Weight     | Font Family        |
| ------------------------------ | ----------------- | --------------- | ------------------ |
| **StyledCardHeader**           | `text-xs` (12px)  | `font-normal`   | `mode.font` (mono) |
| **StyledLabel**                | `text-xs` (12px)  | `font-normal`   | `mode.font` (mono) |
| **FeatureItem**                | `text-xs` (12px)  | `font-normal`   | `mode.font` (mono) |
| **PageBadge**                  | `text-xs` (12px)  | `font-normal`   | `mode.font` (mono) |
| **TemplatePageHeader** (title) | `text-4xl` (36px) | `font-semibold` | `mode.font` (mono) |
| **TemplatePageHeader** (desc)  | `text-sm` (14px)  | `font-normal`   | `mode.font` (mono) |
| **CodeOutput** (header)        | `text-xs` (12px)  | `font-normal`   | `mode.font` (mono) |
| **CodeOutput** (content)       | `text-xs` (12px)  | `font-normal`   | `mode.font` (mono) |

**Status:** ✅ Consistent terminal aesthetic typography

---

## Terminal Aesthetic Compliance

### Visual Patterns

#### Styled Card Header Format

```
[ [0x00] SECTION_TITLE ]
```

#### Styled Label Format

```
[LABEL]:
```

#### Feature Item Formats

```
> Feature description
✓ Completed feature
• List item
```

#### Page Badge Format

```
[TEMPLATE]: SIGN_IN
```

#### Info Note Format

```
[NOTE]: Additional information here.
```

#### Code Output Format

```
┌─────────────────┐
│ [ bracketed ]   │
├─────────────────┤
│ $ command       │
│ output line     │
└─────────────────┘
```

### Compliance Checklist

| Requirement     | Base Card         | Styled Card                   | Status |
| --------------- | ----------------- | ----------------------------- | ------ |
| Sharp edges     | Via `mode.radius` | No radius applied             | ✅     |
| Monospace font  | Via `mode.font`   | Via `mode.font`               | ✅     |
| Brackets        | N/A               | All labels bracketed          | ✅     |
| Hex codes       | N/A               | `[0x00]` pattern              | ✅     |
| Uppercase       | N/A               | Title in UPPERCASE_SNAKE_CASE | ✅     |
| Minimal borders | Single border     | Single border + dividers      | ✅     |

**Status:** ✅ Fully compliant with terminal aesthetic

---

## Component Architecture

### Hierarchy

```
Base Cards (Vercel-inspired, themeable)
├── Card (container)
├── CardHeader
│   ├── CardTitle (semantic heading)
│   └── CardDescription
├── CardContent
└── CardFooter

Styled Terminal Cards (sharp aesthetic)
├── StyledCard (container, no radius)
├── StyledCardHeader (with hex code)
├── Content wrapper (manual p-4)
│   ├── StyledLabel
│   └── FeatureList
│       └── FeatureItem
└── InfoNote (optional)

Template Documentation
├── PageBadge
├── TemplatePageHeader
│   ├── PageBadge
│   ├── Title
│   └── Description
├── FeaturesCard (combines StyledCard + features)
└── CodeOutput (terminal window)
```

### Composition Patterns

**Base Card (Standard):**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
    <CardDescription>Manage your preferences</CardDescription>
  </CardHeader>
  <CardContent>{/* Form content */}</CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

**Styled Card (Terminal):**

```tsx
<StyledCard>
  <StyledCardHeader code="0x01" title="USER_PROFILE" />
  <div className="p-4">
    <StyledLabel>FEATURES</StyledLabel>
    <FeatureList>
      <FeatureItem icon="check">Email verification</FeatureItem>
      <FeatureItem icon="check">Password reset</FeatureItem>
    </FeatureList>
    <InfoNote>Data stored in PostgreSQL.</InfoNote>
  </div>
</StyledCard>
```

**Features Card (Shorthand):**

```tsx
<FeaturesCard
  code="0x02"
  title="AUTH_FEATURES"
  features={['NextAuth v5 integration', 'JWT sessions (30-day)', 'Social login (Google, GitHub)']}
  note="Configure in src/lib/auth.ts"
  featureIcon="check"
/>
```

**Template Page Header:**

```tsx
<TemplatePageHeader
  badge="SIGN_IN"
  title="Sign In"
  description="Login page with social auth options and remember me"
/>
```

**Code Output:**

```tsx
<CodeOutput title="terminal">
  <div>$ npm run dev</div>
  <div>> Ready on http://localhost:3000</div>
</CodeOutput>
```

**Status:** ✅ Clear composition patterns, good developer experience

---

## Usage Patterns Observed

### Base Card Usage

**Search:** `grep -r "from \"@/components/ui/card\"" src/app/`

**Common Locations:**

- Dashboard pages: Settings, profile, team management
- Auth pages: Login, signup, password reset
- Form containers
- Data display sections

**Pattern:**

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Dashboard</CardTitle>
  </CardHeader>
  <CardContent>{/* Content */}</CardContent>
</Card>;
```

### Styled Card Usage

**Common Locations:**

- `/docs/*` - Documentation pages
- `/templates/*` - Template showcase pages
- Landing page feature sections

**Pattern:**

```tsx
import { StyledCard, StyledCardHeader, FeaturesCard } from "@/components/ui/card";

// Manual composition
<StyledCard>
  <StyledCardHeader code="0x00" title="SECTION" />
  <div className="p-4">{/* Content */}</div>
</StyledCard>

// Or shorthand
<FeaturesCard
  features={["Feature 1", "Feature 2"]}
  note="Additional info"
/>
```

### Template Components Usage

**Common Locations:**

- `/docs/components/*`
- `/docs/features/*`
- Template documentation pages

**Pattern:**

```tsx
import { TemplatePageHeader, FeaturesCard, CodeOutput } from "@/components/ui/card";

<TemplatePageHeader
  badge="PAGE_NAME"
  title="Page Title"
  description="Page description"
/>

<FeaturesCard features={[...]} />

<CodeOutput>
  <div>Code example</div>
</CodeOutput>
```

---

## Issues & Recommendations

### ✅ Strengths

1. **Dual design systems** - Base cards for app UI, styled cards for docs/marketing
2. **Component composition** - Both low-level primitives and high-level shortcuts
3. **Semantic HTML** - `as` prop for proper heading hierarchy
4. **Design tokens** - No hardcoded colors
5. **Visual Mode System** - Seamless theme switching
6. **Terminal aesthetic** - Consistent bracketed labels and hex codes
7. **Developer experience** - `FeaturesCard` shorthand reduces boilerplate

### ⚠️ Observations

1. **File size: 544 lines**
   - Exceeds typical component file size
   - Contains 16 exported components in one file
   - Recommendation: Consider splitting into:
     - `card.tsx` - Base components (6)
     - `styled-card.tsx` - Terminal components (5)
     - `template-card.tsx` - Template components (5)
   - Current: Functional but monolithic

2. **StyledCard vs Card inconsistency:**
   - `Card` has `focus-within:ring` - useful for forms
   - `StyledCard` has no focus state - used for static content
   - **Intentional design choice:** Different use cases
   - Status: Not an issue, but document the distinction

3. **Manual padding in StyledCard:**

   ```tsx
   <StyledCard>
     <StyledCardHeader />
     <div className="p-4">{/* Manual padding */}</div>
   </StyledCard>
   ```

   - Unlike base `CardContent` (automatic padding)
   - Gives flexibility but less DX consistency
   - Recommendation: Create `StyledCardContent` component

4. **FeatureItem icon mapping:**

   ```tsx
   const iconMap = {
     arrow: '>',
     check: '✓',
     dot: '•',
   };
   ```

   - Uses Unicode characters, not icon components
   - **Benefit:** Lightweight, no icon library needed
   - **Limitation:** Cannot customize icon appearance
   - Status: Acceptable for terminal aesthetic

5. **CodeOutput border opacity:**

   ```tsx
   'border-border/50'; // 50% opacity on header border
   ```

   - Only component using border opacity
   - Appears intentional for subtle divider
   - Status: Not an issue, adds visual hierarchy

### 🔍 Questions for Review

1. Should card components be split into 3 separate files?
2. Should `StyledCard` get a `StyledCardContent` component for consistency?
3. Should `FeatureItem` support custom icons (e.g., Lucide icons)?
4. Should `Card` focus ring be optional or always applied?

---

## Cross-Component Consistency

### Compared to Other Layout Components

| Component  | Border          | Radius Source | Padding      | Focus State           |
| ---------- | --------------- | ------------- | ------------ | --------------------- |
| Card       | `border`        | `mode.radius` | `p-6`        | `focus-within:ring-2` |
| StyledCard | `border-border` | None          | Manual `p-4` | None                  |
| Alert      | `border`        | `mode.radius` | `px-6 py-4`  | None                  |
| Dialog     | `border`        | `mode.radius` | `p-6`        | None                  |

**Observation:** Base components use `mode.radius`, styled components are always sharp.

**Status:** ✅ Intentional design distinction

---

## Accessibility

### Semantic HTML

| Component           | Element                       | Semantic Role                |
| ------------------- | ----------------------------- | ---------------------------- |
| **Card**            | `div` / `article` / `section` | Via `as` prop                |
| **CardTitle**       | `h1-h6`                       | Via `as` prop (default `h3`) |
| **CardDescription** | `p`                           | Standard paragraph           |
| **Card** (focus)    | `focus-within`                | Keyboard navigation support  |

**Best Practice Example:**

```tsx
<Card as="article">
  <CardHeader>
    <CardTitle as="h2">Article Title</CardTitle>
    <CardDescription>Article description</CardDescription>
  </CardHeader>
</Card>
```

**Status:** ✅ Supports semantic HTML and accessibility

### ARIA Attributes

- Base `Card` uses `focus-within:ring` for keyboard navigation
- No explicit ARIA roles (relies on semantic HTML)
- `data-slot` attributes for testing/debugging

**Status:** ✅ Adequate for most use cases

---

## File Metrics

| Metric              | Value     | Status                        |
| ------------------- | --------- | ----------------------------- |
| Total lines         | 544       | ⚠️ Large (consider splitting) |
| Component exports   | 16        | Many (could be 3 files)       |
| TypeScript coverage | 100%      | ✅                            |
| Design tokens       | 100%      | ✅ No hardcoded colors        |
| Documentation       | Extensive | ✅ JSDoc on all components    |

---

## Summary

**Status:** ✅ Production-ready, design system compliant (with recommendations)

The Card component system is comprehensive and well-architected, providing both a flexible base card system (Vercel-inspired) and a specialized terminal-aesthetic card system for documentation and marketing.

**Key Achievements:**

1. Dual design system support (base + terminal)
2. 100% design token usage
3. Visual Mode System integration
4. Semantic HTML support
5. Excellent developer experience (composition + shortcuts)

**Improvement Opportunities:**

1. Consider splitting into 3 files (card, styled-card, template-card)
2. Add `StyledCardContent` for consistency
3. Document base vs styled card use cases in design system docs

**Recommendation:** Approved for production use. File splitting is a nice-to-have, not a blocker. The current structure works well and is well-documented.
