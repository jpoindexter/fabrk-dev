# Accessibility (WCAG 2.1 AA)

Comprehensive WCAG 2.1 Level AA compliance requirements. Every component MUST meet these standards.

---

## WCAG 2.1 AA Quick Reference

| Principle | Guidelines | Key Requirements |
|-----------|------------|------------------|
| **Perceivable** | 1.1-1.4 | Alt text, captions, contrast, resize |
| **Operable** | 2.1-2.5 | Keyboard, timing, seizures, navigation |
| **Understandable** | 3.1-3.3 | Readable, predictable, error assistance |
| **Robust** | 4.1 | Compatible with assistive tech |

---

## 1. Perceivable (WCAG 1.x)

### 1.1.1 Non-text Content (Level A)

```tsx
// ALL images MUST have alt text
<Image src="/logo.png" alt="Fabrk logo - terminal-inspired design system" />

// Decorative images use empty alt
<Image src="/decoration.svg" alt="" aria-hidden="true" />

// Icons with meaning need labels
<AlertTriangle className="h-4 w-4" aria-label="Warning" />

// Icon-only buttons MUST have aria-label
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// SVG sprites need title
<svg role="img" aria-labelledby="icon-title">
  <title id="icon-title">Settings</title>
  <use href="#settings-icon" />
</svg>
```

### 1.3.1 Info and Relationships (Level A)

```tsx
// Form inputs MUST have associated labels
<Label htmlFor="email">[EMAIL]:</Label>
<Input id="email" type="email" aria-describedby="email-hint" />
<p id="email-hint" className="text-xs text-muted-foreground">
  We'll never share your email.
</p>

// Related form controls use fieldset/legend
<fieldset>
  <legend>[NOTIFICATION_PREFERENCES]:</legend>
  <Checkbox id="email-notif" />
  <Label htmlFor="email-notif">Email notifications</Label>
</fieldset>

// Tables need proper headers
<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Project Alpha</th>
      <td>Active</td>
    </tr>
  </tbody>
</table>

// Use semantic HTML (nav, main, aside, header, footer, article, section)
<main id="main-content">
  <article>
    <header><h1>Page Title</h1></header>
    <section aria-labelledby="section-1">
      <h2 id="section-1">Section Title</h2>
    </section>
  </article>
</main>
```

### 1.3.2 Meaningful Sequence (Level A)

```tsx
// DOM order MUST match visual order
// WRONG: Using CSS to reorder (confuses screen readers)
<div className="flex flex-col-reverse">  // Avoid

// CORRECT: Logical DOM order
<header>Header first</header>
<main>Main content second</main>
<footer>Footer last</footer>
```

### 1.3.3 Sensory Characteristics (Level A)

```tsx
// NEVER rely on color alone
// WRONG:
<p>Fields in red are required</p>

// CORRECT:
<Label>
  [EMAIL]: <span className="text-destructive">*</span>
  <span className="sr-only">(required)</span>
</Label>

// NEVER rely on position alone
// WRONG:
<p>Click the button on the right</p>

// CORRECT:
<p>Click the "Submit" button to continue</p>
```

### 1.4.1 Use of Color (Level A)

```tsx
// Error states need icon + color + text
<div className="text-destructive flex items-center gap-2">
  <AlertCircle className="h-4 w-4" aria-hidden="true" />
  <span>[ERROR]: Invalid email format</span>
</div>

// Links need more than color
<a className="underline hover:text-foreground">Link text</a>

// Status indicators need labels
<Badge variant="success" className="flex items-center gap-1">
  <CheckCircle className="h-3 w-3" aria-hidden="true" />
  <span>Active</span>
</Badge>
```

### 1.4.3 Contrast (Level AA) (CRITICAL)

| Content Type | Minimum Ratio | Example |
|--------------|---------------|---------|
| Normal text (<18px) | 4.5:1 | Body text, labels |
| Large text (≥18px/14px bold) | 3:1 | Headings, buttons |
| UI components | 3:1 | Focus rings, borders |
| Graphical objects | 3:1 | Charts, icons |
| Decorative | None | Background patterns |

```tsx
// Design tokens are pre-validated for contrast
// ALWAYS use tokens, never hardcode colors

// Check contrast with:
// - Chrome DevTools > Elements > Contrast
// - WebAIM Contrast Checker
// - axe DevTools extension
```

### 1.4.4 Resize Text (Level AA)

```tsx
// Use relative units (rem, em), not px for text
// Text MUST be resizable to 200% without loss of content

// CORRECT:
className="text-sm"   // Uses rem
className="text-base"

// AVOID for text:
style={{ fontSize: '14px' }}  // Fixed pixels

// Container MUST NOT clip on zoom
className="overflow-auto"  // Allow scroll if needed
```

### 1.4.10 Reflow (Level AA)

```tsx
// Content MUST reflow at 320px width (400% zoom on 1280px)
// No horizontal scrolling for text content

// CORRECT: Responsive design
<div className="container mx-auto px-4 md:px-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Test at: Chrome DevTools > Device Toolbar > 320px width
```

### 1.4.11 Non-text Contrast (Level AA)

```tsx
// UI components need 3:1 against background
// - Focus indicators
// - Form field boundaries
// - Icons conveying information

// CORRECT: Visible borders
<Input className="border-input" />  // Border visible against bg

// WRONG: Low contrast border
<Input className="border-gray-200" />  // May fail on light backgrounds
```

### 1.4.12 Text Spacing (Level AA)

```tsx
// Content MUST remain usable when users apply:
// - Line height: 1.5x font size
// - Paragraph spacing: 2x font size
// - Letter spacing: 0.12x font size
// - Word spacing: 0.16x font size

// DON'T set fixed heights on text containers
// WRONG:
<p className="h-20">Text that might wrap</p>

// CORRECT:
<p className="min-h-fit">Text that might wrap</p>
```

---

## 2. Operable (WCAG 2.x)

### 2.1.1 Keyboard (Level A) (CRITICAL)

```tsx
// ALL functionality MUST be keyboard accessible

// Interactive elements must be focusable
<button>Focusable by default</button>
<a href="/page">Focusable by default</a>
<input />  // Focusable by default

// Custom interactive elements need tabIndex
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom button
</div>

// BANNED: Click handlers on non-interactive elements without keyboard
<div onClick={handleClick}>  // WRONG: Not keyboard accessible
```

### 2.1.2 No Keyboard Trap (Level A)

```tsx
// Focus MUST be able to leave any component

// Modals need focus trap while open
<Dialog>
  <DialogContent>
    {/* Focus cycles within modal */}
    {/* ESC closes modal and returns focus */}
  </DialogContent>
</Dialog>

// ALWAYS provide escape route
<Dialog>
  <DialogClose>Close</DialogClose>  // Always include close button
</Dialog>
```

### 2.4.1 Bypass Blocks (Level A)

```tsx
// Skip links for main content
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2"
>
  Skip to main content
</a>

// Landmark regions for screen reader navigation
<header role="banner">
<nav role="navigation">
<main role="main" id="main-content">
<footer role="contentinfo">
```

### 2.4.3 Focus Order (Level A)

```tsx
// Tab order MUST match visual reading order

// NEVER use tabIndex > 0
// WRONG:
tabIndex={5}  // Creates confusing tab order

// CORRECT:
tabIndex={0}   // In natural DOM order
tabIndex={-1}  // Programmatically focusable only

// Modal focus management
const modalRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();  // Move focus to modal
  }
}, [isOpen]);
```

### 2.4.6 Headings and Labels (Level AA)

```tsx
// Headings MUST describe their section
<h1>Dashboard</h1>
<h2>Recent Activity</h2>
<h3>This Week</h3>

// Labels MUST describe their input
<Label htmlFor="search">[SEARCH]:</Label>
<Input id="search" placeholder="Search projects..." />

// Form groups need descriptive legends
<fieldset>
  <legend>[BILLING_ADDRESS]:</legend>
  {/* Address fields */}
</fieldset>
```

### 2.4.7 Focus Visible (Level AA) (CRITICAL)

```tsx
// Focus indicator MUST be visible

// REQUIRED on all interactive elements
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// BANNED: Removing outline without replacement
className="outline-none"  // NEVER without focus-visible alternative
className="focus:outline-none"  // NEVER without focus-visible alternative

// Custom focus styles allowed if clearly visible
className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
```

### 2.5.3 Label in Name (Level A)

```tsx
// Accessible name MUST include visible text

// CORRECT: aria-label matches visible text
<Button aria-label="Submit form">> SUBMIT</Button>  // "SUBMIT" in aria-label

// WRONG: Mismatch between visible and accessible name
<Button aria-label="Send data">> SUBMIT</Button>  // Confusing for voice control
```

---

## 3. Understandable (WCAG 3.x)

### 3.1.1 Language of Page (Level A)

```tsx
// Set page language
<html lang="en">

// Override for foreign language content
<p>The French word for hello is <span lang="fr">bonjour</span>.</p>
```

### 3.2.1 On Focus (Level A)

```tsx
// Focus MUST NOT cause unexpected changes

// WRONG: Auto-submit on focus
<Select onFocus={() => submitForm()}>

// WRONG: Open modal on focus
<Button onFocus={() => openModal()}>

// CORRECT: Require explicit action
<Select onChange={handleChange}>
<Button onClick={() => openModal()}>
```

### 3.2.2 On Input (Level A)

```tsx
// Input MUST NOT cause unexpected changes without warning

// WRONG: Auto-navigation on select
<Select onChange={() => navigate('/new-page')}>

// CORRECT: Require submit action
<Select onChange={setFilter}>
<Button onClick={() => applyFilterAndNavigate()}>> APPLY</Button>
```

### 3.3.1 Error Identification (Level A)

```tsx
// Errors MUST be identified and described

<div>
  <Label htmlFor="email">[EMAIL]:</Label>
  <Input
    id="email"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" className="text-destructive font-mono text-xs mt-1" role="alert">
      [ERROR]: Please enter a valid email address
    </p>
  )}
</div>
```

### 3.3.2 Labels or Instructions (Level A)

```tsx
// Inputs need clear labels and instructions

<div className="space-y-1">
  <Label htmlFor="password">[PASSWORD]:</Label>
  <Input
    id="password"
    type="password"
    aria-describedby="password-requirements"
  />
  <p id="password-requirements" className="text-xs text-muted-foreground">
    Must be at least 8 characters with one number and one symbol.
  </p>
</div>
```

### 3.3.3 Error Suggestion (Level AA)

```tsx
// Provide specific correction suggestions

// WRONG: Generic error
<p>[ERROR]: Invalid input</p>

// CORRECT: Specific suggestion
<p>[ERROR]: Email must include @ symbol. Example: user@example.com</p>
```

### 3.3.4 Error Prevention (Level AA)

```tsx
// For legal/financial actions, provide:
// 1. Reversibility
// 2. Checking opportunity
// 3. Confirmation

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">> DELETE_ACCOUNT</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>[WARNING]: Delete Account?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. All your data will be permanently deleted.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>> CANCEL</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive">> DELETE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## 4. Robust (WCAG 4.x)

### 4.1.1 Parsing (Level A)

```tsx
// Valid, well-formed HTML
// - Unique IDs
// - Proper nesting
// - Complete start/end tags

// Run: npm run lint (includes HTML validation)
```

### 4.1.2 Name, Role, Value (Level A)

```tsx
// Custom components need ARIA

// Custom checkbox
<div
  role="checkbox"
  aria-checked={checked}
  tabIndex={0}
  onClick={toggle}
  onKeyDown={handleKeyDown}
>

// Custom switch
<button
  role="switch"
  aria-checked={enabled}
  onClick={toggle}
>

// Custom combobox
<div role="combobox" aria-expanded={isOpen} aria-haspopup="listbox">
  <input aria-controls="listbox-id" aria-activedescendant={activeId} />
  <ul role="listbox" id="listbox-id">
    <li role="option" id="opt-1" aria-selected={selected === 1}>
```

---

## 5. ARIA Best Practices

```tsx
// FIRST rule of ARIA: Don't use ARIA if native HTML works
// WRONG:
<div role="button" tabIndex={0}>Click</div>

// CORRECT:
<button>Click</button>

// Common ARIA patterns:

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}  {/* Announced when changes */}
</div>

// Loading states
<div aria-busy={isLoading}>
  {isLoading ? <Skeleton /> : <Content />}
</div>

// Expanded/collapsed
<button aria-expanded={isOpen} aria-controls="panel-id">
  Toggle Panel
</button>
<div id="panel-id" hidden={!isOpen}>
  Panel content
</div>

// Tabs
<div role="tablist">
  <button role="tab" aria-selected={active === 0} aria-controls="panel-0">Tab 1</button>
</div>
<div role="tabpanel" id="panel-0" aria-labelledby="tab-0">

// Required form fields
<Input aria-required="true" />

// Disabled vs readonly
<Input disabled />        // aria-disabled="true" automatic
<Input readOnly />        // aria-readonly="true" automatic
```

---

## 6. Testing Checklists

### Screen Reader Testing

- [ ] All images have descriptive alt text
- [ ] All form fields have associated labels
- [ ] All buttons and links have accessible names
- [ ] Headings create logical outline
- [ ] Tables have proper headers
- [ ] Dynamic content announced via live regions
- [ ] Focus management in modals works correctly
- [ ] Error messages are announced
- [ ] Status changes are announced

### Keyboard Testing

- [ ] All interactive elements reachable via Tab
- [ ] Focus indicator clearly visible
- [ ] Tab order matches visual order
- [ ] Modals trap focus correctly
- [ ] ESC closes modals/dropdowns
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate within components
- [ ] No keyboard traps

### Visual Testing

- [ ] Contrast meets 4.5:1 for text
- [ ] Contrast meets 3:1 for UI components
- [ ] Color is never sole indicator
- [ ] Text resizes to 200% without clipping
- [ ] Content reflows at 320px width
- [ ] Focus indicators clearly visible

---

## 7. Color Blindness Considerations

| Type | Affected Colors | Percentage |
|------|-----------------|------------|
| Deuteranopia | Red-Green | 6% of men |
| Protanopia | Red-Green | 2% of men |
| Tritanopia | Blue-Yellow | 0.001% |
| Achromatopsia | All | 0.003% |

### Design Guidelines

```tsx
// NEVER convey information by color alone
// Always pair color with:
// - Icons
// - Text labels
// - Patterns or shapes

// ✅ CORRECT: Color + icon + text
<div className="text-destructive flex items-center gap-2">
  <AlertCircle className="h-4 w-4" />
  <span>[ERROR]: Invalid email</span>
</div>

// ❌ WRONG: Color only
<p className="text-destructive">Invalid email</p>

// Test with:
// - Chrome DevTools > Rendering > Emulate vision deficiencies
// - Stark browser extension
// - Color Oracle (desktop app)
```

---

## 8. Reduced Motion Support

```tsx
// REQUIRED: Respect prefers-reduced-motion
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="motion-reduce:transform-none"
/>

// Tailwind motion-safe and motion-reduce utilities
className="motion-safe:animate-fadeIn"
className="motion-reduce:animate-none"

// CSS media query approach
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Quick Reference

### Semantic HTML Elements

| Element | Use |
|---------|-----|
| `<header>` | Page or section header |
| `<nav>` | Navigation links |
| `<main>` | Main content (one per page) |
| `<article>` | Self-contained content |
| `<section>` | Thematic grouping |
| `<aside>` | Supplementary content |
| `<footer>` | Page or section footer |
| `<button>` | Clickable actions |
| `<a href>` | Navigation links |

### Common ARIA Roles

| Role | Use |
|------|-----|
| `button` | Clickable element |
| `link` | Navigation element |
| `checkbox` | Toggle option |
| `radio` | Single selection |
| `switch` | On/off toggle |
| `tab/tabpanel` | Tabbed interface |
| `dialog` | Modal dialog |
| `alert` | Important message |
| `status` | Status update |
| `progressbar` | Progress indicator |

### Focus Management

```tsx
// Move focus to modal on open
useEffect(() => {
  if (isOpen) dialogRef.current?.focus();
}, [isOpen]);

// Return focus on close
useEffect(() => {
  const prev = document.activeElement;
  return () => (prev as HTMLElement)?.focus();
}, []);

// Trap focus in modal
// Use @radix-ui/react-dialog or similar
```
