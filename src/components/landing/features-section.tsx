import {
  Lock,
  CreditCard,
  Database,
  Mail,
  Palette,
  Code,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Lock,
      title: "Secure Auth, Simplified",
      description:
        "Full authentication with NextAuth v5. Includes credentials (email/password) and Google OAuth out of the box.",
    },
    {
      icon: CreditCard,
      title: "Stripe Payments",
      description:
        "Accept one-time payments and manage subscriptions with Stripe. Webhooks and customer portal are pre-configured.",
    },
    {
      icon: Database,
      title: "Prisma + PostgreSQL",
      description:
        "A clean, production-ready database schema powered by Prisma ORM. Easy to extend and manage.",
    },
    {
      icon: Mail,
      title: "Transactional Emails",
      description:
        "Welcome emails, password resets, and email verification powered by Resend.",
    },
    {
      icon: Palette,
      title: "Tailwind + shadcn/ui",
      description:
        "A minimal set of essential UI components. Fully customizable and free of complex abstractions.",
    },
    {
      icon: Code,
      title: "Radically Simple Code",
      description:
        "No over-engineering. A small, understandable codebase (just ~40 files) that you can easily modify and own.",
    },
  ];

  return (
    <section id="features" className="scroll-mt-16 bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-left text-4xl font-bold text-black">
          Everything You Need, Nothing You Don't.
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-lg border border-black/10 bg-white p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <Icon className="mb-4 h-8 w-8 text-[#007AFF]" strokeWidth={1.5} />
                <h3 className="mb-3 text-xl font-bold text-black">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-[#333333]">
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
