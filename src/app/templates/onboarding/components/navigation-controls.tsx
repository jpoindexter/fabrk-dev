/**
 * FABRK COMPONENT
 * Navigation Controls - Back/Next buttons
 */

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationControlsProps {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
}

export function NavigationControls({
  currentStep,
  onBack,
  onNext,
}: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-between border-t border-border px-6 py-4">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 1}
        className="rounded-none font-mono text-xs"
      >
        <ArrowLeft className="h-3 w-3 mr-1" />
        BACK
      </Button>
      <Button onClick={onNext} className="rounded-none font-mono text-xs">
        {currentStep === 4 ? "COMPLETE" : "NEXT"}
        <ArrowRight className="h-3 w-3 ml-1" />
      </Button>
    </div>
  );
}
