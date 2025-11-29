import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Sparkles, Split, Video, Zap } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Hero Sections - Fabrk Docs",
  description: "Landing page hero components with headlines, CTAs, and animated backgrounds. Multiple layouts included.",
};

export default function HeroComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Hero_Sections"
      description="Eye-catching hero sections for landing pages with various layouts and styles."
      overview="3 hero layouts: centered standard hero, split layout with image/demo, and video background hero. All include Framer Motion animations."
      features={[
        { icon: Sparkles, title: "HeroSection", description: "Centered headline with CTAs." },
        { icon: Split, title: "HeroSplit", description: "Content left, media right." },
        { icon: Video, title: "HeroVideo", description: "Background video or modal." },
        { icon: Zap, title: "Animated", description: "Framer Motion entrance effects." },
      ]}
      usage={[
        {
          title: "Standard Hero Section",
          description: "Centered layout with headline and CTAs",
          code: `import { HeroSection } from "@/components/landing/hero-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      {/* Other sections */}
    </main>
  );
}`,
          language: "tsx",
        },
        {
          title: "Split Layout Hero",
          description: "Content on left, image/demo on right",
          code: `import { HeroSplit } from "@/components/landing/hero-split";

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
// - Right side: Product screenshot, demo, or illustration`,
          language: "tsx",
        },
        {
          title: "Video Hero",
          description: "Hero with background video or video modal",
          code: `import { HeroVideo } from "@/components/landing/hero-video";

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
// - Autoplay/loop options for background video`,
          language: "tsx",
        },
        {
          title: "Animation Pattern",
          description: "Framer Motion entrance animations",
          code: `import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  <h1>Your Headline</h1>
</motion.div>`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Navigation", href: "/docs/components/navigation" }}
      next={{ title: "Features", href: "/docs/components/features" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">HeroSection</code> - Standard centered hero with headline, description, and CTAs</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">HeroSplit</code> - Split layout with content on left and image/demo on right</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">HeroVideo</code> - Hero section with background video or video modal</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/features">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Features</h3>
                <p className={docsTypography.body}>Feature section layouts</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/variations">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Variations</h3>
                <p className={docsTypography.body}>See all hero styles</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
