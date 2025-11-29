import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "UI Components Overview - Fabrk Docs",
  description: "Complete list of 100+ production-ready UI components included in Fabrk boilerplate.",
};

const componentCategories = [
  {
    name: "FORM_INPUTS",
    hex: "0x61",
    components: [
      { name: "input", description: "Basic text input field" },
      { name: "input-color", description: "Color picker input" },
      { name: "input-group", description: "Grouped input with addons" },
      { name: "input-number", description: "Numeric input with controls" },
      { name: "input-otp", description: "One-time password input" },
      { name: "input-password", description: "Password input with toggle" },
      { name: "input-search", description: "Search input with icon" },
      { name: "textarea", description: "Multi-line text input" },
      { name: "checkbox", description: "Checkbox toggle" },
      { name: "radio-group", description: "Radio button group" },
      { name: "switch", description: "Toggle switch" },
      { name: "slider", description: "Range slider" },
      { name: "select", description: "Dropdown select" },
      { name: "combobox", description: "Searchable select" },
      { name: "autocomplete", description: "Autocomplete input" },
      { name: "multi-select", description: "Multiple selection dropdown" },
      { name: "form", description: "Form wrapper with validation" },
      { name: "form-error", description: "Form error display" },
      { name: "field", description: "Form field wrapper" },
      { name: "label", description: "Form label" },
    ],
  },
  {
    name: "DATE_TIME",
    hex: "0x62",
    components: [
      { name: "calendar", description: "Interactive calendar" },
      { name: "date-picker", description: "Date selection" },
      { name: "date-range-picker", description: "Date range selection" },
      { name: "datetime-picker", description: "Date and time selection" },
      { name: "time-picker", description: "Time selection" },
    ],
  },
  {
    name: "BUTTONS_ACTIONS",
    hex: "0x63",
    components: [
      { name: "button", description: "Primary action button" },
      { name: "copy-button", description: "Copy to clipboard" },
    ],
  },
  {
    name: "DATA_DISPLAY",
    hex: "0x64",
    components: [
      { name: "card", description: "Content container card" },
      { name: "table", description: "Data table" },
      { name: "data-table-header", description: "Table header utilities" },
      { name: "badge", description: "Status badge/tag" },
      { name: "avatar", description: "User avatar" },
      { name: "avatar-group", description: "Stacked avatars" },
      { name: "skeleton", description: "Loading skeleton" },
      { name: "empty-state", description: "Empty state placeholder" },
      { name: "stat-card", description: "Statistics card" },
      { name: "kpi-card", description: "KPI display card" },
      { name: "activity-timeline", description: "Activity feed timeline" },
      { name: "status-indicator", description: "Status dot indicator" },
      { name: "rating", description: "Star rating display" },
      { name: "member-card", description: "Team member card" },
    ],
  },
  {
    name: "CHARTS_ANALYTICS",
    hex: "0x65",
    components: [
      { name: "sparkline", description: "Inline trend chart" },
      { name: "gauge", description: "Gauge/meter chart" },
      { name: "donut-chart", description: "Donut/ring chart" },
      { name: "pie-chart", description: "Pie chart" },
      { name: "funnel-chart", description: "Funnel/conversion chart" },
      { name: "heatmap", description: "Heat map visualization" },
      { name: "progress", description: "Progress bar" },
    ],
  },
  {
    name: "OVERLAYS_MODALS",
    hex: "0x66",
    components: [
      { name: "dialog", description: "Modal dialog" },
      { name: "alert-dialog", description: "Confirmation dialog" },
      { name: "sheet", description: "Side panel/drawer" },
      { name: "popover", description: "Popover content" },
      { name: "tooltip", description: "Tooltip hover" },
      { name: "hover-card", description: "Hover preview card" },
      { name: "lightbox", description: "Image lightbox viewer" },
    ],
  },
  {
    name: "NAVIGATION",
    hex: "0x67",
    components: [
      { name: "navigation-menu", description: "Main navigation menu" },
      { name: "menubar", description: "Menu bar" },
      { name: "dropdown-menu", description: "Dropdown menu" },
      { name: "context-menu", description: "Right-click menu" },
      { name: "breadcrumb", description: "Breadcrumb navigation" },
      { name: "tabs", description: "Tab navigation" },
      { name: "pagination", description: "Page pagination" },
      { name: "sidebar", description: "Sidebar navigation" },
      { name: "command", description: "Command palette" },
    ],
  },
  {
    name: "FEEDBACK",
    hex: "0x68",
    components: [
      { name: "alert", description: "Alert message" },
      { name: "banner", description: "Banner notification" },
      { name: "toast", description: "Toast notification" },
      { name: "toaster", description: "Toast container" },
      { name: "loading", description: "Loading indicator" },
      { name: "notification-badge", description: "Notification count badge" },
      { name: "notification-center", description: "Notification center panel" },
      { name: "notification-list", description: "Notification list" },
      { name: "password-strength", description: "Password strength meter" },
    ],
  },
  {
    name: "FILE_UPLOAD",
    hex: "0x69",
    components: [
      { name: "file-upload", description: "File upload input" },
      { name: "image-dropzone", description: "Drag-drop image upload" },
      { name: "image-uploader", description: "Image upload with preview" },
      { name: "cropper", description: "Image cropper" },
      { name: "cropper-controls", description: "Cropper controls" },
    ],
  },
  {
    name: "EDITORS",
    hex: "0x6A",
    components: [
      { name: "markdown-editor", description: "Markdown text editor" },
      { name: "markdown-viewer", description: "Markdown renderer" },
      { name: "rich-text-editor", description: "WYSIWYG editor" },
      { name: "code-block", description: "Syntax highlighted code" },
      { name: "code-generator", description: "Code generation display" },
      { name: "mermaid", description: "Mermaid diagram renderer" },
      { name: "color-picker", description: "Color selection tool" },
      { name: "prompt-builder", description: "AI prompt builder" },
    ],
  },
  {
    name: "LAYOUT",
    hex: "0x6B",
    components: [
      { name: "container", description: "Max-width container" },
      { name: "grid", description: "CSS grid wrapper" },
      { name: "stack", description: "Flex stack layout" },
      { name: "section", description: "Page section wrapper" },
      { name: "page-wrapper", description: "Page layout wrapper" },
      { name: "separator", description: "Visual separator" },
      { name: "scroll-area", description: "Scrollable area" },
      { name: "aspect-ratio", description: "Aspect ratio container" },
      { name: "accordion", description: "Collapsible sections" },
      { name: "collapsible", description: "Collapsible content" },
    ],
  },
  {
    name: "SPECIALIZED",
    hex: "0x6C",
    components: [
      { name: "invite-form", description: "Team invitation form" },
      { name: "role-selector", description: "Role/permission selector" },
      { name: "multi-step-form", description: "Multi-step form wizard" },
      { name: "simple-icon", description: "Simple icons renderer" },
      { name: "typography", description: "Typography components" },
    ],
  },
];

export default function ComponentsOverviewPage() {
  const totalComponents = componentCategories.reduce(
    (acc, cat) => acc + cat.components.length,
    0
  );

  return (
    <div className="space-y-16">
      {/* Header */}
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-2 py-1">
          <span className="font-mono text-xs text-muted-foreground">
            [ [0x60] COMPONENTS ] UI_LIBRARY │ {totalComponents} COMPONENTS
          </span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">
          UI_COMPONENTS_LIBRARY
        </h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; 100+ production-ready components built with Radix UI and Tailwind CSS.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="rounded-none">
          <CardContent className="p-4 text-center">
            <div className="font-mono text-lg font-bold text-primary">{totalComponents}+</div>
            <div className="font-mono text-xs text-muted-foreground">COMPONENTS</div>
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardContent className="p-4 text-center">
            <div className="font-mono text-lg font-bold text-primary">{componentCategories.length}</div>
            <div className="font-mono text-xs text-muted-foreground">CATEGORIES</div>
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardContent className="p-4 text-center">
            <div className="font-mono text-lg font-bold text-primary">100%</div>
            <div className="font-mono text-xs text-muted-foreground">TYPESCRIPT</div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="space-y-16">
        {componentCategories.map((category) => (
          <div key={category.name}>
            <div className="mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">[{category.hex}]</span>
              <h2 className="font-mono text-lg font-bold">{category.name}</h2>
              <span className="font-mono text-xs text-muted-foreground">
                ({category.components.length})
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {category.components.map((component) => (
                <div
                  key={component.name}
                  className="rounded-none border border-border bg-card p-2 transition-colors hover:border-primary/50"
                >
                  <div className="font-mono text-xs font-semibold text-foreground">
                    {component.name}
                  </div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground">
                    {component.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Import Example */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">IMPORT_PATTERN</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <pre className="font-mono text-xs text-muted-foreground">
              {`// Import any component from @/components/ui/
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";`}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Component Docs Links */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">DETAILED_DOCUMENTATION</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; See individual component pages for usage examples and API reference:
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/docs/components/buttons" className="block rounded-none border border-border bg-card p-2 transition-colors hover:border-primary/50">
            <span className="font-mono text-xs">&gt; BUTTONS</span>
          </Link>
          <Link href="/docs/components/forms" className="block rounded-none border border-border bg-card p-2 transition-colors hover:border-primary/50">
            <span className="font-mono text-xs">&gt; FORMS_INPUTS</span>
          </Link>
          <Link href="/docs/components/data-display" className="block rounded-none border border-border bg-card p-2 transition-colors hover:border-primary/50">
            <span className="font-mono text-xs">&gt; DATA_DISPLAY</span>
          </Link>
          <Link href="/docs/components/charts" className="block rounded-none border border-border bg-card p-2 transition-colors hover:border-primary/50">
            <span className="font-mono text-xs">&gt; CHARTS_ANALYTICS</span>
          </Link>
          <Link href="/docs/components/modals" className="block rounded-none border border-border bg-card p-2 transition-colors hover:border-primary/50">
            <span className="font-mono text-xs">&gt; MODALS_DIALOGS</span>
          </Link>
          <Link href="/docs/components/uploads" className="block rounded-none border border-border bg-card p-2 transition-colors hover:border-primary/50">
            <span className="font-mono text-xs">&gt; UPLOAD_COMPONENTS</span>
          </Link>
        </div>
      </div>

      {/* Back link */}
      <div className="pt-3">
        <Link href="/docs/getting-started" className="font-mono text-xs text-primary hover:underline">
          &lt;─ BACK_TO_DOCS
        </Link>
      </div>
    </div>
  );
}
