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
        <h2 className="mb-4 text-left text-4xl font-black text-foreground">
          Everything You Need, Nothing You Don't.
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const colors = [
              { bg: "bg-primary", text: "text-primary-foreground", icon: "text-primary-foreground" },
              { bg: "bg-secondary", text: "text-secondary-foreground", icon: "text-secondary-foreground" },
              { bg: "bg-accent", text: "text-accent-foreground", icon: "text-accent-foreground" },
            ];
            const color = colors[index % 3];

            return (
              <div
                key={feature.title}
                className={`group rounded-brutal border-4 border-black ${color.bg} p-8 shadow-brutal-lg transition-all hover:shadow-brutal-xl hover:-translate-x-2 hover:-translate-y-2`}
              >
                <SimpleIcon path={feature.icon} className={`mb-4 h-12 w-12 ${color.icon}`} />
                <h3 className={`mb-3 text-xl font-black ${color.text}`}>
                  {feature.title}
                </h3>
                <p className={`font-bold leading-relaxed ${color.text}`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bonus Features */}
        <div className="mt-16 rounded-brutal border-4 border-black bg-muted p-8 shadow-brutal-lg">
          <p className="text-center text-lg">
            <span className="font-black text-foreground">Also Included: </span>
            <span className="font-bold text-foreground">
              User dashboard • Account settings • Rate limiting • Admin capabilities • TypeScript strict mode • Production-ready logging
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
