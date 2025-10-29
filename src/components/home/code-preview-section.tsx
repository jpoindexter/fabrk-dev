import { Check } from "lucide-react";

const benefits = [
  "120+ pre-built components ready to use",
  "TypeScript-first with complete type safety",
  "Accessible by default with WCAG AA compliance",
  "Fully customizable with CSS variables",
];

export function CodePreviewSection() {
  return (
    <section className="border-y border-border bg-muted py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <h2 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              Built for developers who care about quality
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Every component is crafted with attention to detail, performance, and accessibility. No compromises.
            </p>

            <ul className="mt-10 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-4">
                  <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="size-4 text-primary-foreground" />
                  </div>
                  <span className="text-base text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border bg-background">
              <div className="border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-muted-foreground"></div>
                  <div className="size-3 rounded-full bg-muted-foreground"></div>
                  <div className="size-3 rounded-full bg-muted-foreground"></div>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="h-4 w-24 rounded bg-muted"></div>
                  <div className="h-8 w-full rounded-xl bg-secondary"></div>
                  <div className="h-8 w-full rounded-xl bg-secondary"></div>
                  <div className="flex gap-3">
                    <div className="h-12 flex-1 rounded-xl bg-primary"></div>
                    <div className="h-12 flex-1 rounded-xl border border-border"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
