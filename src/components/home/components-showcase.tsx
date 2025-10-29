import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Forms & Inputs",
    count: "24 components",
    description: "Text fields, selects, checkboxes, and advanced form controls",
  },
  {
    name: "Data Display",
    count: "18 components",
    description: "Tables, lists, cards, and data visualization components",
  },
  {
    name: "Navigation",
    count: "16 components",
    description: "Menus, breadcrumbs, tabs, and navigation patterns",
  },
  {
    name: "Feedback",
    count: "12 components",
    description: "Alerts, toasts, modals, and loading states",
  },
  {
    name: "Layout",
    count: "14 components",
    description: "Grids, containers, dividers, and spacing utilities",
  },
  {
    name: "Typography",
    count: "8 components",
    description: "Headings, text, links, and type scale system",
  },
];

export function ComponentsShowcase() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            120+ components organized for you
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every component category you need to build a complete product. From simple buttons to complex data tables.
          </p>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group rounded-3xl border border-border bg-background p-8 transition-all hover:border-border"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-medium text-foreground">{category.name}</h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{category.count}</p>
                </div>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="h-14 rounded-2xl px-10 text-lg font-medium">
            Browse All Components
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
