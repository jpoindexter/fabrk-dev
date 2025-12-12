# Audit Prompts Archive

Claude Code audit prompt templates from `.claude/prompts/`.

## Contents

### component-value-audit.md

Prompt template for auditing component market value and positioning:
- Component feature analysis
- Market value assessment
- Competitive comparison
- Pricing justification
- Value proposition validation

### theme-compliance-audit.md

Prompt template for auditing theme system compliance:
- Color token usage verification
- Theme variable coverage
- Cross-theme consistency
- Hardcoded color detection
- Design token adherence

---

## Usage

These prompts were used during development to conduct systematic audits. They have been superseded by automated audit scripts:

- `scripts/hex-to-oklch-converter.mjs` - Automated color scanning
- `scripts/check-aria-labels.mjs` - Automated accessibility checks
- `.internal/scripts/utilities/design-system-audit.mjs` - Design system audit
- `.internal/scripts/utilities/pre-commit-audit.mjs` - Pre-commit validation

---

**Archived:** December 12, 2025
**Status:** Superseded by automated tooling
**Original Location:** `.claude/prompts/`
