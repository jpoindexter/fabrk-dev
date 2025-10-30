"use client"

import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "This platform helped us save 10+ hours per week. We can't imagine going back.",
    author: "Kurt Bates",
    role: "Marketing Manager",
    image: "https://github.com/shadcn.png",
  },
  {
    quote: "A game-changer for our remote team. The workflow automations are insanely good.",
    author: "Alex Buckmaster",
    role: "Founder of TechWave",
    image: "https://github.com/shadcn.png",
  },
]

export function TestimonialsSection5() {
  return (
    <section id="testimonials" className="py-24 md:py-32 lg:py-40 bg-background" aria-labelledby="testimonial-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-16 md:gap-20">
          <div className="flex flex-col gap-6 max-w-2xl mx-auto text-center">
            <h2 id="testimonial-title" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Loved by teams everywhere
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col gap-8 glass-card p-10 rounded-3xl smooth-transition hover-lift">
                <p className="text-foreground text-xl md:text-2xl font-light leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback>
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <p className="text-foreground text-base font-semibold">{testimonial.author}</p>
                    <p className="text-muted-foreground text-sm font-light">{testimonial.role}</p>
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
