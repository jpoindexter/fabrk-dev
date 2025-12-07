"use client";

import * as React from "react";
import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  FiltersBar,
  QuickFiltersBar,
  FiltersSummary,
  FilterConfig,
  ActiveFilter,
} from "@/components/ui/filters-bar";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

function BasicFiltersDemo() {
  const [searchValue, setSearchValue] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[]>([]);

  const filters: FilterConfig[] = [
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active", count: 12 },
        { label: "Pending", value: "pending", count: 5 },
        { label: "Completed", value: "completed", count: 23 },
      ],
    },
    {
      id: "priority",
      label: "Priority",
      type: "select",
      options: [
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
      ],
    },
  ];

  const handleFilterChange = (filterId: string, value: ActiveFilter["value"] | null) => {
    if (value === null) {
      setActiveFilters((prev) => prev.filter((f) => f.filterId !== filterId));
    } else {
      const filter = filters.find((f) => f.id === filterId);
      const label =
        filter?.type === "select"
          ? `${filter.label}: ${filter.options?.find((o) => o.value === value)?.label}`
          : `${filter?.label}: ${value}`;

      setActiveFilters((prev) => {
        const existing = prev.findIndex((f) => f.filterId === filterId);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = { filterId, value, label: label || "" };
          return updated;
        }
        return [...prev, { filterId, value, label: label || "" }];
      });
    }
  };

  return (
    <FiltersBar
      filters={filters}
      activeFilters={activeFilters}
      searchValue={searchValue}
      searchPlaceholder="Search items..."
      onSearchChange={setSearchValue}
      onFilterChange={handleFilterChange}
      onRemoveFilter={(id) => setActiveFilters((prev) => prev.filter((f) => f.filterId !== id))}
      onClearAll={() => {
        setActiveFilters([]);
        setSearchValue("");
      }}
    />
  );
}

function DateRangeFiltersDemo() {
  const [searchValue, setSearchValue] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[]>([]);

  const filters: FilterConfig[] = [
    {
      id: "dateRange",
      label: "Date Range",
      type: "date-range",
      placeholder: "Select dates",
    },
    {
      id: "createdAt",
      label: "Created",
      type: "date",
      placeholder: "Pick date",
    },
  ];

  return (
    <FiltersBar
      filters={filters}
      activeFilters={activeFilters}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      onFilterChange={(filterId, value) => {
        if (value === null) {
          setActiveFilters((prev) => prev.filter((f) => f.filterId !== filterId));
        } else {
          const label = filterId === "dateRange" ? "Date Range" : "Created";
          setActiveFilters((prev) => {
            const existing = prev.findIndex((f) => f.filterId === filterId);
            if (existing >= 0) {
              const updated = [...prev];
              updated[existing] = { filterId, value, label };
              return updated;
            }
            return [...prev, { filterId, value, label }];
          });
        }
      }}
      onRemoveFilter={(id) => setActiveFilters((prev) => prev.filter((f) => f.filterId !== id))}
      onClearAll={() => {
        setActiveFilters([]);
        setSearchValue("");
      }}
    />
  );
}

function MultiSelectDemo() {
  const [searchValue, setSearchValue] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[]>([]);

  const filters: FilterConfig[] = [
    {
      id: "tags",
      label: "Tags",
      type: "multi-select",
      options: [
        { label: "Bug", value: "bug", count: 8 },
        { label: "Feature", value: "feature", count: 12 },
        { label: "Documentation", value: "docs", count: 5 },
        { label: "Enhancement", value: "enhancement", count: 3 },
      ],
    },
  ];

  return (
    <FiltersBar
      filters={filters}
      activeFilters={activeFilters}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      onFilterChange={(filterId, value) => {
        if (value === null) {
          setActiveFilters((prev) => prev.filter((f) => f.filterId !== filterId));
        } else {
          const count = (value as string[]).length;
          setActiveFilters((prev) => {
            const existing = prev.findIndex((f) => f.filterId === filterId);
            if (existing >= 0) {
              const updated = [...prev];
              updated[existing] = { filterId, value, label: `Tags (${count})` };
              return updated;
            }
            return [...prev, { filterId, value, label: `Tags (${count})` }];
          });
        }
      }}
      onRemoveFilter={(id) => setActiveFilters((prev) => prev.filter((f) => f.filterId !== id))}
      onClearAll={() => {
        setActiveFilters([]);
        setSearchValue("");
      }}
    />
  );
}

function QuickFiltersDemo() {
  const [searchValue, setSearchValue] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState<string | null>("all");

  const quickFilters = [
    {
      id: "all",
      label: "All",
      isActive: activeFilter === "all",
      onClick: () => setActiveFilter("all"),
    },
    {
      id: "active",
      label: "Active",
      isActive: activeFilter === "active",
      onClick: () => setActiveFilter("active"),
    },
    {
      id: "pending",
      label: "Pending",
      isActive: activeFilter === "pending",
      onClick: () => setActiveFilter("pending"),
    },
    {
      id: "archived",
      label: "Archived",
      isActive: activeFilter === "archived",
      onClick: () => setActiveFilter("archived"),
    },
  ];

  return (
    <QuickFiltersBar
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      quickFilters={quickFilters}
      actions={
        <Button size="sm" className="text-xs">
          <Plus className="mr-1 h-3 w-3" />
          ADD_NEW
        </Button>
      }
    />
  );
}

export default function FiltersBarPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.109]"
      category="Data Display"
      title="Filters Bar"
      description="A reusable filtering toolbar with search, date range, multi-select filters, and active filter tags. Perfect for data tables and lists."
      importCode={`import {
  FiltersBar,
  QuickFiltersBar,
  FiltersSummary,
  FilterConfig,
  ActiveFilter,
} from "@/components/ui/filters-bar"`}
      mainPreview={{
        preview: (
          <div className="w-full space-y-4 p-4">
            <BasicFiltersDemo />
          </div>
        ),
        code: `const [searchValue, setSearchValue] = useState("");
const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

const filters: FilterConfig[] = [
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "active", count: 12 },
      { label: "Pending", value: "pending", count: 5 },
    ],
  },
];

<FiltersBar
  filters={filters}
  activeFilters={activeFilters}
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  onFilterChange={(filterId, value) => { /* ... */ }}
  onRemoveFilter={(id) => { /* ... */ }}
  onClearAll={() => { /* ... */ }}
/>`,
      }}
      variants={[
        {
          title: "Date Range Filters",
          description: "Date picker and date range filters.",
          preview: (
            <div className="w-full p-4">
              <DateRangeFiltersDemo />
            </div>
          ),
          code: `const filters: FilterConfig[] = [
  {
    id: "dateRange",
    label: "Date Range",
    type: "date-range",
    placeholder: "Select dates",
  },
  {
    id: "createdAt",
    label: "Created",
    type: "date",
    placeholder: "Pick date",
  },
];

<FiltersBar filters={filters} ... />`,
        },
        {
          title: "Multi-Select Filter",
          description: "Filter with multiple selection support.",
          preview: (
            <div className="w-full p-4">
              <MultiSelectDemo />
            </div>
          ),
          code: `const filters: FilterConfig[] = [
  {
    id: "tags",
    label: "Tags",
    type: "multi-select",
    options: [
      { label: "Bug", value: "bug", count: 8 },
      { label: "Feature", value: "feature", count: 12 },
    ],
  },
];

<FiltersBar filters={filters} ... />`,
        },
        {
          title: "Quick Filters Bar",
          description: "Simpler bar with quick filter buttons.",
          preview: (
            <div className="w-full p-4">
              <QuickFiltersDemo />
            </div>
          ),
          code: `const quickFilters = [
  { id: "all", label: "All", isActive: true, onClick: () => {} },
  { id: "active", label: "Active", isActive: false, onClick: () => {} },
];

<QuickFiltersBar
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  quickFilters={quickFilters}
  actions={<Button size="sm">ADD_NEW</Button>}
/>`,
        },
        {
          title: "With Actions",
          description: "Filter bar with action buttons.",
          preview: (
            <div className="w-full p-4">
              <FiltersBar
                filters={[]}
                activeFilters={[]}
                searchValue=""
                onSearchChange={() => {}}
                actions={
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="mr-1 h-3 w-3" />
                      EXPORT
                    </Button>
                    <Button size="sm" className="text-xs">
                      <Plus className="mr-1 h-3 w-3" />
                      ADD_NEW
                    </Button>
                  </div>
                }
              />
            </div>
          ),
          code: `<FiltersBar
  filters={[]}
  activeFilters={[]}
  searchValue=""
  onSearchChange={() => {}}
  actions={
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <Download className="mr-1 h-3 w-3" />
        EXPORT
      </Button>
      <Button size="sm">
        <Plus className="mr-1 h-3 w-3" />
        ADD_NEW
      </Button>
    </div>
  }
/>`,
        },
        {
          title: "Filters Summary",
          description: "Display filtered vs total count.",
          preview: (
            <div className="w-full space-y-2 p-4">
              <FiltersSummary totalCount={150} filteredCount={42} entityName="users" />
              <FiltersSummary totalCount={150} filteredCount={150} entityName="users" />
            </div>
          ),
          code: `<FiltersSummary
  totalCount={150}
  filteredCount={42}
  entityName="users"
/>
// Output: "Showing 42 of 150 users"

<FiltersSummary
  totalCount={150}
  filteredCount={150}
  entityName="users"
/>
// Output: "150 users"`,
        },
      ]}
      props={[
        {
          name: "filters",
          type: "FilterConfig[]",
          description: "Array of filter configurations.",
        },
        {
          name: "activeFilters",
          type: "ActiveFilter[]",
          description: "Currently active filters with values.",
        },
        {
          name: "searchValue",
          type: "string",
          description: "Current search input value.",
        },
        {
          name: "searchPlaceholder",
          type: "string",
          default: '"Search..."',
          description: "Placeholder text for search input.",
        },
        {
          name: "showSearch",
          type: "boolean",
          default: "true",
          description: "Show/hide search input.",
        },
        {
          name: "onSearchChange",
          type: "(value: string) => void",
          description: "Search value change handler.",
        },
        {
          name: "onFilterChange",
          type: "(filterId: string, value) => void",
          description: "Filter value change handler.",
        },
        {
          name: "onRemoveFilter",
          type: "(filterId: string) => void",
          description: "Remove single filter handler.",
        },
        {
          name: "onClearAll",
          type: "() => void",
          description: "Clear all filters handler.",
        },
        {
          name: "actions",
          type: "React.ReactNode",
          description: "Additional actions (buttons) on the right.",
        },
      ]}
      accessibility={[
        "All filter controls are keyboard accessible",
        "Filter tags have aria-labels for screen readers",
        "Clear buttons have descriptive labels",
        "Calendar components support keyboard navigation",
        "Multi-select checkboxes properly labeled",
      ]}
      previous={{ title: "Empty State", href: "/docs/components/empty-state" }}
      next={{ title: "KPI Card", href: "/docs/components/kpi-card" }}
    />
  );
}
