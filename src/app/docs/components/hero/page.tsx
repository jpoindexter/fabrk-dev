"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Button } from "@/components/ui/button";

// Simplified Hero Demo for docs
function HeroDemo() {
  return (
    <section className="w-full border border-border bg-background p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div>
          <span className="mb-4 inline-block border border-border bg-card px-4 py-1 font-mono text-xs text-muted-foreground">
            [ [0x00] SYSTEM_INIT ] SAAS_BOILERPLATE_v2.0
          </span>
          <h1 className="mb-2 font-mono text-sm text-muted-foreground">FABRK_INIT:</h1>
          <h2 className="mb-4 font-mono text-xl font-bold">
            BUILDING_YOUR_SAAS
            <br />
            <span className="text-primary">JUST_GOT_UNFAIRLY_EASY.</span>
          </h2>
          <div className="mb-6 border border-border bg-card p-4">
            <div className="mb-2 font-mono text-xs text-muted-foreground">[ [0x01] STATUS ]</div>
            <p className="mb-4 font-mono text-xs text-muted-foreground">
              Skip auth, billing, emails. Focus on your product.
            </p>
            <div className="flex gap-4 font-mono text-xs">
              <span><span className="text-muted-foreground">Speed:</span> <span className="text-primary">OPTIMIZED</span></span>
              <span><span className="text-muted-foreground">Integration:</span> <span className="text-primary">SEAMLESS</span></span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="rounded-none font-mono text-xs">&gt; GET_FABRK</Button>
            <Button variant="outline" className="rounded-none font-mono text-xs">&gt; VIEW_DEMO</Button>
          </div>
        </div>

        {/* Right Column - Terminal */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2.5 rounded-none bg-destructive/50" />
              <div className="size-2.5 rounded-none bg-warning/50" />
              <div className="size-2.5 rounded-none bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">terminal — ~/projects</span>
          </div>
          <div className="p-4 font-mono text-xs">
            <div className="text-muted-foreground">
              <span className="text-success">~</span> git clone https://github.com/you/fabrk
            </div>
            <div className="mt-1 text-muted-foreground">Cloning... <span className="text-success">done</span></div>
            <div className="mt-2 text-muted-foreground">
              <span className="text-success">~</span> npm install && npm run dev
            </div>
            <div className="mt-2 border border-success/30 bg-success/10 p-2">
              <div className="text-success">▲ Ready</div>
              <div className="text-muted-foreground">Local: <span className="text-primary">http://localhost:3000</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Split Hero variant
function HeroSplitDemo() {
  return (
    <section className="w-full border border-border bg-background">
      <div className="grid lg:grid-cols-2">
        <div className="p-6">
          <span className="mb-4 inline-block border border-border px-2 py-1 font-mono text-xs text-muted-foreground">
            [0x00] LAUNCH
          </span>
          <h1 className="mb-4 font-mono text-xl font-bold">
            Ship faster with <span className="text-primary">Fabrk</span>
          </h1>
          <p className="mb-6 font-mono text-xs text-muted-foreground">
            Production-ready Next.js boilerplate with auth, payments, and more.
          </p>
          <Button className="rounded-none font-mono text-xs">&gt; GET_STARTED</Button>
        </div>
        <div className="border-t border-border bg-muted/30 p-6 lg:border-l lg:border-t-0">
          <div className="font-mono text-xs text-muted-foreground">
            <div className="mb-2"># Quick start</div>
            <div className="text-foreground">npx create-fabrk-app my-app</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.02]"
      title="Hero Section"
      description="Landing page hero with terminal-style branding, animated code preview, and call-to-action buttons."
      mainPreview={{
        preview: <HeroDemo />,
        code: `import { HeroSection } from "@/components/landing/hero-section";

export default function LandingPage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      {/* Other sections */}
    </main>
  );
}`,
      }}
      variants={[
        {
          title: "Split Layout",
          description: "Two-column hero with code snippet",
          preview: <HeroSplitDemo />,
          code: `import { HeroSplit } from "@/components/landing/hero-split";

<HeroSplit
  title="Ship faster with Fabrk"
  description="Production-ready Next.js boilerplate"
  cta={{ label: "Get Started", href: "#pricing" }}
/>`,
        },
        {
          title: "Terminal Window",
          description: "Animated terminal showing installation",
          preview: (
            <div className="w-full max-w-md border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-2">
                  <div className="size-2.5 rounded-none bg-destructive/50" />
                  <div className="size-2.5 rounded-none bg-warning/50" />
                  <div className="size-2.5 rounded-none bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">terminal</span>
              </div>
              <div className="p-4 font-mono text-xs">
                <div><span className="text-success">$</span> npm create fabrk-app</div>
                <div className="mt-1 text-muted-foreground">Creating project...</div>
                <div className="mt-1 text-success">✓ Done!</div>
              </div>
            </div>
          ),
          code: `// Terminal window with traffic light dots
<div className="border border-border bg-card">
  <div className="flex items-center gap-2 border-b px-4 py-2">
    <div className="flex gap-2">
      <div className="size-2.5 rounded-none bg-destructive/50" />
      <div className="size-2.5 rounded-none bg-warning/50" />
      <div className="size-2.5 rounded-none bg-success/50" />
    </div>
    <span className="font-mono text-xs">terminal</span>
  </div>
  <div className="p-4 font-mono text-xs">
    {/* Terminal content */}
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "title",
          type: "string",
          description: "Main headline text",
        },
        {
          name: "subtitle",
          type: "string",
          description: "Secondary text below headline",
        },
        {
          name: "primaryCta",
          type: "{ label: string; href: string }",
          description: "Primary call-to-action button",
        },
        {
          name: "secondaryCta",
          type: "{ label: string; href: string }",
          description: "Secondary/outline button",
        },
      ]}
      accessibility={[
        "Proper heading hierarchy (h1, h2)",
        "CTA buttons are focusable and have clear labels",
        "Animations respect reduced-motion preferences",
        "Terminal preview is decorative (aria-hidden)",
      ]}
      previous={{ title: "Navigation", href: "/docs/components/navigation" }}
      next={{ title: "Features", href: "/docs/components/features" }}
    />
  );
}
