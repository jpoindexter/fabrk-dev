# Files: Exceptions & Lower Priority

Lower priority files and exception registry.

---

## Priority 7: Dashboard (MEDIUM)

```
src/app/(dashboard)/**/page.tsx
  ├── dashboard/
  ├── settings/
  ├── account/
  ├── billing/
  └── profile/

src/components/dashboard/*.tsx
  ├── stats-cards.tsx
  ├── activity-feed.tsx
  ├── user-nav.tsx
  └── sidebar.tsx
```

### Audit Focus
- [ ] Data loading states
- [ ] Error boundaries
- [ ] Skeleton loaders
- [ ] Accessible tables

---

## Priority 8: Authentication (MEDIUM)

```
src/app/(auth)/**/page.tsx
  ├── login/
  ├── register/
  ├── forgot-password/
  └── verify-email/

src/components/auth/*.tsx
```

### Audit Focus
- [ ] Form validation
- [ ] Error messages accessible
- [ ] Password visibility toggle
- [ ] CSRF protection

---

## Priority 9: API Routes (MEDIUM)

```
src/app/api/**/*.ts
src/lib/api/*.ts
```

### Audit Focus
- [ ] Error handling consistent
- [ ] Response types defined
- [ ] Input validation

---

## Priority 10-13: Lower Priority

```
# Error/Loading Pages (MEDIUM)
src/app/error.tsx
src/app/not-found.tsx
src/app/loading.tsx

# Shared Components (LOW)
src/components/shared/*.tsx

# Hooks & Utilities (LOW)
src/hooks/*.ts
src/lib/*.ts
src/types/*.ts

# Test Files (LOW)
src/**/*.test.ts
tests/e2e/**/*.spec.ts
```

---

## Exceptions Registry

### Allowed Exceptions

| Exception | Where | Reason |
|-----------|-------|--------|
| `rounded-full` | Traffic light dots | Terminal chrome |
| `rounded-md` | Landing CTAs | Marketing emphasis |
| `text-sm` without mono | Legal pages | Readability |
| `console.error` | Error boundaries | Error reporting |
| `shadow-sm` | Subtle elevation | Design approved |

### NEVER Allowed (No Exceptions)

| Pattern | Reason |
|---------|--------|
| `shadow-md/lg/xl` | Violates terminal aesthetic |
| Hardcoded hex colors | Breaks theme switching |
| `bg-white`, `bg-black` | Not theme-aware |
| `@ts-ignore` without comment | Hidden type issues |
| `eval()`, `new Function()` | Security risk |
| Direct `process.env` access | Bypasses validation |

---

## File Size Guidelines

```bash
# Check file sizes
find src -name "*.tsx" -exec wc -l {} + | sort -n | tail -20

# Files needing attention
# > 400 lines = CRITICAL (must split)
# > 300 lines = HIGH (should split)
# > 200 lines = MEDIUM (review)
```

---

## Quick Audit by Tier

```bash
# P1 - Foundation (verify only)
ls src/components/ui/*.tsx | wc -l

# P2 - Config
cat src/config.js src/lib/env.ts

# P3 - Layouts
find src/app -name "layout.tsx"

# P4 - Public
ls src/app/page.tsx src/components/landing/

# P5 - Templates
find src/app/templates -name "page.tsx"

# P6 - Docs
find src/app/docs -name "page.tsx" | wc -l
```
