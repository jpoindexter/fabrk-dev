import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Button Components - Fabrk Docs",
  description: "Button variants for primary, secondary, outline, ghost, and destructive actions. Multiple sizes and states.",
};

export default function ButtonsComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Buttons</h1>
        <p className="mt-2 text-muted-foreground">
          Button components with multiple variants, sizes, and states.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Variants</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">default</code> - Primary button with solid background</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">secondary</code> - Secondary style with muted background</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">outline</code> - Bordered button with transparent background</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">ghost</code> - Minimal button, background on hover</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">link</code> - Styled as a link</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">destructive</code> - For dangerous actions (delete, etc.)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Import Example</h2>
          <CodeBlock language="typescript" code={`import { Button } from "@/components/ui/button";`} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">Button Variants</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Button Sizes</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Button with Icon</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Loader2 } from "lucide-react";

export function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Icon before text */}
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Send Email
      </Button>

      {/* Icon after text */}
      <Button>
        Next Step
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Icon only */}
      <Button size="icon" variant="outline">
        <Mail className="h-4 w-4" />
      </Button>
    </div>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Loading State</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button disabled={isLoading} onClick={() => setIsLoading(true)}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Processing..." : "Submit"}
    </Button>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Button as Link</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ButtonAsLink() {
  return (
    <>
      {/* Using asChild prop */}
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>

      {/* External link */}
      <Button asChild variant="outline">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </Button>
    </>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Button Group</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";

export function ButtonGroup() {
  return (
    <div className="flex">
      <Button variant="outline" className="rounded-r-none">
        Left
      </Button>
      <Button variant="outline" className="rounded-none border-x-0">
        Center
      </Button>
      <Button variant="outline" className="rounded-l-none">
        Right
      </Button>
    </div>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Full Width Button</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";

export function FullWidthButton() {
  return (
    <Button className="w-full">
      Create Account
    </Button>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Disabled State</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";

export function DisabledButton() {
  return (
    <div className="flex gap-4">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
    </div>
  );
}`} />
        </CardContent>
      </Card>
    </div>
  );
}
