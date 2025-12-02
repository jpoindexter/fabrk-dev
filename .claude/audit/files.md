# Files to Audit

Complete file inventory with priority order for design system compliance.

---

## Priority Tiers

| Tier | Impact | Files | Audit Frequency |
|------|--------|-------|-----------------|
| P1 | CRITICAL | Foundation, Config | Every release |
| P2 | HIGH | Layouts, Public-facing | Every release |
| P3 | HIGH | Templates, Docs | Every release |
| P4 | MEDIUM | Dashboard, Features | Major releases |
| P5 | MEDIUM | Auth, API | Major releases |
| P6 | LOW | Utilities, Types | Quarterly |

---

## Priority 1: Foundation (CRITICAL)

**DO NOT MODIFY** - Audit for reference only.

```
src/components/ui/*.tsx       # Base UI (LOCKED - verify compliance only)
src/app/globals.css           # Design tokens source of truth
src/lib/utils.ts              # cn() utility
tailwind.config.ts            # Tailwind configuration
```

### Audit Focus
- [ ] Design tokens correctly defined
- [ ] cn() utility exports properly
- [ ] Tailwind config matches design system

---

## Priority 2: Configuration (CRITICAL)

```
src/config.js                 # Central app configuration
src/lib/env.ts                # Environment validation
src/lib/auth.ts               # Auth configuration
src/middleware.ts             # Request middleware
next.config.js                # Next.js configuration
```

### Audit Focus
- [ ] No hardcoded secrets
- [ ] Environment variables validated
- [ ] Security headers configured

---

## Priority 3: Layouts (HIGH)

```
src/app/layout.tsx            # Root layout
src/app/(dashboard)/layout.tsx
src/app/(auth)/layout.tsx
src/app/docs/layout.tsx
src/app/templates/layout.tsx
src/app/(legal)/layout.tsx
```

### Audit Focus
- [ ] Font loading correct
- [ ] Meta tags complete
- [ ] Theme provider wraps content
- [ ] Skip links present

---

## Priority 4: Public-Facing Pages (HIGH)

```
src/app/page.tsx              # Landing page
src/components/landing/*.tsx  # Landing sections
  ├── hero.tsx
  ├── features.tsx
  ├── pricing.tsx
  ├── testimonials.tsx
  ├── faq.tsx
  └── footer.tsx
```

### Audit Focus
- [ ] Terminal aesthetic consistent
- [ ] All colors use tokens
- [ ] Buttons use > PREFIX format
- [ ] Images have alt text
- [ ] Performance optimized (LCP, FID)

---

## Priority 5: Templates (HIGH)

```
src/app/templates/**/page.tsx
  ├── analytics-dashboard/
  ├── billing-dashboard/
  ├── settings-page/
  ├── security-privacy/
  ├── profile/
  ├── onboarding/
  ├── error-pages/
  ├── empty-states/
  └── ... (all template categories)
```

### Audit Focus
- [ ] Copy-paste ready
- [ ] Terminal styling complete
- [ ] No wrapper divs in examples
- [ ] Responsive at all breakpoints

---

## Priority 6: Documentation (HIGH)

```
src/app/docs/**/page.tsx
  ├── components/**/*.tsx     # Component docs
  ├── features/**/*.tsx       # Feature guides
  ├── getting-started/**/*.tsx
  ├── tutorials/**/*.tsx
  └── security/**/*.tsx

src/components/docs/*.tsx     # Doc templates
  ├── ComponentShowcaseTemplate.tsx
  ├── FeatureGuideTemplate.tsx
  ├── TutorialTemplate.tsx
  ├── GettingStartedTemplate.tsx
  ├── DocsCard.tsx
  ├── DocsPreview.tsx
  └── DocsNavigation.tsx
```

### Audit Focus
- [ ] All pages use templates
- [ ] DocsCard has title prop
- [ ] Previews are direct components
- [ ] Code examples accurate
- [ ] Navigation links valid

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
  ├── reset-password/
  └── verify-email/

src/components/auth/*.tsx
  ├── login-form.tsx
  ├── register-form.tsx
  └── social-buttons.tsx
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
  ├── auth/[...nextauth]/route.ts
  ├── webhooks/polar/route.ts
  ├── user/**/*.ts
  └── ...

src/lib/api/*.ts              # API utilities
```

### Audit Focus
- [ ] Error handling consistent
- [ ] Response types defined
- [ ] Rate limiting (if applicable)
- [ ] Input validation

---

## Priority 10: Error & Loading Pages (MEDIUM)

```
src/app/error.tsx             # Global error
src/app/not-found.tsx         # Global 404
src/app/loading.tsx           # Global loading
src/app/(dashboard)/error.tsx # Dashboard error
src/app/(dashboard)/loading.tsx
src/app/docs/error.tsx
src/app/docs/loading.tsx
```

### Audit Focus
- [ ] Consistent styling
- [ ] Recovery options clear
- [ ] Terminal aesthetic maintained
- [ ] Accessible

---

## Priority 11: Shared Components (LOW)

```
src/components/shared/*.tsx
  ├── theme-toggle.tsx
  ├── mobile-nav.tsx
  ├── search-command.tsx
  └── ...
```

---

## Priority 12: Hooks & Utilities (LOW)

```
src/hooks/*.ts
  ├── use-auth.ts
  ├── use-media-query.ts
  ├── use-mounted.ts
  └── ...

src/lib/*.ts
  ├── utils.ts
  ├── validations.ts
  └── ...

src/types/*.ts
  ├── index.ts
  └── ...
```

### Audit Focus
- [ ] TypeScript types complete
- [ ] No `any` types
- [ ] Proper exports

---

## Priority 13: Test Files (LOW)

```
src/**/*.test.ts
src/**/*.test.tsx
tests/e2e/**/*.spec.ts
```

### Audit Focus
- [ ] Coverage adequate
- [ ] Tests passing
- [ ] No skipped tests

---

## Exceptions Registry

### Allowed Exceptions

| Exception | Where | Reason | Approval |
|-----------|-------|--------|----------|
| `rounded-full` | Traffic light dots | Terminal chrome aesthetic | Design system |
| `rounded-md` | CTA buttons in landing | Marketing emphasis | Product decision |
| `text-sm` without mono | Legal pages (`/terms`, `/privacy`) | Readability requirement | Legal team |
| `console.error` | Error boundaries only | Error reporting | Engineering |
| `shadow-sm` | Subtle card elevation | Design system approved | Design system |

### NEVER Allowed (No Exceptions)

| Pattern | Reason |
|---------|--------|
| `shadow-md`, `shadow-lg`, `shadow-xl` | Violates terminal aesthetic |
| Hardcoded hex colors | Breaks theme switching |
| `bg-white`, `bg-black` | Not theme-aware |
| `@ts-ignore` without comment | Hidden type issues |
| `eval()` or `new Function()` | Security risk |
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
