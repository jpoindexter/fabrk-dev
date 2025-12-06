# Input Components Audit

**Files:**
- `src/components/ui/input.tsx` (94 lines)
- `src/components/ui/input-password.tsx` (62 lines)
- `src/components/ui/input-search.tsx` (95 lines)
- `src/components/ui/input-number.tsx` (168 lines)
- `src/components/ui/input-otp.tsx` (93 lines)
- `src/components/ui/input-group.tsx` (232 lines)

**Last Updated:** 2025-12-05

---

## Component Overview

Comprehensive input system covering:
1. **Input** - Base text input with validation states
2. **InputPassword** - Password input with visibility toggle
3. **InputSearch** - Search input with icon and clear button
4. **InputNumber** - Number input with increment/decrement controls
5. **InputOTP** - One-time password input with slots
6. **InputGroup** - Composite input with addons, buttons, and separators

---

## 1. Base Input Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `boolean` | `false` | Show error state (red border) |
| `success` | `boolean` | `false` | Show success state (green ring) |
| `loading` | `boolean` | `false` | Show loading spinner |
| `loadingText` | `string` | - | Screen reader text for loading |
| `disabled` | `boolean` | `false` | Disable input |

### Design Token Usage

| Context | Token | Notes |
|---------|-------|-------|
| Background | `bg-background` | Transparent |
| Border (default) | `border` | Default border color |
| Border (error) | `border-destructive` | Red border |
| Text | `text-foreground` | Default text |
| Placeholder | `text-muted-foreground` | Muted placeholder |
| Focus ring | `ring-primary` | Primary color ring |
| Focus ring (error) | `ring-destructive` | Red ring |
| Focus ring (success) | `ring-success` | Green ring |

**Status:** ✅ No hardcoded colors

### Spacing

| Property | Value | Notes |
|----------|-------|-------|
| Height | `h-8` (32px) | Follows 8-point grid |
| Horizontal padding | `px-4` (16px) | Follows 8-point grid |
| Vertical padding | `py-2` (8px) | Follows 8-point grid |
| Loading icon spacing | `pr-10` (40px) | When loading spinner present |

### Visual Mode System

| Mode Property | Applied To | Purpose |
|--------------|------------|---------|
| `mode.radius` | Input container | Sharp or rounded corners |
| `mode.font` | Input text | Monospace or standard font |
| `mode.font` | File input | File input font styling |

### States

| State | Visual Feedback | ARIA |
|-------|----------------|------|
| **Default** | Gray border | - |
| **Focus** | 2px primary ring | - |
| **Error** | Red border, red focus ring | `aria-invalid="true"` |
| **Success** | Green focus ring | - |
| **Disabled** | 50% opacity, no pointer | `disabled` attribute |
| **Loading** | Spinner right-aligned | `aria-busy="true"`, `aria-describedby` |

### Issues

1. **Inconsistent placeholder styling:**
   ```tsx
   "placeholder:text-muted-foreground placeholder:font-normal"
   ```
   - `font-normal` overrides `mode.font` for placeholders
   - Minor: Placeholder won't be monospace in terminal mode
   - Recommendation: Remove `placeholder:font-normal` or make conditional

**Status:** ✅ Production-ready with minor observation

---

## 2. InputPassword Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showToggle` | `boolean` | `true` | Show eye icon toggle |
| All `Input` props | - | - | Extends base Input |

### Design Token Usage

| Context | Token | Notes |
|---------|-------|-------|
| Eye icon | `text-muted-foreground` | Muted icon color |
| Button hover | `hover:bg-background/0` | Transparent (no hover bg) |

**Status:** ✅ No hardcoded colors

### Spacing

| Property | Value | Notes |
|----------|-------|-------|
| Icon padding | `px-4` (16px) | Right-aligned |
| Input right padding | `pr-10` (40px) | Space for toggle button |

### Accessibility

| Feature | Implementation |
|---------|---------------|
| Toggle aria-label | `"Hide password"` / `"Show password"` |
| Keyboard navigation | `tabIndex={-1}` (icon not in tab order) |
| Disabled state | Inherits from Input |

### Issues

1. **String quote inconsistency:**
   ```tsx
   <Eye className={`"h-4 w-4" text-muted-foreground`} />
   ```
   - Extra quotes around `"h-4 w-4"` are unnecessary
   - Should be: `className="h-4 w-4 text-muted-foreground"`
   - **Bug:** Malformed className string

2. **Button hover background:**
   ```tsx
   className={`hover:bg-background/0`}
   ```
   - Uses template literal but no interpolation
   - Should be: `className="hover:bg-background/0"`
   - Functional but inconsistent

**Status:** ⚠️ Functional but has formatting bugs

---

## 3. InputSearch Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value |
| `onValueChange` | `(value: string) => void` | - | Value change callback |
| `onClear` | `() => void` | - | Clear button callback |
| `loading` | `boolean` | `false` | Show loading spinner |
| `showClearButton` | `boolean` | `true` | Show clear (X) button |

### Design Token Usage

| Context | Token | Notes |
|---------|-------|-------|
| Search icon | `text-muted-foreground` | Left-aligned |
| Clear icon | `text-muted-foreground` | Right-aligned |
| Border | `border-border` | Explicit border color |
| Background | `bg-background` | Transparent |

**Status:** ✅ No hardcoded colors

### Spacing

| Property | Value | Notes |
|----------|-------|-------|
| Left padding | `pl-10` (40px) | Space for search icon |
| Right padding | `pr-10` (40px) | Space for clear/loading |
| Search icon position | `left-3` (12px) | Icon offset |
| Clear icon position | `right-3` (12px) | Icon offset |

### Icon Behavior

| State | Left Icon | Right Icon |
|-------|-----------|------------|
| **Empty** | Search (static) | None |
| **Has value** | Search (static) | X (clear button) |
| **Loading** | Search (static) | Spinner (animated) |

### Accessibility

| Feature | Implementation |
|---------|---------------|
| Clear button label | `aria-label="Clear search"` |
| Type attribute | `type="search"` (native browser search input) |
| Icon positioning | `pointer-events-none` (doesn't block input) |

### Issues

1. **Border token inconsistency:**
   - Uses `border-border` explicitly
   - Other inputs use default `border`
   - Recommendation: Standardize to default `border` for consistency

**Status:** ✅ Production-ready with minor observation

---

## 4. InputNumber Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Controlled value |
| `defaultValue` | `number` | `0` | Uncontrolled default |
| `onValueChange` | `(value: number \| undefined) => void` | - | Value change callback |
| `min` | `number` | - | Minimum value |
| `max` | `number` | - | Maximum value |
| `step` | `number` | `1` | Increment/decrement step |
| `precision` | `number` | - | Decimal precision |
| `showControls` | `boolean` | `true` | Show +/- buttons |

### Design Token Usage

| Context | Token | Notes |
|---------|-------|-------|
| Control buttons | `variant="ghost"` | Transparent buttons |
| Button icons | Default foreground | ChevronUp/ChevronDown |

**Status:** ✅ No hardcoded colors

### Spacing

| Property | Value | Notes |
|----------|-------|-------|
| Input right padding | `pr-8` (32px) | Space for controls |
| Control container | `right-1` (4px), `top-1` (4px) | Offset from edges |
| Button height | `h-4` (16px each) | Stacked vertically |
| Button width | `w-6` (24px) | Compact |

### Visual Mode Integration

**Unique Pattern:**
```tsx
mode.radius === "rounded-none" ? "rounded-b-none" : ""
mode.radius === "rounded-none" ? "rounded-t-none" : ""
```
- Removes specific corners for stacked buttons
- Only works if `mode.radius` is exactly `"rounded-none"`
- **Issue:** Fragile string comparison, breaks if mode changes

### Accessibility

| Feature | Implementation |
|---------|---------------|
| Role | `role="spinbutton"` |
| ARIA value | `aria-valuemin`, `aria-valuemax`, `aria-valuenow` |
| Keyboard shortcuts | Arrow Up/Down to increment/decrement |
| Button labels | `"Increment value"`, `"Decrement value"` |
| Tab order | `tabIndex={-1}` (buttons not in tab order) |

### Issues

1. **Mode radius string comparison:**
   ```tsx
   mode.radius === "rounded-none" ? "rounded-b-none" : ""
   ```
   - Assumes `mode.radius` is literal string `"rounded-none"`
   - Breaks if mode system changes to class objects
   - Recommendation: Use CSS-based approach or mode helper function

2. **Controlled/uncontrolled mixing:**
   - Component handles both controlled and uncontrolled state
   - Adds complexity but provides flexibility
   - Status: Acceptable for number input use case

**Status:** ⚠️ Production-ready but mode integration is fragile

---

## 5. InputOTP Component

### Props API

Extends `input-otp` library:

| Component | Purpose |
|-----------|---------|
| **InputOTP** | Root container |
| **InputOTPGroup** | Groups multiple slots |
| **InputOTPSlot** | Individual character slot |
| **InputOTPSeparator** | Visual separator (e.g., dot) |

### Design Token Usage

| Context | Token | Notes |
|---------|-------|-------|
| Slot border | `border-input` | Input border color |
| Slot text | Default foreground | Character display |
| Active ring | `ring-ring ring-offset-background` | Focus indicator |
| Caret | `bg-foreground` | Animated caret |

**Status:** ✅ No hardcoded colors

### Spacing

| Property | Value | Notes |
|----------|-------|-------|
| Slot size | `h-8 w-8` (32px) | Square slots |
| Gap | `gap-2` (8px) | Between slots |
| Text size | `text-xs` (12px) | Character size |

### Visual Mode Integration

**String Interpolation Issue:**
```tsx
`first:${mode.radius} first:border-l last:${mode.radius}`
```
- Attempts to apply radius to first/last slots
- **BUG:** Template literals in `className` don't work with Tailwind
- Should be: Dynamic class generation or `cn()` utility

**Correct Pattern:**
```tsx
cn(
  "border-y border-r",
  "first:border-l",
  mode.radius  // Applied to all slots
)
```

### Accessibility

| Feature | Implementation |
|---------|---------------|
| Separator role | `role="separator"` |
| Focus indicator | Active ring on current slot |
| Caret animation | Blinking caret in active slot |

### Issues

1. **Critical: Template literal className bug:**
   ```tsx
   `first:${mode.radius} first:border-l last:${mode.radius}`
   ```
   - Template literals are evaluated at runtime
   - Tailwind processes classes at build time
   - **Result:** Radius classes never applied
   - **Fix:** Use `cn()` with conditional logic

2. **Trailing empty strings:**
   ```tsx
   className={cn("...", className, "")}
   ```
   - Empty string at end of `cn()` calls
   - No functional impact but unnecessary
   - Minor: Code smell

**Status:** ⚠️ Has critical CSS bug affecting visual mode

---

## 6. InputGroup Component

### Architecture

7-part composition system:
1. **InputGroup** - Container with border/focus states
2. **InputGroupAddon** - Icon/text addon (4 alignment options)
3. **InputGroupButton** - Button inside input
4. **InputGroupText** - Text label inside input
5. **InputGroupInput** - Borderless input
6. **InputGroupTextarea** - Borderless textarea
7. **InputGroupSeparator** - Visual divider

### Props API

#### InputGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | - | Size variant |

#### InputGroupAddon

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | Addon position |

#### InputGroupButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` | `"xs"` | Button size |

### Design Token Usage

| Context | Token | Notes |
|---------|-------|-------|
| Group border | `border-input` | Input border color |
| Group background | `dark:bg-input/30` | Dark mode only |
| Focus ring | `ring-ring` | Active focus state |
| Error border | `border-destructive` | Error state |
| Error ring | `ring-destructive/20` / `ring-destructive/40` | Error focus |
| Addon text | `text-muted-foreground` | Muted text |

**Status:** ✅ No hardcoded colors

### Spacing

| Size | Height | Padding | Button Size |
|------|--------|---------|-------------|
| Default | `h-9` (36px) | Varies by addon | - |
| With textarea | `h-auto` | - | - |
| Addon (inline) | Auto | `pl-4` / `pr-4` (16px) | - |
| Addon (block) | Full width | `px-4 py-4` (16px) | - |
| Button xs | `h-6` (24px) | `px-2` (8px) | - |
| Button sm | `h-8` (32px) | `px-2.5` (10px) | - |
| Button icon-xs | `size-6` (24px) | `p-1` (4px) | - |
| Button icon-sm | `size-8` (32px) | `p-1` (4px) | - |

### Visual Mode Integration

| Mode Property | Applied To | Purpose |
|--------------|------------|---------|
| `mode.radius` | Group container | Sharp or rounded |
| `mode.font` | Addon text | Monospace or standard |
| `mode.font` | Button text | Monospace or standard |
| `mode.font` | Group text | Monospace or standard |
| `mode.radius` | Buttons | Sharp or rounded |
| `mode.radius` | kbd elements | Applies to `[&>kbd]` |

### Advanced Features

#### 1. Alignment System

```tsx
// Inline start (left)
<InputGroupAddon align="inline-start">
  <Search />
</InputGroupAddon>

// Inline end (right)
<InputGroupAddon align="inline-end">
  <Button>Go</Button>
</InputGroupAddon>

// Block start (top)
<InputGroupAddon align="block-start">
  <span>Email</span>
</InputGroupAddon>

// Block end (bottom)
<InputGroupAddon align="block-end">
  <span>@example.com</span>
</InputGroupAddon>
```

#### 2. Complex Layouts

**Search with button:**
```tsx
<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
  <InputGroupSeparator />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Search</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

**Email with suffix:**
```tsx
<InputGroup>
  <InputGroupInput placeholder="username" />
  <InputGroupText>@example.com</InputGroupText>
</InputGroup>
```

**Textarea with label:**
```tsx
<InputGroup>
  <InputGroupAddon align="block-start">
    <Label>Message</Label>
  </InputGroupAddon>
  <InputGroupTextarea placeholder="Type here..." />
</InputGroup>
```

#### 3. Focus Management

Container-level focus state:
```tsx
"has-[[data-slot=input-group-control]:focus-visible]:ring-ring"
```
- Focus on nested input applies ring to container
- Unified visual feedback

#### 4. Error State Propagation

```tsx
"has-[[data-slot][aria-invalid=true]]:border-destructive"
```
- Error state on input propagates to container
- Red border + red focus ring

### Accessibility

| Feature | Implementation |
|---------|---------------|
| Group role | `role="group"` |
| Addon clickable | Focuses input when clicked |
| Keyboard support | Enter/Space focuses input |
| Button accessibility | Inherits from Button component |

### Issues

1. **Complex selector patterns:**
   ```tsx
   "has-[>[data-align=inline-start]]:[&>input]:pl-2"
   ```
   - Uses `:has()` and descendant selectors
   - Works in modern browsers but complex
   - Status: Acceptable for advanced composition

2. **String template in className:**
   ```tsx
   `[&>kbd]:${mode.radius}`
   ```
   - Same template literal issue as InputOTP
   - **Bug:** Radius not applied to kbd elements
   - Affects keyboard shortcut display

3. **Addon click handler:**
   ```tsx
   onClick={(e) => {
     if ((e.target as HTMLElement).closest("button")) {
       return;
     }
     e.currentTarget.parentElement?.querySelector("input")?.focus();
   }}
   ```
   - Uses `closest()` and `querySelector()`
   - Works but not type-safe
   - Recommendation: Use React refs

**Status:** ⚠️ Production-ready but has template literal bug

---

## Cross-Component Consistency

### Height Standards

| Component | Desktop Height | Mobile Height | Notes |
|-----------|----------------|---------------|-------|
| Input | `h-8` (32px) | `h-8` (32px) | Consistent |
| InputPassword | `h-8` (32px) | `h-8` (32px) | Wraps Input |
| InputSearch | `h-8` (32px) | `h-8` (32px) | Custom input |
| InputNumber | Inherits Input | Inherits Input | Wraps Input |
| InputOTP Slot | `h-8` (32px) | `h-8` (32px) | Square slots |
| InputGroup | `h-9` (36px) | `h-9` (36px) | ⚠️ Slightly taller |

**Observation:** InputGroup is 4px taller than standard inputs. Intentional for border/padding, but creates slight inconsistency.

### Focus States

| Component | Focus Indicator | Ring Width | Ring Color |
|-----------|----------------|------------|------------|
| Input | Ring | 2px | `ring-primary` |
| InputSearch | Ring | 2px | `ring-primary` |
| InputNumber | Inherits Input | 2px | `ring-primary` |
| InputOTP | Ring | 2px | `ring-ring` |
| InputGroup | Ring | 1px | `ring-ring` ⚠️ |

**Inconsistency:** InputGroup uses 1px ring vs 2px on other inputs.

### Border Tokens

| Component | Border Token | Notes |
|-----------|-------------|-------|
| Input | `border` | Default |
| InputSearch | `border-border` | ⚠️ Explicit |
| InputNumber | Inherits Input | Default |
| InputOTP | `border-input` | ⚠️ Different |
| InputGroup | `border-input` | ⚠️ Different |

**Inconsistency:** Three different border tokens used across components.

---

## Terminal Aesthetic Compliance

| Component | Monospace Font | Sharp Corners | Status |
|-----------|---------------|---------------|--------|
| Input | `mode.font` ✅ | `mode.radius` ✅ | Compliant |
| InputPassword | Inherits ✅ | Inherits ✅ | Compliant |
| InputSearch | `mode.font` ✅ | `mode.radius` ✅ | Compliant |
| InputNumber | Inherits ✅ | ⚠️ Fragile | Partial |
| InputOTP | `mode.font` ✅ | ⚠️ Broken | Partial |
| InputGroup | `mode.font` ✅ | ⚠️ Partial | Partial |

**Issues:**
- InputNumber: String comparison for radius
- InputOTP: Template literal doesn't apply radius
- InputGroup: Template literal for kbd radius

---

## Summary of Issues

### Critical Bugs

1. **InputOTP template literal:** Radius classes never applied
2. **InputGroup kbd radius:** Same template literal issue
3. **InputPassword className quotes:** Malformed string

### Design Inconsistencies

4. **Border tokens:** Three variants (`border`, `border-border`, `border-input`)
5. **Focus ring width:** 1px vs 2px (InputGroup vs others)
6. **Input heights:** 32px vs 36px (standard vs InputGroup)

### Fragile Patterns

7. **InputNumber mode check:** String comparison breaks if mode changes
8. **Template literals in className:** Breaks Tailwind JIT compilation
9. **InputGroup click handlers:** DOM traversal instead of refs

### Minor Issues

10. **Placeholder font:** Overrides `mode.font` with `font-normal`
11. **Trailing empty strings:** In `cn()` calls
12. **String templates:** Used where plain strings suffice

---

## Recommendations

### High Priority

1. **Fix template literal bugs** in InputOTP and InputGroup
   - Replace `` `first:${mode.radius}` `` with `cn()` conditional logic
   - Ensure radius classes are static for Tailwind JIT

2. **Standardize border tokens**
   - Use `border` for all input components
   - Update InputSearch, InputOTP, InputGroup

3. **Fix InputPassword className bug**
   - Remove extra quotes: `className="h-4 w-4 text-muted-foreground"`

### Medium Priority

4. **Standardize focus ring width**
   - Use `ring-2` consistently across all inputs
   - Update InputGroup to match

5. **Fix InputNumber mode integration**
   - Use CSS-based approach for stacked button corners
   - Avoid string comparison on `mode.radius`

6. **Document height discrepancy**
   - Clarify why InputGroup is 36px vs 32px
   - Consider standardizing to 32px

### Low Priority

7. **Remove trailing empty strings** in `cn()` calls
8. **Replace DOM traversal** with React refs in InputGroup
9. **Fix placeholder font inheritance** in base Input

---

## File Metrics

| File | Lines | Components | Status |
|------|-------|------------|--------|
| input.tsx | 94 | 1 | ✅ |
| input-password.tsx | 62 | 1 | ⚠️ Has bug |
| input-search.tsx | 95 | 1 | ✅ |
| input-number.tsx | 168 | 1 | ⚠️ Fragile |
| input-otp.tsx | 93 | 4 | ⚠️ Has bug |
| input-group.tsx | 232 | 7 | ⚠️ Has bug |

**Total:** 744 lines, 15 components

---

## Overall Status

**Status:** ⚠️ Production-ready with critical fixes needed

The input system is comprehensive and well-architected, but has several critical bugs related to template literals in className strings that break Tailwind JIT compilation. These must be fixed before Visual Mode System will work correctly.

**Strengths:**
1. Comprehensive variant coverage
2. Strong accessibility features
3. Consistent spacing (8-point grid)
4. Design token usage (with minor inconsistencies)

**Critical Fixes Required:**
1. InputOTP radius template literal
2. InputGroup kbd radius template literal
3. InputPassword className quotes

**Recommendation:** Fix critical bugs, then standardize border tokens and focus ring widths. After fixes, all components will be production-ready.
