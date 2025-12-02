# Design System Audit

Enterprise-grade audit framework for Fabrk design system compliance.

---

## Quick Start

Say **"run audit"** or **"start audit"** to begin a full design system audit.

For quick checks: **"quick audit"** or **"check compliance"**

---

## What This Audit Covers

| Category | Checks | Severity |
|----------|--------|----------|
| **Design System** | Colors, shapes, typography, shadows | CRITICAL/HIGH |
| **Accessibility** | WCAG 2.1 AA, focus, ARIA, contrast | CRITICAL |
| **Security** | Env vars, XSS, secrets | CRITICAL |
| **Documentation** | Templates, DocsCard, previews | HIGH |
| **Code Quality** | Console, TODOs, TypeScript | MEDIUM |
| **Modularity** | File size, composition, structure | MEDIUM |
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

## Audit Checklist (Quick Reference)

### Before Every Commit

- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run scan:hex` passes
- [ ] No `console.log` statements
- [ ] All buttons use `> ACTION` format
- [ ] All elements use `rounded-none`
- [ ] All colors use design tokens
- [ ] DocsCard has `title` prop

### Before Release

- [ ] Full audit with `run audit`
- [ ] Compliance score ≥ 95%
- [ ] No Critical issues
- [ ] Accessibility check passed
- [ ] Mobile responsive verified
- [ ] Theme switching works
