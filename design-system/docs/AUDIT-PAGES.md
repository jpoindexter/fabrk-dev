# AUDIT: Pages & Templates Analysis

> Generated: December 5, 2025 | Phase 1 Audit

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Pages | 256 |
| Using Templates | 166 (65%) |
| Custom/One-off | 90 (35%) |
| Template Compliance | 72% |

---

## 1. Page Inventory by Section

### 1.1 Documentation (180+ pages) ✓ STRONG

| Section | Pages | Template | Compliance |
|---------|-------|----------|------------|
| /docs/components/* | 100+ | ComponentShowcaseTemplate | 100% |
| /docs/features/* | 22 | FeatureGuideTemplate | 100% |
| /docs/tutorials/* | 8 | FeatureGuideTemplate | 100% |
| /docs/security/* | 6 | FeatureGuideTemplate | 100% |
| /docs/deployment/* | 3 | FeatureGuideTemplate | 100% |
| /docs/extras/* | 2 | FeatureGuideTemplate | 100% |
| /docs/architecture | 1 | Custom | 95% |
| /docs/launch/* | 1 | FeatureGuideTemplate | 100% |

**Assessment:** Documentation is the strongest section with near-perfect template adherence.

### 1.2 Marketing (5 pages) ✓ GOOD

| Page | Template | Status |
|------|----------|--------|
| / (home) | MarketingPageTemplate | ✓ |
| /about | MarketingPageTemplate | ✓ |
| /features | MarketingPageTemplate | ✓ |
| /pricing | MarketingPageTemplate | ✓ |
| /contact | MarketingPageTemplate | ✓ |

**Assessment:** All marketing pages use consistent template.

### 1.3 Dashboard (22 pages) ⚠️ WEAK

| Section | Pages | Template | Compliance |
|---------|-------|----------|------------|
| /dashboard | 1 | Custom | 20% |
| /account | 1 | Custom tabs | 30% |
| /profile | 1 | Custom | 25% |
| /settings/* | 2 | Custom | 30% |
| /billing/* | 2 | Custom | 35% |
| /admin/* | 8 | Custom | 15% |
| /organizations/* | 4 | Custom | 25% |
| /developer/* | 1 | Custom | 30% |
| /examples/* | 3 | Custom | 40% |

**Assessment:** Dashboard has NO shared template. Each page implements its own layout.

### 1.4 Legal (4 pages) ✓ CONSISTENT

| Page | Style | Status |
|------|-------|--------|
| /privacy | Terminal console | ✓ |
| /terms | Terminal console | ✓ |
| /cookies | Terminal console | ✓ |
| /refund | Terminal console | ✓ |

**Assessment:** Consistent terminal styling, but custom (not templated).

### 1.5 Templates Gallery (20+ pages) — BY DESIGN

| Section | Purpose |
|---------|---------|
| /templates/* | Copy-paste examples |

**Assessment:** Intentionally varied - these ARE the templates.

### 1.6 Other Pages (15 pages)

| Page | Type | Status |
|------|------|--------|
| /blog | Custom | Consistent |
| /blog/[slug] | Custom | Consistent |
| /component-showcase | Demo | N/A |
| /visual-test | Testing | N/A |
| /success | Purchase flow | Custom |
| /not-found (404) | Error | ✓ Terminal |
| /error | Error | ✓ Terminal |

---

## 2. Template Analysis

### 2.1 FeatureGuideTemplate (60+ pages)

**Usage:**
```tsx
<FeatureGuideTemplate
  code="[0x30]"
  category="Features"
  title="Stripe_Payments"
  description="..."
  overview="..."
  features={[...]}
  setup={[...]}
  usage={[...]}
  previous={{ title: "...", href: "..." }}
  next={{ title: "...", href: "..." }}
>
  {children}
</FeatureGuideTemplate>
```

**Props:**
| Prop | Type | Required | Purpose |
|------|------|----------|---------|
| code | string | ✓ | Hex identifier `[0xXX]` |
| category | string | ✓ | Section name |
| title | string | ✓ | UPPERCASE_SNAKE_CASE |
| description | string | ✓ | Brief description |
| overview | string | - | Extended description |
| features | array | - | Feature list with icons |
| setup | array | - | Setup steps |
| usage | array | - | Code examples |
| previous/next | object | - | Navigation |

**Compliance:** 100% - All feature/tutorial pages follow this exactly.

### 2.2 ComponentShowcaseTemplate (100+ pages)

**Usage:**
```tsx
<ComponentShowcaseTemplate
  code="[UI.01]"
  title="Button"
  description="..."
  importCode="import { Button } from '@/components/ui/button'"
  mainPreview={{ preview: <Component />, code: "..." }}
  variants={[...]}
  props={[...]}
  accessibility={[...]}
  previous={{ title: "...", href: "..." }}
  next={{ title: "...", href: "..." }}
/>
```

**Props:**
| Prop | Type | Required | Purpose |
|------|------|----------|---------|
| code | string | ✓ | Format `[UI.XX]` |
| title | string | ✓ | Title Case (!) |
| description | string | ✓ | Component description |
| importCode | string | ✓ | Import statement |
| mainPreview | object | ✓ | Live preview + code |
| variants | array | - | Component variations |
| props | array | - | API documentation |
| accessibility | array | - | WCAG compliance |

**Issue:** Uses Title Case while docs use SNAKE_CASE.

### 2.3 MarketingPageTemplate (5 pages)

**Usage:**
```tsx
<MarketingPageTemplate
  hero={<HeroSection />}
  sections={[
    { id: "features", component: <FeaturesSection /> },
    { id: "pricing", component: <PricingSection /> },
  ]}
  cta={<CTASection />}
/>
```

**Compliance:** 100% for marketing pages.

### 2.4 Missing Templates

| Section | Pages | Needs |
|---------|-------|-------|
| Dashboard | 22 | DashboardPageTemplate |
| Admin | 8 | AdminPanelTemplate |
| Blog | 2 | BlogTemplate |
| Auth | 4 | AuthPageTemplate |

---

## 3. Layout Hierarchy

### 3.1 Root Layout (`src/app/layout.tsx`)

```
<html>
  <body>
    <AnimatedBackground />
    <PostHogPageView />
    <CookieConsent />
    <main>{children}</main>
  </body>
</html>
```

### 3.2 Dashboard Layout (`/(dashboard)/layout.tsx`)

```
<div className="min-h-screen bg-background">
  <DashboardHeader />
  <main className="container mx-auto px-4 py-8">
    {children}
  </main>
</div>
```

### 3.3 Docs Layout (`/docs/layout.tsx`)

```
<DocsLayout>
  <DocsSidebar />
  <main>
    {children}
  </main>
  <TableOfContents />
</DocsLayout>
```

### 3.4 Legal Layout (`/(legal)/layout.tsx`)

```
<div className="min-h-screen bg-background">
  <SiteNavigation />
  {children}
  <Footer />
</div>
```

---

## 4. Spacing Patterns by Section

### 4.1 Current State (Inconsistent)

| Section | Container | Padding | Max Width |
|---------|-----------|---------|-----------|
| Marketing | `container mx-auto` | `px-6 sm:px-8 lg:px-12` | `max-w-7xl` |
| Dashboard | `container mx-auto` | `px-4 sm:px-6 lg:px-8` | `max-w-6xl` |
| Legal | `container mx-auto` | `px-6` | `max-w-4xl` |
| Docs | `container mx-auto` | varies | `max-w-7xl` |

### 4.2 Proposed Standard

| Section | Container | Padding | Max Width |
|---------|-----------|---------|-----------|
| Marketing | `container-lg` | `px-6` | `max-w-7xl` |
| Dashboard | `container-md` | `px-6` | `max-w-6xl` |
| Legal/Docs | `container-sm` | `px-6` | `max-w-4xl` |
| All | — | `py-20` | — |

---

## 5. Copy Style Analysis

### 5.1 By Section

| Section | Title Style | Example |
|---------|-------------|---------|
| Docs (features) | UPPERCASE_SNAKE_CASE | `Stripe_Payments` |
| Docs (components) | Title Case | `Button Component` |
| Marketing | Title Case | `Build Your SaaS` |
| Dashboard | Title Case | `Account Settings` |
| Legal | UPPERCASE_SNAKE_CASE | `PRIVACY_POLICY` |
| 404/Error | UPPERCASE_SNAKE_CASE | `ERROR_PAGE` |

### 5.2 Terminal Prefix Formats

| Location | Format | Example |
|----------|--------|---------|
| Legal pages | Double bracket | `[ [0x00] LEGAL ]` |
| Docs pages | Single code | `[0x30]` |
| Templates | With colon | `[TEMPLATE_GALLERY]:` |
| Components | UI prefix | `[UI.01]` |

### 5.3 Recommendation

**Standardize to:**
- **Terminal UI:** `[ [0xXX] TITLE ]`
- **Component codes:** `[UI.XX]`
- **Feature codes:** `[0xXX]`
- **All titles:** UPPERCASE_SNAKE_CASE (even components)

---

## 6. Page-Level Issues

### 6.1 Dashboard Pages (Needs DashboardPageTemplate)

**Current pattern (inconsistent):**
```tsx
// /dashboard/page.tsx
<div className="container mx-auto max-w-6xl px-6 py-8">
  <h1>Dashboard</h1>
  <div className="grid gap-6">
    <Card>...</Card>
  </div>
</div>

// /account/page.tsx
<div className="container mx-auto max-w-6xl px-6 py-8">
  <Tabs>
    <TabsList>...</TabsList>
    <TabsContent>
      <Card>...</Card>
    </TabsContent>
  </Tabs>
</div>
```

**Proposed template:**
```tsx
<DashboardPageTemplate
  title="Dashboard"
  description="Overview of your account"
  tabs={[...]} // optional
>
  {children}
</DashboardPageTemplate>
```

### 6.2 Admin Pages (Needs AdminPanelTemplate)

**Current:** Each admin page builds its own layout with cards, tables, charts.

**Proposed:**
```tsx
<AdminPanelTemplate
  title="User Management"
  code="[0xA0]"
  stats={[...]}
  actions={[...]}
>
  <DataTable />
</AdminPanelTemplate>
```

### 6.3 Auth Pages (Needs AuthPageTemplate)

**Current:** Uses template gallery examples directly.

**Proposed:**
```tsx
<AuthPageTemplate
  title="Sign In"
  description="Welcome back"
  socialProviders={["google", "github"]}
>
  <SignInForm />
</AuthPageTemplate>
```

---

## 7. Template Compliance Matrix

| Section | Pages | Template? | Compliance | Priority |
|---------|-------|-----------|------------|----------|
| /docs/components | 100+ | ComponentShowcase | 100% | — |
| /docs/features | 22 | FeatureGuide | 100% | — |
| /docs/tutorials | 8 | FeatureGuide | 100% | — |
| /docs/security | 6 | FeatureGuide | 100% | — |
| /docs/deployment | 3 | FeatureGuide | 100% | — |
| Marketing | 5 | MarketingPage | 100% | — |
| Legal | 4 | Custom (consistent) | 95% | Low |
| Dashboard | 22 | **NONE** | 20% | **HIGH** |
| Admin | 8 | **NONE** | 15% | **HIGH** |
| Blog | 2 | Custom | 50% | Medium |
| Auth | 4 | Templates gallery | 40% | Medium |
| Error pages | 2 | Custom (consistent) | 90% | Low |

---

## 8. Recommendations

### 8.1 Create New Templates (Priority)

1. **DashboardPageTemplate** (P0)
   - Standardizes 22 dashboard pages
   - Includes title, breadcrumb, tabs support
   - Impact: High

2. **AdminPanelTemplate** (P0)
   - Standardizes 8 admin pages
   - Includes stats cards, data tables, charts
   - Impact: High

3. **AuthPageTemplate** (P1)
   - Standardizes 4 auth pages
   - Includes social providers, branding
   - Impact: Medium

4. **BlogTemplate** (P2)
   - Standardizes listing + article
   - Impact: Low (2 pages)

### 8.2 Fix Copy Style Inconsistencies

1. **Component docs:** Change Title Case → SNAKE_CASE
2. **Document terminal prefix standard**
3. **Create COPY_STYLE_GUIDE.md**

### 8.3 Standardize Spacing

1. **Define container sizes:** sm, md, lg
2. **Standardize section padding:** py-20
3. **Apply consistently across all sections**

---

## 9. Migration Plan

### Phase 1: Create Templates
1. Build DashboardPageTemplate
2. Build AdminPanelTemplate
3. Test with 2-3 pages each

### Phase 2: Migrate Dashboard
1. Migrate /dashboard
2. Migrate /account, /profile
3. Migrate /settings/*
4. Migrate /billing/*

### Phase 3: Migrate Admin
1. Migrate /admin (overview)
2. Migrate /admin/users
3. Migrate remaining admin pages

### Phase 4: Polish
1. Update component docs copy style
2. Standardize terminal prefixes
3. Final spacing audit

---

## 10. Summary

**Current State:**
- Documentation: Excellent (100% templated)
- Marketing: Excellent (100% templated)
- Dashboard: Poor (no template)
- Admin: Poor (no template)

**Required Actions:**
1. Create DashboardPageTemplate
2. Create AdminPanelTemplate
3. Migrate 30 pages to new templates
4. Standardize copy style across component docs

**Expected Outcome:**
- Template compliance: 72% → 95%
- Consistency score: Medium → High
- Maintenance effort: Reduced by ~60%
