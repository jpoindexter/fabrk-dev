"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SkeletonPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.13]"
      title="Skeleton"
      description="A loading placeholder component that displays an animated pulse effect while content is being fetched or processed."
      importCode={`import { Skeleton } from "@/components/ui/skeleton";`}
      mainPreview={{
        preview: (
          <Skeleton className="h-12 w-[250px]" />
        ),
        code: `<Skeleton className="h-12 w-[250px]" />`,
      }}
      variants={[
        {
          title: "Text Skeleton",
          description: "Skeleton placeholders for text content",
          preview: (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          ),
          code: `<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
  <Skeleton className="h-4 w-[150px]" />
</div>`,
        },
        {
          title: "Card Skeleton",
          description: "Full card loading state with header and content",
          preview: (
            <Card className="w-[350px]">
              <CardHeader>
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ),
          code: `<Card className="w-[350px]">
  <CardHeader>
    <Skeleton className="h-6 w-[200px]" />
    <Skeleton className="h-4 w-[150px]" />
  </CardHeader>
  <CardContent className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </CardContent>
</Card>`,
        },
        {
          title: "Avatar Skeleton",
          description: "Circular skeleton for avatar placeholders",
          preview: (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ),
          code: `<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[150px]" />
  </div>
</div>`,
        },
        {
          title: "List Skeleton",
          description: "Skeleton for a list of items",
          preview: (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ),
          code: `<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-md" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ))}
</div>`,
        },
        {
          title: "Image Skeleton",
          description: "Rectangle skeleton for image placeholders",
          preview: (
            <div className="space-y-4">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ),
          code: `<div className="space-y-4">
  <Skeleton className="h-[200px] w-full rounded-lg" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
  </div>
</div>`,
        },
        {
          title: "Dashboard Skeleton",
          description: "Complex skeleton for dashboard widgets",
          preview: (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-6 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </Card>
                <Card className="p-6 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </Card>
                <Card className="p-6 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </Card>
              </div>
              <Card className="p-6 space-y-4">
                <Skeleton className="h-6 w-[200px]" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </Card>
            </div>
          ),
          code: `<div className="space-y-4">
  <div className="grid grid-cols-3 gap-4">
    <Card className="p-6 space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-16" />
    </Card>
    {/* More stat cards... */}
  </div>
  <Card className="p-6 space-y-4">
    <Skeleton className="h-6 w-[200px]" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </Card>
</div>`,
        },
      ]}
      props={[
        {
          name: "className",
          type: "string",
          description: "CSS classes for sizing and styling the skeleton. Use Tailwind utilities for width (w-*), height (h-*), and border radius (rounded-*)",
        },
        {
          name: "...props",
          type: "React.HTMLAttributes<HTMLDivElement>",
          description: "All standard div HTML attributes are supported",
        },
      ]}
      accessibility={[
        "Skeleton components are purely visual - they don't require specific accessibility attributes",
        "The pulse animation provides a clear visual indicator that content is loading",
        "Consider adding aria-busy='true' or aria-label='Loading content' to parent containers when using skeletons",
        "For screen readers, ensure the actual content has proper loading states with appropriate ARIA live regions",
        "The skeleton should match the layout of the actual content to prevent layout shift",
        "Use appropriate border radius classes (rounded-full for avatars, rounded-lg for images) to match final content",
      ]}
      previous={{ title: "Avatar", href: "/docs/components/avatar" }}
      next={{ title: "Form Components", href: "/docs/components" }}
    />
  );
}
