/**
 * FABRK COMPONENT
 * Blog Template - Terminal console style
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
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Tag,
  User,
} from "lucide-react";

const categories = [
  { id: "all", name: "All", count: 12 },
  { id: "engineering", name: "Engineering", count: 5 },
  { id: "product", name: "Product", count: 3 },
  { id: "design", name: "Design", count: 2 },
  { id: "company", name: "Company", count: 2 },
];

const mockPosts = [
  {
    id: "1",
    title: "Building Scalable APIs with Next.js 15",
    excerpt:
      "Learn how to build production-ready APIs using Next.js 15 App Router with type-safe endpoints and middleware.",
    category: "engineering",
    author: { name: "Alex Chen", avatar: null },
    date: "Dec 1, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Introducing Our New Design System",
    excerpt:
      "We've rebuilt our design system from the ground up with accessibility and developer experience in mind.",
    category: "design",
    author: { name: "Sarah Kim", avatar: null },
    date: "Nov 28, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: "3",
    title: "How We Reduced Build Times by 70%",
    excerpt:
      "A deep dive into our build optimization journey, from incremental builds to smart caching strategies.",
    category: "engineering",
    author: { name: "Mike Johnson", avatar: null },
    date: "Nov 25, 2024",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: "4",
    title: "Product Roadmap Q1 2025",
    excerpt:
      "A look at what we're building next quarter, including new features, integrations, and improvements.",
    category: "product",
    author: { name: "Emily Davis", avatar: null },
    date: "Nov 22, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "5",
    title: "Joining the Fabrk Team",
    excerpt:
      "We're growing! Learn about our culture, values, and what it's like to work at Fabrk.",
    category: "company",
    author: { name: "HR Team", avatar: null },
    date: "Nov 18, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: "6",
    title: "Type-Safe Database Queries with Prisma",
    excerpt:
      "Exploring advanced Prisma patterns for building robust, type-safe database interactions.",
    category: "engineering",
    author: { name: "Alex Chen", avatar: null },
    date: "Nov 15, 2024",
    readTime: "10 min read",
    featured: false,
  },
];

export default function BlogTemplate() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts =
    activeCategory === "all"
      ? mockPosts
      : mockPosts.filter((post) => post.category === activeCategory);

  const featuredPost = mockPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-3 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: BLOG
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
          <p className="font-mono text-sm text-muted-foreground">
            Articles, tutorials, and updates from the team
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === "all" && (
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                featured.tsx
              </span>
              <Badge className="ml-auto rounded-none font-mono text-xs bg-primary/20 text-primary border-primary/50">
                FEATURED
              </Badge>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image Placeholder */}
                <div className="aspect-video border border-border bg-muted/30 flex items-center justify-center">
                  <span className="font-mono text-xs text-muted-foreground">
                    [FEATURED_IMAGE]
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center space-y-4">
                  <Badge className="w-fit rounded-none font-mono text-xs bg-muted text-muted-foreground">
                    {featuredPost.category.toUpperCase()}
                  </Badge>

                  <h2 className="text-2xl font-semibold">{featuredPost.title}</h2>

                  <p className="font-mono text-sm text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-border rounded-none">
                        <AvatarImage src={featuredPost.author.avatar || undefined} />
                        <AvatarFallback className="rounded-none text-[10px]">
                          {featuredPost.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {featuredPost.author.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readTime}
                    </div>
                  </div>

                  <Button className="w-fit rounded-none font-mono text-xs">
                    &gt; READ_ARTICLE <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              categories.tsx
            </span>
          </div>
          <div className="flex flex-wrap border-b border-border font-mono text-xs">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 border-r border-border transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Tag className="h-3 w-3" />
                [{category.name}]
                <span className="text-[10px]">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <div key={post.id} className="border border-border bg-card group">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  post_{post.id}.tsx
                </span>
              </div>

              {/* Image Placeholder */}
              <div className="aspect-video border-b border-border bg-muted/30 flex items-center justify-center">
                <span className="font-mono text-xs text-muted-foreground">
                  [THUMBNAIL]
                </span>
              </div>

              <div className="p-4 space-y-3">
                <Badge className="rounded-none font-mono text-xs bg-muted text-muted-foreground">
                  {post.category.toUpperCase()}
                </Badge>

                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="font-mono text-xs text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                    <User className="h-3 w-3" />
                    {post.author.name}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              pagination.tsx
            </span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs text-muted-foreground">
                [PAGE]: {currentPage} OF 3 | SHOWING {regularPosts.length} POSTS
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-none font-mono text-xs h-8"
                >
                  <ChevronLeft className="h-3 w-3 mr-1" />
                  PREV
                </Button>
                <div className="flex gap-1">
                  {[1, 2, 3].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="rounded-none font-mono text-xs h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                  disabled={currentPage === 3}
                  className="rounded-none font-mono text-xs h-8"
                >
                  NEXT
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              features.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">
              [TEMPLATE_FEATURES]:
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> Featured post hero
                section
              </div>
              <div>
                <span className="text-success">&gt;</span> Category filtering with
                counts
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive blog grid
              </div>
              <div>
                <span className="text-success">&gt;</span> Post cards with author,
                date, read time
              </div>
              <div>
                <span className="text-success">&gt;</span> Pagination controls
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal-styled card
                headers
              </div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Connect to your CMS (MDX, Contentful, Sanity) for dynamic
              content.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
