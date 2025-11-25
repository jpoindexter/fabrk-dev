'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  FileText,
  Code,
  Blocks,
  Home,
  Mail,
  Info,
  Search as SearchIcon,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { searchRecordsLocally } from '@/lib/algolia/search-data';
import type { SearchRecord } from '@/lib/algolia/search-data';

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<SearchRecord[]>([]);

  // Toggle command palette with ⌘K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Search records when query changes
  React.useEffect(() => {
    if (search.length > 0) {
      const searchResults = searchRecordsLocally(search);
      setResults(searchResults.slice(0, 10));
    } else {
      setResults([]);
    }
  }, [search]);

  const handleSelect = (url: string) => {
    setOpen(false);
    setSearch('');
    router.push(url);
  };

  const quickActions = [
    {
      icon: Home,
      label: 'Home',
      url: '/',
      category: 'Navigation',
    },
    {
      icon: FileText,
      label: 'Features',
      url: '/features',
      category: 'Marketing',
    },
    {
      icon: Code,
      label: 'Components',
      url: '/components',
      category: 'Documentation',
    },
    {
      icon: Blocks,
      label: 'Templates',
      url: '/templates',
      category: 'Documentation',
    },
    {
      icon: Info,
      label: 'About',
      url: '/about',
      category: 'Marketing',
    },
    {
      icon: Mail,
      label: 'Contact',
      url: '/contact',
      category: 'Marketing',
    },
  ];

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <SearchIcon className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Command palette dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
              <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Type to search..."
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <Command.Empty className="py-6 text-center text-sm">
                No results found.
              </Command.Empty>

              {/* Show search results if query exists */}
              {search.length > 0 && results.length > 0 && (
                <Command.Group heading="Search Results">
                  {results.map((result) => (
                    <Command.Item
                      key={result.objectID}
                      onSelect={() => handleSelect(result.url)}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.title}</span>
                          <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                            {result.type}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {result.description}
                        </span>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {/* Show quick actions when no query */}
              {search.length === 0 && (
                <>
                  <Command.Group heading="Quick Actions">
                    {quickActions
                      .filter((action) => action.category === 'Navigation')
                      .map((action) => (
                        <Command.Item
                          key={action.url}
                          onSelect={() => handleSelect(action.url)}
                          className="cursor-pointer"
                        >
                          <action.icon className="mr-2 h-4 w-4" />
                          <span>{action.label}</span>
                        </Command.Item>
                      ))}
                  </Command.Group>

                  <Command.Group heading="Documentation">
                    {quickActions
                      .filter((action) => action.category === 'Documentation')
                      .map((action) => (
                        <Command.Item
                          key={action.url}
                          onSelect={() => handleSelect(action.url)}
                          className="cursor-pointer"
                        >
                          <action.icon className="mr-2 h-4 w-4" />
                          <span>{action.label}</span>
                        </Command.Item>
                      ))}
                  </Command.Group>

                  <Command.Group heading="Marketing">
                    {quickActions
                      .filter((action) => action.category === 'Marketing')
                      .map((action) => (
                        <Command.Item
                          key={action.url}
                          onSelect={() => handleSelect(action.url)}
                          className="cursor-pointer"
                        >
                          <action.icon className="mr-2 h-4 w-4" />
                          <span>{action.label}</span>
                        </Command.Item>
                      ))}
                  </Command.Group>
                </>
              )}
            </Command.List>

            {/* Footer with keyboard shortcuts */}
            <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-muted px-1">↑↓</kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-muted px-1">↵</kbd>
                  <span>to select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-muted px-1">esc</kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
