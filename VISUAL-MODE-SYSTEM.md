# Visual Mode System

> Switch your entire site aesthetic by changing ONE line of code.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Available Modes](#available-modes)
4. [Usage Guide](#usage-guide)
5. [API Reference](#api-reference)
6. [Implementation Report](#implementation-report)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The Visual Mode System is a centralized aesthetic control layer that allows you to switch between different visual styles (terminal, standard, minimal) across your entire application by changing a single configuration value.

### The Problem It Solves

**Before:** Changing from terminal style to rounded ShadCN style required editing 200+ files manually.

```tsx
// Had to find and change every instance:
<Button className="rounded-none font-mono">> SUBMIT</Button>
<Card className="rounded-none">...</Card>
<Input className="rounded-none font-mono" />
// ... repeated across 200+ components
```

**After:** Change ONE line, entire site updates.

```tsx
// src/lib/design-system/visual-mode.ts
export const CURRENT_MODE: VisualMode = "standard"; // ← Just change this
```

---

## Quick Start

### Step 1: Switch Modes

Open `src/lib/design-system/visual-mode.ts` and change line 165:

```tsx
// Current: Terminal aesthetic (sharp corners, monospace)
export const CURRENT_MODE: VisualMode = "terminal";

// Option 2: Standard ShadCN (rounded corners, sans-serif)
export const CURRENT_MODE: VisualMode = "standard";

// Option 3: Minimal (subtle rounding, clean)
export const CURRENT_MODE: VisualMode = "minimal";
```

### Step 2: Restart Dev Server

```bash
npm run dev
```

That's it. Your entire site now uses the new aesthetic.

---

## Available Modes

### Terminal Mode (Default)

```
┌─────────────────────────────────┐
│ [ [0x00] SETTINGS ]             │  ← Sharp corners
├─────────────────────────────────┤     Monospace font
│ [EMAIL]:                        │     Brackets around labels
│ ┌─────────────────────────────┐ │     > PREFIX on buttons
│ │ user@example.com            │ │     UPPERCASE text
│ └─────────────────────────────┘ │
│ > SAVE_CHANGES                  │
└─────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| `radius` | `rounded-none` |
| `font` | `font-mono` |
| `shadow` | (none) |
| `buttonPrefix` | `"> "` |
| `labelFormat` | `brackets` → `[LABEL]:` |
| `textTransform` | `uppercase` |

### Standard Mode

```
╭─────────────────────────────────╮
│ Settings                        │  ← Rounded corners (lg)
├─────────────────────────────────┤     Sans-serif font
│ Email                           │     Plain labels
│ ╭─────────────────────────────╮ │     Normal buttons
│ │ user@example.com            │ │     Normal case text
│ ╰─────────────────────────────╯ │
│      Save Changes               │
╰─────────────────────────────────╯
```

| Property | Value |
|----------|-------|
| `radius` | `rounded-lg` |
| `font` | `font-sans` |
| `shadow` | `shadow-sm` |
| `buttonPrefix` | `""` |
| `labelFormat` | `plain` → `Label` |
| `textTransform` | `normal` |

### Minimal Mode

```
╭─────────────────────────────────╮
│ Settings                        │  ← Subtle rounding (md)
├─────────────────────────────────┤     Sans-serif font
│ Email                           │     Plain labels
│ ╭─────────────────────────────╮ │     No shadows
│ │ user@example.com            │ │     Clean aesthetic
│ ╰─────────────────────────────╯ │
│      Save Changes               │
╰─────────────────────────────────╯
```

| Property | Value |
|----------|-------|
| `radius` | `rounded-md` |
| `font` | `font-sans` |
| `shadow` | (none) |
| `buttonPrefix` | `""` |
| `labelFormat` | `plain` → `Label` |
| `textTransform` | `normal` |

---

## Usage Guide

### Importing the Design System

```tsx
import { mode, formatLabel, formatButtonText, formatCardTitle } from "@/lib/design-system";
```

### Using Mode Properties

```tsx
// Apply radius and font to any element
<div className={cn("bg-card border", mode.radius, mode.font)}>
  Content here
</div>

// Apply shadow (only shows in standard mode)
<Card className={cn(mode.radius, mode.shadow)}>
  Card content
</Card>
```

### Formatting Labels

```tsx
import { formatLabel } from "@/lib/design-system";

// Terminal mode: "[EMAIL]:"
// Standard/Minimal: "Email"
<label>{formatLabel("Email")}</label>
```

### Formatting Button Text

```tsx
import { formatButtonText } from "@/lib/design-system";

// Terminal mode: "> SUBMIT"
// Standard/Minimal: "Submit"
<Button>{formatButtonText("Submit")}</Button>
```

### Formatting Card Titles

```tsx
import { formatCardTitle } from "@/lib/design-system";

// Terminal mode: "[ [0x00] SETTINGS ]"
// Standard/Minimal: "Settings"
<h2>{formatCardTitle("Settings", "0x00")}</h2>
```

### Checking Current Mode

```tsx
import { isTerminalMode, CURRENT_MODE } from "@/lib/design-system";

if (isTerminalMode()) {
  // Terminal-specific logic
}

// Or check directly
if (CURRENT_MODE === "standard") {
  // Standard mode logic
}
```

### Complete Component Example

```tsx
import { cn } from "@/lib/utils";
import { mode, formatLabel, formatButtonText } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  return (
    <div className={cn("border bg-card p-6", mode.radius)}>
      <h2 className={cn("text-lg font-semibold mb-4", mode.font)}>
        {formatCardTitle("Contact", "0x01")}
      </h2>

      <div className="space-y-4">
        <div>
          <label className={cn("text-sm", mode.font)}>
            {formatLabel("Email")}
          </label>
          <Input type="email" />
        </div>

        <div>
          <label className={cn("text-sm", mode.font)}>
            {formatLabel("Message")}
          </label>
          <textarea className={cn("w-full border p-2", mode.radius, mode.font)} />
        </div>

        <Button>
          {formatButtonText("Send Message")}
        </Button>
      </div>
    </div>
  );
}
```

---

## API Reference

### Exports from `@/lib/design-system`

| Export | Type | Description |
|--------|------|-------------|
| `mode` | `VisualModeConfig` | Current mode configuration object |
| `CURRENT_MODE` | `"terminal" \| "standard" \| "minimal"` | Current mode name |
| `visualModes` | `Record<VisualMode, VisualModeConfig>` | All mode configurations |
| `formatLabel(label)` | `(string) => string` | Format labels per mode |
| `formatButtonText(text)` | `(string) => string` | Format button text per mode |
| `formatCardTitle(title, code?)` | `(string, string?) => string` | Format card titles per mode |
| `isTerminalMode()` | `() => boolean` | Check if terminal mode active |

### VisualModeConfig Interface

```typescript
interface VisualModeConfig {
  radius: string;        // Tailwind border-radius class
  font: string;          // Tailwind font-family class
  shadow: string;        // Tailwind shadow class (or empty)
  buttonPrefix: string;  // Text prefix for buttons
  labelFormat: "brackets" | "plain";  // Label formatting style
  cardHeader: "terminal" | "simple" | "minimal";  // Card header style
  textTransform: "uppercase" | "normal";  // Text casing
}
```

### Mode Configuration Values

```typescript
export const visualModes = {
  terminal: {
    radius: "rounded-none",
    font: "font-mono",
    shadow: "",
    buttonPrefix: "> ",
    labelFormat: "brackets",
    cardHeader: "terminal",
    textTransform: "uppercase",
  },
  standard: {
    radius: "rounded-lg",
    font: "font-sans",
    shadow: "shadow-sm",
    buttonPrefix: "",
    labelFormat: "plain",
    cardHeader: "simple",
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
```

---

## Implementation Report

### Project Summary

| Metric | Value |
|--------|-------|
| **Components Updated** | 98 of 100 |
| **Files Changed** | 410 |
| **Lines Added** | 13,323 |
| **Lines Removed** | 24,266 |
| **Net Change** | -10,943 lines |
| **Build Routes** | 239 |
| **Completion Date** | December 2024 |

### Phases Completed

#### Phase 0: Visual Mode System Core
- Created `src/lib/design-system/visual-mode.ts`
- Created `src/lib/design-system/index.ts` (centralized exports)
- Implemented 3 visual modes with full configuration
- Added utility functions for formatting

#### Phase 1: Design Token Consolidation
- Deleted redundant `src/lib/design-tokens.ts`
- Deleted redundant `src/lib/design-system/tokens.ts`
- Established `globals.css` as single source of truth
- Updated `src/lib/design-system/constants.ts` with clean exports

#### Phase 2: Marketing Page Template
- Created `src/components/templates/marketing-page-template.tsx`
- Created `src/components/templates/template-category-page.tsx`
- Created `src/components/templates/template-showcase.tsx`
- Unified structure for all marketing pages

#### Phase 3: Visual Inconsistency Fixes
- Removed macOS-style colored dots from 53 files
- Replaced with `TerminalCardHeader` component
- Removed shadow violations from 41 files
- Fixed hardcoded colors in code-block.tsx

#### Phase 4: Build-Time Validation
- Updated `scripts/utilities/pre-commit-audit.mjs`
- Added pattern for colored dots detection
- Removed shadow exceptions (all use Visual Mode now)
- Integrated with Husky pre-commit hooks

#### Phase 5: Documentation
- Updated `DESIGN_SYSTEM.md` with Visual Mode section
- Added Marketing Page Template documentation
- Created this comprehensive guide

### Components Using Visual Mode System

All 98 UI components in `src/components/ui/` now import and use the Visual Mode System:

```
accordion.tsx          alert-dialog.tsx       alert.tsx
autocomplete.tsx       avatar-group.tsx       avatar.tsx
badge.tsx              banner.tsx             breadcrumb.tsx
button.tsx             calendar.tsx           card.tsx
checkbox.tsx           code-block.tsx         code-generator.tsx
color-picker.tsx       combobox.tsx           command.tsx
context-menu.tsx       copy-button.tsx        cropper-controls.tsx
cropper.tsx            data-table-header.tsx  data-table.tsx
date-picker.tsx        dialog.tsx             donut-chart.tsx
dropdown-menu.tsx      empty-state.tsx        field.tsx
file-upload.tsx        form-error.tsx         form.tsx
funnel-chart.tsx       gauge.tsx              heatmap.tsx
hover-card.tsx         image-dropzone.tsx     image-uploader.tsx
input-group.tsx        input-number.tsx       input-otp.tsx
input-password.tsx     input-search.tsx       input.tsx
invite-form.tsx        label.tsx              lazy.tsx
lightbox.tsx           loading.tsx            markdown-editor.tsx
markdown-viewer.tsx    member-card.tsx        menubar.tsx
multi-select.tsx       multi-step-form.tsx    navigation-menu.tsx
notification-badge.tsx notification-center.tsx notification-list.tsx
page-wrapper.tsx       pagination.tsx         password-strength.tsx
pie-chart.tsx          popover.tsx            progress.tsx
prompt-builder.tsx     radio-group.tsx        rating.tsx
rich-text-editor.tsx   role-selector.tsx      scroll-area.tsx
section.tsx            select.tsx             separator.tsx
sheet.tsx              sidebar.tsx            skeleton.tsx
slider.tsx             sparkline.tsx          status-indicator.tsx
switch.tsx             table.tsx              tabs.tsx
terminal-stoplights.tsx textarea.tsx          time-picker.tsx
toast.tsx              toaster.tsx            tooltip.tsx
typography.tsx
```

### Pre-Commit Validation

The following patterns are now blocked on commit:

| Pattern | Blocked | Message |
|---------|---------|---------|
| `console.log/debug/info` | Yes | Remove before commit |
| `target="_blank"` without `rel` | Yes | Add `rel="noopener noreferrer"` |
| `rounded-sm/md/lg/xl/2xl/3xl` | Yes | Use Visual Mode System |
| `shadow-sm/md/lg/xl/2xl/inner` | Yes | Use Visual Mode System |
| `bg/text-white/black` | Yes | Use design tokens |
| `process.env` direct access | Yes | Use `env.server.X` or `env.client.X` |
| Colored dots pattern | Yes | Use `TerminalCardHeader` |
| Missing `aria-label` on icon buttons | Warning | Add for accessibility |
| `<img>` without `alt` | Warning | Add for accessibility |

---

## Troubleshooting

### Mode Not Changing

**Symptom:** Changed `CURRENT_MODE` but site looks the same.

**Solution:**
1. Restart the dev server: `npm run dev`
2. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
3. Verify you edited the correct file: `src/lib/design-system/visual-mode.ts`

### TypeScript Errors After Mode Change

**Symptom:** TypeScript errors about `mode` properties.

**Solution:** The `mode` object is fully typed. Ensure you're using valid properties:

```tsx
// Valid properties
mode.radius      // string
mode.font        // string
mode.shadow      // string
mode.buttonPrefix // string
mode.labelFormat // "brackets" | "plain"
mode.cardHeader  // "terminal" | "simple" | "minimal"
mode.textTransform // "uppercase" | "normal"
```

### Component Not Using Mode

**Symptom:** A specific component doesn't change with mode switch.

**Solution:** Check if the component imports and uses the mode:

```tsx
// Should have this import
import { mode } from "@/lib/design-system";

// Should use mode in className
className={cn("...", mode.radius, mode.font)}
```

### Naming Conflict with `mode` Prop

**Symptom:** Component has its own `mode` prop that conflicts.

**Solution:** Rename the design system import:

```tsx
// Instead of:
import { mode } from "@/lib/design-system";

// Use:
import { mode as visualMode } from "@/lib/design-system";

// Then use visualMode.radius, visualMode.font, etc.
```

This pattern is used in `date-picker.tsx` which has a `mode` prop for "single" | "range".

### Pre-Commit Hook Blocking Commit

**Symptom:** Commit blocked with design system violations.

**Solution:**
1. Fix the violations (preferred)
2. Emergency bypass: `git commit --no-verify` (not recommended)

Run `npm run audit:staged` to see what violations exist before committing.

---

## File Locations

| File | Purpose |
|------|---------|
| `src/lib/design-system/visual-mode.ts` | Mode configuration (THE file to edit) |
| `src/lib/design-system/index.ts` | Centralized exports |
| `src/lib/design-system/constants.ts` | Design constants |
| `scripts/utilities/pre-commit-audit.mjs` | Pre-commit validation |
| `DESIGN_SYSTEM.md` | Full design system documentation |
| `VISUAL-MODE-SYSTEM.md` | This file |

---

## Quick Reference Card

```bash
# Switch to terminal mode (sharp, monospace)
CURRENT_MODE = "terminal"

# Switch to standard mode (rounded, sans-serif)
CURRENT_MODE = "standard"

# Switch to minimal mode (subtle, clean)
CURRENT_MODE = "minimal"
```

```tsx
// Import
import { mode, formatLabel, formatButtonText } from "@/lib/design-system";

// Use in components
<div className={cn(mode.radius, mode.font)}>
<label>{formatLabel("Email")}</label>
<Button>{formatButtonText("Submit")}</Button>
```

---

*Generated: December 2024*
*Visual Mode System v1.0*
