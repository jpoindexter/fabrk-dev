import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Hero Sections - Fabrk Docs",
  description: "Landing page hero components with headlines, CTAs, and animated backgrounds. Multiple layouts included.",
};

export default function HeroComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hero Sections</h1>
        <p className="mt-2 text-muted-foreground">
          Eye-catching hero sections for landing pages with various layouts and styles.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">HeroSection</code> - Standard centered hero with headline, description, and CTAs</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">HeroSplit</code> - Split layout with content on left and image/demo on right</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">HeroVideo</code> - Hero section with background video or video modal</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Import Examples</h2>
        </div>
        <CodeBlock language="typescript" code={`// Standard hero section
import { HeroSection } from "@/components/landing/hero-section";

// Split layout hero
import { HeroSplit } from "@/components/landing/hero-split";

// Video hero
import { HeroVideo } from "@/components/landing/hero-video";`} />
      </div>

      <div className="space-y-8">
        <h2 className="text-xl font-semibold">Usage Examples</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Standard Hero Section</h3>
          <CodeBlock language="tsx" code={`import { HeroSection } from "@/components/landing/hero-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      {/* Other sections */}
    </main>
  );
}`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Split Layout Hero</h3>
          <CodeBlock language="tsx" code={`import { HeroSplit } from "@/components/landing/hero-split";

export default function LandingPage() {
  return (
    <main>
      <HeroSplit />
      {/* Other sections */}
    </main>
  );
}

// HeroSplit typically includes:
// - Left side: Headline, description, CTA buttons
// - Right side: Product screenshot, demo, or illustration`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Video Hero</h3>
          <CodeBlock language="tsx" code={`import { HeroVideo } from "@/components/landing/hero-video";

export default function LandingPage() {
  return (
    <main>
      <HeroVideo />
      {/* Other sections */}
    </main>
  );
}

// HeroVideo features:
// - Background video or play button for modal
// - Overlay content with headline and CTAs
// - Autoplay/loop options for background video`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">View Variations</h3>
          <p className="text-muted-foreground">
            Check out the variations page to see all hero styles side by side:
          </p>
          <CodeBlock language="tsx" code={`// Visit /variations to see all hero styles
// Each variation is production-ready and copy-paste friendly`} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Animation Pattern</h2>
          <p className="text-muted-foreground">
            All hero sections use Framer Motion for smooth entrance animations:
          </p>
        </div>
        <CodeBlock language="tsx" code={`import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  <h1>Your Headline</h1>
</motion.div>`} />
      </div>
    </div>
  );
}
