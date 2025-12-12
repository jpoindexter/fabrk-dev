/**
 * FABRK COMPONENT
 * Search Results Template - Terminal console style
 * Production-ready
 */

'use client';

import { useState } from 'react';
import { TemplatePageHeader, Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { LibraryNavigation } from '@/components/library';
import { SearchBar } from './components/search-bar';
import { FiltersSidebar } from './components/filters-sidebar';
import { ResultsHeader } from './components/results-header';
import { ResultsGrid } from './components/results-grid';
import { Pagination } from './components/pagination';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");

  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-6">
      {/* Search Bar */}
      <Card>
        <CardHeader code="0x00" title="SEARCH" />
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className={cn(mode.radius, mode.font, "pl-10 text-xs")}
            />
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64">
          <Card>
            <CardHeader code="0x01" title="FILTERS" />
            <div className="p-4">
              {/* Filter options */}
            </div>
          </Card>
        </aside>

        {/* Results */}
        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader code="0x02" title="RESULTS" />
            <div className="p-4">
              {/* Results grid */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}`;

const mockResults = [
  {
    id: '1',
    title: 'Button Component',
    description: 'Primary, secondary, outline, and ghost button variants with loading states.',
    category: 'UI Components',
    tags: ['button', 'interactive', 'form'],
    rating: 4.9,
    updated: '2 days ago',
  },
  {
    id: '2',
    title: 'Data Table',
    description: 'Sortable, filterable data table with pagination and row selection.',
    category: 'UI Components',
    tags: ['table', 'data', 'sorting'],
    rating: 4.8,
    updated: '1 week ago',
  },
  {
    id: '3',
    title: 'Authentication Flow',
    description: 'Complete auth flow with login, signup, password reset, and OAuth.',
    category: 'Templates',
    tags: ['auth', 'login', 'security'],
    rating: 4.7,
    updated: '3 days ago',
  },
  {
    id: '4',
    title: 'Dashboard Layout',
    description: 'Responsive dashboard layout with sidebar, header, and content areas.',
    category: 'Templates',
    tags: ['dashboard', 'layout', 'responsive'],
    rating: 4.9,
    updated: '5 days ago',
  },
];

const filterCategories = [
  { id: 'all', label: 'All Categories', count: 24 },
  { id: 'ui-components', label: 'UI Components', count: 15 },
  { id: 'templates', label: 'Templates', count: 6 },
  { id: 'hooks', label: 'Hooks', count: 3 },
];

const filterTags = [
  { id: 'button', label: 'button' },
  { id: 'form', label: 'form' },
  { id: 'table', label: 'table' },
  { id: 'auth', label: 'auth' },
  { id: 'layout', label: 'layout' },
  { id: 'responsive', label: 'responsive' },
];

function SearchResultsPreview() {
  const [searchQuery, setSearchQuery] = useState('components');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
  };

  return (
    <div className="bg-background/50 min-h-[600px] p-4 sm:p-8">
      <div className="space-y-6">
        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultsCount={mockResults.length}
        />

        {/* Main Content */}
        <div className="flex flex-col gap-6 md:flex-row">
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

            <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Navigation */}
        <LibraryNavigation templateName="Search Results" />

        {/* Header */}
        <TemplatePageHeader
          badge="SEARCH RESULTS"
          title="Search Results"
          description="Search interface with filters, sorting, and pagination"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
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
              <CardHeader code="0x01" title="LIVE PREVIEW" />
              <SearchResultsPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">search/</span>
                  <span className="text-foreground">page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div>
                <span className="text-success">&gt;</span> Search input with real-time filtering
              </div>
              <div>
                <span className="text-success">&gt;</span> Category and tag filters
              </div>
              <div>
                <span className="text-success">&gt;</span> Sorting options (relevance, date, rating)
              </div>
              <div>
                <span className="text-success">&gt;</span> Grid/list view toggle
              </div>
              <div>
                <span className="text-success">&gt;</span> Pagination controls
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive sidebar
              </div>
              <div>
                <span className="text-success">&gt;</span> DS-compliant (mode.font, mode.radius)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
