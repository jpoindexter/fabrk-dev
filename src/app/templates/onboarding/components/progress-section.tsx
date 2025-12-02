/**
 * FABRK COMPONENT
 * Progress Section - Progress bar with step indicators
 */

import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface Step {
  id: number;
  name: string;
  icon: LucideIcon;
}

interface ProgressSectionProps {
  currentStep: number;
  steps: Step[];
  progress: number;
}

export function ProgressSection({
  currentStep,
  steps,
  progress,
}: ProgressSectionProps) {
  return (
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-muted-foreground">
          [PROGRESS]: STEP {currentStep}/{steps.length}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress value={progress} className="h-1" />

      {/* Step Indicators */}
      <div className="flex items-center justify-between mt-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 flex items-center justify-center border ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                      ? "border-success bg-success/10 text-success"
                      : "border-border text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`font-mono text-xs ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                      ? "text-success"
                      : "text-muted-foreground"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
