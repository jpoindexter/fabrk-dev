import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, Step } from "./stepper";
import { useState } from "react";
import { Button } from "./button";

const meta: Meta<typeof Stepper> = {
  title: "UI/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps: Step[] = [
  { id: "step1", label: "Account", description: "Create your account" },
  { id: "step2", label: "Profile", description: "Add your details" },
  { id: "step3", label: "Preferences", description: "Set your preferences" },
  { id: "step4", label: "Review", description: "Review and confirm" },
];

export const HorizontalDefault: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    return (
      <div className="w-[800px]">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>
    );
  },
};

export const HorizontalInteractive: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    return (
      <div className="w-[800px] space-y-6">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(index) => setCurrentStep(index)}
        />
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const VerticalDefault: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    return (
      <div className="w-[400px]">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          orientation="vertical"
        />
      </div>
    );
  },
};

export const VerticalInteractive: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    return (
      <div className="w-[400px] space-y-6">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(index) => setCurrentStep(index)}
          orientation="vertical"
        />
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const MultiStepForm: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
      email: "",
      name: "",
      company: "",
      theme: "light",
    });

    const formSteps: Step[] = [
      { id: "account", label: "Account", description: "Login information" },
      { id: "personal", label: "Personal", description: "Your details" },
      { id: "company", label: "Company", description: "Company info" },
      { id: "preferences", label: "Preferences", description: "Customize" },
    ];

    const handleNext = () => {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handlePrevious = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <div className="w-[700px] space-y-6">
        <Stepper
          steps={formSteps}
          currentStep={currentStep}
          onStepClick={(index) => index <= currentStep && setCurrentStep(index)}
        />

        <div className="rounded-brutal border-2 border-brutal bg-card p-6 min-h-[300px]">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Account Information</h3>
              <div className="space-y-2">
                <label className="text-sm font-bold">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-brutal border-2 border-brutal p-2"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Personal Details</h3>
              <div className="space-y-2">
                <label className="text-sm font-bold">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-brutal border-2 border-brutal p-2"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Company Information</h3>
              <div className="space-y-2">
                <label className="text-sm font-bold">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full rounded-brutal border-2 border-brutal p-2"
                  placeholder="Acme Inc."
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Preferences</h3>
              <div className="space-y-2">
                <label className="text-sm font-bold">Theme</label>
                <select
                  value={formData.theme}
                  onChange={(e) =>
                    setFormData({ ...formData, theme: e.target.value })
                  }
                  className="w-full rounded-brutal border-2 border-brutal p-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === formSteps.length - 1}
          >
            {currentStep === formSteps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>

        {currentStep === formSteps.length - 1 && (
          <div className="rounded-brutal border-2 border-brutal bg-primary/10 p-4">
            <p className="text-sm font-bold">Form Data:</p>
            <pre className="text-sm text-muted-foreground mt-2">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
};

export const SimpleSteps: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(2);
    const simpleSteps: Step[] = [
      { id: "1", label: "Step 1" },
      { id: "2", label: "Step 2" },
      { id: "3", label: "Step 3" },
    ];
    return (
      <div className="w-[600px]">
        <Stepper steps={simpleSteps} currentStep={currentStep} />
      </div>
    );
  },
};

export const ManySteps: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(3);
    const manySteps: Step[] = Array.from({ length: 7 }, (_, i) => ({
      id: `step${i + 1}`,
      label: `Step ${i + 1}`,
    }));
    return (
      <div className="w-[900px] space-y-6">
        <Stepper
          steps={manySteps}
          currentStep={currentStep}
          onStepClick={(index) => setCurrentStep(index)}
        />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Current: Step {currentStep + 1} of {manySteps.length}
          </p>
        </div>
      </div>
    );
  },
};
