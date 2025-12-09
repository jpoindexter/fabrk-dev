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
  Card,
  CardHeader,
  CardContent,
  TemplatePageHeader,
  FeaturesCard,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

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

const templateCode = `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, User } from "lucide-react";
import { InputSearch } from "@/components/ui/input-search";
import Link from "next/link";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

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
    excerpt: "Learn how to build production-ready APIs...",
    category: "engineering",
    author: { name: "Alex Chen", avatar: null },
    date: "Dec 1, 2024",
    readTime: "8 min read",
    featured: true,
  },
  // ... more posts
];

export default function BlogPage() {
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
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Featured Post */}
      {featuredPost && (
        <div className="border border-border">
          <div className="border-b border-border px-4 py-2">
            <span className="font-mono text-xs text-muted-foreground">
              [ [0x00] FEATURED_POST ]
            </span>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-border bg-muted/30 flex aspect-video items-center justify-center">
                <span className="font-mono text-xs text-muted-foreground">[FEATURED_IMAGE]</span>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={cn(mode.radius, mode.font, "text-xs")}>FEATURED</Badge>
                  <Badge variant="outline" className={cn(mode.radius, mode.font, "text-xs")}>
                    {featuredPost.category.toUpperCase()}
                  </Badge>
                </div>
                <h2 className={cn(mode.font, "text-2xl font-semibold")}>{featuredPost.title}</h2>
                <p className={cn(mode.font, "text-sm text-muted-foreground")}>{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className={cn(mode.radius, "h-6 w-6 border border-border")}>
                      <AvatarFallback className={cn(mode.radius, "text-xs")}>
                        {featuredPost.author.name.split(" ").map(n => n[0]).join("")}
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
                <Button asChild className={cn(mode.radius, mode.font, "w-fit text-xs")}>
                  <Link href="/blog/post-1">
                    &gt; READ_ARTICLE <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filters + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={\`px-4 py-2 font-mono text-xs transition-all \${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }\`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-64">
          <InputSearch
            placeholder="Search articles..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className={cn(mode.radius, mode.font, "text-xs")}
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {regularPosts.map((post) => (
          <Link key={post.id} href={\`/blog/\${post.id}\`}>
            <div className="group border border-border hover:border-primary transition-colors">
              <div className="border-b border-border px-4 py-2">
                <span className="font-mono text-xs text-muted-foreground">
                  [ [0x0{post.id}] POST_{post.id} ]
                </span>
              </div>
              <div className="border-b border-border bg-muted/30 flex aspect-video items-center justify-center">
                <span className="font-mono text-xs text-muted-foreground">[THUMBNAIL]</span>
              </div>
              <div className="flex h-[180px] flex-col p-4">
                <Badge variant="outline" className={cn(mode.radius, mode.font, "mb-2 w-fit text-xs")}>
                  {post.category.toUpperCase()}
                </Badge>
                <h3 className={cn(mode.font, "mb-2 line-clamp-2 text-sm font-semibold group-hover:text-primary transition-colors")}>
                  {post.title}
                </h3>
                <p className={cn(mode.font, "mb-4 line-clamp-2 text-xs text-muted-foreground")}>
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    {post.author.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {post.readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="border border-border">
        <div className="border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">[ [0x0A] PAGINATION ]</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="font-mono text-xs text-muted-foreground">
            [PAGE]: {currentPage} OF 3 | SHOWING {regularPosts.length} POSTS
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(mode.radius, mode.font, "h-8 text-xs")}
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
                  className={cn(mode.radius, mode.font, "h-8 w-8 p-0 text-xs")}
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
              className={cn(mode.radius, mode.font, "h-8 text-xs")}
            >
              NEXT
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}`;

function BlogPreview() {
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
    <div className="bg-background/50 min-h-[800px] p-4 sm:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Featured Post */}
        {featuredPost && (
          <div className="border-border bg-card border">
            <div className="border-border border-b px-4 py-2">
              <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                [ [0x00] FEATURED_POST ]
              </span>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border-border bg-muted/30 flex aspect-video items-center justify-center border">
                  <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                    [FEATURED_IMAGE]
                  </span>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className={cn(mode.radius, mode.font, "text-xs")}>
                      FEATURED
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(mode.radius, mode.font, "border-border text-xs")}
                    >
                      {featuredPost.category.toUpperCase()}
                    </Badge>
                  </div>
                  <h2 className={cn(mode.font, "text-2xl font-semibold")}>{featuredPost.title}</h2>
                  <p className={cn(mode.font, "text-muted-foreground text-sm")}>
                    {featuredPost.excerpt}
                  </p>
                  <div
                    className={cn(
                      mode.font,
                      "text-muted-foreground flex items-center gap-4 text-xs"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className={cn(mode.radius, "border-border h-6 w-6 border")}>
                        <AvatarImage src={featuredPost.author.avatar || undefined} />
                        <AvatarFallback className={cn(mode.radius, "text-xs")}>
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
                  <Button asChild className={cn(mode.radius, mode.font, "w-fit text-xs")}>
                    <Link href="/templates/blog/post">
                      &gt; READ_ARTICLE <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters + Search */}
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
          <div className="w-full sm:w-64">
            <InputSearch
              placeholder="Search articles..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className={cn(mode.radius, mode.font, "text-xs")}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.slice(0, 3).map((post) => (
            <Link key={post.id} href="/templates/blog/post">
              <div className="border-border hover:border-primary group bg-card border transition-colors">
                <div className="border-border border-b px-4 py-2">
                  <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                    [ [0x0{post.id}] POST_{post.id} ]
                  </span>
                </div>
                <div className="border-border bg-muted/30 flex aspect-video items-center justify-center border-b">
                  <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                    [THUMBNAIL]
                  </span>
                </div>
                <div className="flex h-[180px] flex-col p-4">
                  <Badge
                    variant="outline"
                    className={cn(mode.radius, mode.font, "border-border mb-2 w-fit text-xs")}
                  >
                    {post.category.toUpperCase()}
                  </Badge>
                  <h3
                    className={cn(
                      mode.font,
                      "group-hover:text-primary mb-2 line-clamp-2 text-sm font-semibold transition-colors"
                    )}
                  >
                    {post.title}
                  </h3>
                  <p className={cn(mode.font, "text-muted-foreground mb-4 line-clamp-2 text-xs")}>
                    {post.excerpt}
                  </p>
                  <div className="border-border mt-auto flex items-center justify-between border-t pt-3">
                    <div
                      className={cn(
                        mode.font,
                        "text-muted-foreground flex items-center gap-2 text-xs"
                      )}
                    >
                      <User className="h-3 w-3" />
                      {post.author.name}
                    </div>
                    <div
                      className={cn(
                        mode.font,
                        "text-muted-foreground flex items-center gap-2 text-xs"
                      )}
                    >
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="border-border bg-card border">
          <div className="border-border border-b px-4 py-2">
            <span className={cn(mode.font, "text-muted-foreground text-xs")}>
              [ [0x0A] PAGINATION ]
            </span>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className={cn(mode.font, "text-muted-foreground text-xs")}>
              [PAGE]: {currentPage} OF 3 | SHOWING {regularPosts.length} POSTS
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={cn(mode.radius, mode.font, "h-8 text-xs")}
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
                    className={cn(mode.radius, mode.font, "h-8 w-8 p-0 text-xs")}
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
                className={cn(mode.radius, mode.font, "h-8 text-xs")}
              >
                NEXT
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="BLOG"
          title="Blog"
          description="Articles, tutorials, and updates from the team"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE_PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  "h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0",
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    "border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs",
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    "border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs",
                    mode.radius,
                    mode.font
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE_PREVIEW" />
              <BlogPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, "space-y-1 text-xs")}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">blog/</span>
                  <span className="text-foreground">page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <FeaturesCard
          title="TEMPLATE_FEATURES"
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
