# Component Inventory

> Complete inventory of UI components in the Fabrk boilerplate.

**Status:** Complete
**Last Updated:** 2025-12-07
**Total Components:** 89

---

## Summary

| Category | Count |
|----------|-------|
| Foundation | 2 |
| Navigation | 6 |
| Form | 24 |
| Data Display | 12 |
| Feedback | 13 |
| Overlay | 8 |
| Chart | 6 |
| Layout | 10 |
| Utility | 8 |
| **Total** | **89** |

---

## Components by Category

### Foundation (2)

| Name | File | Description | Complexity |
|------|------|-------------|------------|
| Typography | typography.tsx | Text styling utilities and heading components | Low |
| Container | container.tsx | Responsive container wrapper for page content | Low |

### Navigation (6)

| Name | File | Description | Complexity |
|------|------|-------------|------------|
| Tabs | tabs.tsx | Tabbed interface for switching content panels | Medium |
| StyledTabs | styled-tabs.tsx | Pre-styled tab variants | Medium |
| Breadcrumb | breadcrumb.tsx | Hierarchical navigation breadcrumb trail | Low |
| NavigationMenu | navigation-menu.tsx | Dropdown navigation menu with mega-menu support | High |
| Sidebar | sidebar.tsx | Collapsible sidebar navigation with nested items | High |
| Menubar | menubar.tsx | Horizontal menu bar with dropdown menus | High |

### Form (24)

| Name | File | Description | Complexity |
|------|------|-------------|------------|
| Button | button.tsx | Interactive button with variants, sizes, loading | Medium |
| Input | input.tsx | Text input with validation states | Low |
| InputPassword | input-password.tsx | Password input with show/hide toggle | Low |
| InputSearch | input-search.tsx | Search input with icon and clear button | Low |
| InputNumber | input-number.tsx | Numeric input with increment/decrement | Medium |
| InputOTP | input-otp.tsx | One-time password input with digit slots | Medium |
| InputGroup | input-group.tsx | Composite input with prefix/suffix addons | Medium |
| Textarea | textarea.tsx | Multi-line text input area | Low |
| Select | select.tsx | Dropdown select with search and options | Medium |
| Checkbox | checkbox.tsx | Checkbox for boolean/multiple selections | Low |
| RadioGroup | radio-group.tsx | Radio button group for single selection | Low |
| Switch | switch.tsx | Toggle switch for on/off settings | Low |
| Slider | slider.tsx | Range slider for numeric value selection | Low |
| DatePicker | date-picker.tsx | Calendar-based date selection | High |
| TimePicker | time-picker.tsx | Time selection input | Medium |
| Combobox | combobox.tsx | Searchable dropdown with autocomplete | High |
| Autocomplete | autocomplete.tsx | Text input with suggestion dropdown | High |
| MultiSelect | multi-select.tsx | Multiple selection dropdown with tags | High |
| ColorPicker | color-picker.tsx | Color selection with palette | Medium |
| FileUpload | file-upload.tsx | File upload with drag-and-drop | High |
| Label | label.tsx | Form field label with accessibility | Low |
| Form | form.tsx | Form wrapper with react-hook-form | High |
| FormError | form-error.tsx | Form error message display | Low |
| MultiStepForm | multi-step-form.tsx | Multi-step form wizard | Medium |
| InviteForm | invite-form.tsx | Team member invitation form | Medium |
| PasswordStrength | password-strength.tsx | Password strength indicator | Low |
| Rating | rating.tsx | Star rating input | Low |
| RoleSelector | role-selector.tsx | User role selection | Medium |

### Data Display (12)

| Name | File | Description | Complexity |
|------|------|-------------|------------|
| Card | card.tsx | Content container with header, content, footer | Medium |
| KpiCard | kpi-card.tsx | Key Performance Indicator card with trend | Medium |
| StatCard | stat-card.tsx | Statistics display card with change indicator | Medium |
| MemberCard | member-card.tsx | Team member profile card | Medium |
| Badge | badge.tsx | Status badge/pill with color variants | Low |
| Avatar | avatar.tsx | User avatar with image and fallback | Low |
| AvatarGroup | avatar-group.tsx | Stacked avatar group with overflow | Medium |
| Table | table.tsx | Basic table with header, body, rows | Low |
| DataTable | data-table/*.tsx | Advanced table with sorting, filtering, pagination | High |
| ActivityTimeline | activity-timeline.tsx | Vertical timeline for activity history | High |

**Card Sub-components:** CardHeader, CardContent, CardFooter, Badge, Stat, StatGroup, StyledLabel, FeatureItem, FeatureList, InfoNote, PageBadge, TemplatePageHeader, FeaturesCard

**DataTable Sub-components:** DataTablePagination, DataTableToolbar, DataTableColumnHeader

### Feedback (13)

| Name | File | Description | Complexity |
|------|------|-------------|------------|
| Alert | alert.tsx | Inline alert message with variants | Low |
| AlertDialog | alert-dialog.tsx | Confirmation dialog for destructive actions | Medium |
| Toast | toast.tsx | Transient notification toast message | Medium |
| Toaster | toaster.tsx | Toast container and provider | Low |
| Banner | banner.tsx | Full-width banner for announcements | Low |
| EmptyState | empty-state.tsx | Empty state placeholder with icon and CTA | Low |
| Progress | progress.tsx | Progress bar indicator | Low |
| Skeleton | skeleton.tsx | Loading placeholder skeleton | Low |
| Loading | loading.tsx | Loading spinner component | Low |
| NotificationCenter | notification-center.tsx | Full notification center with grouping | High |
| NotificationList | notification-list.tsx | Simple notification list | Medium |
| NotificationBadge | notification-badge.tsx | Badge showing unread count | Low |
| StatusIndicator | status-indicator.tsx | Status dot indicator | Low |

### Overlay (8)

| Name | File | Description | Complexity |
|------|------|-------------|------------|
| Dialog | dialog.tsx | Modal dialog with header, content, footer | Medium |
| Sheet | sheet.tsx | Slide-out drawer panel (side sheet) | Medium |
| Popover | popover.tsx | Floating popover content panel | Low |
| Tooltip | tooltip.tsx | Hover tooltip for additional information | Low |
| DropdownMenu | dropdown-menu.tsx | Dropdown menu with items, checkboxes | Medium |
| ContextMenu | context-menu.tsx | Right-click context menu | Medium |
| HoverCard | hover-card.tsx | Preview card on hover | Low |
| Command | command.tsx | Command palette / search dialog (cmdk) | High |

### Chart (6)

| Name | File | Description | Complexity |
|------|------|-------------|------------|
| Sparkline | sparkline.tsx | Inline mini line chart for trends | Medium |
| PieChart | pie-chart.tsx | Pie chart for proportional data | Medium |
| DonutChart | donut-chart.tsx | Donut chart with center content | Medium |
| Gauge | gauge.tsx | Gauge/meter for single metrics | Medium |
| FunnelChart | funnel-chart.tsx | Funnel chart for conversions | Medium |
| Heatmap | heatmap.tsx | Heatmap grid visualization | High |

**Sparkline Sub-components:** SparklineCard, SparklineGroup

**DonutChart Sub-components:** MetricDonutChart, ProgressDonutChart

### Layout (10)

| Name | File | Description | Complexity |
|------|------|-------------|------------|
| Section | section.tsx | Page section wrapper with spacing | Low |
| Grid | grid.tsx | Responsive grid layout | Low |
| Stack | stack.tsx | Vertical/horizontal stack layout | Low |
| Separator | separator.tsx | Visual separator line | Low |
| PageWrapper | page-wrapper.tsx | Page layout wrapper | Low |
| ScrollArea | scroll-area.tsx | Custom scrollable container | Low |
| AspectRatio | aspect-ratio.tsx | Maintain aspect ratio | Low |
| Accordion | accordion.tsx | Collapsible accordion panels | Medium |
| Collapsible | collapsible.tsx | Single collapsible section | Low |

### Utility (8)

| Name | File | Description | Complexity |
|------|------|-------------|------------|
| CodeBlock | code-block.tsx | Syntax-highlighted code with copy | Medium |
| MarkdownEditor | markdown-editor.tsx | Markdown text editor with preview | High |
| MarkdownViewer | markdown-viewer.tsx | Markdown content renderer | Medium |
| RichTextEditor | rich-text-editor.tsx | WYSIWYG rich text editor | High |
| ImageUploader | image-uploader.tsx | Image upload with preview and cropping | High |
| Lightbox | lightbox.tsx | Image lightbox/gallery viewer | Medium |
| Calendar | calendar.tsx | Calendar grid for date selection | High |
| Pagination | pagination.tsx | Page navigation controls | Medium |

---

## Complexity Distribution

| Level | Count | Percentage |
|-------|-------|------------|
| Low | 42 | 47% |
| Medium | 33 | 37% |
| High | 14 | 16% |

---

## Key Dependencies

| Dependency | Used By |
|------------|---------|
| @radix-ui/* | Most overlays, form controls |
| @tanstack/react-table | DataTable |
| react-hook-form | Form |
| cmdk | Command |
| react-day-picker | Calendar, DatePicker |
| class-variance-authority | Button, Alert |
| prism-react-renderer | CodeBlock |

---

## Theme Compliance

All components use the `mode` object from `@/design-system` for:
- `mode.radius` - Border radius
- `mode.font` - Font family
- `mode.textTransform` - Text transformation

No hardcoded colors - all use design tokens from globals.css.

---

*Generated as part of Component Value Audit. See `COMPONENT_VALUE_AUDIT.md` for methodology.*
