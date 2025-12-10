# AUDIT REPORT: FABRK SYSTEM INTEGRITY

**Date:** December 10, 2025
**Auditors:** The Russian Judge (Design) & The Dutch Judge (Code)
**Status:** 🔴 CRITICAL (Action Required)

---

## 1. EXECUTIVE SUMMARY

The Fabrk system is architecturally sound but visually inconsistent and mathematically imperfect. While the "Terminal" aesthetic is present, the implementation relies on ad-hoc utility classes (`text-xs`, `text-4xl`) rather than a strict semantic system.

**The "Russian Judge" Verdict:**
> "It is messy. You have 39 different text styles. You have colors that disappear on white backgrounds. You claim 21 themes but I see only ghosts in the code. This is not a system; it is a suggestion."

**The "Dutch Judge" Verdict:**
> "The wiring is decent, but the redundancy is inefficient. `mode.font` is applied manually in components when the `body` tag already handles it. We are shipping bytes we do not need."

---

## 2. FINDINGS & VIOLATIONS

### A. Typography: The "39 Steps" to Chaos
**Violation:** Ad-hoc font scaling.
**Evidence:**
- `src/components/marketing/hero-section.tsx`: Uses `text-4xl` manually.
- `src/components/ui/button.tsx`: Uses `text-xs` manually.
- `src/app/typography.css`: Exists but is **NOT USED** in core components.

**Severity:** HIGH
**Why it matters:** Changing the design system later will require editing 200+ files instead of 1 CSS file.

### B. Color Contrast: Mathematical Failures
**Violation:** WCAG 2.2 AAA (7:1) failure in Light Theme.
**Evidence:** `src/app/globals.css`
- **Warning Color:** `oklch(82% ...)` on white background.
  - Estimated Contrast: **1.7:1** (Fails AAA, AA, and basic readability).
  - *Requirement:* Must be darker (Lightness < 45%) for text usage, or use black text on warning background.
- **Success Color:** `oklch(45% ...)` on white.
  - Estimated Contrast: **~4.5:1** (Passes AA, Fails AAA).
  - *Requirement:* Needs to be slightly darker for strict 7:1 compliance.

### C. The "Ghost" Themes
**Violation:** Logic vs. Reality mismatch.
**Evidence:**
- `src/design-system/themes.ts` likely imports JSONs or definitions for 21 themes.
- `src/app/globals.css` defines ~10 themes (Solarized, Monokai, etc.), but the file system suggests `modern` and `soft` variations that might not be fully wired.
- **Risk:** User selects "Cyberpunk" and gets a broken interface if CSS variables aren't matched 1:1.

### D. Component Redundancy
**Violation:** Defensive coding overkill.
**Evidence:**
- `HeroSection` manually applies `mode.font` to almost every text element.
- Since `layout.tsx` applies `font-mono` to `<body>`, these child classes are redundant DOM weight.

---

## 3. REMEDIATION PLAN (SEQUENTIAL)

### Phase 1: The Foundation (CSS)
1.  **Refactor `globals.css`**:
    *   Implement the **Semantic Token Architecture** (Surfaces, Text Tiers, Borders).
    *   **Fix Contrast:** Darken Light Theme Success/Warning colors to ensure 7:1 contrast.
    *   Consolidate all 21 themes into the CSS variable definitions (or verify the script injection method).

### Phase 2: The Standardization (Typography)
1.  **Enforce `typography.css`**:
    *   Refactor `Button` to use `text-label` or `text-body-s` instead of `text-xs`.
    *   Refactor `HeroSection` to use `text-display` instead of `text-4xl`.
    *   Audit all `src/components/ui` to ensure they use the class system.

### Phase 3: The Cleanup (Marketing)
1.  **Deep Clean `src/app/(marketing)`**:
    *   Remove redundant `mode.font` calls.
    *   Ensure all badges/labels use strict UPPERCASE formatting (via CSS `text-transform` or prop, not manual string manipulation).
    *   Verify the "Typewriter" effect respects reduced motion preferences.

---

## 4. IMMEDIATE NEXT STEPS

Do not execute these yet. Awaiting command to begin **Phase 1**.

1.  Open `src/app/globals.css`.
2.  Replace existing variable definitions with the **Industry Standard** set (as defined in the System Prompt).
3.  Verify the fix by calculating contrast on the new values.
