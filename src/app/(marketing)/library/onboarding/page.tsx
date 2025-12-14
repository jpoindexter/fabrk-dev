/**
 * FABRK COMPONENT
 * Onboarding Flow Template - Terminal console style
 * Production-ready
 */

'use client';

import { useState } from 'react';
import { User, Building2, Settings, CheckCircle2, Sparkles } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { TemplateShowcasePage } from '@/components/library';
import { ProgressSection } from './components/progress-section';
import { StepWelcome } from './components/step-welcome';
import { StepProfile } from './components/step-profile';
import { StepWorkspace } from './components/step-workspace';
import { StepPreferences } from './components/step-preferences';
import { StepComplete } from './components/step-complete';
import { NavigationControls } from './components/navigation-controls';

const templateCode = `"use client";

import { useState } from "react";
import { User, Building2, Settings, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Welcome", icon: Sparkles },
  { id: 2, name: "Profile", icon: User },
  { id: 3, name: "Workspace", icon: Building2 },
  { id: 4, name: "Preferences", icon: Settings },
  { id: 5, name: "Complete", icon: CheckCircle2 },
];

export default function OnboardingFlow() {
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

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader code="0x00" title="ONBOARDING" />

        {/* Progress indicator */}
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <step.icon className={cn(
                  "h-6 w-6",
                  currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(mode.font, "text-xs mt-2")}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>

          {/* Step content goes here */}
          <div className="min-h-[400px]">
            {/* Add step components */}
          </div>

          {/* Navigation buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between pt-6">
              <Button
                onClick={handleBack}
                disabled={currentStep === 1}
                variant="outline"
                className={cn(mode.radius, mode.font, "text-xs")}
              >
                &lt; BACK
              </Button>
              <Button
                onClick={handleNext}
                className={cn(mode.radius, mode.font, "text-xs")}
              >
                &gt; NEXT
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}`;

const steps = [
  { id: 1, name: 'Welcome', icon: Sparkles },
  { id: 2, name: 'Profile', icon: User },
  { id: 3, name: 'Workspace', icon: Building2 },
  { id: 4, name: 'Preferences', icon: Settings },
  { id: 5, name: 'Complete', icon: CheckCircle2 },
];

function OnboardingPreview() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    workspaceName: '',
    teamSize: '',
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
    <div className="bg-background/50 flex min-h-[600px] flex-col items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader code="0x00" title="ONBOARDING" />

        <ProgressSection currentStep={currentStep} steps={steps} progress={progress} />

        <div className="min-h-[400px] p-6">
          {currentStep === 1 && <StepWelcome />}

          {currentStep === 2 && (
            <StepProfile
              fullName={formData.fullName}
              role={formData.role}
              onFullNameChange={(value) => setFormData({ ...formData, fullName: value })}
              onRoleChange={(value) => setFormData({ ...formData, role: value })}
            />
          )}

          {currentStep === 3 && (
            <StepWorkspace
              workspaceName={formData.workspaceName}
              teamSize={formData.teamSize}
              selectedUseCases={formData.useCases}
              onWorkspaceNameChange={(value) => setFormData({ ...formData, workspaceName: value })}
              onTeamSizeChange={(value) => setFormData({ ...formData, teamSize: value })}
              onToggleUseCase={toggleUseCase}
            />
          )}

          {currentStep === 4 && (
            <StepPreferences
              emailUpdates={formData.emailUpdates}
              productTips={formData.productTips}
              onEmailUpdatesChange={(checked) =>
                setFormData({ ...formData, emailUpdates: checked })
              }
              onProductTipsChange={(checked) => setFormData({ ...formData, productTips: checked })}
            />
          )}

          {currentStep === 5 && <StepComplete formData={formData} />}
        </div>

        {currentStep < 5 && (
          <NavigationControls currentStep={currentStep} onBack={handleBack} onNext={handleNext} />
        )}
      </Card>
    </div>
  );
}

export default function OnboardingTemplate() {
  return (
    <TemplateShowcasePage
      badge="ONBOARDING FLOW"
      title="Onboarding Flow"
      description="Multi-step wizard for new user onboarding with progress tracking"
      templateId="onboarding"
      preview={<OnboardingPreview />}
      code={templateCode}
      fileStructure="app/onboarding/page.tsx"
      features={[
        '5-step onboarding flow',
        'Progress tracking with visual indicators',
        'Form state management',
        'Navigation controls (back/next)',
        'Multi-select use case options',
        'Completion summary',
        'DS-compliant (mode.font, mode.radius)',
      ]}
    />
  );
}
