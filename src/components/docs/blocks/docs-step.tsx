/**
 * DocsStep - Single numbered step component
 * Consistent step badge styling across all docs
 */

import { docsTypography } from "../typography";
import { CodeBlock } from "@/components/ui/code-block";

interface DocsStepProps {
  /** Step number (1, 2, 3...) */
  number: number;
  /** Step title */
  title: string;
  /** Step description */
  description?: string;
  /** Optional code snippet */
  code?: string;
  /** Code language for syntax highlighting */
  language?: string;
  /** Optional tip/note */
  tip?: string;
  /** Children for additional content */
  children?: React.ReactNode;
}

export function DocsStep({
  number,
  title,
  description,
  code,
  language = "bash",
  tip,
  children,
}: DocsStepProps) {
  return (
    <div className="space-y-3">
      {/* Step header with number badge */}
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary bg-primary/10 font-mono text-sm font-bold text-primary">
          {number}
        </span>
        <h3 className={`uppercase ${docsTypography.h3}`}>{title}</h3>
      </div>

      {/* Description */}
      {description && (
        <p className={`ml-11 ${docsTypography.body}`}>{description}</p>
      )}

      {/* Code block */}
      {code && (
        <div className="ml-11">
          <CodeBlock code={code} language={language} />
        </div>
      )}

      {/* Tip */}
      {tip && (
        <p className={`ml-11 border-l-2 border-primary/50 pl-3 ${docsTypography.caption}`}>
          <span className="font-bold uppercase text-primary">Tip:</span> {tip}
        </p>
      )}

      {/* Additional children */}
      {children && <div className="ml-11">{children}</div>}
    </div>
  );
}
