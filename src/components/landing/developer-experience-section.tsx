"use client";

import { SimpleIcon } from "@/components/ui/simple-icon";
import { siTypescript, siPrisma, siEslint } from "simple-icons";
import { Zap, FolderTree, Terminal, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { motion } from "framer-motion";

export function DeveloperExperienceSection() {
  const features = [
    {
      icon: siTypescript.path,
      title: "TypeScript Strict Mode",
      description:
        "Full type safety with strict mode enabled. Catch errors at compile time, not runtime.",
    },
    {
      iconComponent: "folder",
      title: "Path Aliases",
      description: "Clean imports with @/components, @/lib, @/utils. No more ../../../ hell.",
    },
    {
      iconComponent: "zap",
      title: "Turbopack Hot Reload",
      description:
        "Lightning-fast refresh during development. See changes instantly without losing state.",
    },
    {
      icon: siPrisma.path,
      title: "Prisma Type Generation",
      description:
        "Auto-generated TypeScript types for your database schema. Type-safe queries with autocomplete.",
    },
    {
      icon: siEslint.path,
      title: "ESLint + Hex Scanner",
      description:
        "Enforce code quality with ESLint. Custom hex color scanner prevents hardcoded colors.",
    },
    {
      iconComponent: "code",
      title: "VS Code Configuration",
      description:
        "Pre-configured settings, extensions, and snippets. Tailwind IntelliSense integrated.",
    },
    {
      iconComponent: "terminal",
      title: "Developer Commands",
      description: "npm run dev:restart kills port conflicts. Prisma Studio for database GUI.",
    },
    {
      icon: siTypescript.path,
      title: "100% TypeScript Coverage",
      description:
        "Every file is TypeScript. No .js files, no any types. Production-ready type safety.",
    },
  ];

  return (
    <section
      className={cn("border-border bg-background scroll-mt-16 border-t px-6 py-24", mode.font)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span
              className={cn(
                "border-border bg-card text-muted-foreground mb-4 inline-block border px-4 py-1 text-xs",
                mode.radius
              )}
            >
              [ [0x50] DEV_EXPERIENCE ]
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">
            DEVELOPER_EXPERIENCE_MATTERS
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-16 text-center text-sm"
        >
          &gt; Fast builds, clean code, zero friction. Ship features, not fight tooling.
        </motion.p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const IconComponent =
              feature.iconComponent === "folder"
                ? FolderTree
                : feature.iconComponent === "zap"
                  ? Zap
                  : feature.iconComponent === "terminal"
                    ? Terminal
                    : feature.iconComponent === "code"
                      ? Code2
                      : null;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className={cn(
                  "group border-border bg-card hover:border-primary/50 flex h-full flex-col border transition-colors",
                  mode.radius
                )}
              >
                {/* Terminal Header */}
                <div className="border-border flex items-center justify-between border-b px-4 py-2">
                  <span className="text-muted-foreground text-xs">
                    [ [0x{(index + 51).toString(16).toUpperCase()}] DEV ]
                  </span>
                  {feature.icon ? (
                    <SimpleIcon
                      path={feature.icon}
                      className="text-muted-foreground group-hover:text-primary size-4 transition-colors"
                    />
                  ) : IconComponent ? (
                    <IconComponent className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                  ) : null}
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="text-foreground mb-3 text-xs font-semibold">
                    {feature.title.toUpperCase().replace(/ /g, "_")}
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{feature.description}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
