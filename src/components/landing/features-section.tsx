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
      title: "Add Google Login in 5 Minutes",
      description:
        "Full authentication with email/password and OAuth (Google) already connected. Just add your API keys and it works.",
    },
    {
      icon: CreditCard,
      title: "Accept Payments Without Reading Stripe Docs",
      description:
        "Stripe checkout, webhooks, and customer portal pre-configured. One-time payments and subscriptions work out of the box.",
    },
    {
      icon: Database,
      title: "Type-Safe Database with Free Hosting",
      description:
        "PostgreSQL with Prisma ORM. Deploy to Supabase or Railway free tier in minutes. No MongoDB lock-in.",
    },
    {
      icon: Mail,
      title: "Send Beautiful Emails Without Fighting HTML Tables",
      description:
        "Welcome emails, password resets, and verifications already built. Just configure Resend and go.",
    },
    {
      icon: Palette,
      title: "Build Any Interface with Battle-Tested Components",
      description:
        "80+ production-ready components including data tables, charts, forms, and dashboards. No UI reinvention needed.",
    },
    {
      icon: Code,
      title: "161 Files You Can Actually Understand",
      description:
        "No 1000-file maze. Clean, readable TypeScript code you can modify without fear. If you can read Next.js, you can use Fabrk.",
    },
  ];

  return (
    <section id="features" className="scroll-mt-16 bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-left text-4xl font-bold text-foreground">
          Everything You Need, Nothing You Don't.
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-lg border-3 border-border bg-card p-8 shadow-brutal transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm"
              >
                <Icon className="mb-4 h-8 w-8 text-primary" strokeWidth={1.5} />
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
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
