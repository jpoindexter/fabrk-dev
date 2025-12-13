# Colors: Design Tokens

Allowed color tokens and semantic meanings.

---

## Allowed Color Tokens

### Backgrounds

```tsx
bg-background      // Page background
bg-card            // Card surfaces
bg-muted           // Subtle backgrounds
bg-primary         // Brand/CTA backgrounds
bg-secondary       // Secondary action backgrounds
bg-destructive     // Error state backgrounds
bg-success         // Success state backgrounds
bg-warning         // Warning state backgrounds
bg-info            // Info state backgrounds
```

### Text Colors

```tsx
text-foreground           // Primary text
text-muted-foreground     // Secondary text
text-primary              // Brand color text
text-primary-foreground   // Text on primary background
text-destructive          // Error text
text-destructive-foreground
text-success              // Success text
text-warning              // Warning text
text-info                 // Info text
```

### Border Colors

```tsx
border-border      // Standard borders
border-input       // Input borders
border-primary     // Accent borders
```

### Chart Colors

```tsx
chart-1 through chart-5  // For data visualizations
```

---

## BANNED Colors (No Exceptions)

### Hardcoded Hex Values

```tsx
// ❌ NEVER use hardcoded colors
#8b5cf6
#ffffff
#000000
#ef4444
```

### Tailwind Palette Colors

```tsx
// ❌ NEVER use raw Tailwind colors
bg-gray-500
text-purple-600
border-slate-200
bg-red-500
text-blue-400
bg-green-600
```

### Raw Color Functions

```tsx
// ❌ NEVER use raw color functions
rgb(255, 255, 255)
hsl(280, 100%, 50%)
oklch(70% 0.15 300)

// ✅ ONLY use var() with CSS variables
oklch(var(--primary))
```

### Named Colors

```tsx
// ❌ NEVER use named colors
bg-white
text-black
border-gray
```

---

## Semantic Color Meaning

| Color | Use | Token | Psychology |
|-------|-----|-------|------------|
| **Primary** | Brand, CTAs | `bg-primary` | Trust, action |
| **Success** | Completion | `text-success` | Growth, go |
| **Warning** | Caution | `text-warning` | Alert |
| **Destructive** | Error | `text-destructive` | Stop, urgent |
| **Info** | Information | `text-info` | Calm |
| **Muted** | Secondary | `text-muted-foreground` | De-emphasized |

---

## Common Fixes

| Wrong | Correct |
|-------|---------|
| `bg-purple-500` | `bg-primary` |
| `text-white` | `text-primary-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `border-gray-200` | `border-border` |
| `bg-white` | `bg-background` or `bg-card` |
| `text-black` | `text-foreground` |
| `bg-red-500` | `bg-destructive` |
| `text-green-500` | `text-success` |
