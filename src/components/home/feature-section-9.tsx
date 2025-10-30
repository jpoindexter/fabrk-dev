"use client"

import { Shield, CreditCard, Database, Code2, Mail, Settings, Users, Zap, FileText, Palette, CheckCircle, Lock } from "lucide-react"

const featureCategories = [
  {
    name: "Authentication",
    features: [
      { icon: Shield, name: "NextAuth v5", description: "Email, OAuth, magic links" },
      { icon: Lock, name: "Role-based access", description: "User roles and permissions" },
      { icon: Mail, name: "Email verification", description: "Secure account activation" },
    ],
  },
  {
    name: "Payments & Billing",
    features: [
      { icon: CreditCard, name: "Stripe integration", description: "Subscriptions & one-time" },
      { icon: CheckCircle, name: "Webhook handling", description: "Idempotent event processing" },
      { icon: Settings, name: "Customer portal", description: "Self-service management" },
    ],
  },
  {
    name: "Database & Backend",
    features: [
      { icon: Database, name: "Prisma ORM", description: "Type-safe database queries" },
      { icon: Code2, name: "PostgreSQL ready", description: "Production database setup" },
      { icon: Zap, name: "API routes", description: "RESTful endpoints included" },
    ],
  },
  {
    name: "UI & Developer Experience",
    features: [
      { icon: Palette, name: "Tailwind CSS", description: "Beautiful components" },
      { icon: Code2, name: "TypeScript", description: "Full type safety" },
      { icon: FileText, name: "React Email", description: "Transactional emails" },
    ],
  },
]

export function FeatureSection9() {
  return (
    <section id="features" className="bg-background py-24 md:py-32 lg:py-40 border-t border-primary/10">
      <div className="container mx-auto px-6 flex flex-col gap-16 max-w-7xl">
        <div className="flex flex-col gap-6 max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Everything you need
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light">
            Stop cobbling together packages. Get a complete, production-ready stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
              <div className="grid gap-4">
                {category.features.map((feature, featureIndex) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={featureIndex}
                      className="flex items-start gap-4 p-4 rounded-xl glass-card smooth-transition hover-lift"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-semibold text-foreground">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground font-light">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
