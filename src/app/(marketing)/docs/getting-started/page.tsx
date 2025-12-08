import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard, DocsLinkCard } from "@/components/docs";
import { Rocket, User, CreditCard, Mail, Database, Shield, Coins } from "lucide-react";

export const metadata = {
  title: "Getting Started - Fabrk Docs",
  description:
    "Set up your Fabrk SaaS boilerplate in minutes. Install dependencies, configure environment variables, and launch your first app.",
};

export default function GettingStartedPage() {
  return (
    <FeatureGuideTemplate
      code="[0x00]"
      category="Docs"
      title="Getting_Started"
      description="Everything you need to launch your SaaS, from first download to first customer."
      overview="Fabrk is a ready-to-use foundation for building software businesses. Includes user accounts, payments, email, database, security, and landing page - all working on day one."
      features={[
        { icon: User, title: "User Accounts", description: "Sign up, login, password reset." },
        { icon: CreditCard, title: "Payments", description: "Stripe subscriptions ready." },
        { icon: Mail, title: "Email", description: "Resend transactional emails." },
        { icon: Database, title: "Database", description: "PostgreSQL with Prisma ORM." },
        { icon: Shield, title: "Security", description: "2FA, CSRF, secure sessions." },
        { icon: Rocket, title: "Landing Page", description: "Hero, pricing, FAQ included." },
      ]}
      setup={[
        {
          title: "Check Your System",
          description: "Ensure Node.js v18.17+ is installed",
          code: `node --version`,
          language: "bash",
        },
        {
          title: "Download Fabrk",
          description: "Clone the repository",
          code: `git clone https://github.com/your-username/fabrk.git my-saas
cd my-saas`,
          language: "bash",
        },
        {
          title: "Install Dependencies",
          description: "Download all required libraries (1-2 min)",
          code: `npm install`,
          language: "bash",
        },
        {
          title: "Create Config File",
          description: "Create your private settings file",
          code: `cp .env.example .env.local`,
          language: "bash",
        },
        {
          title: "Setup Database",
          description: "Add PostgreSQL connection string to .env.local",
          code: `DATABASE_URL="postgresql://username:password@host:5432/database"`,
          language: "bash",
        },
        {
          title: "Configure Settings",
          description: "Add required environment variables",
          code: `DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-your-secret-here"`,
          language: "bash",
        },
        {
          title: "Initialize Database",
          description: "Create the database tables",
          code: `npm run db:push`,
          language: "bash",
        },
        {
          title: "Start Your App",
          description: "Launch the development server",
          code: `npm run dev`,
          language: "bash",
        },
      ]}
      usage={[
        {
          title: "Quick Start (5 min)",
          description: "Already know Next.js? Here's the fastest path",
          code: `# Clone, install, configure
git clone https://github.com/your-username/fabrk.git my-saas
cd my-saas && npm install
cp .env.example .env.local

# Add your DATABASE_URL to .env.local, then:
npm run db:push && npm run dev`,
          language: "bash",
        },
        {
          title: "Generate Secret",
          description: "Create a secure NEXTAUTH_SECRET",
          code: `openssl rand -base64 32`,
          language: "bash",
        },
        {
          title: "Database Providers",
          description: "Easiest options for PostgreSQL",
          code: `# Free tier options:
# - Neon (neon.tech) - Serverless
# - Supabase (supabase.com) - Extra features
# - Railway (railway.app) - Pay-as-you-go`,
          language: "bash",
        },
      ]}
      previous={{ title: "Docs", href: "/docs" }}
      next={{ title: "Architecture", href: "/docs/architecture" }}
    >
      {/* What is Fabrk */}
      <DocsSection title="What Is Fabrk?">
        <DocsCard code="10" title="OVERVIEW">
          <p className="mb-4">
            Fabrk is a ready-to-use foundation for building software businesses. Think of it like
            buying a house that already has the plumbing, electrical, and HVAC installed - you just
            need to decorate and move in.
          </p>
          <p>
            Instead of spending months building user accounts, payment processing, and email systems
            from scratch, Fabrk gives you all of that working on day one. You can focus on what
            makes your product unique.
          </p>
        </DocsCard>
      </DocsSection>

      {/* Who is this for */}
      <DocsSection title="Who Is This For?">
        <div className="grid gap-6 sm:grid-cols-2">
          <DocsCard code="20" title="GREAT_FIT">
            <div className="space-y-1">
              <div>├─ Developers building their first SaaS</div>
              <div>├─ Founders who can code</div>
              <div>├─ Agencies building client projects</div>
              <div>└─ Anyone who values shipping fast</div>
            </div>
          </DocsCard>
          <DocsCard code="21" title="REQUIREMENTS">
            <div className="space-y-1">
              <div>├─ Basic JavaScript/TypeScript</div>
              <div>├─ Familiarity with React</div>
              <div>├─ Node.js installed</div>
              <div>└─ ~30 minutes for setup</div>
            </div>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <DocsCard code="30" title="COMMON_ERRORS">
          <div className="space-y-4">
            <div>
              <p className="text-foreground mb-1 font-semibold">[ERROR]: PORT_3000_IN_USE</p>
              <p>
                Run on different port: <code className="bg-muted px-1">npm run dev -- -p 3001</code>
              </p>
            </div>
            <div>
              <p className="text-foreground mb-1 font-semibold">[ERROR]: CANNOT_CONNECT_DATABASE</p>
              <p>
                Check DATABASE_URL in .env.local, ensure no extra spaces, database is running, IP
                allowed
              </p>
            </div>
            <div>
              <p className="text-foreground mb-1 font-semibold">[ERROR]: NEXTAUTH_SECRET_MISSING</p>
              <p>
                Generate with: <code className="bg-muted px-1">openssl rand -base64 32</code>
              </p>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Optional Features */}
      <DocsSection title="Optional Features">
        <div className="grid gap-6 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/features/payments"
            title="Payments"
            description="Accept credit cards via Stripe"
          />
          <DocsLinkCard
            href="/docs/features/emails"
            title="Email"
            description="Send transactional emails"
          />
          <DocsLinkCard
            href="/docs/tutorials/authentication"
            title="Google Login"
            description="Sign in with Google"
          />
          <DocsLinkCard
            href="/docs/features/cloud-storage"
            title="File Storage"
            description="Upload files to cloud"
          />
          <DocsLinkCard
            href="/docs/features/ai-credits"
            title="AI Credits"
            description="Token billing for AI features"
          />
        </div>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-6 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/quick-start"
            title="Quick Start Tutorial"
            description="Build your first feature in 10 min"
          />
          <DocsLinkCard
            href="/docs/architecture"
            title="Architecture"
            description="Learn how the pieces fit together"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
