# Typography System

Comprehensive typography rules for the terminal-inspired design system.

---

## Quick Reference

| Topic | File |
|-------|------|
| Scale & Hierarchy | [`typography-scale.md`](typography-scale.md) |
| Terminal Patterns | [`typography-patterns.md`](typography-patterns.md) |

---

## Font Stack

| Category | Font | Tailwind |
|----------|------|----------|
| **Monospace** | JetBrains Mono | `font-mono` |
| **Sans-serif** | Geist Sans | `font-sans` |

---

## Type Scale Summary

| Token | Size | Use |
|-------|------|-----|
| `text-xs` | 12px | Labels, captions |
| `text-sm` | 14px | Body text |
| `text-base` | 16px | Default |
| `text-lg` | 18px | Card titles |
| `text-2xl` | 24px | Section headings |
| `text-4xl` | 36px | Page titles |

---

## Typography Hierarchy

| Level | Style |
|-------|-------|
| H1 | `text-4xl font-bold` |
| H2 | `text-2xl font-semibold` |
| H3 | `text-xl font-semibold` |
| Body | `text-sm font-mono text-muted-foreground` |
| Label | `text-xs font-mono text-muted-foreground` |

---

## Terminal Format Rules

- Button text: `> UPPERCASE_UNDERSCORES`
- Labels: `[LABEL]:`
- Status: `[TYPE]: Message`
- Card headers: `[ [0x00] TITLE ]`

---

## Checklist

- [ ] Page titles: `text-4xl font-bold`
- [ ] Section headings: `text-2xl font-semibold`
- [ ] Body text: `font-mono text-sm`
- [ ] Labels: `font-mono text-xs text-muted-foreground`
- [ ] Large headings scale responsively
- [ ] No font sizes smaller than 12px
