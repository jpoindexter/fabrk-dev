# Audit Output: Issue Tables

Templates for categorized issue tables.

---

## Issue Card Format

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ISSUE #001                                        [CRITICAL]   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ File:      src/components/landing/hero.tsx                     ┃
┃ Line:      47-49                                               ┃
┃ Category:  COLOR                                               ┃
┃ Rule:      No hardcoded colors                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ CURRENT:                                                       ┃
┃   <div className="bg-purple-500 text-white">                   ┃
┃                                                                ┃
┃ REQUIRED:                                                      ┃
┃   <div className="bg-primary text-primary-foreground">        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Color Token Violations

| # | Severity | File | Line | Hardcoded | Token Replacement |
|---|----------|------|------|-----------|-------------------|
| 1 | 🔴 CRIT | hero.tsx | 47 | `bg-purple-500` | `bg-primary` |
| 2 | 🔴 CRIT | hero.tsx | 48 | `text-white` | `text-primary-foreground` |

---

## Rounded Corner Violations

| # | Severity | File | Line | Current | Fix |
|---|----------|------|------|---------|-----|
| 1 | 🟠 HIGH | card.tsx | 23 | `rounded-lg` | `rounded-none` |
| 2 | 🟠 HIGH | button.tsx | 15 | `rounded-md` | `rounded-none` |

---

## Shadow Violations

| # | Severity | File | Line | Current | Fix |
|---|----------|------|------|---------|-----|
| 1 | 🔴 CRIT | dialog.tsx | 34 | `shadow-lg` | `shadow-sm` |

---

## Accessibility Issues

| # | Severity | File | Line | WCAG | Issue | Fix |
|---|----------|------|------|------|-------|-----|
| 1 | 🔴 CRIT | icon.tsx | 15 | 1.1.1 | Missing `aria-label` | Add `aria-label` |
| 2 | 🔴 CRIT | input.tsx | 22 | 1.3.1 | Missing label | Add `<Label>` |
| 3 | 🟠 HIGH | nav.tsx | 45 | 2.4.7 | `outline-none` | Add `focus-visible` |

---

## Security Issues

| # | Severity | File | Line | Issue | Fix |
|---|----------|------|------|-------|-----|
| 1 | 🔴 CRIT | api.ts | 34 | `process.env` | Use `env.server` |
| 2 | 🔴 CRIT | html.tsx | 12 | `dangerouslySetInnerHTML` | Add DOMPurify |

---

## Code Quality Issues

| # | Severity | File | Line | Type | Issue |
|---|----------|------|------|------|-------|
| 1 | 🟡 MED | utils.ts | 45 | Debug | `console.log()` |
| 2 | 🟡 MED | form.tsx | 12 | TODO | `// TODO: fix` |
| 3 | 🟡 MED | types.ts | 89 | TypeScript | `: any` |

---

## File Size Violations

| # | Severity | File | Lines | Action |
|---|----------|------|-------|--------|
| 1 | 🔴 CRIT | hero.tsx | 456 | MUST split immediately |
| 2 | 🟠 HIGH | dashboard.tsx | 342 | MUST split |
| 3 | 🟡 MED | settings.tsx | 245 | Review for split |

---

## Spacing Violations

| # | Severity | File | Line | Current | Fix |
|---|----------|------|------|---------|-----|
| 1 | 🟡 MED | hero.tsx | 23 | `p-3` | `p-2` or `p-4` |
| 2 | 🟡 MED | card.tsx | 45 | `gap-5` | `gap-4` or `gap-6` |

**Rule:** Use 8-point grid (p-1, p-2, p-4, p-6, p-8, p-12, p-16)

---

## Animation Violations

| # | Severity | File | Line | Issue | Fix |
|---|----------|------|------|-------|-----|
| 1 | 🟡 MED | button.tsx | 15 | Missing transition | Add `transition-colors` |
| 2 | 🟠 HIGH | modal.tsx | 45 | No reduced-motion | Add `motion-reduce:` |

---

## Responsive Violations

| # | Severity | File | Line | Issue | Fix |
|---|----------|------|------|-------|-----|
| 1 | 🟠 HIGH | grid.tsx | 12 | `grid-cols-4` | Add responsive variants |
| 2 | 🟠 HIGH | hero.tsx | 34 | `text-5xl` | Add `md:text-4xl` |
