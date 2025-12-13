# Audit Protocol: Pre-Flight & Automated Scan

Phase 1-2 of the audit execution process.

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

### Design System Violations

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

### File Size Check

```bash
# Find oversized files (>300 lines)
find src -name "*.tsx" -exec wc -l {} + | sort -n | awk '$1 > 300 {print}'
```

---

## Checklist

### Pre-Flight

- [ ] Dev server runs
- [ ] TypeScript passes
- [ ] ESLint passes
- [ ] Hex scan passes
- [ ] Build succeeds
- [ ] Rollback SHA saved

### Automated Scan

- [ ] Color violations logged
- [ ] Shadow violations logged
- [ ] Rounded corner violations logged
- [ ] Console statements logged
- [ ] TODOs logged
- [ ] Oversized files logged
