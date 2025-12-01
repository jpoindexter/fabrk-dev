"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.71]"
      category="Components"
      title="Aspect Ratio"
      description="Displays content within a fixed aspect ratio container."
      importCode={`import { AspectRatio } from "@/components/ui/aspect-ratio"`}
      mainPreview={{
        preview: (
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <div className="flex h-full items-center justify-center rounded-none border border-border font-mono text-sm text-muted-foreground">
              16:9 Aspect Ratio
            </div>
          </AspectRatio>
        ),
        code: `<AspectRatio ratio={16 / 9} className="bg-muted">
  <div className="flex h-full items-center justify-center">
    16:9 Aspect Ratio
  </div>
</AspectRatio>`,
      }}
      variants={[
        {
          title: "16:9 (Video)",
          description: "Standard video aspect ratio for YouTube, Vimeo, etc.",
          preview: (
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <div className="flex h-full items-center justify-center rounded-none border border-border font-mono text-sm text-muted-foreground">
                16:9
              </div>
            </AspectRatio>
          ),
          code: `<AspectRatio ratio={16 / 9}>
  <div>16:9 Content</div>
</AspectRatio>`,
        },
        {
          title: "4:3 (Classic)",
          description: "Classic aspect ratio for older displays.",
          preview: (
            <AspectRatio ratio={4 / 3} className="bg-muted">
              <div className="flex h-full items-center justify-center rounded-none border border-border font-mono text-sm text-muted-foreground">
                4:3
              </div>
            </AspectRatio>
          ),
          code: `<AspectRatio ratio={4 / 3}>
  <div>4:3 Content</div>
</AspectRatio>`,
        },
        {
          title: "1:1 (Square)",
          description: "Square aspect ratio for avatars and thumbnails.",
          preview: (
            <div className="w-48">
              <AspectRatio ratio={1} className="bg-muted">
                <div className="flex h-full items-center justify-center rounded-none border border-border font-mono text-sm text-muted-foreground">
                  1:1
                </div>
              </AspectRatio>
            </div>
          ),
          code: `<AspectRatio ratio={1}>
  <div>1:1 Content</div>
</AspectRatio>`,
        },
        {
          title: "21:9 (Ultrawide)",
          description: "Ultrawide aspect ratio for cinematic content.",
          preview: (
            <AspectRatio ratio={21 / 9} className="bg-muted">
              <div className="flex h-full items-center justify-center rounded-none border border-border font-mono text-sm text-muted-foreground">
                21:9
              </div>
            </AspectRatio>
          ),
          code: `<AspectRatio ratio={21 / 9}>
  <div>21:9 Content</div>
</AspectRatio>`,
        },
        {
          title: "With Image",
          description: "Maintain aspect ratio for responsive images.",
          preview: (
            <div className="w-64">
              <AspectRatio ratio={16 / 9}>
                <div className="flex h-full items-center justify-center rounded-none border border-border bg-gradient-to-br from-primary/20 to-primary/5 font-mono text-sm text-muted-foreground">
                  Image Placeholder
                </div>
              </AspectRatio>
            </div>
          ),
          code: `<AspectRatio ratio={16 / 9}>
  <img
    src="/image.jpg"
    alt="Description"
    className="h-full w-full object-cover"
  />
</AspectRatio>`,
        },
        {
          title: "Video Embed",
          description: "Responsive video embeds with maintained aspect ratio.",
          preview: (
            <AspectRatio ratio={16 / 9}>
              <div className="flex h-full items-center justify-center rounded-none border border-border bg-background font-mono text-sm text-muted-foreground">
                <span className="text-primary">&gt;</span> Video Player
              </div>
            </AspectRatio>
          ),
          code: `<AspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.youtube.com/embed/..."
    className="h-full w-full"
  />
</AspectRatio>`,
        },
      ]}
      props={[
        {
          name: "ratio",
          type: "number",
          default: "1",
          description: "The desired aspect ratio (width / height).",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Render as child element instead of div wrapper.",
        },
      ]}
      accessibility={[
        "Uses Radix UI AspectRatio primitive for reliable aspect ratio maintenance",
        "Preserves aspect ratio across all viewport sizes",
        "Works with any content type (images, videos, iframes, divs)",
        "No layout shift during loading when properly implemented",
        "Supports nested content with full accessibility tree",
      ]}
      previous={{ title: "Alert Dialog", href: "/docs/components/alert-dialog" }}
      next={{ title: "Avatar", href: "/docs/components/avatar" }}
    />
  );
}
