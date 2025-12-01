/**
 * FABRK COMPONENT
 * Search Results Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
  Clock,
  Star,
} from "lucide-react";

const mockResults = [
  {
    id: "1",
    title: "Button Component",
    description: "Primary, secondary, outline, and ghost button variants with loading states.",
    category: "UI Components",
    tags: ["button", "interactive", "form"],
    rating: 4.9,
    updated: "2 days ago",
  },
  {
    id: "2",
    title: "Data Table",
    description: "Sortable, filterable data table with pagination and row selection.",
    category: "UI Components",
    tags: ["table", "data", "sorting"],
    rating: 4.8,
    updated: "1 week ago",
  },
  {
    id: "3",
    title: "Authentication Flow",
    description: "Complete auth flow with login, signup, password reset, and OAuth.",
    category: "Templates",
    tags: ["auth", "login", "security"],
    rating: 4.7,
    updated: "3 days ago",
  },
  {
    id: "4",
    title: "Dashboard Layout",
    description: "Responsive dashboard layout with sidebar, header, and content areas.",
    category: "Templates",
    tags: ["dashboard", "layout", "responsive"],
    rating: 4.9,
    updated: "5 days ago",
  },
  {
    id: "5",
    title: "Form Builder",
    description: "Dynamic form builder with validation, custom fields, and multi-step support.",
    category: "UI Components",
    tags: ["form", "validation", "input"],
    rating: 4.6,
    updated: "1 day ago",
  },
  {
    id: "6",
    title: "Notification System",
    description: "Toast notifications, alerts, and in-app notification center.",
    category: "UI Components",
    tags: ["notification", "toast", "alert"],
    rating: 4.5,
    updated: "4 days ago",
  },
];

const filterCategories = [
  { id: "all", label: "All Categories", count: 24 },
  { id: "ui-components", label: "UI Components", count: 15 },
  { id: "templates", label: "Templates", count: 6 },
  { id: "hooks", label: "Hooks", count: 3 },
];

const filterTags = [
  { id: "button", label: "button" },
  { id: "form", label: "form" },
  { id: "table", label: "table" },
  { id: "auth", label: "auth" },
  { id: "layout", label: "layout" },
  { id: "responsive", label: "responsive" },
];

export default function SearchResultsTemplate() {
  const [searchQuery, setSearchQuery] = useState("components");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((t) => t !== tagId)
        : [...prev, tagId]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedTags([]);
  };

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-3 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: SEARCH_RESULTS
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Search Results</h1>
          <p className="font-mono text-sm text-muted-foreground">
            Search interface with filters, sorting, and pagination
          </p>
        </div>

        {/* Search Bar */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              search.tsx
            </span>
          </div>
          <div className="p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search components, templates, hooks..."
                  className="pl-10 rounded-none font-mono text-sm"
                />
              </div>
              <Button className="rounded-none font-mono text-xs">
                &gt; SEARCH
              </Button>
            </div>
            <div className="mt-2 font-mono text-xs text-muted-foreground">
              [QUERY]: &quot;{searchQuery}&quot; | RESULTS: {mockResults.length} | TIME: 0.042s
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-4">
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  filters.tsx
                </span>
              </div>

              <div className="p-4 space-y-4">
                {/* Filter Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Filter className="h-3 w-3" />
                    [FILTERS]
                  </div>
                  {(selectedCategory !== "all" || selectedTags.length > 0) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-6 px-2 font-mono text-[10px] text-muted-foreground"
                    >
                      <X className="h-3 w-3 mr-1" />
                      CLEAR
                    </Button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <div className="font-mono text-xs text-muted-foreground">
                    [CATEGORY]:
                  </div>
                  <div className="space-y-1">
                    {filterCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-2 py-1.5 font-mono text-xs border border-border transition-colors ${
                          selectedCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span>{category.label}</span>
                        <span className="text-[10px]">({category.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags Filter */}
                <div className="space-y-2">
                  <div className="font-mono text-xs text-muted-foreground">
                    [TAGS]:
                  </div>
                  <div className="space-y-1">
                    {filterTags.map((tag) => (
                      <div
                        key={tag.id}
                        className="flex items-center gap-2 px-2 py-1"
                      >
                        <Checkbox
                          id={tag.id}
                          checked={selectedTags.includes(tag.id)}
                          onCheckedChange={() => toggleTag(tag.id)}
                          className="rounded-none"
                        />
                        <label
                          htmlFor={tag.id}
                          className="font-mono text-xs cursor-pointer"
                        >
                          {tag.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 space-y-4">
            {/* Results Header */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  results_header.tsx
                </span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="font-mono text-xs text-muted-foreground">
                  [SHOWING]: {mockResults.length} results
                </div>
                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px] h-8 rounded-none font-mono text-xs">
                      <SlidersHorizontal className="h-3 w-3 mr-1" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none font-mono text-xs">
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex border border-border">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none h-8 w-8 p-0"
                    >
                      <Grid className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-none h-8 w-8 p-0 border-l border-border"
                    >
                      <List className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 gap-4"
                  : "space-y-3"
              }
            >
              {mockResults.map((result) => (
                <div
                  key={result.id}
                  className="border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
                    <div className="flex gap-1">
                      <div className="size-1.5 rounded-full bg-destructive/50" />
                      <div className="size-1.5 rounded-full bg-warning/50" />
                      <div className="size-1.5 rounded-full bg-success/50" />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      result_{result.id}.tsx
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold">{result.title}</h3>
                      <div className="flex items-center gap-1 font-mono text-xs text-warning">
                        <Star className="h-3 w-3 fill-current" />
                        {result.rating}
                      </div>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground mb-3">
                      {result.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {result.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            className="rounded-none font-mono text-[10px] bg-muted text-muted-foreground"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {result.updated}
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
                    [PAGE]: {currentPage} OF 5
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
                      {[1, 2, 3, 4, 5].map((page) => (
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
                      onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                      disabled={currentPage === 5}
                      className="rounded-none font-mono text-xs h-8"
                    >
                      NEXT
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
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
                <span className="text-success">&gt;</span> Search bar with query display
              </div>
              <div>
                <span className="text-success">&gt;</span> Category filter sidebar
              </div>
              <div>
                <span className="text-success">&gt;</span> Tag checkboxes with multi-select
              </div>
              <div>
                <span className="text-success">&gt;</span> Sort dropdown (relevance, newest, rating)
              </div>
              <div>
                <span className="text-success">&gt;</span> Grid/list view toggle
              </div>
              <div>
                <span className="text-success">&gt;</span> Result cards with ratings
              </div>
              <div>
                <span className="text-success">&gt;</span> Pagination controls
              </div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Connect to your search backend (Algolia, Elasticsearch, etc.) for real results.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
