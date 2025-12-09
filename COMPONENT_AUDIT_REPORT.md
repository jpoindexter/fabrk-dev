# Component Audit & cleanup Recommendations

**Date:** December 9, 2025
**Reference Plan:** `.claude/plans/gentle-coalescing-hopcroft.md`
**Status:** Review Complete

## 1. Executive Summary
**Verdict:** The analysis in the reference plan is **90% Correct**. 
**Answer to "Do I need all these?":** **No.** You currently have 115+ components in your `ui` folder. A healthy, maintainable SaaS boilerplate typically needs only **40-60 core components**. The rest are "bloat" (unused charts, heavy editors, redundant navigation patterns) that slow down development and increase bundle size.

## 2. Findings & Corrections
The original plan correctly identifies "Tier 4" components to remove, but contains a minor error regarding marketing components.

*   **Correct:** You should remove unused "heavy" components like `MarkdownEditor`, `RichTextEditor`, and niche charts (`FunnelChart`, `Gauge`).
*   **Correction:** The plan lists components like `Hero`, `Pricing`, `Testimonials`, and `FAQ` for removal from `src/components/ui/`. **These files do not exist in that folder** (they are correctly placed in `src/components/marketing/` or `src/app/`). You do not need to worry about deleting them; they are already organized correctly.

## 3. Recommended Actions (The "Moderate Approach")
We recommend aiming for **~55 active components**. This balances having a rich toolkit with maintaining a clean codebase.

### ✅ Keep (Tier 1 & 2 - Essential)
Keep these ~55 components. They are the backbone of your application:
*   **Core:** `Button`, `Input`, `Card`, `Form`, `Table`, `Dialog`, `Sheet`, `DropdownMenu`
*   **Feedback:** `Toast`, `Alert`, `Badge`, `Skeleton`
*   **Data:** `Avatar`, `Progress`, `Tabs`
*   **Layout:** `DashboardShell`, `Sidebar`, `TopBar`

### ❌ Remove (Tier 4 - True Bloat)
These components exist in your `src/components/ui/` folder but are not essential for a fresh launch. Removing them will clean up your project significantly.

**Files identified for safe removal:**
1.  **Heavy Editors:** `markdown-editor.tsx`, `rich-text-editor.tsx`, `prompt-builder.tsx`
2.  **Unused Charts:** `funnel-chart.tsx`, `sparkline.tsx`, `gauge.tsx`, `heatmap.tsx`
3.  **Redundant Navigation:** `navigation-menu.tsx`, `menubar.tsx`, `context-menu.tsx`, `hover-card.tsx`
4.  **Unused Media:** `image-dropzone.tsx`, `cropper-controls.tsx`, `lightbox.tsx`, `aspect-ratio.tsx`
5.  **Marketing/Misc:** `banner.tsx`, `grid.tsx`, `rating.tsx`, `avatar-group.tsx`, `section.tsx`, `simple-icon.tsx`, `code-generator.tsx`
6.  **Duplicates/Wrappers:** `notification-badge.tsx`, `status-indicator.tsx`, `stack.tsx`, `field.tsx`, `form-error.tsx`, `typography.tsx`

## 4. Next Steps
1.  **No Action Required on Marketing Components:** Your Hero, Pricing, and Landing sections are safe.
2.  **Manual Cleanup:** When you are ready, you can delete the "Tier 4" files listed above to simplify your project structure.
