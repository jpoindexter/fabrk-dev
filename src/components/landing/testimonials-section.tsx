/* 💡 COPY TIP: Replace these testimonials with real customer quotes!
 * Authentic testimonials convert 3-5x better than generic ones.
 * Include specific results (e.g., "saved 40 hours") when possible.
 */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { H2, Body, Small, Strong } from "@/components/ui/typography";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Fabrk saved me 2 weeks of setup time. I went from idea to launched product in 3 days. The code quality is excellent and everything just works.",
      author: "Sarah Chen",
      role: "Indie Developer",
      initials: "SC",
      color: "bg-primary text-primary-foreground",
    },
    {
      quote: "Best boilerplate I've used. Clean code, modern stack, and the support is amazing. I've shipped 3 projects with Fabrk and saved hundreds of hours.",
      author: "Marcus Johnson",
      role: "Full-Stack Dev",
      initials: "MJ",
      color: "bg-accent text-accent-foreground",
    },
    {
      quote: "The neo-brutalism design is perfect for my SaaS. Customers love the bold aesthetic and everything is accessible out of the box. Worth every penny.",
      author: "Emily Rodriguez",
      role: "Product Designer",
      initials: "ER",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      quote: "I tried 5 different boilerplates. Fabrk is the only one that's actually production-ready. Auth, payments, email - it all works perfectly from day one.",
      author: "David Kim",
      role: "Startup Founder",
      initials: "DK",
      color: "bg-primary text-primary-foreground",
    },
    {
      quote: "The TypeScript setup is fantastic. Strong types everywhere, zero any types. This is how modern SaaS should be built. My team loves working with it.",
      author: "Alex Thompson",
      role: "Tech Lead",
      initials: "AT",
      color: "bg-accent text-accent-foreground",
    },
    {
      quote: "Fabrk helped me validate my SaaS idea quickly without spending weeks on infrastructure. Now I have a profitable side project generating $2k MRR.",
      author: "Jessica Park",
      role: "Solopreneur",
      initials: "JP",
      color: "bg-secondary text-secondary-foreground",
    },
  ];

  return (
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <H2 className="mb-4">
              Loved by Developers
            </H2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Body className="text-muted-foreground">
              Early access customer feedback
            </Body>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              viewport={{ once: true }}
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50"
            >
              <div className="mb-4 text-3xl font-normal text-muted-foreground/30">"</div>
              <Small className="block mb-6 text-muted-foreground">
                {testimonial.quote}
              </Small>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Small className="block font-semibold">
                    {testimonial.author}
                  </Small>
                  <Small className="block text-muted-foreground">
                    {testimonial.role}
                  </Small>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
