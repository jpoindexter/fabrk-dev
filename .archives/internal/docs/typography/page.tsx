"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
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
  Link
} from "@/components/ui/typography";

export default function TypographyPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.44]"
      category="Components"
      title="Typography"
      description="Comprehensive typography system with semantic components for headings, body text, lists, and inline elements."
      importCode={`import {
  H1, H2, H3, H4,
  Body, BodyMuted, Lead, Small,
  List, ListItem,
  Strong, Code, Link
} from "@/components/ui/typography";`}
      mainPreview={{
        preview: (
          <div className="space-y-4 border border-border bg-card p-6">
            <H1>Main Heading</H1>
            <Lead>This is a lead paragraph with larger, prominent text for introductions.</Lead>
            <Body>This is body text using the Body component with proper line height and spacing.</Body>
          </div>
        ),
        code: `<H1>Main Heading</H1>
<Lead>This is a lead paragraph.</Lead>
<Body>This is body text.</Body>`,
      }}
      variants={[
        {
          title: "Heading Hierarchy",
          description: "All heading levels from H1 to H4",
          preview: (
            <div className="space-y-4 border border-border bg-card p-6">
              <div>
                <span className="font-mono text-xs text-muted-foreground">[H1]: PAGE_TITLE</span>
                <H1>Main Page Heading (H1)</H1>
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground">[H2]: SECTION</span>
                <H2>Section Heading (H2)</H2>
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground">[H3]: SUBSECTION</span>
                <H3>Subsection Heading (H3)</H3>
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground">[H4]: MINOR</span>
                <H4>Minor Heading (H4)</H4>
              </div>
            </div>
          ),
          code: `<H1>Main Page Heading</H1>
<H2>Section Heading</H2>
<H3>Subsection Heading</H3>
<H4>Minor Heading</H4>`,
        },
        {
          title: "Body Text Variants",
          description: "Regular body, muted text, lead, and small",
          preview: (
            <div className="space-y-4 border border-border bg-card p-6">
              <div>
                <span className="font-mono text-xs text-muted-foreground">[BODY]: STANDARD</span>
                <Body>Standard body text with normal foreground color and relaxed line height.</Body>
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground">[BODY_MUTED]: SECONDARY</span>
                <BodyMuted>Muted body text for supporting information, captions, and metadata.</BodyMuted>
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground">[LEAD]: INTRO</span>
                <Lead>Lead text for page introductions and section descriptions with larger size.</Lead>
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground">[SMALL]: LEGAL</span>
                <Small>Small text for legal notices, disclaimers, and fine print.</Small>
              </div>
            </div>
          ),
          code: `<Body>Standard body text</Body>
<BodyMuted>Muted supporting text</BodyMuted>
<Lead>Lead introduction text</Lead>
<Small>Small legal text</Small>`,
        },
        {
          title: "Lists",
          description: "Unordered and ordered lists",
          preview: (
            <div className="space-y-6 border border-border bg-card p-6">
              <div>
                <span className="font-mono text-xs text-muted-foreground">[LIST]: UNORDERED</span>
                <H4 className="mb-2 mt-2">Features</H4>
                <List>
                  <ListItem>Next.js 15 with App Router</ListItem>
                  <ListItem>TypeScript strict mode</ListItem>
                  <ListItem>Tailwind CSS 4 with DaisyUI</ListItem>
                  <ListItem>NextAuth v5 authentication</ListItem>
                </List>
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground">[LIST]: ORDERED</span>
                <H4 className="mb-2 mt-2">Getting Started</H4>
                <List ordered>
                  <ListItem>Clone the repository</ListItem>
                  <ListItem>Install dependencies with npm install</ListItem>
                  <ListItem>Copy .env.example to .env.local</ListItem>
                  <ListItem>Run npm run dev to start</ListItem>
                </List>
              </div>
            </div>
          ),
          code: `<List>
  <ListItem>Feature one</ListItem>
  <ListItem>Feature two</ListItem>
</List>

<List ordered>
  <ListItem>Step one</ListItem>
  <ListItem>Step two</ListItem>
</List>`,
        },
        {
          title: "Inline Elements",
          description: "Strong emphasis, code, and links",
          preview: (
            <div className="space-y-4 border border-border bg-card p-6">
              <div>
                <span className="font-mono text-xs text-muted-foreground">[INLINE]: EMPHASIS</span>
                <Body className="mt-2">
                  This text has <Strong>strong emphasis</Strong> for important keywords.
                </Body>
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground">[INLINE]: CODE</span>
                <Body className="mt-2">
                  Run <Code>npm install</Code> to install dependencies.
                </Body>
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground">[INLINE]: LINK</span>
                <Body className="mt-2">
                  Read our <Link href="/docs">documentation</Link> for more details.
                </Body>
              </div>
            </div>
          ),
          code: `<Body>
  This has <Strong>strong emphasis</Strong> text.
</Body>

<Body>
  Run <Code>npm install</Code> to start.
</Body>

<Body>
  See our <Link href="/docs">docs</Link>.
</Body>`,
        },
        {
          title: "Complete Article Example",
          description: "Typography components in a real article layout",
          preview: (
            <div className="border border-border bg-card p-6">
              <span className="font-mono text-xs text-muted-foreground">[ARTICLE]: FULL_EXAMPLE</span>
              <article className="mt-4 space-y-4">
                <H2>Building Modern SaaS Applications</H2>
                <Lead>
                  A comprehensive guide to shipping production-ready SaaS products faster with modern tools.
                </Lead>
                <Body>
                  Building a SaaS application from scratch involves many moving parts: authentication,
                  payments, email delivery, and more. Using a <Strong>boilerplate</Strong> like Fabrk
                  eliminates weeks of setup time.
                </Body>
                <H3>Key Benefits</H3>
                <List>
                  <ListItem>Save 40+ hours on initial setup</ListItem>
                  <ListItem>Production-ready authentication with NextAuth v5</ListItem>
                  <ListItem>Integrated payment system with Polar.sh</ListItem>
                </List>
                <Body>
                  To get started, simply run <Code>npm create fabrk-app</Code> and follow the prompts.
                  For more information, visit our <Link href="/docs">documentation</Link>.
                </Body>
                <Small>Last updated: December 2025</Small>
              </article>
            </div>
          ),
          code: `<article className="space-y-4">
  <H2>Building Modern SaaS Applications</H2>
  <Lead>A comprehensive guide...</Lead>
  <Body>Building a SaaS application...</Body>
  <H3>Key Benefits</H3>
  <List>
    <ListItem>Benefit one</ListItem>
    <ListItem>Benefit two</ListItem>
  </List>
  <Body>More content with <Code>code</Code>.</Body>
  <Small>Last updated: December 2025</Small>
</article>`,
        },
      ]}
      props={[
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes (all components)",
        },
        {
          name: "children",
          type: "React.ReactNode",
          description: "Content to render (all components)",
        },
        {
          name: "ordered",
          type: "boolean",
          default: "false",
          description: "Use ordered list (ol) instead of unordered (ul) - List only",
        },
        {
          name: "href",
          type: "string",
          description: "Link destination - Link only",
        },
      ]}
      accessibility={[
        "Uses semantic HTML elements (h1-h4, p, ul, ol, li, strong, code, a)",
        "Proper heading hierarchy for screen readers",
        "All text uses design tokens for theme compatibility",
        "Links have underline-offset for readability",
        "Code elements use monospace font with muted background",
        "List items have proper semantic structure",
        "Strong uses font-semibold for emphasis",
        "Body text uses leading-relaxed (1.625) for readability",
        "Small text maintains minimum readable size (text-sm)",
      ]}
      previous={{ title: "Status Indicator", href: "/docs/components/status-indicator" }}
      next={{ title: "Tooltip", href: "/docs/components/tooltip" }}
    />
  );
}
