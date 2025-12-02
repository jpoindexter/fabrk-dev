# Design System Audit

Enterprise-grade audit framework for Fabrk design system compliance, WCAG 2.1 AA accessibility, UX heuristics, and inclusive design.

---

## Quick Start

Say **"run audit"** or **"start audit"** to begin a full design system audit.

For quick checks: **"quick audit"** or **"check compliance"**

---

## What This Audit Covers

### Core Standards

| Standard | Coverage | Priority |
|----------|----------|----------|
| **WCAG 2.1 AA** | Full Level AA compliance | CRITICAL |
| **Design System** | Terminal aesthetic, tokens | CRITICAL |
| **Nielsen's 10** | UX heuristics | HIGH |
| **Inclusive Design** | Microsoft's 4 principles | HIGH |

### Audit Categories

| Category | Severity |
|----------|----------|
| Accessibility | CRITICAL |
| Colors & Tokens | CRITICAL |
| Security | CRITICAL |
| Shapes & Typography | HIGH |
| Interaction & Responsive | HIGH |
| Spacing & Animation | MEDIUM |

---

## File Reference

### Core Audit Files

| File | Purpose |
|------|---------|
| [`rules.md`](rules.md) | Quick reference index |
| [`patterns.md`](patterns.md) | Regex patterns for violations |
| [`files.md`](files.md) | File priority order |
| [`output.md`](output.md) | Report format templates |
| [`protocol.md`](protocol.md) | Step-by-step execution |

### Design System Rules

| File | Contents |
|------|----------|
| [`accessibility.md`](accessibility.md) | WCAG, keyboard, ARIA |
| [`colors.md`](colors.md) | Design tokens, contrast |
| [`typography.md`](typography.md) | Font scale, terminal patterns |
| [`spacing.md`](spacing.md) | 8-point grid |
| [`interaction.md`](interaction.md) | Hover, focus, states |
| [`components.md`](components.md) | Form, button, card patterns |
| [`responsive.md`](responsive.md) | Mobile-first, breakpoints |
| [`animation.md`](animation.md) | Framer Motion, transitions |
| [`enterprise.md`](enterprise.md) | Error boundaries, Suspense |
| [`design-principles.md`](design-principles.md) | UX heuristics, cognitive |

---

## Quick Commands

```bash
npm run type-check   # TypeScript
npm run lint         # ESLint + accessibility
npm run scan:hex     # Hardcoded colors
npm run build        # Full build
```

---

## Severity Levels

| Level | Symbol | Action |
|-------|--------|--------|
| CRITICAL | 🔴 | Must fix immediately |
| HIGH | 🟠 | Must fix before release |
| MEDIUM | 🟡 | Should fix soon |
| LOW | 🔵 | Nice to fix |

---

## Compliance Score

```
Score = 100 - (Critical x 10) - (High x 3) - (Medium x 1) - (Low x 0.5)
```

| Score | Verdict |
|-------|---------|
| 95-100% | PASS |
| 80-94% | NEEDS_WORK |
| < 80% | FAIL |

---

## Terminal Design System Summary

```tsx
// Sharp corners (terminal aesthetic)
className="rounded-none"

// Monospace typography
className="font-mono text-xs"

// Button format
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>

// Label format
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>

// Status messages
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
```

---

## Pre-Commit Checklist

### Automated
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run scan:hex` passes

### Design System
- [ ] Buttons use `> ACTION` format
- [ ] Elements use `rounded-none`
- [ ] Colors use design tokens
- [ ] Images have `alt` text

### Accessibility
- [ ] Form inputs have labels
- [ ] Icon buttons have `aria-label`
- [ ] Focus indicators visible

---

## Common Fixes

| Problem | Fix |
|---------|-----|
| `bg-purple-500` | `bg-primary` |
| `text-white` | `text-primary-foreground` |
| `rounded-lg` | `rounded-none` |
| `shadow-lg` | `shadow-sm` |
| `outline-none` | `focus-visible:outline-ring` |
| `p-3` | `p-2` or `p-4` |
| `<img>` no alt | Add `alt="description"` |
| Icon button | Add `aria-label="action"` |

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| `CLAUDE.md` | Quick reference |
| `DESIGN_SYSTEM.md` | Full specification |
| `src/app/globals.css` | CSS variables |
