# Audit Execution Protocol

Enterprise-grade process for running a comprehensive design system audit.

---

## Overview

| Phase | Name | Duration | Action |
|-------|------|----------|--------|
| 1 | Pre-Flight | 5 min | Verify environment |
| 2 | Automated Scan | 10 min | Run tooling |
| 3 | Manual Review | 30-60 min | Deep inspection |
| 4 | Report | 10 min | Generate findings |
| 5 | Present | 5 min | Show to user |
| 6 | Await Approval | - | User decision |
| 7 | Fix | Varies | Apply changes |
| 8 | Verify | 10 min | Confirm fixes |
| 9 | Commit | 2 min | Save changes |

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

## Phase 3: Manual Review

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
