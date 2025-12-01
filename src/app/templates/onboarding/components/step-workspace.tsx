/**
 * FABRK COMPONENT
 * Step Workspace - Workspace configuration form
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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

interface StepWorkspaceProps {
  workspaceName: string;
  teamSize: string;
  selectedUseCases: string[];
  onWorkspaceNameChange: (value: string) => void;
  onTeamSizeChange: (value: string) => void;
  onToggleUseCase: (id: string) => void;
}

export function StepWorkspace({
  workspaceName,
  teamSize,
  selectedUseCases,
  onWorkspaceNameChange,
  onTeamSizeChange,
  onToggleUseCase,
}: StepWorkspaceProps) {
  return (
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
            value={workspaceName}
            onChange={(e) => onWorkspaceNameChange(e.target.value)}
            className="rounded-none font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-xs">[TEAM_SIZE]:</Label>
          <Select value={teamSize} onValueChange={onTeamSizeChange}>
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
              <div key={useCase.id} className="flex items-center space-x-2">
                <Checkbox
                  id={useCase.id}
                  checked={selectedUseCases.includes(useCase.id)}
                  onCheckedChange={() => onToggleUseCase(useCase.id)}
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
  );
}
