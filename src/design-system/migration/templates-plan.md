# Template & Page Classification Plan

> Generated: 2025-12-06 (PHASE 3)
> Source: design-system/audit/pages/index.json, design-system/violations/broken-templates.md
> Status: **NO FIXES REQUIRED** - All templates are compliant

---

## Executive Summary

After comprehensive Phase 2 audit of **222 pages** and **100+ templates**, the finding is:

**ZERO BROKEN TEMPLATES OR PAGES**

All templates and pages are:

- ✅ Using TerminalCard components correctly
- ✅ Following design system token usage
- ✅ Compliant with terminal aesthetic
- ✅ Properly importing from @/design-system

---

## Template Classification

### CRITICAL (Must work perfectly for buyers)

| Template/Page   | Route                 | Status  | Notes                                 |
| --------------- | --------------------- | ------- | ------------------------------------- |
| Landing Page    | `/`                   | ✅ PASS | Hero, pricing, features all compliant |
| Landing Alt     | `/landing-alt`        | ✅ PASS | Alternative layout compliant          |
| Pricing         | `/pricing`            | ✅ PASS | Pricing cards use TerminalCard        |
| Features        | `/features`           | ✅ PASS | Feature cards compliant               |
| Dashboard       | `/dashboard`          | ✅ PASS | Stats, activity, quick actions OK     |
| API Keys        | `/developer/api-keys` | ✅ PASS | Key management compliant              |
| Docs Index      | `/docs`               | ✅ PASS | Navigation, sidebar OK                |
| Templates Index | `/templates`          | ✅ PASS | Category grid compliant               |

**CRITICAL COUNT: 8 pages, 0 violations**

### IMPORTANT (Core user flows)

| Template/Page | Route              | Status  | Notes                       |
| ------------- | ------------------ | ------- | --------------------------- |
| About         | `/about`           | ✅ PASS | Values, mission sections OK |
| Contact       | `/contact`         | ✅ PASS | Form, FAQ sections OK       |
| Success       | `/success`         | ✅ PASS | Purchase confirmation OK    |
| Profile       | `/profile`         | ✅ PASS | User profile page OK        |
| Account       | `/account`         | ✅ PASS | Settings tabs OK            |
| Organizations | `/organizations/*` | ✅ PASS | All org pages OK            |
| Admin         | `/admin/*`         | ✅ PASS | All admin pages OK          |
| Billing       | `/billing/*`       | ✅ PASS | Invoices, payments OK       |

**IMPORTANT COUNT: 15+ pages, 0 violations**

### NICE-TO-HAVE (Template library)

| Template/Page       | Route                            | Status  | Notes                   |
| ------------------- | -------------------------------- | ------- | ----------------------- |
| Analytics Dashboard | `/templates/analytics-dashboard` | ✅ PASS | Charts, metrics OK      |
| Billing Dashboard   | `/templates/billing-dashboard`   | ✅ PASS | Billing cards OK        |
| Team Dashboard      | `/templates/team-dashboard`      | ✅ PASS | Team management OK      |
| Settings Page       | `/templates/settings-page`       | ✅ PASS | Tabs, forms OK          |
| Profile Template    | `/templates/profile`             | ✅ PASS | Profile layout OK       |
| Pricing Template    | `/templates/pricing-page`        | ✅ PASS | Pricing grid OK         |
| Notifications       | `/templates/notifications`       | ✅ PASS | Notification list OK    |
| Onboarding          | `/templates/onboarding`          | ✅ PASS | Multi-step form OK      |
| Search Results      | `/templates/search-results`      | ✅ PASS | Search layout OK        |
| Modals              | `/templates/modals`              | ✅ PASS | Modal showcase OK       |
| Documentation       | `/templates/documentation`       | ✅ PASS | Docs layout OK          |
| Authentication      | `/templates/authentication/*`    | ✅ PASS | All auth forms OK       |
| Error Pages         | `/templates/error-pages`         | ✅ PASS | 404, 500 pages OK       |
| Empty States        | `/templates/empty-states`        | ✅ PASS | Empty state patterns OK |
| Blog                | `/templates/blog`                | ✅ PASS | Blog layout OK          |
| Marketing           | `/templates/marketing`           | ✅ PASS | Marketing pages OK      |
| Chart Library       | `/templates/chart-library`       | ✅ PASS | All charts OK           |
| Email Templates     | `/templates/email-templates`     | ✅ PASS | Email previews OK       |

**NICE-TO-HAVE COUNT: 20+ templates, 0 violations**

---

## Violations Found (All Acceptable)

| Page                              | Violation Type | Count | Reason                      |
| --------------------------------- | -------------- | ----- | --------------------------- |
| `/docs/extras/theming`            | hex-colors     | 12    | Theme preview swatches      |
| `/docs/components/color-picker`   | hex-colors     | 40    | ColorPicker demo values     |
| `/component-showcase`             | hex-colors     | 1     | ColorPicker default value   |
| `/docs/tutorials/email-templates` | hex-colors     | 3     | Email HTML inline styles    |
| `/docs/features/google-oauth`     | hex-colors     | 4     | Google logo SVG             |
| `/docs/components/form`           | hex-colors     | 2     | HTML entity codes           |
| `/docs/features/emails`           | hex-colors     | 2     | Email HTML examples         |
| `/docs/components/navigation`     | hex-colors     | 1     | FALSE POSITIVE (#142 issue) |
| `/templates/profile`              | hex-colors     | 1     | FALSE POSITIVE (#142 issue) |

**Total: 9 pages with 66 hex color instances - ALL ACCEPTABLE**

---

## Dependencies by Template Type

### Dashboard Templates

**Depends on:**

- TerminalCard, TerminalCardHeader, TerminalCardContent
- StyledTabs
- StatCard, KpiCard
- Button, Badge
- mode object from @/design-system

### Auth Templates

**Depends on:**

- AuthPageTemplate
- TerminalCard
- Input, Button, Label
- mode object from @/design-system

### List Templates

**Depends on:**

- ListPageTemplate
- TerminalCard
- Table, Pagination
- Button, Badge
- mode object from @/design-system

### Settings Templates

**Depends on:**

- SettingsPageTemplate
- StyledTabs
- TerminalCard
- Form, Input, Select, Switch
- mode object from @/design-system

---

## Brokenness Summary

| Category     | Broken | Working | Rate     |
| ------------ | ------ | ------- | -------- |
| Critical     | 0      | 8       | 100%     |
| Important    | 0      | 15+     | 100%     |
| Nice-to-have | 0      | 20+     | 100%     |
| **Total**    | **0**  | **43+** | **100%** |

---

## Action Items

**NONE REQUIRED**

All templates and pages are compliant with the frozen design system. The Phase 2 audit confirmed:

- Zero broken templates
- Zero component import issues
- Zero layout breaks
- Zero design token violations

---

## Maintenance Recommendations

1. **Pre-commit hooks** - Already in place, catching violations
2. **Template registry** - Consider adding formal template type definitions
3. **Visual regression tests** - Add Playwright screenshot tests for critical pages
4. **Documentation** - Template usage docs are complete

---

_Plan generated by PHASE 3: TEMPLATE + BOILERPLATE FIX PLAN - 2025-12-06_
