import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siAuth0,
  siStripe,
  siPrisma,
  siResend,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import {
  Mail,
  Moon,
  ShieldCheck,
  Gauge,
  LayoutDashboard,
  Webhook,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: siAuth0.path,
      iconType: "simple" as const,
      title: "Secure Auth, Simplified",
      description:
        "Full authentication with NextAuth v5. Includes credentials (email/password) and Google OAuth out of the box.",
    },
    {
      icon: "Mail",
      iconType: "lucide" as const,
      title: "Magic Link Authentication",
      description:
        "Passwordless login with secure one-time tokens. Perfect for guest checkout and quick onboarding.",
    },
    {
      icon: siStripe.path,
      iconType: "simple" as const,
      title: "Stripe Payments",
      description:
        "Accept one-time payments and manage subscriptions with Stripe. Webhooks and customer portal are pre-configured.",
    },
    {
      icon: "Webhook",
      iconType: "lucide" as const,
      title: "Webhook Handling",
      description:
        "Production-ready webhook processing with signature verification and idempotency protection.",
    },
    {
      icon: siPrisma.path,
      iconType: "simple" as const,
      title: "Prisma + PostgreSQL",
      description:
        "A clean, production-ready database schema powered by Prisma ORM. Easy to extend and manage.",
    },
    {
      icon: "LayoutDashboard",
      iconType: "lucide" as const,
      title: "User Dashboard",
      description:
        "Pre-built dashboard with settings, account management, and billing pages. Just customize and ship.",
    },
    {
      icon: siResend.path,
      iconType: "simple" as const,
      title: "Transactional Emails",
      description:
        "Welcome emails, password resets, and email verification powered by Resend.",
    },
    {
      icon: "ShieldCheck",
      iconType: "lucide" as const,
      title: "Email Verification",
      description:
        "Token-based email verification flow with secure expiry. Prevents fake accounts and spam.",
    },
    {
      icon: siTailwindcss.path,
      iconType: "simple" as const,
      title: "Tailwind + shadcn/ui",
      description:
        "A minimal set of essential UI components. Fully customizable and free of complex abstractions.",
    },
    {
      icon: "Moon",
      iconType: "lucide" as const,
      title: "Dark Mode Support",
      description:
        "Built-in theme switching with next-themes. Respects user preferences and persists across sessions.",
    },
    {
      icon: siTypescript.path,
      iconType: "simple" as const,
      title: "Radically Simple Code",
      description:
        "No over-engineering. A small, understandable codebase (just ~40 files) that you can easily modify and own.",
    },
    {
      icon: "Gauge",
      iconType: "lucide" as const,
      title: "Rate Limiting",
      description:
        "Built-in API rate limiting middleware. Protects your endpoints from abuse and ensures fair usage.",
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

            // Render icon based on type
            const IconComponent = feature.iconType === "lucide"
              ? {
                  Mail,
                  Moon,
                  ShieldCheck,
                  Gauge,
                  LayoutDashboard,
                  Webhook,
                }[feature.icon as string]
              : null;

            return (
              <div
                key={feature.title}
                className={`group rounded-brutal border-4 border-black ${color.bg} p-8 shadow-brutal-lg transition-all hover:shadow-brutal-xl hover:-translate-x-2 hover:-translate-y-2`}
              >
                {feature.iconType === "simple" ? (
                  <SimpleIcon path={feature.icon as string} className={`mb-4 h-12 w-12 ${color.icon}`} />
                ) : IconComponent ? (
                  <IconComponent className={`mb-4 h-12 w-12 ${color.icon}`} strokeWidth={2.5} />
                ) : null}
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
      </div>
    </section>
  );
}
