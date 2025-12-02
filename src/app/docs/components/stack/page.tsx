"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Stack, HStack, VStack } from "@/components/ui/stack";
import { Separator } from "@/components/ui/separator";

export default function StackPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.79]"
      category="Components"
      title="Stack"
      description="Flexible layout component for vertical and horizontal stacking with spacing."
      importCode={`import { Stack, HStack, VStack } from "@/components/ui/stack"`}
      mainPreview={{
        preview: (
          <Stack spacing={4}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 font-mono text-sm text-muted-foreground"
              >
                <span className="text-primary">&gt;</span> Item {i}
              </div>
            ))}
          </Stack>
        ),
        code: `<Stack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`,
      }}
      variants={[
        {
          title: "Vertical Stack (VStack)",
          description: "Shorthand for vertical stacking (column direction).",
          preview: (
            <VStack spacing={4}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full p-4 font-mono text-sm text-muted-foreground"
                >
                  Item {i}
                </div>
              ))}
            </VStack>
          ),
          code: `<VStack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</VStack>`,
        },
        {
          title: "Horizontal Stack (HStack)",
          description: "Shorthand for horizontal stacking (row direction).",
          preview: (
            <HStack spacing={4}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 font-mono text-sm text-muted-foreground"
                >
                  Item {i}
                </div>
              ))}
            </HStack>
          ),
          code: `<HStack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</HStack>`,
        },
        {
          title: "Center Alignment",
          description: "Center items along the cross axis.",
          preview: (
            <VStack align="center" spacing={4}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 font-mono text-sm text-muted-foreground"
                >
                  Item {i}
                </div>
              ))}
            </VStack>
          ),
          code: `<VStack align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</VStack>`,
        },
        {
          title: "Space Between",
          description: "Distribute items with space between them.",
          preview: (
            <HStack justify="between" className="w-full">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 font-mono text-sm text-muted-foreground"
                >
                  Item {i}
                </div>
              ))}
            </HStack>
          ),
          code: `<HStack justify="between">
  <div>Left</div>
  <div>Right</div>
</HStack>`,
        },
        {
          title: "With Divider",
          description: "Automatically insert separators between items.",
          preview: (
            <VStack spacing={0} divider={<Separator />}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full p-4 font-mono text-sm text-muted-foreground"
                >
                  <span className="text-primary">&gt;</span> Item {i}
                </div>
              ))}
            </VStack>
          ),
          code: `<VStack spacing={0} divider={<Separator />}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</VStack>`,
        },
        {
          title: "Horizontal Divider",
          description: "Dividers in horizontal stacks.",
          preview: (
            <HStack spacing={0} divider={<Separator orientation="vertical" />}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 font-mono text-sm text-muted-foreground"
                >
                  {i}
                </div>
              ))}
            </HStack>
          ),
          code: `<HStack divider={<Separator orientation="vertical" />}>
  <div>Item 1</div>
  <div>Item 2</div>
</HStack>`,
        },
        {
          title: "Wrap Items",
          description: "Allow items to wrap to the next line.",
          preview: (
            <HStack wrap="wrap" spacing={4} className="w-full max-w-md">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-4 font-mono text-sm text-muted-foreground"
                >
                  Item {i}
                </div>
              ))}
            </HStack>
          ),
          code: `<HStack wrap="wrap">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  {/* ... more items wrap to next line */}
</HStack>`,
        },
        {
          title: "Full Width",
          description: "Stack takes full width of parent.",
          preview: (
            <VStack fullWidth spacing={4}>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-4 font-mono text-sm text-muted-foreground"
                >
                  Full width item {i}
                </div>
              ))}
            </VStack>
          ),
          code: `<VStack fullWidth>
  <div>Item 1</div>
  <div>Item 2</div>
</VStack>`,
        },
        {
          title: "Custom Spacing",
          description: "Control gap between items with spacing prop.",
          preview: (
            <VStack spacing={8}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full p-4 font-mono text-sm text-muted-foreground"
                >
                  Item {i}
                </div>
              ))}
            </VStack>
          ),
          code: `<VStack spacing={8}>
  <div>Item 1</div>
  <div>Item 2</div>
</VStack>`,
        },
      ]}
      props={[
        {
          name: "direction",
          type: '"row" | "column" | "row-reverse" | "column-reverse"',
          default: '"column"',
          description: "Flex direction for the stack.",
        },
        {
          name: "spacing",
          type: "0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12 | 16 | 20 | 24",
          default: "4",
          description: "Gap between items (in Tailwind units).",
        },
        {
          name: "align",
          type: '"start" | "center" | "end" | "stretch" | "baseline"',
          default: '"stretch"',
          description: "Align items along the cross axis.",
        },
        {
          name: "justify",
          type: '"start" | "center" | "end" | "between" | "around" | "evenly" | "stretch"',
          default: '"start"',
          description: "Justify content along the main axis.",
        },
        {
          name: "wrap",
          type: '"nowrap" | "wrap" | "wrap-reverse"',
          default: '"nowrap"',
          description: "Whether items should wrap to next line.",
        },
        {
          name: "divider",
          type: "React.ReactNode",
          default: "-",
          description: "Element to insert between each child (e.g., Separator).",
        },
        {
          name: "fullWidth",
          type: "boolean",
          default: "false",
          description: "Make stack take full width of parent.",
        },
        {
          name: "fullHeight",
          type: "boolean",
          default: "false",
          description: "Make stack take full height of parent.",
        },
        {
          name: "as",
          type: "React.ElementType",
          default: '"div"',
          description: "HTML element to render (div, ul, nav, etc.).",
        },
      ]}
      accessibility={[
        "Uses semantic HTML elements via 'as' prop",
        "Supports aria-label and aria-labelledby for navigation stacks",
        "Dividers automatically get aria-hidden='true' for screen readers",
        "Maintains logical DOM order regardless of visual direction",
        "Works without JavaScript for universal accessibility",
        "VStack and HStack are shortcuts for common patterns",
      ]}
      previous={{ title: "Slider", href: "/docs/components/slider" }}
      next={{ title: "Switch", href: "/docs/components/switch" }}
    />
  );
}
