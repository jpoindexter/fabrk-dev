import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    <section className="bg-muted/20 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black text-foreground">
            Loved by Developers
          </h2>
          <p className="text-lg font-bold text-muted-foreground">
            See what developers are saying about Fabrk
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group rounded-brutal border-2 border-brutal ${testimonial.color} p-6 shadow-brutal transition-brutal hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg`}
            >
              <div className="mb-4 text-4xl font-black opacity-50">"</div>
              <p className="mb-6 text-sm font-bold leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={`${testimonial.color} text-sm font-black`}>
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-black">
                    {testimonial.author}
                  </div>
                  <div className="text-xs font-bold opacity-80">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
