import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siTypescript,
  siStorybook,
  siVitest,
  siPlaywright,
  siGithubactions,
} from "simple-icons";
import { Globe, CheckCircle2 } from "lucide-react";

export function QualitySection() {
  const qualityMetrics = [
    {
      metric: "64%",
      label: "Test Coverage",
      description: "64 out of 100 components have comprehensive Vitest unit tests",
      icon: siVitest.path,
    },
    {
      metric: "95%",
      label: "Storybook Coverage",
      description: "95 out of 100 components documented in interactive Storybook",
      icon: siStorybook.path,
    },
    {
      metric: "100%",
      label: "TypeScript Strict",
      description: "Full TypeScript strict mode enforcement across entire codebase",
      icon: siTypescript.path,
    },
    {
      metric: "6",
      label: "CI/CD Pipelines",
      description: "Automated lint, test, build, E2E, performance, and PR checks",
      icon: siGithubactions.path,
    },
    {
      metric: "6",
      label: "Languages Supported",
      description: "Full i18n with 1,998 translations across English, Spanish, French, German, Portuguese, Japanese",
      iconComponent: "globe",
    },
    {
      metric: "931+",
      label: "Comprehensive Tests",
      description: "Unit tests + E2E Playwright tests for critical user flows",
      icon: siPlaywright.path,
    },
  ];

  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-md border border-success/20 bg-success/10 px-4 py-1.5 text-sm font-medium uppercase tracking-wide text-success">
            Quality Assurance
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Built to Last, Tested to Ship
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Every component is battle-tested with comprehensive coverage. No cutting corners,
            no technical debt. Production-ready from day one.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {qualityMetrics.map((item) => {
            return (
              <div
                key={item.label}
                className="group rounded-lg border border-border bg-card p-8 shadow-sm transition-all hover:border-success/50 hover:shadow-md"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-md bg-success/10 p-3">
                  {item.iconComponent === "globe" ? (
                    <Globe className="h-6 w-6 text-success" />
                  ) : (
                    <SimpleIcon path={item.icon!} className="h-6 w-6 text-success" />
                  )}
                </div>
                <div className="mb-3">
                  <div className="text-4xl font-bold text-foreground">
                    {item.metric}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-foreground">
                    {item.label}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quality Commitment */}
        <div className="mt-12 rounded-lg border border-success/20 bg-success/5 p-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Quality Guarantee
              </h3>
              <p className="text-muted-foreground">
                Unlike other boilerplates that ship untested code, every Fabrk component is
                rigorously tested, documented in Storybook, and validated by CI/CD pipelines.
                You're not inheriting technical debt—you're getting production-grade infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
