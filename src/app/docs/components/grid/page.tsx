"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Grid, GridItem } from "@/components/ui/grid";

export default function GridPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.74]"
      category="Components"
      title="Grid"
      description="A flexible CSS Grid layout component with responsive behavior."
      importCode={`import { Grid, GridItem } from "@/components/ui/grid"`}
      mainPreview={{
        preview: (
          <Grid cols={3} gap={4}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 font-mono text-xs text-muted-foreground"
              >
                Item {i}
              </div>
            ))}
          </Grid>
        ),
        code: `<Grid cols={3} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>`,
      }}
      variants={[
        {
          title: "2 Columns",
          description: "Simple 2-column grid layout.",
          preview: (
            <Grid cols={2} gap={4}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4"
                >
                  Item {i}
                </div>
              ))}
            </Grid>
          ),
          code: `<Grid cols={2}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>`,
        },
        {
          title: "Responsive (Default)",
          description: "Automatically adjusts columns based on screen size.",
          preview: (
            <Grid cols={3} gap={4} responsive>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-4"
                >
                  Item {i}
                </div>
              ))}
            </Grid>
          ),
          code: `<Grid cols={3} responsive>
  {/* 1 col on mobile, 2 on tablet, 3 on desktop */}
</Grid>`,
        },
        {
          title: "Fixed Columns",
          description: "Disable responsive behavior for fixed layouts.",
          preview: (
            <Grid cols={4} gap={4} responsive={false}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4"
                >
                  Item {i}
                </div>
              ))}
            </Grid>
          ),
          code: `<Grid cols={4} responsive={false}>
  {/* Always 4 columns */}
</Grid>`,
        },
        {
          title: "Custom Gap",
          description: "Control spacing between grid items.",
          preview: (
            <Grid cols={3} gap={8}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4"
                >
                  Item {i}
                </div>
              ))}
            </Grid>
          ),
          code: `<Grid cols={3} gap={8}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>`,
        },
        {
          title: "Column Span",
          description: "GridItem can span multiple columns.",
          preview: (
            <Grid cols={3} gap={4}>
              <GridItem colSpan={2}>
                <div className="bg-primary/10 p-4">
                  Spans 2 columns
                </div>
              </GridItem>
              <div className="p-4">
                Item
              </div>
              <div className="p-4">
                Item
              </div>
              <GridItem colSpan={2}>
                <div className="bg-primary/10 p-4">
                  Spans 2 columns
                </div>
              </GridItem>
            </Grid>
          ),
          code: `<Grid cols={3}>
  <GridItem colSpan={2}>Wide item</GridItem>
  <div>Regular item</div>
</Grid>`,
        },
        {
          title: "Row Span",
          description: "GridItem can span multiple rows.",
          preview: (
            <Grid cols={3} gap={4}>
              <GridItem rowSpan={2}>
                <div className="flex h-full items-center justify-center bg-primary/10 p-4">
                  Spans 2 rows
                </div>
              </GridItem>
              <div className="p-4">
                Item
              </div>
              <div className="p-4">
                Item
              </div>
              <div className="p-4">
                Item
              </div>
              <div className="p-4">
                Item
              </div>
            </Grid>
          ),
          code: `<Grid cols={3}>
  <GridItem rowSpan={2}>Tall item</GridItem>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>`,
        },
        {
          title: "Complex Layout",
          description: "Combine column and row spanning for complex grids.",
          preview: (
            <Grid cols={4} gap={4}>
              <GridItem colSpan={2} rowSpan={2}>
                <div className="flex h-full items-center justify-center bg-primary/10 p-4">
                  2x2
                </div>
              </GridItem>
              <div className="p-4">
                1
              </div>
              <div className="p-4">
                2
              </div>
              <div className="p-4">
                3
              </div>
              <div className="p-4">
                4
              </div>
            </Grid>
          ),
          code: `<Grid cols={4}>
  <GridItem colSpan={2} rowSpan={2}>Featured</GridItem>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>`,
        },
      ]}
      props={[
        {
          name: "cols",
          type: "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none'",
          default: "1",
          description: "Number of columns in the grid.",
        },
        {
          name: "gap",
          type: "0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12 | 16 | 20 | 24",
          default: "4",
          description: "Spacing between grid items (in Tailwind units).",
        },
        {
          name: "flow",
          type: '"row" | "col" | "dense" | "row-dense" | "col-dense"',
          default: '"row"',
          description: "Grid auto-flow direction.",
        },
        {
          name: "responsive",
          type: "boolean",
          default: "true",
          description: "Enable responsive column adjustments.",
        },
        {
          name: "as",
          type: "React.ElementType",
          default: '"div"',
          description: "HTML element to render (div, section, ul, etc.).",
        },
        {
          name: "colSpan (GridItem)",
          type: "1-12 | 'auto' | 'full'",
          default: "-",
          description: "Number of columns the item should span.",
        },
        {
          name: "rowSpan (GridItem)",
          type: "1-6 | 'auto' | 'full'",
          default: "-",
          description: "Number of rows the item should span.",
        },
      ]}
      accessibility={[
        "Uses semantic HTML elements via 'as' prop",
        "Supports aria-label and aria-labelledby for labeled regions",
        "Maintains reading order in DOM regardless of visual layout",
        "GridItem preserves accessibility tree structure",
        "Responsive behavior works without JavaScript",
      ]}
      previous={{ title: "Form", href: "/docs/components/form" }}
      next={{ title: "Hover Card", href: "/docs/components/hover-card" }}
    />
  );
}
