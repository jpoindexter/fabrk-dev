/**
 * Card Showcase Page
 * ONE card style with variants and content composition
 */

"use client";

import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardFooter, Stat, StatGroup } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeDropdown } from "@/components/theme/theme-dropdown";
import {
  Zap,
  Shield,
  Users,
  AlertTriangle,
  CreditCard,
  Settings,
  Database,
  Globe,
} from "lucide-react";

export default function CardShowcasePage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8 px-6 py-12 font-mono">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div
            className={cn(
              "border-border bg-card inline-block border px-4 py-1 text-xs",
              mode.radius
            )}
          >
            [ SHOWCASE ] TERMINAL_CARD
          </div>
          <h1 className={cn("text-2xl font-semibold tracking-tight lg:text-4xl", mode.font)}>
            TERMINAL_CARD
          </h1>
          <p className={cn("text-muted-foreground text-xs", mode.font)}>
            One card shell. Content is composition. Variants control tone and interactivity.
          </p>
        </div>
        <ThemeDropdown />
      </div>

      {/* Section 1: The ONE Card */}
      <section className="space-y-4">
        <h2 className={cn("text-lg font-semibold", mode.font)}>1. BASE_CARD</h2>
        <p className={cn("text-muted-foreground text-xs", mode.font)}>
          The canonical card. Border, background, header with terminal pattern.
        </p>
        <div className="max-w-md">
          <Card>
            <CardHeader code="0x00" title="MODULE_NAME" icon={<Zap className="size-4" />} />
            <CardContent>
              <div className="text-foreground mb-3 text-xs font-semibold">MODULE_NAME</div>
              <div className="text-xs">
                <span className="text-muted-foreground">DESC: </span>
                <span className="text-foreground">Content goes here. Any content.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 2: Tone Variants */}
      <section className="space-y-4">
        <h2 className={cn("text-lg font-semibold", mode.font)}>2. TONE_VARIANTS</h2>
        <p className={cn("text-muted-foreground text-xs", mode.font)}>
          Same card, different border colors via <code className="text-primary">tone</code> prop.
        </p>
        <div className="grid gap-6 md:grid-cols-5">
          {[
            { tone: "neutral" as const, label: "neutral" },
            { tone: "primary" as const, label: "primary" },
            { tone: "success" as const, label: "success" },
            { tone: "warning" as const, label: "warning" },
            { tone: "danger" as const, label: "danger" },
          ].map(({ tone, label }) => (
            <Card key={tone} tone={tone}>
              <CardHeader code="0x01" title={label.toUpperCase()} />
              <CardContent>
                <div className="text-xs">
                  <span className="text-muted-foreground">tone="{label}"</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 3: Interactive */}
      <section className="space-y-4">
        <h2 className={cn("text-lg font-semibold", mode.font)}>3. INTERACTIVE</h2>
        <p className={cn("text-muted-foreground text-xs", mode.font)}>
          Add <code className="text-primary">interactive</code> prop for hover states. Icon
          transitions on hover.
        </p>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Shield, title: "SECURITY" },
            { icon: Database, title: "DATABASE" },
            { icon: Globe, title: "REAL_TIME" },
            { icon: Settings, title: "ADMIN" },
          ].map((item, index) => (
            <Card key={index} interactive>
              <CardHeader
                code={`0x0${index + 2}`}
                title={item.title}
                icon={
                  <item.icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                }
              />
              <CardContent>
                <div className="text-foreground mb-3 text-xs font-semibold">{item.title}</div>
                <div className="text-xs">
                  <span className="text-muted-foreground">DESC: </span>
                  <span className="text-foreground">Hover over me.</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 4: Header Options */}
      <section className="space-y-4">
        <h2 className={cn("text-lg font-semibold", mode.font)}>4. HEADER_OPTIONS</h2>
        <p className={cn("text-muted-foreground text-xs", mode.font)}>
          Header supports optional icon and meta (count) props.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader code="0x10" title="BASIC" />
            <CardContent>
              <div className="text-muted-foreground text-xs">code + title only</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader code="0x11" title="WITH_ICON" icon={<Users className="size-4" />} />
            <CardContent>
              <div className="text-muted-foreground text-xs">icon prop</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader code="0x12" title="WITH_META" meta="8 items" />
            <CardContent>
              <div className="text-muted-foreground text-xs">meta prop</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 5: With Footer */}
      <section className="space-y-4">
        <h2 className={cn("text-lg font-semibold", mode.font)}>5. WITH_FOOTER</h2>
        <p className={cn("text-muted-foreground text-xs", mode.font)}>
          Add <code className="text-primary">CardFooter</code> for actions.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader code="0x20" title="ACTIONS" icon={<CreditCard className="size-4" />} />
            <CardContent>
              <div className="text-xs">
                <span className="text-muted-foreground">DESC: </span>
                <span className="text-foreground">Footer for action buttons.</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="text-xs">
                &gt; CANCEL
              </Button>
              <Button size="sm" className="text-xs">
                &gt; CONFIRM
              </Button>
            </CardFooter>
          </Card>

          <Card tone="warning">
            <CardHeader code="0x21" title="NOTICE" icon={<AlertTriangle className="size-4" />} />
            <CardContent>
              <div className="text-xs">
                <span className="text-muted-foreground">DESC: </span>
                <span className="text-foreground">Warning tone with action.</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="text-xs">
                &gt; ACKNOWLEDGE
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Section 6: Content Composition */}
      <section className="space-y-4">
        <h2 className={cn("text-lg font-semibold", mode.font)}>6. CONTENT_COMPOSITION</h2>
        <p className={cn("text-muted-foreground text-xs", mode.font)}>
          Same card shell, different content inside. Content is just composition.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Stat content */}
          <Card>
            <CardHeader code="0x30" title="STATS" />
            <CardContent>
              <div className="text-foreground mb-2 text-3xl font-semibold">85%</div>
              <div className="text-foreground mb-3 text-xs font-semibold">TEST_COVERAGE</div>
              <StatGroup>
                <Stat label="Passing" value="142" size="sm" />
                <Stat label="Failed" value="0" size="sm" />
              </StatGroup>
            </CardContent>
          </Card>

          {/* List content */}
          <Card>
            <CardHeader code="0x31" title="FEATURES" meta="4 items" />
            <CardContent>
              <ul className="space-y-2">
                {["Authentication", "Billing", "Organizations", "Webhooks"].map(
                  (feature, i, arr) => (
                    <li key={i} className="flex items-start gap-3 text-xs">
                      <span className="text-primary shrink-0">
                        {i === arr.length - 1 ? "└─" : "├─"}
                      </span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Stat group content */}
          <Card>
            <CardHeader code="0x32" title="STATUS" />
            <CardContent>
              <p className="text-muted-foreground mb-4 text-xs">Ship fast. Look sharp.</p>
              <StatGroup>
                <Stat label="Speed" value="OPTIMIZED" size="sm" />
                <Stat label="Status" value="ACTIVE" size="sm" />
              </StatGroup>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 7: Width Control */}
      <section className="space-y-4">
        <h2 className={cn("text-lg font-semibold", mode.font)}>7. WIDTH_CONTROL</h2>
        <p className={cn("text-muted-foreground text-xs", mode.font)}>
          Width controlled by parent container/grid. Card fills available space.
        </p>
        <div className="space-y-4">
          <div className="max-w-xs">
            <Card>
              <CardHeader code="0x40" title="NARROW" />
              <CardContent>
                <div className="text-muted-foreground text-xs">max-w-xs parent</div>
              </CardContent>
            </Card>
          </div>
          <div className="max-w-md">
            <Card>
              <CardHeader code="0x41" title="MEDIUM" />
              <CardContent>
                <div className="text-muted-foreground text-xs">max-w-md parent</div>
              </CardContent>
            </Card>
          </div>
          <div className="max-w-2xl">
            <Card>
              <CardHeader code="0x42" title="WIDE" />
              <CardContent>
                <div className="text-muted-foreground text-xs">max-w-2xl parent</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-4">
        <h2 className={cn("text-lg font-semibold", mode.font)}>SUMMARY</h2>
        <Card tone="primary">
          <CardHeader code="0xFF" title="API" />
          <CardContent>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-muted-foreground">tone:</span>{" "}
                <span className="text-foreground">
                  neutral | primary | success | warning | danger
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">interactive:</span>{" "}
                <span className="text-foreground">boolean (hover states)</span>
              </div>
              <div>
                <span className="text-muted-foreground">header.icon:</span>{" "}
                <span className="text-foreground">ReactNode</span>
              </div>
              <div>
                <span className="text-muted-foreground">header.meta:</span>{" "}
                <span className="text-foreground">string (count/label)</span>
              </div>
              <div>
                <span className="text-muted-foreground">content:</span>{" "}
                <span className="text-foreground">anything (composition)</span>
              </div>
              <div>
                <span className="text-muted-foreground">footer:</span>{" "}
                <span className="text-foreground">optional actions</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
