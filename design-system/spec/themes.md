# Theme System Architecture

> How themes plug into the design system to enable visual variety without code changes.

---

## Table of Contents

1. [Theme Philosophy](#theme-philosophy)
2. [Token Layers](#token-layers)
3. [Base Semantic Tokens](#base-semantic-tokens)
4. [Theme Definitions](#theme-definitions)
5. [Implementation](#implementation)
6. [Theme Switching](#theme-switching)
7. [Creating New Themes](#creating-new-themes)
8. [Dark Mode](#dark-mode)

---

## Theme Philosophy

### Separation of Concerns

```
┌─────────────────────────────────────────────────────────────┐
│  COMPONENTS                                                 │
│  Reference semantic tokens only                             │
│  Never reference raw values or theme-specific tokens        │
├─────────────────────────────────────────────────────────────┤
│  SEMANTIC TOKENS                                            │
│  Role-based naming (bg-surface, text-primary)               │
│  Resolved by active theme                                   │
├─────────────────────────────────────────────────────────────┤
│  THEMES                                                     │
│  Map semantic tokens to primitive values                    │
│  Terminal, Modern, Soft, Custom                             │
├─────────────────────────────────────────────────────────────┤
│  PRIMITIVES                                                 │
│  Raw values (colors, sizes)                                 │
│  Shared across all themes                                   │
└─────────────────────────────────────────────────────────────┘
```

### Design Goals

1. **Zero component changes** when switching themes
2. **Consistent behavior** with different aesthetics
3. **Type-safe** theme definitions
4. **Runtime switchable** without page reload
5. **CSS-first** with JS fallback

---

## Token Layers

### Layer 1: Primitives

Raw, immutable values that themes select from.

```typescript
// primitives.ts
export const primitives = {
  color: {
    white: "#ffffff",
    black: "#000000",
    gray: {
      50: "oklch(98% 0.005 240)",
      100: "oklch(96% 0.005 240)",
      200: "oklch(92% 0.005 240)",
      300: "oklch(87% 0.005 240)",
      400: "oklch(70% 0.005 240)",
      500: "oklch(55% 0.005 240)",
      600: "oklch(45% 0.005 240)",
      700: "oklch(37% 0.01 240)",
      800: "oklch(27% 0.01 240)",
      900: "oklch(21% 0.01 240)",
      950: "oklch(14% 0.01 240)",
    },
    primary: {
      50: "oklch(97% 0.02 290)",
      100: "oklch(94% 0.04 290)",
      200: "oklch(88% 0.08 290)",
      300: "oklch(79% 0.14 290)",
      400: "oklch(70% 0.18 290)",
      500: "oklch(60% 0.20 290)",
      600: "oklch(52% 0.22 290)",
      700: "oklch(45% 0.22 290)",
      800: "oklch(38% 0.20 290)",
      900: "oklch(32% 0.18 290)",
      950: "oklch(22% 0.15 290)",
    },
  },
  
  space: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
  },
  
  radius: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
  
  shadow: {
    none: "none",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  },
  
  font: {
    sans: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
};
```

### Layer 2: Semantic Tokens

Role-based tokens that components reference.

```typescript
// semantic.ts
export interface SemanticTokens {
  color: {
    bg: {
      base: string;
      surface: string;
      surfaceRaised: string;
      surfaceSunken: string;
      muted: string;
      accent: string;
      accentMuted: string;
      danger: string;
      dangerMuted: string;
      success: string;
      successMuted: string;
      warning: string;
      warningMuted: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
      disabled: string;
      inverse: string;
      accent: string;
      danger: string;
      success: string;
      warning: string;
    };
    border: {
      default: string;
      muted: string;
      strong: string;
      accent: string;
      focus: string;
    };
  };
  radius: {
    button: string;
    input: string;
    card: string;
    modal: string;
    badge: string;
  };
  shadow: {
    card: string;
    dropdown: string;
    modal: string;
  };
  font: {
    body: string;
    heading: string;
    code: string;
  };
  textTransform: {
    button: string;
    label: string;
    heading: string;
  };
}
```

### Layer 3: Theme Mappings

How each theme resolves semantic tokens.

```typescript
// themes/terminal.ts
export const terminalTheme: SemanticTokens = {
  color: {
    bg: {
      base: primitives.color.gray[950],
      surface: primitives.color.gray[900],
      surfaceRaised: primitives.color.gray[850],
      surfaceSunken: primitives.color.gray[950],
      muted: primitives.color.gray[800],
      accent: primitives.color.primary[600],
      accentMuted: primitives.color.primary[950],
      danger: primitives.color.red[600],
      dangerMuted: primitives.color.red[950],
      success: primitives.color.green[600],
      successMuted: primitives.color.green[950],
      warning: primitives.color.amber[500],
      warningMuted: primitives.color.amber[950],
    },
    text: {
      primary: primitives.color.gray[50],
      secondary: primitives.color.gray[300],
      muted: primitives.color.gray[500],
      disabled: primitives.color.gray[600],
      inverse: primitives.color.gray[950],
      accent: primitives.color.primary[400],
      danger: primitives.color.red[400],
      success: primitives.color.green[400],
      warning: primitives.color.amber[400],
    },
    border: {
      default: primitives.color.gray[800],
      muted: primitives.color.gray[850],
      strong: primitives.color.gray[700],
      accent: primitives.color.primary[500],
      focus: primitives.color.primary[400],
    },
  },
  radius: {
    button: primitives.radius.none,
    input: primitives.radius.none,
    card: primitives.radius.none,
    modal: primitives.radius.none,
    badge: primitives.radius.sm,
  },
  shadow: {
    card: primitives.shadow.none,
    dropdown: primitives.shadow.sm,
    modal: primitives.shadow.sm,
  },
  font: {
    body: primitives.font.mono,
    heading: primitives.font.mono,
    code: primitives.font.mono,
  },
  textTransform: {
    button: "uppercase",
    label: "uppercase",
    heading: "uppercase",
  },
};
```

---

## Base Semantic Tokens

### Color Tokens

| Token | Description | Usage |
|-------|-------------|-------|
| `color-bg-base` | Page background | `<body>`, main areas |
| `color-bg-surface` | Content containers | Cards, panels |
| `color-bg-surface-raised` | Elevated content | Modals, popovers |
| `color-bg-surface-sunken` | Recessed content | Inputs, code blocks |
| `color-bg-muted` | Subtle backgrounds | Badges, highlights |
| `color-bg-accent` | Primary actions | Buttons, active states |
| `color-bg-accent-muted` | Subtle accent | Tags, soft highlights |
| `color-bg-danger` | Destructive actions | Delete buttons |
| `color-bg-danger-muted` | Subtle danger | Error backgrounds |
| `color-bg-success` | Success actions | Confirm buttons |
| `color-bg-success-muted` | Subtle success | Success messages |
| `color-bg-warning` | Warning state | Warning buttons |
| `color-bg-warning-muted` | Subtle warning | Warning messages |
| `color-text-primary` | Primary content | Headings, body |
| `color-text-secondary` | Supporting content | Descriptions |
| `color-text-muted` | Tertiary content | Placeholders, meta |
| `color-text-disabled` | Disabled content | Inactive elements |
| `color-text-inverse` | On accent backgrounds | Button text |
| `color-text-accent` | Links, emphasis | CTAs, links |
| `color-text-danger` | Error text | Validation errors |
| `color-text-success` | Success text | Success messages |
| `color-text-warning` | Warning text | Warning messages |
| `color-border-default` | Standard borders | Cards, inputs |
| `color-border-muted` | Subtle borders | Dividers |
| `color-border-strong` | Emphasized borders | Active states |
| `color-border-accent` | Accent borders | Focus, selection |
| `color-border-focus` | Focus rings | Accessibility |

### Radius Tokens

| Token | Description | Terminal | Modern | Soft |
|-------|-------------|----------|--------|------|
| `radius-button` | Buttons | 0 | 6px | 8px |
| `radius-input` | Form inputs | 0 | 6px | 8px |
| `radius-card` | Cards, panels | 0 | 8px | 12px |
| `radius-modal` | Modals, dialogs | 0 | 12px | 16px |
| `radius-badge` | Badges, chips | 2px | 9999px | 9999px |
| `radius-avatar` | Avatars | 2px | 9999px | 9999px |

### Shadow Tokens

| Token | Description | Terminal | Modern | Soft |
|-------|-------------|----------|--------|------|
| `shadow-card` | Cards | none | sm | md |
| `shadow-dropdown` | Dropdowns | sm | md | lg |
| `shadow-modal` | Modals | sm | lg | xl |
| `shadow-button` | Elevated buttons | none | xs | sm |

### Font Tokens

| Token | Description | Terminal | Modern | Soft |
|-------|-------------|----------|--------|------|
| `font-body` | Body text | mono | sans | sans |
| `font-heading` | Headings | mono | sans | sans |
| `font-code` | Code blocks | mono | mono | mono |

### Text Transform Tokens

| Token | Description | Terminal | Modern | Soft |
|-------|-------------|----------|--------|------|
| `text-transform-button` | Button text | uppercase | none | none |
| `text-transform-label` | Labels | uppercase | none | none |
| `text-transform-heading` | Headings | uppercase | none | none |

---

## Theme Definitions

### Terminal Theme

Sharp, developer-focused aesthetic inspired by CLI tools.

```css
:root[data-theme="terminal"] {
  /* Colors - Light */
  --color-bg-base: var(--gray-50);
  --color-bg-surface: var(--white);
  --color-bg-surface-raised: var(--white);
  --color-bg-muted: var(--gray-100);
  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-700);
  --color-text-muted: var(--gray-500);
  --color-border-default: var(--gray-200);
  
  /* Radius - All sharp */
  --radius-button: 0;
  --radius-input: 0;
  --radius-card: 0;
  --radius-modal: 0;
  --radius-badge: 2px;
  
  /* Shadows - Minimal */
  --shadow-card: none;
  --shadow-dropdown: var(--shadow-sm);
  --shadow-modal: var(--shadow-sm);
  
  /* Typography */
  --font-body: var(--font-mono);
  --font-heading: var(--font-mono);
  --text-transform-button: uppercase;
  --text-transform-label: uppercase;
}
```

**Characteristics:**
- `rounded-none` on all elements
- `font-mono` everywhere
- `UPPERCASE` labels and buttons
- Minimal shadows (border-focused)
- Bracket syntax: `[ SECTION ]`, `[LABEL]:`
- Status prefixes: `[OK]`, `[ERROR]`, `[WARNING]`

---

### Modern Theme

Clean, Linear/Vercel-inspired aesthetic.

```css
:root[data-theme="modern"] {
  /* Colors - Light */
  --color-bg-base: var(--white);
  --color-bg-surface: var(--white);
  --color-bg-surface-raised: var(--white);
  --color-bg-muted: var(--gray-50);
  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-600);
  --color-text-muted: var(--gray-500);
  --color-border-default: var(--gray-200);
  
  /* Radius - Subtle */
  --radius-button: 6px;
  --radius-input: 6px;
  --radius-card: 8px;
  --radius-modal: 12px;
  --radius-badge: 9999px;
  
  /* Shadows - Subtle depth */
  --shadow-card: var(--shadow-sm);
  --shadow-dropdown: var(--shadow-md);
  --shadow-modal: var(--shadow-lg);
  
  /* Typography */
  --font-body: var(--font-sans);
  --font-heading: var(--font-sans);
  --text-transform-button: none;
  --text-transform-label: none;
}
```

**Characteristics:**
- Subtle rounded corners
- System sans-serif fonts
- Sentence case text
- Soft shadows for depth
- Clean, minimal UI chrome
- No decorative elements

---

### Soft Theme

Friendly, approachable aesthetic for consumer apps.

```css
:root[data-theme="soft"] {
  /* Colors - Light */
  --color-bg-base: var(--gray-50);
  --color-bg-surface: var(--white);
  --color-bg-surface-raised: var(--white);
  --color-bg-muted: var(--gray-100);
  --color-text-primary: var(--gray-800);
  --color-text-secondary: var(--gray-600);
  --color-text-muted: var(--gray-500);
  --color-border-default: var(--gray-200);
  
  /* Radius - Rounded */
  --radius-button: 8px;
  --radius-input: 8px;
  --radius-card: 12px;
  --radius-modal: 16px;
  --radius-badge: 9999px;
  
  /* Shadows - Prominent */
  --shadow-card: var(--shadow-md);
  --shadow-dropdown: var(--shadow-lg);
  --shadow-modal: var(--shadow-xl);
  
  /* Typography */
  --font-body: var(--font-sans);
  --font-heading: var(--font-sans);
  --text-transform-button: none;
  --text-transform-label: none;
}
```

**Characteristics:**
- More rounded corners
- Warmer color tones
- More prominent shadows
- Friendly, approachable feel
- Larger touch targets
- More whitespace

---

## Implementation

### CSS Custom Properties

```css
/* primitives.css */
:root {
  /* Gray palette */
  --gray-50: oklch(98% 0.005 240);
  --gray-100: oklch(96% 0.005 240);
  --gray-200: oklch(92% 0.005 240);
  --gray-300: oklch(87% 0.005 240);
  --gray-400: oklch(70% 0.005 240);
  --gray-500: oklch(55% 0.005 240);
  --gray-600: oklch(45% 0.005 240);
  --gray-700: oklch(37% 0.01 240);
  --gray-800: oklch(27% 0.01 240);
  --gray-900: oklch(21% 0.01 240);
  --gray-950: oklch(14% 0.01 240);
  
  /* Primary palette */
  --primary-50: oklch(97% 0.02 290);
  --primary-100: oklch(94% 0.04 290);
  --primary-200: oklch(88% 0.08 290);
  --primary-300: oklch(79% 0.14 290);
  --primary-400: oklch(70% 0.18 290);
  --primary-500: oklch(60% 0.20 290);
  --primary-600: oklch(52% 0.22 290);
  --primary-700: oklch(45% 0.22 290);
  --primary-800: oklch(38% 0.20 290);
  --primary-900: oklch(32% 0.18 290);
  --primary-950: oklch(22% 0.15 290);
  
  /* Fixed primitives */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* semantic.css - Default theme (terminal) */
:root {
  --color-bg-base: var(--gray-50);
  --color-bg-surface: var(--white);
  --color-text-primary: var(--gray-900);
  --radius-button: 0;
  --shadow-card: none;
  --font-body: var(--font-mono);
  --text-transform-button: uppercase;
}

/* themes/modern.css */
:root[data-theme="modern"] {
  --radius-button: 6px;
  --radius-input: 6px;
  --radius-card: 8px;
  --shadow-card: var(--shadow-sm);
  --font-body: var(--font-sans);
  --text-transform-button: none;
}

/* themes/soft.css */
:root[data-theme="soft"] {
  --radius-button: 8px;
  --radius-card: 12px;
  --shadow-card: var(--shadow-md);
  --font-body: var(--font-sans);
  --text-transform-button: none;
}
```

### TypeScript Types

```typescript
// types.ts
export type ThemeMode = "terminal" | "modern" | "soft";
export type ColorScheme = "light" | "dark" | "system";

export interface ThemeConfig {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  accentColor?: string;
}

export interface ThemeContext {
  theme: ThemeConfig;
  setTheme: (config: Partial<ThemeConfig>) => void;
}
```

### React Context

```typescript
// ThemeProvider.tsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext<ThemeContext | null>(null);

export function ThemeProvider({ 
  children,
  defaultTheme = "terminal",
  defaultColorScheme = "system"
}) {
  const [theme, setThemeState] = useState<ThemeConfig>({
    mode: defaultTheme,
    colorScheme: defaultColorScheme,
  });
  
  useEffect(() => {
    document.documentElement.dataset.theme = theme.mode;
    
    const isDark = theme.colorScheme === "dark" || 
      (theme.colorScheme === "system" && 
       window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme]);
  
  const setTheme = (config: Partial<ThemeConfig>) => {
    setThemeState(prev => ({ ...prev, ...config }));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
```

---

## Theme Switching

### HTML Implementation

```html
<!-- Set theme via data attribute -->
<html data-theme="terminal" class="dark">
```

### JavaScript API

```typescript
// Set theme
document.documentElement.dataset.theme = "modern";

// Toggle dark mode
document.documentElement.classList.toggle("dark");

// Read current theme
const currentTheme = document.documentElement.dataset.theme;
```

### React Hook

```typescript
const { theme, setTheme } = useTheme();

// Switch to terminal mode
setTheme({ mode: "terminal" });

// Toggle color scheme
setTheme({ 
  colorScheme: theme.colorScheme === "dark" ? "light" : "dark" 
});
```

### Persistence

```typescript
const saveTheme = (config: ThemeConfig) => {
  localStorage.setItem("theme", JSON.stringify(config));
};

const loadTheme = (): ThemeConfig => {
  const saved = localStorage.getItem("theme");
  return saved ? JSON.parse(saved) : { mode: "terminal", colorScheme: "system" };
};
```

---

## Creating New Themes

### Step 1: Define Theme Values

```typescript
// themes/custom.ts
import { primitives } from "../primitives";
import type { SemanticTokens } from "../types";

export const customTheme: SemanticTokens = {
  color: {
    bg: {
      base: "#your-color",
      surface: "#your-color",
    },
    text: {
      primary: "#your-color",
    },
    border: {
      default: "#your-color",
    },
  },
  radius: {
    button: "4px",
    input: "4px",
    card: "6px",
    modal: "8px",
    badge: "9999px",
  },
  shadow: {
    card: primitives.shadow.md,
    dropdown: primitives.shadow.lg,
    modal: primitives.shadow.xl,
  },
  font: {
    body: primitives.font.sans,
    heading: primitives.font.sans,
    code: primitives.font.mono,
  },
  textTransform: {
    button: "capitalize",
    label: "none",
    heading: "none",
  },
};
```

### Step 2: Generate CSS

```css
/* themes/custom.css */
:root[data-theme="custom"] {
  --color-bg-base: #your-color;
  --color-bg-surface: #your-color;
  --radius-button: 4px;
  --shadow-card: var(--shadow-md);
  --font-body: var(--font-sans);
  --text-transform-button: capitalize;
}
```

### Step 3: Register Theme

```typescript
// themes/index.ts
export const themes = {
  terminal: terminalTheme,
  modern: modernTheme,
  soft: softTheme,
  custom: customTheme,
} as const;

export type ThemeMode = keyof typeof themes;
```

---

## Dark Mode

Each theme supports both light and dark color schemes.

### Implementation

```css
/* Light mode (default) */
:root[data-theme="terminal"] {
  --color-bg-base: var(--gray-50);
  --color-text-primary: var(--gray-900);
}

/* Dark mode */
:root[data-theme="terminal"].dark {
  --color-bg-base: var(--gray-950);
  --color-text-primary: var(--gray-50);
}

/* System preference */
@media (prefers-color-scheme: dark) {
  :root[data-theme="terminal"]:not(.light) {
    --color-bg-base: var(--gray-950);
    --color-text-primary: var(--gray-50);
  }
}
```

### Color Scheme Matrix

| Token | Terminal Light | Terminal Dark | Modern Light | Modern Dark |
|-------|---------------|---------------|--------------|-------------|
| `bg-base` | gray-50 | gray-950 | white | gray-950 |
| `bg-surface` | white | gray-900 | white | gray-900 |
| `text-primary` | gray-900 | gray-50 | gray-900 | gray-50 |
| `border-default` | gray-200 | gray-800 | gray-200 | gray-800 |

---

*Theme System Architecture Version 1.0.0*
