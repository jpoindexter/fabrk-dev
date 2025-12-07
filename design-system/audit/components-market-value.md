# Component Market Value Analysis

> Gap analysis comparing Fabrk inventory against industry baseline.

**Status:** Complete
**Last Updated:** 2025-12-07
**Total Components:** 89

---

## Summary

### Market Value Distribution

| Rating | Count | Percentage |
|--------|-------|------------|
| Critical | 35 | 39% |
| High | 28 | 32% |
| Nice to Have | 18 | 20% |
| Niche | 8 | 9% |

### Baseline Overlap

| Category | Count |
|----------|-------|
| Direct Match | 45 |
| Variant/Specialization | 24 |
| Experimental | 20 |

### Theme Compatibility

| Status | Count |
|--------|-------|
| Theme-Friendly | 85 |
| Partial | 4 |
| Non-Compliant | 0 |

---

## Critical Components (35)

*Must-have for any SaaS boilerplate.*

| Component | Baseline Overlap | Notes |
|-----------|-----------------|-------|
| Button | Direct Match | Excellent variants, sizes, loading |
| Input | Direct Match | Validation states, loading indicator |
| Select | Direct Match | Full-featured with Radix |
| Checkbox | Direct Match | Standard implementation |
| RadioGroup | Direct Match | Standard implementation |
| Switch | Direct Match | Standard implementation |
| Textarea | Direct Match | Standard implementation |
| Label | Direct Match | Essential for accessibility |
| Form | Direct Match | React-hook-form integration |
| Card | Direct Match | Rich system with sub-components |
| Badge | Direct Match | Essential for status |
| Table | Direct Match | Base table |
| DataTable | Direct Match | TanStack Table. High value |
| Dialog | Direct Match | Essential modal |
| Sheet | Direct Match | Drawer/side panel |
| Tooltip | Direct Match | Essential for UX hints |
| DropdownMenu | Direct Match | Actions and user menus |
| Alert | Direct Match | Feedback component |
| Toast | Direct Match | Transient notifications |
| Tabs | Direct Match | Core navigation |
| Sidebar | Direct Match | Dashboard navigation |
| EmptyState | Direct Match | Empty data scenarios |
| Typography | Direct Match | Foundation |
| Container | Direct Match | Foundation |
| Toaster | Variant | Toast provider |
| KpiCard | Variant | Dashboard metrics with trend |

---

## High-Value Components (28)

*Add significant value, expected by customers.*

| Component | Baseline Overlap | Notes |
|-----------|-----------------|-------|
| Avatar | Direct Match | Standard with fallback |
| Popover | Direct Match | Base for many components |
| Progress | Direct Match | Progress indicator |
| Skeleton | Direct Match | Loading states |
| Breadcrumb | Direct Match | Navigation aid |
| NavigationMenu | Direct Match | Mega-menu support |
| Slider | Direct Match | Range input |
| DatePicker | Direct Match | Calendar-based selection |
| Combobox | Direct Match | Searchable dropdown |
| MultiSelect | Direct Match | Multiple selection with tags |
| FileUpload | Direct Match | Drag-and-drop |
| AlertDialog | Direct Match | Confirmation dialog |
| Calendar | Direct Match | Date selection base |
| Pagination | Direct Match | Data lists |
| Accordion | Direct Match | FAQs, settings |
| ScrollArea | Direct Match | Custom scrollbar |
| Loading | Direct Match | Loading spinner |
| CodeBlock | Variant | Syntax highlighting |
| FormError | Variant | Error messages |
| NotificationCenter | Variant | Full notification system |
| ActivityTimeline | Variant | Activity feed/audit log |
| MultiStepForm | Variant | Onboarding/checkout flows |
| Sparkline | Direct Match | Inline trend charts |
| PieChart | Direct Match | Standard chart |
| DonutChart | Variant | Donut with center content |
| InputPassword | Variant | Auth essential |
| InputOTP | Variant | 2FA input |
| InviteForm | Variant | Team invitation |
| StatCard | Variant | Similar to KpiCard |

---

## Nice-to-Have Components (18)

*Useful additions, not blocking.*

| Component | Baseline Overlap | Notes |
|-----------|-----------------|-------|
| Command | Direct Match | Command palette |
| PasswordStrength | Variant | Password indicator |
| RoleSelector | Variant | Team role selection |
| MemberCard | Variant | Team member display |
| AvatarGroup | Variant | Stacked avatars |
| Banner | Direct Match | Announcements |
| InputSearch | Variant | Search input |
| InputNumber | Variant | Numeric input |
| InputGroup | Variant | Input with addons |
| Autocomplete | Direct Match | Could consolidate with Combobox |
| TimePicker | Direct Match | Time selection |
| Gauge | Variant | Single metric |
| FunnelChart | Variant | Conversion funnel |
| ContextMenu | Direct Match | Right-click menus |
| HoverCard | Direct Match | Preview on hover |
| StyledTabs | Variant | Tab styling variants |
| Collapsible | Direct Match | Single collapsible |
| AspectRatio | Direct Match | Ratio maintenance |
| Separator | Direct Match | Visual divider |
| Section | Variant | Page section wrapper |
| Grid | Variant | Layout grid |
| Stack | Variant | Layout stack |
| PageWrapper | Variant | Page wrapper |
| MarkdownViewer | Variant | Markdown rendering |
| ImageUploader | Variant | Image with cropping |
| NotificationList | Variant | Notification system |
| NotificationBadge | Variant | Unread count |
| StatusIndicator | Variant | Online/offline status |

---

## Niche Components (8)

*Specialized use cases. Consider shelving from main showcase.*

| Component | Status | Reason | Recommendation |
|-----------|--------|--------|----------------|
| ColorPicker | Experimental | Theme customization only | Shelf |
| Heatmap | Experimental | Specialized visualization | Shelf |
| Menubar | Experimental | Desktop-style, rarely needed | Shelf |
| MarkdownEditor | Experimental | Content editing use case | Shelf |
| RichTextEditor | Experimental | WYSIWYG, specialized | Shelf |
| Lightbox | Experimental | Image gallery, specialized | Shelf |
| Rating | Experimental | Star rating, specific use | Shelf |

---

## Gap Analysis

### Critical Gaps (Must Add)

These are blocking - the boilerplate is incomplete without them.

| Component | Category | Unlocks (Real SaaS UX) |
|-----------|----------|------------------------|
| **DashboardShell** | layout | Consistent dashboard page structure with sidebar + topbar across all admin pages |
| **AuthLayout** | layout | Professional sign-in/up/forgot-password pages with centered branding |
| **TopBar** | navigation | Dashboard header with user menu, global search, and notification access |

### High-Value Gaps (Differentiators)

These would make the boilerplate stand out.

| Component | Category | Unlocks (Real SaaS UX) |
|-----------|----------|------------------------|
| **SettingsLayout** | layout | Consistent settings pages with sidebar navigation pattern |
| **LineChart** | charts | Time-series trend visualization for metrics, revenue, and usage data |
| **BarChart** | charts | Comparison visualization for categories, periods, and segments |
| **AreaChart** | charts | Volume and cumulative trend visualization with filled regions |
| **BillingSummaryCard** | settings | Subscription status display with current plan and usage |
| **PlanSelector** | settings | Pricing tier selection during upgrade flows |
| **UsageMeter** | settings | Usage-based billing display showing consumption vs limits |
| **FiltersBar** | data_display | Reusable table filtering toolbar with search, date range, and facets |

### Nice-to-Have Gaps

Would be great but not blocking.

| Component | Category | Unlocks (Real SaaS UX) |
|-----------|----------|------------------------|
| ApiKeysTable | settings | Developer settings page with API key management and rotation |
| ChangelogTimeline | data_display | Product updates and release notes display |
| OnboardingChecklist | auth | Setup progress tracking during new user onboarding |
| SocialLoginButtons | auth | OAuth provider buttons (Google, GitHub, etc.) for auth pages |

---

## Recommendations Summary

### Components to Keep (81)

All critical, high, and nice-to-have components should remain in the main showcase.

### Components to Shelf (8)

Move to experimental/extras section:

1. ColorPicker
2. Heatmap
3. Menubar
4. MarkdownEditor
5. RichTextEditor
6. Lightbox
7. Rating
8. (Consider) FunnelChart

### Gaps to Address

**Phase 1 (Critical):**
- DashboardShell
- AuthLayout
- TopBar

**Phase 2 (High Value):**
- SettingsLayout
- LineChart / BarChart / AreaChart
- BillingSummaryCard
- PlanSelector

**Phase 3 (Polish):**
- UsageMeter
- FiltersBar
- ApiKeysTable

---

## Competitive Position

### Strengths

1. **Form Ecosystem** - 24 form components covering all common patterns
2. **Notification System** - Full NotificationCenter with badge and list
3. **Dashboard Components** - KpiCard, StatCard, ActivityTimeline
4. **Data Display** - DataTable with full TanStack integration
5. **Chart Foundation** - Sparkline, Pie, Donut, Gauge, Funnel

### Weaknesses

1. **Missing Layout Shells** - No DashboardShell, AuthLayout
2. **Incomplete Charts** - No LineChart, BarChart (most requested)
3. **No Billing Components** - Missing BillingSummaryCard, PlanSelector
4. **Some Niche Components in Main Showcase** - Menubar, Heatmap, ColorPicker

### Versus Competition

| Feature | Fabrk | shadcn/ui | Tremor | Mantine |
|---------|-------|-----------|--------|---------|
| Total Components | 89 | ~40 | ~30 | ~100 |
| Dashboard-Ready | Partial | No | Yes | Partial |
| Charts | 6 | 0 | 12 | 0 |
| Theme System | Yes | Yes | Yes | Yes |
| Terminal Aesthetic | Yes | No | No | No |

---

*Generated as part of Component Value Audit. See `COMPONENT_VALUE_AUDIT.md` for methodology.*
