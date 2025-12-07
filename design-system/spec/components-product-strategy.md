# Component Product Strategy

> Opinionated recommendations for a lean, high-ROI component lineup.

**Status:** Complete
**Last Updated:** 2025-12-07
**Total Components:** 89 (81 keep, 8 shelf)

---

## Executive Summary

### Hero Components (Top 10)

*The components that sell the boilerplate.*

1. **DataTable** - Full TanStack Table with sorting, filtering, pagination
2. **KpiCard** - Dashboard metrics with trend indicator and sparkline
3. **Form** - React-hook-form integration with validation
4. **Sidebar** - Collapsible navigation with nested items
5. **NotificationCenter** - Full notification system with grouping
6. **MultiStepForm** - Onboarding/checkout wizard flows
7. **ActivityTimeline** - Audit log and activity feed
8. **Sparkline + DonutChart** - Dashboard visualizations
9. **Toast + Toaster** - Transient notification system
10. **EmptyState** - Professional empty data states with CTAs

### Components to Shelf (8)

*Move to experimental section or hide from main showcase.*

1. **ColorPicker** - Niche use (theme customization only)
2. **Heatmap** - Specialized visualization
3. **Menubar** - Desktop-style, rarely needed in SaaS
4. **MarkdownEditor** - Content editing niche
5. **RichTextEditor** - WYSIWYG specialized use
6. **Lightbox** - Image gallery niche
7. **Rating** - Star rating specific use case
8. **FunnelChart** - Consider shelving (analytics niche)

### Must-Add Primitives (11)

*Highest-impact missing components.*

**Critical (Blocking):**
1. **DashboardShell** - Sidebar + TopBar layout composition
2. **AuthLayout** - Centered auth page wrapper
3. **TopBar** - Header with user menu, search, notifications

**High Value (Differentiators):**
4. **SettingsLayout** - Settings sidebar + content
5. **LineChart** - Time series trends
6. **BarChart** - Comparison charts
7. **AreaChart** - Volume/cumulative data
8. **BillingSummaryCard** - Usage and billing display
9. **PlanSelector** - Pricing tier selection

**Nice to Have:**
10. **UsageMeter** - Usage-based billing display
11. **FiltersBar** - Table filtering toolbar

---

## 1. High-Value Core Set

*Components that are critical or high market value, theme-friendly, and ready to ship.*

### Dashboard & Analytics (11 components)

| Component | Status | Why Important for SaaS |
|-----------|--------|------------------------|
| KpiCard | ✅ Ready | Every SaaS dashboard needs metric cards with trends. Should be showcased prominently on dashboard templates. |
| StatCard | ✅ Ready | Alternative stat display. Consider consolidating with KpiCard API. |
| Sparkline | ✅ Ready | Inline trends are expected in modern dashboards. Great for tables and cards. |
| PieChart | ✅ Ready | Proportion visualization is table stakes for analytics dashboards. |
| DonutChart | ✅ Ready | Donut with center content is ideal for single-metric focus. Showcase on dashboard templates. |
| Gauge | ✅ Ready | Single metric visualization for goals, quotas, and limits. |
| ActivityTimeline | ✅ Ready | Audit logs and activity feeds are expected in B2B SaaS. High demo leverage. |
| DataTable | ✅ Ready | The most important component for admin UIs. Full sorting, filtering, pagination. Hero-worthy. |
| EmptyState | ✅ Ready | Professional empty states with CTAs reduce user confusion and drive engagement. |
| Progress | ✅ Ready | Progress indicators for uploads, imports, and async operations. |
| Skeleton | ✅ Ready | Loading states prevent layout shift and feel professional. |

### Forms & Input (24 components)

| Component | Status | Why Important for SaaS |
|-----------|--------|------------------------|
| Button | ✅ Ready | Foundation component. Variants, sizes, and loading state cover all use cases. |
| Input | ✅ Ready | Foundation. Validation states and loading indicator are essential for forms. |
| InputPassword | ✅ Ready | Auth pages require visibility toggle. Showcase on auth templates. |
| InputOTP | ✅ Ready | 2FA is table stakes for B2B SaaS security. High demo leverage. |
| InputSearch | ✅ Ready | Search is expected in navigation and data tables. |
| InputNumber | ✅ Ready | Quantity inputs for e-commerce, settings, and configuration. |
| InputGroup | ✅ Ready | Currency, phone, and URL inputs with addons are common patterns. |
| Textarea | ✅ Ready | Multi-line input for descriptions, comments, and notes. |
| Select | ✅ Ready | Single selection is fundamental. Full Radix integration. |
| Checkbox | ✅ Ready | Boolean and multi-select patterns. Foundation component. |
| RadioGroup | ✅ Ready | Single-choice patterns for settings and forms. |
| Switch | ✅ Ready | Toggle controls for settings pages. Showcase on settings templates. |
| Slider | ✅ Ready | Range selection for pricing, filters, and configuration. |
| DatePicker | ✅ Ready | Date selection is expected in scheduling, filters, and forms. |
| TimePicker | ✅ Ready | Time selection for scheduling features. |
| Calendar | ✅ Ready | Base for DatePicker. Can be used standalone for scheduling views. |
| Combobox | ✅ Ready | Searchable dropdown is essential for large option sets. |
| MultiSelect | ✅ Ready | Tag-based multi-selection for filters and assignments. |
| Autocomplete | ⚠️ Review | Similar to Combobox. Consider consolidating APIs. |
| FileUpload | ✅ Ready | Drag-and-drop file upload is expected for imports and attachments. |
| Form | ✅ Ready | React-hook-form integration is essential. Showcase with validation examples. |
| FormError | ✅ Ready | Error display completes the form validation story. |
| Label | ✅ Ready | Accessibility essential. Required for WCAG compliance. |
| PasswordStrength | ✅ Ready | Password strength indicator improves auth UX. |

### Navigation (6 components)

| Component | Status | Why Important for SaaS |
|-----------|--------|------------------------|
| Tabs | ✅ Ready | In-page navigation is essential for settings, profiles, and detail views. |
| StyledTabs | ✅ Ready | Pre-styled variants save customization time. |
| Breadcrumb | ✅ Ready | Hierarchical navigation is expected in nested page structures. |
| NavigationMenu | ✅ Ready | Mega-menu support for marketing sites and complex navigation. |
| Sidebar | ✅ Ready | Dashboard navigation is the most important layout component. Hero-worthy. |
| Pagination | ✅ Ready | Data list navigation is essential for tables and search results. |

### Data Display (10 components)

| Component | Status | Why Important for SaaS |
|-----------|--------|------------------------|
| Card | ✅ Ready | Universal container. Rich sub-component system for flexibility. |
| Badge | ✅ Ready | Status indicators are essential for tables, lists, and notifications. |
| Avatar | ✅ Ready | User representation is expected in comments, teams, and profiles. |
| AvatarGroup | ✅ Ready | Stacked avatars for team displays and assignments. |
| Table | ✅ Ready | Base table component for simple use cases. |
| MemberCard | ✅ Ready | Team member display for settings and team pages. Showcase on team templates. |
| InviteForm | ✅ Ready | Team invitation is a core SaaS pattern. Showcase on team templates. |
| RoleSelector | ✅ Ready | Role-based access control is expected in B2B SaaS. |
| CodeBlock | ✅ Ready | Syntax highlighting for developer tools, docs, and API references. |
| MarkdownViewer | ✅ Ready | Markdown rendering for docs, changelogs, and content display. |

### Feedback (10 components)

| Component | Status | Why Important for SaaS |
|-----------|--------|------------------------|
| Alert | ✅ Ready | Inline feedback for warnings, errors, and info. Foundation component. |
| AlertDialog | ✅ Ready | Confirmation dialogs for destructive actions. Essential for data safety. |
| Toast | ✅ Ready | Transient notifications are expected for all async operations. Hero-worthy. |
| Toaster | ✅ Ready | Toast provider completes the notification system. |
| Banner | ✅ Ready | Page-level announcements for maintenance, updates, and promotions. |
| Loading | ✅ Ready | Loading spinner for button and content states. |
| NotificationCenter | ✅ Ready | Full notification system with grouping. High demo leverage. Hero-worthy. |
| NotificationList | ✅ Ready | Notification display component for the center. |
| NotificationBadge | ✅ Ready | Unread count badge for navigation items. |
| StatusIndicator | ✅ Ready | Online/offline status for users and services. |

### Overlays (8 components)

| Component | Status | Why Important for SaaS |
|-----------|--------|------------------------|
| Dialog | ✅ Ready | Modal dialogs are essential for focused interactions. Foundation. |
| Sheet | ✅ Ready | Side drawers for mobile navigation and detail panels. |
| Popover | ✅ Ready | Base for dropdowns, tooltips, and contextual content. |
| Tooltip | ✅ Ready | Hover hints improve UX and reduce confusion. Essential. |
| DropdownMenu | ✅ Ready | Action menus for tables, cards, and navigation. |
| ContextMenu | ✅ Ready | Right-click menus for power users and desktop-like UX. |
| HoverCard | ✅ Ready | Preview on hover for links and references. |
| Command | ✅ Ready | Command palette for power users. Nice differentiator. |

### Layout (10 components)

| Component | Status | Why Important for SaaS |
|-----------|--------|------------------------|
| Typography | ✅ Ready | Foundation component for consistent text styling. |
| Container | ✅ Ready | Foundation component for page width constraints. |
| Section | ✅ Ready | Page section wrapper with consistent spacing. |
| Grid | ✅ Ready | Responsive layout grid for complex layouts. |
| Stack | ✅ Ready | Vertical/horizontal stacking for simple layouts. |
| PageWrapper | ✅ Ready | Page-level wrapper with consistent structure. |
| Accordion | ✅ Ready | FAQs, settings sections, and collapsible content. |
| Collapsible | ✅ Ready | Single collapsible section for expandable content. |
| ScrollArea | ✅ Ready | Custom scrollbar styling for consistent UX. |
| AspectRatio | ✅ Ready | Image and video ratio maintenance for media. |
| Separator | ✅ Ready | Visual dividers for content separation. |

---

## 2. Secondary but Useful

*Components that add value but aren't critical for the core offering.*

| Component | Use Case | Recommendation |
|-----------|----------|----------------|
| MultiStepForm | Onboarding, checkout | Keep - high value for wizards |
| ImageUploader | Profile, content | Keep - common need |
| FunnelChart | Conversion analytics | Review - may shelf |
| Autocomplete | Search, tagging | Review - consolidate with Combobox |
| InputNumber | Quantity input | Keep - form completeness |
| InputSearch | Search fields | Keep - form completeness |
| InputGroup | Currency, phone | Keep - form completeness |

---

## 3. Experimental / Optional

*Components to move to an "Extras" section or hide from main showcase.*

**Action Options:**
- `hide_from_main_showcase` - Remove from main component showcase, keep in codebase
- `mark_as_experimental` - Show with "Experimental" badge, indicate instability
- `keep_in_dev_only` - Don't ship to customers, internal playground only

| Component | Reason | Action |
|-----------|--------|--------|
| ColorPicker | Theme customization is niche. Most SaaS apps don't need custom color pickers. | `hide_from_main_showcase` |
| Heatmap | Specialized analytics visualization. Low ROI for general SaaS boilerplate. | `hide_from_main_showcase` |
| Menubar | Desktop app pattern (File/Edit/View menus). Rarely needed in web SaaS. | `hide_from_main_showcase` |
| MarkdownEditor | Content CMS niche. Most apps use plain textarea or external editor. | `mark_as_experimental` |
| RichTextEditor | WYSIWYG editing is complex. Better to recommend proven solutions (Tiptap, Lexical). | `mark_as_experimental` |
| Lightbox | Image gallery viewer. Specialized for media-heavy apps only. | `hide_from_main_showcase` |
| Rating | Star rating pattern. Only useful for review/feedback features. | `hide_from_main_showcase` |

---

## 4. Missing Primitives & Recommended Additions

> **For the team:** This section identifies 18 primitives that would significantly level up this boilerplate against competitors like shadcn/ui, Tremor, and paid starters like Ship, Makerkit, and Supastarter. Focus on composition where possible—you already have 89 components, so most gaps can be filled by combining existing primitives rather than building from scratch.

---

### Priority Legend

| Priority | Meaning | Action |
|----------|---------|--------|
| **Critical** | Blocking. Customers expect these. Ship before launch. | Build immediately |
| **High** | Strong differentiator. Makes demos impressive. | Build in first sprint |
| **Nice-to-have** | Adds polish. Can wait for v1.1. | Build when time permits |

### Composition Key

| Type | Meaning |
|------|---------|
| ✅ **Composable** | Can build entirely from existing components |
| 🔧 **Extend** | Requires extending an existing component |
| 🆕 **New** | Requires new implementation (SVG, library, etc.) |

---

### Critical Primitives (4)

*Without these, the boilerplate feels incomplete compared to paid alternatives.*

| # | Name | Category | Composable? | Composition Strategy |
|---|------|----------|-------------|---------------------|
| 1 | **DashboardShell** | layout | ✅ Composable | Wrap existing `Sidebar` + new `TopBar` in a flex container. Add responsive collapse behavior. This is the #1 thing customers screenshot in demos. |
| 2 | **TopBar** | navigation | ✅ Composable | Compose from `DropdownMenu` (user menu) + `NotificationBadge` + `InputSearch`. Add logo slot and mobile menu trigger. |
| 3 | **AuthLayout** | layout | ✅ Composable | Centered `Container` with max-width, logo slot, and card wrapper. Use for sign-in, sign-up, forgot-password, and 2FA pages. |
| 4 | **SignInForm** | auth | ✅ Composable | Compose from `Form` + `Input` + `InputPassword` + `Button` + social login section. Include "remember me" and "forgot password" links. |

**Why critical:** Every SaaS demo starts with auth and lands on dashboard. If these look rough, customers bounce before seeing your actual components.

---

### High-Value Primitives (8)

*These make the boilerplate stand out in feature comparisons and demo videos.*

| # | Name | Category | Composable? | Composition Strategy |
|---|------|----------|-------------|---------------------|
| 5 | **SettingsLayout** | layout | ✅ Composable | Sidebar navigation (vertical tabs or list) + content area. Reuse `Tabs` or create a `SettingsNav` variant. |
| 6 | **LineChart** | charts | 🆕 New | Use Recharts, Visx, or custom SVG. Theme-aware colors from design tokens. This is the most-requested missing chart. |
| 7 | **BarChart** | charts | 🆕 New | Same approach as LineChart. Horizontal and vertical variants. Essential for comparison data. |
| 8 | **AreaChart** | charts | 🔧 Extend | Extension of LineChart with fill. Good for cumulative metrics and volume trends. |
| 9 | **BillingSummaryCard** | settings | ✅ Composable | `Card` + `Badge` (plan name) + `Progress` (usage) + renewal date + upgrade CTA. Every SaaS needs this. |
| 10 | **PlanSelector** | settings | ✅ Composable | Grid of `Card` variants with `RadioGroup` selection. Highlight "popular" tier. Include feature lists. |
| 11 | **FiltersBar** | data_display | 🔧 Extend | Extend `DataTableToolbar` with `DatePicker`, `Select` filters, and search. Make it reusable across tables. |
| 12 | **SignUpForm** | auth | ✅ Composable | Similar to SignInForm. Add `PasswordStrength` indicator and terms checkbox. |

**Why high-value:** These appear in every "feature comparison" table. Tremor has charts. Makerkit has billing. If you don't have them, you lose the checkbox battle.

---

### Nice-to-Have Primitives (6)

*Polish items that make the boilerplate feel premium but aren't blocking.*

| # | Name | Category | Composable? | Composition Strategy |
|---|------|----------|-------------|---------------------|
| 13 | **UsageMeter** | settings | ✅ Composable | `Progress` bar with start/end labels showing "X of Y used". Add color thresholds (green → yellow → red). |
| 14 | **ApiKeysTable** | settings | ✅ Composable | `DataTable` with columns: name, key (masked), created, last used, actions. Include copy button and revoke dialog. |
| 15 | **OnboardingChecklist** | auth | ✅ Composable | Vertical list with `Checkbox` items + `Progress` bar at top. Expandable steps with descriptions. |
| 16 | **SocialLoginButtons** | auth | ✅ Composable | `Button` variants with provider icons (Google, GitHub, Microsoft). Consistent sizing and spacing. |
| 17 | **ChangelogTimeline** | data_display | 🔧 Extend | Variant of `ActivityTimeline` with date headers, version badges, and markdown content. |
| 18 | **ForgotPasswordForm** | auth | ✅ Composable | Simple `Form` with email `Input` and submit `Button`. Include success state with "check your email" message. |

**Why nice-to-have:** These round out the settings and auth stories. Customers notice their absence but won't reject the boilerplate for it.

---

### Composition Cheat Sheet

For the team, here's exactly what to combine for each composable primitive:

```
DashboardShell = Sidebar + TopBar + main content area + responsive state
TopBar = Container + flex row + logo + InputSearch + NotificationBadge + DropdownMenu
AuthLayout = Container (max-w-md) + Card + logo slot + footer links
SettingsLayout = flex row + SettingsNav (Tabs vertical) + content area
BillingSummaryCard = Card + CardHeader + Badge + Progress + CardFooter + Button
PlanSelector = RadioGroup + Grid + Card variants + Badge ("Popular")
SignInForm = Form + Input (email) + InputPassword + Checkbox (remember) + Button + Separator + SocialLoginButtons
UsageMeter = div + Progress + span (start) + span (end)
ApiKeysTable = DataTable + custom columns + copy button + AlertDialog (revoke)
OnboardingChecklist = Card + Progress + ul + li with Checkbox + descriptions
```

---

### What NOT to Build

These are often requested but have low ROI for a boilerplate:

| Component | Why Skip |
|-----------|----------|
| Full calendar/scheduler | Too complex, recommend FullCalendar integration |
| Kanban board | Too opinionated, recommend react-beautiful-dnd |
| Rich text editor | Already have experimental, recommend Tiptap |
| Video player | Use native HTML5 or recommend Video.js |
| Map components | Recommend Mapbox/Google Maps integration |

**Rule of thumb:** If it requires >500 lines or a major dependency, document the integration pattern instead of building a component.

---

### Implementation Order Recommendation

For a small team, build in this order to maximize demo impact:

1. **DashboardShell + TopBar** (1-2 days) — Unlocks professional-looking demos immediately
2. **AuthLayout + SignInForm** (1 day) — Completes the "first 30 seconds" experience
3. **SettingsLayout + BillingSummaryCard** (1-2 days) — Shows you handle the hard SaaS patterns
4. **LineChart + BarChart** (2-3 days) — Fills the most obvious gap vs Tremor
5. **Everything else** — Build as you create template pages that need them

**Total estimate:** ~10 days of focused work to close all critical and high-value gaps.

---

## Showcase Refactoring Plan

### Current Structure

```
/component-showcase
├── foundations/
├── forms/
├── display/
├── navigation/
├── feedback/
├── overlays/
├── charts/
└── templates/
```

### Recommended Structure

```
/component-showcase
├── hero/              # Top 10 components with rich demos
├── core/
│   ├── foundations/
│   ├── forms/
│   ├── display/
│   ├── navigation/
│   ├── feedback/
│   └── overlays/
├── advanced/
│   ├── charts/
│   ├── dashboards/
│   └── billing/
├── templates/         # Full-page examples
└── experimental/      # Niche/playground components
```

### Hero Section Components

The `/component-showcase/hero` page should feature:

1. **KPI Card Grid** - Dashboard metrics
2. **Data Table** - Sorting, filtering, pagination
3. **Form with Validation** - Complete form example
4. **Chart Dashboard** - Multiple chart types
5. **Auth Flow** - Sign in/up/forgot password
6. **Settings Page** - Profile, billing, team
7. **Empty States** - With CTAs
8. **Toast System** - Notifications in action
9. **Modal Flow** - Multi-step dialog
10. **Navigation System** - Sidebar + topbar

---

## Implementation Priority

### Phase 1: Polish Existing

- [ ] Audit theme compliance on all 81 core components
- [ ] Fix any hardcoded styles (use mode tokens)
- [ ] Ensure consistent API across component families
- [ ] Review Autocomplete/Combobox consolidation

### Phase 2: Add Critical Gaps

- [ ] DashboardShell layout (Sidebar + TopBar)
- [ ] AuthLayout (centered wrapper)
- [ ] TopBar (header with user menu)
- [ ] SettingsLayout (sidebar nav + content)

### Phase 3: Enhance Showcase

- [ ] Create hero section with top 10 components
- [ ] Move 7 experimental to `/experimental` section
- [ ] Add rich demos for hero components
- [ ] Update documentation for core set

### Phase 4: Add Differentiators

- [ ] LineChart / BarChart / AreaChart (fill chart gaps)
- [ ] BillingSummaryCard (SaaS billing)
- [ ] PlanSelector (pricing tiers)
- [ ] FiltersBar (table filtering)

### Phase 5: Nice-to-Have

- [ ] UsageMeter
- [ ] ApiKeysTable
- [ ] OnboardingChecklist
- [ ] SocialLoginButtons

---

## Decision Point

After reviewing this strategy, choose:

> **(A)** Refactor the showcase to highlight only the high-value set
>
> **(B)** Add missing primitives first
>
> **(C)** Start shelving/hiding low-value components first

---

*Generated as part of Component Value Audit. See `design-system/audit/COMPONENT_VALUE_AUDIT.md` for methodology.*
