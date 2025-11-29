import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Button Components - Fabrk Docs",
  description: "Button variants for primary, secondary, outline, ghost, and destructive actions. Multiple sizes and states.",
};

export default function ButtonsComponentsPage() {
  return (
    <div className="space-y-16">
      <div>
        <div className="inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x60] COMPONENTS ] BUTTONS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">BUTTON_COMPONENTS</h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Button components with multiple variants, sizes, and states.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary">AVAILABLE_VARIANTS</h2>
          <ul className="font-mono text-sm text-muted-foreground space-y-1">
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">default</code> - Primary button with solid background</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">secondary</code> - Secondary style with muted background</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">outline</code> - Bordered button with transparent background</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">ghost</code> - Minimal button, background on hover</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">link</code> - Styled as a link</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">destructive</code> - For dangerous actions (delete, etc.)</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">IMPORT_EXAMPLE</h2>
        </div>
        <CodeBlock language="typescript" code={`import { Button } from "@/components/ui/button";`} />
      </div>

      <div className="space-y-16">
        <h2 className="font-mono text-lg font-bold text-primary">USAGE_EXAMPLES</h2>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold text-foreground">BUTTON_VARIANTS</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold text-foreground">BUTTON_SIZES</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold text-foreground">BUTTON_WITH_ICON</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold text-foreground">LOADING_STATE</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold text-foreground">BUTTON_AS_LINK</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold text-foreground">BUTTON_GROUP</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold text-foreground">FULL_WIDTH_BUTTON</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";

export function FullWidthButton() {
  return (
    <Button className="w-full">
      Create Account
    </Button>
  );
}`} />
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold text-foreground">DISABLED_STATE</h3>
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";

export function DisabledButton() {
  return (
    <div className="flex gap-4">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
    </div>
  );
}`} />
        </div>
      </div>
    </div>
  );
}
