import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Feature Flags - Fabrk Documentation",
  description: "Learn how to implement feature flags for toggles, gradual rollouts, and A/B testing.",
};

export default function FeatureFlagsPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Documentation
        </Link>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x70] FEATURES ] FEATURE_FLAGS</span>
        </div>
        <h1 className="font-mono text-3xl font-bold tracking-tight">FEATURE_FLAGS</h1>
        <p className="font-mono text-base text-muted-foreground">
          &gt; Control feature visibility with toggles, percentage rollouts, and user targeting for safe deployments.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="font-mono text-xl font-semibold mb-4">OVERVIEW</h2>
          <p className="mb-4">
            Feature flags allow you to control feature visibility without deploying new code.
            Use them for gradual rollouts, A/B testing, user targeting, and kill switches.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Simple toggles:</strong> Enable/disable features globally</li>
            <li><strong>Percentage rollouts:</strong> Roll out to a percentage of users</li>
            <li><strong>User targeting:</strong> Enable for specific users or groups</li>
            <li><strong>Environment-based:</strong> Different flags per environment</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-xl font-semibold mb-4">DATABASE_SCHEMA</h2>
          <p className="mb-4 text-muted-foreground">
            Feature flag model in Prisma schema:
          </p>
        </div>
        <CodeBlock language="prisma" code={`// prisma/schema.prisma
model FeatureFlag {
  id          String   @id @default(cuid())
  key         String   @unique // "new-dashboard", "beta-api"
  name        String   // Human-readable name
  description String?

  enabled     Boolean  @default(false)

  // Percentage rollout (0-100)
  percentage  Int      @default(100)

  // User targeting
  userIds     String[] // Specific user IDs

  // Plan targeting
  plans       String[] // ["pro", "enterprise"]

  // Environment
  environment String   @default("production")

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([key, environment])
}`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-xl font-semibold mb-4">FEATURE_FLAG_SERVICE</h2>
          <p className="mb-4 text-muted-foreground">
            Core service for checking feature flags:
          </p>
        </div>
        <CodeBlock language="bash" code={`// src/lib/feature-flags.ts
import { prisma } from "@/lib/db";
import crypto from "crypto";

interface FlagContext {
  userId?: string;
  plan?: string;
  environment?: string;
}

export async function isFeatureEnabled(
  key: string,
  context: FlagContext = {}
): Promise<boolean> {
  const environment = context.environment || process.env.NODE_ENV;

  const flag = await prisma.featureFlag.findFirst({
    where: { key, environment },
  });

  if (!flag) {
    return false; // Default to disabled for unknown flags
  }

  if (!flag.enabled) {
    return false;
  }

  // Check user targeting
  if (flag.userIds.length > 0 && context.userId) {
    if (flag.userIds.includes(context.userId)) {
      return true;
    }
  }

  // Check plan targeting
  if (flag.plans.length > 0 && context.plan) {
    if (!flag.plans.includes(context.plan)) {
      return false;
    }
  }

  // Check percentage rollout
  if (flag.percentage < 100 && context.userId) {
    const hash = crypto
      .createHash("md5")
      .update(\`\${key}:\${context.userId}\`)
      .digest("hex");
    const value = parseInt(hash.slice(0, 8), 16) % 100;

    if (value >= flag.percentage) {
      return false;
    }
  }

  return true;
}

// Get all flags for a user (useful for client-side)
export async function getFeatureFlags(context: FlagContext = {}) {
  const environment = context.environment || process.env.NODE_ENV;

  const flags = await prisma.featureFlag.findMany({
    where: { environment },
  });

  const result: Record<string, boolean> = {};

  for (const flag of flags) {
    result[flag.key] = await isFeatureEnabled(flag.key, context);
  }

  return result;
}`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-xl font-semibold mb-4">SERVER_SIDE_USAGE</h2>
          <p className="mb-4 text-muted-foreground">
            Check feature flags in API routes and server components:
          </p>
        </div>
        <CodeBlock language="tsx" code={`// In API routes
import { auth } from "@/lib/auth";
import { isFeatureEnabled } from "@/lib/feature-flags";

export async function GET(req: Request) {
  const session = await auth();

  const hasNewDashboard = await isFeatureEnabled("new-dashboard", {
    userId: session?.user?.id,
    plan: session?.user?.plan,
  });

  if (!hasNewDashboard) {
    return Response.json(
      { error: "Feature not available" },
      { status: 403 }
    );
  }

  // Return new dashboard data...
}

// In Server Components
import { isFeatureEnabled } from "@/lib/feature-flags";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  const showBetaFeatures = await isFeatureEnabled("beta-features", {
    userId: session?.user?.id,
    plan: session?.user?.plan,
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {showBetaFeatures && (
        <div className="bg-primary/10 p-4 rounded-md">
          <h2>Beta Features</h2>
          {/* Beta content */}
        </div>
      )}
    </div>
  );
}`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-xl font-semibold mb-4">CLIENT_SIDE_USAGE</h2>
          <p className="mb-4 text-muted-foreground">
            Use feature flags in client components with a React hook:
          </p>
        </div>
        <CodeBlock language="tsx" code={`// src/hooks/use-feature-flags.ts
"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface FeatureFlagsContextType {
  flags: Record<string, boolean>;
  isEnabled: (key: string) => boolean;
  loading: boolean;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType>({
  flags: {},
  isEnabled: () => false,
  loading: true,
});

export function FeatureFlagsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/feature-flags")
      .then((res) => res.json())
      .then((data) => {
        setFlags(data.flags);
        setLoading(false);
      });
  }, []);

  const isEnabled = (key: string) => flags[key] ?? false;

  return (
    <FeatureFlagsContext.Provider value={{ flags, isEnabled, loading }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  return useContext(FeatureFlagsContext);
}

export function useFeatureFlag(key: string) {
  const { isEnabled, loading } = useFeatureFlags();
  return { enabled: isEnabled(key), loading };
}

// Usage in components
"use client";

import { useFeatureFlag } from "@/hooks/use-feature-flags";

export function NewFeature() {
  const { enabled, loading } = useFeatureFlag("new-feature");

  if (loading) return null;
  if (!enabled) return null;

  return (
    <div className="bg-success/10 p-4 rounded-md">
      <h3>New Feature Available!</h3>
      {/* Feature content */}
    </div>
  );
}`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-xl font-semibold mb-4">ADMIN_MANAGEMENT</h2>
          <p className="mb-4 text-muted-foreground">
            API routes for managing feature flags:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// POST /api/admin/feature-flags
export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { key, name, description, enabled, percentage, userIds, plans } = await req.json();

  const flag = await prisma.featureFlag.create({
    data: {
      key,
      name,
      description,
      enabled: enabled ?? false,
      percentage: percentage ?? 100,
      userIds: userIds ?? [],
      plans: plans ?? [],
    },
  });

  return Response.json({ flag });
}

// PATCH /api/admin/feature-flags/:id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const updates = await req.json();

  const flag = await prisma.featureFlag.update({
    where: { id: params.id },
    data: updates,
  });

  return Response.json({ flag });
}

// Quick toggle endpoint
// POST /api/admin/feature-flags/:key/toggle
export async function POST(
  req: Request,
  { params }: { params: { key: string } }
) {
  const flag = await prisma.featureFlag.findUnique({
    where: { key: params.key },
  });

  if (!flag) {
    return Response.json({ error: "Flag not found" }, { status: 404 });
  }

  const updated = await prisma.featureFlag.update({
    where: { key: params.key },
    data: { enabled: !flag.enabled },
  });

  return Response.json({ flag: updated });
}`} />
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-mono text-xl font-semibold mb-4">BEST_PRACTICES</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Use descriptive keys:</strong> <code className="font-mono">new-checkout-flow</code> not <code className="font-mono">flag1</code></li>
            <li><strong>Start at 0%:</strong> Begin rollouts at 0% and gradually increase</li>
            <li><strong>Add kill switches:</strong> Every major feature should have a flag</li>
            <li><strong>Clean up old flags:</strong> Remove flags once features are fully rolled out</li>
            <li><strong>Test both states:</strong> Ensure your app works with flag on and off</li>
            <li><strong>Document flags:</strong> Keep a registry of active flags and their purpose</li>
            <li><strong>Use consistent hashing:</strong> Same user always gets same result for % rollouts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
