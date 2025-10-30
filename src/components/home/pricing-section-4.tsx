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
  return (
    <section id="pricing" className="py-24 md:py-32 lg:py-40 bg-background border-t border-primary/10" aria-labelledby="pricing-section-title-4">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center gap-16 md:gap-20">
          <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
            <h2 id="pricing-section-title-4" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              One-time payment. Lifetime access.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light">No subscriptions. Buy once, use forever.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {pricingData.plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border smooth-transition hover-lift ${
                  index === 1
                    ? "border-primary bg-primary/5 shadow-2xl shadow-primary/20"
                    : "border-primary/20 bg-background/50"
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold refined-gradient text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">${plan.pricing.monthly}</span>
                    {plan.pricing.monthly > 0 && <span className="text-muted-foreground">/one-time</span>}
                  </div>

                  <Button
                    size="lg"
                    className={`w-full rounded-full smooth-transition hover:scale-105 ${
                      index === 1 ? "refined-gradient text-white border-0" : ""
                    }`}
                    variant={index === 1 ? "default" : "outline"}
                  >
                    {plan.pricing.monthly === 0 ? "Start Building" : "Get Fabrk"}
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-primary/10">
                  <div className="flex flex-col gap-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
