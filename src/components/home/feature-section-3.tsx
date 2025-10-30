"use client"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { PenLine, ListTodo, Workflow } from "lucide-react"

const steps = [
  {
    icon: PenLine,
    title: "Sign up",
    description: "Create your account instantly",
  },
  {
    icon: ListTodo,
    title: "Set up workflow",
    description: "Customize to fit your team",
  },
  {
    icon: Workflow,
    title: "Start collaborating",
    description: "Watch productivity soar",
  },
]

export function FeatureSection3() {
  return (
    <section className="bg-background py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center max-w-7xl">
        <div className="flex flex-col gap-12 flex-1">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Getting started is easy
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light">Three simple steps</p>
          </div>
          <div className="flex flex-col gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex gap-6 smooth-transition hover-lift">
                  <div className="flex justify-center items-center w-12 h-12 shrink-0 rounded-2xl glass subtle-glow">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-base text-muted-foreground font-light">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="overflow-hidden rounded-3xl glass-card">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/getting%20started%20image-d24HhYcHO1wR0mZiMSHMOHz2Z0YrDn.png"
                alt="Dashboard showing detailed order management interface"
                fill
                className="object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  )
}
