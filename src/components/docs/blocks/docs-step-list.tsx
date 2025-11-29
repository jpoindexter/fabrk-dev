/**
 * DocsStepList - List of numbered steps
 * Wraps multiple DocsStep components with consistent spacing
 */

import { DocsStep } from "./docs-step";
import { DocsCard } from "./docs-card";
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

  // Card variant - each step in its own card
  return (
    <div className={docsSpacing.stepList}>
      {steps.map((step, index) => (
        <DocsCard key={index}>
          <DocsStep
            number={index + 1}
            title={step.title}
            description={step.description}
            code={step.code}
            language={step.language}
            tip={step.tip}
          />
        </DocsCard>
      ))}
    </div>
  );
}
