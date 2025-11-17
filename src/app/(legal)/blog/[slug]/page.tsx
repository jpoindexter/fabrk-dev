/**
 * Blog Post Page
 * Individual blog post with MDX rendering
 */

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Fabrk Blog",
    };
  }

  return {
    title: `${post.title} | Fabrk Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Estimate reading time (average 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero Image */}
        {post.image && (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg border-2 border-border">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Metadata */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge variant="secondary">{post.category}</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="mb-8 text-xl text-muted-foreground">{post.excerpt}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Divider */}
        <hr className="mb-8 border-border" />

        {/* MDX Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* Divider */}
        <hr className="my-12 border-border" />

        {/* CTA */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="pt-6 text-center">
            <h3 className="mb-3 text-2xl font-bold">Ready to Build Your SaaS?</h3>
            <p className="mb-6 text-muted-foreground">
              Get Fabrk and launch your SaaS 10x faster with 100 components,
              authentication, payments, and more.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/#pricing">Get Started Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">Read More Posts</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
