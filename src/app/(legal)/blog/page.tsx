/**
 * Blog Listing Page
 * Shows all blog posts with filtering
 */

import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { getAllPosts, getAllCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Guides, Tutorials & Updates | Fabrk",
  description:
    "Read the latest guides, tutorials, and product updates from the Fabrk team. Learn how to build better SaaS applications faster.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="mb-4 text-5xl font-bold tracking-tight">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Guides, tutorials, and updates from the Fabrk team
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {posts.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    No blog posts yet. Check back soon!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <Card key={post.slug} className="overflow-hidden">
                    {post.image && (
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block hover:underline"
                      >
                        <h2 className="text-2xl font-bold">{post.title}</h2>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                      {post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              {categories.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Categories</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Newsletter CTA */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <h3 className="font-semibold">Stay Updated</h3>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Get the latest posts and updates delivered to your inbox.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/#pricing">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* About */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">About Fabrk</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Fabrk is a premium Next.js 15 SaaS boilerplate with 100
                    components, authentication, payments, and everything you need to
                    launch faster.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
