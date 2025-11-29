import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Hero Sections - Fabrk Docs",
  description: "Landing page hero components with headlines, CTAs, and animated backgrounds. Multiple layouts included.",
};

export default function HeroComponentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-2 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x60] COMPONENTS ] HERO</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">HERO_SECTIONS</h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          &gt; Eye-catching hero sections for landing pages with various layouts and styles.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-4">
          <h2 className="font-mono text-xs font-semibold mb-3">AVAILABLE_COMPONENTS</h2>
          <div className="space-y-1 font-mono text-xs text-muted-foreground">
            <div>├─ <code className="bg-muted px-1 font-mono">HeroSection</code> - Standard centered hero with headline, description, and CTAs</div>
            <div>├─ <code className="bg-muted px-1 font-mono">HeroSplit</code> - Split layout with content on left and image/demo on right</div>
            <div>└─ <code className="bg-muted px-1 font-mono">HeroVideo</code> - Hero section with background video or video modal</div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="font-mono text-lg font-semibold">IMPORT_EXAMPLES</h2>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// Standard hero section
import { HeroSection } from "@/components/landing/hero-section";

// Split layout hero
import { HeroSplit } from "@/components/landing/hero-split";

// Video hero
import { HeroVideo } from "@/components/landing/hero-video";`} />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-mono text-lg font-semibold">USAGE_EXAMPLES</h2>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">STANDARD_HERO_SECTION</h3>
          <div className="[&>div]:rounded-none">
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
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">SPLIT_LAYOUT_HERO</h3>
          <div className="[&>div]:rounded-none">
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
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">VIDEO_HERO</h3>
          <div className="[&>div]:rounded-none">
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
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">VIEW_VARIATIONS</h3>
          <p className="font-mono text-sm text-muted-foreground">
            Check out the variations page to see all hero styles side by side:
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="tsx" code={`// Visit /variations to see all hero styles
// Each variation is production-ready and copy-paste friendly`} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-mono text-lg font-semibold">ANIMATION_PATTERN</h2>
        <p className="font-mono text-sm text-muted-foreground">
          All hero sections use Framer Motion for smooth entrance animations:
        </p>
        <div className="[&>div]:rounded-none">
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
    </div>
  );
}
