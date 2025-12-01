"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function MultiStepFormPage() {
  const [step1, setStep1] = useState(0);
  const [step2, setStep2] = useState(0);
  const [step3, setStep3] = useState(0);

  return (
    <ComponentShowcaseTemplate
      code="[UI.39]"
      category="Components"
      title="Multi-Step Form"
      description="A multi-step form wizard with progress tracking and navigation controls."
      importCode={`import { MultiStepForm } from "@/components/ui/multi-step-form"`}
      mainPreview={{
        preview: (
          <MultiStepForm
            steps={["Personal", "Account", "Complete"]}
            currentStep={step1}
            onNext={() => setStep1((s) => Math.min(s + 1, 2))}
            onPrev={() => setStep1((s) => Math.max(s - 1, 0))}
          >
            <div className="space-y-4">
              {step1 === 0 && (
                <>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs text-muted-foreground">
                      [NAME]
                    </Label>
                    <Input placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs text-muted-foreground">
                      [EMAIL]
                    </Label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </>
              )}
              {step1 === 1 && (
                <>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs text-muted-foreground">
                      [USERNAME]
                    </Label>
                    <Input placeholder="Choose a username" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs text-muted-foreground">
                      [PASSWORD]
                    </Label>
                    <Input type="password" placeholder="Create password" />
                  </div>
                </>
              )}
              {step1 === 2 && (
                <div className="rounded-none border border-border bg-card p-6 text-center">
                  <div className="font-mono text-sm text-success">
                    &gt; REGISTRATION COMPLETE
                  </div>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    Your account has been created successfully
                  </p>
                </div>
              )}
            </div>
          </MultiStepForm>
        ),
        code: `const [currentStep, setCurrentStep] = useState(0);

<MultiStepForm
  steps={["Personal", "Account", "Complete"]}
  currentStep={currentStep}
  onNext={() => setCurrentStep(s => Math.min(s + 1, 2))}
  onPrev={() => setCurrentStep(s => Math.max(s - 1, 0))}
>
  {/* Step content goes here */}
</MultiStepForm>`,
      }}
      variants={[
        {
          title: "Custom Steps",
          description: "Multi-step form with custom step labels",
          preview: (
            <MultiStepForm
              steps={["Info", "Preferences", "Review", "Submit"]}
              currentStep={step2}
              onNext={() => setStep2((s) => Math.min(s + 1, 3))}
              onPrev={() => setStep2((s) => Math.max(s - 1, 0))}
            >
              <div className="rounded-none border border-border bg-card p-4">
                <span className="font-mono text-xs text-muted-foreground">
                  [STEP {step2 + 1}]: Content for this step
                </span>
              </div>
            </MultiStepForm>
          ),
          code: `<MultiStepForm
  steps={["Info", "Preferences", "Review", "Submit"]}
  currentStep={currentStep}
  onNext={() => setCurrentStep(s => Math.min(s + 1, 3))}
  onPrev={() => setCurrentStep(s => Math.max(s - 1, 0))}
>
  <div>Step content</div>
</MultiStepForm>`,
        },
        {
          title: "Loading State",
          description: "Multi-step form in loading state",
          preview: <MultiStepForm loading />,
          code: `<MultiStepForm loading />`,
        },
        {
          title: "Error State",
          description: "Multi-step form with error",
          preview: <MultiStepForm error />,
          code: `<MultiStepForm error />`,
        },
        {
          title: "Two Steps",
          description: "Simplified two-step form",
          preview: (
            <MultiStepForm
              steps={["Configure", "Confirm"]}
              currentStep={step3}
              onNext={() => setStep3((s) => Math.min(s + 1, 1))}
              onPrev={() => setStep3((s) => Math.max(s - 1, 0))}
            >
              <div className="rounded-none border border-border bg-card p-6">
                <div className="font-mono text-xs text-primary">
                  &gt; {step3 === 0 ? "CONFIGURE_SETTINGS" : "CONFIRM_CHANGES"}
                </div>
              </div>
            </MultiStepForm>
          ),
          code: `<MultiStepForm
  steps={["Configure", "Confirm"]}
  currentStep={currentStep}
  onNext={() => setCurrentStep(s => Math.min(s + 1, 1))}
  onPrev={() => setCurrentStep(s => Math.max(s - 1, 0))}
>
  <div>Step content</div>
</MultiStepForm>`,
        },
      ]}
      props={[
        {
          name: "steps",
          type: "string[]",
          default: '["Step 1", "Step 2", "Step 3"]',
          description: "Array of step labels displayed in progress indicator",
        },
        {
          name: "currentStep",
          type: "number",
          default: "0",
          description: "Zero-based index of the current step",
        },
        {
          name: "onNext",
          type: "() => void",
          default: "undefined",
          description: "Callback fired when Next button is clicked",
        },
        {
          name: "onPrev",
          type: "() => void",
          default: "undefined",
          description: "Callback fired when Previous button is clicked",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Show loading skeleton state",
        },
        {
          name: "error",
          type: "boolean",
          default: "false",
          description: "Show error message state",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description: "Content to display for the current step",
        },
      ]}
      accessibility={[
        "Progress indicator uses aria-label with step information",
        "Current step marked with aria-current='step'",
        "Previous button automatically disabled on first step",
        "Next button changes to 'Finish' on final step",
        "Keyboard navigation supported through button controls",
        "Step numbers provide clear visual and semantic progress",
      ]}
      previous={{ title: "Multi-Select", href: "/docs/components/multi-select" }}
      next={{ title: "Navigation", href: "/docs/components/navigation" }}
    />
  );
}
