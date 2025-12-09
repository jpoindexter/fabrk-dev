/**
 * DocsHeader - Page header for all documentation pages
 * Terminal-style badge + title + description
 */

import { docsTypography } from '../typography';

interface DocsHeaderProps {
  /** Terminal code badge e.g. "[0x40]" */
  code: string;
  /** Category name e.g. "Features", "Components" */
  category: string;
  /** Page title e.g. "Database", "Button" */
  title: string;
  /** Page description */
  description: string;
}

export function DocsHeader({ code, category, title, description }: DocsHeaderProps) {
  return (
    <div>
      {/* Terminal-style badge */}
      <div className="border-border bg-card inline-block border px-4 py-1">
        <span className={docsTypography.badge}>
          [ {code} <span className="uppercase">{category}</span> ]{' '}
          <span className="uppercase">{title}</span>
        </span>
      </div>

      {/* Page title */}
      <h1 className={`mt-4 uppercase ${docsTypography.h1}`}>{title}</h1>

      {/* Description */}
      <p className={`mt-2 ${docsTypography.body}`}>&gt; {description}</p>
    </div>
  );
}
