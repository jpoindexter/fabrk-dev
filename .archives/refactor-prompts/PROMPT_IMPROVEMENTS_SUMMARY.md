# Template Unification Prompt — Improvements Summary

## Original Prompt Issues

### 1. Missing Codebase Context
**Problem**: Generic "View Library" reference, no Fabrk-specific details
**Fixed**: Added detailed current state analysis:
- Existing `TemplateShowcasePage` component
- 40 total library pages
- 4 distinct page patterns
- `StyledTabs` component requirement
- Design system constraints

### 2. Missing Critical Tab Requirement
**Problem**: No mention of bordered vs underline tabs
**Fixed**: Explicitly requires `StyledTabs` component:
- Reference to analytics-dashboard (desired appearance)
- Examples of correct vs incorrect implementation
- Gate C specifically validates StyledTabs usage
- Before/after visual examples

### 3. Vague Execution Strategy
**Problem**: Suggested big-bang refactor
**Fixed**: Incremental 4-phase approach:
1. **Phase 1**: Analysis & Design (PRE-EXECUTION - MANDATORY)
2. **Phase 2**: Refactor TemplateShowcasePage
3. **Phase 3**: Migrate pages ONE CATEGORY AT A TIME
4. **Phase 4**: Cleanup & Documentation
- Each phase has approval gates
- Commit after each category
- Rollback plan included

### 4. Missing Technical Constraints
**Problem**: No mention of Next.js 16, TypeScript, design system
**Fixed**: Added comprehensive constraints:
- Next.js 16 App Router patterns
- Server vs Client component rules
- Terminal aesthetic requirements (rounded-none, font-mono, brackets)
- Design system tokens (mode.font, mode.radius, mode.color)
- File size limits (300 lines)
- Pre-commit hook enforcement

### 5. Insufficient Verification
**Problem**: No testing or visual regression checks
**Fixed**: 7 verification gates (A-G):
- Gate A: Single Template Authority
- Gate B: Zero Duplication
- Gate C: StyledTabs Usage (NEW)
- Gate D: Design System Compliance
- Gate E: File Size Compliance
- Gate F: Accessibility
- Gate G: Visual Verification (manual testing)
- All gates must PASS before proceeding

### 6. Missing Pre-Execution Analysis
**Problem**: Prompt jumps straight to refactoring
**Fixed**: **Phase 1 is mandatory analysis**:
- Run inventory scripts
- Classify all 40 pages
- Design unified template API
- Get user confirmation
- **DO NOT PROCEED WITHOUT APPROVAL**

### 7. No Rollback Plan
**Problem**: What if something breaks?
**Fixed**: Comprehensive rollback strategy:
- Each category is separate commit
- Git revert instructions
- Fix → Retry workflow
- Emergency stop protocol

### 8. Missing Documentation Requirements
**Problem**: No mention of updating docs after refactor
**Fixed**: Phase 4 includes:
- Update CLAUDE.md
- Add usage examples to template comments
- Document slot system
- Post-refactor guidelines (how to add new pages)

### 9. Unclear Output Location
**Problem**: Where should results be written?
**Fixed**: Structured output format:
- Saved to `.archives/refactor-prompts/`
- Strict markdown table format
- File coverage manifest
- Gate results table
- Before/after metrics

### 10. Missing Design System Patterns
**Problem**: No examples of correct vs incorrect code
**Fixed**: Added code examples:
- Correct StyledTabs usage
- Correct design token usage
- Correct terminal aesthetic
- Common violations to avoid
- Before/after comparisons

---

## Key Additions

### Codebase-Specific Context (Section 0)
```markdown
## 0) CODEBASE CONTEXT (MUST READ FIRST)

### Current State
- Existing Template: `src/components/library/template-showcase-page.tsx`
- Total Library Pages: 40 pages
- Page Patterns: Category (5), Individual (15), Custom (4), Manual (16)

### Critical Components
- StyledTabs: bordered style (REQUIRED)
- Base Tabs: underline style (WRONG)

### Design System Requirements
- Terminal aesthetic, design tokens, file size limits
```

### StyledTabs Requirement (Throughout)
- Section 2: Incremental strategy includes StyledTabs update in Phase 2
- Section 3: Template API shows StyledTabs usage
- Section 4: Tab component enforcement examples
- Section 5: Gate C validates StyledTabs usage
- Section 7: Execution checklist includes visual verification of bordered tabs

### Incremental Migration Strategy (Section 2)
```markdown
### Phase 1: Analysis & Design (PRE-EXECUTION)
- DO THIS FIRST - DO NOT SKIP
- Get confirmation before proceeding

### Phase 2: Refactor TemplateShowcasePage
- ONLY AFTER PHASE 1 APPROVAL

### Phase 3: Migrate Pages (ONE CATEGORY AT A TIME)
- INCREMENTAL MIGRATION - COMMIT AFTER EACH CATEGORY
- STOP - GET APPROVAL BEFORE NEXT CATEGORY

### Phase 4: Cleanup & Documentation
- ONLY AFTER ALL MIGRATIONS COMPLETE
```

### Comprehensive Verification Gates (Section 5)
- 7 gates (A-G) with bash scripts
- StyledTabs-specific validation (Gate C)
- Visual verification checklist
- Mobile/browser testing requirements

### Execution Checklist (Section 7)
- Step-by-step pre-execution tasks
- Phase-by-phase checklist
- Approval gates between phases
- Final verification steps

### Rollback Plan (Section 10)
- Identify → Revert → Fix → Retry workflow
- Git commands for rollback
- Emergency stop protocol

### Post-Refactor Guidelines (Section 6G)
- How to add new library page (code example)
- How NOT to break the system (common mistakes)
- Maintenance notes (one-file updates)

---

## Comparison: Before vs After

| Aspect | Original Prompt | Improved Prompt |
|--------|-----------------|-----------------|
| **Execution Strategy** | Big-bang refactor | Incremental 4-phase with approval gates |
| **Pre-Execution** | None | Phase 1: Mandatory analysis |
| **Tab Requirement** | Not mentioned | Explicit StyledTabs enforcement (Gate C) |
| **Codebase Context** | Generic "View Library" | Fabrk-specific (40 pages, 4 patterns, existing components) |
| **Technical Constraints** | None | Next.js 16, TypeScript, design system, file size limits |
| **Verification** | Basic gates | 7 comprehensive gates + visual testing |
| **Rollback Plan** | None | Detailed git revert workflow |
| **Documentation** | None | Phase 4: Update CLAUDE.md, add examples |
| **Code Examples** | Minimal | Extensive (StyledTabs, design tokens, terminal aesthetic) |
| **Approval Gates** | None | Between each phase, before each category |

---

## Critical Improvements

### 1. Safety First
- **Pre-execution analysis** prevents breaking working code
- **Incremental migration** limits blast radius
- **Approval gates** between phases
- **Rollback plan** for quick recovery

### 2. Fabrk-Specific
- **StyledTabs requirement** explicitly enforced
- **Design system tokens** required (mode.font, mode.radius)
- **Terminal aesthetic** maintained (rounded-none, brackets)
- **File size limits** enforced (300 lines)

### 3. Quality Assurance
- **7 verification gates** must all PASS
- **Visual testing** on all 40 pages
- **Mobile/browser testing** required
- **Accessibility audit** included

### 4. Maintainability
- **Post-refactor guidelines** prevent regression
- **Usage examples** show correct patterns
- **Documentation updates** keep knowledge current
- **One-file updates** make future changes easy

### 5. Execution Clarity
- **Step-by-step checklist** eliminates ambiguity
- **Approval gates** prevent runaway execution
- **Rollback plan** provides safety net
- **Emergency stop** protocol included

---

## Usage Instructions

### For Execution
1. Read `TEMPLATE_UNIFICATION_REFACTOR_v2.md` (the improved prompt)
2. Create branch: `refactor/unified-library-template`
3. Start with **Phase 1: Analysis** (DO NOT SKIP)
4. Present analysis to user and **WAIT FOR APPROVAL**
5. Proceed phase-by-phase with approval gates
6. Verify all 7 gates PASS before declaring success

### For Review
1. Compare original prompt to improved version
2. Verify all gaps from this summary are addressed
3. Check that StyledTabs requirement is clear throughout
4. Confirm incremental strategy prevents big-bang risk
5. Ensure rollback plan exists

---

## Files
- **Improved Prompt**: `.archives/refactor-prompts/TEMPLATE_UNIFICATION_REFACTOR_v2.md`
- **This Summary**: `.archives/refactor-prompts/PROMPT_IMPROVEMENTS_SUMMARY.md`
- **Original Prompt**: (provided by user, not saved)

---

## Ready to Execute?

The improved prompt is production-ready. It:
- ✅ Addresses all identified gaps
- ✅ Enforces StyledTabs usage
- ✅ Provides incremental migration strategy
- ✅ Includes comprehensive verification
- ✅ Has rollback plan
- ✅ Maintains terminal aesthetic
- ✅ Enforces design system compliance

**Next Steps**:
1. Review this summary
2. Review improved prompt
3. Confirm approach with user
4. Create git branch
5. Execute Phase 1 (Analysis)
