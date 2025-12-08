"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.53]"
      category="Components"
      title="Accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content."
      importCode={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`}
      mainPreview={{
        preview: (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
        code: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
      }}
      variants={[
        {
          title: "Single",
          description: "Only one item can be opened at a time.",
          preview: (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Authentication</AccordionTrigger>
                <AccordionContent>
                  NextAuth v5 with JWT sessions. Supports credentials and OAuth
                  providers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Database</AccordionTrigger>
                <AccordionContent>
                  PostgreSQL with Prisma ORM. Includes migrations and type
                  safety.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Payments</AccordionTrigger>
                <AccordionContent>
                  Polar.sh integration with webhook handling for subscriptions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Authentication</AccordionTrigger>
    <AccordionContent>
      NextAuth v5 with JWT sessions. Supports credentials and OAuth
      providers.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Database</AccordionTrigger>
    <AccordionContent>
      PostgreSQL with Prisma ORM. Includes migrations and type safety.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Payments</AccordionTrigger>
    <AccordionContent>
      Polar.sh integration with webhook handling for subscriptions.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        },
        {
          title: "Multiple",
          description: "Multiple items can be opened simultaneously.",
          preview: (
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Tech Stack</AccordionTrigger>
                <AccordionContent>
                  Next.js 15 (App Router, React 19) with TypeScript strict mode.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Styling</AccordionTrigger>
                <AccordionContent>
                  Tailwind CSS 4 with DaisyUI themes and design tokens.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Components</AccordionTrigger>
                <AccordionContent>
                  87 production-ready components with Radix UI primitives.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: `<Accordion type="multiple" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Tech Stack</AccordionTrigger>
    <AccordionContent>
      Next.js 15 (App Router, React 19) with TypeScript strict mode.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Styling</AccordionTrigger>
    <AccordionContent>
      Tailwind CSS 4 with DaisyUI themes and design tokens.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Components</AccordionTrigger>
    <AccordionContent>
      87 production-ready components with Radix UI primitives.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        },
        {
          title: "Default Open",
          description: "Accordion with a default expanded item.",
          preview: (
            <Accordion
              type="single"
              collapsible
              defaultValue="item-2"
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Development</AccordionTrigger>
                <AccordionContent>
                  Run npm run dev to start the development server on port 3000.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Build</AccordionTrigger>
                <AccordionContent>
                  Run npm run build to create a production build with
                  optimizations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Deploy</AccordionTrigger>
                <AccordionContent>
                  Deploy to Vercel with automatic CI/CD and edge runtime
                  support.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: `<Accordion type="single" collapsible defaultValue="item-2" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Development</AccordionTrigger>
    <AccordionContent>
      Run npm run dev to start the development server on port 3000.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Build</AccordionTrigger>
    <AccordionContent>
      Run npm run build to create a production build with optimizations.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Deploy</AccordionTrigger>
    <AccordionContent>
      Deploy to Vercel with automatic CI/CD and edge runtime support.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        },
        {
          title: "Controlled",
          description: "Programmatically control which item is open.",
          preview: (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="font-mono text-xs text-muted-foreground">
                    [STATE]: CONTROLLED
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <span className="font-mono text-sm">
                    Use value and onValueChange props to control the accordion
                    state externally.
                  </span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: `const [value, setValue] = React.useState("item-1");

<Accordion type="single" value={value} onValueChange={setValue}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Controlled Item</AccordionTrigger>
    <AccordionContent>
      State is managed externally via value prop.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        },
      ]}
      props={[
        {
          name: "type",
          type: '"single" | "multiple"',
          default: '"single"',
          description:
            "Determines whether one or multiple items can be opened.",
        },
        {
          name: "collapsible",
          type: "boolean",
          default: "false",
          description:
            "Allow closing the open item (only for type='single').",
        },
        {
          name: "defaultValue",
          type: "string | string[]",
          default: "undefined",
          description: "The default open item(s).",
        },
        {
          name: "value",
          type: "string | string[]",
          default: "undefined",
          description: "Controlled state for open item(s).",
        },
        {
          name: "onValueChange",
          type: "(value: string | string[]) => void",
          default: "undefined",
          description: "Callback when open item(s) change.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable all accordion items.",
        },
      ]}
      accessibility={[
        "Built on Radix UI Accordion with full ARIA support",
        "Keyboard navigation: Tab to focus trigger, Space/Enter to toggle",
        "Arrow keys navigate between triggers",
        "Properly implements aria-expanded and aria-controls",
        "Screen reader announces state changes (expanded/collapsed)",
        "Focus management returns focus after closing",
      ]}
      previous={{ title: "Overview", href: "/docs/components/overview" }}
      next={{ title: "Alert", href: "/docs/components/alert" }}
    />
  );
}
