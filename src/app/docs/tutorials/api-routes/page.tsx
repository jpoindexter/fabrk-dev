import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "API Routes - Fabrk Docs",
  description: "Build API endpoints with Next.js App Router. Learn patterns for authentication, validation, and error handling.",
};

export default function ApiRoutesTutorialPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">API Routes</h1>
        <p className="text-lg text-muted-foreground">
          Create API endpoints with Next.js App Router and learn Fabrk's patterns.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Fabrk uses Next.js 15 App Router for API routes. All routes are in{" "}
            <code className="rounded bg-muted px-1 py-0.5">src/app/api/</code>.
          </p>
        </CardContent>
      </Card>

      {/* Basic Route */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Creating a Basic Route</h2>
        <p className="text-muted-foreground">
          Create a new file at <code className="rounded bg-muted px-1 py-0.5">src/app/api/hello/route.ts</code>:
        </p>
        <CodeBlock language="typescript" code={`import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}`} />
      </div>

      {/* Protected Route */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Protected API Route</h2>
        <p className="text-muted-foreground">
          Add authentication to your route:
        </p>
        <CodeBlock language="typescript" code={`import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Access user data
  const userId = session.user.id;
  const email = session.user.email;

  return NextResponse.json({
    userId,
    email,
    message: "You are authenticated!"
  });
}`} />
      </div>

      {/* Input Validation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Input Validation with Zod</h2>
        <p className="text-muted-foreground">
          Always validate input with Zod schemas:
        </p>
        <CodeBlock language="typescript" code={`import { NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createUserSchema.parse(body);

    // Use validated data
    return NextResponse.json({ user: validated });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}`} />
      </div>

      {/* Database Access */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Database Access</h2>
        <p className="text-muted-foreground">
          Use Prisma to interact with your database:
        </p>
        <CodeBlock language="typescript" code={`import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ user });
}`} />
      </div>

      {/* Error Handling Pattern */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Error Handling Pattern</h2>
        <p className="text-muted-foreground">
          Use this consistent error handling pattern:
        </p>
        <CodeBlock language="typescript" code={`import { logger } from "@/lib/logger";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Your logic here
    const result = await someOperation();
    return NextResponse.json({ data: result });

  } catch (error) {
    logger.error("Operation failed:", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { error: "Operation failed" },
      { status: 500 }
    );
  }
}`} />
      </div>

      {/* Status Codes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">HTTP Status Codes</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li><code className="rounded bg-muted px-1 py-0.5">200</code> - Success</li>
          <li><code className="rounded bg-muted px-1 py-0.5">201</code> - Created</li>
          <li><code className="rounded bg-muted px-1 py-0.5">400</code> - Bad request (invalid input)</li>
          <li><code className="rounded bg-muted px-1 py-0.5">401</code> - Unauthorized (not logged in)</li>
          <li><code className="rounded bg-muted px-1 py-0.5">403</code> - Forbidden (no permission)</li>
          <li><code className="rounded bg-muted px-1 py-0.5">404</code> - Not found</li>
          <li><code className="rounded bg-muted px-1 py-0.5">422</code> - Validation error</li>
          <li><code className="rounded bg-muted px-1 py-0.5">500</code> - Server error</li>
        </ul>
      </div>
    </div>
  );
}
