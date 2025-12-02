# SEO & Metadata Audit

Patterns for search engine optimization and social media sharing.

---

## Quick Reference

| Check | Severity | Pattern |
|-------|----------|---------|
| Missing metadata export | CRITICAL | Page without `metadata` or `generateMetadata` |
| Missing Open Graph | HIGH | No `openGraph` in metadata |
| Missing canonical URL | HIGH | No canonical in metadata |
| Raw `<img>` tags | HIGH | Should use `next/image` |
| Missing JSON-LD | MEDIUM | No structured data on key pages |

---

## Required Metadata Structure

### Static Metadata (Most Pages)

```typescript
// src/app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Fabrk",
  description: "Learn about Fabrk - the terminal-first SaaS boilerplate.",
  openGraph: {
    title: "About Us | Fabrk",
    description: "Learn about Fabrk - the terminal-first SaaS boilerplate.",
    url: "https://fabrk.dev/about",
    siteName: "Fabrk",
    images: [
      {
        url: "https://fabrk.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fabrk - Terminal-first SaaS Boilerplate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Fabrk",
    description: "Learn about Fabrk - the terminal-first SaaS boilerplate.",
    images: ["https://fabrk.dev/og-image.png"],
  },
  alternates: {
    canonical: "https://fabrk.dev/about",
  },
};
```

### Dynamic Metadata (Blog, Products, Users)

```typescript
// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `${post.title} | Fabrk Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://fabrk.dev/blog/${params.slug}`,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    alternates: {
      canonical: `https://fabrk.dev/blog/${params.slug}`,
    },
  };
}
```

---

## JSON-LD Structured Data

### Organization (Homepage)

```typescript
// src/app/page.tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fabrk",
  url: "https://fabrk.dev",
  logo: "https://fabrk.dev/logo.png",
  sameAs: [
    "https://twitter.com/fabrk",
    "https://github.com/fabrk",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

### Product (Pricing Page)

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Fabrk Pro",
  description: "Professional SaaS boilerplate with all features",
  offers: {
    "@type": "Offer",
    price: "199",
    priceCurrency: "USD",
  },
};
```

### Article (Blog Posts)

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  image: post.coverImage,
  author: {
    "@type": "Person",
    name: post.author.name,
  },
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
};
```

---

## Detection Patterns

```bash
# Find pages without metadata export
find src/app -name "page.tsx" -exec grep -L "export const metadata\|export async function generateMetadata" {} \;

# Find pages without Open Graph
grep -rL "openGraph" src/app/**/page.tsx

# Find raw img tags (should use next/image)
grep -rE '<img[^>]*src=' src --include="*.tsx" | grep -v "next/image"

# Find missing canonical URLs
grep -rL "alternates:" src/app/**/page.tsx | grep -v "layout\|template\|error\|loading"
```

---

## Checklist

### Every Public Page Must Have:

- [ ] `title` - Unique, descriptive, 50-60 chars
- [ ] `description` - Compelling, 150-160 chars
- [ ] `openGraph.title` - Same or slightly different from title
- [ ] `openGraph.description` - Same as description
- [ ] `openGraph.image` - 1200x630px recommended
- [ ] `openGraph.url` - Full canonical URL
- [ ] `twitter.card` - `summary_large_image` for most pages
- [ ] `alternates.canonical` - Prevent duplicate content

### Homepage Must Have:

- [ ] Organization JSON-LD
- [ ] All social links in sameAs

### Blog Posts Must Have:

- [ ] Article JSON-LD
- [ ] `publishedTime` and `modifiedTime`
- [ ] Author information

### Product Pages Must Have:

- [ ] Product JSON-LD
- [ ] Price and currency
- [ ] Availability status

---

## Image Optimization

### Always Use next/image

```typescript
// ✅ CORRECT
import Image from "next/image";

<Image
  src="/hero.png"
  alt="Hero image description"
  width={1200}
  height={630}
  priority // For above-the-fold images
/>

// ❌ WRONG
<img src="/hero.png" alt="Hero" />
```

### Image Requirements

| Context | Format | Size | Priority |
|---------|--------|------|----------|
| OG Image | PNG/JPG | 1200x630 | - |
| Hero | WebP | Responsive | `priority` |
| Thumbnails | WebP | Fixed | Lazy |
| Icons | SVG | - | Inline |

---

## robots.txt

```txt
# /public/robots.txt
User-agent: *
Allow: /

# Block admin/private areas
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/

Sitemap: https://fabrk.dev/sitemap.xml
```

---

## sitemap.xml

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fabrk.dev";

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/pricing",
    "/contact",
    "/docs",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic pages (fetch from DB)
  // const posts = await getPosts();
  // const blogPages = posts.map(...)

  return [...staticPages];
}
```

---

## Common Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| Duplicate titles | SEO penalty | Make each title unique |
| Missing OG image | Poor social sharing | Add 1200x630 image |
| No canonical | Duplicate content | Add alternates.canonical |
| Raw img tags | Poor performance | Use next/image |
| Missing alt text | Accessibility + SEO | Add descriptive alt |
