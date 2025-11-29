import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Schema Validation - Fabrk Docs",
  description: "Validate API inputs with Zod schemas. Type-safe validation for forms, API routes, and environment variables.",
};

export default function SchemaValidationPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x80] SECURITY ] VALIDATION</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">SCHEMA_VALIDATION</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Validate all inputs with Zod schemas for type-safe, secure data handling.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">What's Included</h3>
          <ul className="font-mono text-sm text-muted-foreground space-y-1">
            <li>Type-safe validation with Zod</li>
            <li>API request/response validation</li>
            <li>Form validation schemas</li>
            <li>Environment variable validation</li>
            <li>Custom error messages</li>
            <li>TypeScript inference from schemas</li>
          </ul>
        </CardContent>
      </Card>

      {/* Basic Zod Schema */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">BASIC_ZOD_SCHEMA</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Define schemas to validate data:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/validations/user.ts

import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
});

// Infer TypeScript type from schema
export type UserInput = z.infer<typeof userSchema>;`} />
      </div>

      {/* API Route Validation */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">API_ROUTE_VALIDATION</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Validate request bodies in API routes:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/app/api/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["user", "admin"]).default("user"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = createUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // result.data is fully typed
    const { email, name, role } = result.data;

    // Create user with validated data
    // ...

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}`} />
      </div>

      {/* Common Validation Patterns */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">COMMON_VALIDATION_PATTERNS</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Reusable validation patterns for common fields:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/validations/common.ts

import { z } from "zod";

// Email validation
export const emailSchema = z
  .string()
  .email("Invalid email")
  .toLowerCase()
  .trim();

// Password with strength requirements
export const passwordSchema = z
  .string()
  .min(8, "Minimum 8 characters")
  .max(128, "Maximum 128 characters")
  .regex(/[a-z]/, "Must contain lowercase letter")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[^a-zA-Z0-9]/, "Must contain special character");

// UUID validation
export const uuidSchema = z.string().uuid("Invalid ID format");

// URL validation
export const urlSchema = z.string().url("Invalid URL").optional();

// Phone number (basic)
export const phoneSchema = z
  .string()
  .regex(/^\\+?[1-9]\\d{1,14}$/, "Invalid phone number");

// Date validation
export const dateSchema = z.coerce.date();

// Pagination
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Sort order
export const sortSchema = z.object({
  sortBy: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
});`} />
      </div>

      {/* Form Validation */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">FORM_VALIDATION</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Use schemas with react-hook-form:
          </p>
        </div>
        <CodeBlock language="tsx" code={`"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    // data is fully validated and typed
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("name")} placeholder="Name" />
        {errors.name && (
          <p className="text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea {...register("message")} placeholder="Message" />
        {errors.message && (
          <p className="text-destructive">{errors.message.message}</p>
        )}
      </div>

      <button type="submit">Send</button>
    </form>
  );
}`} />
      </div>

      {/* Query Parameter Validation */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">QUERY_PARAMETER_VALIDATION</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Validate URL search params:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/app/api/items/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  status: z.enum(["active", "inactive", "all"]).default("all"),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Convert searchParams to object
  const params = Object.fromEntries(searchParams.entries());

  // Validate
  const result = querySchema.safeParse(params);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 }
    );
  }

  const { page, limit, search, status } = result.data;

  // Use validated params for database query
  // ...
}`} />
      </div>

      {/* Environment Variable Validation */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">ENVIRONMENT_VARIABLE_VALIDATION</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Validate environment variables at startup:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/env.ts

import { z } from "zod";

const envSchema = z.object({
  // Required
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),

  // Optional with defaults
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Conditional (required in production)
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_").optional(),
});

// Validate at build/startup time
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;`} />
      </div>

      {/* Custom Transformations */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">CUSTOM_TRANSFORMATIONS</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Transform and sanitize data during validation:
          </p>
        </div>
        <CodeBlock language="typescript" code={`import { z } from "zod";

const userInputSchema = z.object({
  // Trim and lowercase email
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase().trim()),

  // Sanitize name
  name: z
    .string()
    .transform((val) => val.trim().replace(/\\s+/g, " ")),

  // Parse JSON string
  metadata: z
    .string()
    .transform((val, ctx) => {
      try {
        return JSON.parse(val);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid JSON",
        });
        return z.NEVER;
      }
    }),

  // Convert string to array
  tags: z
    .string()
    .transform((val) => val.split(",").map((s) => s.trim())),
});`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/security/audit-logging">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-semibold">Audit Logging</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Track all security-relevant events
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/api-routes">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-semibold">API Routes</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Build secure API endpoints
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
