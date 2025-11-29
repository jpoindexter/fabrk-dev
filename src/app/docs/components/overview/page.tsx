import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Component, Layers, Code, Palette } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "UI Components Overview - Fabrk Docs",
  description: "Complete list of 100+ production-ready UI components included in Fabrk boilerplate.",
};

const componentCategories = [
  {
    name: "Form Inputs",
    hex: "0x61",
    components: [
      { name: "input", description: "Basic text input field" },
      { name: "input-password", description: "Password input with toggle" },
      { name: "input-search", description: "Search input with icon" },
      { name: "input-number", description: "Numeric input with controls" },
      { name: "input-otp", description: "One-time password input" },
      { name: "textarea", description: "Multi-line text input" },
      { name: "checkbox", description: "Checkbox toggle" },
      { name: "switch", description: "Toggle switch" },
      { name: "select", description: "Dropdown select" },
      { name: "combobox", description: "Searchable select" },
      { name: "multi-select", description: "Multiple selection dropdown" },
      { name: "date-picker", description: "Date selection" },
      { name: "time-picker", description: "Time selection" },
    ],
  },
  {
    name: "Buttons Actions",
    hex: "0x63",
    components: [
      { name: "button", description: "Primary action button" },
      { name: "copy-button", description: "Copy to clipboard" },
    ],
  },
  {
    name: "Data Display",
    hex: "0x64",
    components: [
      { name: "card", description: "Content container card" },
      { name: "table", description: "Data table" },
      { name: "badge", description: "Status badge/tag" },
      { name: "avatar", description: "User avatar" },
      { name: "skeleton", description: "Loading skeleton" },
      { name: "empty-state", description: "Empty state placeholder" },
      { name: "stat-card", description: "Statistics card" },
    ],
  },
  {
    name: "Charts Analytics",
    hex: "0x65",
    components: [
      { name: "sparkline", description: "Inline trend chart" },
      { name: "gauge", description: "Gauge/meter chart" },
      { name: "donut-chart", description: "Donut/ring chart" },
      { name: "progress", description: "Progress bar" },
    ],
  },
  {
    name: "Overlays Modals",
    hex: "0x66",
    components: [
      { name: "dialog", description: "Modal dialog" },
      { name: "alert-dialog", description: "Confirmation dialog" },
      { name: "sheet", description: "Side panel/drawer" },
      { name: "popover", description: "Popover content" },
      { name: "tooltip", description: "Tooltip hover" },
    ],
  },
  {
    name: "Navigation",
    hex: "0x67",
    components: [
      { name: "navigation-menu", description: "Main navigation menu" },
      { name: "dropdown-menu", description: "Dropdown menu" },
      { name: "breadcrumb", description: "Breadcrumb navigation" },
      { name: "tabs", description: "Tab navigation" },
      { name: "pagination", description: "Page pagination" },
      { name: "sidebar", description: "Sidebar navigation" },
      { name: "command", description: "Command palette" },
    ],
  },
  {
    name: "Feedback",
    hex: "0x68",
    components: [
      { name: "alert", description: "Alert message" },
      { name: "toast", description: "Toast notification" },
      { name: "loading", description: "Loading indicator" },
    ],
  },
  {
    name: "File Upload",
    hex: "0x69",
    components: [
      { name: "file-upload", description: "File upload input" },
      { name: "image-dropzone", description: "Drag-drop image upload" },
      { name: "cropper", description: "Image cropper" },
    ],
  },
];

export default function ComponentsOverviewPage() {
  const totalComponents = componentCategories.reduce(
    (acc, cat) => acc + cat.components.length,
    0
  );

  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="UI_Components_Library"
      description="100+ production-ready components built with Radix UI and Tailwind CSS."
      overview={`${totalComponents}+ components across ${componentCategories.length} categories. All fully typed with TypeScript. Built on Radix UI primitives for accessibility.`}
      features={[
        { icon: Component, title: `${totalComponents}+`, description: "Production-ready components." },
        { icon: Layers, title: `${componentCategories.length}`, description: "Component categories." },
        { icon: Code, title: "100%", description: "TypeScript coverage." },
        { icon: Palette, title: "Radix", description: "Accessible primitives." },
      ]}
      usage={[
        {
          title: "Import Pattern",
          description: "Import components from @/components/ui/",
          code: `// Import any component from @/components/ui/
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";`,
          language: "typescript",
        },
      ]}
      previous={{ title: "Getting Started", href: "/docs/getting-started" }}
      next={{ title: "Buttons", href: "/docs/components/buttons" }}
    >
      {/* Component Categories */}
      {componentCategories.map((category) => (
        <DocsSection key={category.name} title={category.name}>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {category.components.map((component) => (
              <div
                key={component.name}
                className="border border-border bg-card p-2 transition-colors hover:border-primary/50"
              >
                <div className="font-mono text-base font-semibold text-foreground">
                  {component.name}
                </div>
                <div className="mt-1 font-mono text-sm text-muted-foreground">
                  {component.description}
                </div>
              </div>
            ))}
          </div>
        </DocsSection>
      ))}

      {/* Documentation Links */}
      <DocsSection title="Detailed Documentation">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/docs/components/buttons">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className={`uppercase ${docsTypography.h4}`}>Buttons</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/forms">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className={`uppercase ${docsTypography.h4}`}>Forms</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/data-display">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className={`uppercase ${docsTypography.h4}`}>Data Display</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/charts">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className={`uppercase ${docsTypography.h4}`}>Charts</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/modals">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className={`uppercase ${docsTypography.h4}`}>Modals</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/uploads">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className={`uppercase ${docsTypography.h4}`}>Uploads</h3>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
