/**
 * Card Showcase Page
 * ONE card style with variants and content composition
 */

"use client";

import {
  TerminalCard,
  TerminalCardHeader,
  TerminalCardContent,
  TerminalCardFooter,
  TerminalStat,
  TerminalStatGroup,
} from "@/components/ui/card";
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
    <div className="container mx-auto max-w-7xl space-y-16 px-6 py-12 font-mono">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="border-border bg-card inline-block border px-4 py-1 text-xs">
            [ SHOWCASE ] TERMINAL_CARD
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">TERMINAL_CARD</h1>
          <p className="text-muted-foreground text-xs">
            One card shell. Content is composition. Variants control tone and interactivity.
          </p>
        </div>
        <ThemeDropdown />
      </div>

      {/* Section 1: The ONE Card */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">1. BASE_CARD</h2>
        <p className="text-muted-foreground text-xs">
          The canonical card. Border, background, header with terminal pattern.
        </p>
        <div className="max-w-md">
          <TerminalCard>
            <TerminalCardHeader code="0x00" title="MODULE_NAME" icon={<Zap className="size-4" />} />
            <TerminalCardContent>
              <div className="text-foreground mb-3 text-xs font-semibold">MODULE_NAME</div>
              <div className="text-xs">
                <span className="text-muted-foreground">DESC: </span>
                <span className="text-foreground">Content goes here. Any content.</span>
              </div>
            </TerminalCardContent>
          </TerminalCard>
        </div>
      </section>

      {/* Section 2: Tone Variants */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">2. TONE_VARIANTS</h2>
        <p className="text-muted-foreground text-xs">
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
            <TerminalCard key={tone} tone={tone}>
              <TerminalCardHeader code="0x01" title={label.toUpperCase()} />
              <TerminalCardContent>
                <div className="text-xs">
                  <span className="text-muted-foreground">tone="{label}"</span>
                </div>
              </TerminalCardContent>
            </TerminalCard>
          ))}
        </div>
      </section>

      {/* Section 3: Interactive */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">3. INTERACTIVE</h2>
        <p className="text-muted-foreground text-xs">
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
            <TerminalCard key={index} interactive>
              <TerminalCardHeader
                code={`0x0${index + 2}`}
                title={item.title}
                icon={
                  <item.icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                }
              />
              <TerminalCardContent>
                <div className="text-foreground mb-3 text-xs font-semibold">{item.title}</div>
                <div className="text-xs">
                  <span className="text-muted-foreground">DESC: </span>
                  <span className="text-foreground">Hover over me.</span>
                </div>
              </TerminalCardContent>
            </TerminalCard>
          ))}
        </div>
      </section>

      {/* Section 4: Header Options */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">4. HEADER_OPTIONS</h2>
        <p className="text-muted-foreground text-xs">
          Header supports optional icon and meta (count) props.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <TerminalCard>
            <TerminalCardHeader code="0x10" title="BASIC" />
            <TerminalCardContent>
              <div className="text-muted-foreground text-xs">code + title only</div>
            </TerminalCardContent>
          </TerminalCard>

          <TerminalCard>
            <TerminalCardHeader code="0x11" title="WITH_ICON" icon={<Users className="size-4" />} />
            <TerminalCardContent>
              <div className="text-muted-foreground text-xs">icon prop</div>
            </TerminalCardContent>
          </TerminalCard>

          <TerminalCard>
            <TerminalCardHeader code="0x12" title="WITH_META" meta="8 items" />
            <TerminalCardContent>
              <div className="text-muted-foreground text-xs">meta prop</div>
            </TerminalCardContent>
          </TerminalCard>
        </div>
      </section>

      {/* Section 5: With Footer */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">5. WITH_FOOTER</h2>
        <p className="text-muted-foreground text-xs">
          Add <code className="text-primary">TerminalCardFooter</code> for actions.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <TerminalCard>
            <TerminalCardHeader
              code="0x20"
              title="ACTIONS"
              icon={<CreditCard className="size-4" />}
            />
            <TerminalCardContent>
              <div className="text-xs">
                <span className="text-muted-foreground">DESC: </span>
                <span className="text-foreground">Footer for action buttons.</span>
              </div>
            </TerminalCardContent>
            <TerminalCardFooter>
              <Button variant="outline" size="sm" className="text-xs">
                &gt; CANCEL
              </Button>
              <Button size="sm" className="text-xs">
                &gt; CONFIRM
              </Button>
            </TerminalCardFooter>
          </TerminalCard>

          <TerminalCard tone="warning">
            <TerminalCardHeader
              code="0x21"
              title="NOTICE"
              icon={<AlertTriangle className="size-4" />}
            />
            <TerminalCardContent>
              <div className="text-xs">
                <span className="text-muted-foreground">DESC: </span>
                <span className="text-foreground">Warning tone with action.</span>
              </div>
            </TerminalCardContent>
            <TerminalCardFooter>
              <Button size="sm" className="text-xs">
                &gt; ACKNOWLEDGE
              </Button>
            </TerminalCardFooter>
          </TerminalCard>
        </div>
      </section>

      {/* Section 6: Content Composition */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">6. CONTENT_COMPOSITION</h2>
        <p className="text-muted-foreground text-xs">
          Same card shell, different content inside. Content is just composition.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Stat content */}
          <TerminalCard>
            <TerminalCardHeader code="0x30" title="STATS" />
            <TerminalCardContent>
              <div className="text-foreground mb-2 text-3xl font-semibold">85%</div>
              <div className="text-foreground mb-3 text-xs font-semibold">TEST_COVERAGE</div>
              <TerminalStatGroup>
                <TerminalStat label="Passing" value="142" size="sm" />
                <TerminalStat label="Failed" value="0" size="sm" />
              </TerminalStatGroup>
            </TerminalCardContent>
          </TerminalCard>

          {/* List content */}
          <TerminalCard>
            <TerminalCardHeader code="0x31" title="FEATURES" meta="4 items" />
            <TerminalCardContent>
              <ul className="space-y-2">
                {["Authentication", "Billing", "Organizations", "Webhooks"].map(
                  (feature, i, arr) => (
                    <li key={i} className="flex items-start gap-3 text-xs">
                      <span className="text-primary flex-shrink-0">
                        {i === arr.length - 1 ? "└─" : "├─"}
                      </span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  )
                )}
              </ul>
            </TerminalCardContent>
          </TerminalCard>

          {/* Stat group content */}
          <TerminalCard>
            <TerminalCardHeader code="0x32" title="STATUS" />
            <TerminalCardContent>
              <p className="text-muted-foreground mb-4 text-xs">Ship fast. Look sharp.</p>
              <TerminalStatGroup>
                <TerminalStat label="Speed" value="OPTIMIZED" size="sm" />
                <TerminalStat label="Status" value="ACTIVE" size="sm" />
              </TerminalStatGroup>
            </TerminalCardContent>
          </TerminalCard>
        </div>
      </section>

      {/* Section 7: Width Control */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">7. WIDTH_CONTROL</h2>
        <p className="text-muted-foreground text-xs">
          Width controlled by parent container/grid. Card fills available space.
        </p>
        <div className="space-y-4">
          <div className="max-w-xs">
            <TerminalCard>
              <TerminalCardHeader code="0x40" title="NARROW" />
              <TerminalCardContent>
                <div className="text-muted-foreground text-xs">max-w-xs parent</div>
              </TerminalCardContent>
            </TerminalCard>
          </div>
          <div className="max-w-md">
            <TerminalCard>
              <TerminalCardHeader code="0x41" title="MEDIUM" />
              <TerminalCardContent>
                <div className="text-muted-foreground text-xs">max-w-md parent</div>
              </TerminalCardContent>
            </TerminalCard>
          </div>
          <div className="max-w-2xl">
            <TerminalCard>
              <TerminalCardHeader code="0x42" title="WIDE" />
              <TerminalCardContent>
                <div className="text-muted-foreground text-xs">max-w-2xl parent</div>
              </TerminalCardContent>
            </TerminalCard>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">SUMMARY</h2>
        <TerminalCard tone="primary">
          <TerminalCardHeader code="0xFF" title="API" />
          <TerminalCardContent>
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
          </TerminalCardContent>
        </TerminalCard>
      </section>
    </div>
  );
}
