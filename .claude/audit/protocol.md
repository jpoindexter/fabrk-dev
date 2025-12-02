# Audit Execution Protocol

Step-by-step process for running a design system audit.

## Pre-Flight Checklist

Before starting, verify all pass:

```bash
npm run dev          # Dev server runs
npm run type-check   # TypeScript passes
npm run lint         # ESLint passes
npm run scan:hex     # No hardcoded colors
npm run build        # Build succeeds
npm test             # Tests pass
```

**If any fail, STOP and report the failure first.**

Save rollback point:
```bash
git rev-parse HEAD   # Note this SHA
```

---

## Phase 1: Pre-Flight
Run all checks above. Note any existing issues.

## Phase 2: Audit
1. Scan files in priority order (see `files.md`)
2. Use patterns from `patterns.md` to find violations
3. Log EVERY issue using format from `output.md`
4. Generate summary tables
5. Calculate metrics

**DO NOT FIX ANYTHING YET**

## Phase 3: Report
Present to user:
- Complete issue list
- Summary tables
- Metrics dashboard
- Recommended fix order (critical first)

## Phase 4: Await Approval
**STOP.** Do not proceed without user saying:
- "proceed" / "fix all"
- "fix critical only"
- Or specific instructions

## Phase 5: Fix
1. Critical issues first
2. By category to minimize context switching
3. Run `npm run type-check` after each file
4. Run `npm run lint` after each category

## Phase 6: Verify
```bash
npm run type-check && npm run lint && npm run scan:hex && npm run build && npm test
```

Visual check:
- Landing page
- Templates section
- Mobile viewport

## Phase 7: Commit
```bash
git add -A
git commit -m "Design system audit: Full compliance achieved"
```

## Phase 8: Rollback (if needed)
```bash
git reset --hard [SAVED_SHA]
```

---

## Quick Reference

### Terminal Styling Checklist
```tsx
// Every form element
className="rounded-none font-mono text-xs"

// Every label - Format: [LABEL]:
className="font-mono text-xs"

// Every button - Format: > ACTION
className="rounded-none font-mono text-xs"

// Every card/dialog/sheet
className="rounded-none"
```

### Common Patterns
```tsx
// Loading button
<Button loading loadingText="> SAVING..." className="rounded-none font-mono text-xs">

// Error message
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>

// Success message
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>
```
