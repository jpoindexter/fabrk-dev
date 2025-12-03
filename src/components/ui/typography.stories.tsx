import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  H1,
  H2,
  H3,
  H4,
  Body,
  BodyMuted,
  Lead,
  Small,
  List,
  ListItem,
  Strong,
  Code,
  Link,
} from "./typography";

const meta = {
  title: "UI/Typography",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Centralized typography system for consistent text styling across the application. All components use design tokens for maximum accessibility.",
      },
    },
  },
} satisfies Meta;

export default meta;

// =============================================================================
// HEADINGS
// =============================================================================

export const Headings: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div>
        <H1>H1 - Primary Page Heading</H1>
        <Small className="mt-2 block">
          text-4xl sm:text-5xl md:text-5xl lg:text-6xl | font-bold | leading-tight
        </Small>
      </div>

      <div>
        <H2>H2 - Section Heading</H2>
        <Small className="mt-2 block">
          text-3xl sm:text-3xl md:text-4xl | font-bold | leading-tight
        </Small>
      </div>

      <div>
        <H3>H3 - Subsection Heading</H3>
        <Small className="mt-2 block">text-xl | font-semibold | leading-tight</Small>
      </div>

      <div>
        <H4>H4 - Minor Heading</H4>
        <Small className="mt-2 block">text-lg | font-semibold | leading-tight</Small>
      </div>
    </div>
  ),
};

// =============================================================================
// BODY TEXT
// =============================================================================

export const BodyText: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div>
        <H4 className="mb-2">Body (Primary)</H4>
        <Body>
          This is primary body text using text-foreground for maximum accessibility. It has a
          relaxed line-height of 1.625 for optimal readability. Use this for main content,
          paragraphs, and important descriptions.
        </Body>
        <Small className="mt-2 block">
          text-base | font-normal | leading-relaxed | text-foreground
        </Small>
      </div>

      <div>
        <H4 className="mb-2">BodyMuted (Secondary)</H4>
        <BodyMuted>
          This is secondary body text using text-muted-foreground. Use this for supporting text,
          captions, helper text, and metadata that should be visually de-emphasized from primary
          content.
        </BodyMuted>
        <Small className="mt-2 block">
          text-base | font-normal | leading-relaxed | text-muted-foreground
        </Small>
      </div>

      <div>
        <H4 className="mb-2">Lead (Introductory)</H4>
        <Lead>
          This is lead text for page introductions and section descriptions. It's slightly larger
          than body text to draw attention to important content at the beginning of sections.
        </Lead>
        <Small className="mt-2 block">
          text-lg | font-normal | leading-relaxed | text-foreground
        </Small>
      </div>

      <div>
        <H4 className="mb-2">Small (Fine Print)</H4>
        <Small>
          This is small text for legal disclaimers, footnotes, and form helper text. Use sparingly
          for information that needs to be present but not prominent.
        </Small>
        <Small className="mt-2 block">
          text-sm | font-normal | leading-relaxed | text-muted-foreground
        </Small>
      </div>
    </div>
  ),
};

// =============================================================================
// LISTS
// =============================================================================

export const Lists: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-8">
      <div>
        <H4 className="mb-4">Unordered List</H4>
        <List>
          <ListItem>Complete authentication system with NextAuth v5</ListItem>
          <ListItem>Stripe payment integration for subscriptions</ListItem>
          <ListItem>Multi-tenant organization management with RBAC</ListItem>
          <ListItem>Real-time features with Pusher</ListItem>
          <ListItem>Comprehensive test suite with 80% pass rate</ListItem>
        </List>
        <Small className="mt-2 block">ml-6 space-y-2 list-disc | text-base | leading-relaxed</Small>
      </div>

      <div>
        <H4 className="mb-4">Ordered List</H4>
        <List ordered>
          <ListItem>Clone the repository from GitHub</ListItem>
          <ListItem>Install dependencies with npm install</ListItem>
          <ListItem>Copy .env.example to .env.local</ListItem>
          <ListItem>Configure your database connection</ListItem>
          <ListItem>Run npm run dev to start development</ListItem>
        </List>
        <Small className="mt-2 block">
          ml-6 space-y-2 list-decimal | text-base | leading-relaxed
        </Small>
      </div>
    </div>
  ),
};

// =============================================================================
// SEMANTIC TEXT
// =============================================================================

export const SemanticText: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div>
        <H4 className="mb-2">Strong Emphasis</H4>
        <Body>
          This paragraph contains <Strong>strongly emphasized text</Strong> to highlight important
          information within body content.
        </Body>
      </div>

      <div>
        <H4 className="mb-2">Inline Code</H4>
        <Body>
          Run <Code>npm install</Code> to install dependencies, then start the dev server with{" "}
          <Code>npm run dev</Code>.
        </Body>
      </div>

      <div>
        <H4 className="mb-2">Text Links</H4>
        <Body>
          Read our <Link href="#">Privacy Policy</Link> and <Link href="#">Terms of Service</Link>{" "}
          for more information about how we protect your data.
        </Body>
      </div>
    </div>
  ),
};

// =============================================================================
// COMPLETE EXAMPLE
// =============================================================================

export const CompleteExample: StoryObj = {
  name: "Complete Page Example",
  render: () => (
    <div className="mx-auto max-w-4xl space-y-6 py-12">
      <div className="mb-12 space-y-4 text-center">
        <H1>Typography System Documentation</H1>
        <Lead className="text-center">
          A comprehensive guide to using the Fabrk typography system for consistent, accessible text
          styling across your application.
        </Lead>
      </div>

      <H2 className="mb-4">Getting Started</H2>
      <Body className="mb-4">
        The typography system provides a set of reusable components that enforce consistent styling
        across your application. All components use design tokens for colors, ensuring{" "}
        <Strong>maximum accessibility</Strong> and proper theme compatibility.
      </Body>

      <H3 className="mt-6 mb-4">Installation</H3>
      <Body className="mb-4">
        Import the typography components you need from the centralized module:
      </Body>
      <Body className="mb-4">
        <Code>import {"{ H1, H2, Body, List }"} from "@/components/ui/typography";</Code>
      </Body>

      <H3 className="mt-6 mb-4">Key Features</H3>
      <List className="mb-4">
        <ListItem>Consistent sizing and spacing across all pages</ListItem>
        <ListItem>WCAG AA compliant with 7:1+ contrast ratios</ListItem>
        <ListItem>Responsive typography that scales across breakpoints</ListItem>
        <ListItem>Design token integration for theme compatibility</ListItem>
        <ListItem>Comprehensive JSDoc documentation</ListItem>
      </List>

      <H3 className="mt-6 mb-4">Best Practices</H3>
      <List ordered className="mb-4">
        <ListItem>
          Always use <Code>text-foreground</Code> for maximum accessibility in body text
        </ListItem>
        <ListItem>
          Use <Code>BodyMuted</Code> only for supporting content, not primary information
        </ListItem>
        <ListItem>Maintain consistent heading hierarchy (H1 → H2 → H3 → H4)</ListItem>
        <ListItem>
          Apply <Code>leading-relaxed</Code> to all body text for readability
        </ListItem>
      </List>

      <H2 className="mt-12 mb-4">Additional Resources</H2>
      <Body className="mb-4">For more information, check out the following resources:</Body>
      <List className="mb-4">
        <ListItem>
          <Link href="#">Typography Guide Documentation</Link>
        </ListItem>
        <ListItem>
          <Link href="#">Accessibility Standards</Link>
        </ListItem>
        <ListItem>
          <Link href="#">Design System Overview</Link>
        </ListItem>
      </List>

      <div className="border-border mt-12 border-t pt-8">
        <Small>Last updated: January 2025 | © 2025 Fabrk. All rights reserved.</Small>
      </div>
    </div>
  ),
};

// =============================================================================
// RESPONSIVE BEHAVIOR
// =============================================================================

export const ResponsiveBehavior: StoryObj = {
  name: "Responsive Scaling",
  render: () => (
    <div className="space-y-12">
      <div>
        <Small className="text-muted-foreground mb-4 block">
          H1 scales from text-4xl → text-5xl (sm) → text-5xl (md) → text-6xl (lg)
        </Small>
        <H1>Responsive H1 Heading</H1>
      </div>

      <div>
        <Small className="text-muted-foreground mb-4 block">
          H2 scales from text-3xl → text-3xl (sm) → text-4xl (md)
        </Small>
        <H2>Responsive H2 Heading</H2>
      </div>

      <div>
        <Small className="text-muted-foreground mb-4 block">
          Body text maintains consistent size across all breakpoints
        </Small>
        <Body>
          Body text uses a fixed text-base size with leading-relaxed (1.625) line height for optimal
          readability across all device sizes. This ensures consistent reading experience whether on
          mobile, tablet, or desktop.
        </Body>
      </div>
    </div>
  ),
};

// =============================================================================
// ACCESSIBILITY
// =============================================================================

export const AccessibilityFeatures: StoryObj = {
  render: () => (
    <div className="max-w-4xl space-y-6">
      <H2 className="mb-4">WCAG AA Compliance</H2>

      <div className="space-y-4">
        <div className="border-border bg-card rounded-none border p-4">
          <H4 className="mb-2">Color Contrast Ratios</H4>
          <Body className="mb-2">
            All typography components use design tokens that ensure proper contrast:
          </Body>
          <List>
            <ListItem>
              <Code>text-foreground</Code> on <Code>bg-background</Code>: 7:1+ ratio
            </ListItem>
            <ListItem>
              <Code>text-muted-foreground</Code> on <Code>bg-background</Code>: 4.5:1+ ratio
            </ListItem>
            <ListItem>
              <Code>text-primary</Code> on <Code>bg-background</Code>: 4.5:1+ ratio
            </ListItem>
          </List>
        </div>

        <div className="border-border bg-card rounded-none border p-4">
          <H4 className="mb-2">Semantic HTML</H4>
          <Body className="mb-2">All components render proper semantic HTML elements:</Body>
          <List>
            <ListItem>H1-H4 render actual heading elements for screen readers</ListItem>
            <ListItem>Body renders paragraph elements with proper ARIA</ListItem>
            <ListItem>Lists render ul/ol with li for proper navigation</ListItem>
            <ListItem>Strong, Code, and Link use semantic HTML5 elements</ListItem>
          </List>
        </div>

        <div className="border-border bg-card rounded-none border p-4">
          <H4 className="mb-2">Readability Standards</H4>
          <Body className="mb-2">Typography follows industry best practices:</Body>
          <List>
            <ListItem>Line height of 1.625 (leading-relaxed) for body text readability</ListItem>
            <ListItem>Responsive font sizing that maintains readability across devices</ListItem>
            <ListItem>Consistent spacing (space-y-2 for lists, mb-4 for paragraphs)</ListItem>
            <ListItem>Maximum line length considerations built into layout constraints</ListItem>
          </List>
        </div>
      </div>
    </div>
  ),
};
