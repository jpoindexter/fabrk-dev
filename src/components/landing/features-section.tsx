import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siAuth0,
  siStripe,
  siPrisma,
  siResend,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

export function FeaturesSection() {
  const features = [
    {
      icon: siAuth0.path,
      title: "Complete Authentication System",
      description:
        "NextAuth v5 with credentials, Google OAuth, and magic link passwordless login. Email verification and password reset flows included.",
    },
    {
      icon: siStripe.path,
      title: "Stripe Payments & Webhooks",
      description:
        "Accept one-time payments and subscriptions. Production-ready webhook processing with signature verification and idempotency protection.",
    },
    {
      icon: siPrisma.path,
      title: "Prisma + PostgreSQL Database",
      description:
        "Production-ready database schema with type-safe queries. Clean structure that's easy to extend and manage.",
    },
    {
      icon: siResend.path,
      title: "Email Infrastructure",
      description:
        "Transactional emails via Resend. Includes welcome emails, verification flows, password resets, and purchase confirmations.",
    },
    {
      icon: siTailwindcss.path,
      title: "Modern UI Stack",
      description:
        "Tailwind CSS + shadcn/ui components with built-in dark mode support. Minimal, customizable, and free of complex abstractions.",
    },
    {
      icon: siTypescript.path,
      title: "Radically Simple Code",
      description:
        "No over-engineering. A small, understandable codebase (just ~40 files) that you can easily modify and own.",
    },
  ];

  return (
    <section id="features" className="scroll-mt-16 bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-2 text-left text-3xl font-semibold text-foreground">
          Everything You Need, Nothing You Don't.
        </h2>
        <p className="mb-16 text-left text-lg text-muted-foreground">
          Production-ready features that save you weeks of development time.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            return (
              <div
                key={feature.title}
                className="group rounded-lg border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary/10 p-3">
                  <SimpleIcon path={feature.icon} className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="font-normal leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bonus Features */}
        <div className="mt-16 rounded-lg border border-border bg-muted/50 p-8">
          <p className="text-center text-sm">
            <span className="font-semibold text-foreground">Also Included: </span>
            <span className="font-normal text-muted-foreground">
              User dashboard • Account settings • Rate limiting • Admin capabilities • TypeScript strict mode • Production-ready logging
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
