# Accessibility: Operable (WCAG 2.x)

User interface components and navigation must be operable.

---

## 2.1.1 Keyboard (Level A) (CRITICAL)

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

---

## 2.1.2 No Keyboard Trap (Level A)

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

---

## 2.4.1 Bypass Blocks (Level A)

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

---

## 2.4.3 Focus Order (Level A)

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

---

## 2.4.6 Headings and Labels (Level AA)

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

---

## 2.4.7 Focus Visible (Level AA) (CRITICAL)

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

---

## 2.5.3 Label in Name (Level A)

```tsx
// Accessible name MUST include visible text

// CORRECT: aria-label matches visible text
<Button aria-label="Submit form">> SUBMIT</Button>  // "SUBMIT" in aria-label

// WRONG: Mismatch between visible and accessible name
<Button aria-label="Send data">> SUBMIT</Button>  // Confusing for voice control
```

---

## Focus Management Patterns

### Modal Focus

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

### Skip Links

```tsx
// Visible on focus only
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4"
>
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {/* Main content */}
</main>
```

---

## Scan Commands

```bash
# Find click handlers without keyboard
grep -rn "onClick" src/ --include="*.tsx" | grep "<div\|<span" | grep -v "role=\|tabIndex\|onKeyDown"

# Find outline removal without alternative
grep -rn "outline-none\|outline-0" src/ --include="*.tsx" | grep -v "focus-visible"

# Check for skip links
grep -rn "skip" src/app/layout.tsx
grep -rn 'id="main-content"' src/ --include="*.tsx"
```

---

## Keyboard Testing Checklist

- [ ] All interactive elements reachable via Tab
- [ ] Focus indicator clearly visible
- [ ] Tab order matches visual order
- [ ] Modals trap focus correctly
- [ ] ESC closes modals/dropdowns
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate within components
- [ ] No keyboard traps
- [ ] Skip links present and working
- [ ] Return focus after modal close
