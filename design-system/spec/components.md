# Component Specifications

> Token mappings, variants, and patterns for all UI components.

---

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  ORGANISMS (Complex, composed)                              │
│  DataTable, Form, Modal, Navigation, Sidebar                │
├─────────────────────────────────────────────────────────────┤
│  MOLECULES (Simple combinations)                            │
│  Card, InputGroup, FormField, AlertDialog, Menu             │
├─────────────────────────────────────────────────────────────┤
│  ATOMS (Primitive, single-purpose)                          │
│  Button, Input, Badge, Avatar, Icon, Separator              │
└─────────────────────────────────────────────────────────────┘
```

---

## Atoms

### Button

**Role:** Primary interactive element for actions.

**Token Mappings:**

| Property | Token | Notes |
|----------|-------|-------|
| Font family | `typography.family.{theme}` | sans (modern), mono (terminal) |
| Font size | `typography.size.sm` | 14px |
| Font weight | `typography.weight.semibold` | 600 |
| Line height | `typography.leading.normal` | 1.5 |
| Letter spacing | `typography.tracking.wide` | +0.025em (terminal only) |
| Border radius | `radius.semantic.button` | Theme-resolved |
| Focus ring | `focus.ring-width`, `focus.ring-color` | 2px, primary |
| Min height | `accessibility.touch-target.min` | 44px mobile |

**Variants:**

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| `primary` | `color.bg.accent` | `color.text.inverse` | none |
| `secondary` | `color.bg.muted` | `color.text.primary` | none |
| `outline` | transparent | `color.text.primary` | `color.border.default` |
| `ghost` | transparent | `color.text.primary` | none |
| `danger` | `color.bg.danger` | `color.text.inverse` | none |
| `link` | transparent | `color.text.accent` | none |

**Sizes:**

| Size | Padding | Height | Font Size |
|------|---------|--------|-----------|
| `sm` | `space.2` x `space.3` | 32px | `typography.size.xs` |
| `md` | `space.2` x `space.4` | 40px | `typography.size.sm` |
| `lg` | `space.3` x `space.6` | 48px | `typography.size.base` |
| `xl` | `space.4` x `space.8` | 56px | `typography.size.lg` |
| `icon` | `space.2` | 40px | — |

**States:**
- `hover`: `color.bg.accent-hover` (or +5% darken)
- `active`: +10% darken
- `disabled`: 50% opacity, no pointer events
- `loading`: Show spinner, disable interaction

**Responsive:**
- Full width on mobile (`< sm`), auto width on tablet+
- Stack vertically in button groups on mobile

---

### Input

**Role:** Text entry field for forms.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Font family | `typography.family.{theme}` |
| Font size | `typography.size.sm` |
| Font weight | `typography.weight.normal` |
| Background | `color.bg.surface` |
| Text | `color.text.primary` |
| Placeholder | `color.text.muted` |
| Border | `color.border.default` (1px) |
| Border radius | `radius.semantic.input` |
| Padding | `space.2` x `space.3` |
| Height | 40px (md) |
| Focus ring | `focus.ring-width`, `focus.ring-color` |

**Variants:**

| Variant | Notes |
|---------|-------|
| `default` | Standard text input |
| `error` | Red border, error icon |
| `success` | Green border, check icon |
| `disabled` | Reduced opacity, readonly |

**Sizes:**

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 32px | `space.1.5` x `space.2` | `typography.size.xs` |
| `md` | 40px | `space.2` x `space.3` | `typography.size.sm` |
| `lg` | 48px | `space.2.5` x `space.4` | `typography.size.base` |

**States:**
- `focus`: Focus ring, border becomes `color.border.accent`
- `disabled`: 50% opacity, no cursor
- `error`: `color.border.danger`
- `readonly`: Slightly muted background

---

### Badge

**Role:** Status indicator, label, or count.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Font family | `typography.family.{theme}` |
| Font size | `typography.size.xs` |
| Font weight | `typography.weight.semibold` |
| Border radius | `radius.semantic.badge` |
| Padding | `space.1` x `space.2` |
| Text transform | `uppercase` (theme-dependent) |

**Variants:**

| Variant | Background | Text |
|---------|------------|------|
| `default` | `color.bg.muted` | `color.text.secondary` |
| `primary` | `color.bg.accent-muted` | `color.text.accent` |
| `success` | `color.bg.success-muted` | `color.text.success` |
| `warning` | `color.bg.warning-muted` | `color.text.warning` |
| `danger` | `color.bg.danger-muted` | `color.text.danger` |
| `outline` | transparent | `color.text.secondary` |

**Sizes:**

| Size | Padding | Font Size |
|------|---------|-----------|
| `sm` | `space.0.5` x `space.1.5` | `typography.size.2xs` |
| `md` | `space.1` x `space.2` | `typography.size.xs` |
| `lg` | `space.1.5` x `space.3` | `typography.size.sm` |

---

### Avatar

**Role:** User or entity representation.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Border radius | `radius.semantic.avatar` |
| Border | `color.border.default` (optional) |
| Background (fallback) | `color.bg.muted` |
| Text (fallback) | `color.text.secondary` |
| Font weight (fallback) | `typography.weight.medium` |

**Sizes:**

| Size | Dimensions | Font Size |
|------|------------|-----------|
| `xs` | 24px | `typography.size.2xs` |
| `sm` | 32px | `typography.size.xs` |
| `md` | 40px | `typography.size.sm` |
| `lg` | 48px | `typography.size.base` |
| `xl` | 64px | `typography.size.lg` |
| `2xl` | 96px | `typography.size.2xl` |

**Variants:**
- `image`: Show image
- `initials`: Show first letters
- `icon`: Show placeholder icon

---

### Icon

**Role:** Visual symbol for actions or concepts.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Color | Inherits from parent (`currentColor`) |
| Stroke width | 1.5px (default) |

**Sizes:**

| Size | Dimensions |
|------|------------|
| `xs` | 12px |
| `sm` | 16px |
| `md` | 20px |
| `lg` | 24px |
| `xl` | 32px |

---

### Separator

**Role:** Visual divider between content.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Background | `color.border.default` |
| Height (horizontal) | 1px |
| Width (vertical) | 1px |
| Margin | `space.4` (default) |

**Variants:**
- `horizontal`: Full width, 1px height
- `vertical`: Full height, 1px width

---

### Label

**Role:** Form field label.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Font family | `typography.family.{theme}` |
| Font size | `typography.size.sm` |
| Font weight | `typography.weight.medium` |
| Color | `color.text.primary` |
| Margin bottom | `space.1.5` |

**Variants:**
- `required`: Shows asterisk in `color.text.danger`
- `optional`: Shows "(optional)" in `color.text.muted`

---

## Molecules

### Card

**Role:** Container for grouped content.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Background | `color.bg.surface` |
| Border | `color.border.default` (1px) |
| Border radius | `radius.semantic.card` |
| Shadow | `shadow.sm` (theme-dependent) |
| Padding | `space.component.padding.md` |

**Subcomponents:**

| Part | Tokens |
|------|--------|
| `CardHeader` | `padding: space.4`, `border-bottom: color.border.muted` |
| `CardTitle` | `typography.size.lg`, `typography.weight.semibold` |
| `CardDescription` | `typography.size.sm`, `color.text.muted` |
| `CardContent` | `padding: space.4` |
| `CardFooter` | `padding: space.4`, `border-top: color.border.muted` |

**Variants:**
- `default`: Standard card
- `outline`: Border only, no shadow
- `elevated`: More prominent shadow
- `interactive`: Hover state with scale/lift

---

### InputGroup

**Role:** Input with addons (icons, buttons).

**Token Mappings:**
- Inherits from `Input`
- Addons: `color.bg.muted`, `color.border.default`

**Structure:**
```
[Addon/Icon] [Input] [Addon/Button]
```

**Variants:**
- `addon-left`: Prepend addon
- `addon-right`: Append addon
- `addon-both`: Both sides

---

### FormField

**Role:** Complete form field with label, input, and help/error text.

**Structure:**
```
[Label]
[Input/Select/Textarea]
[Help Text / Error Message]
```

**Token Mappings:**

| Part | Token |
|------|-------|
| Label | See `Label` |
| Help text | `typography.size.xs`, `color.text.muted` |
| Error text | `typography.size.xs`, `color.text.danger` |
| Gap | `space.1.5` |

---

### Alert

**Role:** Important message or status.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Border radius | `radius.semantic.card` |
| Padding | `space.4` |
| Border | 1px left border (4px width) |
| Icon size | `icon.md` (20px) |

**Variants:**

| Variant | Background | Border | Icon |
|---------|------------|--------|------|
| `info` | `color.bg.info-muted` | `color.border.info` | Info icon |
| `success` | `color.bg.success-muted` | `color.border.success` | Check icon |
| `warning` | `color.bg.warning-muted` | `color.border.warning` | Warning icon |
| `danger` | `color.bg.danger-muted` | `color.border.danger` | Error icon |

---

### Menu / Dropdown

**Role:** List of actions or options.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Background | `color.bg.surface-raised` |
| Border | `color.border.default` |
| Border radius | `radius.md` |
| Shadow | `shadow.lg` |
| Min width | 180px |

**Menu Item:**

| Property | Token |
|----------|-------|
| Padding | `space.2` x `space.3` |
| Font size | `typography.size.sm` |
| Height | `accessibility.touch-target.min` (mobile) |
| Hover background | `color.bg.muted` |

**Subcomponents:**
- `MenuItem`: Action item
- `MenuItemDanger`: Destructive action (red text)
- `MenuSeparator`: Divider line
- `MenuLabel`: Non-interactive group header

---

### Tabs

**Role:** Organize content into switchable panels.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Tab font size | `typography.size.sm` |
| Tab font weight | `typography.weight.medium` |
| Tab padding | `space.2` x `space.4` |
| Active indicator | `color.border.accent` (2px bottom) |
| Inactive text | `color.text.muted` |
| Active text | `color.text.primary` |

**Variants:**
- `line`: Underline indicator
- `pills`: Background indicator
- `bordered`: Full border around active

---

### Tooltip

**Role:** Contextual information on hover.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Background | `color.bg.inverse` (dark) |
| Text | `color.text.inverse` |
| Border radius | `radius.sm` |
| Padding | `space.1.5` x `space.2` |
| Font size | `typography.size.xs` |
| Max width | 200px |
| Shadow | `shadow.md` |

---

## Organisms

### DataTable

**Role:** Display and interact with tabular data.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Header background | `color.bg.muted` |
| Header font weight | `typography.weight.medium` |
| Header font size | `typography.size.xs` |
| Cell padding | `space.3` x `space.4` |
| Cell font size | `typography.size.sm` |
| Row border | `color.border.muted` |
| Hover row | `color.bg.muted` |
| Selected row | `color.bg.accent-muted` |

**Subcomponents:**
- `TableHeader`: Column headers with sort indicators
- `TableBody`: Data rows
- `TableRow`: Individual row
- `TableCell`: Individual cell
- `TablePagination`: Page controls
- `TableToolbar`: Search, filters, bulk actions

---

### Modal / Dialog

**Role:** Focused interaction overlay.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Background | `color.bg.surface-raised` |
| Border radius | `radius.semantic.modal` |
| Shadow | `shadow.xl` |
| Backdrop | `color.bg.surface-overlay` |
| Max width | `container.sm` (480px default) |
| Padding | `space.6` |

**Subcomponents:**
- `DialogHeader`: Title + close button
- `DialogTitle`: `typography.size.lg`, `typography.weight.semibold`
- `DialogDescription`: `typography.size.sm`, `color.text.muted`
- `DialogContent`: Main content area
- `DialogFooter`: Action buttons (right-aligned)

---

### Navigation / Navbar

**Role:** Primary site navigation.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Height | 64px |
| Background | `color.bg.surface` |
| Border | `color.border.default` (bottom) |
| Logo height | 32px |
| Nav item padding | `space.2` x `space.4` |
| Nav item font size | `typography.size.sm` |
| Nav item font weight | `typography.weight.medium` |

**Responsive:**
- Desktop: Horizontal nav items
- Mobile: Hamburger → slide-out drawer

---

### Sidebar

**Role:** Secondary navigation for apps.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Width (expanded) | 240px |
| Width (collapsed) | 64px |
| Background | `color.bg.surface` |
| Border | `color.border.default` (right) |
| Item padding | `space.2` x `space.3` |
| Item height | 40px |
| Active item | `color.bg.accent-muted`, `color.text.accent` |
| Icon size | `icon.md` (20px) |

**Subcomponents:**
- `SidebarHeader`: Logo, collapse toggle
- `SidebarNav`: Navigation items
- `SidebarNavItem`: Individual nav link
- `SidebarNavGroup`: Collapsible group
- `SidebarFooter`: User menu, settings

---

### Form

**Role:** Collection of form fields with validation.

**Token Mappings:**

| Property | Token |
|----------|-------|
| Field gap | `space.6` |
| Section gap | `space.8` |
| Button spacing | `space.4` |

**Structure:**
```
[Form Header (optional)]
[FormField]
[FormField]
[FormSection]
  [FormField]
  [FormField]
[Form Actions]
  [Cancel Button] [Submit Button]
```

---

## Component Token Summary Table

| Component | Background | Text | Border | Radius | Shadow | Padding |
|-----------|------------|------|--------|--------|--------|---------|
| Button | `bg.accent` | `text.inverse` | — | `button` | — | `2` x `4` |
| Input | `bg.surface` | `text.primary` | `border.default` | `input` | — | `2` x `3` |
| Badge | `bg.muted` | `text.secondary` | — | `badge` | — | `1` x `2` |
| Card | `bg.surface` | — | `border.default` | `card` | `sm` | `4` |
| Alert | `bg.*-muted` | `text.*` | `border.*` | `card` | — | `4` |
| Modal | `bg.surface-raised` | — | — | `modal` | `xl` | `6` |
| Dropdown | `bg.surface-raised` | — | `border.default` | `md` | `lg` | — |
| Tooltip | `bg.inverse` | `text.inverse` | — | `sm` | `md` | `1.5` x `2` |
| Table | `bg.surface` | `text.primary` | `border.muted` | — | — | `3` x `4` |

---

## Responsive Patterns

### Button Groups

```
Mobile:    [Button Full Width]
           [Button Full Width]

Desktop:   [Button] [Button] [Button]
```

### Form Layouts

```
Mobile:    [Label]
           [Input Full Width]
           [Label]
           [Input Full Width]

Desktop:   [Label] [Input] [Label] [Input]
           2-column grid
```

### Cards

```
Mobile:    1 column, full width

Tablet:    2 columns

Desktop:   3-4 columns
```

### Navigation

```
Mobile:    Hamburger → Drawer

Desktop:   Horizontal navbar
```

---

## Accessibility Requirements

### All Interactive Components

- Focus visible (2px ring)
- Keyboard navigable
- ARIA roles and states
- Touch targets ≥ 44px on mobile

### Form Components

- Label association (`for`/`id`)
- Error messages linked via `aria-describedby`
- Required fields marked (`aria-required`)
- Invalid fields marked (`aria-invalid`)

### Modal/Dialog

- Focus trap
- Escape to close
- Return focus on close
- `aria-modal="true"`

### Menu/Dropdown

- Arrow key navigation
- Home/End for first/last
- Type-ahead selection
- `role="menu"`, `role="menuitem"`

---

*Component Specifications Version 1.0.0*
