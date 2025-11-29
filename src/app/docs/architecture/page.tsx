import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Mermaid } from "@/components/ui/mermaid";
import Link from "next/link";

export const metadata = {
  title: "Architecture Overview - Fabrk Docs",
  description: "Understand Fabrk's enterprise-grade architecture. Next.js 15 App Router, Prisma ORM, NextAuth v5, and production-ready patterns.",
};

export default function ArchitecturePage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="font-mono text-xl font-bold tracking-tight">System Architecture</h1>
                <p className="font-mono text-xs text-muted-foreground">
                    A deep dive into Fabrk's enterprise-grade stack and design patterns.
                </p>
            </div>

            {/* High Level Overview */}
            <section className="space-y-3">
                <h2 className="font-mono text-sm font-semibold">High-Level Overview</h2>
                <p className="font-mono text-xs text-muted-foreground">
                    Fabrk is built on the <strong>T3 Stack</strong> philosophy but extended for enterprise SaaS requirements.
                    It leverages Next.js 15 (App Router) for the full-stack framework, ensuring type safety from the database to the frontend.
                </p>
                <Mermaid chart={`graph TD
    subgraph Client
        Browser[Browser / Mobile]
    end

    subgraph Edge
        Middleware[Middleware.ts]
        CDN[Vercel Edge Network]
    end

    subgraph Server
        App[Next.js App Router]
        API[API Routes / Server Actions]
    end

    subgraph Data
        DB[(PostgreSQL)]
        Redis[(Redis - Optional)]
    end

    subgraph Services
        Stripe[Stripe Payments]
        Resend[Resend Email]
        Auth[NextAuth.js Providers]
    end

    Browser --> CDN
    CDN --> Middleware
    Middleware --> App
    App --> API
    API --> DB
    API --> Services`} />
            </section>

            {/* Core Components */}
            <section className="space-y-3">
                <h2 className="font-mono text-sm font-semibold">Core Components</h2>

                <div className="grid gap-2 md:grid-cols-2">
                    <Card className="rounded-none">
                        <CardContent className="p-3">
                            <h3 className="font-mono text-xs font-semibold mb-2">Authentication & Security</h3>
                            <p className="font-mono text-[10px] text-muted-foreground mb-3">
                                Built on NextAuth.js v5. Sessions are stateless (JWT) by default for edge compatibility,
                                but can be database-persisted for strict session management.
                            </p>
                            <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
                                <div>├─ Role-Based Access Control (RBAC)</div>
                                <div>├─ Middleware protection for routes</div>
                                <div>└─ CSRF & Rate Limiting pre-configured</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none">
                        <CardContent className="p-3">
                            <h3 className="font-mono text-xs font-semibold mb-2">Database Layer</h3>
                            <p className="font-mono text-[10px] text-muted-foreground mb-3">
                                Prisma ORM provides a type-safe interface to PostgreSQL.
                                We use a "Service Layer" pattern to abstract database logic from UI components.
                            </p>
                            <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
                                <div>├─ Automated migrations</div>
                                <div>├─ Connection pooling (ready for serverless)</div>
                                <div>└─ Zod schema validation</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Data Flow */}
            <section className="space-y-3">
                <h2 className="font-mono text-sm font-semibold">Data Flow & Patterns</h2>
                <p className="font-mono text-xs text-muted-foreground">
                    We strictly follow unidirectional data flow. Server Actions are used for mutations,
                    while React Server Components (RSC) handle data fetching.
                </p>

                <div className="space-y-3">
                    <h3 className="font-mono text-xs font-semibold">Mutation Flow (Server Actions)</h3>
                    <p className="font-mono text-xs text-muted-foreground">Example of a typical server action flow:</p>
                    <div className="[&>div]:rounded-none">
                        <CodeBlock language="typescript" code={`// 1. Client invokes action
const { execute, status } = useAction(updateUserProfile);

// 2. Server Action (src/app/_actions/user.ts)
export const updateUserProfile = action(schema, async ({ input, ctx }) => {
  // 3. Authorization Check
  if (!ctx.session) throw new UnauthorizedError();

  // 4. Database Operation
  const user = await prisma.user.update({...});

  // 5. Revalidation
  revalidatePath('/dashboard/settings');

  return user;
});`} />
                    </div>
                </div>
            </section>

            {/* Scalability */}
            <section className="space-y-3">
                <h2 className="font-mono text-sm font-semibold">Scalability Considerations</h2>
                <p className="font-mono text-xs text-muted-foreground">
                    Fabrk is designed to scale from 0 to 1M+ users without major refactoring.
                </p>
                <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
                    <div>├─ <strong>Edge Caching:</strong> Static assets and ISR pages are cached at the edge.</div>
                    <div>├─ <strong>Serverless Database:</strong> Compatible with Neon/Supabase for auto-scaling storage and compute.</div>
                    <div>└─ <strong>Job Queues:</strong> Background jobs (emails, webhooks) are decoupled using Inngest or similar patterns (optional).</div>
                </div>
            </section>
        </div>
    );
}
