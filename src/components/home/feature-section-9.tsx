"use client"

import { Rotate3d, ArrowLeftRight, Database, Combine } from "lucide-react"

const features = [
  {
    icon: Rotate3d,
    title: "Workflow automation",
    description: "Eliminate repetitive tasks and save time",
  },
  {
    icon: ArrowLeftRight,
    title: "Real-time collaboration",
    description: "Keep your team in sync effortlessly",
  },
  {
    icon: Database,
    title: "Data-driven insights",
    description: "Track progress with advanced analytics",
  },
  {
    icon: Combine,
    title: "Easy integration",
    description: "Connect with your favorite tools",
  },
]

export function FeatureSection9() {
  return (
    <section id="features" className="bg-background py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-6 flex flex-col gap-20 md:gap-24 max-w-7xl">
        <div className="flex flex-col gap-6 max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Powerful features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light">
            Everything you need to work smarter
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex flex-col gap-6 items-center text-center smooth-transition hover-lift">
                <div className="flex justify-center items-center w-14 h-14 shrink-0 rounded-2xl glass subtle-glow">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-base font-light">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
