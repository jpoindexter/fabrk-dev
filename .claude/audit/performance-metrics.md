# Performance Metrics Audit

Core Web Vitals and bundle analysis for production applications.

---

## Quick Reference

| Metric | Target | Severity |
|--------|--------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | CRITICAL |
| CLS (Cumulative Layout Shift) | < 0.1 | CRITICAL |
| INP (Interaction to Next Paint) | < 200ms | HIGH |
| FCP (First Contentful Paint) | < 1.8s | HIGH |
| TTFB (Time to First Byte) | < 800ms | HIGH |
| Bundle Size (main) | < 200KB | HIGH |

---

## Core Web Vitals Thresholds

### LCP - Largest Contentful Paint

| Score | Rating | Action |
|-------|--------|--------|
| < 2.5s | Good | No action |
| 2.5s - 4s | Needs Improvement | Optimize |
| > 4s | Poor | Critical fix |

**Common Fixes:**
- Preload hero images with `priority` prop
- Use `next/image` for optimization
- Reduce server response time
- Remove render-blocking resources

### CLS - Cumulative Layout Shift

| Score | Rating | Action |
|-------|--------|--------|
| < 0.1 | Good | No action |
| 0.1 - 0.25 | Needs Improvement | Optimize |
| > 0.25 | Poor | Critical fix |

**Common Fixes:**
- Always set width/height on images
- Use skeleton placeholders
- Reserve space for dynamic content
- Avoid inserting content above existing content

### INP - Interaction to Next Paint

| Score | Rating | Action |
|-------|--------|--------|
| < 200ms | Good | No action |
| 200ms - 500ms | Needs Improvement | Optimize |
| > 500ms | Poor | Critical fix |

**Common Fixes:**
- Break up long tasks
- Use `useTransition` for non-urgent updates
- Debounce rapid user input
- Optimize event handlers

---

## Bundle Analysis

### Size Budgets

| Bundle | Max Size | Notes |
|--------|----------|-------|
| First Load JS | < 200KB | Critical for performance |
| Per-route JS | < 100KB | After code splitting |
| Third-party | < 100KB | Combined total |
| CSS | < 50KB | After purging |

### Check Bundle Size

```bash
# Build with analysis
ANALYZE=true npm run build

# Check first load JS
npm run build 2>&1 | grep "First Load JS"

# List largest chunks
du -sh .next/static/chunks/* | sort -hr | head -10
```

### Code Splitting

```typescript
// ✅ CORRECT - Dynamic import for heavy components
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <ChartSkeleton />,
  ssr: false, // If client-only
});

// ✅ CORRECT - Route-based splitting (automatic in App Router)
// src/app/dashboard/page.tsx - Only loaded when visiting /dashboard

// ❌ WRONG - Importing heavy library at top level
import { Chart } from "chart.js/auto"; // Entire library imported
```

---

## Image Optimization

### Requirements

```typescript
// ✅ CORRECT - Optimized image
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority // Above the fold
  sizes="(max-width: 768px) 100vw, 50vw"
  placeholder="blur"
/>

// ✅ CORRECT - Lazy load below fold
<Image
  src="/feature.jpg"
  alt="Description"
  width={600}
  height={400}
  loading="lazy" // Default
/>
```

### Image Checklist

- [ ] All images use `next/image`
- [ ] Hero images have `priority`
- [ ] All images have `alt` text
- [ ] Responsive images have `sizes`
- [ ] Large images have `placeholder="blur"`

---

## Third-Party Scripts

### Load Scripts Properly

```typescript
// ✅ CORRECT - Defer non-critical scripts
import Script from "next/script";

<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload" // Load after page interactive
/>

// ✅ CORRECT - Worker for heavy scripts
<Script
  src="https://heavy-script.com/script.js"
  strategy="worker" // Run in web worker
/>

// ❌ WRONG - Blocking script
<script src="https://analytics.example.com/script.js" />
```

### Script Strategies

| Strategy | When to Use |
|----------|-------------|
| `beforeInteractive` | Critical scripts (auth, error tracking) |
| `afterInteractive` | Analytics, chat widgets |
| `lazyOnload` | Non-essential scripts |
| `worker` | Heavy computation scripts |

---

## React Optimization

### Memoization

```typescript
// ✅ CORRECT - Memoize expensive components
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(item => <ExpensiveItem key={item.id} {...item} />);
});

// ✅ CORRECT - Memoize expensive computations
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// ✅ CORRECT - Stable callback references
const handleClick = useCallback((id) => {
  setSelected(id);
}, []);
```

### Transitions

```typescript
// ✅ CORRECT - Non-urgent updates
import { useTransition } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value); // Urgent - update input immediately

    startTransition(() => {
      setResults(filterResults(e.target.value)); // Non-urgent
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <Spinner /> : <ResultsList results={results} />}
    </>
  );
}
```

---

## Detection Commands

```bash
# Check bundle sizes
npm run build 2>&1 | grep -E "First Load|─"

# Find large dependencies
npx depcheck --json | jq '.missing'

# Find unused exports
npx unimported

# Lighthouse audit
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse.html

# Check for dynamic imports
grep -rE "dynamic\(|import\(" src --include="*.tsx" | head -20
```

---

## Checklist

### Before Release:

- [ ] Lighthouse Performance score > 90
- [ ] LCP < 2.5s on mobile
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] First Load JS < 200KB
- [ ] No layout shift from images
- [ ] Third-party scripts lazy loaded
- [ ] Heavy components code-split

### Every Component:

- [ ] No unnecessary re-renders
- [ ] Expensive computations memoized
- [ ] Event handlers stable (useCallback)
- [ ] Lists have stable keys

---

## Common Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| Large bundle | Slow load | Code split, tree shake |
| No image dimensions | CLS | Add width/height |
| Blocking scripts | Slow LCP | Use next/script |
| Unmemoized lists | Slow INP | Add memo, useCallback |
| Client-side fetch | Slow LCP | Server-side fetch |
