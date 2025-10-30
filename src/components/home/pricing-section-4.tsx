"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

const pricingData = {
  plans: [
    {
      name: "Starter",
      description: "Perfect for side projects and MVPs",
      features: [
        {
          name: "Full source code",
          tooltip: "Complete access to all code",
        },
        {
          name: "Authentication & payments",
          tooltip: "NextAuth v5 + Stripe integration",
        },
        {
          name: "Email support",
          tooltip: "Get help when you need it",
        },
      ],
      pricing: {
        monthly: 79,
        annually: 790,
      },
      variant: "secondary",
    },
    {
      name: "Pro",
      description: "For serious founders building to scale",
      badge: "Most popular",
      features: [
        {
          name: "Everything in Starter",
          tooltip: "All starter features included",
        },
        {
          name: "Priority support",
          tooltip: "Get help faster with priority queue",
        },
        {
          name: "Lifetime updates",
          tooltip: "Free updates forever",
        },
        {
          name: "Discord access",
          tooltip: "Private community & resources",
        },
      ],
      pricing: {
        monthly: 149,
        annually: 1490,
      },
      variant: "default",
    },
    {
      name: "Enterprise",
      description: "Custom solutions for your team",
      features: [
        {
          name: "Everything in Pro",
          tooltip: "All pro features included",
        },
        {
          name: "Custom integrations",
          tooltip: "We build what you need",
        },
        {
          name: "Team training",
          tooltip: "Onboard your team properly",
        },
        {
          name: "White-label option",
          tooltip: "Remove Fabrk branding",
        },
      ],
      pricing: {
        monthly: 499,
        annually: 4990,
      },
      variant: "secondary",
    },
  ],
}

export function PricingSection4() {
  const [billingPeriod, setBillingPeriod] = React.useState("monthly")

  return (
    <section id="pricing" className="py-24 md:py-32 lg:py-40 bg-background" aria-labelledby="pricing-section-title-4">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center gap-16 md:gap-20">
          <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
            <h2 id="pricing-section-title-4" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Simple pricing
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light">Choose the plan that fits your needs</p>
          </div>

          <Tabs value={billingPeriod} onValueChange={setBillingPeriod} className="w-fit">
            <TabsList className="glass h-12 p-1.5 rounded-full">
              <TabsTrigger
                value="monthly"
                className="rounded-full px-6 py-2 data-[state=active]:glass-strong smooth-transition"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="annually"
                className="rounded-full px-6 py-2 data-[state=active]:glass-strong smooth-transition"
              >
                Annually
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {pricingData.plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`p-10 space-y-8 smooth-transition hover-lift ${
                  index === 1 ? "glass-strong scale-105" : "glass-card"
                }`}
              >
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground font-light">{plan.description}</p>
                  </div>

                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold">
                      ${billingPeriod === "monthly" ? plan.pricing.monthly : plan.pricing.annually}
                    </span>
                    <span className="text-base text-muted-foreground pb-2 font-light">
                      {plan.pricing.monthly === 0 ? "" : `/${billingPeriod === "monthly" ? "mo" : "yr"}`}
                    </span>
                  </div>

                  <Button
                    variant={index === 1 ? "default" : "outline"}
                    size="lg"
                    className="w-full rounded-full smooth-transition hover:scale-105"
                  >
                    {plan.pricing.monthly === 0 ? "Start for free" : "Get started"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm text-muted-foreground font-light">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
