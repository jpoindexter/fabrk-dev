# Enterprise: Error Handling

Error boundaries, loading states, and recovery patterns.

---

## Route Error Handling

Every route group SHOULD have:

```
src/app/
├── (main)/
│   ├── error.tsx      ← Error boundary
│   ├── loading.tsx    ← Loading state
│   ├── not-found.tsx  ← 404 state
│   └── page.tsx
```

---

## Error.tsx Pattern

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

---

## Global Error Boundary

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

### Button Loading

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

### Lazy Loading

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

### Data Streaming

```tsx
import { Suspense } from "react";

async function UserData() {
  const user = await fetchUser();
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

## Checklist

- [ ] Route groups have error.tsx
- [ ] Route groups have loading.tsx
- [ ] Errors show terminal-style messages
- [ ] Recovery actions available
- [ ] Lazy components wrapped in Suspense
- [ ] Loading states use skeletons
