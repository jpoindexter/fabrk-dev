"use client";

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
import { motion } from "framer-motion";

export function TechStack() {
  const technologies = [
    { name: "Next.js", path: siNextdotjs.path, id: "0x20" },
    { name: "React", path: siReact.path, id: "0x21" },
    { name: "Tailwind CSS", path: siTailwindcss.path, id: "0x22" },
    { name: "Prisma", path: siPrisma.path, id: "0x23" },
    { name: "NextAuth", path: siAuth0.path, id: "0x24" },
    { name: "Stripe", path: siStripe.path, id: "0x25" },
    { name: "Resend", path: siResend.path, id: "0x26" },
  ];

  return (
    <section className="border-border bg-background border-t px-6 py-24 font-mono">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="border-border bg-card text-muted-foreground mb-4 inline-block border px-4 py-1 text-xs">
              [ [0x20] TECH_STACK ]
            </span>
            <h2 className="text-2xl font-semibold tracking-tight">A_MODERN_STACK_YOU_CAN_TRUST</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="group border-border bg-card hover:border-primary/50 flex h-full flex-col border transition-colors"
            >
              {/* Terminal Header */}
              <div className="border-border border-b px-4 py-2">
                <span className="text-muted-foreground text-xs">[ [{tech.id}] STACK ]</span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
                <SimpleIcon
                  path={tech.path}
                  className="text-foreground group-hover:text-primary size-8 transition-colors"
                />
                <span className="text-foreground text-xs font-medium">
                  {tech.name.toUpperCase().replace(/ /g, "_").replace(/\./g, "")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
