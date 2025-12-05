/**
 * Hook Exports
 *
 * Central export for all design system hooks.
 *
 * Usage:
 * ```tsx
 * import { useTheme, useVisualMode, useTokens } from '@/design-system/hooks';
 *
 * function MyComponent() {
 *   const { colorTheme, setColorTheme } = useTheme();
 *   const { isTerminal, formatCardHeader } = useVisualMode();
 *   const { button, cn } = useTokens();
 *
 *   return (
 *     <button className={cn(button.base, button.size.default.height)}>
 *       {isTerminal ? formatCardHeader("Click Me", "00") : "Click Me"}
 *     </button>
 *   );
 * }
 * ```
 */

// Theme hook
export {
  useTheme,
  default as useThemeDefault,
} from "./use-theme";

export type {
  UseThemeOptions,
  UseThemeReturn,
} from "./use-theme";

// Visual mode hook
export {
  useVisualMode,
  getVisualModeClasses,
  getVisualModeConfig,
  getCurrentVisualMode,
  default as useVisualModeDefault,
} from "./use-visual-mode";

export type {
  UseVisualModeOptions,
  UseVisualModeReturn,
  VisualModeClasses,
} from "./use-visual-mode";

// Token hook
export {
  useTokens,
  cn,
  buildClass,
  createVariantClass,
  default as useTokensDefault,
} from "./use-tokens";

export type {
  UseTokensReturn,
} from "./use-tokens";
