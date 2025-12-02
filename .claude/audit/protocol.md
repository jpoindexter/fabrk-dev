# Audit Execution Protocol

Enterprise-grade process for design system, accessibility, and UX heuristics audit.

---

## Quick Reference

| Phase | File | Duration |
|-------|------|----------|
| 1-2 | [`protocol-preflight.md`](protocol-preflight.md) | 15 min |
| 3-5 | [`protocol-manual.md`](protocol-manual.md) | 50 min |
| 6-9 | [`protocol-report.md`](protocol-report.md) | 20 min |

---

## Audit Scope

| Domain | Standards | Priority |
|--------|-----------|----------|
| **Accessibility** | WCAG 2.1 Level AA | CRITICAL |
| **Design System** | Terminal aesthetic, tokens | CRITICAL |
| **Security** | OWASP, env validation, XSS | CRITICAL |
| **SEO/Metadata** | Open Graph, JSON-LD | HIGH |
| **React Patterns** | Hooks, keys, state | HIGH |
| **Next.js Patterns** | Server/Client, hydration | HIGH |
| **Performance** | Core Web Vitals | HIGH |
| **Testing** | Coverage thresholds | MEDIUM |
| **Component API** | Prop consistency | MEDIUM |

---

## Phase Overview

| Phase | Name | Action |
|-------|------|--------|
| 1 | Pre-Flight | Verify environment |
| 2 | Automated Scan | Run tooling |
| 3 | WCAG Audit | Accessibility review |
| 4 | Design System | Visual/UX review |
| 5 | Manual Review | Deep inspection |
| 6 | Report | Generate findings |
| 7 | Present | Show to user |
| 8 | Await Approval | User decision |
| 9 | Fix & Commit | Apply changes |

---

## Quick Commands

```bash
# Pre-flight
npm run type-check && npm run lint && npm run scan:hex && npm run build

# Critical scans
grep -rE "shadow-(md|lg|xl|2xl)" src/ --include="*.tsx"
grep -rE "rounded-(sm|md|lg|xl)" src/ --include="*.tsx"

# File size
find src -name "*.tsx" -exec wc -l {} + | sort -n | awk '$1 > 300 {print}'
```

---

## Compliance Score

```
Score = 100 - (Critical × 10) - (High × 3) - (Medium × 1) - (Low × 0.5)
```

| Score | Verdict |
|-------|---------|
| 95-100 | PASS |
| 80-94 | NEEDS_WORK |
| < 80 | FAIL |

---

## Terminal Styling Checklist

```tsx
// Every form element
className="rounded-none font-mono text-xs"

// Every label
className="font-mono text-xs text-muted-foreground"
// Format: [LABEL]:

// Every button
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>

// Every status message
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
```

---

## Common Fixes

| Pattern | Find | Replace |
|---------|------|---------|
| Rounded corners | `rounded-lg` | `rounded-none` |
| Hard shadows | `shadow-lg` | `shadow-sm` |
| Gray colors | `bg-gray-100` | `bg-muted` |
| White bg | `bg-white` | `bg-background` |
| Black text | `text-black` | `text-foreground` |
| Direct env | `process.env.X` | `env.server.X` |

---

## Audit Frequency

| Event | Full Audit | Quick Check |
|-------|------------|-------------|
| Before release | ✅ Required | - |
| After major feature | ✅ Required | - |
| Weekly maintenance | - | ✅ |
| After design system change | ✅ Required | - |
