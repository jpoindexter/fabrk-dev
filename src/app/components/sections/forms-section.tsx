/**
 * ✅ FABRK COMPONENT
 * Forms Section - All form input components
 * Production-ready ✓
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatLabel } from "@/design-system";

export function FormsSection() {
  return (
    <section id="forms" className="space-y-6">
      <div>
        <span className="text-muted-foreground text-xs">[0x20]</span>
        <h2 className="text-2xl font-semibold tracking-tight">FORM_COMPONENTS</h2>
        <p className="text-muted-foreground text-xs">
          &gt; Input elements with clean borders and focus states
        </p>
      </div>

      <TerminalCard>
        <TerminalCardHeader
          code="0x20"
          title="Input_Fields"
          meta="Text inputs with different types"
        />
        <TerminalCardContent padding="md" className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">{formatLabel("Text Input")}</Label>
            <Input id="text" placeholder="Enter text..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{formatLabel("Email")}</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{formatLabel("Password")}</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">{formatLabel("Disabled")}</Label>
            <Input id="disabled" placeholder="Disabled input" disabled />
          </div>
        </TerminalCardContent>
      </TerminalCard>

      <TerminalCard>
        <TerminalCardHeader code="0x21" title="Textarea" meta="Multi-line text input" />
        <TerminalCardContent padding="md" className="max-w-md space-y-2">
          <Label htmlFor="message-textarea">{formatLabel("Message")}</Label>
          <Textarea id="message-textarea" placeholder="Type your message here..." rows={4} />
        </TerminalCardContent>
      </TerminalCard>

      <TerminalCard>
        <TerminalCardHeader code="0x22" title="Select" meta="Dropdown selection" />
        <TerminalCardContent padding="md" className="max-w-md space-y-2">
          <Label htmlFor="select-option">{formatLabel("Select Option")}</Label>
          <Select>
            <SelectTrigger id="select-option" aria-label="Select an option">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </TerminalCardContent>
      </TerminalCard>

      <TerminalCard>
        <TerminalCardHeader code="0x23" title="Checkbox_And_Radio" meta="Selection controls" />
        <TerminalCardContent padding="md" className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" aria-label="Accept terms and conditions" />
            <Label htmlFor="terms">{formatLabel("Accept terms")}</Label>
          </div>

          <Separator />

          <RadioGroup defaultValue="option1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">{formatLabel("Option 1")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">{formatLabel("Option 2")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="option3" />
              <Label htmlFor="option3">{formatLabel("Option 3")}</Label>
            </div>
          </RadioGroup>
        </TerminalCardContent>
      </TerminalCard>

      <TerminalCard>
        <TerminalCardHeader code="0x24" title="Switch" meta="Toggle control" />
        <TerminalCardContent padding="md" className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="switch1" aria-label="Enable notifications" />
            <Label htmlFor="switch1">{formatLabel("Enable notifications")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="switch2" defaultChecked aria-label="Auto-save enabled" />
            <Label htmlFor="switch2">{formatLabel("Auto-save enabled")}</Label>
          </div>
        </TerminalCardContent>
      </TerminalCard>
    </section>
  );
}
