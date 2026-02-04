/**
 * Blog Post Detail Page
 * Uses Outstatic directly (same as indx)
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getDocumentBySlug, getDocumentSlugs } from 'outstatic/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { generateBlogPostSchema } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface BlogPost {
  title: string;
  description?: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  author?: { name?: string; picture?: string };
  category?: string;
  status?: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content?.split(/\s+/).length || 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function generateStaticParams() {
  const slugs = getDocumentSlugs('posts');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getDocumentBySlug('posts', slug, [
    'title',
    'description',
    'coverImage',
    'publishedAt',
    'author',
    'status',
  ]);

  if (!post || post.status === 'draft') {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Fabrk Blog`,
    description: post.description || undefined,
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: 'article',
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      authors: [post.author?.name || 'Fabrk'],
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getDocumentBySlug('posts', slug, [
    'title',
    'description',
    'content',
    'coverImage',
    'publishedAt',
    'author',
    'category',
    'status',
  ]) as BlogPost | null;

  if (!post || post.status === 'draft') {
    notFound();
  }

  // Generate JSON-LD structured data for SEO
  const blogPostSchema = generateBlogPostSchema({
    title: post.title,
    description: post.description || '',
    slug: slug,
    publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
    author: post.author?.name ? { name: post.author.name } : undefined,
    image: post.coverImage || undefined,
  });

  return (
    <div className="bg-background min-h-screen">
      {/* SEO: BlogPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/blog" className="text-muted-foreground hover:text-primary font-mono text-xs">
            &lt;- BACK TO BLOG
          </Link>
        </div>

        {/* Header */}
        <header className={cn("border-border bg-card mb-8 border", mode.radius)}>
          <div className="border-border border-b px-6 py-2">
            <span className="text-muted-foreground font-mono text-xs">[ ARTICLE ]</span>
          </div>
          <div className="p-6">
            {/* Category */}
            {post.category && (
              <Link
                href={`/blog?category=${String(post.category).toLowerCase().replace(/\s+/g, '-')}`}
                className={cn("border-primary text-primary hover:bg-primary hover:text-primary-foreground mb-4 inline-block border px-2 py-1 font-mono text-xs", mode.radius)}
              >
                {String(post.category).toUpperCase()}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-foreground mb-4 font-mono text-2xl font-semibold md:text-4xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                {post.author?.picture && (
                  <Image
                    src={post.author.picture}
                    alt={`${post.author.name || 'Author'} avatar`}
                    width={24}
                    height={24}
                    className={cn('h-6 w-6', mode.radius)}
                  />
                )}
                <span>{post.author?.name || 'Fabrk Team'}</span>
              </div>
              <span>|</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>|</span>
              <span>{calculateReadingTime(post.content)}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.coverImage && (
          <div className={cn("border-border relative mb-8 aspect-video overflow-hidden border", mode.radius)}>
            <Image
              src={post.coverImage}
              alt={`Featured image for ${post.title}`}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content - MDX Rendered */}
        <div className={cn("border-border bg-card border p-6 md:p-8", mode.radius)}>
          <div className="prose prose-invert max-w-none font-mono">
            <MDXRemote source={post.content} />
          </div>
        </div>

        {/* Footer */}
        <div className={cn("border-border bg-card mt-8 flex items-center justify-between border p-4", mode.radius)}>
          <Link href="/blog" className="text-muted-foreground hover:text-primary font-mono text-xs">
            &lt;- ALL POSTS
          </Link>
          <div className="text-muted-foreground font-mono text-xs">
            Published: {formatDate(post.publishedAt)}
          </div>
        </div>
      </article>
    </div>
  );
}
