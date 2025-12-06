/**
 * FABRK COMPONENT
 * Features Card - Template features documentation
 */

import { FeaturesCard as BaseFeaturesCard } from "@/components/ui/card";

export function FeaturesCard() {
  return (
    <BaseFeaturesCard
      code="0x04"
      title="FEATURES"
      features={[
        "Search bar with query display",
        "Category filter sidebar",
        "Tag checkboxes with multi-select",
        "Sort dropdown (relevance, newest, rating)",
        "Grid/list view toggle",
        "Result cards with ratings",
        "Pagination controls",
      ]}
      note="Connect to your search backend (Algolia, Elasticsearch, etc.) for real results."
    />
  );
}
