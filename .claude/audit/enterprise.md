# Enterprise Patterns

Production-ready patterns for error handling, loading states, data fetching, and performance.

---

## Error Boundaries

### Route Error Handling

Every route group SHOULD have:

```
src/app/
├── (main)/
│   ├── error.tsx      ← Error boundary
│   ├── loading.tsx    ← Loading state
│   ├── not-found.tsx  ← 404 state
│   └── page.tsx
```

### Error.tsx Pattern

```tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="font-mono text-xs text-muted-foreground">
        [ERROR]: Something went wrong
      </div>
      <p className="font-mono text-sm text-destructive">
        {error.message || "An unexpected error occurred"}
      </p>
      <Button onClick={reset} className="rounded-none font-mono text-xs">
        > TRY_AGAIN
      </Button>
    </div>
  );
}
```

### Global Error Boundary

```tsx
// src/app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-mono text-lg">[CRITICAL_ERROR]</h1>
            <Button onClick={reset}>> RELOAD</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
```

---

## Loading States

### Loading.tsx Pattern

```tsx
// src/app/(main)/loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}
```

### Skeleton Loading

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="border border-border rounded-none p-4 space-y-4">
      <Skeleton className="h-6 w-[150px]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border border-border rounded-none">
      <div className="border-b border-border px-4 py-2">
        <Skeleton className="h-4 w-full" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b border-border px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
```

### Button Loading State

```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      > SAVING...
    </>
  ) : (
    <>> SAVE</>
  )}
</Button>
```

---

## Suspense Boundaries

### Lazy Component Loading

```tsx
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeavyChart = lazy(() => import("@/components/charts/heavy-chart"));

export function Dashboard() {
  return (
    <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
      <HeavyChart />
    </Suspense>
  );
}
```

### Data Fetching with Suspense

```tsx
// Server Component with streaming
import { Suspense } from "react";

async function UserData() {
  const user = await fetchUser();  // This suspends
  return <div>{user.name}</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton className="h-8 w-32" />}>
        <UserData />
      </Suspense>
    </div>
  );
}
```

---

## Data Fetching

### Server-Side Fetching (Recommended)

```tsx
// Server Component - no client-side loading needed
async function getData() {
  const res = await fetch("https://api.example.com/data", {
    next: { revalidate: 60 },  // Cache for 60 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <div>{/* Render data */}</div>;
}
```

### Client-Side Fetching (When Needed)

```tsx
"use client";

import { useState, useEffect } from "react";

export function ClientData() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) return <Skeleton className="h-20 w-full" />;
  if (error) return <div className="text-destructive">[ERROR]: {error.message}</div>;
  return <div>{/* Render data */}</div>;
}
```

### API Route Error Handling

```tsx
// src/app/api/data/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchFromDatabase();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const result = await saveToDatabase(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to save data" },
      { status: 500 }
    );
  }
}
```

---

## Form Handling

### React Hook Form Pattern

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("[ERROR]: Invalid email format"),
  password: z.string().min(8, "[ERROR]: Password must be 8+ characters"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      await login(data);
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">[EMAIL]:</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          className="rounded-none"
        />
        {errors.email && (
          <p className="text-destructive font-mono text-xs" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="rounded-none">
        {isSubmitting ? "> LOADING..." : "> LOGIN"}
      </Button>
    </form>
  );
}
```

### Server Actions Pattern

```tsx
// src/app/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createItem(formData: FormData) {
  const title = formData.get("title") as string;

  if (!title) {
    return { error: "Title is required" };
  }

  try {
    await db.item.create({ data: { title } });
    revalidatePath("/items");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create item" };
  }
}
```

```tsx
// Component using server action
"use client";

import { createItem } from "./actions";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "> CREATING..." : "> CREATE"}
    </Button>
  );
}

export function CreateItemForm() {
  const [state, formAction] = useFormState(createItem, null);

  return (
    <form action={formAction} className="space-y-4">
      <Input name="title" placeholder="Item title" className="rounded-none" />
      {state?.error && (
        <p className="text-destructive font-mono text-xs">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
}
```

---

## Performance Patterns

### React.memo for List Items

```tsx
import { memo } from "react";

interface ItemProps {
  id: string;
  title: string;
  onDelete: (id: string) => void;
}

// Memoize list items to prevent unnecessary re-renders
export const ListItem = memo(function ListItem({ id, title, onDelete }: ItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <span className="font-mono text-sm">{title}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(id)}
        className="rounded-none"
      >
        > DELETE
      </Button>
    </div>
  );
});
```

### useCallback for Handlers

```tsx
import { useCallback } from "react";

export function ItemList({ items }: { items: Item[] }) {
  // Memoize handler to prevent child re-renders
  const handleDelete = useCallback((id: string) => {
    deleteItem(id);
  }, []);

  return (
    <div>
      {items.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          title={item.title}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

### useMemo for Expensive Computations

```tsx
import { useMemo } from "react";

export function DataTable({ data, filter }: Props) {
  // Memoize expensive filtering
  const filteredData = useMemo(() => {
    return data
      .filter((item) => item.name.includes(filter))
      .sort((a, b) => a.date - b.date);
  }, [data, filter]);

  return (
    <Table>
      {filteredData.map((item) => (
        <TableRow key={item.id}>{/* ... */}</TableRow>
      ))}
    </Table>
  );
}
```

### Dynamic Imports

```tsx
import dynamic from "next/dynamic";

// Load heavy component only when needed
const HeavyEditor = dynamic(() => import("@/components/editor"), {
  loading: () => <Skeleton className="h-[500px]" />,
  ssr: false,  // Disable SSR for client-only components
});
```

---

## Authentication Patterns

### Protected Route

```tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <div>Protected content for {session.user.name}</div>;
}
```

### Protected API Route

```tsx
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Protected logic here
  return NextResponse.json({ data: "Protected data" });
}
```

---

## Optimistic Updates

```tsx
"use client";

import { useState, useOptimistic } from "react";

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  async function handleAdd(title: string) {
    const tempId = `temp-${Date.now()}`;
    const optimisticTodo = { id: tempId, title, completed: false };

    // Immediately show optimistic update
    addOptimisticTodo(optimisticTodo);

    try {
      // Actually create on server
      const realTodo = await createTodo(title);
      setTodos((prev) => [...prev, realTodo]);
    } catch (error) {
      // Rollback on error
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
    }
  }

  return (
    <ul>
      {optimisticTodos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

---

## Quick Reference Checklist

### Every Route Group Should Have

- [ ] `error.tsx` - Error boundary
- [ ] `loading.tsx` - Loading state
- [ ] `not-found.tsx` - 404 state (if applicable)

### Data Fetching Checklist

- [ ] Server-side fetch has error handling
- [ ] Client-side fetch has loading/error states
- [ ] API routes return proper status codes
- [ ] Long operations have timeout handling

### Performance Checklist

- [ ] List items wrapped in `React.memo`
- [ ] Handlers passed to children use `useCallback`
- [ ] Expensive computations use `useMemo`
- [ ] Heavy components use dynamic imports
- [ ] Images use `next/image` with proper sizes

### Security Checklist

- [ ] Protected routes check auth
- [ ] API routes validate input
- [ ] No secrets in client code
- [ ] CSRF protection on mutations
