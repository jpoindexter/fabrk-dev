import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Form Components - Fabrk Docs",
  description: "Form inputs, selects, checkboxes, and validation. React Hook Form integration with Zod schemas.",
};

export default function FormsComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Forms & Inputs</h1>
        <p className="mt-2 text-muted-foreground">
          Form components including inputs, selects, checkboxes, and validation.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Input</code> - Text input field</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">InputPassword</code> - Password input with toggle visibility</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">InputSearch</code> - Search input with icon</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">InputNumber</code> - Number input with increment/decrement</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">InputOTP</code> - One-time password input</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">InputColor</code> - Color picker input</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Select</code> - Dropdown select</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">MultiSelect</code> - Multiple selection dropdown</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Combobox</code> - Searchable select with autocomplete</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Checkbox</code> - Checkbox input</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Switch</code> - Toggle switch</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">DatePicker</code> - Date selection</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">DateRangePicker</code> - Date range selection</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">TimePicker</code> - Time selection</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Label</code> - Form label</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">FormError</code> - Error message display</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">MultiStepForm</code> - Multi-step form wizard</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Import Examples</h2>
          <CodeBlock language="typescript" code={`// Basic inputs
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { InputSearch } from "@/components/ui/input-search";
import { InputNumber } from "@/components/ui/input-number";
import { InputOTP } from "@/components/ui/input-otp";
import { InputColor } from "@/components/ui/input-color";

// Select components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Combobox } from "@/components/ui/combobox";

// Toggle components
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

// Date/time pickers
import { DatePicker } from "@/components/ui/date-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { TimePicker } from "@/components/ui/time-picker";

// Form utilities
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";
import { MultiStepForm } from "@/components/ui/multi-step-form";`} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">Basic Input</h3>
          <CodeBlock language="tsx" code={`import { Input } from "@/components/ui/input";
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
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Password Input</h3>
          <CodeBlock language="tsx" code={`import { InputPassword } from "@/components/ui/input-password";
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
// - Accessible button for toggling`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Select</h3>
          <CodeBlock language="tsx" code={`import {
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
          <SelectItem value="au">Australia</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Checkbox and Switch</h3>
          <CodeBlock language="tsx" code={`import { Checkbox } from "@/components/ui/checkbox";
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
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Date Picker</h3>
          <CodeBlock language="tsx" code={`import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

export function DatePickerExample() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-2">
      <Label>Select Date</Label>
      <DatePicker date={date} onDateChange={setDate} />
    </div>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Complete Form</h3>
          <CodeBlock language="tsx" code={`import { Input } from "@/components/ui/input";
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
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">OTP Input</h3>
          <CodeBlock language="tsx" code={`import { InputOTP } from "@/components/ui/input-otp";

export function OTPInput() {
  return (
    <div className="space-y-2">
      <Label>Verification Code</Label>
      <InputOTP maxLength={6} />
      <p className="text-sm text-muted-foreground">
        Enter the code sent to your email
      </p>
    </div>
  );
}`} />
        </CardContent>
      </Card>
    </div>
  );
}
