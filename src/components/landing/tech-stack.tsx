import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siStripe,
  siAuth0,
  siResend,
} from "simple-icons";

export function TechStack() {
  const technologies = [
    { name: "Next.js", path: siNextdotjs.path },
    { name: "React", path: siReact.path },
    { name: "Tailwind CSS", path: siTailwindcss.path },
    { name: "Prisma", path: siPrisma.path },
    { name: "Stripe", path: siStripe.path },
    { name: "NextAuth", path: siAuth0.path },
    { name: "Resend", path: siResend.path },
  ];

  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-2xl font-semibold text-foreground">
          A Modern Stack You Can Trust.
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
            >
              <SimpleIcon
                path={tech.path}
                className="h-8 w-8 text-foreground transition-colors group-hover:text-primary"
              />
              <span className="text-xs font-medium text-muted-foreground">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
