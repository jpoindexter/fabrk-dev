"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { AvatarGroup } from "@/components/ui/avatar-group";

export default function AvatarGroupPage() {
  const users = [
    { fallback: "AJ", alt: "Alice Johnson" },
    { fallback: "BS", alt: "Bob Smith" },
    { fallback: "CW", alt: "Carol White" },
    { fallback: "DL", alt: "David Lee" },
    { fallback: "EM", alt: "Eve Martinez" },
  ];

  const manyUsers = [
    { fallback: "U1", alt: "User 1" },
    { fallback: "U2", alt: "User 2" },
    { fallback: "U3", alt: "User 3" },
    { fallback: "U4", alt: "User 4" },
    { fallback: "U5", alt: "User 5" },
    { fallback: "U6", alt: "User 6" },
    { fallback: "U7", alt: "User 7" },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.81]"
      category="Components"
      title="Avatar Group"
      description="Display multiple avatars with overlap and remaining count indicator."
      importCode={`import { AvatarGroup } from "@/components/ui/avatar-group"`}
      mainPreview={{
        preview: <AvatarGroup avatars={users} />,
        code: `const users = [
  { fallback: "AJ", alt: "Alice Johnson" },
  { fallback: "BS", alt: "Bob Smith" },
  { fallback: "CW", alt: "Carol White" },
  { fallback: "DL", alt: "David Lee" },
];

<AvatarGroup avatars={users} />`,
      }}
      variants={[
        {
          title: "Small Size",
          description: "Compact avatar group for tight spaces",
          preview: <AvatarGroup avatars={users} size="sm" />,
          code: `<AvatarGroup
  avatars={users}
  size="sm"
/>`,
        },
        {
          title: "Medium Size",
          description: "Default medium size avatars",
          preview: <AvatarGroup avatars={users} size="md" />,
          code: `<AvatarGroup
  avatars={users}
  size="md"
/>`,
        },
        {
          title: "Large Size",
          description: "Larger avatars for emphasis",
          preview: <AvatarGroup avatars={users} size="lg" />,
          code: `<AvatarGroup
  avatars={users}
  size="lg"
/>`,
        },
        {
          title: "No Overlap",
          description: "Display avatars side by side without overlap",
          preview: <AvatarGroup avatars={users} overlap={false} />,
          code: `<AvatarGroup
  avatars={users}
  overlap={false}
/>`,
        },
        {
          title: "With Max Limit",
          description: "Show only first 3 avatars with +N indicator",
          preview: <AvatarGroup avatars={manyUsers} max={3} />,
          code: `<AvatarGroup
  avatars={users}
  max={3}
/>`,
        },
        {
          title: "With Custom Limit",
          description: "Show only first 2 avatars with remaining count",
          preview: <AvatarGroup avatars={users} max={2} size="lg" />,
          code: `<AvatarGroup
  avatars={users}
  max={2}
  size="lg"
/>`,
        },
        {
          title: "Hover Interaction",
          description: "Avatars scale up on hover for better visibility",
          preview: (
            <div className="rounded-none border border-border bg-card p-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-muted-foreground">
                  [HOVER]: Hover over avatars to see scale effect
                </span>
                <AvatarGroup avatars={users} />
              </div>
            </div>
          ),
          code: `// Hover effects built-in
<AvatarGroup avatars={users} />`,
        },
      ]}
      props={[
        {
          name: "avatars",
          type: "Array<{ src?: string; alt?: string; fallback: string }>",
          default: "-",
          description: "Array of avatar data with fallback initials",
        },
        {
          name: "max",
          type: "number",
          default: "4",
          description: "Maximum number of avatars to display before showing +N",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Avatar size variant",
        },
        {
          name: "overlap",
          type: "boolean",
          default: "true",
          description: "Whether avatars should overlap with ring separation",
        },
        {
          name: "aria-label",
          type: "string",
          default: '"Avatar group"',
          description: "Accessible label for the avatar group",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Additional CSS classes for the container",
        },
      ]}
      accessibility={[
        "Uses role='group' with customizable aria-label",
        "Each avatar has proper alt text for screen readers",
        "Remaining count indicator has descriptive aria-label",
        "Hover effects improve visibility without requiring hover",
        "Ring borders provide visual separation in overlap mode",
        "Keyboard focus visible on interactive elements",
      ]}
      previous={{ title: "Avatar", href: "/docs/components/avatar" }}
      next={{ title: "Badge", href: "/docs/components/badge" }}
    />
  );
}
