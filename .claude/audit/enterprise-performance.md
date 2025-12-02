# Enterprise: Performance

React performance patterns and optimization strategies.

---

## React.memo for Lists

```tsx
import { memo } from "react";

interface ItemProps {
  id: string;
  title: string;
  onDelete: (id: string) => void;
}

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

---

## useCallback for Handlers

```tsx
import { useCallback } from "react";

export function ItemList({ items }: { items: Item[] }) {
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

---

## useMemo for Computations

```tsx
import { useMemo } from "react";

export function DataTable({ data, filter }: Props) {
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

---

## Dynamic Imports

```tsx
import dynamic from "next/dynamic";

const HeavyEditor = dynamic(() => import("@/components/editor"), {
  loading: () => <Skeleton className="h-[500px]" />,
  ssr: false,
});
```

---

## Form Handling

### React Hook Form

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

### Protected API

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

  return NextResponse.json({ data: "Protected data" });
}
```

---

## Checklist

- [ ] List items wrapped in memo
- [ ] Handlers use useCallback
- [ ] Expensive computations use useMemo
- [ ] Heavy components use dynamic imports
- [ ] Images use next/image
- [ ] Protected routes check auth
- [ ] API routes validate input
- [ ] No secrets in client code
