# Audit Execution Protocol

Enterprise-grade process for running a comprehensive design system, accessibility (WCAG 2.1 AA), and UX heuristics audit.

---

## Audit Scope

This audit covers:

| Domain | Standards | Priority |
|--------|-----------|----------|
| **Accessibility** | WCAG 2.1 Level AA | CRITICAL |
| **Design System** | Terminal aesthetic, design tokens | CRITICAL |
| **UX Heuristics** | Nielsen's 10 principles | HIGH |
| **Visual Design** | Gestalt, hierarchy, typography | HIGH |
| **Inclusive Design** | Microsoft's 4 principles | HIGH |
| **Interaction Design** | Touch targets, transitions | MEDIUM |
| **Code Quality** | TypeScript, ESLint | MEDIUM |
| **Security** | OWASP, env validation | CRITICAL |

---

## Overview

| Phase | Name | Duration | Action |
|-------|------|----------|--------|
| 1 | Pre-Flight | 5 min | Verify environment |
| 2 | Automated Scan | 10 min | Run tooling |
| 3 | WCAG Audit | 20-30 min | Accessibility review |
| 4 | Design System Audit | 20-30 min | Visual/UX review |
| 5 | Manual Review | 15-20 min | Deep inspection |
| 6 | Report | 10 min | Generate findings |
| 7 | Present | 5 min | Show to user |
| 8 | Await Approval | - | User decision |
| 9 | Fix | Varies | Apply changes |
| 10 | Verify | 10 min | Confirm fixes |
| 11 | Commit | 2 min | Save changes |

---

## Phase 1: Pre-Flight Checklist

Before starting, verify ALL pass:

```bash
# Environment checks
npm run dev          # Dev server runs
npm run type-check   # TypeScript passes
npm run lint         # ESLint passes
npm run scan:hex     # No hardcoded colors
npm run build        # Build succeeds
npm test             # Tests pass (if configured)
```

### Decision Matrix

| Check | Status | Action |
|-------|--------|--------|
| All pass | ✅ | Proceed to Phase 2 |
| type-check fails | ❌ | Fix TypeScript first |
| lint fails | ❌ | Fix lint issues first |
| scan:hex fails | ❌ | Log as Critical issue |
| build fails | ❌ | Fix build first |
| test fails | ❌ | Log, but can proceed |

### Save Rollback Point

```bash
git rev-parse HEAD   # Note this SHA: _______________
git stash -u         # Stash any uncommitted work
```

---

## Phase 2: Automated Scan

Run automated tools in parallel:

```bash
# Terminal 1: Color violations
npm run scan:hex 2>&1 | tee /tmp/audit-colors.log

# Terminal 2: Lint violations
npm run lint 2>&1 | tee /tmp/audit-lint.log

# Terminal 3: Type violations
npm run type-check 2>&1 | tee /tmp/audit-types.log
```

### Scan for Design System Violations

```bash
# Critical: Hardcoded colors (beyond scan:hex)
grep -rE "(bg|text|border)-(red|blue|green|gray|slate|purple)-\d+" src/ --include="*.tsx"

# Critical: Banned shadows
grep -rE "shadow-(md|lg|xl|2xl)" src/ --include="*.tsx"

# High: Rounded corners
grep -rE "rounded-(sm|md|lg|xl|2xl|3xl)" src/app src/components --include="*.tsx"

# High: Missing terminal styling
grep -rE "<Button(?![^>]*rounded-none)" src/ --include="*.tsx"

# Medium: Console statements
grep -rE "console\.(log|warn|error)" src/ --include="*.tsx"

# Medium: TODO comments
grep -rE "//\s*(TODO|FIXME|HACK)" src/ --include="*.tsx"
```

### Check File Sizes

```bash
# Find oversized files
find src -name "*.tsx" -exec wc -l {} + | sort -n | awk '$1 > 200 {print}'
```

---

## Phase 3: WCAG 2.1 AA Audit

Comprehensive accessibility review following WCAG 2.1 Level AA guidelines.

### 3.1 Perceivable (WCAG 1.x)

#### Non-text Content (1.1.1)
```bash
# Find images without alt
grep -rn "<img\|<Image" src/ --include="*.tsx" | grep -v "alt="

# Find icon buttons without aria-label
grep -rn 'size="icon"' src/ --include="*.tsx" | grep -v "aria-label"

# Find SVGs without accessible names
grep -rn "<svg" src/ --include="*.tsx" | grep -v "aria-label\|aria-labelledby\|role="
```

Checklist:
- [ ] All `<Image>` and `<img>` have descriptive `alt` text
- [ ] Decorative images have `alt=""`
- [ ] Icon-only buttons have `aria-label`
- [ ] SVGs have `role="img"` and accessible name

#### Color Contrast (1.4.3)
```bash
# Check for hardcoded colors that may fail contrast
npm run scan:hex

# Use Lighthouse for automated contrast checking
# Chrome DevTools > Lighthouse > Accessibility
```

Checklist:
- [ ] Normal text: 4.5:1 contrast ratio
- [ ] Large text (18px+): 3:1 contrast ratio
- [ ] UI components: 3:1 contrast ratio
- [ ] Run Lighthouse accessibility audit

#### Text Resize (1.4.4)
```bash
# Check for fixed pixel font sizes
grep -rn "fontSize:" src/ --include="*.tsx" | grep "px"
grep -rn "font-\[" src/ --include="*.tsx"
```

Checklist:
- [ ] No fixed pixel font sizes
- [ ] Text scales to 200% without loss of content
- [ ] Test at Chrome DevTools zoom 200%

### 3.2 Operable (WCAG 2.x)

#### Keyboard Accessible (2.1.1)
```bash
# Find click handlers without keyboard
grep -rn "onClick" src/ --include="*.tsx" | grep "<div\|<span" | grep -v "role=\|tabIndex\|onKeyDown"
```

Checklist:
- [ ] Tab through entire page
- [ ] All interactive elements focusable
- [ ] No keyboard traps
- [ ] ESC closes all modals/popovers
- [ ] Enter/Space activates buttons

#### Focus Visible (2.4.7)
```bash
# Find outline removal without alternative
grep -rn "outline-none\|outline-0" src/ --include="*.tsx" | grep -v "focus-visible"
```

Checklist:
- [ ] All interactive elements have visible focus
- [ ] Focus indicator is clearly visible (3:1 contrast)
- [ ] No `outline-none` without `focus-visible` replacement

#### Bypass Blocks (2.4.1)
```bash
# Check for skip links
grep -rn "skip" src/app/layout.tsx
grep -rn 'id="main-content"' src/ --include="*.tsx"
```

Checklist:
- [ ] Skip link present
- [ ] Landmark regions defined (header, nav, main, footer)
- [ ] Headings create logical outline

### 3.3 Understandable (WCAG 3.x)

#### Error Identification (3.3.1)
```bash
# Check for aria-invalid usage
grep -rn "aria-invalid" src/ --include="*.tsx"

# Check for error message patterns
grep -rn 'role="alert"' src/ --include="*.tsx"
```

Checklist:
- [ ] Form errors identified with `aria-invalid`
- [ ] Error messages associated with inputs via `aria-describedby`
- [ ] Errors announced via `role="alert"`

#### Labels (3.3.2)
```bash
# Find inputs without labels
grep -rn "<Input\|<input" src/ --include="*.tsx" | grep -v "id=\|aria-label"
grep -rn "<Label" src/ --include="*.tsx" | grep -v "htmlFor"
```

Checklist:
- [ ] All form inputs have visible labels
- [ ] Labels associated via `htmlFor`/`id`
- [ ] Required fields indicated

### 3.4 Robust (WCAG 4.x)

#### Parsing (4.1.1)
```bash
npm run lint
npm run type-check
```

Checklist:
- [ ] No duplicate IDs
- [ ] Valid HTML nesting
- [ ] All elements properly closed

### 3.5 Screen Reader Testing

Manual tests with VoiceOver (Mac), NVDA (Windows), or axe DevTools:

- [ ] Page title announced
- [ ] Navigation landmarks navigable
- [ ] Form labels read correctly
- [ ] Error messages announced
- [ ] Dynamic content announced

---

## Phase 4: Design System Audit

Visual design, UX heuristics, and design token compliance.

### 4.1 Color & Theme Audit

```bash
# Hardcoded colors
npm run scan:hex
grep -rE "(bg|text|border)-(red|blue|green|gray|slate|purple)-\d+" src/ --include="*.tsx"
grep -rn "bg-white\|text-white\|bg-black\|text-black" src/ --include="*.tsx"
grep -rn "#[0-9a-fA-F]{3,8}" src/ --include="*.tsx"
```

Checklist:
- [ ] No hardcoded hex colors
- [ ] No Tailwind color palette classes
- [ ] All colors use design tokens
- [ ] Theme switching works (light/dark)
- [ ] Test 3-4 DaisyUI themes

### 4.2 Shape & Border Audit

```bash
# Rounded corner violations
grep -rE "rounded-(sm|md|lg|xl|2xl|3xl)" src/app src/components --include="*.tsx"

# Shadow violations
grep -rE "shadow-(md|lg|xl|2xl)" src/ --include="*.tsx"
```

Checklist:
- [ ] All components use `rounded-none`
- [ ] Only traffic light dots use `rounded-full`
- [ ] Only `shadow-sm` or terminal hard shadow used
- [ ] No `shadow-md/lg/xl/2xl`

### 4.3 Typography Audit

```bash
# Check for terminal styling
grep -rn "<Button" src/ --include="*.tsx" | grep -v "font-mono"
grep -rn "\[.*\]:" src/ --include="*.tsx"  # Label format
```

Checklist:
- [ ] All buttons use `font-mono text-xs`
- [ ] Buttons use `> ACTION` format
- [ ] Labels use `[LABEL]:` format
- [ ] Status messages use `[TYPE]: Message` format
- [ ] Typography hierarchy consistent

### 4.4 Spacing Audit

```bash
# Non-grid spacing values
grep -rE "(p|m|gap|space)-(3|5|7|9|11|13|14|15)" src/ --include="*.tsx"
```

Checklist:
- [ ] All spacing uses 8-point grid
- [ ] No odd spacing values (p-3, m-5, gap-7)
- [ ] Consistent padding patterns
- [ ] Proper container margins

### 4.5 Interaction Audit

```bash
# Hover without transition
grep -rn "hover:" src/ --include="*.tsx" | grep -v "transition"

# Slow transitions
grep -rn "duration-500\|duration-700\|duration-1000" src/ --include="*.tsx"
```

Checklist:
- [ ] All hover states have transitions
- [ ] No transitions > 300ms
- [ ] Click targets ≥ 44px
- [ ] Loading states present
- [ ] Disabled states visible

### 4.6 UX Heuristics Check

Manual review against Nielsen's 10:

| # | Heuristic | Check | Pass? |
|---|-----------|-------|-------|
| 1 | System Status | Loading states, progress indicators | ☐ |
| 2 | Real World Match | Natural language, familiar icons | ☐ |
| 3 | User Control | Cancel buttons, undo, back navigation | ☐ |
| 4 | Consistency | Design tokens, component patterns | ☐ |
| 5 | Error Prevention | Validation, confirmation dialogs | ☐ |
| 6 | Recognition | Visible options, breadcrumbs | ☐ |
| 7 | Flexibility | Shortcuts, progressive disclosure | ☐ |
| 8 | Minimalist | Essential info, visual hierarchy | ☐ |
| 9 | Error Recovery | Clear messages, recovery actions | ☐ |
| 10 | Help | Tooltips, documentation | ☐ |

### 4.7 Responsive Audit

```bash
# Non-responsive grids
grep -rn "grid-cols-[3-6]" src/ --include="*.tsx" | grep -v "md:\|lg:\|sm:"

# Non-responsive text
grep -rn "text-[3-5]xl" src/ --include="*.tsx" | grep -v "md:\|lg:\|sm:"
```

Checklist:
- [ ] Test at 320px (mobile)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px (desktop)
- [ ] Test at 1440px (large)
- [ ] No horizontal scrolling
- [ ] All grids responsive
- [ ] Large text scales down

---

## Phase 5: Manual Review

Systematic inspection following file priority order.

### 3.1 Foundation (Verify Only)

```bash
# DO NOT MODIFY - just verify
ls src/components/ui/*.tsx | head -20
cat src/app/globals.css | head -100
```

- [ ] Design tokens present and correct
- [ ] cn() utility exported from lib/utils

### 3.2 Layouts

```bash
find src/app -name "layout.tsx" -exec echo "=== {} ===" \; -exec head -50 {} \;
```

- [ ] Theme provider wraps content
- [ ] Font loading correct
- [ ] Meta tags complete
- [ ] Skip links present

### 3.3 Public-Facing

Manually check:
- [ ] Landing page at localhost:3000
- [ ] All sections visible
- [ ] Mobile responsive (320px, 768px, 1024px)
- [ ] Dark/light theme switching works

### 3.4 Templates

```bash
find src/app/templates -name "page.tsx" | wc -l
```

- [ ] Terminal aesthetic consistent
- [ ] Copy-paste ready
- [ ] No wrapper divs

### 3.5 Documentation

```bash
find src/app/docs -name "page.tsx" | wc -l
```

- [ ] All pages use templates
- [ ] DocsCard has title prop
- [ ] Previews are direct components
- [ ] Navigation links valid

### 3.6 Accessibility Audit

Use browser DevTools:

```
1. Open Chrome DevTools
2. Lighthouse > Accessibility
3. Run audit
4. Note score and issues
```

Manual checks:
- [ ] Tab through entire page - all elements reachable
- [ ] Screen reader test (VoiceOver/NVDA)
- [ ] Zoom to 200% - layout intact
- [ ] High contrast mode - content visible

### 3.7 Security Review

- [ ] No API keys in client code
- [ ] All env vars use `env.server.*` or `env.client.*`
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] No `eval()` or `new Function()`

---

## Phase 4: Generate Report

Using templates from `output.md`:

1. Create Executive Summary
2. Fill in Metrics Dashboard
3. List all Critical issues
4. List all High issues
5. Create category tables
6. Calculate compliance score

### Compliance Score Formula

```
Score = 100 - (Critical × 10) - (High × 3) - (Medium × 1) - (Low × 0.5)
```

| Score | Verdict |
|-------|---------|
| 95-100 | PASS |
| 80-94 | NEEDS_WORK |
| < 80 | FAIL |

---

## Phase 5: Present to User

Show the user:

1. **Executive Summary** - 3-5 bullet points
2. **Metrics Dashboard** - Visual compliance status
3. **Critical Issues** - List with file:line
4. **Verdict** - PASS / NEEDS_WORK / FAIL
5. **Recommended Fix Order**

Example output:

```
╔══════════════════════════════════════════════════════════════╗
║                    AUDIT COMPLETE                            ║
╠══════════════════════════════════════════════════════════════╣
║  Files: 156 | LOC: 12,450 | Score: 87.5%                     ║
║  Issues: 🔴 2 | 🟠 8 | 🟡 15 | 🔵 4 = 29 total              ║
║  Verdict: NEEDS_WORK                                         ║
╚══════════════════════════════════════════════════════════════╝

Critical (2):
1. src/api/webhook.ts:45 - process.env.API_KEY (use env.server)
2. src/landing/hero.tsx:78 - shadow-lg (use shadow-sm)

High (8):
1. src/components/card.tsx:23 - rounded-lg → rounded-none
...

Recommended fix order:
1. Security issues (Critical)
2. Design system violations (Critical/High)
3. Accessibility issues (High)
4. Code quality (Medium)
```

---

## Phase 6: Await Approval

**STOP.** Do not proceed without explicit user approval.

| User Says | Action |
|-----------|--------|
| "proceed" / "fix all" | Fix all issues |
| "fix critical only" | Fix only 🔴 Critical |
| "fix critical and high" | Fix 🔴 Critical + 🟠 High |
| "skip X" | Skip specific issues |
| "abort" / "cancel" | Rollback and stop |

---

## Phase 7: Fix Issues

### Fix Order

1. **Critical** - Security, hardcoded colors, banned shadows
2. **High** - Rounded corners, accessibility, file size
3. **Medium** - Code quality, TODOs
4. **Low** - Minor optimizations

### Fix Process

```bash
# After each file fix
npm run type-check

# After each category
npm run lint

# After Critical fixes
npm run scan:hex
```

### Batch Fixes

For repetitive fixes (e.g., rounded corners):

```bash
# Preview changes
grep -rn "rounded-lg" src/ --include="*.tsx"

# Apply with sed (CAREFUL - review first)
# sed -i '' 's/rounded-lg/rounded-none/g' src/path/to/file.tsx
```

---

## Phase 8: Verify Fixes

### Automated Verification

```bash
npm run type-check && \
npm run lint && \
npm run scan:hex && \
npm run build && \
npm test
```

### Visual Verification

Manual check at key URLs:
- [ ] `/` - Landing page
- [ ] `/docs` - Documentation
- [ ] `/templates` - Template gallery
- [ ] `/dashboard` - Dashboard (if applicable)

### Viewport Check

- [ ] Mobile (320px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)

### Theme Check

- [ ] Light theme
- [ ] Dark theme
- [ ] Theme switching smooth

### Accessibility Re-check

- [ ] Lighthouse score same or better
- [ ] Tab navigation works
- [ ] No new warnings

---

## Phase 9: Commit Changes

### Standard Commit

```bash
git add -A
git status  # Review changes

git commit -m "$(cat <<'EOF'
Design system audit: [VERDICT] compliance achieved

Issues fixed:
- [X] Critical: Security issues
- [X] Critical: Color violations
- [X] High: Rounded corners
- [X] High: Accessibility
- [X] Medium: Code quality

Compliance: XX.X% → XX.X%

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Push Changes

```bash
git push
```

---

## Phase 10: Rollback (If Needed)

If fixes caused issues:

```bash
# Reset to saved SHA
git reset --hard [SAVED_SHA]

# Restore stashed work
git stash pop
```

---

## Quick Reference

### Terminal Styling Checklist

```tsx
// Every form element
className="rounded-none font-mono text-xs"

// Every label - Format: [LABEL]:
className="font-mono text-xs text-muted-foreground"

// Every button - Format: > ACTION
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>

// Every card/dialog/sheet
className="rounded-none"

// Every status message
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>
```

### Color Token Quick Reference

```tsx
// Backgrounds
bg-background, bg-card, bg-muted, bg-primary, bg-secondary

// Text
text-foreground, text-muted-foreground, text-primary, text-destructive, text-success

// Borders
border-border, border-input, border-primary
```

### Common Fixes

| Pattern | Find | Replace |
|---------|------|---------|
| Rounded corners | `rounded-lg` | `rounded-none` |
| Hard shadows | `shadow-lg` | `shadow-sm` |
| Gray colors | `bg-gray-100` | `bg-muted` |
| White bg | `bg-white` | `bg-background` |
| Black text | `text-black` | `text-foreground` |
| Direct env | `process.env.X` | `env.server.X` |

---

## Audit Frequency

| Event | Full Audit | Quick Check |
|-------|------------|-------------|
| Before release | ✅ Required | - |
| After major feature | ✅ Required | - |
| Weekly maintenance | - | ✅ |
| After dependency update | - | ✅ |
| After design system change | ✅ Required | - |
