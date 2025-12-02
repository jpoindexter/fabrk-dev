# Files to Audit

Complete file inventory with priority order for design system compliance.

---

## Quick Reference

| Topic | File |
|-------|------|
| Priority Tiers (P1-P6) | [`files-priority.md`](files-priority.md) |
| Lower Priority & Exceptions | [`files-exceptions.md`](files-exceptions.md) |

---

## Priority Tiers

| Tier | Impact | Files |
|------|--------|-------|
| P1 | CRITICAL | Foundation, Config |
| P2 | HIGH | Layouts, Public-facing |
| P3 | HIGH | Templates, Docs |
| P4 | MEDIUM | Dashboard, Features |
| P5 | MEDIUM | Auth, API |
| P6 | LOW | Utilities, Types |

---

## Key Files

### Foundation (LOCKED)

```
src/components/ui/*.tsx
src/app/globals.css
tailwind.config.ts
```

### High Priority

```
src/app/page.tsx
src/app/templates/**/page.tsx
src/app/docs/**/page.tsx
src/components/landing/*.tsx
```

---

## NEVER Allowed

| Pattern | Reason |
|---------|--------|
| `shadow-md/lg/xl` | Terminal aesthetic |
| Hardcoded hex | Theme breaking |
| `bg-white/black` | Not theme-aware |
| `eval()` | Security |

---

## File Size Limits

- > 400 lines = CRITICAL (must split)
- > 300 lines = HIGH (should split)
- > 200 lines = MEDIUM (review)
