"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  TerminalCard,
  TerminalCardHeader,
  TerminalCardContent,
  TerminalCardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function CardPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.10]"
      title="TerminalCard"
      description="Terminal-styled card component with header code prefix, optional icons, and flexible content areas. Uses the [ [0xXX] TITLE ] pattern for consistency."
      importCode={`import { TerminalCard, TerminalCardHeader, TerminalCardContent, TerminalCardFooter } from "@/components/ui/card";`}
      mainPreview={{
        preview: (
          <TerminalCard className="w-[350px]">
            <TerminalCardHeader code="0x00" title="CARD_TITLE" meta="Card description" />
            <TerminalCardContent>
              <p className="text-sm">
                This is the card content area where you can place any content.
              </p>
            </TerminalCardContent>
            <TerminalCardFooter>
              <Button variant="outline">&gt; ACTION</Button>
            </TerminalCardFooter>
          </TerminalCard>
        ),
        code: `<TerminalCard className="w-[350px]">
  <TerminalCardHeader code="0x00" title="CARD_TITLE" meta="Card description" />
  <TerminalCardContent>
    <p className="text-sm">This is the card content area where you can place any content.</p>
  </TerminalCardContent>
  <TerminalCardFooter>
    <Button variant="outline">&gt; ACTION</Button>
  </TerminalCardFooter>
</TerminalCard>`,
      }}
      variants={[
        {
          title: "Simple Card",
          description: "A minimal card with just content",
          preview: (
            <TerminalCard className="w-[350px]">
              <TerminalCardContent>
                <p className="text-sm">Simple card with just content, no header or footer.</p>
              </TerminalCardContent>
            </TerminalCard>
          ),
          code: `<TerminalCard className="w-[350px]">
  <TerminalCardContent>
    <p className="text-sm">Simple card with just content, no header or footer.</p>
  </TerminalCardContent>
</TerminalCard>`,
        },
        {
          title: "Card with Icon",
          description: "Card with icon in header",
          preview: (
            <TerminalCard className="w-[350px]">
              <TerminalCardHeader
                code="0x01"
                title="SETTINGS"
                icon={<Settings className="h-4 w-4" />}
              />
              <TerminalCardContent>
                <p className="text-sm">Card with icon in the header area.</p>
              </TerminalCardContent>
            </TerminalCard>
          ),
          code: `<TerminalCard className="w-[350px]">
  <TerminalCardHeader
    code="0x01"
    title="SETTINGS"
    icon={<Settings className="h-4 w-4" />}
  />
  <TerminalCardContent>
    <p className="text-sm">Card with icon in the header area.</p>
  </TerminalCardContent>
</TerminalCard>`,
        },
        {
          title: "Card with Footer",
          description: "Card with action buttons in footer",
          preview: (
            <TerminalCard className="w-[350px]">
              <TerminalCardHeader code="0x02" title="CONFIRM_ACTION" meta="Are you sure?" />
              <TerminalCardFooter>
                <Button variant="outline">&gt; CANCEL</Button>
                <Button>&gt; CONFIRM</Button>
              </TerminalCardFooter>
            </TerminalCard>
          ),
          code: `<TerminalCard className="w-[350px]">
  <TerminalCardHeader code="0x02" title="CONFIRM_ACTION" meta="Are you sure?" />
  <TerminalCardFooter>
    <Button variant="outline">&gt; CANCEL</Button>
    <Button>&gt; CONFIRM</Button>
  </TerminalCardFooter>
</TerminalCard>`,
        },
        {
          title: "Interactive Card",
          description: "Card with hover effects for clickable content",
          preview: (
            <TerminalCard className="w-[350px]" interactive>
              <TerminalCardHeader code="0x03" title="INTERACTIVE_CARD" meta="Click or hover" />
              <TerminalCardContent>
                <p className="text-sm">This card has hover effects with the interactive prop.</p>
              </TerminalCardContent>
            </TerminalCard>
          ),
          code: `<TerminalCard className="w-[350px]" interactive>
  <TerminalCardHeader code="0x03" title="INTERACTIVE_CARD" meta="Click or hover" />
  <TerminalCardContent>
    <p className="text-sm">This card has hover effects with the interactive prop.</p>
  </TerminalCardContent>
</TerminalCard>`,
        },
        {
          title: "Card Tones",
          description: "Cards with different tone variants",
          preview: (
            <div className="grid gap-4">
              <TerminalCard tone="primary" className="w-[350px]">
                <TerminalCardHeader code="0x04" title="PRIMARY_TONE" />
                <TerminalCardContent>
                  <p className="text-sm">Card with primary border tone.</p>
                </TerminalCardContent>
              </TerminalCard>
              <TerminalCard tone="success" className="w-[350px]">
                <TerminalCardHeader code="0x05" title="SUCCESS_TONE" />
                <TerminalCardContent>
                  <p className="text-sm">Card with success border tone.</p>
                </TerminalCardContent>
              </TerminalCard>
              <TerminalCard tone="warning" className="w-[350px]">
                <TerminalCardHeader code="0x06" title="WARNING_TONE" />
                <TerminalCardContent>
                  <p className="text-sm">Card with warning border tone.</p>
                </TerminalCardContent>
              </TerminalCard>
            </div>
          ),
          code: `<TerminalCard tone="primary">
  <TerminalCardHeader code="0x04" title="PRIMARY_TONE" />
  <TerminalCardContent>
    <p className="text-sm">Card with primary border tone.</p>
  </TerminalCardContent>
</TerminalCard>

<TerminalCard tone="success">
  <TerminalCardHeader code="0x05" title="SUCCESS_TONE" />
  <TerminalCardContent>
    <p className="text-sm">Card with success border tone.</p>
  </TerminalCardContent>
</TerminalCard>`,
        },
        {
          title: "Grid Layout",
          description: "Multiple cards in a responsive grid",
          preview: (
            <div className="grid grid-cols-2 gap-4">
              <TerminalCard>
                <TerminalCardHeader code="0x07" title="CARD_1" />
                <TerminalCardContent>
                  <p className="text-sm">First card in grid</p>
                </TerminalCardContent>
              </TerminalCard>
              <TerminalCard>
                <TerminalCardHeader code="0x08" title="CARD_2" />
                <TerminalCardContent>
                  <p className="text-sm">Second card in grid</p>
                </TerminalCardContent>
              </TerminalCard>
            </div>
          ),
          code: `<div className="grid grid-cols-2 gap-4">
  <TerminalCard>
    <TerminalCardHeader code="0x07" title="CARD_1" />
    <TerminalCardContent>
      <p className="text-sm">First card in grid</p>
    </TerminalCardContent>
  </TerminalCard>
  <TerminalCard>
    <TerminalCardHeader code="0x08" title="CARD_2" />
    <TerminalCardContent>
      <p className="text-sm">Second card in grid</p>
    </TerminalCardContent>
  </TerminalCard>
</div>`,
        },
        {
          title: "Stat Cards",
          description: "Cards displaying statistics or metrics",
          preview: (
            <div className="grid grid-cols-3 gap-4">
              <TerminalCard>
                <TerminalCardHeader code="0x09" title="TOTAL_USERS" meta="1,234" />
                <TerminalCardContent>
                  <p className="text-muted-foreground text-xs">+12% from last month</p>
                </TerminalCardContent>
              </TerminalCard>
              <TerminalCard>
                <TerminalCardHeader code="0x0A" title="REVENUE" meta="$45.2K" />
                <TerminalCardContent>
                  <p className="text-muted-foreground text-xs">+8% from last month</p>
                </TerminalCardContent>
              </TerminalCard>
              <TerminalCard>
                <TerminalCardHeader code="0x0B" title="CONVERSION" meta="3.2%" />
                <TerminalCardContent>
                  <p className="text-muted-foreground text-xs">-2% from last month</p>
                </TerminalCardContent>
              </TerminalCard>
            </div>
          ),
          code: `<div className="grid grid-cols-3 gap-4">
  <TerminalCard>
    <TerminalCardHeader code="0x09" title="TOTAL_USERS" meta="1,234" />
    <TerminalCardContent>
      <p className="text-xs text-muted-foreground">+12% from last month</p>
    </TerminalCardContent>
  </TerminalCard>
  {/* More stat cards... */}
</div>`,
        },
      ]}
      props={[
        {
          name: "code",
          type: "string",
          default: '"0x00"',
          description: "Hex code displayed in header brackets (e.g., '0x00', '0x01')",
        },
        {
          name: "title",
          type: "string",
          description: "Title displayed in header in UPPERCASE_SNAKE_CASE format",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          description: "Optional icon displayed in header on the right side",
        },
        {
          name: "meta",
          type: "React.ReactNode",
          description: "Optional metadata/description displayed in header",
        },
        {
          name: "tone",
          type: '"neutral" | "primary" | "success" | "warning" | "danger"',
          default: '"neutral"',
          description: "Border color tone for the card",
        },
        {
          name: "interactive",
          type: "boolean",
          default: "false",
          description: "Enable hover/focus states for clickable cards",
        },
        {
          name: "as",
          type: '"div" | "article" | "section"',
          default: '"div"',
          description: "Semantic HTML element to render the card as",
        },
        {
          name: "padding",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Padding size for TerminalCardContent (sm=8px, md=16px, lg=24px)",
        },
      ]}
      accessibility={[
        "Headers use the terminal pattern [ [0xXX] TITLE ] for consistent structure",
        "Icons in headers should have appropriate aria-labels when interactive",
        "The interactive prop adds hover states for clickable cards",
        "Tone variants use border colors that meet WCAG contrast requirements",
        "Use semantic HTML elements (article, section) via the 'as' prop when appropriate",
      ]}
      previous={{ title: "Switch", href: "/docs/components/switch" }}
      next={{ title: "Badge", href: "/docs/components/badge" }}
    />
  );
}
