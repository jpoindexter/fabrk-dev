import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection } from "@/components/docs";
import { Component, Layers, Code, Palette } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "UI Components Overview - Fabrk Docs",
  description: "Complete list of 100+ production-ready UI components included in Fabrk boilerplate.",
};

const componentCategories = [
  {
    name: "Form Inputs",
    hex: "0x61",
    components: [
      { name: "accordion", description: "Collapsible content panels" },
      { name: "autocomplete", description: "Search input with suggestions" },
      { name: "calendar", description: "Date selection calendar" },
      { name: "checkbox", description: "Checkbox toggle" },
      { name: "color-picker", description: "Color selection with preview" },
      { name: "combobox", description: "Searchable select" },
      { name: "date-picker", description: "Date selection" },
      { name: "date-range-picker", description: "Date range selection" },
      { name: "datetime-picker", description: "Date and time selection" },
      { name: "field", description: "Form field wrapper" },
      { name: "form", description: "Form with validation" },
      { name: "form-error", description: "Error message component" },
      { name: "input", description: "Basic text input field" },
      { name: "input-group", description: "Grouped inputs with addons" },
      { name: "input-number", description: "Numeric input with controls" },
      { name: "input-otp", description: "One-time password input" },
      { name: "input-password", description: "Password input with toggle" },
      { name: "input-search", description: "Search input with icon" },
      { name: "label", description: "Form label component" },
      { name: "multi-select", description: "Multiple selection dropdown" },
      { name: "multi-step-form", description: "Multi-step form wizard" },
      { name: "password-strength", description: "Password strength indicator" },
      { name: "radio-group", description: "Radio button group" },
      { name: "rating", description: "Star rating component" },
      { name: "rich-text-editor", description: "WYSIWYG editor" },
      { name: "select", description: "Dropdown select" },
      { name: "slider", description: "Range slider" },
      { name: "switch", description: "Toggle switch" },
      { name: "textarea", description: "Multi-line text input" },
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
      { name: "activity-timeline", description: "Timeline of activities" },
      { name: "avatar", description: "User avatar" },
      { name: "avatar-group", description: "Group of avatars" },
      { name: "badge", description: "Status badge/tag" },
      { name: "banner", description: "Announcement banner" },
      { name: "card", description: "Content container card" },
      { name: "code-block", description: "Syntax highlighted code" },
      { name: "data-table-header", description: "Table header with sorting" },
      { name: "empty-state", description: "Empty state placeholder" },
      { name: "kpi-card", description: "Key performance indicator" },
      { name: "member-card", description: "Team member card" },
      { name: "skeleton", description: "Loading skeleton" },
      { name: "stat-card", description: "Statistics card" },
      { name: "status-indicator", description: "Status dot indicator" },
      { name: "table", description: "Data table" },
      { name: "typography", description: "Typography components" },
    ],
  },
  {
    name: "Charts Analytics",
    hex: "0x65",
    components: [
      { name: "donut-chart", description: "Donut/ring chart" },
      { name: "funnel-chart", description: "Funnel visualization" },
      { name: "gauge", description: "Gauge/meter chart" },
      { name: "heatmap", description: "Heatmap visualization" },
      { name: "pie-chart", description: "Pie chart" },
      { name: "progress", description: "Progress bar" },
      { name: "sparkline", description: "Inline trend chart" },
    ],
  },
  {
    name: "Overlays Modals",
    hex: "0x66",
    components: [
      { name: "alert-dialog", description: "Confirmation dialog" },
      { name: "context-menu", description: "Right-click menu" },
      { name: "dialog", description: "Modal dialog" },
      { name: "hover-card", description: "Card on hover" },
      { name: "popover", description: "Popover content" },
      { name: "sheet", description: "Side panel/drawer" },
      { name: "tooltip", description: "Tooltip hover" },
    ],
  },
  {
    name: "Navigation",
    hex: "0x67",
    components: [
      { name: "breadcrumb", description: "Breadcrumb navigation" },
      { name: "command", description: "Command palette" },
      { name: "dropdown-menu", description: "Dropdown menu" },
      { name: "menubar", description: "Horizontal menu bar" },
      { name: "navigation", description: "Site navigation" },
      { name: "navigation-menu", description: "Main navigation menu" },
      { name: "pagination", description: "Page pagination" },
      { name: "sidebar", description: "Sidebar navigation" },
      { name: "tabs", description: "Tab navigation" },
    ],
  },
  {
    name: "Layout Structure",
    hex: "0x6A",
    components: [
      { name: "aspect-ratio", description: "Maintain aspect ratios" },
      { name: "collapsible", description: "Expandable content" },
      { name: "container", description: "Responsive container" },
      { name: "grid", description: "CSS grid layout" },
      { name: "page-wrapper", description: "Page layout wrapper" },
      { name: "scroll-area", description: "Custom scrollable area" },
      { name: "section", description: "Page section wrapper" },
      { name: "separator", description: "Visual separator" },
      { name: "stack", description: "Vertical/horizontal stack" },
    ],
  },
  {
    name: "Feedback Notifications",
    hex: "0x68",
    components: [
      { name: "alert", description: "Alert message" },
      { name: "loading", description: "Loading indicator" },
      { name: "notification-badge", description: "Count badge" },
      { name: "notification-center", description: "Notification dropdown" },
      { name: "notification-list", description: "Notification list" },
      { name: "toast", description: "Toast notification" },
      { name: "toaster", description: "Toast provider" },
    ],
  },
  {
    name: "Media Upload",
    hex: "0x69",
    components: [
      { name: "cropper", description: "Image cropper" },
      { name: "cropper-controls", description: "Cropper zoom/rotate" },
      { name: "file-upload", description: "File upload input" },
      { name: "image-dropzone", description: "Drag-drop image upload" },
      { name: "image-uploader", description: "Image uploader" },
      { name: "lightbox", description: "Full-screen viewer" },
      { name: "mermaid", description: "Mermaid diagrams" },
    ],
  },
  {
    name: "Landing Pages",
    hex: "0x6B",
    components: [
      { name: "faq", description: "FAQ section" },
      { name: "features", description: "Features section" },
      { name: "footer", description: "Site footer" },
      { name: "hero", description: "Hero section" },
      { name: "pricing", description: "Pricing section" },
      { name: "testimonials", description: "Testimonials section" },
    ],
  },
  {
    name: "Specialized",
    hex: "0x6C",
    components: [
      { name: "code-generator", description: "AI code generation" },
      { name: "invite-form", description: "Team invitation form" },
      { name: "markdown-editor", description: "Markdown editor" },
      { name: "markdown-viewer", description: "Markdown renderer" },
      { name: "prompt-builder", description: "AI prompt builder" },
      { name: "role-selector", description: "Role selection" },
      { name: "simple-icon", description: "Brand icons" },
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
      next={{ title: "Button", href: "/docs/components/button" }}
    >
      {/* Component Categories */}
      {componentCategories.map((category) => (
        <DocsSection key={category.name} title={category.name}>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {category.components.map((component) => (
              <Link
                key={component.name}
                href={`/docs/components/${component.name}`}
                className="block border border-border bg-card p-2 transition-colors hover:border-primary/50 hover:bg-accent/5"
              >
                <div className="font-mono text-base font-semibold text-foreground">
                  {component.name}
                </div>
                <div className="mt-1 font-mono text-sm text-muted-foreground">
                  {component.description}
                </div>
              </Link>
            ))}
          </div>
        </DocsSection>
      ))}
    </FeatureGuideTemplate>
  );
}
