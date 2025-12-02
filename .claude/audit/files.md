# Files to Audit

Priority order for design system audit.

## Priority 1: Foundation
```
src/components/ui/*.tsx      # Base UI (LOCKED - check only)
src/app/globals.css          # Design tokens
src/lib/utils.ts             # cn() utility
```

## Priority 2: Configuration
```
src/config.js                # Central config
src/lib/env.ts               # Environment validation
src/lib/auth.ts              # Auth config
```

## Priority 3: Layouts
```
src/app/layout.tsx           # Root layout
src/app/(dashboard)/layout.tsx
src/app/docs/layout.tsx
```

## Priority 4: Public-Facing
```
src/app/page.tsx             # Landing page
src/components/landing/*.tsx
```

## Priority 5: Templates
```
src/app/templates/**/page.tsx
```

## Priority 6: Documentation
```
src/app/docs/**/page.tsx
src/components/docs/*.tsx
```

## Priority 7: Dashboard
```
src/app/(dashboard)/**/page.tsx
src/components/dashboard/*.tsx
```

## Priority 8: Auth & Account
```
src/app/(auth)/**/page.tsx
src/components/auth/*.tsx
src/components/account/*.tsx
```

## Priority 9: API Routes
```
src/app/api/**/*.ts
src/middleware.ts
```

## Priority 10: Error Pages
```
src/app/error.tsx
src/app/not-found.tsx
src/app/loading.tsx
```

## Exceptions Registry

| Exception | Where | Reason |
|-----------|-------|--------|
| `rounded-full` | Traffic light dots | Terminal chrome |
| `rounded-md` | Base UI variants | Shadcn default |
| `rounded-md` | CTA buttons | Marketing emphasis |
| `text-sm` no mono | Legal pages | Readability |
| `console.error` | Error boundaries | Error reporting |
| **shadow-md** | **NEVER** | **NO EXCEPTIONS** |
| **Hardcoded colors** | **NEVER** | **NO EXCEPTIONS** |
