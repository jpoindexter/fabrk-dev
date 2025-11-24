import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function ArchitecturePage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">System Architecture</h1>
                <p className="text-lg text-muted-foreground">
                    A deep dive into Fabrk's enterprise-grade stack and design patterns.
                </p>
            </div>

            {/* High Level Overview */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">High-Level Overview</h2>
                <p className="text-muted-foreground">
                    Fabrk is built on the <strong>T3 Stack</strong> philosophy but extended for enterprise SaaS requirements.
                    It leverages Next.js 15 (App Router) for the full-stack framework, ensuring type safety from the database to the frontend.
                </p>
                <div className="my-6 overflow-hidden rounded-lg border bg-card p-6">
                    <pre className="mermaid">
                        {`graph TD
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
    API --> Services`}
                    </pre>
                </div>
            </section>

            {/* Core Components */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Core Components</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Authentication & Security</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Built on NextAuth.js v5. Sessions are stateless (JWT) by default for edge compatibility,
                                but can be database-persisted for strict session management.
                            </p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li>Role-Based Access Control (RBAC)</li>
                                <li>Middleware protection for routes</li>
                                <li>CSRF & Rate Limiting pre-configured</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Database Layer</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Prisma ORM provides a type-safe interface to PostgreSQL.
                                We use a "Service Layer" pattern to abstract database logic from UI components.
                            </p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li>Automated migrations</li>
                                <li>Connection pooling (ready for serverless)</li>
                                <li>Zod schema validation</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Data Flow */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Data Flow & Patterns</h2>
                <p className="text-muted-foreground">
                    We strictly follow unidirectional data flow. Server Actions are used for mutations,
                    while React Server Components (RSC) handle data fetching.
                </p>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Mutation Flow (Server Actions)</h3>
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
            </section>

            {/* Scalability */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Scalability Considerations</h2>
                <p className="text-muted-foreground">
                    Fabrk is designed to scale from 0 to 1M+ users without major refactoring.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Edge Caching:</strong> Static assets and ISR pages are cached at the edge.</li>
                    <li><strong>Serverless Database:</strong> Compatible with Neon/Supabase for auto-scaling storage and compute.</li>
                    <li><strong>Job Queues:</strong> Background jobs (emails, webhooks) are decoupled using Inngest or similar patterns (optional).</li>
                </ul>
            </section>
        </div>
    );
}
