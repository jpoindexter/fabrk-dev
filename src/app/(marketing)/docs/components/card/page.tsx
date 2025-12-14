'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard as DocsCardComponent } from '@/components/docs';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export default function CardPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.10]"
      title="Card"
      description="Terminal-styled card component with header code prefix, optional icons, and flexible content areas. Uses the [ [0xXX] TITLE ] pattern for consistency."
      importCode={`import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";`}
      mainPreview={{
        preview: (
          <Card className="w-[350px]">
            <CardHeader code="0x00" title="CARD TITLE" meta="Card description" />
            <CardContent>
              <p className="text-sm">
                This is the card content area where you can place any content.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">&gt; ACTION</Button>
            </CardFooter>
          </Card>
        ),
        code: `<Card className="w-[350px]">
  <CardHeader code="0x00" title="CARD TITLE" meta="Card description" />
  <CardContent>
    <p className="text-sm">This is the card content area where you can place any content.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">&gt; ACTION</Button>
  </CardFooter>
</Card>`,
      }}
      variants={[
        {
          title: 'Simple Card',
          description: 'A minimal card with just content',
          preview: (
            <Card className="w-[350px]">
              <CardContent>
                <p className="text-sm">Simple card with just content, no header or footer.</p>
              </CardContent>
            </Card>
          ),
          code: `<Card className="w-[350px]">
  <CardContent>
    <p className="text-sm">Simple card with just content, no header or footer.</p>
  </CardContent>
</Card>`,
        },
        {
          title: 'Card with Icon',
          description: 'Card with icon in header',
          preview: (
            <Card className="w-[350px]">
              <CardHeader code="0x01" title="SETTINGS" icon={<Settings className="h-4 w-4" />} />
              <CardContent>
                <p className="text-sm">Card with icon in the header area.</p>
              </CardContent>
            </Card>
          ),
          code: `<Card className="w-[350px]">
  <CardHeader
    code="0x01"
    title="SETTINGS"
    icon={<Settings className="h-4 w-4" />}
  />
  <CardContent>
    <p className="text-sm">Card with icon in the header area.</p>
  </CardContent>
</Card>`,
        },
        {
          title: 'Card with Footer',
          description: 'Card with action buttons in footer',
          preview: (
            <Card className="w-[350px]">
              <CardHeader code="0x02" title="CONFIRM ACTION" meta="Are you sure?" />
              <CardFooter>
                <Button variant="outline">&gt; CANCEL</Button>
                <Button>&gt; CONFIRM</Button>
              </CardFooter>
            </Card>
          ),
          code: `<Card className="w-[350px]">
  <CardHeader code="0x02" title="CONFIRM ACTION" meta="Are you sure?" />
  <CardFooter>
    <Button variant="outline">&gt; CANCEL</Button>
    <Button>&gt; CONFIRM</Button>
  </CardFooter>
</Card>`,
        },
        {
          title: 'Interactive Card',
          description: 'Card with hover effects for clickable content',
          preview: (
            <Card className="w-[350px]" interactive>
              <CardHeader code="0x03" title="INTERACTIVE CARD" meta="Click or hover" />
              <CardContent>
                <p className="text-sm">This card has hover effects with the interactive prop.</p>
              </CardContent>
            </Card>
          ),
          code: `<Card className="w-[350px]" interactive>
  <CardHeader code="0x03" title="INTERACTIVE CARD" meta="Click or hover" />
  <CardContent>
    <p className="text-sm">This card has hover effects with the interactive prop.</p>
  </CardContent>
</Card>`,
        },
        {
          title: 'Card Tones',
          description: 'Cards with different tone variants',
          preview: (
            <div className="grid gap-4">
              <Card tone="primary" className="w-[350px]">
                <CardHeader code="0x04" title="PRIMARY TONE" />
                <CardContent>
                  <p className="text-sm">Card with primary border tone.</p>
                </CardContent>
              </Card>
              <Card tone="success" className="w-[350px]">
                <CardHeader code="0x05" title="SUCCESS TONE" />
                <CardContent>
                  <p className="text-sm">Card with success border tone.</p>
                </CardContent>
              </Card>
              <Card tone="warning" className="w-[350px]">
                <CardHeader code="0x06" title="WARNING TONE" />
                <CardContent>
                  <p className="text-sm">Card with warning border tone.</p>
                </CardContent>
              </Card>
            </div>
          ),
          code: `<Card tone="primary">
  <CardHeader code="0x04" title="PRIMARY TONE" />
  <CardContent>
    <p className="text-sm">Card with primary border tone.</p>
  </CardContent>
</Card>

<Card tone="success">
  <CardHeader code="0x05" title="SUCCESS TONE" />
  <CardContent>
    <p className="text-sm">Card with success border tone.</p>
  </CardContent>
</Card>`,
        },
        {
          title: 'Grid Layout',
          description: 'Multiple cards in a responsive grid',
          preview: (
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader code="0x07" title="CARD 1" />
                <CardContent>
                  <p className="text-sm">First card in grid</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader code="0x08" title="CARD 2" />
                <CardContent>
                  <p className="text-sm">Second card in grid</p>
                </CardContent>
              </Card>
            </div>
          ),
          code: `<div className="grid grid-cols-2 gap-4">
  <Card>
    <CardHeader code="0x07" title="CARD 1" />
    <CardContent>
      <p className="text-sm">First card in grid</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader code="0x08" title="CARD 2" />
    <CardContent>
      <p className="text-sm">Second card in grid</p>
    </CardContent>
  </Card>
</div>`,
        },
        {
          title: 'Stat Cards',
          description: 'Cards displaying statistics or metrics',
          preview: (
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader code="0x09" title="TOTAL USERS" meta="1,234" />
                <CardContent>
                  <p className="text-muted-foreground text-xs">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader code="0x0A" title="REVENUE" meta="$45.2K" />
                <CardContent>
                  <p className="text-muted-foreground text-xs">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader code="0x0B" title="CONVERSION" meta="3.2%" />
                <CardContent>
                  <p className="text-muted-foreground text-xs">-2% from last month</p>
                </CardContent>
              </Card>
            </div>
          ),
          code: `<div className="grid grid-cols-3 gap-4">
  <Card>
    <CardHeader code="0x09" title="TOTAL USERS" meta="1,234" />
    <CardContent>
      <p className="text-xs text-muted-foreground">+12% from last month</p>
    </CardContent>
  </Card>
  {/* More stat cards... */}
</div>`,
        },
      ]}
      props={[
        {
          name: 'code',
          type: 'string',
          default: '"0x00"',
          description: "Hex code displayed in header brackets (e.g., '0x00', '0x01')",
        },
        {
          name: 'title',
          type: 'string',
          description: 'Title displayed in header in UPPERCASE_SNAKE_CASE format',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Optional icon displayed in header on the right side',
        },
        {
          name: 'meta',
          type: 'React.ReactNode',
          description: 'Optional metadata/description displayed in header',
        },
        {
          name: 'tone',
          type: '"neutral" | "primary" | "success" | "warning" | "danger"',
          default: '"neutral"',
          description: 'Border color tone for the card',
        },
        {
          name: 'interactive',
          type: 'boolean',
          default: 'false',
          description: 'Enable hover/focus states for clickable cards',
        },
        {
          name: 'as',
          type: '"div" | "article" | "section"',
          default: '"div"',
          description: 'Semantic HTML element to render the card as',
        },
        {
          name: 'padding',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Padding size for CardContent (sm=8px, md=16px, lg=24px)',
        },
      ]}
      accessibility={[
        'Headers use the terminal pattern [ [0xXX] TITLE ] for consistent structure',
        'Icons in headers should have appropriate aria-labels when interactive',
        'The interactive prop adds hover states for clickable cards',
        'Tone variants use border colors that meet WCAG contrast requirements',
        "Use semantic HTML elements (article, section) via the 'as' prop when appropriate",
      ]}
      previous={{ title: 'Switch', href: '/docs/components/switch' }}
      next={{ title: 'Badge', href: '/docs/components/badge' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCardComponent title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Card when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• Grouping related content into a contained unit</li>
                <li className="text-xs">• Displaying summary information (stats, KPIs, metrics)</li>
                <li className="text-xs">
                  • Creating scannable layouts with multiple information blocks
                </li>
                <li className="text-xs">• Interactive content that responds to clicks or hovers</li>
                <li className="text-xs">• Terminal-style headers needed for consistent branding</li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• Simple text grouping (use div or semantic elements)</li>
                <li className="text-xs">• Navigation items (use Navigation or Dropdown Menu)</li>
                <li className="text-xs">• Critical alerts (use Alert or Alert Dialog)</li>
                <li className="text-xs">• Temporary messages (use Toast notifications)</li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-sm font-semibold">Composition Guide:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • <strong>CardHeader</strong>: Always use with code + title for terminal aesthetic
                </li>
                <li className="text-xs">
                  • <strong>CardContent</strong>: Main content area (required for most cards)
                </li>
                <li className="text-xs">
                  • <strong>CardFooter</strong>: Actions or metadata (optional)
                </li>
                <li className="text-xs">
                  • <strong>tone prop</strong>: Use primary/success/warning/danger for visual
                  hierarchy
                </li>
                <li className="text-xs">
                  • <strong>interactive prop</strong>: Enable for clickable cards
                </li>
              </ul>
            </div>
          </div>
        </DocsCardComponent>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
