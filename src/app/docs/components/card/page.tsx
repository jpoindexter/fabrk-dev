"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CardPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.10]"
      title="Card"
      description="A flexible container component for grouping related content with consistent styling and semantic HTML support."
      importCode={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";`}
      mainPreview={{
        preview: (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">This is the card content area where you can place any content.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Action</Button>
            </CardFooter>
          </Card>
        ),
        code: `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">This is the card content area where you can place any content.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Action</Button>
  </CardFooter>
</Card>`,
      }}
      variants={[
        {
          title: "Simple Card",
          description: "A minimal card with just content",
          preview: (
            <Card className="w-[350px]">
              <CardContent className="pt-6">
                <p className="text-sm">Simple card with just content, no header or footer.</p>
              </CardContent>
            </Card>
          ),
          code: `<Card className="w-[350px]">
  <CardContent className="pt-6">
    <p className="text-sm">Simple card with just content, no header or footer.</p>
  </CardContent>
</Card>`,
        },
        {
          title: "Card with Footer",
          description: "Card with action buttons in footer",
          preview: (
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Confirm Action</CardTitle>
                <CardDescription>Are you sure you want to proceed?</CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </CardFooter>
            </Card>
          ),
          code: `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Confirm Action</CardTitle>
    <CardDescription>Are you sure you want to proceed?</CardDescription>
  </CardHeader>
  <CardFooter className="gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>`,
        },
        {
          title: "Semantic Article Card",
          description: "Card using article element for semantic HTML",
          preview: (
            <Card as="article" className="w-[350px]">
              <CardHeader>
                <CardTitle as="h2">Article Title</CardTitle>
                <CardDescription>Published on January 1, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">This card uses semantic HTML with the article element and h2 heading.</p>
              </CardContent>
            </Card>
          ),
          code: `<Card as="article" className="w-[350px]">
  <CardHeader>
    <CardTitle as="h2">Article Title</CardTitle>
    <CardDescription>Published on January 1, 2024</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">This card uses semantic HTML with the article element and h2 heading.</p>
  </CardContent>
</Card>`,
        },
        {
          title: "Interactive Card",
          description: "Card with hover effects and clickable content",
          preview: (
            <Card className="w-[350px] cursor-pointer hover:bg-muted/50">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Click or hover to see effects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">This card has hover effects and can be clicked.</p>
              </CardContent>
            </Card>
          ),
          code: `<Card className="w-[350px] cursor-pointer hover:bg-muted/50">
  <CardHeader>
    <CardTitle>Interactive Card</CardTitle>
    <CardDescription>Click or hover to see effects</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">This card has hover effects and can be clicked.</p>
  </CardContent>
</Card>`,
        },
        {
          title: "Grid Layout",
          description: "Multiple cards in a responsive grid",
          preview: (
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Card 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">First card in grid</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Card 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Second card in grid</p>
                </CardContent>
              </Card>
            </div>
          ),
          code: `<div className="grid grid-cols-2 gap-4">
  <Card>
    <CardHeader>
      <CardTitle>Card 1</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm">First card in grid</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Card 2</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm">Second card in grid</p>
    </CardContent>
  </Card>
</div>`,
        },
        {
          title: "Stat Cards",
          description: "Cards displaying statistics or metrics",
          preview: (
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Users</CardDescription>
                  <CardTitle className="text-3xl">1,234</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Revenue</CardDescription>
                  <CardTitle className="text-3xl">$45.2K</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Conversion</CardDescription>
                  <CardTitle className="text-3xl">3.2%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">-2% from last month</p>
                </CardContent>
              </Card>
            </div>
          ),
          code: `<div className="grid grid-cols-3 gap-4">
  <Card>
    <CardHeader className="pb-2">
      <CardDescription>Total Users</CardDescription>
      <CardTitle className="text-3xl">1,234</CardTitle>
    </CardHeader>
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
          name: "as",
          type: '"div" | "article" | "section"',
          default: '"div"',
          description: "Semantic HTML element to render the card as",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply",
        },
        {
          name: "CardTitle.as",
          type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
          default: '"h3"',
          description: "Heading level for the card title",
        },
      ]}
      accessibility={[
        "Use semantic HTML elements (article, section) when appropriate for better document structure",
        "Card titles automatically use h3 by default - override with the 'as' prop for proper heading hierarchy",
        "The focus-within ring provides visual feedback when interactive elements inside the card are focused",
        "Ensure sufficient color contrast between card background and text",
        "Add aria-label to cards when they contain primarily interactive content",
      ]}
      previous={{ title: "Switch", href: "/docs/components/switch" }}
      next={{ title: "Badge", href: "/docs/components/badge" }}
    />
  );
}
