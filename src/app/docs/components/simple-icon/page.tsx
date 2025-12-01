"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siGithub,
  siVercel,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siDocker,
  siNetlify,
  siSupabase,
} from "simple-icons";

export default function SimpleIconPage() {
  const techStack = [
    { name: "React", icon: siReact },
    { name: "Next.js", icon: siNextdotjs },
    { name: "TypeScript", icon: siTypescript },
    { name: "Tailwind CSS", icon: siTailwindcss },
  ];

  const platforms = [
    { name: "GitHub", icon: siGithub },
    { name: "Vercel", icon: siVercel },
    { name: "Netlify", icon: siNetlify },
    { name: "Supabase", icon: siSupabase },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.109]"
      category="Components"
      title="Simple Icon"
      description="Lightweight SVG icon renderer for simple-icons package with 3000+ brand icons."
      importCode={`import { SimpleIcon } from "@/components/ui/simple-icon"
import { siReact } from "simple-icons"`}
      mainPreview={{
        preview: <SimpleIcon path={siReact.path} title="React" className="h-12 w-12" />,
        code: `import { siReact } from "simple-icons";

<SimpleIcon
  path={siReact.path}
  title="React"
  className="h-12 w-12"
/>`,
      }}
      variants={[
        {
          title: "Tech Stack Icons",
          description: "Display common technology and framework icons.",
          preview: (
            <div className="flex gap-4">
              {techStack.map(({ name, icon }) => (
                <SimpleIcon
                  key={name}
                  path={icon.path}
                  title={name}
                  className="h-10 w-10"
                />
              ))}
            </div>
          ),
          code: `const techStack = [
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "TypeScript", icon: siTypescript },
  { name: "Tailwind CSS", icon: siTailwindcss },
];

<div className="flex gap-4">
  {techStack.map(({ name, icon }) => (
    <SimpleIcon
      key={name}
      path={icon.path}
      title={name}
      className="h-10 w-10"
    />
  ))}
</div>`,
        },
        {
          title: "Platform Icons",
          description: "Show hosting and cloud platform icons.",
          preview: (
            <div className="flex gap-4">
              {platforms.map(({ name, icon }) => (
                <SimpleIcon
                  key={name}
                  path={icon.path}
                  title={name}
                  className="h-10 w-10"
                />
              ))}
            </div>
          ),
          code: `const platforms = [
  { name: "GitHub", icon: siGithub },
  { name: "Vercel", icon: siVercel },
  { name: "Netlify", icon: siNetlify },
  { name: "Supabase", icon: siSupabase },
];

<div className="flex gap-4">
  {platforms.map(({ name, icon }) => (
    <SimpleIcon
      key={name}
      path={icon.path}
      title={name}
      className="h-10 w-10"
    />
  ))}
</div>`,
        },
        {
          title: "Size Variants",
          description: "Icons at different sizes using Tailwind classes.",
          preview: (
            <div className="flex items-center gap-4">
              <SimpleIcon path={siReact.path} className="h-4 w-4" title="Small" />
              <SimpleIcon path={siReact.path} className="h-6 w-6" title="Default" />
              <SimpleIcon path={siReact.path} className="h-8 w-8" title="Medium" />
              <SimpleIcon path={siReact.path} className="h-12 w-12" title="Large" />
              <SimpleIcon path={siReact.path} className="h-16 w-16" title="Extra Large" />
            </div>
          ),
          code: `<div className="flex items-center gap-4">
  <SimpleIcon path={siReact.path} className="h-4 w-4" />
  <SimpleIcon path={siReact.path} className="h-6 w-6" />
  <SimpleIcon path={siReact.path} className="h-8 w-8" />
  <SimpleIcon path={siReact.path} className="h-12 w-12" />
  <SimpleIcon path={siReact.path} className="h-16 w-16" />
</div>`,
        },
        {
          title: "Color Variants",
          description: "Icons with different text colors using Tailwind utilities.",
          preview: (
            <div className="flex items-center gap-4">
              <SimpleIcon path={siReact.path} className="h-10 w-10 text-primary" title="Primary" />
              <SimpleIcon path={siNextdotjs.path} className="h-10 w-10 text-foreground" title="Foreground" />
              <SimpleIcon path={siTypescript.path} className="h-10 w-10 text-blue-500" title="Blue" />
              <SimpleIcon path={siTailwindcss.path} className="h-10 w-10 text-cyan-500" title="Cyan" />
            </div>
          ),
          code: `<div className="flex items-center gap-4">
  <SimpleIcon path={siReact.path} className="h-10 w-10 text-primary" />
  <SimpleIcon path={siNextdotjs.path} className="h-10 w-10 text-foreground" />
  <SimpleIcon path={siTypescript.path} className="h-10 w-10 text-blue-500" />
  <SimpleIcon path={siTailwindcss.path} className="h-10 w-10 text-cyan-500" />
</div>`,
        },
        {
          title: "Database Stack",
          description: "Backend and database technology icons.",
          preview: (
            <div className="flex gap-4">
              <SimpleIcon path={siNodedotjs.path} title="Node.js" className="h-10 w-10" />
              <SimpleIcon path={siPostgresql.path} title="PostgreSQL" className="h-10 w-10" />
              <SimpleIcon path={siPrisma.path} title="Prisma" className="h-10 w-10" />
              <SimpleIcon path={siDocker.path} title="Docker" className="h-10 w-10" />
            </div>
          ),
          code: `<div className="flex gap-4">
  <SimpleIcon path={siNodedotjs.path} title="Node.js" className="h-10 w-10" />
  <SimpleIcon path={siPostgresql.path} title="PostgreSQL" className="h-10 w-10" />
  <SimpleIcon path={siPrisma.path} title="Prisma" className="h-10 w-10" />
  <SimpleIcon path={siDocker.path} title="Docker" className="h-10 w-10" />
</div>`,
        },
        {
          title: "Terminal Style",
          description: "Icon showcase with terminal-style wrapper.",
          preview: (
            <div className="rounded-none border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">tech-stack</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-3">[STACK]:</div>
                <div className="flex gap-4">
                  {techStack.map(({ name, icon }) => (
                    <div key={name} className="flex flex-col items-center gap-2">
                      <SimpleIcon path={icon.path} title={name} className="h-10 w-10" />
                      <span className="font-mono text-xs text-muted-foreground">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
          code: `<div className="rounded-none border border-border bg-card">
  <div className="flex items-center gap-2 border-b border-border px-4 py-2">
    <div className="flex gap-1.5">
      <div className="size-2 rounded-full bg-destructive/50" />
      <div className="size-2 rounded-full bg-warning/50" />
      <div className="size-2 rounded-full bg-success/50" />
    </div>
    <span className="font-mono text-xs text-muted-foreground">tech-stack</span>
  </div>
  <div className="p-4">
    <div className="font-mono text-xs text-muted-foreground mb-3">[STACK]:</div>
    <div className="flex gap-4">
      {techStack.map(({ name, icon }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <SimpleIcon path={icon.path} title={name} className="h-10 w-10" />
          <span className="font-mono text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "path",
          type: "string",
          default: "undefined",
          description: "SVG path data from simple-icons package (e.g., siReact.path).",
        },
        {
          name: "className",
          type: "string",
          default: '"h-6 w-6"',
          description: "Tailwind classes for size and color. Use text-* for color, h-* w-* for size.",
        },
        {
          name: "title",
          type: "string",
          default: "undefined",
          description: "Accessible title for the icon, shown on hover and to screen readers.",
        },
      ]}
      accessibility={[
        "Uses semantic <svg> element with role='img'",
        "Title prop adds accessible <title> element inside SVG",
        "Icons inherit text color via fill='currentColor'",
        "Supports all Tailwind text color utilities for theming",
        "Default 24x24 viewBox ensures consistent scaling",
        "Works with screen readers when title is provided",
      ]}
      previous={{ title: "Sidebar", href: "/docs/components/sidebar" }}
      next={{ title: "Skeleton", href: "/docs/components/skeleton" }}
    />
  );
}
