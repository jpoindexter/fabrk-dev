export function TechStack() {
  const technologies = [
    { name: "Next.js", icon: "⚡" },
    { name: "React", icon: "⚛️" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Prisma", icon: "📊" },
    { name: "Stripe", icon: "💳" },
    { name: "NextAuth", icon: "🔐" },
    { name: "Resend", icon: "📧" },
  ];

  return (
    <section className="border-y-3 border-border bg-accent px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
          A Modern Stack You Can Trust.
        </h2>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-7">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center gap-3 rounded-lg border-3 border-border bg-card p-6 shadow-brutal transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm hover:ring-4 hover:ring-primary/20"
            >
              <span className="text-4xl grayscale transition-all group-hover:grayscale-0">
                {tech.icon}
              </span>
              <span className="text-sm font-medium text-foreground">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
