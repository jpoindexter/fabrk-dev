import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { FormInput, Calendar, ToggleLeft, List } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Form Components - Fabrk Docs",
  description: "Form inputs, selects, checkboxes, and validation. React Hook Form integration with Zod schemas.",
};

export default function FormsComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Form_Components"
      description="Form components including inputs, selects, checkboxes, and validation."
      overview="17+ form components including text inputs, password fields, selects, checkboxes, switches, date/time pickers, and multi-step form wizard."
      features={[
        { icon: FormInput, title: "Inputs", description: "Text, password, search, number, OTP." },
        { icon: List, title: "Selects", description: "Single, multi, combobox, autocomplete." },
        { icon: ToggleLeft, title: "Toggles", description: "Checkbox, switch, radio groups." },
        { icon: Calendar, title: "Date/Time", description: "Date picker, range, time picker." },
      ]}
      usage={[
        {
          title: "Basic Input",
          description: "Text input with label",
          code: `import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BasicInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
      />
    </div>
  );
}`,
          language: "tsx",
        },
        {
          title: "Password Input",
          description: "Password with visibility toggle",
          code: `import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";

export function PasswordInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <InputPassword id="password" />
    </div>
  );
}

// InputPassword includes:
// - Eye icon toggle for show/hide password
// - Accessible button for toggling`,
          language: "tsx",
        },
        {
          title: "Select Dropdown",
          description: "Single select dropdown",
          code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function SelectExample() {
  return (
    <div className="space-y-2">
      <Label>Country</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}`,
          language: "tsx",
        },
        {
          title: "Checkbox and Switch",
          description: "Toggle inputs",
          code: `import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ToggleInputs() {
  return (
    <div className="space-y-4">
      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>

      {/* Switch */}
      <div className="flex items-center space-x-2">
        <Switch id="notifications" />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
    </div>
  );
}`,
          language: "tsx",
        },
        {
          title: "Date Picker",
          description: "Calendar-based date selection",
          code: `import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

export function DatePickerExample() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-2">
      <Label>Select Date</Label>
      <DatePicker date={date} onDateChange={setDate} />
    </div>
  );
}`,
          language: "tsx",
        },
        {
          title: "Complete Form",
          description: "Full signup form example",
          code: `import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/ui/form-error";

export function SignupForm() {
  const [error, setError] = useState("");

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <InputPassword id="password" required />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm">
          I agree to the terms and conditions
        </Label>
      </div>

      {error && <FormError message={error} />}

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Buttons", href: "/docs/components/buttons" }}
      next={{ title: "Data Display", href: "/docs/components/data-display" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Input</code> - Text input field</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">InputPassword</code> - Password with toggle</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">InputSearch</code> - Search with icon</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">InputNumber</code> - Number with controls</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">InputOTP</code> - One-time password</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Select</code> - Dropdown select</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">MultiSelect</code> - Multiple selection</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Combobox</code> - Searchable select</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Checkbox</code> - Checkbox input</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Switch</code> - Toggle switch</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">DatePicker</code> - Date selection</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">DateRangePicker</code> - Date range</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">TimePicker</code> - Time selection</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Label</code> - Form label</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">FormError</code> - Error message</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">MultiStepForm</code> - Multi-step wizard</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/data-display">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Data Display</h3>
                <p className={docsTypography.body}>Cards, tables, badges</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/modals">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Modals</h3>
                <p className={docsTypography.body}>Dialogs and sheets</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
