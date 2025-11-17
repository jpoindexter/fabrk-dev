# Blog System

Fabrk includes a complete blog system with MDX support for writing rich content.

## Installation

The blog system requires two additional dependencies:

```bash
npm install gray-matter next-mdx-remote
```

## Directory Structure

```
src/content/blog/
├── README.md                     # This file
├── welcome-to-fabrk.mdx          # Sample post
└── 5-features-every-saas-needs.mdx  # Sample post
```

## Creating a Blog Post

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter metadata at the top
3. Write your content using Markdown/MDX

### Example Post

```mdx
---
title: "Your Post Title"
excerpt: "A brief description of your post"
author: "Your Name"
date: "2025-11-17"
category: "Guides"
tags: ["nextjs", "saas", "tutorial"]
image: "/images/blog/your-image.jpg"
---

# Your Post Title

Your content here...

## Subheading

More content with **bold** and *italic* text.

- Bullet points
- Work great

```typescript
// Code blocks are supported
const example = "hello world";
```
```

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title (used in SEO and display) |
| `excerpt` | Yes | Brief summary (shown in listings) |
| `author` | No | Author name (defaults to "Anonymous") |
| `date` | Yes | Publication date (YYYY-MM-DD format) |
| `category` | No | Category (defaults to "Uncategorized") |
| `tags` | No | Array of tags for filtering |
| `image` | No | Featured image URL |

## Pages

### Blog Listing
- **URL:** `/blog`
- **File:** `src/app/(legal)/blog/page.tsx`
- Shows all blog posts with filtering
- Sidebar with categories
- Newsletter CTA

### Individual Post
- **URL:** `/blog/[slug]`
- **File:** `src/app/(legal)/blog/[slug]/page.tsx`
- Full post with MDX rendering
- Reading time estimate
- Related posts (coming soon)

## Utilities

The blog system includes utility functions in `src/lib/blog.ts`:

- `getAllPosts()` - Get all posts sorted by date
- `getPostBySlug(slug)` - Get single post by slug
- `getAllCategories()` - Get unique categories
- `getAllTags()` - Get unique tags
- `getPostsByCategory(category)` - Filter by category
- `getPostsByTag(tag)` - Filter by tag

## Styling

Blog posts use Tailwind's typography plugin:

```tsx
<div className="prose prose-slate dark:prose-invert max-w-none">
  <MDXRemote source={post.content} />
</div>
```

This provides beautiful typography for:
- Headings
- Paragraphs
- Links
- Lists
- Code blocks
- Blockquotes
- Tables

## SEO

Each blog post automatically generates:
- Meta title and description
- Open Graph tags
- Reading time
- Structured data (coming soon)

## Deployment

The blog system uses static generation (SSG) for optimal performance:

1. Posts are read from the filesystem at build time
2. All pages are pre-rendered
3. No database required
4. Lightning-fast page loads

## Next Steps

1. Replace sample posts with your own content
2. Add your blog images to `/public/images/blog/`
3. Customize the blog listing and post templates
4. Add RSS feed support (optional)
5. Implement search functionality (optional)

## Support

Need help with the blog system? Check the main documentation or reach out to support.
