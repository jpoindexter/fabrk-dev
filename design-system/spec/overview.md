# Design System Specification: Overview

> A token-driven, themeable design system for modern SaaS applications.

**Version:** 1.0.0  
**Status:** Specification

---

## Philosophy

### 1. Token-Driven Architecture

Every visual decision flows from design tokens. Tokens are the single source of truth for:

- **Colors** — semantic, role-based naming (not brand-specific)
- **Typography** — scale, weights, line heights
- **Spacing** — consistent rhythm based on a base unit
- **Radii** — corner treatments from sharp to pill
- **Shadows** — elevation levels for depth
- **Motion** — durations and easing functions

**Why tokens?**
- Consistency at scale (200+ components)
- Theme switching without code changes
- Design-to-code handoff clarity
- Automated tooling (linting, validation)

### 2. Semantic Over Literal

Tokens use **semantic names** that describe purpose, not appearance:

```
✓ color-bg-surface       (semantic: what it's for)
✗ color-gray-100         (literal: what it looks like)

✓ color-text-primary     (semantic: importance level)
✗ color-black            (literal: actual color)

✓ space-component-padding-md   (semantic: contextual use)
✗ space-16                     (literal: raw value)
```

This allows the same token to resolve to different values per theme.

### 3. Theme-Agnostic Core

The system supports multiple visual themes without changing component code:

| Theme | Character | Use Case |
|-------|-----------|----------|
| **Terminal** | Sharp edges, monospace, uppercase labels | Developer tools, CLI-inspired |
| **Modern** | Subtle radii, clean sans-serif, minimal | Linear/Vercel-style SaaS |
| **Soft** | Rounded corners, friendly typography | Consumer-facing apps |

Components reference semantic tokens; themes provide the values.

### 4. SaaS-Optimized Patterns

Built for the full SaaS surface area:

- **Landing pages** — Marketing, pricing, testimonials
- **Authentication** — Sign in, sign up, password reset
- **Dashboard** — Stats, tables, charts, activity feeds
- **Settings** — Forms, toggles, danger zones
- **Documentation** — Guides, API references, code blocks
- **Admin** — User management, audit logs, feature flags

---

## Naming Conventions

### Design Tokens (CSS/JSON)

**Format:** `{category}-{property}-{variant}-{state}`

| Category | Examples |
|----------|----------|
| `color` | `color-bg-surface`, `color-text-muted`, `color-border-default` |
| `space` | `space-xs`, `space-md`, `space-section-lg` |
| `radius` | `radius-none`, `radius-md`, `radius-pill` |
| `shadow` | `shadow-sm`, `shadow-lg`, `shadow-none` |
| `font` | `font-family-sans`, `font-family-mono` |
| `text` | `text-size-sm`, `text-weight-semibold`, `text-leading-tight` |
| `motion` | `motion-duration-fast`, `motion-ease-out` |
| `breakpoint` | `breakpoint-sm`, `breakpoint-lg` |

**Casing:**
- CSS custom properties: `--color-bg-surface`
- JSON tokens: `color.bg.surface` (nested) or `color-bg-surface` (flat)
- Tailwind utilities: `bg-surface`, `text-primary`

### JavaScript/TypeScript

**Format:** Standard JS conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `colorBgSurface`, `spaceMd` |
| Constants | SCREAMING_SNAKE | `DEFAULT_THEME`, `BREAKPOINTS` |
| Functions | camelCase | `getToken()`, `resolveColor()` |
| Components | PascalCase | `Button`, `Card`, `InputGroup` |
| Types/Interfaces | PascalCase | `ThemeConfig`, `SpacingScale` |
| Enums | PascalCase | `ThemeMode`, `Variant` |

### Component Props

| Type | Convention | Example |
|------|------------|---------|
| Boolean | `is*`, `has*`, `show*` | `isDisabled`, `hasIcon`, `showLabel` |
| Variant | Literal union | `variant="primary" \| "secondary"` |
| Size | T-shirt sizing | `size="sm" \| "md" \| "lg"` |
| Event handlers | `on*` | `onClick`, `onSubmit`, `onChange` |

---

## Token Resolution

### Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 3: COMPONENT TOKENS                              │
│  Component-specific decisions                           │
│  e.g., button-bg-primary, card-padding, input-radius    │
├─────────────────────────────────────────────────────────┤
│  LAYER 2: SEMANTIC TOKENS                               │
│  Role-based, theme-resolved                             │
│  e.g., color-bg-surface, color-text-primary             │
├─────────────────────────────────────────────────────────┤
│  LAYER 1: PRIMITIVE TOKENS                              │
│  Raw values, scale definitions                          │
│  e.g., gray-900, space-16, radius-4                     │
└─────────────────────────────────────────────────────────┘
```

### Resolution Flow

```
Component uses:     → Semantic token resolves to: → Primitive value:
─────────────────────────────────────────────────────────────────────
bg-surface          → color-bg-surface            → #ffffff (light)
                                                  → #0a0a0a (dark)

text-primary        → color-text-primary          → #171717 (light)
                                                  → #fafafa (dark)

radius-md           → radius-md                   → 0px (terminal)
                                                  → 6px (modern)
                                                  → 12px (soft)
```

---

## Theme System

### How Themes Work

1. **Define primitives** — Raw color palettes, spacing values
2. **Create semantic mappings** — Assign primitives to semantic roles
3. **Apply theme** — CSS custom properties or runtime config

```css
/* Terminal Theme */
:root[data-theme="terminal"] {
  --color-bg-surface: var(--gray-950);
  --color-text-primary: var(--gray-50);
  --radius-md: 0px;
  --font-body: var(--font-mono);
}

/* Modern Theme */
:root[data-theme="modern"] {
  --color-bg-surface: var(--white);
  --color-text-primary: var(--gray-900);
  --radius-md: 6px;
  --font-body: var(--font-sans);
}
```

### Theme Switching

Themes are applied via:
1. **Data attribute:** `<html data-theme="terminal">`
2. **CSS class:** `<html class="theme-terminal">`
3. **Media query:** `@media (prefers-color-scheme: dark)`

Components never need to know which theme is active.

---

## File Structure

```
design-system/
├── spec/                    # Specification documents
│   ├── overview.md          # Philosophy & conventions (this file)
│   ├── foundations.md       # Token definitions
│   ├── tokens.json          # Machine-readable tokens
│   ├── components.md        # Component patterns
│   └── themes.md            # Theme architecture
│
├── tokens/                  # Generated token files
│   ├── css/
│   │   ├── primitives.css
│   │   ├── semantic.css
│   │   └── themes/
│   │       ├── terminal.css
│   │       ├── modern.css
│   │       └── soft.css
│   ├── js/
│   │   ├── tokens.ts
│   │   └── themes.ts
│   └── json/
│       └── tokens.json
│
├── primitives/              # Base scale definitions
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
│
├── themes/                  # Theme configurations
│   ├── terminal.ts
│   ├── modern.ts
│   ├── soft.ts
│   └── index.ts
│
└── utils/                   # Helper functions
    ├── cn.ts               # Class name utility
    ├── tokens.ts           # Token access helpers
    └── theme.ts            # Theme management
```

---

## Design Principles

### 1. Clarity Over Cleverness
Every token name should be self-explanatory. When in doubt, be explicit.

### 2. Constraint Enables Creativity
Limited, intentional scales (spacing, typography) create visual harmony.

### 3. Accessibility First
All color combinations meet WCAG 2.1 AA. Touch targets are 44px minimum.

### 4. Progressive Enhancement
Core functionality works without JavaScript. Animations are bonus, not required.

### 5. Performance Budget
Design decisions consider bundle size. Unused tokens are tree-shakeable.

---

## Specification Documents

| Document | Purpose |
|----------|---------|
| **overview.md** | Philosophy, naming conventions, architecture |
| **foundations.md** | Complete token definitions (colors, typography, spacing, etc.) |
| **tokens.json** | Machine-readable token export |
| **components.md** | Component patterns and token mappings |
| **themes.md** | Theme system architecture and definitions |

---

*Specification Version 1.0.0*
