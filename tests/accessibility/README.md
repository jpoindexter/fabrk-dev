# Accessibility Testing

Comprehensive accessibility testing suite for all UI components using axe-core and Playwright.

## Quick Start

```bash
# Run all accessibility tests
npm run test:a11y

# Run tests in interactive UI mode
npm run test:a11y:ui

# Run tests and open reports
npm run test:a11y:report

# Run tests in headed mode (see browser)
npm run test:a11y:headed
```

## What We Test

This suite tests **45+ UI components** against:

### WCAG 2.1 Standards
- ✅ **Level A** - Minimum compliance
- ✅ **Level AA** - Target compliance (required for most jurisdictions)
- ✅ **Best Practices** - Additional recommendations

### Accessibility Criteria

#### 1. Proper ARIA Attributes
- Roles (button, dialog, tab, tabpanel, etc.)
- States (aria-expanded, aria-checked, aria-selected)
- Properties (aria-label, aria-labelledby, aria-describedby)
- Live regions (aria-live, aria-atomic)

#### 2. Keyboard Navigation
- Tab order matches visual order
- All interactive elements reachable
- Arrow key navigation for menus/tabs/radios
- Enter/Space activates buttons
- Esc closes dialogs/menus

#### 3. Focus Management
- Focus visible on all elements (3:1 contrast)
- Focus trapped in modals
- Focus returns to trigger on close
- No keyboard traps

#### 4. Color Contrast
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum
- Information not conveyed by color alone

#### 5. Screen Reader Compatibility
- All images have alt text
- Form inputs have labels
- Buttons have accessible names
- Headings are hierarchical
- Live regions announce updates

#### 6. Semantic HTML
- Proper use of headings (h1-h6)
- Semantic elements (nav, main, article, etc.)
- Forms use labels, not just placeholders
- Tables have headers

## Test Results

### Reports Location

HTML reports are generated in `tests/accessibility/reports/`:

```
tests/accessibility/reports/
├── button.html
├── input.html
├── textarea.html
├── select.html
├── checkbox.html
├── tabs.html
├── dialog.html
└── ... (one per component)
```

### Reading Reports

Each report includes:

1. **Summary Statistics**
   - Total violations
   - Incomplete tests (require manual verification)
   - Passed checks
   - Pass rate percentage

2. **Violations Section**
   - Violation ID (e.g., "color-contrast", "button-name")
   - Severity (critical, serious, moderate, minor)
   - Description and help text
   - WCAG tags (which standards it violates)
   - Affected elements (HTML, selector, issue details)
   - Link to axe documentation

3. **Incomplete Section**
   - Tests that couldn't be completed automatically
   - Require manual verification
   - Examples: color contrast with images, keyboard navigation

4. **Passed Checks**
   - All successfully passed accessibility rules
   - Confirms what's working correctly

### Severity Levels

- **Critical** - Must fix immediately (blocks merge in CI)
- **Serious** - Should fix before release
- **Moderate** - Fix when possible
- **Minor** - Nice to have

## CI/CD Integration

Accessibility tests run automatically on:

- ✅ Every pull request to main/develop
- ✅ Every push to main/develop
- ✅ Manual workflow dispatch

### GitHub Actions Workflow

The workflow (`.github/workflows/accessibility.yml`) includes:

1. **Accessibility Audit Job**
   - Runs axe tests on all components
   - Generates HTML reports
   - Uploads reports as artifacts
   - Comments on PR with results
   - **Fails build if critical violations found**

2. **Lighthouse Audit Job**
   - Tests pages with Google Lighthouse
   - Checks accessibility score (minimum 90%)
   - Tests performance, SEO, best practices
   - Uploads reports

3. **Summary Job**
   - Combines results from both jobs
   - Posts summary to GitHub Actions

### Blocking Criteria

The build will **fail** (block merge) if:

- Any **critical** accessibility violations found
- Lighthouse accessibility score < 90%

The build will **warn** (but not block) if:

- Serious violations found
- Lighthouse performance score < 80%

## Component Coverage

### Form Components (9)
- ✅ Button
- ✅ Input
- ✅ Textarea
- ✅ Select
- ✅ Checkbox
- ✅ Radio Group
- ✅ Switch
- ✅ Slider
- ✅ Form

### Navigation Components (7)
- ✅ Tabs
- ✅ Accordion
- ✅ Breadcrumb
- ✅ Navigation Menu
- ✅ Menubar
- ✅ Command Menu
- ✅ Dropdown Menu
- ✅ Context Menu

### Overlay Components (7)
- ✅ Dialog
- ✅ Alert Dialog
- ✅ Sheet
- ✅ Popover
- ✅ Tooltip
- ✅ Hover Card
- ✅ Toast

### Data Display Components (9)
- ✅ Table
- ✅ Badge
- ✅ Avatar
- ✅ Progress
- ✅ Alert
- ✅ Card
- ✅ Separator
- ✅ Skeleton

### Layout Components (5)
- ✅ Scroll Area
- ✅ Aspect Ratio
- ✅ Collapsible
- ✅ Combobox
- ✅ Calendar

**Total: 37 component categories tested**

## Manual Testing

While automated tests catch ~57% of issues, manual testing is still required for:

### Keyboard Navigation

Test with keyboard only (no mouse):

```
Tab         - Move to next element
Shift+Tab   - Move to previous element
Enter       - Activate button/link
Space       - Toggle checkbox/button
Esc         - Close modal/menu
Arrow Keys  - Navigate menus/tabs/radios
```

**Checklist:**
- [ ] Can reach all interactive elements with Tab?
- [ ] Tab order matches visual order?
- [ ] Focus always visible?
- [ ] Can activate all controls with keyboard?
- [ ] Can close all modals with Esc?

### Screen Reader Testing

**macOS - VoiceOver:**
```bash
# Start VoiceOver
Cmd + F5

# Navigate
Ctrl + Option + Right/Left Arrow

# Interact
Ctrl + Option + Space

# Read all
Ctrl + Option + A
```

**Windows - NVDA:**
```bash
# Download free from https://www.nvaccess.org/

# Start NVDA
Ctrl + Alt + N

# Navigate
Arrow Keys

# Interact
Enter / Space

# Read all
Insert + Down Arrow
```

**Checklist:**
- [ ] All images have meaningful alt text?
- [ ] Form labels announced correctly?
- [ ] Button purposes clear?
- [ ] Error messages announced?
- [ ] Dynamic content announced (toasts, alerts)?
- [ ] Headings make sense when navigated?

### Visual Testing

**Zoom to 200%:**
- [ ] Content still readable?
- [ ] No horizontal scrolling?
- [ ] Buttons/links still accessible?

**Color Contrast:**
- [ ] Use browser DevTools contrast checker
- [ ] Normal text: 4.5:1 minimum
- [ ] Large text: 3:1 minimum
- [ ] UI elements: 3:1 minimum

**Color Blindness:**
- [ ] Install color blindness simulator (Chromatic Vision Simulator)
- [ ] Test with deuteranopia (green-blind)
- [ ] Test with protanopia (red-blind)
- [ ] Information not conveyed by color alone?

## Fixing Violations

### Common Issues

#### 1. Button has no accessible name

**Violation:**
```tsx
<button>
  <XIcon />
</button>
```

**Fix:**
```tsx
<button aria-label="Close dialog">
  <XIcon />
</button>
```

#### 2. Input has no label

**Violation:**
```tsx
<input type="email" placeholder="Email" />
```

**Fix:**
```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

#### 3. Color contrast too low

**Violation:**
```tsx
<p className="text-gray-400">Important text</p>
```

**Fix:**
```tsx
<p className="text-gray-700">Important text</p>
```

#### 4. Missing alt text

**Violation:**
```tsx
<img src="/photo.jpg" />
```

**Fix:**
```tsx
<img src="/photo.jpg" alt="Team meeting in conference room" />
```

#### 5. Heading order skipped

**Violation:**
```tsx
<h1>Page Title</h1>
<h3>Section Title</h3>  {/* Skipped h2 */}
```

**Fix:**
```tsx
<h1>Page Title</h1>
<h2>Section Title</h2>
```

See **[docs/ACCESSIBILITY.md](../../docs/ACCESSIBILITY.md)** for comprehensive guidelines.

## Test Configuration

### axe.config.ts

Configures axe-core with:
- WCAG 2.1 Level A + AA rules
- Best practice rules
- Custom result formatting
- HTML report generation
- Severity filtering

### components.a11y.spec.ts

Main test suite with:
- 37+ component test cases
- Keyboard navigation tests
- ARIA attribute verification
- Focus management checks
- Screen reader compatibility
- Automated violation detection

## Troubleshooting

### Tests timeout

If tests timeout, increase timeout in `playwright.config.ts`:

```typescript
use: {
  navigationTimeout: 30000,
  actionTimeout: 10000,
}
```

### Reports not generating

Ensure reports directory exists:

```bash
mkdir -p tests/accessibility/reports
```

### Violations in CI but not locally

Ensure you're testing the same component state:

```bash
# Build production version locally
npm run build
npm start

# Then run tests
npm run test:a11y
```

### False positives

Some violations may be false positives:

1. Check the violation details in the HTML report
2. Verify with manual testing
3. If false positive, document why in code comments
4. Consider excluding specific rules if necessary

## Resources

### Tools

- **axe DevTools** - https://www.deque.com/axe/devtools/
- **WAVE** - https://wave.webaim.org/
- **Lighthouse** - Built into Chrome DevTools
- **Contrast Checker** - https://webaim.org/resources/contrastchecker/

### Documentation

- **WCAG 2.1** - https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Practices** - https://www.w3.org/WAI/ARIA/apg/
- **MDN Accessibility** - https://developer.mozilla.org/en-US/docs/Web/Accessibility

### Learning

- **WebAIM** - https://webaim.org/articles/
- **A11y Project** - https://www.a11yproject.com/
- **Inclusive Components** - https://inclusive-components.design/

## Contributing

When adding new components:

1. Add test case to `components.a11y.spec.ts`
2. Run tests: `npm run test:a11y`
3. Fix any violations
4. Verify report shows 0 critical/serious violations
5. Commit with report: `git add tests/accessibility/reports/`

## Support

For help with accessibility:

1. Check component reports in `tests/accessibility/reports/`
2. Review [docs/ACCESSIBILITY.md](../../docs/ACCESSIBILITY.md)
3. Run `npm run test:a11y:ui` for interactive debugging
4. Create GitHub issue with test results

---

**Remember:** Accessibility is not optional. It's a legal requirement in many jurisdictions and the right thing to do. 🎯
