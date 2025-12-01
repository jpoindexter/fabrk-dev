"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.12]"
      title="Avatar"
      description="A user profile image component with automatic fallback support for when images fail to load."
      importCode={`import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";`}
      mainPreview={{
        preview: (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ),
        code: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
      }}
      variants={[
        {
          title: "With Image",
          description: "Avatar with a loaded image",
          preview: (
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
          ),
          code: `<Avatar>
  <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
  <AvatarFallback>VC</AvatarFallback>
</Avatar>`,
        },
        {
          title: "Fallback Only",
          description: "Avatar showing fallback text (no image or failed load)",
          preview: (
            <Avatar>
              <AvatarImage src="/invalid-url.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ),
          code: `<Avatar>
  <AvatarImage src="/invalid-url.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
        },
        {
          title: "Custom Sizes",
          description: "Avatars in different sizes",
          preview: (
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="Default" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
                <AvatarFallback className="text-lg">LG</AvatarFallback>
              </Avatar>
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large" />
                <AvatarFallback className="text-2xl">XL</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `<Avatar className="h-8 w-8">
  <AvatarImage src="..." alt="Small" />
  <AvatarFallback className="text-xs">SM</AvatarFallback>
</Avatar>

<Avatar className="h-16 w-16">
  <AvatarImage src="..." alt="Large" />
  <AvatarFallback className="text-lg">LG</AvatarFallback>
</Avatar>`,
        },
        {
          title: "Avatar Group",
          description: "Multiple avatars in a horizontal group",
          preview: (
            <div className="flex -space-x-4">
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://github.com/vercel.png" alt="User 2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="/invalid.png" alt="User 3" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback>+5</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `<div className="flex -space-x-4">
  <Avatar className="border-2 border-background">
    <AvatarImage src="..." alt="User 1" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="..." alt="User 2" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+5</AvatarFallback>
  </Avatar>
</div>`,
        },
        {
          title: "Colored Fallbacks",
          description: "Avatars with custom colored fallback backgrounds",
          preview: (
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-success text-success-foreground">CD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-secondary text-secondary-foreground">EF</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-warning text-warning-foreground">GH</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `<Avatar>
  <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-success text-success-foreground">CD</AvatarFallback>
</Avatar>`,
        },
        {
          title: "With Status Indicator",
          description: "Avatar with online/offline status badge",
          preview: (
            <div className="flex gap-4">
              <div className="relative">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Online User" />
                  <AvatarFallback>ON</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-success" />
              </div>
              <div className="relative">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" alt="Busy User" />
                  <AvatarFallback>BS</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-warning" />
              </div>
              <div className="relative">
                <Avatar>
                  <AvatarFallback>OF</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-muted-foreground" />
              </div>
            </div>
          ),
          code: `<div className="relative">
  <Avatar>
    <AvatarImage src="..." alt="Online User" />
    <AvatarFallback>ON</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-success" />
</div>`,
        },
      ]}
      props={[
        {
          name: "Avatar",
          type: "React.ComponentProps",
          description: "Root avatar container - accepts all div props plus Radix Avatar.Root props",
        },
        {
          name: "AvatarImage.src",
          type: "string",
          description: "Image URL to display",
        },
        {
          name: "AvatarImage.alt",
          type: "string",
          description: "Alt text for the image (required for accessibility)",
        },
        {
          name: "AvatarFallback",
          type: "React.ReactNode",
          description: "Content to display when image fails to load or while loading",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply to any avatar component",
        },
      ]}
      accessibility={[
        "Always provide alt text for AvatarImage - it describes the user/entity to screen readers",
        "Fallback content should be concise - typically 1-2 initials or a short abbreviation",
        "The component automatically handles image loading failures and shows the fallback",
        "Avatar uses Radix UI primitives for robust accessibility support",
        "When using avatars in groups, each should have a unique alt text",
        "Status indicators should use aria-label to describe the status to screen readers",
      ]}
      previous={{ title: "Badge", href: "/docs/components/badge" }}
      next={{ title: "Skeleton", href: "/docs/components/skeleton" }}
    />
  );
}
