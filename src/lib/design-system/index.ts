/**
 * Design System Module
 *
 * Centralized exports for the Fabrk design system.
 *
 * Key exports:
 * - `mode` - Current visual mode config (terminal/standard/minimal)
 * - `formatLabel()` - Format labels according to mode
 * - `formatButtonText()` - Format button text according to mode
 * - `formatCardTitle()` - Format card titles according to mode
 * - `TYPOGRAPHY` - Typography constants
 * - `SPACING` - Spacing constants
 *
 * @example
 * import { mode, formatLabel, formatButtonText } from "@/lib/design-system";
 *
 * // Use mode config directly
 * <div className={cn(mode.radius, mode.font)}>
 *
 * // Format text according to mode
 * <label>{formatLabel("Email")}</label>
 * <Button>{formatButtonText("Submit")}</Button>
 */

// Visual Mode System - THE KEY EXPORT
export {
  type VisualMode,
  type VisualModeConfig,
  visualModes,
  CURRENT_MODE,
  mode,
  formatLabel,
  formatButtonText,
  formatCardTitle,
  getCardHeaderClasses,
  isSharpMode,
  hasRoundedCorners,
} from "./visual-mode";

// Design System Constants
export {
  TYPOGRAPHY,
  TERMINAL_TYPOGRAPHY,
  DOCS_TYPOGRAPHY,
  SPACING,
  BUTTON_SIZES,
  PAGINATION,
  SCROLL,
  BREAKPOINTS,
  ACCESSIBILITY,
} from "./constants";

// Utilities
export { cn } from "../utils";
