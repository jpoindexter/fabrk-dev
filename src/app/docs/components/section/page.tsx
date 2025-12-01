"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Section, SectionHeader } from "@/components/ui/section";

export default function SectionPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.77]"
      category="Components"
      title="Section"
      description="Semantic section layout component with built-in spacing and container."
      importCode={`import { Section, SectionHeader } from "@/components/ui/section"`}
      mainPreview={{
        preview: (
          <Section spacing="md" className="border border-border bg-card">
            <SectionHeader
              title="Section Title"
              description="This is a section with default spacing and container."
            />
            <div className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">&gt;</span> Section content goes here
            </div>
          </Section>
        ),
        code: `<Section>
  <SectionHeader
    title="Section Title"
    description="Description text"
  />
  <div>Content</div>
</Section>`,
      }}
      variants={[
        {
          title: "Small Spacing",
          description: "Compact section with minimal padding.",
          preview: (
            <Section spacing="sm" className="border border-border bg-card">
              <div className="font-mono text-sm text-muted-foreground">
                Small spacing (py-8 md:py-12)
              </div>
            </Section>
          ),
          code: `<Section spacing="sm">
  <div>Content</div>
</Section>`,
        },
        {
          title: "Large Spacing",
          description: "Generous spacing for landing pages.",
          preview: (
            <Section spacing="lg" className="border border-border bg-card">
              <div className="font-mono text-sm text-muted-foreground">
                Large spacing (py-16 md:py-24)
              </div>
            </Section>
          ),
          code: `<Section spacing="lg">
  <div>Content</div>
</Section>`,
        },
        {
          title: "With Header",
          description: "Section with centered header component.",
          preview: (
            <Section className="border border-border bg-card">
              <SectionHeader
                subtitle="Features"
                title="What We Offer"
                description="Explore the features that make our product unique."
                align="center"
              />
            </Section>
          ),
          code: `<Section>
  <SectionHeader
    subtitle="Features"
    title="What We Offer"
    description="Description"
  />
</Section>`,
        },
        {
          title: "Left Aligned Header",
          description: "Section header aligned to the left.",
          preview: (
            <Section className="border border-border bg-card">
              <SectionHeader
                title="Dashboard"
                description="Manage your account settings and preferences."
                align="left"
              />
            </Section>
          ),
          code: `<Section>
  <SectionHeader
    title="Dashboard"
    description="Description"
    align="left"
  />
</Section>`,
        },
        {
          title: "Muted Background",
          description: "Section with alternate background color.",
          preview: (
            <Section background="muted" className="border border-border">
              <div className="font-mono text-sm text-muted-foreground">
                <span className="text-primary">&gt;</span> Muted background section
              </div>
            </Section>
          ),
          code: `<Section background="muted">
  <div>Content</div>
</Section>`,
        },
        {
          title: "Primary Background",
          description: "Section with primary brand color background.",
          preview: (
            <Section background="primary" className="border border-border">
              <div className="font-mono text-sm text-primary-foreground">
                <span className="text-primary-foreground/70">&gt;</span> Primary background section
              </div>
            </Section>
          ),
          code: `<Section background="primary">
  <div>Content</div>
</Section>`,
        },
        {
          title: "No Container",
          description: "Section without automatic container wrapper.",
          preview: (
            <Section container={false} className="border border-border bg-card px-4">
              <div className="font-mono text-sm text-muted-foreground">
                No container wrapper applied
              </div>
            </Section>
          ),
          code: `<Section container={false}>
  <div>Content with custom layout</div>
</Section>`,
        },
        {
          title: "Custom Container Size",
          description: "Section with specific container max-width.",
          preview: (
            <Section containerSize="md" className="border border-border bg-card">
              <div className="font-mono text-sm text-muted-foreground">
                Container max-width: md (768px)
              </div>
            </Section>
          ),
          code: `<Section containerSize="md">
  <div>Content</div>
</Section>`,
        },
      ]}
      props={[
        {
          name: "spacing",
          type: '"none" | "sm" | "md" | "lg" | "xl" | "2xl"',
          default: '"md"',
          description: "Vertical padding (py) for the section.",
        },
        {
          name: "background",
          type: '"none" | "muted" | "accent" | "card" | "primary" | "secondary" | "destructive" | "gradient"',
          default: '"none"',
          description: "Background color or gradient.",
        },
        {
          name: "container",
          type: "boolean",
          default: "true",
          description: "Wrap children in a container with max-width.",
        },
        {
          name: "containerSize",
          type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
          default: '"2xl"',
          description: "Maximum width of the container.",
        },
        {
          name: "as",
          type: "React.ElementType",
          default: '"section"',
          description: "HTML element to render (section, article, div, etc.).",
        },
        {
          name: "title (SectionHeader)",
          type: "React.ReactNode",
          default: "-",
          description: "Section heading text.",
        },
        {
          name: "subtitle (SectionHeader)",
          type: "React.ReactNode",
          default: "-",
          description: "Small text above the title.",
        },
        {
          name: "description (SectionHeader)",
          type: "React.ReactNode",
          default: "-",
          description: "Description text below the title.",
        },
        {
          name: "align (SectionHeader)",
          type: '"left" | "center" | "right"',
          default: '"center"',
          description: "Text alignment for the header.",
        },
      ]}
      accessibility={[
        "Uses semantic <section> element by default",
        "Supports aria-label and aria-labelledby for labeled regions",
        "SectionHeader uses proper heading hierarchy (h2)",
        "Container maintains responsive padding for all screen sizes",
        "Background colors maintain sufficient contrast ratios",
        "Works without JavaScript for universal accessibility",
      ]}
      previous={{ title: "Scroll Area", href: "/docs/components/scroll-area" }}
      next={{ title: "Select", href: "/docs/components/select" }}
    />
  );
}
