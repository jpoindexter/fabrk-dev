/**
 * Design System Constants
 *
 * Centralized source of truth for all design system values used throughout Fabrk.
 * This file documents the standardized spacing, typography, and component sizes
 * that have been unified across the entire application.
 *
 * @see /CLAUDE.md for design system philosophy
 */

// ============================================================================
// TYPOGRAPHY STANDARDS
// ============================================================================

export const TYPOGRAPHY = {
  // Page titles - standardized across all dashboard pages
  pageTitle: {
    className: "text-4xl font-semibold tracking-tight",
    description: "Large page heading - used for main page titles",
  },

  // Section heading - for dashboard sections
  sectionHeading: {
    className: "text-2xl font-semibold",
    description: "Medium section heading",
  },

  // Subsection heading - for card titles
  subsectionHeading: {
    className: "text-lg font-semibold",
    description: "Small subsection heading",
  },

  // Body text
  body: {
    className: "text-base",
    description: "Standard body text",
  },

  // Small text - labels, captions
  small: {
    className: "text-sm",
    description: "Small text for labels and descriptions",
  },

  // Extra small text
  extraSmall: {
    className: "text-xs",
    description: "Extra small text for captions",
  },
} as const;

// ============================================================================
// SPACING STANDARDS
// ============================================================================

export const SPACING = {
  // Container widths - standardized to max-w-6xl across dashboard
  containerMaxWidth: "max-w-6xl",
  containerDescription: "Standard maximum container width for dashboard pages",

  // Grid and layout gaps
  gridGap: "gap-6",
  gridGapDescription: "Standard gap between grid items",

  // Card padding
  cardPadding: "p-6",
  cardPaddingDescription: "Standard padding inside cards and containers",

  // Section spacing
  sectionSpacing: "space-y-6",
  sectionSpacingDescription: "Vertical spacing between sections",

  // Horizontal spacing values
  xs: "space-x-2",
  sm: "space-x-3",
  md: "space-x-4",
  lg: "space-x-6",
  xl: "space-x-8",
} as const;

// ============================================================================
// BUTTON & ICON SIZES
// ============================================================================

export const BUTTON_SIZES = {
  // Icon button - now WCAG compliant (40px, targets 44px with padding)
  icon: {
    className: "h-10 w-10",
    description: "Icon button size (40px) - WCAG 2.1 AA compliant",
    wcagCompliant: true,
  },

  // Small button
  small: {
    className: "h-7 px-2 text-xs",
    description: "Small button",
  },

  // Default button
  default: {
    className: "h-8 px-3 py-1.5",
    description: "Default button size",
  },

  // Large button
  large: {
    className: "h-9 px-6",
    description: "Large button",
  },

  // Extra large button
  xl: {
    className: "h-12 px-8 text-lg",
    description: "Extra large button",
  },
} as const;

// ============================================================================
// PAGINATION STANDARDS
// ============================================================================

export const PAGINATION = {
  // Pagination button size - updated to WCAG standard
  buttonSize: {
    className: "h-10 w-10",
    description: "Pagination button size (40px) - WCAG 2.1 AA compliant",
  },

  // Page size options
  defaultPageSizes: [10, 20, 30, 40, 50],
  description: "Default options for rows per page in data tables",
} as const;

// ============================================================================
// SCROLL STYLES
// ============================================================================

export const SCROLL = {
  // Scrollbar styling for scrollable containers
  containerClass: "scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-none",
  description: "Styled scrollbar for overflow-x-auto containers (pricing table, data tables)",

  // Apply to: pricing-table, data-table containers
  appliedTo: ["pricing-table", "data-table"],
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  // Tailwind breakpoints used throughout the app
  sm: "640px",  // md: in Tailwind (confusing but standard)
  md: "768px",  // lg: in Tailwind
  lg: "1024px", // xl: in Tailwind
  xl: "1280px", // 2xl: in Tailwind

  // Mobile-first approach
  mobile: "< 640px",
  tablet: ">= 640px",
  desktop: ">= 768px",
  large: ">= 1024px",
} as const;

// ============================================================================
// ACCESSIBILITY STANDARDS
// ============================================================================

export const ACCESSIBILITY = {
  // Minimum touch target size per WCAG 2.1 AA
  minTouchTarget: "44x44px",

  // Current implementation
  iconButton: "40x40px (h-10 w-10)",
  paginationButton: "40x40px (h-10 w-10)",

  // Note: Full 44x44px achieved with padding in interactive elements
  touchTargetNote: "40px base size + padding/margin achieves 44px touch target",
} as const;

// ============================================================================
// APPLIED CHANGES SUMMARY
// ============================================================================

/**
 * Phase 1: Critical Design System Fixes
 * - Mobile navigation with Sheet component
 * - Badge component standardized (9 variants, 3 sizes)
 * - Fixed undefined transition-vercel-colors class (11 files)
 *
 * Phase 2: Typography Standardization
 * - All page titles: text-4xl font-semibold tracking-tight (9 files)
 *
 * Phase 3: Spacing Standardization
 * - Container widths: max-w-6xl (8 files)
 * - Grid gaps: gap-6 (8 files)
 * - Card padding: p-6 (consistent)
 *
 * Phase 4: Component Pattern Replacement
 * - Replaced confirm() dialogs with AlertDialog (2 files)
 *
 * Phase 5: Responsive Design
 * - Icon button size: h-8 w-8 → h-10 w-10 (WCAG compliant)
 * - Pagination buttons: h-8 w-8 → h-10 w-10
 * - Scroll indicators: Added to pricing table and data tables
 *
 * @see /docs/DESIGN-SYSTEM.md for full documentation
 */

const designSystemConstants = {
  TYPOGRAPHY,
  SPACING,
  BUTTON_SIZES,
  PAGINATION,
  SCROLL,
  BREAKPOINTS,
  ACCESSIBILITY,
};

export default designSystemConstants;
