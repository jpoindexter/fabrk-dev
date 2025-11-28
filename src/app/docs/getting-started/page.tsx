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
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Getting Started</h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to launch your SaaS, from first download to first customer.
        </p>
      </div>

      {/* What is Fabrk - Plain English */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">What is Fabrk?</h2>
          <p className="text-muted-foreground">
            Fabrk is a ready-to-use foundation for building software businesses. Think of it like
            buying a house that already has the plumbing, electrical, and HVAC installed - you just
            need to decorate and move in.
          </p>
          <p className="text-muted-foreground">
            Instead of spending months building user accounts, payment processing, and email systems
            from scratch, Fabrk gives you all of that working on day one. You can focus on what makes
            your product unique.
          </p>
        </CardContent>
      </Card>

      {/* Who is this for */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Who is This For?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Great Fit</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Developers building their first SaaS</li>
                <li>Founders who can code (or have a technical co-founder)</li>
                <li>Agencies building client projects</li>
                <li>Anyone who values shipping fast over building from scratch</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">You&apos;ll Need</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Basic JavaScript/TypeScript knowledge</li>
                <li>Familiarity with React (Next.js is a bonus)</li>
                <li>A computer with Node.js installed</li>
                <li>About 30 minutes for initial setup</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Included - Plain English */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">What&apos;s Included</h2>
        <p className="text-muted-foreground">
          Fabrk handles the essential features every SaaS needs, so you don&apos;t have to build them:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">User Accounts</h3>
              <p className="text-sm text-muted-foreground">
                Sign up, log in, password reset, email verification. Works with email/password
                or Google accounts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Payments</h3>
              <p className="text-sm text-muted-foreground">
                Accept credit cards through Stripe. Supports one-time purchases, subscriptions,
                and free trials.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground">
                Send transactional emails (welcome, receipts, password reset) through Resend.
                Templates included.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Database</h3>
              <p className="text-sm text-muted-foreground">
                PostgreSQL database with Prisma ORM. Your data is organized, secure, and
                easy to query.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Security</h3>
              <p className="text-sm text-muted-foreground">
                Two-factor authentication (2FA), secure sessions, CSRF protection, and
                encrypted passwords.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Landing Page</h3>
              <p className="text-sm text-muted-foreground">
                Professional marketing page with hero sections, pricing tables, and FAQ.
                Multiple styles included.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Start - For busy developers */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Quick Start</h2>
          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            5 minutes
          </span>
        </div>
        <div>
          <p className="text-muted-foreground">
            Already know Next.js? Here&apos;s the fastest path to running Fabrk locally:
          </p>
        </div>
        <CodeBlock
          language="bash"
          code={`# Clone, install, configure
git clone https://github.com/jpoindexter/fabrk-boilerplate.git my-saas
cd my-saas && npm install
cp .env.example .env.local

# Add your DATABASE_URL to .env.local, then:
npm run db:push && npm run dev`}
        />
        <p className="text-sm text-muted-foreground">
          Open <a href="http://localhost:3000" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">localhost:3000</a> and you&apos;re running.
          Need help with any step? Keep reading below.
        </p>
      </div>

      {/* Step-by-Step Guide - For learners */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Step-by-Step Setup</h2>
        <p className="text-muted-foreground">
          New to this? No problem. Let&apos;s walk through each step with explanations.
        </p>

        {/* Step 1 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              1
            </span>
            <h3 className="font-semibold">Check Your System</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              First, make sure you have Node.js installed. Open your terminal and run:
            </p>
          </div>
          <CodeBlock language="bash" code="node --version" />
          <p className="text-sm text-muted-foreground">
            You need version 18.17 or higher. If you see an error or an older version,
            download Node.js from <a href="https://nodejs.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">nodejs.org</a>.
          </p>
        </div>

        {/* Step 2 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              2
            </span>
            <h3 className="font-semibold">Download Fabrk</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Clone (copy) the Fabrk code to your computer. Replace &quot;my-saas&quot; with whatever
              you want to name your project:
            </p>
          </div>
          <CodeBlock
            language="bash"
            code={`git clone https://github.com/jpoindexter/fabrk-boilerplate.git my-saas
cd my-saas`}
          />
          <p className="text-sm text-muted-foreground">
            <strong>What this does:</strong> Downloads all the Fabrk files into a new folder
            called &quot;my-saas&quot; and moves you into that folder.
          </p>
        </div>

        {/* Step 3 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              3
            </span>
            <h3 className="font-semibold">Install Dependencies</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Fabrk uses many helpful libraries. This command downloads them all:
            </p>
          </div>
          <CodeBlock language="bash" code="npm install" />
          <p className="text-sm text-muted-foreground">
            <strong>What this does:</strong> Reads the <code className="rounded bg-muted px-1">package.json</code> file
            and downloads all the required code libraries. Takes 1-2 minutes.
          </p>
        </div>

        {/* Step 4 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              4
            </span>
            <h3 className="font-semibold">Create Your Configuration File</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Fabrk needs to know your database password, API keys, and other private settings.
              These go in a special file that stays on your computer (never uploaded to GitHub):
            </p>
          </div>
          <CodeBlock language="bash" code="cp .env.example .env.local" />
          <p className="text-sm text-muted-foreground">
            <strong>What this does:</strong> Creates a copy of the example settings file.
            You&apos;ll fill in your real values next.
          </p>
        </div>

        {/* Step 5 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              5
            </span>
            <h3 className="font-semibold">Set Up Your Database</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            You need a PostgreSQL database to store user accounts, payments, and your app data.
            The easiest options are:
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li><a href="https://neon.tech" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Neon</a> - Free tier, serverless, great for starting out</li>
            <li><a href="https://supabase.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Supabase</a> - Free tier, includes extra features</li>
            <li><a href="https://railway.app" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Railway</a> - Simple setup, pay-as-you-go</li>
          </ul>
          <div>
            <p className="text-sm text-muted-foreground mt-2">
              After creating a database, copy the connection string (looks like <code className="rounded bg-muted px-1">postgresql://user:pass@host/db</code>)
              and add it to your <code className="rounded bg-muted-foreground px-1">.env.local</code> file:
            </p>
          </div>
          <CodeBlock
            language="bash"
            code='DATABASE_URL="postgresql://username:password@host:5432/database"'
          />
        </div>

        {/* Step 6 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              6
            </span>
            <h3 className="font-semibold">Configure Required Settings</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Open <code className="rounded bg-muted px-1">.env.local</code> in your code editor and add these required values:
            </p>
          </div>
          <CodeBlock
            language="bash"
            code={`# Your database connection (from step 5)
DATABASE_URL="postgresql://..."

# Where your app runs locally
NEXTAUTH_URL="http://localhost:3000"

# A random secret for security (generate one below)
NEXTAUTH_SECRET="paste-your-secret-here"`}
          />
          <div>
            <p className="text-sm text-muted-foreground">
              Generate a secure secret with this command:
            </p>
          </div>
          <CodeBlock language="bash" code="openssl rand -base64 32" />
          <p className="text-sm text-muted-foreground">
            Copy the output and paste it as your <code className="rounded bg-muted px-1">NEXTAUTH_SECRET</code>.
          </p>
        </div>

        {/* Step 7 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              7
            </span>
            <h3 className="font-semibold">Initialize the Database</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Now let&apos;s create the database tables that Fabrk needs:
            </p>
          </div>
          <CodeBlock language="bash" code="npm run db:push" />
          <p className="text-sm text-muted-foreground">
            <strong>What this does:</strong> Reads the database schema (structure) from Fabrk
            and creates matching tables in your database. You should see a success message.
          </p>
        </div>

        {/* Step 8 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              8
            </span>
            <h3 className="font-semibold">Start Your App</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              You&apos;re ready! Start the development server:
            </p>
          </div>
          <CodeBlock language="bash" code="npm run dev" />
          <p className="text-sm text-muted-foreground">
            Open <a href="http://localhost:3000" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">http://localhost:3000</a> in
            your browser. You should see the Fabrk landing page. You can now create an account
            and explore the dashboard.
          </p>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Troubleshooting</h2>
        <div className="space-y-3">
          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              Error: &quot;Port 3000 is already in use&quot;
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground space-y-3">
              <div>
                <p>Another application is using port 3000. Either close it, or run Fabrk on a different port:</p>
              </div>
              <CodeBlock language="bash" code="npm run dev -- -p 3001" />
              <p className="mt-2">Then open <a href="http://localhost:3001" className="text-primary hover:underline">localhost:3001</a> instead.</p>
            </div>
          </details>

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              Error: &quot;Cannot connect to database&quot;
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>Check your <code className="rounded bg-muted px-1">DATABASE_URL</code> in <code className="rounded bg-muted px-1">.env.local</code>:</p>
              <ul className="list-inside list-disc mt-2 space-y-1">
                <li>Make sure there are no extra spaces or quotes</li>
                <li>Verify your database is running and accessible</li>
                <li>Check that your IP is allowed in the database firewall settings</li>
              </ul>
            </div>
          </details>

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              Error: &quot;NEXTAUTH_SECRET is missing&quot;
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground space-y-3">
              <div>
                <p>You need to generate and add a secret. Run this command:</p>
              </div>
              <CodeBlock language="bash" code="openssl rand -base64 32" />
              <p className="mt-2">Copy the output and add it to your <code className="rounded bg-muted px-1">.env.local</code> file as <code className="rounded bg-muted px-1">NEXTAUTH_SECRET=&quot;your-secret&quot;</code></p>
            </div>
          </details>
        </div>
      </div>

      {/* Optional Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Optional: Enable More Features</h2>
        <p className="text-muted-foreground">
          The basic setup above gets you running. When you&apos;re ready, enable these features
          by adding their API keys to <code className="rounded bg-muted px-1">.env.local</code>:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Payments (Stripe)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Accept credit cards and manage subscriptions.
              </p>
              <Link href="/docs/features/payments" className="text-sm text-primary hover:underline">
                Setup guide →
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Email (Resend)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Send transactional emails to your users.
              </p>
              <Link href="/docs/features/emails" className="text-sm text-primary hover:underline">
                Setup guide →
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Google Login</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Let users sign in with their Google account.
              </p>
              <Link href="/docs/tutorials/authentication" className="text-sm text-primary hover:underline">
                Setup guide →
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">File Storage</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Upload and store files in the cloud.
              </p>
              <Link href="/docs/features/cloud-storage" className="text-sm text-primary hover:underline">
                Setup guide →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* What's Next */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">What&apos;s Next?</h2>
        <p className="text-muted-foreground">
          Now that Fabrk is running, choose your path:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/quick-start">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Quick Start Tutorial</h3>
                <p className="text-sm text-muted-foreground">
                  Build your first feature in 10 minutes. Great for hands-on learners.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/architecture">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Understand the Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how all the pieces fit together. Best if you like to understand
                  before you build.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Set Up Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Configure login options including email/password, Google, and 2FA.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/features/payments">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Connect Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Start accepting money with Stripe. Essential for any SaaS.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Back to docs link */}
      <div className="pt-4">
        <Link href="/docs" className="text-primary hover:underline">
          ← Back to Documentation
        </Link>
      </div>
    </div>
  );
}
