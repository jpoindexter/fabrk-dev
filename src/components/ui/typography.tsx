import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Typography Component Library
 *
 * Centralized typography system for consistent text styling across the application.
 * All components use design tokens for maximum accessibility and theme compatibility.
 *
 * Usage:
 * ```tsx
 * import { H1, H2, Body, List } from "@/components/ui/typography";
 *
 * <H1>Main Heading</H1>
 * <Body>Body text content</Body>
 * ```
 */

// =============================================================================
// HEADINGS
// =============================================================================

/**
 * H1 Component - Primary page heading
 *
 * Used for: Page titles, hero headings, main section headings
 * Scale: text-5xl (responsive: sm:text-4xl md:text-5xl lg:text-6xl)
 * Weight: font-bold
 * Line Height: leading-tight
 * Color: text-foreground
 *
 * @example
 * ```tsx
 * <H1>Welcome to Fabrk</H1>
 * <H1 className="text-center">Centered Hero Title</H1>
 * ```
 */
export const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-5xl lg:text-6xl",
      className
    )}
    {...props}
  />
));
H1.displayName = "H1";

/**
 * H2 Component - Section heading
 *
 * Used for: Major section headings, content area titles
 * Scale: text-3xl (responsive: sm:text-3xl md:text-4xl)
 * Weight: font-bold
 * Line Height: leading-tight
 * Color: text-foreground
 *
 * @example
 * ```tsx
 * <H2>Features Overview</H2>
 * <H2 className="mb-8">Section Title</H2>
 * ```
 */
export const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-3xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl",
      className
    )}
    {...props}
  />
));
H2.displayName = "H2";

/**
 * H3 Component - Subsection heading
 *
 * Used for: Subsection titles, card headings, content blocks
 * Scale: text-xl
 * Weight: font-semibold
 * Line Height: leading-tight
 * Color: text-foreground
 *
 * @example
 * ```tsx
 * <H3>Key Features</H3>
 * <H3 className="mt-6">Subsection Title</H3>
 * ```
 */
export const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-tight text-foreground",
      className
    )}
    {...props}
  />
));
H3.displayName = "H3";

/**
 * H4 Component - Minor heading
 *
 * Used for: Small section titles, list headers, component labels
 * Scale: text-lg
 * Weight: font-semibold
 * Line Height: leading-tight
 * Color: text-foreground
 *
 * @example
 * ```tsx
 * <H4>Details</H4>
 * <H4 className="mb-2">Component Label</H4>
 * ```
 */
export const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight text-foreground",
      className
    )}
    {...props}
  />
));
H4.displayName = "H4";

// =============================================================================
// BODY TEXT
// =============================================================================

/**
 * Body Component - Primary body text
 *
 * Used for: Main content, paragraphs, descriptions
 * Scale: text-base
 * Weight: font-normal
 * Line Height: leading-relaxed (1.625)
 * Color: text-foreground (maximum accessibility)
 *
 * @example
 * ```tsx
 * <Body>This is the main body text content.</Body>
 * <Body className="mb-4">Paragraph with spacing</Body>
 * ```
 */
export const Body = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-base font-normal leading-relaxed text-foreground",
      className
    )}
    {...props}
  />
));
Body.displayName = "Body";

/**
 * BodyMuted Component - Secondary body text
 *
 * Used for: Supporting text, captions, helper text, metadata
 * Scale: text-base
 * Weight: font-normal
 * Line Height: leading-relaxed (1.625)
 * Color: text-muted-foreground
 *
 * @example
 * ```tsx
 * <BodyMuted>Last updated: January 2025</BodyMuted>
 * <BodyMuted className="text-sm">Helper text</BodyMuted>
 * ```
 */
export const BodyMuted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-base font-normal leading-relaxed text-muted-foreground",
      className
    )}
    {...props}
  />
));
BodyMuted.displayName = "BodyMuted";

/**
 * Lead Component - Introductory text
 *
 * Used for: Page introductions, section descriptions, subheadings
 * Scale: text-lg
 * Weight: font-normal
 * Line Height: leading-relaxed
 * Color: text-foreground
 *
 * @example
 * ```tsx
 * <Lead>A comprehensive SaaS boilerplate for rapid development.</Lead>
 * <Lead className="mb-8">Section introduction text</Lead>
 * ```
 */
export const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-lg font-normal leading-relaxed text-foreground",
      className
    )}
    {...props}
  />
));
Lead.displayName = "Lead";

/**
 * Small Component - Fine print text
 *
 * Used for: Legal text, disclaimers, footnotes, form helper text
 * Scale: text-sm
 * Weight: font-normal
 * Line Height: leading-relaxed
 * Color: text-muted-foreground
 *
 * @example
 * ```tsx
 * <Small>© 2025 Fabrk. All rights reserved.</Small>
 * <Small className="text-destructive">Error message</Small>
 * ```
 */
export const Small = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <small
    ref={ref}
    className={cn(
      "text-sm font-normal leading-relaxed text-muted-foreground",
      className
    )}
    {...props}
  />
));
Small.displayName = "Small";

// =============================================================================
// LISTS
// =============================================================================

/**
 * List Component - Unordered or ordered list
 *
 * Used for: Feature lists, bullet points, numbered steps
 * Spacing: space-y-2 (between items)
 * Indent: ml-6
 * Style: list-disc (unordered) or list-decimal (ordered)
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem>First item</ListItem>
 *   <ListItem>Second item</ListItem>
 * </List>
 *
 * <List ordered>
 *   <ListItem>Step one</ListItem>
 *   <ListItem>Step two</ListItem>
 * </List>
 * ```
 */
export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  ordered?: boolean;
}

export const List = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  ListProps
>(({ className, ordered = false, ...props }, ref) => {
  const Component = ordered ? "ol" : "ul";
  return (
    <Component
      ref={ref as any}
      className={cn(
        "ml-6 space-y-2 text-base leading-relaxed text-foreground",
        ordered ? "list-decimal" : "list-disc",
        className
      )}
      {...props}
    />
  );
});
List.displayName = "List";

/**
 * ListItem Component - Individual list item
 *
 * Used within List component for each list entry
 * Line Height: leading-relaxed
 * Color: text-foreground
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem>Complete authentication system</ListItem>
 *   <ListItem>Stripe payment integration</ListItem>
 * </List>
 * ```
 */
export const ListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("leading-relaxed", className)}
    {...props}
  />
));
ListItem.displayName = "ListItem";

// =============================================================================
// SEMANTIC TEXT
// =============================================================================

/**
 * Strong Component - Bold emphasis
 *
 * Used for: Important text, keywords, emphasis
 * Weight: font-semibold
 *
 * @example
 * ```tsx
 * <Body>This is <Strong>important</Strong> information.</Body>
 * ```
 */
export const Strong = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <strong
    ref={ref}
    className={cn("font-semibold", className)}
    {...props}
  />
));
Strong.displayName = "Strong";

/**
 * Code Component - Inline code
 *
 * Used for: Variable names, function names, inline code snippets
 * Font: font-mono
 * Background: bg-muted
 * Padding: px-1.5 py-0.5
 * Border Radius: rounded
 *
 * @example
 * ```tsx
 * <Body>Run <Code>npm install</Code> to get started.</Body>
 * ```
 */
export const Code = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
      className
    )}
    {...props}
  />
));
Code.displayName = "Code";

/**
 * Link Component - Text link
 *
 * Used for: Inline links within body text
 * Color: text-primary
 * Decoration: underline-offset-4
 * Hover: underline
 *
 * @example
 * ```tsx
 * <Body>
 *   Read our <Link href="/privacy">Privacy Policy</Link> for details.
 * </Body>
 * ```
 */
export const Link = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-primary underline-offset-4 hover:underline",
      className
    )}
    {...props}
  />
));
Link.displayName = "Link";
