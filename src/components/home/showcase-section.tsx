/**
 * ✅ FABRK COMPONENT
 * Showcase Section - Component previews
 * Production-ready ✓
 */

"use client";

import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ShowcaseItemProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  children: React.ReactNode;
}

function ShowcaseItem({ title, description, buttonText, buttonHref, children }: ShowcaseItemProps) {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center"
      >
        <h3 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h3>
        <p className="mb-6 text-lg text-muted-foreground">{description}</p>
        <div>
          <Link href={buttonHref}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">
                {buttonText}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ShowcaseSection() {
  return (
    <section aria-label="Feature showcase" className="relative overflow-hidden bg-gradient-to-b from-white via-muted/30 to-white py-24 sm:py-32">
      <div className="container mx-auto space-y-32 px-6 sm:px-8 lg:px-12">
        {/* AI-Optimized Workflows */}
        <ShowcaseItem
          title="AI-optimized components and workflows"
          description="llms.txt context files, MCP server integration, and Copy Prompt features. Works seamlessly with v0, Bolt, Cursor, and Lovable."
          buttonText="Explore AI Features"
          buttonHref="/docs/ai-development"
        >
          <BrowserMockup url="app.fabrk.dev/auth">
            <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-8">
              <Card className="w-full max-w-md border-border bg-white p-8 shadow-xl">
                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-semibold text-foreground">Welcome back</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Sign in to your account</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                    <div className="rounded-md border border-border bg-white px-3 py-2 text-sm text-muted-foreground">
                      you@example.com
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Password
                    </label>{" "}
                    {/* SECRET: form label */}
                    <div className="rounded-md border border-border bg-white px-3 py-2 text-sm text-muted-foreground">
                      ••••••••
                    </div>
                  </div>
                  <Button className="w-full bg-foreground">Sign in</Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <span className="font-medium text-foreground">Sign up</span>
                  </div>
                </div>
              </Card>
            </div>
          </BrowserMockup>
        </ShowcaseItem>

        {/* Production Components */}
        <ShowcaseItem
          title="245 production-ready components with quality enforced"
          description="11 automated standards via pre-commit hooks. TypeScript strict mode, accessibility testing, and design token validation built-in."
          buttonText="Browse Components"
          buttonHref="/components"
        >
          <BrowserMockup url="components.fabrk.dev">
            <div className="min-h-[500px] bg-white p-8">
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <Card className="border-border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm font-medium text-foreground">Components</div>
                    <div className="text-2xl font-semibold text-foreground">245</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                  </div>
                </Card>
                <Card className="border-border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm font-medium text-foreground">Standards</div>
                    <div className="text-2xl font-semibold text-foreground">11</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600" />
                  </div>
                </Card>
              </div>
              <div className="grid gap-3">
                {["Button", "Card", "Dialog", "Dropdown", "Input", "Select", "Table", "Tabs"].map(
                  (component, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-md border border-border bg-white px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded bg-muted text-sm font-medium text-foreground">
                          {component.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-foreground">{component}</span>
                      </div>
                      <div className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                        Ready
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </BrowserMockup>
        </ShowcaseItem>

        {/* Design System */}
        <ShowcaseItem
          title="Complete design system with industry-standard tokens"
          description="60/30/10 color rule, 8px grid system, and semantic naming. Following Carbon, Material, and Fluent standards."
          buttonText="View Design System"
          buttonHref="/design-system"
        >
          <BrowserMockup url="tokens.fabrk.dev">
            <div className="min-h-[500px] bg-white p-8">
              <div className="mb-6">
                <h4 className="mb-4 text-lg font-semibold text-foreground">Design Tokens</h4>
                <div className="space-y-3">
                  <div>
                    <div className="mb-2 text-sm font-medium text-muted-foreground">Colors</div>
                    <div className="flex gap-2">
                      {["bg-foreground", "bg-muted", "bg-border", "bg-accent", "bg-secondary"].map(
                        (color, i) => (
                          <div key={i} className={`size-12 rounded ${color}`} />
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium text-muted-foreground">Spacing</div>
                    <div className="space-y-2">
                      {[2, 4, 6, 8].map((space, i) => (
                        <div key={i} className="flex items-center gap-3">
                          { }
                          <div
                            className="h-2 rounded bg-foreground [width:var(--width)]"
                            style={{ "--width": `${space * 8}px` } as React.CSSProperties}
                          />
                          <span className="text-sm text-muted-foreground">
                            {space} ({space * 4}px)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium text-muted-foreground">Typography</div>
                    <div className="space-y-1">
                      <div className="text-2xl font-semibold text-foreground">Heading</div>
                      <div className="text-base text-foreground">Body text</div>
                      <div className="text-sm text-muted-foreground">Small text</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserMockup>
        </ShowcaseItem>

        {/* Theory to Practice */}
        <ShowcaseItem
          title="Explore components from theory to practice."
          description="Comprehensive documentation with live examples, code snippets, and best practices for every component."
          buttonText="Read Documentation"
          buttonHref="/docs"
        >
          <BrowserMockup url="docs.fabrk.dev">
            <div className="min-h-[500px] bg-white p-8">
              <div className="mb-6">
                <h4 className="mb-2 text-2xl font-semibold text-foreground">Button</h4>
                <p className="text-muted-foreground">
                  Displays a button or a component that looks like a button.
                </p>
              </div>

              <div className="mb-6 space-y-4">
                <div>
                  <div className="mb-3 text-sm font-medium text-foreground">Preview</div>
                  <div className="flex gap-3 rounded-lg border border-border bg-muted p-6">
                    <Button className="bg-foreground">Default</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-sm font-medium text-foreground">Installation</div>
                  <div className="rounded-lg border border-border bg-foreground p-4 font-mono text-sm text-white">
                    <div>npm install @fabrk/button</div>
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-sm font-medium text-foreground">Usage</div>
                  <div className="rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">
                    <div className="text-secondary">import</div> {"{"} Button {"}"}{" "}
                    <div className="inline text-secondary">from</div> &quot;@fabrk/button&quot;
                  </div>
                </div>
              </div>
            </div>
          </BrowserMockup>
        </ShowcaseItem>
      </div>
    </section>
  );
}
