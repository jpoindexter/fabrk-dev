"use client"

import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

export function HeroSection7() {
  return (
    <section className="bg-background py-24 lg:py-32 xl:py-40" aria-labelledby="hero-heading">
      <div className="container px-6 flex flex-col items-center gap-16 lg:gap-24 mx-auto max-w-7xl">
        {/* Hero Content - Apple-style minimalism */}
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl">
          <h1
            id="hero-heading"
            className="text-foreground text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
          >
            Work smarter,{" "}
            <span className="refined-gradient-text">not harder</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl max-w-2xl font-light">
            Automate workflows and collaborate seamlessly
          </p>

          <Button size="lg" className="mt-4 text-base px-8 py-6 rounded-full smooth-transition hover:scale-105">
            Start free trial
          </Button>
        </div>

        {/* Hero Image with Glass Effect */}
        <div className="w-full overflow-hidden rounded-3xl glass-card">
          <AspectRatio ratio={16 / 9}>
            <Image
              src="/images/hero-crystal-bg.png"
              alt="Fabrk dashboard interface"
              fill
              priority
              className="object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  )
}
