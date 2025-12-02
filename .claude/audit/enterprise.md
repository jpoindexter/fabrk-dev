# Enterprise Patterns

Production-ready patterns for Next.js applications.

---

## Quick Reference

| Topic | File |
|-------|------|
| Error Boundaries | [`enterprise-errors.md`](enterprise-errors.md) |
| Data Fetching | [`enterprise-data.md`](enterprise-data.md) |
| Performance | [`enterprise-performance.md`](enterprise-performance.md) |

---

## Route Structure

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

## Critical Patterns

### Error Boundary

```tsx
<div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
  <div className="font-mono text-xs text-muted-foreground">
    [ERROR]: Something went wrong
  </div>
  <Button onClick={reset} className="rounded-none font-mono text-xs">
    > TRY_AGAIN
  </Button>
</div>
```

### Loading State

```tsx
<div className="flex min-h-[400px] items-center justify-center">
  <Loader2 className="h-6 w-6 animate-spin text-primary" />
</div>
```

### Server-Side Fetch

```tsx
const res = await fetch(url, { next: { revalidate: 60 } });
if (!res.ok) throw new Error("Failed to fetch");
```

### API Response

```tsx
return NextResponse.json({ error: "Message" }, { status: 500 });
```

---

## Performance Rules

```tsx
// List items: React.memo
export const ListItem = memo(function ListItem(props) { ... });

// Handlers: useCallback
const handleClick = useCallback(() => { ... }, [deps]);

// Expensive: useMemo
const filtered = useMemo(() => data.filter(...), [data, filter]);

// Heavy components: dynamic
const Editor = dynamic(() => import("./editor"), { ssr: false });
```

---

## Security Checklist

- [ ] Protected routes check auth
- [ ] API routes validate input
- [ ] No secrets in client code
- [ ] Proper status codes returned
- [ ] CSRF protection on mutations

---

## Data Fetching Checklist

- [ ] Server-side fetch has error handling
- [ ] Client-side fetch has loading/error states
- [ ] API routes return proper status codes
- [ ] Long operations have timeout handling

---

## Performance Checklist

- [ ] List items wrapped in memo
- [ ] Handlers use useCallback
- [ ] Expensive computations use useMemo
- [ ] Heavy components use dynamic imports
- [ ] Images use next/image with proper sizes
