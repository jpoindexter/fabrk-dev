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
    <section className="border-border bg-background border-t px-6 py-24 font-mono">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="text-muted-foreground text-xs">[0x00]</span>
          <h2 className="text-2xl font-semibold tracking-tight">A_MODERN_STACK_YOU_CAN_TRUST</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group border-border bg-card hover:border-primary/50 flex flex-col items-center justify-center gap-4 border p-6 transition-all"
            >
              <SimpleIcon
                path={tech.path}
                className="text-foreground group-hover:text-primary h-8 w-8 transition-colors"
              />
              <span className="text-muted-foreground text-xs font-medium">
                [{tech.name.toUpperCase().replace(/ /g, "_").replace(/\./g, "")}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
