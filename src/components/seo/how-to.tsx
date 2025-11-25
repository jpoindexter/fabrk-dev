/**
 * HowTo Component
 * AEO-optimized tutorial/guide component
 * Appears in featured snippets and voice search results
 */

import { Check } from "lucide-react";
import { generateHowToSchema } from "@/lib/seo/structured-data";
import { SchemaScript } from "./schema-script";

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToProps {
  title: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  estimatedCost?: string;
  className?: string;
}

/**
 * AEO-optimized how-to guide component
 * Perfect for tutorials and step-by-step guides
 *
 * @example
 * <HowTo
 *   title="How to Deploy Your SaaS"
 *   description="Step-by-step guide to deploying on Vercel"
 *   totalTime="PT15M"
 *   steps={[
 *     { name: "Step 1", text: "Connect your repository..." },
 *     { name: "Step 2", text: "Configure environment variables..." }
 *   ]}
 * />
 */
export function HowTo({
  title,
  description,
  steps,
  totalTime,
  estimatedCost,
  className,
}: HowToProps) {
  const schema = generateHowToSchema({
    name: title,
    description,
    steps,
    totalTime,
    estimatedCost,
  });

  return (
    <>
      <SchemaScript schema={schema} />

      <div className={className}>
        <h2 className="mb-2 text-3xl font-bold text-foreground">{title}</h2>
        <p className="mb-8 text-lg text-muted-foreground">{description}</p>

        {(totalTime || estimatedCost) && (
          <div className="mb-8 flex gap-6 text-sm text-muted-foreground">
            {totalTime && (
              <div>
                <span className="font-semibold">Total Time:</span> {totalTime}
              </div>
            )}
            {estimatedCost && (
              <div>
                <span className="font-semibold">Cost:</span> {estimatedCost}
              </div>
            )}
          </div>
        )}

        <ol className="space-y-6">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-info text-info-foreground font-semibold">
                {index + 1}
              </div>

              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {step.name}
                </h3>
                <p className="text-muted-foreground">{step.text}</p>

                {step.image && (
                  <img
                    src={step.image}
                    alt={step.name}
                    className="mt-4 rounded-lg border border-gray-200"
                  />
                )}
              </div>

              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                <Check className="h-5 w-5 text-success" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
