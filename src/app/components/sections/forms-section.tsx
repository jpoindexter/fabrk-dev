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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function FormsSection() {
  return (
    <section id="forms" className="space-y-6">
      <div>
        <span className="text-muted-foreground text-xs">[0x20]</span>
        <h2 className="text-2xl font-bold tracking-tight">FORM_COMPONENTS</h2>
        <p className="text-muted-foreground text-xs">
          &gt; Input elements with clean borders and focus states
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Fields</CardTitle>
          <CardDescription>Text inputs with different types</CardDescription>
        </CardHeader>
        <CardContent className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text Input</Label>
            <Input id="text" placeholder="Enter text..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled</Label>
            <Input id="disabled" placeholder="Disabled input" disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Textarea</CardTitle>
          <CardDescription>Multi-line text input</CardDescription>
        </CardHeader>
        <CardContent className="max-w-md space-y-2">
          <Label htmlFor="message-textarea">Message</Label>
          <Textarea id="message-textarea" placeholder="Type your message here..." rows={4} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select</CardTitle>
          <CardDescription>Dropdown selection</CardDescription>
        </CardHeader>
        <CardContent className="max-w-md space-y-2">
          <Label htmlFor="select-option">Select Option</Label>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Checkbox & Radio</CardTitle>
          <CardDescription>Selection controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" aria-label="Accept terms and conditions" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>

          <Separator />

          <RadioGroup defaultValue="option1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="option3" />
              <Label htmlFor="option3">Option 3</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Switch</CardTitle>
          <CardDescription>Toggle control</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="switch1" aria-label="Enable notifications" />
            <Label htmlFor="switch1">Enable notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="switch2" defaultChecked aria-label="Auto-save enabled" />
            <Label htmlFor="switch2">Auto-save enabled</Label>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
