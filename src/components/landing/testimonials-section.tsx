/* 💡 COPY TIP: Replace these testimonials with real customer quotes!
 * Authentic testimonials convert 3-5x better than generic ones.
 * Include specific results (e.g., "saved 40 hours") when possible.
 */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

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
    <section className="border-t border-border bg-background px-6 py-24 font-mono">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xs text-muted-foreground">[0x00]</span>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              LOVED_BY_DEVELOPERS
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground">
              &gt; Early access customer feedback
            </p>
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
              className="group border border-border bg-card p-6 transition-all hover:border-primary/50"
            >
              <div className="mb-2 text-xs text-muted-foreground">[0x{(index + 1).toString(16).toUpperCase().padStart(2, '0')}]</div>
              <span className="block mb-6 text-xs text-muted-foreground">
                "{testimonial.quote}"
              </span>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-none">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium rounded-none">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="block text-xs font-semibold">
                    {testimonial.author.toUpperCase().replace(/ /g, '_')}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
