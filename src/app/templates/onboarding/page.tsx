/**
 * FABRK COMPONENT
 * Onboarding Flow Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Building2,
  Settings,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const steps = [
  { id: 1, name: "Welcome", icon: Sparkles },
  { id: 2, name: "Profile", icon: User },
  { id: 3, name: "Workspace", icon: Building2 },
  { id: 4, name: "Preferences", icon: Settings },
  { id: 5, name: "Complete", icon: CheckCircle2 },
];

const roles = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "product", label: "Product Manager" },
  { value: "founder", label: "Founder / CEO" },
  { value: "other", label: "Other" },
];

const teamSizes = [
  { value: "1", label: "Just me" },
  { value: "2-5", label: "2-5 people" },
  { value: "6-20", label: "6-20 people" },
  { value: "21-50", label: "21-50 people" },
  { value: "50+", label: "50+ people" },
];

const useCases = [
  { id: "saas", label: "Building a SaaS product" },
  { id: "internal", label: "Internal tools" },
  { id: "agency", label: "Client projects" },
  { id: "learning", label: "Learning / Experimenting" },
  { id: "other", label: "Other" },
];

export default function OnboardingTemplate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    workspaceName: "",
    teamSize: "",
    useCases: [] as string[],
    emailUpdates: true,
    productTips: true,
  });

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleUseCase = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      useCases: prev.useCases.includes(id)
        ? prev.useCases.filter((c) => c !== id)
        : [...prev.useCases, id],
    }));
  };

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-3 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: ONBOARDING_FLOW
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Onboarding Flow
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Multi-step wizard for new user onboarding with progress tracking
          </p>
        </div>

        {/* Main Onboarding Card */}
        <div className="border border-border bg-card max-w-2xl mx-auto">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              onboarding.tsx
            </span>
          </div>

          {/* Progress Section */}
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
                  <div
                    key={step.id}
                    className="flex flex-col items-center gap-1"
                  >
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
                      className={`font-mono text-[10px] ${
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

          {/* Step Content */}
          <div className="p-6 min-h-[400px]">
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 mx-auto border border-primary bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Welcome to Fabrk
                  </h2>
                  <p className="font-mono text-sm text-muted-foreground">
                    Let's get you set up in just a few steps. This will only take
                    about 2 minutes.
                  </p>
                </div>
                <div className="border border-border p-4 text-left">
                  <div className="font-mono text-xs text-muted-foreground mb-2">
                    [WHAT_YOULL_SET_UP]:
                  </div>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div>
                      <span className="text-success">&gt;</span> Your profile
                      information
                    </div>
                    <div>
                      <span className="text-success">&gt;</span> Workspace
                      configuration
                    </div>
                    <div>
                      <span className="text-success">&gt;</span> Notification
                      preferences
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Profile */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Your Profile</h2>
                  <p className="font-mono text-xs text-muted-foreground">
                    Tell us a bit about yourself
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-mono text-xs">[FULL_NAME]:</Label>
                    <Input
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="rounded-none font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-xs">[YOUR_ROLE]:</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger className="rounded-none font-mono text-sm">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        {roles.map((role) => (
                          <SelectItem
                            key={role.value}
                            value={role.value}
                            className="font-mono text-sm"
                          >
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Workspace */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Your Workspace</h2>
                  <p className="font-mono text-xs text-muted-foreground">
                    Set up your team workspace
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-mono text-xs">[WORKSPACE_NAME]:</Label>
                    <Input
                      placeholder="Acme Inc"
                      value={formData.workspaceName}
                      onChange={(e) =>
                        setFormData({ ...formData, workspaceName: e.target.value })
                      }
                      className="rounded-none font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-xs">[TEAM_SIZE]:</Label>
                    <Select
                      value={formData.teamSize}
                      onValueChange={(value) =>
                        setFormData({ ...formData, teamSize: value })
                      }
                    >
                      <SelectTrigger className="rounded-none font-mono text-sm">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        {teamSizes.map((size) => (
                          <SelectItem
                            key={size.value}
                            value={size.value}
                            className="font-mono text-sm"
                          >
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-xs">[PRIMARY_USE_CASE]:</Label>
                    <div className="space-y-2">
                      {useCases.map((useCase) => (
                        <div
                          key={useCase.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={useCase.id}
                            checked={formData.useCases.includes(useCase.id)}
                            onCheckedChange={() => toggleUseCase(useCase.id)}
                            className="rounded-none"
                          />
                          <label
                            htmlFor={useCase.id}
                            className="font-mono text-xs cursor-pointer"
                          >
                            {useCase.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Preferences</h2>
                  <p className="font-mono text-xs text-muted-foreground">
                    Customize your experience
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="font-mono text-xs text-muted-foreground">
                    [NOTIFICATION_SETTINGS]:
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border border-border p-3">
                      <div>
                        <div className="font-mono text-sm">Email Updates</div>
                        <div className="font-mono text-xs text-muted-foreground">
                          Product news and announcements
                        </div>
                      </div>
                      <Checkbox
                        checked={formData.emailUpdates}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            emailUpdates: checked as boolean,
                          })
                        }
                        className="rounded-none"
                      />
                    </div>

                    <div className="flex items-center justify-between border border-border p-3">
                      <div>
                        <div className="font-mono text-sm">Product Tips</div>
                        <div className="font-mono text-xs text-muted-foreground">
                          Helpful tips to get the most out of Fabrk
                        </div>
                      </div>
                      <Checkbox
                        checked={formData.productTips}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            productTips: checked as boolean,
                          })
                        }
                        className="rounded-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Complete */}
            {currentStep === 5 && (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 mx-auto border border-success bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">You're All Set!</h2>
                  <p className="font-mono text-sm text-muted-foreground">
                    Your account is ready. Let's start building something amazing.
                  </p>
                </div>

                <div className="border border-border p-4 text-left">
                  <div className="font-mono text-xs text-muted-foreground mb-2">
                    [ACCOUNT_SUMMARY]:
                  </div>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div>
                      <span className="text-muted-foreground">NAME:</span>{" "}
                      {formData.fullName || "Not set"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">ROLE:</span>{" "}
                      {formData.role || "Not set"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">WORKSPACE:</span>{" "}
                      {formData.workspaceName || "Not set"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">TEAM_SIZE:</span>{" "}
                      {formData.teamSize || "Not set"}
                    </div>
                  </div>
                </div>

                <Button className="rounded-none font-mono text-xs">
                  &gt; GO_TO_DASHBOARD
                </Button>
              </div>
            )}
          </div>

          {/* Navigation */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="rounded-none font-mono text-xs"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                BACK
              </Button>
              <Button
                onClick={handleNext}
                className="rounded-none font-mono text-xs"
              >
                {currentStep === 4 ? "COMPLETE" : "NEXT"}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </div>

        {/* Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              features.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">
              [TEMPLATE_FEATURES]:
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> 5-step onboarding wizard
              </div>
              <div>
                <span className="text-success">&gt;</span> Progress bar with step
                indicators
              </div>
              <div>
                <span className="text-success">&gt;</span> Form state management
              </div>
              <div>
                <span className="text-success">&gt;</span> Multiple input types
                (text, select, checkbox)
              </div>
              <div>
                <span className="text-success">&gt;</span> Back/Next navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Completion summary
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal console
                aesthetic
              </div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Connect to your API to persist onboarding data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
