/**
 * FABRK COMPONENT
 * Step Profile - Profile information form
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

const roles = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "product", label: "Product Manager" },
  { value: "founder", label: "Founder / CEO" },
  { value: "other", label: "Other" },
];

interface StepProfileProps {
  fullName: string;
  role: string;
  onFullNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

export function StepProfile({ fullName, role, onFullNameChange, onRoleChange }: StepProfileProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 font-mono text-xl font-semibold">Your Profile</h2>
        <p className="text-muted-foreground font-mono text-xs">Tell us a bit about yourself</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="font-mono text-xs">[FULL_NAME]:</Label>
          <Input
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="rounded-none font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-xs">[YOUR_ROLE]:</Label>
          <Select value={role} onValueChange={onRoleChange}>
            <SelectTrigger className="rounded-none font-mono text-sm">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {roles.map((role) => (
                <SelectItem
                  key={role.value}
                  value={role.value}
                  className="text-left font-mono text-sm"
                >
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
