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
    <section className="border-y border-black/10 bg-[#F7F7F7] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-black">
          A Modern Stack You Can Trust.
        </h2>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-7">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center gap-3 rounded-lg bg-white p-6 transition-all hover:shadow-lg hover:ring-2 hover:ring-[#007AFF]/20"
            >
              <span className="text-4xl grayscale transition-all group-hover:grayscale-0">
                {tech.icon}
              </span>
              <span className="text-sm font-medium text-black">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
