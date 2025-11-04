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
    <section className="border-y-4 border-black bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-black text-foreground">
          A Modern Stack You Can Trust.
        </h2>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-7">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center gap-3 rounded-brutal border-4 border-black bg-background p-6 shadow-brutal transition-all hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1"
            >
              <SimpleIcon
                path={tech.path}
                size={40}
                className="text-foreground transition-all group-hover:text-primary"
              />
              <span className="text-sm font-bold text-foreground">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
