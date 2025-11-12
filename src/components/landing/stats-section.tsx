export function StatsSection() {
  const stats = [
    {
      value: "500+",
      label: "Developers",
      description: "Using Fabrk to ship faster",
      color: "bg-primary text-primary-foreground",
    },
    {
      value: "1,000+",
      label: "Projects Shipped",
      description: "Built with Fabrk boilerplate",
      color: "bg-accent text-accent-foreground",
    },
    {
      value: "4.9/5",
      label: "Average Rating",
      description: "From satisfied customers",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      value: "40hrs",
      label: "Time Saved",
      description: "Per project on average",
      color: "bg-primary text-primary-foreground",
    },
  ];

  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black text-foreground">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-lg font-bold text-muted-foreground">
            Join hundreds of developers shipping production-ready SaaS apps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group rounded-brutal border-2 border-brutal ${stat.color} p-8 shadow-brutal transition-brutal hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg`}
            >
              <div className="mb-2 text-5xl font-black">{stat.value}</div>
              <div className="mb-2 text-xl font-black">{stat.label}</div>
              <div className="text-sm font-bold opacity-90">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
