/**
 * FABRK COMPONENT
 * Blog Post Template - Single article view
 * Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Heart,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

// Mock article data
const mockArticle = {
  id: "1",
  title: "Building Scalable APIs with Next.js 15",
  excerpt:
    "Learn how to build production-ready APIs using Next.js 15 App Router with type-safe endpoints and middleware.",
  category: { name: "Engineering", slug: "engineering" },
  author: {
    name: "Alex Chen",
    avatar: null,
    role: "Senior Engineer",
    bio: "Building tools that developers love. 10+ years in full-stack development.",
  },
  date: "Dec 1, 2024",
  readTime: "8 min read",
  views: 2847,
  likes: 156,
  comments: 23,
  content: [
    {
      type: "paragraph",
      content:
        "Next.js 15 introduces powerful new patterns for building APIs that scale. In this comprehensive guide, we'll explore the best practices for creating type-safe, performant API routes using the App Router.",
    },
    {
      type: "heading",
      content: "Getting Started",
    },
    {
      type: "paragraph",
      content:
        "Before diving in, ensure you have Next.js 15 installed. The new App Router provides a file-system based approach to API routes that makes organization intuitive.",
    },
    {
      type: "code",
      language: "bash",
      content: "npm create next-app@latest my-api --typescript",
    },
    {
      type: "heading",
      content: "Route Handlers",
    },
    {
      type: "paragraph",
      content:
        "Route Handlers are defined in route.ts files and support all HTTP methods. They provide native Request and Response objects for maximum flexibility.",
    },
    {
      type: "code",
      language: "typescript",
      content: `// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}`,
    },
    {
      type: "heading",
      content: "Type Safety with Zod",
    },
    {
      type: "paragraph",
      content:
        "Runtime validation is crucial for API reliability. Zod provides excellent TypeScript integration for validating incoming requests.",
    },
    {
      type: "code",
      language: "typescript",
      content: `import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["admin", "user"]).default("user"),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = createUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues },
      { status: 400 }
    );
  }

  // Type-safe access to validated data
  const user = await createUser(result.data);
  return NextResponse.json(user, { status: 201 });
}`,
    },
    {
      type: "heading",
      content: "Middleware & Authentication",
    },
    {
      type: "paragraph",
      content:
        "Protecting your API routes is straightforward with middleware. Here's how to implement authentication checks that run before your route handlers.",
    },
    {
      type: "code",
      language: "typescript",
      content: `// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/api/protected")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
});

export const config = {
  matcher: ["/api/:path*"],
};`,
    },
    {
      type: "heading",
      content: "Conclusion",
    },
    {
      type: "paragraph",
      content:
        "Next.js 15's API routes provide a powerful foundation for building scalable backends. Combined with TypeScript and Zod, you can create APIs that are both type-safe and maintainable. Start small, validate everything, and iterate as your needs grow.",
    },
  ],
  tags: ["Next.js", "API", "TypeScript", "Zod", "Prisma"],
};

// Related posts
const relatedPosts = [
  {
    id: "2",
    title: "Type-Safe Database Queries with Prisma",
    category: "Engineering",
    readTime: "10 min read",
  },
  {
    id: "3",
    title: "Authentication Patterns in Next.js",
    category: "Engineering",
    readTime: "12 min read",
  },
  {
    id: "4",
    title: "Rate Limiting Your API Endpoints",
    category: "Engineering",
    readTime: "6 min read",
  },
];

export default function BlogPostTemplate() {
  const [copiedCode, setCopiedCode] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(mockArticle.likes);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div>
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="border-border inline-block border px-4 py-1">
            <span className="text-muted-foreground font-mono text-xs">[TEMPLATE]: BLOG_POST</span>
          </div>
          <h1 className="font-mono text-4xl font-semibold tracking-tight">Blog Post</h1>
          <p className="text-muted-foreground font-mono text-sm">
            Individual article view with rich content support
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Back Navigation */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">navigation.tsx</span>
              </div>
              <div className="p-4">
                <Button variant="ghost" className="rounded-none font-mono text-xs" asChild>
                  <a href="/templates/blog">&lt;- BACK_TO_BLOG</a>
                </Button>
              </div>
            </div>

            {/* Article Header */}
            <article className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">article.tsx</span>
              </div>

              <div className="p-6">
                {/* Category & Meta */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="default" className="rounded-none font-mono text-xs">
                    {mockArticle.category.name.toUpperCase()}
                  </Badge>
                  <span className="text-muted-foreground font-mono text-xs">|</span>
                  <div className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
                    <Calendar className="h-3 w-3" />
                    {mockArticle.date}
                  </div>
                  <span className="text-muted-foreground font-mono text-xs">|</span>
                  <div className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
                    <Clock className="h-3 w-3" />
                    {mockArticle.readTime}
                  </div>
                  <span className="text-muted-foreground font-mono text-xs">|</span>
                  <div className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
                    <Eye className="h-3 w-3" />
                    {mockArticle.views.toLocaleString()} views
                  </div>
                </div>

                {/* Title */}
                <h2 className="mb-4 font-mono text-2xl font-bold md:text-3xl">
                  {mockArticle.title}
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-6 font-mono text-sm">
                  {mockArticle.excerpt}
                </p>

                {/* Author Info */}
                <div className="border-border flex items-center gap-4 border-t pt-4">
                  <Avatar className="border-border h-12 w-12 rounded-none border">
                    <AvatarImage src={mockArticle.author.avatar || undefined} />
                    <AvatarFallback className="rounded-none">
                      {mockArticle.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-mono text-sm font-semibold">{mockArticle.author.name}</div>
                    <div className="text-muted-foreground font-mono text-xs">
                      {mockArticle.author.role}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Featured Image */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">featured_image.tsx</span>
              </div>
              <div className="bg-muted/30 flex aspect-video items-center justify-center">
                <span className="text-muted-foreground font-mono text-xs">[FEATURED_IMAGE]</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">content.mdx</span>
              </div>

              <div className="space-y-6 p-6">
                {mockArticle.content.map((block, index) => {
                  if (block.type === "heading") {
                    return (
                      <h3
                        key={index}
                        className="border-border border-b pb-2 font-mono text-lg font-bold"
                      >
                        [{block.content.toUpperCase().replace(/ /g, "_")}]:
                      </h3>
                    );
                  }

                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={index}
                        className="text-muted-foreground font-mono text-sm leading-relaxed"
                      >
                        {block.content}
                      </p>
                    );
                  }

                  if (block.type === "code") {
                    return (
                      <div key={index} className="border-border overflow-hidden border">
                        <div className="bg-muted border-border flex items-center justify-between border-b px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-2">
                              <div className="bg-destructive/50 size-2 rounded-none" />
                              <div className="bg-warning/50 size-2 rounded-none" />
                              <div className="bg-success/50 size-2 rounded-none" />
                            </div>
                            <span className="text-muted-foreground font-mono text-xs">
                              {block.language}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyCode(block.content, index)}
                            className="h-7 rounded-none font-mono text-xs"
                            aria-label={
                              copiedCode === index ? "Code copied" : "Copy code to clipboard"
                            }
                          >
                            {copiedCode === index ? (
                              <>
                                <Check className="mr-1 h-3 w-3" />
                                COPIED
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1 h-3 w-3" />
                                &gt; COPY
                              </>
                            )}
                          </Button>
                        </div>
                        <pre className="overflow-x-auto p-4" tabIndex={0}>
                          <code className="text-foreground font-mono text-xs">{block.content}</code>
                        </pre>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>

            {/* Tags */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">tags.tsx</span>
              </div>
              <div className="p-4">
                <div className="text-muted-foreground mb-3 font-mono text-xs">[TAGS]:</div>
                <div className="flex flex-wrap gap-2">
                  {mockArticle.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-border hover:bg-muted cursor-pointer rounded-none font-mono text-xs"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Engagement Actions */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">engagement.tsx</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLike}
                    className="rounded-none font-mono text-xs"
                    aria-label={isLiked ? "Unlike this article" : "Like this article"}
                  >
                    <Heart className={`mr-1 h-3 w-3 ${isLiked ? "fill-current" : ""}`} />
                    {likeCount}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-none font-mono text-xs"
                    aria-label="View comments"
                  >
                    <MessageSquare className="mr-1 h-3 w-3" />
                    {mockArticle.comments}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="rounded-none font-mono text-xs"
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this article"}
                  >
                    <Bookmark className={`h-3 w-3 ${isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-none font-mono text-xs"
                    aria-label="Share this article"
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Author Card */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">author_card.tsx</span>
              </div>
              <div className="p-6">
                <div className="text-muted-foreground mb-4 font-mono text-xs">
                  [ABOUT_THE_AUTHOR]:
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="border-border h-16 w-16 rounded-none border">
                    <AvatarImage src={mockArticle.author.avatar || undefined} />
                    <AvatarFallback className="rounded-none text-lg">
                      {mockArticle.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="mb-1 font-mono font-semibold">{mockArticle.author.name}</h4>
                    <p className="text-muted-foreground mb-3 font-mono text-xs">
                      {mockArticle.author.role}
                    </p>
                    <p className="text-muted-foreground mb-4 font-mono text-sm">
                      {mockArticle.author.bio}
                    </p>
                    <Button variant="outline" className="rounded-none font-mono text-xs">
                      &gt; VIEW_ALL_POSTS
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Navigation */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">post_navigation.tsx</span>
              </div>
              <div className="grid md:grid-cols-2">
                <div className="border-border border-r p-4">
                  <div className="text-muted-foreground mb-2 font-mono text-xs">[PREVIOUS]:</div>
                  <Button
                    variant="ghost"
                    className="h-auto w-full justify-start rounded-none p-0 font-mono text-sm"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">How We Reduced Build Times by 70%</span>
                  </Button>
                </div>
                <div className="p-4 text-right">
                  <div className="text-muted-foreground mb-2 font-mono text-xs">[NEXT]:</div>
                  <Button
                    variant="ghost"
                    className="h-auto w-full justify-end rounded-none p-0 font-mono text-sm"
                  >
                    <span className="truncate">Type-Safe Database Queries with Prisma</span>
                    <ChevronRight className="ml-2 h-4 w-4 flex-shrink-0" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            {/* Table of Contents */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">toc.tsx</span>
              </div>
              <div className="p-4">
                <div className="text-muted-foreground mb-3 font-mono text-xs">
                  [TABLE_OF_CONTENTS]:
                </div>
                <nav className="space-y-2">
                  {mockArticle.content
                    .filter((block) => block.type === "heading")
                    .map((block, index) => (
                      <a
                        key={index}
                        href={`#${block.content.toLowerCase().replace(/ /g, "-")}`}
                        className="text-muted-foreground hover:text-primary block font-mono text-xs transition-colors"
                      >
                        &gt; {block.content}
                      </a>
                    ))}
                </nav>
              </div>
            </div>

            {/* Related Posts */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">related.tsx</span>
              </div>
              <div className="p-4">
                <div className="text-muted-foreground mb-3 font-mono text-xs">[RELATED_POSTS]:</div>
                <div className="space-y-3">
                  {relatedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border-border hover:bg-muted/50 cursor-pointer border p-3 transition-colors"
                    >
                      <Badge
                        variant="outline"
                        className="border-border mb-2 rounded-none font-mono text-xs"
                      >
                        {post.category.toUpperCase()}
                      </Badge>
                      <h4 className="mb-1 font-mono text-xs font-semibold">{post.title}</h4>
                      <div className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-2">
                  <div className="bg-destructive/50 size-2 rounded-none" />
                  <div className="bg-warning/50 size-2 rounded-none" />
                  <div className="bg-success/50 size-2 rounded-none" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">newsletter.tsx</span>
              </div>
              <div className="p-4">
                <div className="text-muted-foreground mb-3 font-mono text-xs">[NEWSLETTER]:</div>
                <p className="text-muted-foreground mb-4 font-mono text-sm">
                  Get weekly articles on engineering, product, and design.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="border-border bg-background w-full rounded-none border px-3 py-2 font-mono text-sm"
                  />
                  <Button className="w-full rounded-none font-mono text-xs">&gt; SUBSCRIBE</Button>
                </div>
                <p className="text-muted-foreground mt-2 font-mono text-xs">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="border-border bg-card border">
          <div className="border-border flex items-center gap-2 border-b px-4 py-2">
            <div className="flex gap-2">
              <div className="bg-destructive/50 size-2 rounded-none" />
              <div className="bg-warning/50 size-2 rounded-none" />
              <div className="bg-success/50 size-2 rounded-none" />
            </div>
            <span className="text-muted-foreground font-mono text-xs">features.md</span>
          </div>
          <div className="p-4">
            <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
            <div className="grid gap-x-8 gap-y-1.5 font-mono text-xs md:grid-cols-2 lg:grid-cols-3">
              <div>
                <span className="text-success">&gt;</span> Rich article header with metadata
              </div>
              <div>
                <span className="text-success">&gt;</span> Code blocks with syntax + copy
              </div>
              <div>
                <span className="text-success">&gt;</span> Table of contents sidebar
              </div>
              <div>
                <span className="text-success">&gt;</span> Author bio card
              </div>
              <div>
                <span className="text-success">&gt;</span> Related posts recommendations
              </div>
              <div>
                <span className="text-success">&gt;</span> Like, bookmark, share actions
              </div>
              <div>
                <span className="text-success">&gt;</span> Previous/next navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Newsletter signup CTA
              </div>
              <div>
                <span className="text-success">&gt;</span> Tags with linking
              </div>
            </div>
            <div className="text-muted-foreground mt-4 font-mono text-xs">
              [NOTE]: Connect to MDX or your CMS for dynamic content rendering.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
