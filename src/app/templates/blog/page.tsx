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
import { Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, User } from "lucide-react";
import { InputSearch } from "@/components/ui/input-search";
import Link from "next/link";
import {
  StyledCard,
  StyledCardHeader,
  TemplatePageHeader,
  FeaturesCard,
} from "@/components/ui/card";

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
    excerpt: "We're growing! Learn about our culture, values, and what it's like to work at Fabrk.",
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = mockPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div>
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="BLOG"
          title="Blog"
          description="Articles, tutorials, and updates from the team"
        />

        {/* Featured Post */}
        {featuredPost && activeCategory === "all" && (
          <StyledCard>
            <StyledCardHeader code="0x00" title="FEATURED_POST" />

            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Image Placeholder */}
                <div className="border-border bg-muted/30 flex aspect-video items-center justify-center border">
                  <span className="text-muted-foreground font-mono text-xs">[FEATURED_IMAGE]</span>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="rounded-none font-mono text-xs">
                      FEATURED
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-border rounded-none font-mono text-xs"
                    >
                      {featuredPost.category.toUpperCase()}
                    </Badge>
                  </div>

                  <h2 className="font-mono text-2xl font-semibold">{featuredPost.title}</h2>

                  <p className="text-muted-foreground font-mono text-sm">{featuredPost.excerpt}</p>

                  <div className="text-muted-foreground flex items-center gap-4 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <Avatar className="border-border h-6 w-6 rounded-none border">
                        <AvatarImage src={featuredPost.author.avatar || undefined} />
                        <AvatarFallback className="rounded-none text-xs">
                          {" "}
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

                  <Button asChild className="w-fit rounded-none font-mono text-xs">
                    <Link href="/templates/blog/post">
                      &gt; READ_ARTICLE <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </StyledCard>
        )}

        {/* Category Filters + Search - Industry standard horizontal layout */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 font-mono text-xs transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full sm:w-64">
            <InputSearch
              placeholder="Search articles..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="rounded-none font-mono text-xs"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <Link key={post.id} href="/templates/blog/post">
              <StyledCard className="hover:border-primary/50 group transition-colors">
                <StyledCardHeader code={`0x0${post.id}`} title={`POST_${post.id}`} />

                {/* Image Placeholder */}
                <div className="border-border bg-muted/30 flex aspect-video items-center justify-center border-b">
                  <span className="text-muted-foreground font-mono text-xs">[THUMBNAIL]</span>
                </div>

                <div className="flex h-[180px] flex-col p-4">
                  <Badge
                    variant="outline"
                    className="border-border mb-2 w-fit rounded-none font-mono text-xs"
                  >
                    {post.category.toUpperCase()}
                  </Badge>

                  <h3 className="group-hover:text-primary mb-2 line-clamp-2 font-mono text-sm font-semibold transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-2 font-mono text-xs">
                    {post.excerpt}
                  </p>

                  <div className="border-border mt-auto flex items-center justify-between border-t pt-3">
                    <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
                      <User className="h-3 w-3" />
                      {post.author.name}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </StyledCard>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <StyledCard>
          <StyledCardHeader code="0x0A" title="PAGINATION" />
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground font-mono text-xs">
                [PAGE]: {currentPage} OF 3 | SHOWING {regularPosts.length} POSTS
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 rounded-none font-mono text-xs"
                >
                  <ChevronLeft className="mr-1 h-3 w-3" />
                  PREV
                </Button>
                <div className="flex gap-1">
                  {[1, 2, 3].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="h-8 w-8 rounded-none p-0 font-mono text-xs"
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
                  className="h-8 rounded-none font-mono text-xs"
                >
                  NEXT
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </StyledCard>

        {/* Features Card */}
        <FeaturesCard
          code="0x0B"
          features={[
            "Featured post hero section",
            "Category filtering with counts",
            "Responsive blog grid",
            "Post cards with author, date, read time",
            "Pagination controls",
            "Terminal-styled card headers",
          ]}
          note="Connect to your CMS (MDX, Contentful, Sanity) for dynamic content."
        />
      </div>
    </div>
  );
}
