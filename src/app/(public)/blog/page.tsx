/**
 * Blog Listing Page
 * Uses Outstatic getDocuments directly (same as indx)
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getDocuments } from 'outstatic/server';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | Fabrk',
  description: 'Latest articles, tutorials, and updates from Fabrk',
};

interface BlogPost {
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  author: { name: string };
  coverImage?: string;
  status: string;
  category?: string;
  featured?: boolean;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category;

  // Get posts directly from Outstatic
  const allPosts = getDocuments('posts', [
    'title',
    'slug',
    'description',
    'content',
    'publishedAt',
    'author',
    'coverImage',
    'status',
    'category',
    'featured',
  ]).filter((post) => post.status === 'published') as BlogPost[];

  // Sort by date descending
  allPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Filter by category if provided
  const posts = categorySlug
    ? allPosts.filter(p => p.category?.toLowerCase().replace(/\s+/g, '-') === categorySlug)
    : allPosts;

  // Get categories from posts
  const categoryMap = new Map<string, number>();
  allPosts.forEach(post => {
    if (post.category) {
      const slug = post.category.toLowerCase().replace(/\s+/g, '-');
      categoryMap.set(slug, (categoryMap.get(slug) || 0) + 1);
    }
  });

  const categories = Array.from(categoryMap.entries()).map(([slug, count]) => ({
    id: slug,
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug,
    _count: { posts: count },
  }));

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  // Format helpers
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const formatReadTime = (content: string) => {
    const words = content?.split(/\s+/).length || 0;
    return `${Math.ceil(words / 200)} min read`;
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className={cn("border-border bg-card mb-12 border", mode.radius)}>
          <div className="border-border border-b px-6 py-2">
            <span className="text-muted-foreground font-mono text-xs">[ BLOG ]</span>
          </div>
          <div className="p-6">
            <h1 className="text-foreground mb-2 font-mono text-4xl font-semibold">
              &gt; LATEST POSTS
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              Articles, tutorials, and updates
            </p>
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={cn(`border px-4 py-1 font-mono text-xs transition-colors ${
                  !categorySlug
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                }`, !categorySlug ? mode.radius : cn(mode.state.hover.card, mode.radius))}
              >
                ALL ({allPosts.length})
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className={cn(`border px-4 py-1 font-mono text-xs transition-colors ${
                    categorySlug === cat.slug
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground'
                  }`, categorySlug === cat.slug ? mode.radius : cn(mode.state.hover.card, mode.radius))}
                >
                  {cat.name.toUpperCase()} ({cat._count.posts})
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && !categorySlug && (
          <div className="mb-12">
            <h2 className="text-muted-foreground mb-4 font-mono text-xs">[ FEATURED ]</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={cn('group border-border bg-card border transition-all', mode.state.hover.card, mode.radius)}
                >
                  {post.coverImage && (
                    <div className="border-border relative aspect-video overflow-hidden border-b">
                      <Image
                        src={post.coverImage}
                        alt={`Featured image for ${post.title}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-muted-foreground mb-2 flex items-center gap-2 font-mono text-xs">
                      {post.category && (
                        <span className="text-primary">[{post.category.toUpperCase()}]</span>
                      )}
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{formatReadTime(post.content)}</span>
                    </div>
                    <h3 className="text-foreground group-hover:text-primary mb-2 font-mono text-sm font-semibold">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-muted-foreground font-mono text-sm">{post.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        {regularPosts.length > 0 ? (
          <div>
            <h2 className="text-muted-foreground mb-4 font-mono text-xs">[ ALL POSTS ]</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={cn('group border-border bg-card border p-4 transition-all', mode.state.hover.card, mode.radius)}
                >
                  <div className="text-muted-foreground mb-2 flex items-center gap-2 font-mono text-xs">
                    {post.category && (
                      <span className="text-primary">[{post.category.toUpperCase()}]</span>
                    )}
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-2 font-mono text-sm font-semibold">
                    {post.title}
                  </h3>
                  <div className="text-muted-foreground font-mono text-xs">
                    {formatReadTime(post.content)} • {post.author?.name || 'Fabrk Team'}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className={cn("border-border bg-card border p-12 text-center", mode.radius)}>
            <p className="text-muted-foreground font-mono">No posts found</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
