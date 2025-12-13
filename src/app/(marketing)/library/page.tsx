/**
 * Template Library - Developer Reference Page
 * Browse and discover templates to copy-paste into your project
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, BookOpen, Sparkles } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { InputSearch } from '@/components/ui/input-search';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { templates, categories } from './library-data';
import { filterTemplates } from '@/lib/search';
import { AdvancedFilters, TemplateCard, type FilterOptions } from '@/components/library';

const INITIAL_DISPLAY_COUNT = 9;

type SortOption = 'relevance' | 'name' | 'newest' | 'popular';

export default function LibraryIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

  // Filter templates with fuzzy search
  const filteredTemplates = filterTemplates(templates, {
    searchQuery,
    category: selectedCategory,
    complexity: advancedFilters.difficulty,
    hasFeature: advancedFilters.feature,
    setupTime: advancedFilters.setupTime,
    hasDependencies: advancedFilters.hasDependencies,
  });

  // Calculate active filter count
  const activeFilterCount =
    (advancedFilters.difficulty ? 1 : 0) +
    (advancedFilters.setupTime ? 1 : 0) +
    (advancedFilters.hasDependencies ? 1 : 0) +
    (advancedFilters.feature ? 1 : 0);

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        if (a.lastUpdated && b.lastUpdated) {
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        }
        if (a.lastUpdated) return -1;
        if (b.lastUpdated) return 1;
        return 0;
      case 'popular':
        const score = (t: typeof a) => {
          if (t.badge === 'Popular') return 3;
          if (t.badge === 'Essential') return 2;
          if (t.badge === 'New') return 1;
          return 0;
        };
        return score(b) - score(a);
      default:
        return 0;
    }
  });

  // Paginated display
  const displayedTemplates = sortedTemplates.slice(0, displayCount);
  const hasMore = displayCount < sortedTemplates.length;

  const handleClearFilters = () => {
    setAdvancedFilters({});
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + INITIAL_DISPLAY_COUNT);
  };

  // Reset display count when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setDisplayCount(INITIAL_DISPLAY_COUNT);
  };

  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Header - Compact, search-focused */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="border-border mb-2 inline-block border px-3 py-1">
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [LIBRARY]: {templates.length} TEMPLATES
            </span>
          </div>
          <h1 className={cn(mode.font, 'text-2xl font-semibold')}>Template Library</h1>
        </div>
        <Link
          href="/library/docs"
          className={cn(
            mode.font,
            'text-primary hover:text-primary/80 flex items-center gap-2 text-sm transition-colors'
          )}
        >
          <BookOpen className="h-4 w-4" />
          &gt; DOCS
        </Link>
      </div>

      {/* Search Bar - Prominent */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
        <InputSearch
          placeholder="Search templates by name, feature, or category..."
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
            setDisplayCount(INITIAL_DISPLAY_COUNT);
          }}
          className={cn(
            mode.radius,
            mode.font,
            'border-border focus-visible:border-primary h-12 border pl-11 text-sm'
          )}
        />
      </div>

      {/* Filter Toolbar */}
      <Card size="auto">
        <CardHeader
          title={
            searchQuery
              ? 'SEARCH_RESULTS'
              : selectedCategory === 'all'
                ? 'ALL_TEMPLATES'
                : categories
                    .find((c) => c.id === selectedCategory)
                    ?.name.toUpperCase()
                    .replace(/ /g, '_') || 'TEMPLATES'
          }
          meta={`${sortedTemplates.length} found`}
        />
        <CardContent padding="md">
          {/* Sort + Actions Row */}
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className={cn(mode.font, 'text-muted-foreground text-xs')}>[SORT]:</span>
              <div className="flex gap-1" role="group" aria-label="Sort options">
                {[
                  { id: 'relevance' as const, label: 'RELEVANCE' },
                  { id: 'popular' as const, label: 'POPULAR' },
                  { id: 'newest' as const, label: 'NEWEST' },
                  { id: 'name' as const, label: 'A-Z' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    aria-pressed={sortBy === option.id}
                    className={cn(
                      mode.font,
                      'border-border min-h-[44px] px-4 py-2 text-xs transition-all',
                      sortBy === option.id
                        ? 'bg-primary text-primary-foreground border'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters || activeFilterCount > 0 ? 'default' : 'outline'}
              size="default"
              aria-pressed={showFilters}
              aria-expanded={showFilters}
              className={cn(mode.radius, mode.font, 'min-h-[44px] text-xs')}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              FILTERS{activeFilterCount > 0 && ` (${activeFilterCount})`}
            </Button>
          </div>

          {/* Category Pills */}
          <div className="border-border border-t pt-4">
            <div className={cn(mode.font, 'text-muted-foreground mb-3 text-xs')}>[CATEGORY]:</div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Category filter">
              <button
                onClick={() => handleCategoryChange('all')}
                aria-pressed={selectedCategory === 'all'}
                className={cn(
                  mode.font,
                  'border-border min-h-[44px] px-4 py-2 text-xs transition-all',
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground border'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border'
                )}
              >
                ALL ({templates.length})
              </button>
              {categories
                .filter((c) => c.id !== 'components')
                .map((category) => {
                  const count = templates.filter((t) => t.category === category.id).length;
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      aria-pressed={selectedCategory === category.id}
                      className={cn(
                        mode.font,
                        'border-border flex min-h-[44px] items-center gap-2 px-4 py-2 text-xs transition-all',
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground border'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border'
                      )}
                    >
                      <Icon className="h-3 w-3" />
                      {category.name.toUpperCase()} ({count})
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="border-border mt-4 border-t pt-4">
              <AdvancedFilters
                filters={advancedFilters}
                onFilterChange={setAdvancedFilters}
                onClearFilters={() => setAdvancedFilters({})}
                activeFilterCount={activeFilterCount}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Templates Grid */}
      {sortedTemplates.length === 0 ? (
        /* Empty State */
        <Card size="auto">
          <CardHeader title="NO_RESULTS" />
          <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <Search className="text-muted-foreground/30 mb-4 h-12 w-12" />
            <h3 className={cn(mode.font, 'mb-2 text-lg font-semibold')}>No templates found</h3>
            <p className={cn(mode.font, 'text-muted-foreground mb-6 max-w-md text-sm')}>
              {searchQuery
                ? `No templates match "${searchQuery}"`
                : 'No templates match your selected filters'}
            </p>

            {/* Suggestions */}
            <div className="mb-6 space-y-2">
              <p className={cn(mode.font, 'text-muted-foreground text-xs')}>[TRY]:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Dashboard', 'Auth', 'Settings', 'Billing'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchQuery(suggestion.toLowerCase());
                      setSelectedCategory('all');
                      setAdvancedFilters({});
                    }}
                    className={cn(
                      mode.font,
                      'border-border hover:border-primary hover:text-primary min-h-[44px] border px-4 py-2 text-xs transition-colors'
                    )}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleClearFilters}
              variant="default"
              className={cn(mode.radius, mode.font, 'min-h-[44px]')}
            >
              &gt; CLEAR ALL FILTERS
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayedTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                description={template.description}
                href={template.href}
                icon={template.icon}
                features={template.features}
                badge={template.badge}
                featured={template.badge === 'Popular' || template.badge === 'Essential'}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                size="lg"
                className={cn(mode.radius, mode.font, 'min-h-[44px]')}
              >
                &gt; LOAD MORE ({sortedTemplates.length - displayCount} remaining)
              </Button>
            </div>
          )}
        </>
      )}

      {/* Help CTA - Simple, not bloated */}
      <Card size="auto" className="mt-8">
        <CardHeader title="NEED_HELP" icon={<Sparkles className="text-primary h-4 w-4" />} />
        <CardContent className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className={cn(mode.font, 'text-muted-foreground text-sm')}>
            Learn how to copy templates, customize components, and integrate with your stack.
          </p>
          <div className="flex gap-2">
            <Link href="/library/docs/getting-started">
              <Button variant="default" className={cn(mode.radius, mode.font, 'min-h-[44px]')}>
                &gt; GET STARTED
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" className={cn(mode.radius, mode.font, 'min-h-[44px]')}>
                &gt; COMPONENTS
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
