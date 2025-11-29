/**
 * DocsFeatureList - Grid of features with icons
 * For displaying feature highlights in documentation
 */

import { LucideIcon } from "lucide-react";
import { DocsCard } from "./docs-card";
import { docsTypography } from "../typography";
import { docsSpacing } from "../spacing";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface DocsFeatureListProps {
  /** Array of features to display */
  features: Feature[];
  /** Number of columns (2 or 3) */
  columns?: 2 | 3;
}

export function DocsFeatureList({ features, columns = 3 }: DocsFeatureListProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${docsSpacing.featureGrid} ${gridCols}`}>
      {features.map((feature, index) => (
        <DocsCard key={index}>
          <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
          <h3 className={`mt-2 uppercase ${docsTypography.h4}`}>{feature.title}</h3>
          <p className={`mt-1 ${docsTypography.caption}`}>{feature.description}</p>
        </DocsCard>
      ))}
    </div>
  );
}
