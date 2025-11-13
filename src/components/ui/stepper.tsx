"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
  className,
}: StepperProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <nav
      aria-label="Progress"
      className={cn(
        isHorizontal ? "flex items-center justify-between" : "flex flex-col space-y-4",
        className
      )}
    >
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = onStepClick && (isComplete || isCurrent);

        return (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                "flex items-center",
                isHorizontal ? "flex-1" : "w-full"
              )}
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                className={cn(
                  "flex items-center group",
                  isHorizontal ? "flex-1" : "w-full",
                  isClickable && "cursor-pointer"
                )}
              >
                <div className="flex items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-brutal border-2 border-brutal transition-all",
                      isComplete &&
                        "bg-primary text-primary-foreground border-primary shadow-brutal",
                      isCurrent &&
                        !isComplete &&
                        "border-primary text-primary bg-background shadow-brutal",
                      !isComplete &&
                        !isCurrent &&
                        "bg-muted text-muted-foreground",
                      isClickable && "group-hover:scale-110"
                    )}
                  >
                    {isComplete ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  {!isHorizontal && (
                    <div className="ml-4 flex-1 text-left">
                      <p
                        className={cn(
                          "text-sm font-bold transition-colors",
                          isCurrent && "text-foreground",
                          !isCurrent && "text-muted-foreground",
                          isClickable && "group-hover:text-foreground"
                        )}
                      >
                        {step.label}
                      </p>
                      {step.description && (
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {isHorizontal && (
                  <div className="ml-2 flex-1">
                    <p
                      className={cn(
                        "text-sm font-bold transition-colors whitespace-nowrap",
                        isCurrent && "text-foreground",
                        !isCurrent && "text-muted-foreground",
                        isClickable && "group-hover:text-foreground"
                      )}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {step.description}
                      </p>
                    )}
                  </div>
                )}
              </button>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  isHorizontal
                    ? "h-[2px] flex-1 mx-4"
                    : "ml-5 h-8 w-[2px]",
                  index < currentStep
                    ? "bg-primary"
                    : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
