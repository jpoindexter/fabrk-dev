# Files: Priority Tiers

Complete file inventory with priority order for design system compliance.

---

## Priority Tiers Overview

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
src/components/ui/*.tsx       # Base UI (LOCKED)
src/app/globals.css           # Design tokens source
src/lib/utils.ts              # cn() utility
tailwind.config.ts            # Tailwind config
```

### Audit Focus
- [ ] Design tokens correctly defined
- [ ] cn() utility exports properly
- [ ] Tailwind config matches design system

---

## Priority 2: Configuration (CRITICAL)

```
src/config.js                 # Central app config
src/lib/env.ts                # Environment validation
src/lib/auth.ts               # Auth configuration
src/middleware.ts             # Request middleware
next.config.js                # Next.js config
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
src/components/landing/*.tsx
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
- [ ] Performance optimized

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
  └── empty-states/
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
src/components/docs/*.tsx
  ├── ComponentShowcaseTemplate.tsx
  ├── FeatureGuideTemplate.tsx
  ├── DocsCard.tsx
  ├── DocsPreview.tsx
  └── DocsNavigation.tsx
```

### Audit Focus
- [ ] All pages use templates
- [ ] DocsCard has title prop
- [ ] Previews are direct components
- [ ] Code examples accurate
