# Next.js 15 Patterns Audit

Best practices for Next.js 15 App Router applications.

---

## Quick Reference

| Check | Severity | Pattern |
|-------|----------|---------|
| Overuse of "use client" | HIGH | Should minimize client components |
| Raw `<img>` tags | HIGH | Use `next/image` for optimization |
| Missing Suspense fallback | MEDIUM | Suspense without fallback prop |
| Hydration mismatch | CRITICAL | Date/random values differ server/client |
| Client fetch in Server Component | HIGH | Should fetch on server |

---

## Server vs Client Components

### Default to Server Components

```typescript
// ✅ CORRECT - Server Component (default)
// src/app/dashboard/page.tsx
async function DashboardPage() {
  const data = await fetchData(); // Server-side fetch
  return <Dashboard data={data} />;
}

// ✅ CORRECT - Minimal client boundary
// src/app/dashboard/components/interactive-chart.tsx
"use client";

import { useState } from "react";

export function InteractiveChart({ data }) {
  const [selected, setSelected] = useState(null);
  // Only this component is client-side
}

// ❌ WRONG - Entire page is client
"use client"; // At top of page.tsx

export default function DashboardPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/data").then(setData); // Should be server fetch
  }, []);
}
```

### When to Use "use client"

| Use Case | Client? | Reason |
|----------|---------|--------|
| useState, useEffect | Yes | React hooks |
| onClick, onChange | Yes | Event handlers |
| Browser APIs | Yes | window, localStorage |
| Static content | No | Can render on server |
| Data fetching | No | Fetch on server |
| Metadata | No | Must be server |

---

## Image Optimization

### Always Use next/image

```typescript
// ✅ CORRECT - Optimized image
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Hero section background"
  width={1200}
  height={600}
  priority // Above the fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// ✅ CORRECT - Fill container
<div className="relative h-64 w-full">
  <Image
    src="/cover.jpg"
    alt="Cover image"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>

// ❌ WRONG - Raw img tag
<img src="/hero.jpg" alt="Hero" />

// ❌ WRONG - Missing sizes for responsive
<Image src="/hero.jpg" alt="Hero" fill />
```

### Image Props Checklist

| Prop | Required | When |
|------|----------|------|
| `alt` | Always | Accessibility |
| `width` + `height` | Yes | Unless using `fill` |
| `priority` | Yes | Above-the-fold images |
| `sizes` | Yes | When using `fill` |
| `placeholder` | Recommended | Prevent layout shift |

---

## Suspense Boundaries

### Always Provide Fallback

```typescript
// ✅ CORRECT - With fallback
import { Suspense } from "react";
import { UserListSkeleton } from "./skeletons";

export default function UsersPage() {
  return (
    <Suspense fallback={<UserListSkeleton />}>
      <UserList />
    </Suspense>
  );
}

// ✅ CORRECT - Nested suspense for granular loading
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<ContentSkeleton />}>
    <MainContent />
  </Suspense>
  <Suspense fallback={<SidebarSkeleton />}>
    <Sidebar />
  </Suspense>
</Suspense>

// ❌ WRONG - No fallback
<Suspense>
  <UserList />
</Suspense>

// ❌ WRONG - Generic fallback
<Suspense fallback={<div>Loading...</div>}>
  <UserList />
</Suspense>
```

---

## Hydration Issues

### Avoid Mismatches

```typescript
// ❌ WRONG - Different on server vs client
function Greeting() {
  return <p>Time: {new Date().toLocaleString()}</p>; // Mismatch!
}

// ✅ CORRECT - Suppress hydration or use client
function Greeting() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(new Date().toLocaleString());
  }, []);

  return <p>Time: {time}</p>;
}

// ❌ WRONG - Random values
function RandomBadge() {
  return <span>{Math.random()}</span>; // Different each render!
}

// ✅ CORRECT - Generate on client or seed
function RandomBadge() {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    setValue(Math.random());
  }, []);

  if (value === null) return null;
  return <span>{value}</span>;
}
```

### Common Hydration Causes

| Cause | Fix |
|-------|-----|
| Date/time | Format on client with useEffect |
| Math.random() | Generate on client |
| localStorage | Check window exists first |
| Browser-only APIs | Use dynamic import |
| Third-party scripts | Load with next/script |

---

## Data Fetching

### Fetch on Server When Possible

```typescript
// ✅ CORRECT - Server Component fetch
// src/app/users/page.tsx
async function UsersPage() {
  const users = await prisma.user.findMany();
  return <UserList users={users} />;
}

// ✅ CORRECT - With caching
async function getUsers() {
  const res = await fetch("https://api.example.com/users", {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  return res.json();
}

// ❌ WRONG - Client-side fetch for static data
"use client";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(setUsers);
  }, []);

  return <UserList users={users} />;
}
```

---

## Route Handlers

### API Route Best Practices

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    // ✅ CORRECT - Don't leak errors in production
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// ❌ WRONG - Leaking error details
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, stack: error.stack }, // Security risk!
      { status: 500 }
    );
  }
}
```

---

## Detection Patterns

```bash
# Overuse of "use client" (should be minimal)
grep -r '"use client"' src/app --include="*.tsx" | wc -l

# Raw img tags (should use next/image)
grep -rE '<img[^>]*src=' src --include="*.tsx"

# Suspense without fallback
grep -rE '<Suspense>' src --include="*.tsx" | grep -v 'fallback='

# Hydration risks - Date without useEffect
grep -rE 'new Date\(\)' src --include="*.tsx" | grep -v "useEffect\|useState"

# Hydration risks - Math.random in render
grep -rE 'Math\.random\(\)' src --include="*.tsx" | grep -v "useEffect\|useState"

# Client fetch that could be server
grep -rE "useEffect.*fetch\(" src/app --include="*.tsx"
```

---

## Checklist

### Every Page Should:

- [ ] Be a Server Component unless interactivity needed
- [ ] Fetch data on server when possible
- [ ] Have metadata export for SEO
- [ ] Use next/image for all images
- [ ] Have Suspense boundaries with skeleton fallbacks

### Every Client Component Should:

- [ ] Be as small as possible (push "use client" down)
- [ ] Handle hydration safely (dates, random values)
- [ ] Clean up side effects

### Every API Route Should:

- [ ] Not leak error details in production
- [ ] Validate input data
- [ ] Return appropriate status codes
- [ ] Handle authentication

---

## Common Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| "use client" on page | Larger bundle | Move to child components |
| Raw `<img>` | No optimization | Use next/image |
| No Suspense fallback | Blank during load | Add skeleton fallback |
| Date hydration | Console errors | Format on client |
| Client data fetch | Slower, no cache | Fetch on server |
