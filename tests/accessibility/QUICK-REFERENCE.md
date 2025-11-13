# Accessibility Testing - Quick Reference

## 🚀 Quick Start

```bash
# Run all accessibility tests
npm run test:a11y

# Interactive mode (best for debugging)
npm run test:a11y:ui

# View reports after running
npm run test:a11y:report
```

## 📊 What Gets Tested

### 37+ Components Against WCAG 2.1 AA

✅ **Form Controls** (9) - Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Form
✅ **Navigation** (8) - Tabs, Accordion, Breadcrumb, Menu, Menubar, Command, Dropdown, Context Menu
✅ **Overlays** (7) - Dialog, Alert, Sheet, Popover, Tooltip, Hover Card, Toast
✅ **Data Display** (9) - Table, Badge, Avatar, Progress, Alert, Card, Separator, Skeleton
✅ **Layout** (5) - Scroll Area, Aspect Ratio, Collapsible, Combobox, Calendar

### Standards Checked

- ✅ WCAG 2.1 Level A (minimum)
- ✅ WCAG 2.1 Level AA (target)
- ✅ Best Practices
- ✅ Keyboard Navigation
- ✅ Screen Reader Support
- ✅ Color Contrast (4.5:1 text, 3:1 UI)
- ✅ Focus Management
- ✅ ARIA Attributes

## 📁 File Locations

```
tests/accessibility/
├── components.a11y.spec.ts    # Main test suite (1076 lines)
├── axe.config.ts              # Config (393 lines)
├── reports/                   # HTML reports (auto-generated)
├── README.md                  # Detailed guide
└── SETUP-SUMMARY.md          # Full documentation

.github/workflows/
└── accessibility.yml          # CI/CD workflow (268 lines)

docs/
└── ACCESSIBILITY.md           # Guidelines (1052 lines)

.lighthouserc.json             # Lighthouse config
```

## 🎯 Common Tasks

### Run Tests

```bash
# All tests
npm run test:a11y

# Interactive UI (recommended)
npm run test:a11y:ui

# See browser (headed mode)
npm run test:a11y:headed

# Specific component
npx playwright test tests/accessibility/components.a11y.spec.ts -g "Button"
```

### View Reports

```bash
# Open reports directory
open tests/accessibility/reports/

# View specific component
open tests/accessibility/reports/button.html
```

### CI/CD

Tests run automatically on:
- Pull requests to main/develop
- Push to main/develop
- Manual workflow dispatch

**Critical violations block merges!**

## 🔍 Understanding Reports

Each HTML report shows:

```
✅ PASSED / ❌ FAILED

Violations: X (critical, serious, moderate, minor)
Incomplete: Y (manual verification needed)
Passes: Z (successful checks)
Pass Rate: XX%

For each violation:
- ID (e.g., "button-name")
- Severity (critical/serious/moderate/minor)
- Description
- WCAG tags
- Affected elements (HTML + selector)
- Fix suggestions
- Help link
```

## 🐛 Fix Common Issues

### Button has no accessible name
```tsx
// ❌ BAD
<button><XIcon /></button>

// ✅ GOOD
<button aria-label="Close">
  <XIcon />
</button>
```

### Input has no label
```tsx
// ❌ BAD
<input type="email" placeholder="Email" />

// ✅ GOOD
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### Color contrast too low
```tsx
// ❌ BAD
<p className="text-gray-400">Text</p>

// ✅ GOOD
<p className="text-gray-700">Text</p>
```

### Image missing alt text
```tsx
// ❌ BAD
<img src="/photo.jpg" />

// ✅ GOOD
<img src="/photo.jpg" alt="Team meeting" />
```

### Skipped heading level
```tsx
// ❌ BAD
<h1>Title</h1>
<h3>Section</h3>  {/* Skipped h2! */}

// ✅ GOOD
<h1>Title</h1>
<h2>Section</h2>
```

## ⌨️ Keyboard Testing

Essential shortcuts to test:

| Key | Action |
|-----|--------|
| `Tab` | Next element |
| `Shift+Tab` | Previous element |
| `Enter` | Activate button/link |
| `Space` | Toggle checkbox/button |
| `Esc` | Close dialog/menu |
| `Arrows` | Navigate menus/tabs |

**Checklist:**
- [ ] All interactive elements reachable?
- [ ] Tab order matches visual order?
- [ ] Focus always visible?
- [ ] Can close modals with Esc?

## 🔊 Screen Reader Testing

### macOS - VoiceOver
```bash
Cmd + F5               # Start/stop
Ctrl + Option + →/←    # Navigate
Ctrl + Option + Space  # Interact
Ctrl + Option + A      # Read all
```

### Windows - NVDA
```bash
Ctrl + Alt + N         # Start
Arrow Keys             # Navigate
Enter / Space          # Interact
Insert + Down Arrow    # Read all
```

## 📋 Manual Test Checklist

### Keyboard
- [ ] Tab through entire page
- [ ] Focus visible on all elements
- [ ] Esc closes all modals/menus
- [ ] Arrow keys navigate menus/tabs

### Screen Reader
- [ ] Images have alt text
- [ ] Form labels announced
- [ ] Buttons describe action
- [ ] Errors announced
- [ ] Headings hierarchical

### Visual
- [ ] Readable at 200% zoom
- [ ] 4.5:1 contrast (text)
- [ ] 3:1 contrast (UI)
- [ ] Info not by color alone
- [ ] 44x44px touch targets

## 🚨 Severity Levels

- **Critical** ⛔ - Blocks merge, must fix
- **Serious** ⚠️ - Should fix before release
- **Moderate** 🟡 - Fix when possible
- **Minor** 🔵 - Nice to have

## 📚 Resources

### Tools
- axe DevTools - Browser extension (free)
- WAVE - Visual tester (free)
- Lighthouse - Chrome DevTools (built-in)
- VoiceOver - macOS (built-in)
- NVDA - Windows (free download)

### Docs
- [WCAG 2.1 Quickref](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Full Guide](../../docs/ACCESSIBILITY.md)

## 💡 Pro Tips

1. **Run tests early and often** - Catch issues before they compound
2. **Use interactive mode** - `npm run test:a11y:ui` for debugging
3. **Check reports thoroughly** - HTML reports have detailed fix suggestions
4. **Manual test with keyboard** - Automated tests miss ~43% of issues
5. **Test with real screen readers** - VoiceOver or NVDA
6. **Test at 200% zoom** - Ensure responsive at high zoom
7. **Use color blindness simulator** - Chromatic Vision Simulator
8. **Document exceptions** - If a violation is intentional, document why

## 🎯 Success Metrics

Target goals:
- ✅ 0 critical violations
- ✅ 0 serious violations
- ✅ < 5 moderate violations
- ✅ 95%+ pass rate per component
- ✅ 90%+ Lighthouse score

## 🆘 Troubleshooting

### Tests not running
```bash
npx playwright install --with-deps chromium
npm install
```

### Reports not generating
```bash
mkdir -p tests/accessibility/reports
npm run test:a11y -- --debug
```

### False positive
1. Check HTML report details
2. Test manually with screen reader
3. Review axe documentation
4. Document if intentional

## 📞 Support

1. Check `tests/accessibility/README.md`
2. Review `docs/ACCESSIBILITY.md`
3. Run `npm run test:a11y:ui` for debugging
4. Create GitHub issue with results

---

**Remember: Accessibility is not optional. It's the law.** 🎯

For detailed information, see:
- [README.md](./README.md) - Full testing guide
- [SETUP-SUMMARY.md](./SETUP-SUMMARY.md) - Complete setup docs
- [docs/ACCESSIBILITY.md](../../docs/ACCESSIBILITY.md) - Comprehensive guidelines
