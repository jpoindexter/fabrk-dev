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
| **Design System** | Terminal aesthetic, design tokens | CRITICAL |
| **Nielsen's 10** | UX heuristics | HIGH |
| **Inclusive Design** | Microsoft's 4 principles | HIGH |
| **Visual Design** | Gestalt, hierarchy, typography | HIGH |
| **Security** | OWASP, env validation | CRITICAL |

### Audit Categories

| Category | Checks | Severity |
|----------|--------|----------|
| **Accessibility** | WCAG 2.1 AA, focus, ARIA, contrast, keyboard | CRITICAL |
| **Colors** | Design tokens, theme switching, no hardcoded hex | CRITICAL |
| **Shapes** | rounded-none, shadows, borders | HIGH |
| **Typography** | Font stack, size scale, terminal format | HIGH |
| **Spacing** | 8-point grid, padding, margins, gaps | MEDIUM |
| **Interaction** | Hover, focus, active, disabled, loading | HIGH |
| **Responsive** | Mobile-first, breakpoints, reflow | HIGH |
| **Security** | Env vars, XSS, secrets | CRITICAL |
| **Code Quality** | Console, TODOs, TypeScript | MEDIUM |
| **Documentation** | Templates, DocsCard, previews | HIGH |
| **Enterprise** | Error boundaries, loading states | HIGH |

---

## File Reference

| File | Purpose | When to Use |
|------|---------|-------------|
| [`patterns.md`](patterns.md) | Regex patterns for violations | Quick searches, automated scans |
| [`rules.md`](rules.md) | What constitutes compliance | Understanding requirements |
| [`files.md`](files.md) | File priority order | Knowing what to audit first |
| [`output.md`](output.md) | Report format templates | Generating audit reports |
| [`protocol.md`](protocol.md) | Step-by-step execution | Running a full audit |

---

## Quick Commands

### Automated Checks

```bash
npm run type-check   # TypeScript
npm run lint         # ESLint + accessibility
npm run scan:hex     # Hardcoded colors
npm run build        # Full build
```

### Manual Scans

```bash
# Critical: Hardcoded colors
grep -rE "(bg|text|border)-(red|blue|gray|purple)-\d+" src/ --include="*.tsx"

# Critical: Banned shadows
grep -rE "shadow-(md|lg|xl|2xl)" src/ --include="*.tsx"

# High: Rounded corners
grep -rE "rounded-(sm|md|lg|xl)" src/ --include="*.tsx"

# Medium: Code quality
grep -rE "console\.(log|warn|error)|TODO|FIXME" src/ --include="*.tsx"
```

---

## Severity Levels

| Level | Symbol | Action | Example |
|-------|--------|--------|---------|
| CRITICAL | 🔴 | Must fix immediately | Hardcoded colors, security |
| HIGH | 🟠 | Must fix before release | Rounded corners, a11y |
| MEDIUM | 🟡 | Should fix soon | Code quality, file size |
| LOW | 🔵 | Nice to fix | Minor optimizations |

---

## Compliance Score

```
Score = 100 - (Critical × 10) - (High × 3) - (Medium × 1) - (Low × 0.5)
```

| Score | Verdict | Action |
|-------|---------|--------|
| 95-100% | PASS | Ship it |
| 80-94% | NEEDS_WORK | Fix High issues |
| < 80% | FAIL | Block release |

---

## Terminal Design System Summary

### Required on ALL elements:

```tsx
className="rounded-none"        // Sharp corners (terminal aesthetic)
className="font-mono text-xs"   // Monospace typography
```

### Button Format:

```tsx
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
```

### Label Format:

```tsx
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>
```

### Status Messages:

```tsx
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>
```

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| `CLAUDE.md` | Quick reference for Claude Code |
| `DESIGN_SYSTEM.md` | Full design system specification |
| `src/app/globals.css` | CSS variables and tokens |

---

## WCAG 2.1 AA Quick Reference

### Perceivable

| Guideline | Requirement | Check |
|-----------|-------------|-------|
| 1.1.1 Non-text | All images have alt text | ☐ |
| 1.3.1 Info | Proper labels, headings, landmarks | ☐ |
| 1.4.3 Contrast | 4.5:1 text, 3:1 UI | ☐ |
| 1.4.4 Resize | Text scales to 200% | ☐ |
| 1.4.10 Reflow | Works at 320px width | ☐ |

### Operable

| Guideline | Requirement | Check |
|-----------|-------------|-------|
| 2.1.1 Keyboard | All functions keyboard accessible | ☐ |
| 2.4.1 Bypass | Skip links present | ☐ |
| 2.4.3 Focus Order | Logical tab order | ☐ |
| 2.4.7 Focus Visible | Visible focus indicators | ☐ |

### Understandable

| Guideline | Requirement | Check |
|-----------|-------------|-------|
| 3.1.1 Language | Page lang attribute | ☐ |
| 3.3.1 Error ID | Errors identified in text | ☐ |
| 3.3.2 Labels | Form inputs have labels | ☐ |

---

## UX Heuristics Quick Check

| # | Heuristic | Question |
|---|-----------|----------|
| 1 | System Status | Are loading/progress states visible? |
| 2 | Real World | Is language natural and familiar? |
| 3 | User Control | Can users cancel, undo, go back? |
| 4 | Consistency | Do similar things look/work the same? |
| 5 | Error Prevention | Are errors prevented before they occur? |
| 6 | Recognition | Are options visible vs. memorized? |
| 7 | Flexibility | Are there shortcuts for experts? |
| 8 | Minimalist | Is only essential info shown? |
| 9 | Error Recovery | Are error messages helpful? |
| 10 | Help | Is help available when needed? |

---

## Design Token Quick Reference

### Colors (ONLY these allowed)

```tsx
// Backgrounds
bg-background, bg-card, bg-muted, bg-primary, bg-secondary
bg-destructive, bg-success, bg-warning, bg-info

// Text
text-foreground, text-muted-foreground, text-primary
text-destructive, text-success, text-warning

// Borders
border-border, border-input, border-primary
```

### Spacing (8-Point Grid)

```tsx
// Allowed: p-1, p-2, p-4, p-6, p-8, p-12, p-16
// Avoid: p-3, p-5, p-7, p-9, p-11
```

---

## Pre-Commit Checklist

### Automated

- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run scan:hex` passes

### Design System

- [ ] All buttons use `> ACTION` format
- [ ] All elements use `rounded-none`
- [ ] All colors use design tokens
- [ ] All images have `alt` text
- [ ] DocsCard has `title` prop

### Accessibility

- [ ] Form inputs have labels
- [ ] Icon buttons have `aria-label`
- [ ] Focus indicators visible
- [ ] Tab navigation works

### UX

- [ ] Loading states present
- [ ] Hover states have transitions
- [ ] Error messages are helpful

---

## Pre-Release Checklist

### Full Audit

- [ ] Run `run audit` command
- [ ] Compliance score ≥ 95%
- [ ] Zero Critical issues

### Accessibility

- [ ] Lighthouse accessibility ≥ 90
- [ ] Keyboard navigation complete
- [ ] Screen reader test

### Responsive

- [ ] Mobile 320px
- [ ] Tablet 768px
- [ ] Desktop 1024px

### Themes

- [ ] Light theme works
- [ ] Dark theme works

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
