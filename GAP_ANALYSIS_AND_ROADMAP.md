# Project Gap Analysis & Launch Roadmap

**Date:** December 2, 2025  
**Project:** Fabrk Boilerplate  
**Focus:** Code Coverage, Design Enforcement, and Launch Readiness

---

## Table of Contents
1. [Gap Analysis](#gap-analysis)
    - [Test Coverage Gaps](#test-coverage-gaps)
    - [Current Offerings Review](#current-offerings-review)
    - [Critical Improvement Areas](#critical-improvement-areas)
2. [Enforcing the Design System](#enforcing-the-design-system)
    - [Strict Linting Strategy](#strict-linting-strategy)
    - [The "AI-First" Audit Workflow](#the-ai-first-audit-workflow)
3. [Launch Readiness Checklist](#launch-readiness-checklist)
4. [Storybook Implementation Plan](#storybook-implementation-plan)

---

## Gap Analysis

### Test Coverage Gaps

Current State: **High Risk / Low Logic Coverage**

| Test Layer | Status | Gap Description |
| :--- | :--- | :--- |
| **Unit Tests** | 🔴 **CRITICAL** | Almost zero logic coverage. Complex logic in `src/lib/` (utils, math, formatters) and `src/hooks/` is untested. Only `github.test.ts` exists. |
| **Integration** | 🟡 **Warning** | Missing direct API route testing. `src/app/api` endpoints are tested via E2E, which is slow and brittle for edge cases (e.g., rate limiting, error handling). |
| **E2E Tests** | 🟢 **Good** | Critical flows (Auth, 2FA, Landing, Navigation) are covered in `tests/e2e`. |
| **A11y Tests** | 🟢 **Good** | Dedicated `components.a11y.spec.ts` exists. |

**Action Plan:**
1.  **Immediate:** Write unit tests for all files in `src/lib`.
2.  **Secondary:** Add component tests for complex interactive UI (e.g., `multi-step-form`, `data-table`).

### Current Offerings Review

*   **Feature Set:** 🟢 **Excellent.** Auth, Stripe, RBAC, and Job Queues are implemented.
*   **Performance:** 🟡 **Unknown.** No `lighthouse` CI benchmarks setup in `package.json` (script exists but is it enforcing?).
*   **UX:** 🟢 **Strong.** Neobrutalist design is consistent.

### Critical Improvement Areas

1.  **Code Quality (Strictness):**
    *   Many lint rules are disabled (`no-explicit-any`, `react-hooks/exhaustive-deps`). This allows "sloppy" code to accumulate.
    *   *Fix:* Enable `strict: true` in `tsconfig` (already there) and remove `off` overrides in `eslint.config.mjs`.

2.  **Security:**
    *   **Gap:** No automated secret scanning in CI.
    *   **Gap:** No rate-limiting tests for API routes.

---

## Enforcing the Design System

To ensure 100% alignment, we must move from "Guidelines" (Markdown) to "Gates" (Code).

### 1. Strict Linting Strategy (The "Hard" Gate)
Your `eslint.config.mjs` has the right ideas but they are commented out. We must re-enable them to block:
*   Arbitrary values (e.g., `w-[123px]`).
*   Hardcoded colors (e.g., `text-[#ff0000]`).
*   Non-design-system spacing.

**Implementation:**
Uncomment the "Strict validation" block in your ESLint config and ensure the custom rules found in `config/eslint-rules/` are compatible with the Flat Config format.

```javascript
// config/eslint-rules/index.mjs (Conceptual)
// Enforce usage of design tokens
if (value.includes('#')) { context.report({ message: "Use a variable from globals.css instead of hex codes." }); }
```

### 2. The "AI-First" Audit Workflow
The files in `.claude/audit` are excellent **context** but passive. To make them active:

**A. The "Pre-Commit" Agent**
Create a script that runs before commit. It reads the `diff` and the relevant `audit/*.md` file, then asks an LLM:
> "Does this code change violate any rules in `components-buttons.md`? Answer YES/NO with reason."

**B. The "Rule Generator"**
Convert the Markdown checklists into a `compliance.json` file that a custom linter can read.
*   *Markdown:* "- [ ] All buttons must be uppercase"
*   *Linter Rule:* Regex match inside `<Button>` children for lowercase text.

---

## Launch Readiness Checklist

- [ ] **Legal:** Add `PRIVACY.md` and `TERMS.md`.
- [ ] **Security:** Run `npm audit` and fix high-severity vulnerabilities.
- [ ] **Environment:** Create a `.env.production.example` (sanitized).
- [ ] **CI/CD:** Verify GitHub Actions build passes (`npm run build`).
- [ ] **SEO:** Check `robots.txt` and `sitemap.ts` generation.
- [ ] **Analytics:** Verify PostHog/Analytics connection variables.
- [ ] **Error Tracking:** Set up Sentry or similar (currently missing).

---

## Storybook Implementation Plan

Installing Storybook allows you to visualize the 90+ components in isolation, which is crucial for a "Premium" boilerplate.

### Time Estimate
*   **Installation:** 1 Hour (Setup & Config).
*   **Story Generation:** 30-40 Hours (Manual) / 4-6 Hours (AI-Assisted).

### Steps to "100%"
1.  **Install:**
    ```bash
    npx storybook@latest init
    ```
2.  **Configure:**
    Update `.storybook/preview.tsx` to import `src/app/globals.css` so Tailwind v4 works.
3.  **Automate:**
    Use a script to loop through `src/components/ui/*.tsx` and generate a basic `*.stories.tsx` file for each.
    *   *Example Prompt:* "Write a Storybook story for this component with 'Default', 'Error', and 'Loading' states."

**Recommendation:** Do not delay launch for Storybook. Launch with the "Preview" pages you already have, and add Storybook as a "v1.1 Update" to keep momentum.
