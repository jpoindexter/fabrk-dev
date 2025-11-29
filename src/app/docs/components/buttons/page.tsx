import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { MousePointer, Palette, Maximize, Loader } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Button Components - Fabrk Docs",
  description: "Button variants for primary, secondary, outline, ghost, and destructive actions. Multiple sizes and states.",
};

export default function ButtonsComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Button_Components"
      description="Button components with multiple variants, sizes, and states."
      overview="6 button variants (default, secondary, outline, ghost, link, destructive), 4 sizes (sm, default, lg, icon), loading states, and icon support."
      features={[
        { icon: Palette, title: "6 Variants", description: "Default, secondary, outline, ghost, link, destructive." },
        { icon: Maximize, title: "4 Sizes", description: "Small, default, large, icon." },
        { icon: Loader, title: "Loading", description: "Built-in loading state." },
        { icon: MousePointer, title: "asChild", description: "Render as link or custom element." },
      ]}
      usage={[
        {
          title: "Button Variants",
          description: "All available button variants",
          code: `import { Button } from "@/components/ui/button";

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
}`,
          language: "tsx",
        },
        {
          title: "Button Sizes",
          description: "Different button sizes",
          code: `import { Button } from "@/components/ui/button";

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
}`,
          language: "tsx",
        },
        {
          title: "Button with Icon",
          description: "Add icons before or after text",
          code: `import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

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
}`,
          language: "tsx",
        },
        {
          title: "Loading State",
          description: "Show loading indicator during async operations",
          code: `import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button disabled={isLoading} onClick={() => setIsLoading(true)}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Processing..." : "Submit"}
    </Button>
  );
}`,
          language: "tsx",
        },
        {
          title: "Button as Link",
          description: "Use asChild to render as a Next.js Link",
          code: `import { Button } from "@/components/ui/button";
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
}`,
          language: "tsx",
        },
        {
          title: "Button Group",
          description: "Create grouped buttons",
          code: `import { Button } from "@/components/ui/button";

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
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Overview", href: "/docs/components/overview" }}
      next={{ title: "Forms", href: "/docs/components/forms" }}
    >
      {/* Available Variants */}
      <DocsSection title="Available Variants">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">default</code> - Primary button with solid background</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">secondary</code> - Secondary style with muted background</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">outline</code> - Bordered button with transparent background</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">ghost</code> - Minimal button, background on hover</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">link</code> - Styled as a link</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">destructive</code> - For dangerous actions (delete, etc.)</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/forms">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Forms</h3>
                <p className={docsTypography.body}>Input components for forms</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/modals">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Modals</h3>
                <p className={docsTypography.body}>Dialogs and overlays</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
