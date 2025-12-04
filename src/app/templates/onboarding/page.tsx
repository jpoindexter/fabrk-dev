/**
 * FABRK COMPONENT
 * Onboarding Flow Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { User, Building2, Settings, CheckCircle2, Sparkles } from "lucide-react";
import { StyledCard, StyledCardHeader, TemplatePageHeader } from "@/components/ui/card";
import { ProgressSection } from "./components/progress-section";
import { StepWelcome } from "./components/step-welcome";
import { StepProfile } from "./components/step-profile";
import { StepWorkspace } from "./components/step-workspace";
import { StepPreferences } from "./components/step-preferences";
import { StepComplete } from "./components/step-complete";
import { NavigationControls } from "./components/navigation-controls";
import { FeaturesCard } from "./components/features-card";

const steps = [
  { id: 1, name: "Welcome", icon: Sparkles },
  { id: 2, name: "Profile", icon: User },
  { id: 3, name: "Workspace", icon: Building2 },
  { id: 4, name: "Preferences", icon: Settings },
  { id: 5, name: "Complete", icon: CheckCircle2 },
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
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="ONBOARDING_FLOW"
          title="Onboarding Flow"
          description="Multi-step wizard for new user onboarding with progress tracking"
        />

        {/* Main Onboarding Card */}
        <StyledCard className="mx-auto max-w-2xl">
          <StyledCardHeader code="0x00" title="ONBOARDING" />

          <ProgressSection currentStep={currentStep} steps={steps} progress={progress} />

          {/* Step Content */}
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
                onWorkspaceNameChange={(value) =>
                  setFormData({ ...formData, workspaceName: value })
                }
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
                onProductTipsChange={(checked) =>
                  setFormData({ ...formData, productTips: checked })
                }
              />
            )}

            {currentStep === 5 && <StepComplete formData={formData} />}
          </div>

          {/* Navigation */}
          {currentStep < 5 && (
            <NavigationControls currentStep={currentStep} onBack={handleBack} onNext={handleNext} />
          )}
        </StyledCard>

        <FeaturesCard />
      </div>
    </div>
  );
}
