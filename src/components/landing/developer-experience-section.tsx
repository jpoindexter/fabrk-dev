import { SimpleIcon } from "@/components/ui/simple-icon";
import { Badge } from "@/components/ui/badge";
import {
  siTypescript,
  siPrisma,
  siEslint,
} from "simple-icons";
import { Zap, FolderTree, Terminal, Code2 } from "lucide-react";

export function DeveloperExperienceSection() {
  const features = [
    {
      icon: siTypescript.path,
      title: "TypeScript Strict Mode",
      description:
        "Full type safety with strict mode enabled. Catch errors at compile time, not runtime. IntelliSense autocomplete for every function and component.",
    },
    {
      iconComponent: "folder",
      title: "Path Aliases",
      description:
        "Clean imports with @/components, @/lib, @/utils. No more ../../../ hell. IntelliSense autocomplete works perfectly across the codebase.",
    },
    {
      iconComponent: "zap",
      title: "Turbopack Hot Reload",
      description:
        "Lightning-fast refresh during development. See changes instantly without losing state. 10x faster than Webpack with incremental compilation.",
    },
    {
      icon: siPrisma.path,
      title: "Prisma Type Generation",
      description:
        "Auto-generated TypeScript types for your database schema. Type-safe queries with autocomplete. Zero manual type definitions needed.",
    },
    {
      icon: siEslint.path,
      title: "ESLint + Hex Scanner",
      description:
        "Enforce code quality with ESLint. Custom hex color scanner prevents hardcoded colors. Maintain design token consistency automatically.",
    },
    {
      iconComponent: "code",
      title: "VS Code Configuration",
      description:
        "Pre-configured settings, extensions, and snippets. Consistent formatting across team. Tailwind IntelliSense, ESLint, and Prettier integrated.",
    },
    {
      iconComponent: "terminal",
      title: "Developer Commands",
      description:
        "npm run dev:restart kills port conflicts. Prisma Studio for database GUI. Stripe CLI for webhook testing. Storybook for component development.",
    },
    {
      icon: siTypescript.path,
      title: "100% TypeScript Coverage",
      description:
        "Every file is TypeScript. No .js files, no any types. Strict null checks, strict function types. Production-ready type safety from day one.",
    },
  ];

  return (
    <section className="scroll-mt-16 border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-center">
          <Badge variant="default" size="lg" className="mb-4 uppercase tracking-wide">
            Built for Developers
          </Badge>
        </div>

        <h2 className="mb-2 text-center text-3xl font-semibold text-foreground">
          Developer Experience Matters
        </h2>
        <p className="mb-16 text-center text-lg text-muted-foreground">
          Fast builds, clean code, zero friction. Ship features, not fight tooling.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const IconComponent =
              feature.iconComponent === "folder" ? FolderTree :
              feature.iconComponent === "zap" ? Zap :
              feature.iconComponent === "terminal" ? Terminal :
              feature.iconComponent === "code" ? Code2 :
              null;

            return (
              <div
                key={feature.title}
                className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary/10 p-3">
                  {feature.icon ? (
                    <SimpleIcon path={feature.icon} className="h-6 w-6 text-primary" />
                  ) : IconComponent ? (
                    <IconComponent className="h-6 w-6 text-primary" />
                  ) : null}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
