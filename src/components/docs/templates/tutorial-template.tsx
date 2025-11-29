/**
 * TutorialTemplate - Template for step-by-step tutorial pages
 * Used by: /docs/tutorials/* (guide-style content)
 */

import { LucideIcon, Clock, BarChart } from "lucide-react";
import { DocsHeader } from "../blocks/docs-header";
import { DocsSection } from "../blocks/docs-section";
import { DocsCard } from "../blocks/docs-card";
import { DocsStepList } from "../blocks/docs-step-list";
import { DocsCallout } from "../blocks/docs-callout";
import { DocsNavFooter } from "../blocks/docs-nav-footer";
import { CodeBlock } from "@/components/ui/code-block";
import { docsTypography } from "../typography";
import { docsSpacing } from "../spacing";

interface Prerequisite {
  title: string;
  description?: string;
}

interface TutorialStep {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  tip?: string;
}

interface NavLink {
  title: string;
  href: string;
}

interface TutorialTemplateProps {
  /** Terminal code badge e.g. "[0x50]" */
  code: string;
  /** Category e.g. "Tutorial" */
  category?: string;
  /** Tutorial title */
  title: string;
  /** Tutorial description */
  description: string;
  /** Difficulty level */
  difficulty?: "beginner" | "intermediate" | "advanced";
  /** Estimated time to complete */
  timeEstimate?: string;
  /** What you'll learn */
  learningObjectives?: string[];
  /** Prerequisites before starting */
  prerequisites?: Prerequisite[];
  /** Tutorial steps */
  steps: TutorialStep[];
  /** Final result code (optional) */
  resultCode?: string;
  /** Result code language */
  resultLanguage?: string;
  /** Result description */
  resultDescription?: string;
  /** Next steps or related tutorials */
  nextSteps?: string[];
  /** Warning callout (optional) */
  warning?: string;
  /** Previous page link */
  previous?: NavLink;
  /** Next page link */
  next?: NavLink;
  /** Additional sections */
  children?: React.ReactNode;
}

const difficultyColors = {
  beginner: "text-green-500",
  intermediate: "text-yellow-500",
  advanced: "text-red-500",
};

export function TutorialTemplate({
  code,
  category = "Tutorial",
  title,
  description,
  difficulty = "beginner",
  timeEstimate,
  learningObjectives,
  prerequisites,
  steps,
  resultCode,
  resultLanguage = "typescript",
  resultDescription,
  nextSteps,
  warning,
  previous,
  next,
  children,
}: TutorialTemplateProps) {
  return (
    <div className={docsSpacing.pageSections}>
      {/* Header */}
      <DocsHeader
        code={code}
        category={category}
        title={title}
        description={description}
      />

      {/* Warning (if any) */}
      {warning && (
        <DocsCallout variant="warning" title="Important">
          {warning}
        </DocsCallout>
      )}

      {/* Tutorial Meta */}
      <DocsCard>
        <div className="flex flex-wrap gap-6">
          {difficulty && (
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className={docsTypography.label}>Difficulty:</span>
              <span className={`font-mono text-sm capitalize ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
            </div>
          )}
          {timeEstimate && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className={docsTypography.label}>Time:</span>
              <span className={docsTypography.body}>{timeEstimate}</span>
            </div>
          )}
        </div>
      </DocsCard>

      {/* Learning Objectives */}
      {learningObjectives && learningObjectives.length > 0 && (
        <DocsSection title="What You'll Learn">
          <DocsCard>
            <ul className="list-disc list-inside space-y-2">
              {learningObjectives.map((objective, index) => (
                <li key={index} className={docsTypography.body}>
                  {objective}
                </li>
              ))}
            </ul>
          </DocsCard>
        </DocsSection>
      )}

      {/* Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <DocsSection title="Prerequisites">
          <DocsCard>
            <ul className="list-disc list-inside space-y-2">
              {prerequisites.map((prereq, index) => (
                <li key={index} className={docsTypography.body}>
                  <span className="font-semibold">{prereq.title}</span>
                  {prereq.description && (
                    <span className="text-muted-foreground"> - {prereq.description}</span>
                  )}
                </li>
              ))}
            </ul>
          </DocsCard>
        </DocsSection>
      )}

      {/* Tutorial Steps */}
      <DocsSection title="Steps">
        <DocsStepList steps={steps} variant="card" />
      </DocsSection>

      {/* Final Result */}
      {resultCode && (
        <DocsSection title="Final Result">
          <DocsCard>
            {resultDescription && (
              <p className={docsTypography.body}>{resultDescription}</p>
            )}
            <CodeBlock code={resultCode} language={resultLanguage} />
          </DocsCard>
        </DocsSection>
      )}

      {/* Next Steps */}
      {nextSteps && nextSteps.length > 0 && (
        <DocsSection title="Next Steps">
          <DocsCard>
            <ul className="list-disc list-inside space-y-2">
              {nextSteps.map((step, index) => (
                <li key={index} className={docsTypography.body}>
                  {step}
                </li>
              ))}
            </ul>
          </DocsCard>
        </DocsSection>
      )}

      {/* Additional Content */}
      {children}

      {/* Navigation Footer */}
      <DocsNavFooter previous={previous} next={next} />
    </div>
  );
}
