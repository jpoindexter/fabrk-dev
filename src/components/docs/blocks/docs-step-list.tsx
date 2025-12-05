/**
 * DocsStepList - List of numbered steps
 * Wraps multiple DocsStep components with consistent spacing
 */

import { DocsStep } from "./docs-step";
import { docsSpacing } from "../spacing";

interface Step {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  tip?: string;
}

interface DocsStepListProps {
  /** Array of steps */
  steps: Step[];
  /** Variant: "card" wraps each step in a card, "inline" shows steps without cards */
  variant?: "card" | "inline";
}

export function DocsStepList({ steps, variant = "card" }: DocsStepListProps) {
  if (variant === "inline") {
    return (
      <div className={docsSpacing.stepList}>
        {steps.map((step, index) => (
          <DocsStep
            key={index}
            number={index + 1}
            title={step.title}
            description={step.description}
            code={step.code}
            language={step.language}
            tip={step.tip}
          />
        ))}
      </div>
    );
  }

  // Card variant - terminal style with [ [0xXX] TITLE ] format
  return (
    <div className={docsSpacing.stepList}>
      {steps.map((step, index) => {
        const hexCode = (index + 1).toString(16).toUpperCase().padStart(2, '0');
        const titleSlug = step.title.toUpperCase().replace(/\s+/g, '_');
        return (
          <div key={index} className="border border-border bg-card">
            {/* Terminal header */}
            <div className="border-b border-border px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">
                [ [0x{hexCode}] {titleSlug} ]
              </span>
            </div>
            {/* Content */}
            <div className="p-4">
              {step.description && (
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  <span className="text-muted-foreground">DESC: </span>
                  <span className="text-foreground">{step.description}</span>
                </p>
              )}
              {step.code && (
                <DocsStep
                  number={index + 1}
                  title=""
                  code={step.code}
                  language={step.language}
                  tip={step.tip}
                />
              )}
              {!step.code && step.tip && (
                <p className="font-mono text-xs text-muted-foreground border-l-2 border-primary/50 pl-4">
                  <span className="font-semibold uppercase text-primary">Tip:</span> {step.tip}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
