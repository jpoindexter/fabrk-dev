# Landing Page Audit - Blog Pages

**Files:**

- `/src/app/blog/page.tsx` (listing)
- `/src/app/blog/[slug]/page.tsx` (single post)

**Pattern:** NO template usage - Custom layouts with terminal styling

---

## 1. Blog Listing Page

**File:** `/src/app/blog/page.tsx`

### Architecture

```tsx
export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const categorySlug = params.category;

  const [posts, categories] = await Promise.all([
    getPublishedPosts({ categorySlug, limit: 20 }),
    getCategories(),
  ]);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        {/* Categories */}
        {/* Featured Posts */}
        {/* All Posts */}
      </div>
    </div>
  );
}
```

**Observations:**

- **Server component** (async, no "use client")
- Parallel data fetching with `Promise.all`
- Category filtering via URL params

---

### Container Layout

```tsx
<div className="bg-background min-h-screen">
  <div className="container mx-auto px-4 py-12">
```

**Differences from other pages:**

- Padding: `px-4 py-12` (vs `px-6 py-16` in legal/marketing)
- No `max-w-*` constraint (uses full container width)
- No `font-mono` on container (applied per-element)

---

### Header Pattern

```tsx
<div className="border-border bg-card mb-12 border">
  <div className="border-border border-b px-6 py-3">
    <span className="text-muted-foreground font-mono text-xs">[ BLOG ]</span>
  </div>
  <div className="p-6">
    <h1 className="text-foreground mb-2 font-mono text-3xl font-bold">&gt; LATEST_POSTS</h1>
    <p className="text-muted-foreground font-mono text-sm">Articles, tutorials, and updates</p>
  </div>
</div>
```

**Structure:**

- Border card with header bar
- Terminal prefix: `&gt;` for title
- Padding: `px-6 py-3` (header), `p-6` (body)

---

### Category Pills

```tsx
<div className="mb-8">
  <div className="flex flex-wrap gap-2">
    <Link
      href="/blog"
      className={`border px-3 py-1 font-mono text-xs transition-colors ${
        !categorySlug
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground'
      }`}
    >
      ALL ({posts.length})
    </Link>
    {/* Category pills */}
  </div>
</div>
```

**Styling:**

- Gap: `gap-2` (8px between pills)
- Padding: `px-3 py-1` (12px, 4px)
- Active state: `bg-primary text-primary-foreground`
- Hover state: `hover:border-primary hover:text-foreground`

**No rounded-none:** Pills use default border-radius ❌

---

### Featured Posts Grid

```tsx
<div className="mb-12">
  <h2 className="text-muted-foreground mb-4 font-mono text-xs">[ FEATURED ]</h2>
  <div className="grid gap-6 md:grid-cols-2">
    {featuredPosts.map((post) => (
      <Link
        href={`/blog/${post.slug}`}
        className="group border-border bg-card hover:border-primary border transition-all"
      >
        {post.featuredImage && (
          <div className="border-border relative aspect-video overflow-hidden border-b">
            <Image
              src={post.featuredImage}
              alt={`Featured image for ${post.title}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          {/* Meta */}
          {/* Title */}
          {/* Excerpt */}
        </div>
      </Link>
    ))}
  </div>
</div>
```

**Layout:**

- Grid: `md:grid-cols-2` (2 columns on desktop)
- Gap: `gap-6` (24px)
- Image: `aspect-video` (16:9 ratio)
- Hover: `group-hover:scale-105` (subtle zoom)

**Typography:**

- Meta: `text-xs font-mono text-muted-foreground`
- Category: `text-primary` (colored)
- Title: `text-lg font-mono font-bold group-hover:text-primary`
- Excerpt: `text-sm font-mono text-muted-foreground`

---

### Regular Posts Grid

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {regularPosts.map((post) => (
    <Link
      href={`/blog/${post.slug}`}
      className="group border-border bg-card hover:border-primary border p-4 transition-all"
    >
      <div className="text-muted-foreground mb-2 flex items-center gap-2 font-mono text-xs">
        {post.category && (
          <span className="text-primary">[{post.category.name.toUpperCase()}]</span>
        )}
        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
      </div>
      <h3 className="text-foreground group-hover:text-primary mb-2 font-mono text-sm font-bold">
        {post.title}
      </h3>
      <div className="text-muted-foreground font-mono text-xs">
        {formatReadTime(post.readTime || 1)} • {post.author.name || 'Anonymous'}
      </div>
    </Link>
  ))}
</div>
```

**Layout:**

- Grid: `md:grid-cols-2 lg:grid-cols-3` (responsive 3-column)
- Gap: `gap-4` (16px)
- Padding: `p-4` (16px card padding)

**Typography:**

- Category: Brackets `[CATEGORY]` in `text-primary`
- Title: `text-sm font-mono font-bold`
- Meta: `text-xs font-mono` with bullet separator `•`

---

### Empty State

```tsx
<div className="border-border bg-card border p-12 text-center">
  <p className="text-muted-foreground font-mono">No posts found</p>
</div>
```

**Padding:** `p-12` (48px) - Much larger than other cards

---

## 2. Blog Post Page

**File:** `/src/app/blog/[slug]/page.tsx`

### Architecture

```tsx
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementViewCount(post.id).catch(() => {});

  return (
    <div className="bg-background min-h-screen">
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        {/* Header */}
        {/* Featured Image */}
        {/* Content */}
        {/* Footer */}
      </article>
    </div>
  );
}
```

**Observations:**

- **Server component** (async)
- Container: `max-w-4xl` (same as legal pages)
- Padding: `px-4 py-12`
- Uses `<article>` semantic tag ✓

---

### Breadcrumb

```tsx
<div className="mb-8">
  <Link href="/blog" className="text-muted-foreground hover:text-primary font-mono text-xs">
    &lt;- BACK_TO_BLOG
  </Link>
</div>
```

**Typography:** Terminal-style arrow `&lt;-`

---

### Post Header

```tsx
<header className="border-border bg-card mb-8 border">
  <div className="border-border border-b px-6 py-3">
    <span className="text-muted-foreground font-mono text-xs">[ ARTICLE ]</span>
  </div>
  <div className="p-6">
    {/* Category Badge */}
    {post.category && (
      <Link
        href={`/blog?category=${post.category.slug}`}
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mb-4 inline-block border px-2 py-1 font-mono text-xs"
      >
        {post.category.name.toUpperCase()}
      </Link>
    )}

    {/* Title */}
    <h1 className="text-foreground mb-4 font-mono text-2xl font-bold md:text-3xl">{post.title}</h1>

    {/* Meta */}
    <div className="text-muted-foreground flex flex-wrap items-center gap-4 font-mono text-xs">
      {/* Author avatar */}
      {post.author.image && (
        <Image
          src={post.author.image}
          alt={`${post.author.name || 'Author'} avatar`}
          width={24}
          height={24}
          className="h-6 w-6 rounded-full"
        />
      )}
      <span>{post.author.name || 'Anonymous'}</span>
      <span>|</span>
      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
      <span>|</span>
      <span>{formatReadTime(post.readTime || 1)}</span>
      <span>|</span>
      <span>{post.viewCount} views</span>
    </div>
  </div>
</header>
```

**Structure:**

- Same border-card-with-header pattern as listing
- Category badge: `border-primary` with hover state
- Meta: Pipe-separated `|` with multiple data points

**Avatar:** `rounded-full` ❌ (should be `rounded-none`)

---

### Featured Image

```tsx
<div className="border-border relative mb-8 aspect-video overflow-hidden border">
  <Image
    src={post.featuredImage}
    alt={`Featured image for ${post.title}`}
    fill
    className="object-cover"
  />
</div>
```

**Layout:**

- Aspect ratio: `aspect-video` (16:9)
- Border: `border-border`
- No rounding ✓

---

### MDX Content

```tsx
<div className="border-border bg-card border p-6 md:p-8">
  <div className="max-w-none">
    <MDXRemote source={post.content} components={mdxComponents} />
  </div>
</div>
```

**Padding:**

- Mobile: `p-6` (24px)
- Desktop: `md:p-8` (32px)

**MDX Components:** From `/src/lib/blog` (not inspected)

---

### Post Footer

```tsx
<div className="border-border bg-card mt-8 flex items-center justify-between border p-4">
  <Link href="/blog" className="text-muted-foreground hover:text-primary font-mono text-xs">
    &lt;- ALL_POSTS
  </Link>
  <div className="text-muted-foreground font-mono text-xs">
    Published: {formatDate(post.publishedAt || post.createdAt)}
  </div>
</div>
```

**Layout:** Flexbox with `justify-between`

---

## Utility Functions

From `/src/lib/blog`:

- `getPublishedPosts({ categorySlug, limit })`
- `getCategories()`
- `getPostBySlug(slug)`
- `incrementViewCount(id)`
- `formatDate(date)`
- `formatReadTime(minutes)`
- `mdxComponents` (for rendering)

**Not audited** - Backend logic

---

## Design System Compliance

### ✅ GOOD

1. **Semantic colors** - All tokens used correctly
2. **Terminal typography** - `font-mono`, uppercase, terminal symbols
3. **Border cards** - Consistent header/body pattern
4. **Hover states** - Links and cards have transitions
5. **Responsive grids** - 2-col and 3-col layouts
6. **Image optimization** - Next.js Image component

### ❌ VIOLATIONS

#### 1. Rounded Pills (Category Badges)

```tsx
className={`border px-3 py-1 ...`}  // Missing rounded-none
```

**Should be:**

```tsx
className={`rounded-none border px-3 py-1 ...`}
```

#### 2. Rounded Avatar

```tsx
className = 'h-6 w-6 rounded-full'; // Should be rounded-none
```

#### 3. Container Padding Inconsistency

- Blog: `px-4 py-12`
- Legal: `px-6 py-16`
- Marketing: `px-6 sm:px-8 lg:px-12 py-16 lg:py-24`

**No standard pattern**

---

## Typography Hierarchy

### Blog Listing

- Section headers: `text-xs font-mono` (brackets)
- Post titles (featured): `text-lg font-mono font-bold`
- Post titles (regular): `text-sm font-mono font-bold`
- Meta text: `text-xs font-mono`
- Body text: `text-sm font-mono`

### Blog Post

- Page header: `text-xs font-mono` (bracket)
- Title: `text-2xl md:text-3xl font-mono font-bold`
- Meta: `text-xs font-mono`
- Content: Determined by MDX components

**Consistent scale:** xs → sm → lg → 2xl → 3xl

---

## Layout Patterns

### Grid Configurations

1. **Featured posts:** `md:grid-cols-2` (2-column)
2. **Regular posts:** `md:grid-cols-2 lg:grid-cols-3` (3-column)

### Spacing

- Section margins: `mb-8`, `mb-12`
- Card gaps: `gap-2` (pills), `gap-4` (posts), `gap-6` (featured)
- Card padding: `p-4` (small), `p-6` (medium)

### Image Patterns

- **Aspect ratio:** `aspect-video` (16:9) everywhere
- **Hover effect:** `group-hover:scale-105`
- **Border:** Always `border-border`

---

## Color Token Usage

### Backgrounds

```tsx
bg - background; // Page background
bg - card; // Card backgrounds
bg - primary; // Active pill
```

### Text

```tsx
text - foreground; // Primary text
text - muted - foreground; // Secondary text
text - primary; // Accent (category, hover)
text - primary - foreground; // On primary background
```

### Borders

```tsx
border - border; // Default borders
border - primary; // Active/hover state
```

**No hardcoded colors** ✓

---

## Animation Analysis

### Blog Listing

- **No animations** - Static server component
- **Transitions:** `transition-colors`, `transition-all`, `transition-transform`

### Blog Post

- **No animations** - Static server component
- **Image hover:** `group-hover:scale-105` (CSS transform)

**Performance:** Excellent - No client-side animation overhead

---

## Accessibility Notes

### Images

```tsx
<Image
  src={post.featuredImage}
  alt={`Featured image for ${post.title}`} // ✓ Descriptive alt
  fill
  className="object-cover"
/>
```

**Good:** Alt text includes post title context

### Links

```tsx
<Link href="/blog" className="... hover:text-primary">
```

**Good:** Hover states for visual feedback

### Semantic HTML

```tsx
<article className="...">  // ✓ Proper semantic tag for blog post
```

---

## Metadata Generation

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.seoTitle || `${post.title} | Fabrk Blog`,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name || 'Fabrk'],
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}
```

**Excellent:** Full OpenGraph support with fallbacks

---

## Comparison: Blog vs Other Pages

| Aspect            | Blog         | Marketing               | Legal           |
| ----------------- | ------------ | ----------------------- | --------------- |
| **Template**      | ✗            | ✓ MarketingPageTemplate | ✗               |
| **Client/Server** | Server       | Mix                     | Client          |
| **Container**     | `max-w-4xl`  | `max-w-7xl`             | `max-w-4xl`     |
| **Padding**       | `px-4 py-12` | `px-6 py-16 lg:py-24`   | `px-6 py-16`    |
| **Animations**    | ✗            | ✓ Framer Motion         | ✓ Framer Motion |
| **Nav/Footer**    | ✗            | ✓                       | ✗               |

**Blog pattern:** Minimal, content-focused

---

## Violations Summary

| Violation                | Location       | Fix                         |
| ------------------------ | -------------- | --------------------------- |
| **Missing rounded-none** | Category pills | Add `rounded-none` class    |
| **rounded-full avatar**  | Author avatar  | Change to `rounded-none`    |
| **Inconsistent padding** | Container      | Standardize with marketing  |
| **No nav/footer**        | Both pages     | Consider adding minimal nav |

---

## Recommendations

### 1. Fix Terminal Aesthetic Violations

```tsx
// Pills
className = 'rounded-none border px-3 py-1 ...';

// Avatar (if keeping terminal aesthetic)
className = 'h-6 w-6 rounded-none border border-border';
```

### 2. Create BlogPageTemplate

```tsx
<BlogPageTemplate title="LATEST_POSTS" description="Articles, tutorials, and updates">
  {/* Content */}
</BlogPageTemplate>
```

### 3. Standardize Container Padding

- Align with marketing pages: `px-6 sm:px-8 lg:px-12`
- Or document why blog is different

### 4. Consider Minimal Navigation

- Add breadcrumb or simple nav bar
- Help users return to main site

### 5. MDX Component Audit

- Review `mdxComponents` for terminal aesthetic
- Ensure typography consistency

---

## Metrics

### Blog Listing

- **Lines:** 158
- **Components:** 4 major sections
- **Grids:** 2 (featured + regular)
- **Server functions:** 2 (posts, categories)

### Blog Post

- **Lines:** 143
- **Components:** 4 major sections
- **Images:** 2 (featured + avatar)
- **Server functions:** 2 (getPost, incrementViews)

**Total:** 301 lines for complete blog system

---

## Next Steps

1. Fix rounded-none violations
2. Audit MDX components (`/src/lib/blog`)
3. Test responsive layouts on mobile
4. Contrast check on hover states
5. Consider adding blog to MarketingPageTemplate ecosystem
