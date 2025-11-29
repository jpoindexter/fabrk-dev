import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "API Routes - Fabrk Docs",
  description: "Build API endpoints with Next.js App Router. Learn patterns for authentication, validation, and error handling.",
};

export default function ApiRoutesTutorialPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <div className="inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x50] TUTORIALS ] API_ROUTES</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">API_ROUTES</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">&gt; Create API endpoints with Next.js App Router and learn Fabrk's patterns.</p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Fabrk uses Next.js 15 App Router for API routes. All routes are in{" "}
            <code className="bg-muted px-1 font-mono text-xs">src/app/api/</code>.
          </p>
        </CardContent>
      </Card>

      {/* Basic Route */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CREATING_A_BASIC_ROUTE</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Create a new file at <code className="bg-muted px-1 font-mono text-xs">src/app/api/hello/route.ts</code>:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}`} />
        </div>
      </div>

      {/* Protected Route */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">PROTECTED_API_ROUTE</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Add authentication to your route:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Input Validation */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">INPUT_VALIDATION_WITH_ZOD</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Always validate input with Zod schemas:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Database Access */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">DATABASE_ACCESS</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Use Prisma to interact with your database:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Error Handling Pattern */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">ERROR_HANDLING_PATTERN</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Use this consistent error handling pattern:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Status Codes */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">HTTP_STATUS_CODES</h2>
        <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">200</code> - Success</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">201</code> - Created</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">400</code> - Bad request (invalid input)</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">401</code> - Unauthorized (not logged in)</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">403</code> - Forbidden (no permission)</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">404</code> - Not found</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">422</code> - Validation error</div>
          <div>└─ <code className="bg-muted px-1 font-mono text-xs">500</code> - Server error</div>
        </div>
      </div>
    </div>
  );
}
