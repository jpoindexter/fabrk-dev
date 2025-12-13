# Enterprise: Data Fetching

Server-side and client-side data fetching patterns.

---

## Server-Side Fetching (Preferred)

```tsx
// Server Component - no loading needed
async function getData() {
  const res = await fetch("https://api.example.com/data", {
    next: { revalidate: 60 },  // Cache 60 seconds
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

---

## Client-Side Fetching

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

---

## API Route Patterns

### GET Handler

```tsx
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
```

### POST Handler

```tsx
export async function POST(request: Request) {
  try {
    const body = await request.json();

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

## Server Actions

### Action Definition

```tsx
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

### Using Server Action

```tsx
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

    addOptimisticTodo(optimisticTodo);

    try {
      const realTodo = await createTodo(title);
      setTodos((prev) => [...prev, realTodo]);
    } catch (error) {
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

## Checklist

- [ ] Server-side fetch has error handling
- [ ] Client-side fetch has loading/error states
- [ ] API routes return proper status codes
- [ ] Server actions validate input
- [ ] Optimistic updates have rollback
