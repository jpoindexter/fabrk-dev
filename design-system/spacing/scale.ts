/**
 * Spacing Scale
 *
 * Standardized spacing scale based on 8-point grid system.
 * All spacing values should be multiples of 4px (0.25rem) with
 * preference for 8px (0.5rem) increments.
 *
 * Grid System:
 * - Base unit: 4px (0.25rem)
 * - Preferred increment: 8px (0.5rem)
 * - Off-grid values (3, 5, 7, etc.) are BANNED
 *
 * @see https://m3.material.io/foundations/layout/understanding-layout
 */

// ============================================================================
// SPACING SCALE (4px base, 8px increments preferred)
// ============================================================================

/**
 * Core spacing scale
 * Maps Tailwind spacing classes to pixel values
 */
export const spacingScale = {
  // -------------------------------------------------------------------------
  // Micro spacing (4px)
  // Use sparingly - icons with text, tight groups
  // -------------------------------------------------------------------------
  0: { px: 0, rem: "0rem", tailwind: "0", useCase: "No spacing" },
  1: { px: 4, rem: "0.25rem", tailwind: "1", useCase: "Micro - icon gaps" },

  // -------------------------------------------------------------------------
  // Small spacing (8px)
  // Default for tight UI elements
  // -------------------------------------------------------------------------
  2: { px: 8, rem: "0.5rem", tailwind: "2", useCase: "Small - form gaps, button padding" },

  // -------------------------------------------------------------------------
  // Medium spacing (16px)
  // Default for most UI components
  // -------------------------------------------------------------------------
  4: { px: 16, rem: "1rem", tailwind: "4", useCase: "Medium - card padding, grid gaps" },

  // -------------------------------------------------------------------------
  // Large spacing (24px)
  // Comfortable spacing for content
  // -------------------------------------------------------------------------
  6: { px: 24, rem: "1.5rem", tailwind: "6", useCase: "Large - section gaps, large padding" },

  // -------------------------------------------------------------------------
  // Extra large spacing (32px+)
  // Section-level and page-level spacing
  // -------------------------------------------------------------------------
  8: { px: 32, rem: "2rem", tailwind: "8", useCase: "XL - section padding" },
  10: { px: 40, rem: "2.5rem", tailwind: "10", useCase: "2XL - large sections" },
  12: { px: 48, rem: "3rem", tailwind: "12", useCase: "3XL - page sections" },
  16: { px: 64, rem: "4rem", tailwind: "16", useCase: "4XL - major sections" },
  20: { px: 80, rem: "5rem", tailwind: "20", useCase: "5XL - hero sections" },
  24: { px: 96, rem: "6rem", tailwind: "24", useCase: "6XL - page spacing" },
  32: { px: 128, rem: "8rem", tailwind: "32", useCase: "7XL - large gaps" },
  40: { px: 160, rem: "10rem", tailwind: "40", useCase: "8XL - major spacing" },
  48: { px: 192, rem: "12rem", tailwind: "48", useCase: "9XL - huge spacing" },
  64: { px: 256, rem: "16rem", tailwind: "64", useCase: "10XL - max spacing" },
} as const;

// ============================================================================
// BANNED OFF-GRID VALUES
// ============================================================================

/**
 * OFF-GRID VALUES - DO NOT USE
 * These values break the 8-point grid and should be avoided
 */
export const BANNED_VALUES = [
  "3", // 12px - use 2 (8px) or 4 (16px)
  "5", // 20px - use 4 (16px) or 6 (24px)
  "7", // 28px - use 6 (24px) or 8 (32px)
  "9", // 36px - use 8 (32px) or 10 (40px)
  "11", // 44px - use 10 (40px) or 12 (48px)
  "14", // 56px - use 12 (48px) or 16 (64px)
  "18", // 72px - use 16 (64px) or 20 (80px)
] as const;

// ============================================================================
// SEMANTIC SPACING
// ============================================================================

/**
 * Purpose-based spacing tokens
 * Use these for consistent spacing across the app
 */
export const semanticSpacing = {
  // -------------------------------------------------------------------------
  // Component internal padding
  // -------------------------------------------------------------------------
  component: {
    /** Tight padding - badges, small buttons */
    xs: { padding: "p-1", gap: "gap-1", value: "4px" },
    /** Small padding - buttons, inputs */
    sm: { padding: "p-2", gap: "gap-2", value: "8px" },
    /** Default padding - cards, panels */
    md: { padding: "p-4", gap: "gap-4", value: "16px" },
    /** Large padding - dialogs, sections */
    lg: { padding: "p-6", gap: "gap-6", value: "24px" },
    /** Extra large padding - hero sections */
    xl: { padding: "p-8", gap: "gap-8", value: "32px" },
  },

  // -------------------------------------------------------------------------
  // Layout gaps
  // -------------------------------------------------------------------------
  gap: {
    /** Icon with text */
    icon: "gap-2", // 8px
    /** Form elements */
    form: "gap-4", // 16px
    /** Card grid */
    grid: "gap-6", // 24px
    /** Section separator */
    section: "gap-8", // 32px
  },

  // -------------------------------------------------------------------------
  // Section vertical spacing
  // -------------------------------------------------------------------------
  section: {
    /** Small section (forms, lists) */
    sm: { py: "py-12", value: "48px" },
    /** Medium section */
    md: { py: "py-16", value: "64px" },
    /** Large section (recommended default) */
    lg: { py: "py-20", value: "80px" },
    /** Extra large section (hero) */
    xl: { py: "py-24", value: "96px" },
  },

  // -------------------------------------------------------------------------
  // Container padding
  // -------------------------------------------------------------------------
  container: {
    /** Mobile */
    mobile: "px-4", // 16px
    /** Tablet */
    tablet: "px-6", // 24px
    /** Desktop */
    desktop: "px-8", // 32px
    /** Responsive */
    responsive: "px-4 sm:px-6 lg:px-8",
  },

  // -------------------------------------------------------------------------
  // Stack spacing (vertical)
  // -------------------------------------------------------------------------
  stack: {
    /** Tight stack - list items */
    xs: "space-y-1", // 4px
    /** Small stack - form fields */
    sm: "space-y-2", // 8px
    /** Default stack - card content */
    md: "space-y-4", // 16px
    /** Large stack - sections */
    lg: "space-y-6", // 24px
    /** Extra large stack */
    xl: "space-y-8", // 32px
  },

  // -------------------------------------------------------------------------
  // Inline spacing (horizontal)
  // -------------------------------------------------------------------------
  inline: {
    /** Tight inline - icon + text */
    xs: "space-x-1", // 4px
    /** Small inline - buttons in row */
    sm: "space-x-2", // 8px
    /** Default inline */
    md: "space-x-4", // 16px
    /** Large inline */
    lg: "space-x-6", // 24px
  },
} as const;

// ============================================================================
// CONTAINER MAX-WIDTHS
// ============================================================================

/**
 * Container width tokens
 */
export const containerWidths = {
  /** Prose/article width - optimal reading */
  prose: {
    maxWidth: "max-w-prose", // 65ch
    useCase: "Blog posts, documentation articles",
  },
  /** Small - narrow forms, settings */
  sm: {
    maxWidth: "max-w-2xl", // 672px
    useCase: "Settings forms, narrow content",
  },
  /** Medium - content pages */
  md: {
    maxWidth: "max-w-4xl", // 896px
    useCase: "Documentation, content pages",
  },
  /** Default - dashboard pages */
  default: {
    maxWidth: "max-w-6xl", // 1152px
    useCase: "Dashboard, standard pages (RECOMMENDED)",
  },
  /** Large - wide layouts */
  lg: {
    maxWidth: "max-w-7xl", // 1280px
    useCase: "Marketing pages, wide layouts",
  },
  /** Full - no max width */
  full: {
    maxWidth: "max-w-full",
    useCase: "Full-width sections",
  },
} as const;

// ============================================================================
// GRID LAYOUTS
// ============================================================================

/**
 * Common grid configurations
 */
export const gridLayouts = {
  /** Single column */
  cols1: {
    tailwind: "grid-cols-1",
    gap: "gap-6",
    useCase: "Mobile, narrow content",
  },
  /** Two columns */
  cols2: {
    tailwind: "grid-cols-1 sm:grid-cols-2",
    gap: "gap-6",
    useCase: "Feature grids, card pairs",
  },
  /** Three columns */
  cols3: {
    tailwind: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    gap: "gap-6",
    useCase: "Card grids, pricing tables",
  },
  /** Four columns */
  cols4: {
    tailwind: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    gap: "gap-6",
    useCase: "Stats grids, icon grids",
  },
  /** Auto-fit (responsive) */
  autoFit: {
    tailwind: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
    gap: "gap-6",
    useCase: "Responsive card grids",
  },
  /** Sidebar layout */
  sidebar: {
    tailwind: "grid-cols-1 lg:grid-cols-[280px_1fr]",
    gap: "gap-8",
    useCase: "Dashboard with sidebar",
  },
} as const;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Check if a spacing value is on-grid
 */
export function isOnGrid(value: string | number): boolean {
  const num = typeof value === "string" ? parseInt(value, 10) : value;
  const allowedValues = [0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96];
  return allowedValues.includes(num);
}

/**
 * Get the nearest on-grid value
 */
export function getNearestGridValue(value: number): number {
  const gridValues = [0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64];
  return gridValues.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Suggest replacement for off-grid value
 */
export function suggestReplacement(offGridValue: string): { smaller: string; larger: string } {
  const replacements: Record<string, { smaller: string; larger: string }> = {
    "3": { smaller: "2", larger: "4" },
    "5": { smaller: "4", larger: "6" },
    "7": { smaller: "6", larger: "8" },
    "9": { smaller: "8", larger: "10" },
    "11": { smaller: "10", larger: "12" },
    "14": { smaller: "12", larger: "16" },
    "18": { smaller: "16", larger: "20" },
  };
  return replacements[offGridValue] || { smaller: "4", larger: "6" };
}

// ============================================================================
// EXPORTS
// ============================================================================

export const spacing = {
  scale: spacingScale,
  semantic: semanticSpacing,
  containers: containerWidths,
  grids: gridLayouts,
  banned: BANNED_VALUES,
  helpers: {
    isOnGrid,
    getNearestGridValue,
    suggestReplacement,
  },
} as const;

export default spacing;
