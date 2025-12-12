# Component Analysis: Fabrk SaaS Boilerplate

**Date:** December 9, 2025
**Total Components:** 115
**Objective:** Determine which components are essential for a production SaaS product

---

## Executive Summary

**Current State:**
- 115 UI components in `/src/components/ui/`
- ~30 actively used in production features
- ~85 primarily for showcase/documentation
- Industry standard: 40-60 components for SaaS boilerplates

**Findings:**
- **Essential (30 components):** Card, Button, Input, Form, Table, Dialog, Select, Tabs
- **Valuable (25 components):** Charts, advanced inputs, specialized layouts
- **Optional (20 components):** Feature-specific components
- **Remove (40 components):** Unused editors, duplicate navigation, marketing components

---

## TIER 1: ESSENTIAL (30 Components)

Must keep - actively used in production features.

### Forms & Inputs (10)

| Component | Usage | Purpose |
|-----------|-------|---------|
| Button | 148× | All actions, submissions, navigation |
| Input | 43× | Text inputs everywhere |
| Label | 38× | Form labels |
| Form | 5× | React Hook Form wrapper |
| Textarea | 12× | Long text input |
| Checkbox | 15× | Toggles, agreements |
| Select | 12× | Dropdowns, filters |
| Switch | 8× | Toggle settings |
| RadioGroup | 3× | Single choice |
| InputOTP | 4× | 2FA codes |

### Layout & Structure (8)

| Component | Usage | Purpose |
|-----------|-------|---------|
| Card | 157× | Universal container |
| Tabs | 33× | Content organization |
| Separator | 5× | Visual dividers |
| DashboardShell | Active | Main app layout |
| Sidebar | 3× | Navigation menu |
| TopBar | Active | Header bar |
| Container | Passive | Max-width wrapper |
| AuthLayout | Active | Auth pages |

### Data Display (7)

| Component | Usage | Purpose |
|-----------|-------|---------|
| Badge | 31× | Status labels |
| Avatar | 13× | User profiles |
| Table | 10× | Data tables |
| DataTable | Active | Advanced tables |
| Pagination | 3× | List navigation |
| Progress | 6× | Progress bars |
| Breadcrumb | 3× | Navigation trail |

### Modals & Overlays (5)

| Component | Usage | Purpose |
|-----------|-------|---------|
| Dialog | 7× | Modals |
| AlertDialog | 12× | Confirmations |
| Sheet | 4× | Slide-out panels |
| Popover | 3× | Floating menus |
| DropdownMenu | 11× | Action menus |

---

## TIER 2: VALUABLE (25 Components)

Should keep - common SaaS patterns.

### Advanced Forms (8)

| Component | Usage | Purpose |
|-----------|-------|---------|
| DatePicker | Active | Date selection |
| Slider | 3× | Range inputs |
| MultiSelect | Passive | Multi-option select |
| Combobox | Passive | Searchable select |
| Autocomplete | Passive | Search suggestions |
| InputPassword | Passive | Password with show/hide |
| InputNumber | Passive | Number with +/- |
| PasswordStrength | Passive | Strength meter |

### Charts (6)

| Component | Usage | Purpose |
|-----------|-------|---------|
| LineChart | Active | Trend visualization |
| BarChart | Active | Category comparison |
| AreaChart | Active | Filled trends |
| PieChart | Active | Proportions |
| DonutChart | Active | Pie variant |
| KPICard | Active | Metric cards |

### Feedback (4)

| Component | Usage | Purpose |
|-----------|-------|---------|
| Alert | 7× | Inline messages |
| Toast/Toaster | 6× | Notifications |
| Skeleton | Passive | Loading placeholders |
| Loading | Passive | Spinner |

### Navigation (4)

| Component | Usage | Purpose |
|-----------|-------|---------|
| Accordion | 4× | Collapsible sections |
| StyledTabs | 11× | Terminal tabs |
| ScrollArea | Passive | Custom scrollbars |
| Command | 3× | Command palette |

### Utilities (3)

| Component | Usage | Purpose |
|-----------|-------|---------|
| Tooltip | Passive | Hover help |
| CopyButton | Passive | Copy to clipboard |
| CodeBlock | 33× | Syntax highlighting |

---

## TIER 3: OPTIONAL (20 Components)

Consider keeping based on your SaaS needs.

### Specialized Inputs (7)

| Component | Usage | Use Case |
|-----------|-------|----------|
| FileUpload | Active | Document uploads |
| ImageUploader | Passive | Avatars, logos |
| ColorPicker | Passive | Theming |
| TimePicker | Passive | Scheduling |
| Cropper | 3× | Profile pictures |
| InputSearch | Passive | Search bars |
| InputGroup | Passive | Currency, units |

### Advanced Layouts (5)

| Component | Usage | Use Case |
|-----------|-------|----------|
| DataTableToolbar | Passive | Table filters |
| DataTablePagination | Passive | Table pagination |
| SettingsLayout | Passive | Settings template |
| MultiStepForm | Active | Wizard forms |
| PageWrapper | Passive | Page wrapper |

### Business Components (8)

| Component | Usage | Use Case |
|-----------|-------|----------|
| SignInForm | 4× | Auth template |
| InviteForm | Passive | Invite users |
| RoleSelector | Passive | Role dropdown |
| BillingSummaryCard | 6× | Billing display |
| StatCard | Passive | KPI variant |
| ActivityTimeline | Passive | Activity log |
| NotificationList | Passive | Notification feed |
| MemberCard | Passive | Team member card |

---

## TIER 4: REMOVE (40 Components)

Low value - minimal usage or duplicates.

### Unused Editors (3) - 0% Usage

- MarkdownEditor (Milkdown - large bundle)
- RichTextEditor (Tiptap - large bundle)
- PromptBuilder (unused)

### Specialized Charts (4) - Showcase Only

- FunnelChart
- Sparkline
- Gauge
- Heatmap

### Unused Navigation (7) - Not Integrated

- NavigationMenu
- Menubar
- ContextMenu
- HoverCard
- Collapsible
- Banner
- Grid

### Unused Media (6) - 0% Usage

- ImageDropzone
- CropperControls
- Lightbox
- MarkdownViewer
- AspectRatio
- Rating

### Duplicates (10)

- AvatarGroup (use multiple Avatars)
- NotificationBadge (duplicate of Badge)
- NotificationCenter (not implemented)
- StatusIndicator (duplicate of Badge)
- Stack (use flex)
- Section (unnecessary wrapper)
- SimpleIcon (use lucide-react)
- Lazy (React.lazy built-in)
- CodeGenerator (dev tool)
- EmptyState (not reusable)

### Marketing/Edge Cases (10)

- DataTableHeader (built into DataTable)
- Field (use Form components)
- FormError (built into Form)
- FiltersBar (unused)
- Typography (use Tailwind)
- Hero, Features, Pricing, Testimonials, FAQ (marketing only)

---

## Summary

| Tier | Count | Action |
|------|-------|--------|
| Tier 1: Essential | 30 | ✅ Keep |
| Tier 2: Valuable | 25 | ⭐ Keep |
| Tier 3: Optional | 20 | ⚠️ Decide |
| Tier 4: Remove | 40 | ❌ Delete |
| **Total** | **115** | |

---

## Recommendations

### Conservative (75 components)
Keep Tier 1 + 2 + 3 = **75 components**

### Moderate (55 components) ⭐ RECOMMENDED
Keep Tier 1 + 2 = **55 components**
- Matches industry standard (40-60)
- Removes bloat while keeping valuable components
- Balanced approach

### Aggressive (30 components)
Keep Tier 1 only = **30 components**
- Minimal maintenance
- Production-proven only

---

## Comparison

| Product | Components |
|---------|-----------|
| Shadcn UI | ~50 |
| Saas UI | ~60 |
| Taxonomy | ~40 |
| **Fabrk (Current)** | **115** |
| **Fabrk (Recommended)** | **55** |

---

## Implementation

If removing Tier 4 (40 components):

### Delete These Files

```
src/components/ui/
├── markdown-editor.tsx
├── rich-text-editor.tsx
├── prompt-builder.tsx
├── funnel-chart.tsx
├── sparkline.tsx
├── gauge.tsx
├── heatmap.tsx
├── navigation-menu.tsx
├── menubar.tsx
├── context-menu.tsx
├── hover-card.tsx
├── collapsible.tsx
├── banner.tsx
├── grid.tsx
├── image-dropzone.tsx
├── cropper-controls.tsx
├── lightbox.tsx
├── markdown-viewer.tsx
├── aspect-ratio.tsx
├── rating.tsx
├── avatar-group.tsx
├── notification-badge.tsx
├── notification-center.tsx
├── status-indicator.tsx
├── stack.tsx
├── section.tsx
├── simple-icon.tsx
├── lazy.tsx
├── code-generator.tsx
├── empty-state.tsx
├── data-table-column-header.tsx
├── field.tsx
├── form-error.tsx
├── filters-bar.tsx
├── typography.tsx
├── hero.tsx
├── features.tsx
├── pricing.tsx
├── testimonials.tsx
└── faq.tsx
```

### Update

- `src/components/ui/index.ts` - Remove exports
- `src/app/docs/components/` - Remove doc pages
- `src/app/library/` - Remove examples
- `README.md` - Change to "55 essential components"
- `DESIGN_SYSTEM.md` - Update inventory

---

**Recommendation:** Go with **Moderate approach (55 components)** - keeps essential + valuable, removes obvious bloat.
