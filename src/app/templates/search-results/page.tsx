/**
 * FABRK COMPONENT
 * Search Results Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { SearchBar } from "./components/search-bar";
import { FiltersSidebar } from "./components/filters-sidebar";
import { ResultsHeader } from "./components/results-header";
import { ResultsGrid } from "./components/results-grid";
import { Pagination } from "./components/pagination";
import { FeaturesCard } from "./components/features-card";

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
          <div className="inline-block border border-border px-4 py-1">
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
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultsCount={mockResults.length}
        />

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <FiltersSidebar
            categories={filterCategories}
            tags={filterTags}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            onCategoryChange={setSelectedCategory}
            onTagToggle={toggleTag}
            onClearFilters={clearFilters}
          />

          {/* Results Area */}
          <div className="flex-1 space-y-4">
            <ResultsHeader
              resultsCount={mockResults.length}
              sortBy={sortBy}
              viewMode={viewMode}
              onSortChange={setSortBy}
              onViewModeChange={setViewMode}
            />

            <ResultsGrid results={mockResults} viewMode={viewMode} />

            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Features Card */}
        <FeaturesCard />
      </div>
    </div>
  );
}
