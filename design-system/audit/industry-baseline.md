# Industry Baseline: SaaS UI Kit Expectations

> What a competitive SaaS boilerplate should ship out of the box.

---

## Overview

This document defines the component families that customers expect from a paid SaaS boilerplate. Based on analysis of popular Next.js/React SaaS starters, admin dashboards, and shadcn-based kits.

---

## Component Families

### 1. Foundations

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Typography Scale | Critical | Headings, body, captions |
| Color System | Critical | Semantic colors, theme switching |
| Spacing Scale | Critical | Consistent margins/padding |
| Grid/Container | Critical | Page layouts |
| Icon System | High | UI iconography |

### 2. Navigation

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Sidebar | Critical | Dashboard navigation |
| Top Bar / Header | Critical | User menu, search, notifications |
| Breadcrumbs | High | Nested page navigation |
| Tabs | Critical | In-page section switching |
| Navigation Menu | High | Dropdown/mega menus |
| App Switcher | Nice-to-have | Multi-product switching |
| Mobile Nav | Critical | Responsive navigation |

### 3. Forms

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Input | Critical | Text entry |
| Select | Critical | Single option selection |
| Textarea | Critical | Multi-line text |
| Checkbox | Critical | Boolean/multiple selection |
| Radio | Critical | Single selection from group |
| Switch/Toggle | Critical | On/off settings |
| Slider | High | Range selection |
| Password Field | Critical | Secure text entry |
| Search Field | High | Search functionality |
| Date Picker | High | Date selection |
| Time Picker | Nice-to-have | Time selection |
| Date Range Picker | High | Period selection |
| Multi-select | High | Multiple option selection |
| Combobox/Autocomplete | High | Search + select |
| File Upload | High | File attachment |
| Form Layout | High | Consistent form structure |

### 4. Feedback & Status

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Alert | Critical | Inline messages |
| Toast/Notification | Critical | Transient feedback |
| Banner | High | Page-level notices |
| Empty State | Critical | No data scenarios |
| Progress Bar | High | Task completion |
| Spinner/Loading | Critical | Loading states |
| Skeleton | High | Content placeholders |
| Error Boundary | High | Graceful error handling |

### 5. Data Display

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Table | Critical | Tabular data |
| Table Pagination | Critical | Large dataset navigation |
| Table Sorting | High | Data organization |
| Table Filtering | High | Data filtering |
| Card | Critical | Content containers |
| KPI/Stat Card | Critical | Dashboard metrics |
| Badge | Critical | Status indicators |
| Avatar | High | User representation |
| Avatar Group | Nice-to-have | Multiple users |
| List | High | Vertical content |
| Activity Timeline | High | Event history |
| Description List | Nice-to-have | Key-value pairs |

### 6. Overlays

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Dialog/Modal | Critical | Focused interactions |
| Drawer/Sheet | Critical | Side panels |
| Popover | High | Contextual content |
| Tooltip | Critical | Hover hints |
| Dropdown Menu | Critical | Action menus |
| Context Menu | Nice-to-have | Right-click menus |
| Hover Card | Nice-to-have | Preview on hover |
| Command Palette | Nice-to-have | Keyboard navigation |

### 7. Charts & Data Viz

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Line Chart | High | Trends over time |
| Bar Chart | High | Comparisons |
| Pie/Donut Chart | High | Proportions |
| Area Chart | Nice-to-have | Volume trends |
| Sparkline | High | Inline trends |
| Gauge/Meter | Nice-to-have | Single metric |
| Funnel | Nice-to-have | Conversion flows |
| Heatmap | Nice-to-have | Density visualization |

### 8. Layout Components

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Dashboard Shell | Critical | Dashboard page structure |
| Auth Layout | Critical | Sign in/up pages |
| Settings Layout | High | Settings pages |
| Marketing Layout | Nice-to-have | Landing pages |
| Centered Layout | High | Auth, error pages |
| Split Layout | Nice-to-have | Two-panel views |

### 9. Auth & Onboarding

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Sign In Form | Critical | Authentication |
| Sign Up Form | Critical | Registration |
| Forgot Password Form | Critical | Password recovery |
| 2FA Input | High | Two-factor auth |
| Social Auth Buttons | High | OAuth providers |
| Onboarding Steps | High | User onboarding |
| Step Indicator | High | Multi-step progress |
| Welcome Screen | Nice-to-have | First-time user |

### 10. Settings & Account

| Component | Priority | Use Cases |
|-----------|----------|-----------|
| Profile Form | High | User profile editing |
| Settings Section | High | Settings grouping |
| Billing Summary | High | Subscription status |
| Plan Selector | High | Pricing tier selection |
| Usage Meter | Nice-to-have | Usage-based billing |
| Team Members List | High | Team management |
| Invite Form | High | Team invitations |
| API Keys Table | Nice-to-have | Developer settings |

---

## Priority Definitions

| Priority | Meaning |
|----------|---------|
| **Critical** | Must have for any SaaS boilerplate |
| **High** | Expected by most customers, strong differentiator |
| **Nice-to-have** | Adds value but not essential |

---

## Notes

- All components should be theme-agnostic using design tokens
- Mobile responsiveness is expected for all components
- Accessibility (WCAG 2.1 AA) is expected
- TypeScript types should be complete

---

*Generated as part of Component Value Audit. See `COMPONENT_VALUE_AUDIT.md` for methodology.*
