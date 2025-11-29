/**
 * Docs Typography System
 * Consistent text styles across all documentation pages
 */

export const docsTypography = {
  // h1 - Page title
  h1: "font-mono text-2xl font-bold tracking-tight lg:text-3xl",

  // h2 - Section title (PRIMARY colored)
  h2: "font-mono text-lg font-bold text-primary",

  // h3 - Subsection title
  h3: "font-mono text-base font-bold",

  // h4 - Card/item title
  h4: "font-mono text-sm font-bold",

  // Body text
  body: "font-mono text-sm text-muted-foreground leading-relaxed",

  // Caption/small text
  caption: "font-mono text-xs text-muted-foreground",

  // Code inline
  code: "font-mono text-xs bg-muted px-1.5 py-0.5",

  // Label (terminal style badge)
  label: "font-mono text-xs text-muted-foreground",

  // Terminal badge text
  badge: "font-mono text-sm text-muted-foreground",
} as const;

export type DocsTypographyKey = keyof typeof docsTypography;
