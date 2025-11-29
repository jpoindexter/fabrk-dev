import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Getting Started - Fabrk Docs",
  description: "Set up your Fabrk SaaS boilerplate in minutes. Install dependencies, configure environment variables, and launch your first app.",
};

export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x00] DOCS ] GETTING_STARTED</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">GETTING_STARTED</h1>
        <p className="font-mono text-sm text-muted-foreground">
          &gt; Everything you need to launch your SaaS, from first download to first customer.
        </p>
      </div>

      {/* What is Fabrk */}
      <Card className="rounded-none">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-lg font-bold text-foreground">WHAT_IS_FABRK?</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Fabrk is a ready-to-use foundation for building software businesses. Think of it like
            buying a house that already has the plumbing, electrical, and HVAC installed - you just
            need to decorate and move in.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Instead of spending months building user accounts, payment processing, and email systems
            from scratch, Fabrk gives you all of that working on day one. You can focus on what makes
            your product unique.
          </p>
        </CardContent>
      </Card>

      {/* Who is this for */}
      <Card className="rounded-none">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-lg font-bold text-foreground">WHO_IS_THIS_FOR?</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-mono text-sm font-semibold text-foreground">&gt; GREAT_FIT</h3>
              <ul className="space-y-1 font-mono text-xs text-muted-foreground">
                <li>├─ Developers building their first SaaS</li>
                <li>├─ Founders who can code</li>
                <li>├─ Agencies building client projects</li>
                <li>└─ Anyone who values shipping fast</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-mono text-sm font-semibold text-foreground">&gt; REQUIREMENTS</h3>
              <ul className="space-y-1 font-mono text-xs text-muted-foreground">
                <li>├─ Basic JavaScript/TypeScript</li>
                <li>├─ Familiarity with React</li>
                <li>├─ Node.js installed</li>
                <li>└─ ~30 minutes for setup</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Included */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">WHATS_INCLUDED</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Fabrk handles the essential features every SaaS needs:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "USER_ACCOUNTS", desc: "Sign up, log in, password reset, email verification. Email/password or Google." },
            { title: "PAYMENTS", desc: "Accept credit cards via Stripe. One-time purchases, subscriptions, free trials." },
            { title: "EMAIL", desc: "Transactional emails through Resend. Welcome, receipts, password reset templates." },
            { title: "DATABASE", desc: "PostgreSQL with Prisma ORM. Organized, secure, easy to query." },
            { title: "SECURITY", desc: "2FA, secure sessions, CSRF protection, encrypted passwords." },
            { title: "LANDING_PAGE", desc: "Professional marketing page with hero, pricing, FAQ. Multiple styles." },
          ].map((item) => (
            <Card key={item.title} className="rounded-none">
              <CardContent className="p-4">
                <h3 className="font-mono text-sm font-semibold mb-2">{item.title}</h3>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Start */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="font-mono text-lg font-bold">QUICK_START</h2>
          <span className="border border-primary bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
            5_MIN
          </span>
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          Already know Next.js? Here&apos;s the fastest path:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock
            language="bash"
            code={`# Clone, install, configure
git clone https://github.com/jpoindexter/fabrk-boilerplate.git my-saas
cd my-saas && npm install
cp .env.example .env.local

# Add your DATABASE_URL to .env.local, then:
npm run db:push && npm run dev`}
          />
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Open <a href="http://localhost:3000" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">localhost:3000</a> and you&apos;re running.
        </p>
      </div>

      {/* Step-by-Step Guide */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">STEP_BY_STEP_SETUP</h2>
        <p className="font-mono text-sm text-muted-foreground">
          New to this? Let&apos;s walk through each step.
        </p>

        {/* Step 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">1</span>
            <h3 className="font-mono text-sm font-semibold">CHECK_YOUR_SYSTEM</h3>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Make sure you have Node.js installed:
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code="node --version" />
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Need v18.17+. Download from <a href="https://nodejs.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">nodejs.org</a>.
          </p>
        </div>

        {/* Step 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">2</span>
            <h3 className="font-mono text-sm font-semibold">DOWNLOAD_FABRK</h3>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Clone the Fabrk code. Replace &quot;my-saas&quot; with your project name:
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code={`git clone https://github.com/jpoindexter/fabrk-boilerplate.git my-saas
cd my-saas`} />
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">3</span>
            <h3 className="font-mono text-sm font-semibold">INSTALL_DEPENDENCIES</h3>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Download all required libraries (1-2 min):
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code="npm install" />
          </div>
        </div>

        {/* Step 4 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">4</span>
            <h3 className="font-mono text-sm font-semibold">CREATE_CONFIG_FILE</h3>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Create your private settings file:
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code="cp .env.example .env.local" />
          </div>
        </div>

        {/* Step 5 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">5</span>
            <h3 className="font-mono text-sm font-semibold">SETUP_DATABASE</h3>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            You need a PostgreSQL database. Easiest options:
          </p>
          <ul className="font-mono text-xs text-muted-foreground space-y-1">
            <li>├─ <a href="https://neon.tech" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Neon</a> - Free tier, serverless</li>
            <li>├─ <a href="https://supabase.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Supabase</a> - Free tier, extra features</li>
            <li>└─ <a href="https://railway.app" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Railway</a> - Simple, pay-as-you-go</li>
          </ul>
          <p className="font-mono text-xs text-muted-foreground mt-3">
            Add connection string to <code className="bg-muted px-1.5 py-0.5 font-mono text-xs">.env.local</code>:
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code='DATABASE_URL="postgresql://username:password@host:5432/database"' />
          </div>
        </div>

        {/* Step 6 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">6</span>
            <h3 className="font-mono text-sm font-semibold">CONFIGURE_SETTINGS</h3>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Add required values to <code className="bg-muted px-1.5 py-0.5 font-mono text-xs">.env.local</code>:
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code={`DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-your-secret-here"`} />
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Generate secret: <code className="bg-muted px-1.5 py-0.5 font-mono text-xs">openssl rand -base64 32</code>
          </p>
        </div>

        {/* Step 7 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">7</span>
            <h3 className="font-mono text-sm font-semibold">INITIALIZE_DATABASE</h3>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Create the database tables:
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code="npm run db:push" />
          </div>
        </div>

        {/* Step 8 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">8</span>
            <h3 className="font-mono text-sm font-semibold">START_YOUR_APP</h3>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Start the development server:
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code="npm run dev" />
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Open <a href="http://localhost:3000" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">localhost:3000</a> - you should see the Fabrk landing page.
          </p>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">TROUBLESHOOTING</h2>
        <div className="space-y-3">
          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium hover:bg-muted/50">
              <span className="text-primary">├─</span>
              <span className="ml-2 text-destructive">[ERROR]</span>
              <span className="ml-2">PORT_3000_IN_USE</span>
            </summary>
            <div className="border-t border-border p-4 space-y-3">
              <p className="font-mono text-xs text-muted-foreground">Run on different port:</p>
              <div className="[&>div]:rounded-none">
                <CodeBlock language="bash" code="npm run dev -- -p 3001" />
              </div>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium hover:bg-muted/50">
              <span className="text-primary">├─</span>
              <span className="ml-2 text-destructive">[ERROR]</span>
              <span className="ml-2">CANNOT_CONNECT_DATABASE</span>
            </summary>
            <div className="border-t border-border p-4">
              <ul className="font-mono text-xs text-muted-foreground space-y-1">
                <li>├─ Check DATABASE_URL in .env.local</li>
                <li>├─ No extra spaces or quotes</li>
                <li>├─ Database is running</li>
                <li>└─ IP allowed in firewall</li>
              </ul>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium hover:bg-muted/50">
              <span className="text-primary">├─</span>
              <span className="ml-2 text-destructive">[ERROR]</span>
              <span className="ml-2">NEXTAUTH_SECRET_MISSING</span>
            </summary>
            <div className="border-t border-border p-4 space-y-3">
              <p className="font-mono text-xs text-muted-foreground">Generate and add secret:</p>
              <div className="[&>div]:rounded-none">
                <CodeBlock language="bash" code="openssl rand -base64 32" />
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Optional Setup */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">OPTIONAL_FEATURES</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Enable more features by adding API keys to <code className="bg-muted px-1.5 py-0.5 font-mono text-xs">.env.local</code>:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "PAYMENTS", desc: "Accept credit cards via Stripe", href: "/docs/features/payments" },
            { title: "EMAIL", desc: "Send transactional emails", href: "/docs/features/emails" },
            { title: "GOOGLE_LOGIN", desc: "Sign in with Google", href: "/docs/tutorials/authentication" },
            { title: "FILE_STORAGE", desc: "Upload files to cloud", href: "/docs/features/cloud-storage" },
          ].map((item) => (
            <Link key={item.title} href={item.href}>
              <Card className="rounded-none h-full transition-all hover:border-primary/50">
                <CardContent className="p-4">
                  <h3 className="font-mono text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="font-mono text-xs text-muted-foreground">{item.desc}</p>
                  <span className="font-mono text-xs text-primary">&gt; SETUP_GUIDE</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* What's Next */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "QUICK_START_TUTORIAL", desc: "Build your first feature in 10 min", href: "/docs/tutorials/quick-start" },
            { title: "ARCHITECTURE", desc: "Learn how the pieces fit together", href: "/docs/architecture" },
            { title: "AUTHENTICATION", desc: "Configure login options", href: "/docs/tutorials/authentication" },
            { title: "PAYMENTS", desc: "Start accepting money", href: "/docs/features/payments" },
          ].map((item) => (
            <Link key={item.title} href={item.href}>
              <Card className="rounded-none h-full transition-all hover:border-primary/50">
                <CardContent className="p-4">
                  <h3 className="font-mono text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="font-mono text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Back to docs link */}
      <div className="pt-4 border-t border-border">
        <Link href="/docs" className="font-mono text-sm text-primary hover:underline">
          &lt;─ BACK_TO_DOCS
        </Link>
      </div>
    </div>
  );
}
