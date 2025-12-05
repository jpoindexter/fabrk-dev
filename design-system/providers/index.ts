/**
 * Provider Exports
 *
 * Central export for all design system providers.
 *
 * Usage:
 * ```tsx
 * import { ThemeProvider, useThemeContext, ThemeScript } from '@/design-system/providers';
 *
 * // In layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <ThemeScript />
 *       </head>
 *       <body>
 *         <ThemeProvider>{children}</ThemeProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

// ThemeProvider and related exports
export {
  ThemeProvider,
  useThemeContext,
  useOptionalThemeContext,
  ThemeScript,
  type ThemeProviderProps,
  type ThemeContextValue,
} from "./ThemeProvider";
