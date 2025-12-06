# Design System Migration Execution Plan

> Generated: 2025-12-06 (PHASE 3)
> Source: Phase 2 Audit Results
> Status: **MINIMAL WORK REQUIRED** - Codebase is 99%+ compliant

---

## Executive Summary

The Phase 2 comprehensive audit revealed that the Fabrk codebase is in **exceptional condition**:

| Metric | Result |
|--------|--------|
| Pages Scanned | 222 |
| Components Scanned | 98 |
| Templates Scanned | 100+ |
| Total Files | 490+ |
| **Violations Requiring Fixes** | **0** |

**The codebase is already compliant with the frozen design system.**

---

## Phase Structure

Given the audit results, the original 4-phase fix plan is simplified:

### ~~Phase A: Fix Core Components~~ → NOT NEEDED

**Original Plan:** Fix Card, Button, Input, etc. to strictly follow DS.

**Reality:** All 98 UI components are already compliant:
- Button: mode.radius, mode.font, mode.textTransform ✅
- Card: mode.radius, mode.font throughout ✅
- Input: mode.radius, mode.font ✅
- All others: Compliant ✅

**Files to touch:** 0

---

### ~~Phase B: Fix Critical Templates~~ → NOT NEEDED

**Original Plan:** Fix critical templates using corrected components.

**Reality:** All critical templates are already compliant:
- Landing page: ✅
- Dashboard: ✅
- Docs: ✅
- Templates index: ✅
- All auth flows: ✅

**Files to touch:** 0

---

### ~~Phase C: Fix Remaining Components~~ → NOT NEEDED

**Original Plan:** Fix remaining components and secondary templates.

**Reality:** No remaining violations:
- All 98 components: Compliant ✅
- All 100+ templates: Compliant ✅
- All 68 non-UI components: Compliant ✅

**Files to touch:** 0

---

### ~~Phase D: Clean Up Violations~~ → NOT NEEDED

**Original Plan:** Clean up any remaining violations.

**Reality:** Zero violations to clean up:
- Typography: 0 violations ✅
- Spacing: 0 violations ✅
- Colors: 0 violations ✅
- Radius: 0 violations ✅
- Components: 0 violations ✅
- Copy: 0 violations ✅

**Files to touch:** 0

---

## Revised Execution Plan

### Phase 4: POLISH (Optional Improvements)

Since the codebase is compliant, the next phase focuses on **polish and documentation**:

#### 4.1 Gap Resolution (from gaps.md)

| Gap | Priority | Effort |
|-----|----------|--------|
| Mode theme switching | Low | Medium |
| CSS variable parity | Low | Low |
| Animation token standardization | Low | Low |
| Z-index scale documentation | Low | Low |
| Prop naming standardization | Low | Medium |
| Icon size tokens | Low | Low |

**Constraint:** Design system is FROZEN. These require explicit DS-edit authorization.

#### 4.2 Documentation Updates

| Task | Files | Status |
|------|-------|--------|
| Update DESIGN_SYSTEM.md | 1 | Optional |
| Create visual regression tests | ~10 | Optional |
| Document non-mode components | 1 | Optional |
| Add theme switching guide | 1 | Future (when themes enabled) |

#### 4.3 Monitoring & Maintenance

| Task | Type | Cadence |
|------|------|---------|
| Run `npm run scan:hex` | Automated | Pre-commit |
| Review new components | Manual | Per PR |
| Audit new templates | Manual | Per PR |

---

## Constraints

### Design System is FROZEN

The `/design-system/spec/` files are v2.0.0 FROZEN:
- `overview.md` - Naming conventions (LOCKED)
- `foundations.md` - Token definitions (LOCKED)
- `tokens.json` - Machine-readable tokens (LOCKED)
- `themes.md` - Theme architecture (LOCKED)
- `components.md` - Component specs (LOCKED)

**NO changes to design system without explicit authorization.**

### Card Unification Stays

The TerminalCard component is the canonical card:
- All templates use TerminalCard
- All pages use TerminalCard
- No reverting to old Card patterns

### Mode Object Stays

The `mode` object from `@/design-system` is the theming mechanism:
- Currently hardcoded to terminal theme
- Future: Will support theme switching
- All components must continue using mode

---

## File Summary

| Directory | Files | Changes Needed |
|-----------|-------|----------------|
| src/components/ui/ | 98 | 0 |
| src/components/templates/ | 10 | 0 |
| src/app/templates/ | 90+ | 0 |
| src/app/(dashboard)/ | 30+ | 0 |
| src/app/docs/ | 80+ | 0 |
| src/components/landing/ | 28 | 0 |
| src/components/security/ | 11 | 0 |
| src/components/admin/ | 10 | 0 |
| **Total** | **490+** | **0** |

---

## Success Criteria

### Already Met ✅

1. ✅ All templates use TerminalCard
2. ✅ All components use mode.radius
3. ✅ All components use mode.font
4. ✅ All pages use design tokens
5. ✅ Zero hardcoded colors in production
6. ✅ Zero radius violations
7. ✅ Zero typography violations
8. ✅ Zero spacing violations
9. ✅ Copy format standardized

### Future Milestones (Phase 4+)

1. ⏳ Theme switching support
2. ⏳ Visual regression test suite
3. ⏳ Animation token standardization
4. ⏳ Complete prop naming consistency

---

## Recommended Next Steps

### Immediate (No Code Changes)

1. **Review and approve this plan**
2. **Commit Phase 2-3 documentation** to git
3. **Update CLAUDE.md** with design system freeze notice

### Short-term (Phase 4 Prep)

1. **Identify first gap to address** (recommend: icon size tokens)
2. **Create visual regression baseline** (optional)
3. **Add theme switching infrastructure** (when ready for multi-theme)

### Long-term (Future Phases)

1. **Theme switching** - Allow users to switch between terminal/modern/soft
2. **Design token export** - Generate CSS from tokens.json
3. **Component documentation** - Auto-generate from specs

---

## Prompt Templates for Future Phases

### For Gap Resolution (Requires DS-Edit Mode)

```
We are now in PHASE 4: DESIGN SYSTEM EDIT MODE (GAP RESOLUTION).

Goal: Address gap #{N} from gaps.md

Scope:
- ALLOWED to edit design system files
- ALLOWED to update tokens
- Must maintain backwards compatibility

Task: [Specific gap to address]

Constraints:
- Document all changes in CHANGELOG.md
- Update tokens.json and TypeScript types together
- Run full audit after changes
```

### For New Component Addition

```
We are adding a new component: {ComponentName}

Constraints:
- Must import mode from @/design-system
- Must use mode.radius on all bordered elements
- Must use mode.font on all text
- Must use only design tokens for colors
- Must follow existing component patterns

Reference: design-system/spec/components.md
```

### For Template Addition

```
We are adding a new template: {TemplateName}

Constraints:
- Must use TerminalCard for all cards
- Must use components from @/components/ui
- Must follow terminal aesthetic
- Must use mode object for theming

Reference: design-system/migration/templates-plan.md
```

---

## Conclusion

**The Fabrk codebase is production-ready** with 99%+ design system compliance.

No immediate fixes are required. The focus should shift to:
1. Maintaining current quality
2. Documenting for future contributors
3. Planning optional polish items

**PHASE 3 COMPLETE. Ready for Phase 4 (POLISH) when authorized.**

---

*Plan generated by PHASE 3: TEMPLATE + BOILERPLATE FIX PLAN - 2025-12-06*
