# Audit Protocol: Report & Fix

Phase 5-9 of the audit execution process.

---

## Phase 5: Generate Report

Using templates from [`output.md`](output.md):

1. Create Executive Summary
2. Fill in Metrics Dashboard
3. List all Critical issues
4. List all High issues
5. Calculate compliance score

### Compliance Score

```
Score = 100 - (Critical × 10) - (High × 3) - (Medium × 1) - (Low × 0.5)
```

| Score | Verdict |
|-------|---------|
| 95-100 | PASS |
| 80-94 | NEEDS_WORK |
| < 80 | FAIL |

---

## Phase 6: Present to User

Show:

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
```

---

## Phase 7: Await Approval

**STOP.** Do not proceed without explicit user approval.

| User Says | Action |
|-----------|--------|
| "proceed" / "fix all" | Fix all issues |
| "fix critical only" | Fix only 🔴 Critical |
| "fix critical and high" | Fix 🔴 + 🟠 |
| "skip X" | Skip specific issues |
| "abort" / "cancel" | Rollback and stop |

---

## Phase 8: Fix Issues

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

```bash
# Preview changes
grep -rn "rounded-lg" src/ --include="*.tsx"

# Apply (CAREFUL - review first)
# sed -i '' 's/rounded-lg/rounded-none/g' src/path/to/file.tsx
```

---

## Phase 9: Verify & Commit

### Automated Verification

```bash
npm run type-check && \
npm run lint && \
npm run scan:hex && \
npm run build && \
npm test
```

### Visual Verification

- [ ] `/` - Landing page
- [ ] `/docs` - Documentation
- [ ] `/templates` - Template gallery

### Viewport Check

- [ ] Mobile (320px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)

### Theme Check

- [ ] Light theme
- [ ] Dark theme

### Commit

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

Compliance: XX.X% → XX.X%

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

git push
```

---

## Rollback (If Needed)

```bash
# Reset to saved SHA
git reset --hard [SAVED_SHA]

# Restore stashed work
git stash pop
```
