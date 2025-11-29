import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siAuth0,
  siResend,
  siStripe,
} from "simple-icons";

export function TechStack() {
  const technologies = [
    { name: "Next.js", path: siNextdotjs.path },
    { name: "React", path: siReact.path },
    { name: "Tailwind CSS", path: siTailwindcss.path },
    { name: "Prisma", path: siPrisma.path },
    { name: "NextAuth", path: siAuth0.path },
    { name: "Stripe", path: siStripe.path },
    { name: "Resend", path: siResend.path },
  ];

  return (
    <section className="border-t border-border bg-background px-6 py-24 font-mono">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-xs text-muted-foreground">[0x00]</span>
          <h2 className="text-2xl font-bold tracking-tight">
            A_MODERN_STACK_YOU_CAN_TRUST
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center gap-3 border border-border bg-card p-6 transition-all hover:border-primary/50"
            >
              <SimpleIcon
                path={tech.path}
                className="h-8 w-8 text-foreground transition-colors group-hover:text-primary"
              />
              <span className="text-xs font-medium text-muted-foreground">
                [{tech.name.toUpperCase().replace(/ /g, '_').replace(/\./g, '')}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
