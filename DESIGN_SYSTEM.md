# Fabrk Design System

> Terminal-inspired, accessibility-first design system with 100+ components

## Table of Contents

1. [Colors](#colors)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Shadows & Effects](#shadows--effects)
5. [Terminal Aesthetic](#terminal-aesthetic)
6. [Components](#components)
7. [Themes](#themes)
8. [Accessibility](#accessibility)

---

## Colors

### Semantic Tokens (OKLCH format)

All colors use OKLCH format for better color accuracy and theme switching.

| Token | Purpose | Tailwind Class |
|-------|---------|----------------|
| `--background` | Page backgrounds | `bg-background` |
| `--foreground` | Primary text | `text-foreground` |
| `--card` | Card surfaces | `bg-card` |
| `--card-foreground` | Card text | `text-card-foreground` |
| `--popover` | Popover backgrounds | `bg-popover` |
| `--popover-foreground` | Popover text | `text-popover-foreground` |
| `--primary` | Brand, CTAs | `bg-primary`, `text-primary` |
| `--primary-foreground` | Text on primary | `text-primary-foreground` |
| `--secondary` | Secondary actions | `bg-secondary`, `text-secondary` |
| `--secondary-foreground` | Text on secondary | `text-secondary-foreground` |
| `--muted` | Subtle backgrounds | `bg-muted` |
| `--muted-foreground` | Secondary text | `text-muted-foreground` |
| `--accent` | Highlights | `bg-accent`, `text-accent` |
| `--accent-foreground` | Text on accent | `text-accent-foreground` |
| `--destructive` | Errors, danger | `bg-destructive`, `text-destructive` |
| `--destructive-foreground` | Text on destructive | `text-destructive-foreground` |
| `--success` | Success states | `bg-success`, `text-success` |
| `--success-foreground` | Text on success | `text-success-foreground` |
| `--warning` | Warning states | `bg-warning`, `text-warning` |
| `--warning-foreground` | Text on warning | `text-warning-foreground` |
| `--info` | Info states | `bg-info`, `text-info` |
| `--info-foreground` | Text on info | `text-info-foreground` |
| `--border` | All borders | `border-border` |
| `--input` | Input borders | `border-input` |
| `--ring` | Focus rings | `ring-ring` |

### Chart Colors

For data visualizations:
- `--chart-1` through `--chart-5`

### Usage Examples

```tsx
// Backgrounds
<div className="bg-background">        // Page background
<div className="bg-card">              // Card surface
<div className="bg-muted">             // Subtle background
<div className="bg-primary">           // Brand/CTA background

// Text
<p className="text-foreground">        // Primary text
<p className="text-muted-foreground">  // Secondary text
<p className="text-primary">           // Brand color text
<p className="text-destructive">       // Error text
<p className="text-success">           // Success text

// Borders
<div className="border border-border"> // Standard border
<div className="border-primary">       // Accent border
```

### Banned

- Hardcoded hex values: `#8b5cf6`, `#ffffff`
- Tailwind color classes: `bg-gray-500`, `text-purple-600`, `border-slate-200`
- Raw color functions: `rgb()`, `hsl()`, `oklch()` without `var()`

---

## Typography

### Font Families

| Token | Font | Usage |
|-------|------|-------|
| `--font-sans` | Geist Sans | Marketing, headings |
| `--font-mono` | JetBrains Mono | Terminal UI, code, labels, body text |

### Type Scale

#### Headings

| Class | Size | Weight | Use |
|-------|------|--------|-----|
| `text-4xl font-semibold tracking-tight` | 36px | 600 | Page titles |
| `text-2xl font-semibold tracking-tight` | 24px | 600 | Section headings |
| `text-xl font-semibold` | 20px | 600 | Card titles |
| `text-lg font-bold` | 18px | 700 | Card headers |
| `text-base font-semibold` | 16px | 600 | Subsections |

#### Labels (Terminal Style)

| Class | Size | Use |
|-------|------|-----|
| `font-mono text-xs text-muted-foreground` | 12px | Form labels, metadata |
| `font-mono text-xs font-bold text-primary` | 12px | Section labels |
| `font-mono text-xs uppercase tracking-wide` | 12px | Terminal badges |

#### Body Text

| Class | Size | Use |
|-------|------|-----|
| `font-mono text-sm text-muted-foreground` | 14px | Descriptions |
| `font-mono text-sm leading-relaxed` | 14px | Long-form content |
| `font-mono text-xs` | 12px | Small print, captions |

#### Code

| Class | Use |
|-------|-----|
| `font-mono` | Inline code |
| `font-mono text-xs` | Code blocks |
| `font-mono text-sm` | Larger code displays |

### CSS Utility Classes

From `globals.css`:

```css
.heading-section     /* font-mono text-lg font-bold text-primary */
.heading-subsection  /* font-mono text-base font-semibold text-foreground */
.body-text           /* font-mono text-sm text-muted-foreground leading-relaxed */
.docs-h2             /* font-mono text-lg font-bold text-primary mt-8 mb-4 */
.docs-h3             /* font-mono text-base font-semibold text-foreground mb-2 */
.docs-body           /* font-mono text-sm text-muted-foreground leading-relaxed */
```

---

## Spacing

### 8-Point Grid System

All spacing follows multiples of 4px/8px for visual consistency.

| Name | Value | Tailwind Classes |
|------|-------|------------------|
| xs | 4px (0.25rem) | `p-1`, `m-1`, `gap-1` |
| sm | 8px (0.5rem) | `p-2`, `m-2`, `gap-2` |
| md | 16px (1rem) | `p-4`, `m-4`, `gap-4` |
| lg | 24px (1.5rem) | `p-6`, `m-6`, `gap-6` |
| xl | 32px (2rem) | `p-8`, `m-8`, `gap-8` |
| 2xl | 48px (3rem) | `p-12`, `m-12`, `gap-12` |
| 3xl | 64px (4rem) | `p-16`, `m-16`, `gap-16` |

### Common Patterns

#### Page Container

```tsx
<div className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
  {/* Page content */}
</div>
```

#### Card Padding

```tsx
<div className="p-4">        {/* Standard card content */}
<div className="p-6">        {/* Spacious card content */}
<div className="px-4 py-2">  {/* Card header bar */}
<div className="px-4 py-3">  {/* Form inputs */}
```

#### Section Spacing

```tsx
<div className="space-y-2">  {/* Tight: form fields */}
<div className="space-y-4">  {/* Standard: within sections */}
<div className="space-y-6">  {/* Comfortable: card lists */}
<div className="space-y-8">  {/* Loose: between sections */}
<div className="space-y-12"> {/* Wide: major page sections */}
<div className="space-y-16"> {/* Extra wide: page divisions */}
```

#### Grid Gaps

```tsx
<div className="grid gap-2">  {/* Tight grid */}
<div className="grid gap-4">  {/* Standard grid */}
<div className="grid gap-6">  {/* Card grid */}
<div className="grid gap-8">  {/* Spacious grid */}
```

#### Margins

```tsx
<div className="mt-4">   {/* Standard top margin */}
<div className="mt-8">   {/* Section top margin */}
<div className="mb-2">   {/* Label bottom margin */}
<div className="mb-4">   {/* Heading bottom margin */}
```

### CSS Utility Classes

```css
.section-spacing     /* space-y-4 (16px between items) */
.section-spacing-lg  /* space-y-16 (64px between major sections) */
```

---

## Shadows & Effects

### Allowed Shadows

| Class | Use |
|-------|-----|
| `shadow-sm` | Subtle elevation for cards |
| `shadow-[4px_4px_0px_0px_var(--border)]` | Terminal-style hard shadow |

### Banned Shadows

- `shadow-md`
- `shadow-lg`
- `shadow-xl`
- `shadow-2xl`

### Transitions

```tsx
// Standard transitions
<div className="transition-colors duration-200">     {/* Color changes */}
<div className="transition-all duration-200">        {/* Multi-property */}
<div className="transition-opacity duration-150">    {/* Fade effects */}
<div className="transition-transform duration-200">  {/* Movement */}
```

### Hover States

```tsx
// Standard hover patterns
<button className="hover:bg-muted">
<a className="hover:text-foreground">
<div className="hover:border-primary">
```

---

## Terminal Aesthetic

The Fabrk design system uses a terminal/console-inspired aesthetic with sharp edges, monospace fonts, and command-line conventions.

### Core Principles

1. **Sharp edges** - `rounded-none` on all components
2. **Monospace fonts** - `font-mono` for all UI text
3. **Command-line feel** - Brackets, prefixes, uppercase labels

### Border Radius

| Allowed | Banned |
|---------|--------|
| `rounded-none` | `rounded-sm` |
| `rounded-full` (traffic light dots only) | `rounded-md` |
| | `rounded-lg` |
| | `rounded-xl` |
| | `rounded-2xl` |
| | `rounded-3xl` |

### Button Format

```tsx
// Correct - terminal style
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>
<Button className="rounded-none font-mono text-xs">> DELETE_ACCOUNT</Button>

// Loading state
<Button className="rounded-none font-mono text-xs" disabled>> LOADING...</Button>

// Wrong - avoid these
<Button>Submit</Button>
<Button>Save Changes</Button>
```

### Label Format

```tsx
// Standard labels
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>
<span className="font-mono text-xs text-muted-foreground">[EMAIL]:</span>
<span className="font-mono text-xs text-muted-foreground">[STATUS]:</span>

// Status messages
<p className="font-mono text-xs text-destructive">[ERROR]: Invalid input</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Saved successfully</p>
<p className="font-mono text-xs text-warning">[WARNING]: Action required</p>
<p className="font-mono text-xs text-info">[INFO]: Processing...</p>
```

### Card Headers

```tsx
// Single-line terminal header
<div className="border border-border bg-card">
  <div className="border-b border-border px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">
      [ [0x00] SECTION_TITLE ]
    </span>
  </div>
  <div className="p-4">
    {/* Card content */}
  </div>
</div>
```

### Traffic Light Dots

```tsx
// Window control dots (only place rounded-full is allowed)
<div className="flex items-center gap-2 border-b border-border px-4 py-2">
  <div className="flex gap-1.5">
    <div className="size-2 rounded-full bg-destructive/50" />
    <div className="size-2 rounded-full bg-warning/50" />
    <div className="size-2 rounded-full bg-success/50" />
  </div>
  <span className="font-mono text-xs text-muted-foreground">filename.tsx</span>
</div>
```

### CSS Utility Classes

From `globals.css`:

```css
.terminal-label     /* Uppercase monospace with letter-spacing */
.terminal-bracket   /* Adds [ ] around content */
.terminal-cmd       /* Adds > prefix in primary color */
.terminal-status    /* Status badge styling */
.terminal-box       /* Border container */
.terminal-grid      /* Background grid pattern */
.terminal-cursor    /* Blinking cursor animation */
.terminal-scanlines /* Subtle CRT effect */
.terminal-preview   /* Forces rounded-none on all children */
```

---

## Components

100+ components organized by category. See `/docs/components/overview` for full documentation.

### Form Inputs (34)
Accordion, Autocomplete, Calendar, Checkbox, Color Picker, Combobox, Date Picker, Date Range Picker, Datetime Picker, Field, Form, Form Error, Input, Input Group, Input Number, Input OTP, Input Password, Input Search, Label, Multi Select, Multi Step Form, Password Strength, Radio Group, Rating, Rich Text Editor, Select, Slider, Switch, Textarea, Time Picker

### Buttons & Actions (2)
Button, Copy Button

### Data Display (16)
Activity Timeline, Avatar, Avatar Group, Badge, Banner, Card, Code Block, Data Table Header, Empty State, KPI Card, Member Card, Skeleton, Stat Card, Status Indicator, Table, Typography

### Charts (7)
Donut Chart, Funnel Chart, Gauge, Heatmap, Pie Chart, Progress, Sparkline

### Overlays (7)
Alert Dialog, Context Menu, Dialog, Hover Card, Popover, Sheet, Tooltip

### Navigation (9)
Breadcrumb, Command, Dropdown Menu, Menubar, Navigation, Navigation Menu, Pagination, Sidebar, Tabs

### Layout (9)
Aspect Ratio, Collapsible, Container, Grid, Page Wrapper, Scroll Area, Section, Separator, Stack

### Feedback (7)
Alert, Loading, Notification Badge, Notification Center, Notification List, Toast, Toaster

### Media (7)
Cropper, Cropper Controls, File Upload, Image Dropzone, Image Uploader, Lightbox, Mermaid

### Landing (6)
FAQ, Features, Footer, Hero, Pricing, Testimonials

### Specialized (7)
Code Generator, Invite Form, Markdown Editor, Markdown Viewer, Prompt Builder, Role Selector, Simple Icon

---

## Themes

20 DaisyUI-inspired themes with OKLCH color values for optimal color accuracy.

### Available Themes

**Light Themes:**
- `light` - Clean white (default)
- `cupcake` - Soft pastels
- `bumblebee` - Yellow accents
- `emerald` - Green tones
- `corporate` - Blue business
- `retro` - Vintage warm
- `cyberpunk` - Pink/yellow tech
- `valentine` - Romantic pink
- `lofi` - Minimalist
- `pastel` - Light pastels
- `fantasy` - Purple fantasy
- `autumn` - Warm earth tones

**Dark Themes:**
- `dark` - Professional dark (default dark)
- `synthwave` - Neon purple/pink
- `halloween` - Orange/dark
- `forest` - Nature green
- `aqua` - Cyan/blue
- `luxury` - High-end dark with gold
- `dracula` - Purple developer
- `business` - Professional dark blue

### Theme Switching

```tsx
// Set theme on html element
<html data-theme="dark">

// Or dynamically
document.documentElement.setAttribute('data-theme', 'synthwave');
```

---

## Accessibility

### WCAG 2.1 AA Compliance

The design system is built with accessibility as a core requirement.

#### Color Contrast
- All color combinations meet WCAG AA contrast requirements
- High contrast mode support via `prefers-contrast: more`

#### Focus Indicators
```tsx
// Enhanced focus styles
.focus-visible-enhanced:focus-visible {
  outline: 2px solid oklch(var(--ring));
  outline-offset: 2px;
  box-shadow: 0 0 0 4px oklch(var(--ring) / 0.2);
}
```

#### Screen Reader Utilities
```css
.sr-only      /* Visually hidden but accessible */
.not-sr-only  /* Reverse sr-only */
```

#### Skip Links
```css
.skip-link    /* Hidden until focused, appears at top of page */
```

#### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  /* Disables animations for users who prefer reduced motion */
}
```

#### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus visible styles on all focusable elements
- Proper tab order maintained

---

## Resources

- `src/app/globals.css` - CSS variables and utility classes
- `AUDIT_PROMPT.md` - Full compliance checklist
- `CLAUDE.md` - Quick reference for Claude Code
- `/docs/components/*` - Component documentation
- `/docs/components/overview` - Full component listing
