'use client';

import { Container } from '@/components/ui/container';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export default function CardOptionsPage() {
  return (
    <div className="min-h-screen py-12">
      <Container>
        <h1 className={cn('mb-12 text-2xl font-bold', mode.font)}>CARD OPTIONS COMPARISON</h1>

        {/* OPTION A: One unified layout */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION A: UNIFIED LAYOUT</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Same structure everywhere: Header → Content → Footer
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Pricing */}
            <div className={cn('border', mode.color.border.default)}>
              <div className={cn('border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs', mode.font)}>PRICING</span>
              </div>
              <div className="space-y-2 p-4">
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>REGULAR:</span> <span className="line-through">$399</span>
                </div>
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>LAUNCH:</span> <span className={mode.color.text.accent}>$199</span>
                </div>
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>TYPE:</span> ONE-TIME
                </div>
              </div>
              <div className={cn('border-t px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs', mode.color.text.muted, mode.font)}>&gt; BUY NOW</span>
              </div>
            </div>

            {/* Feature */}
            <div className={cn('border', mode.color.border.default)}>
              <div className={cn('border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs', mode.font)}>AUTH MODULE</span>
              </div>
              <div className="space-y-2 p-4">
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>TIME SAVED:</span> 40+ HRS
                </div>
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>COST SAVED:</span> $4,000+
                </div>
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>STATUS:</span> <span className={mode.color.text.accent}>READY</span>
                </div>
              </div>
              <div className={cn('border-t px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs', mode.color.text.muted, mode.font)}>&gt; VIEW DOCS</span>
              </div>
            </div>

            {/* Stat */}
            <div className={cn('border', mode.color.border.default)}>
              <div className={cn('border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs', mode.font)}>COMPONENTS</span>
              </div>
              <div className="space-y-2 p-4">
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>COUNT:</span> <span className={mode.color.text.accent}>77+</span>
                </div>
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>TYPE:</span> UI PRIMITIVES
                </div>
                <div className={cn('text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>A11Y:</span> WCAG 2.1
                </div>
              </div>
              <div className={cn('border-t px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs', mode.color.text.muted, mode.font)}>&gt; BROWSE</span>
              </div>
            </div>
          </div>
        </section>

        {/* OPTION B: 2-3 card types */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION B: TYPED CARDS</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Data Card | List Card | Stat Card
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Data Card */}
            <div className={cn('border', mode.color.border.default)}>
              <div className={cn('flex justify-between border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs', mode.font)}>DATA CARD</span>
                <span className={cn('text-xs', mode.color.text.accent, mode.font)}>●</span>
              </div>
              <div className="p-4">
                <div className={cn('flex justify-between border-b py-2 text-xs', mode.color.border.default, mode.font)}>
                  <span className={mode.color.text.muted}>FRAMEWORK</span>
                  <span>NEXT.JS 16</span>
                </div>
                <div className={cn('flex justify-between border-b py-2 text-xs', mode.color.border.default, mode.font)}>
                  <span className={mode.color.text.muted}>LANGUAGE</span>
                  <span>TYPESCRIPT</span>
                </div>
                <div className={cn('flex justify-between py-2 text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>STYLING</span>
                  <span>TAILWIND 4</span>
                </div>
              </div>
            </div>

            {/* List Card */}
            <div className={cn('border', mode.color.border.default)}>
              <div className={cn('flex justify-between border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs', mode.font)}>LIST CARD</span>
                <span className={cn('text-xs', mode.color.text.accent, mode.font)}>5</span>
              </div>
              <div className="p-4">
                <div className={cn('py-1 text-xs', mode.font)}>&gt; OAuth providers</div>
                <div className={cn('py-1 text-xs', mode.font)}>&gt; Magic link auth</div>
                <div className={cn('py-1 text-xs', mode.font)}>&gt; JWT sessions</div>
                <div className={cn('py-1 text-xs', mode.font)}>&gt; Rate limiting</div>
                <div className={cn('py-1 text-xs', mode.font)}>&gt; RBAC permissions</div>
              </div>
            </div>

            {/* Stat Card */}
            <div className={cn('border', mode.color.border.default)}>
              <div className={cn('flex justify-between border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs', mode.font)}>STAT CARD</span>
              </div>
              <div className="flex flex-col items-center justify-center p-8">
                <div className={cn('text-4xl font-bold', mode.font, mode.color.text.accent)}>77+</div>
                <div className={cn('mt-2 text-xs', mode.font, mode.color.text.muted)}>COMPONENTS</div>
              </div>
            </div>
          </div>
        </section>

        {/* OPTION C: No headers */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION C: MINIMAL (NO HEADERS)</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Just bordered boxes with content
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Minimal 1 */}
            <div className={cn('border p-4', mode.color.border.default)}>
              <div className={cn('mb-3 text-xs', mode.font, mode.color.text.muted)}>[PRICING]</div>
              <div className={cn('text-3xl font-bold', mode.font)}>$199</div>
              <div className={cn('mt-1 text-xs', mode.font, mode.color.text.muted)}>ONE-TIME PAYMENT</div>
            </div>

            {/* Minimal 2 */}
            <div className={cn('border p-4', mode.color.border.default)}>
              <div className={cn('mb-3 text-xs', mode.font, mode.color.text.muted)}>[FEATURES]</div>
              <div className={cn('space-y-1 text-xs', mode.font)}>
                <div>&gt; Authentication</div>
                <div>&gt; Payments</div>
                <div>&gt; Multi-tenancy</div>
                <div>&gt; 77+ Components</div>
              </div>
            </div>

            {/* Minimal 3 */}
            <div className={cn('border p-4', mode.color.border.default)}>
              <div className={cn('mb-3 text-xs', mode.font, mode.color.text.muted)}>[STAT]</div>
              <div className={cn('text-3xl font-bold', mode.font, mode.color.text.accent)}>77+</div>
              <div className={cn('mt-1 text-xs', mode.font, mode.color.text.muted)}>UI COMPONENTS</div>
            </div>
          </div>
        </section>

        {/* Side by side - same content, 3 styles */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>SIDE BY SIDE: TESTIMONIAL</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Same content rendered in all 3 styles
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* A */}
            <div>
              <div className={cn('mb-2 text-xs', mode.font, mode.color.text.muted)}>OPTION A</div>
              <div className={cn('border', mode.color.border.default)}>
                <div className={cn('border-b px-4 py-2', mode.color.border.default)}>
                  <span className={cn('text-xs', mode.font)}>FEEDBACK</span>
                </div>
                <div className="space-y-2 p-4">
                  <div className={cn('text-xs', mode.font)}>
                    <span className={mode.color.text.muted}>QUOTE:</span> "Saved me 3 weeks on auth alone"
                  </div>
                  <div className={cn('text-xs', mode.font)}>
                    <span className={mode.color.text.muted}>AUTHOR:</span> Solo Founder
                  </div>
                  <div className={cn('text-xs', mode.font)}>
                    <span className={mode.color.text.muted}>RATING:</span> ★★★★★
                  </div>
                </div>
              </div>
            </div>

            {/* B */}
            <div>
              <div className={cn('mb-2 text-xs', mode.font, mode.color.text.muted)}>OPTION B</div>
              <div className={cn('border', mode.color.border.default)}>
                <div className={cn('flex justify-between border-b px-4 py-2', mode.color.border.default)}>
                  <span className={cn('text-xs', mode.font)}>FEEDBACK</span>
                  <span className={cn('text-xs', mode.color.text.accent, mode.font)}>★★★★★</span>
                </div>
                <div className="p-4">
                  <div className={cn('text-xs leading-relaxed', mode.font)}>
                    "Saved me 3 weeks on auth alone"
                  </div>
                  <div className={cn('mt-3 text-xs', mode.font, mode.color.text.muted)}>
                    — Solo Founder
                  </div>
                </div>
              </div>
            </div>

            {/* C */}
            <div>
              <div className={cn('mb-2 text-xs', mode.font, mode.color.text.muted)}>OPTION C</div>
              <div className={cn('border p-4', mode.color.border.default)}>
                <div className={cn('text-xs leading-relaxed', mode.font)}>
                  "Saved me 3 weeks on auth alone"
                </div>
                <div className={cn('mt-3 flex items-center justify-between text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>— Solo Founder</span>
                  <span className={mode.color.text.accent}>★★★★★</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPTION D: True FUI Style */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION D: TRUE FUI</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Label:Value fields, thin borders, status dots, minimal chrome
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* FUI Data Panel */}
            <div className={cn('border p-3', mode.color.border.default)}>
              <div className={cn('flex items-center gap-2 text-xs', mode.font, mode.color.text.muted)}>
                <span className={mode.color.text.accent}>●</span> PRICING
              </div>
              <div className="mt-3 space-y-1">
                <div className={cn('flex justify-between text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>REGULAR</span>
                  <span className="line-through opacity-50">$399</span>
                </div>
                <div className={cn('flex justify-between text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>LAUNCH</span>
                  <span className={mode.color.text.accent}>$199</span>
                </div>
                <div className={cn('flex justify-between text-xs', mode.font)}>
                  <span className={mode.color.text.muted}>TYPE</span>
                  <span>ONE-TIME</span>
                </div>
              </div>
            </div>

            {/* FUI List Panel */}
            <div className={cn('border p-3', mode.color.border.default)}>
              <div className={cn('flex items-center justify-between text-xs', mode.font)}>
                <div className="flex items-center gap-2">
                  <span className={mode.color.text.accent}>●</span>
                  <span className={mode.color.text.muted}>AUTH MODULE</span>
                </div>
                <span className={mode.color.text.accent}>5</span>
              </div>
              <div className={cn('mt-3 space-y-1 text-xs', mode.font)}>
                <div className="flex items-center gap-2">
                  <span className={mode.color.text.muted}>›</span> OAuth providers
                </div>
                <div className="flex items-center gap-2">
                  <span className={mode.color.text.muted}>›</span> Magic links
                </div>
                <div className="flex items-center gap-2">
                  <span className={mode.color.text.muted}>›</span> JWT sessions
                </div>
                <div className="flex items-center gap-2">
                  <span className={mode.color.text.muted}>›</span> Rate limiting
                </div>
                <div className="flex items-center gap-2">
                  <span className={mode.color.text.muted}>›</span> RBAC
                </div>
              </div>
            </div>

            {/* FUI Stat Panel */}
            <div className={cn('border p-3', mode.color.border.default)}>
              <div className={cn('flex items-center gap-2 text-xs', mode.font, mode.color.text.muted)}>
                <span className={mode.color.text.accent}>●</span> COMPONENTS
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className={cn('text-3xl font-bold', mode.font, mode.color.text.accent)}>77</span>
                <span className={cn('text-xs', mode.font, mode.color.text.muted)}>UI PRIMITIVES</span>
              </div>
              <div className={cn('mt-3 h-1 w-full', mode.color.border.default)} style={{ background: 'currentColor', opacity: 0.2 }}>
                <div className={cn('h-full w-3/4', mode.color.text.accent)} style={{ background: 'currentColor' }} />
              </div>
            </div>
          </div>

          {/* More FUI examples */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Testimonial FUI */}
            <div className={cn('border p-3', mode.color.border.default)}>
              <div className={cn('flex items-center justify-between text-xs', mode.font)}>
                <div className="flex items-center gap-2">
                  <span className={mode.color.text.accent}>●</span>
                  <span className={mode.color.text.muted}>FEEDBACK</span>
                </div>
                <span className={mode.color.text.accent}>★★★★★</span>
              </div>
              <div className={cn('mt-3 text-sm leading-relaxed', mode.font)}>
                "Saved me 3 weeks on auth and billing alone."
              </div>
              <div className={cn('mt-2 text-xs', mode.font, mode.color.text.muted)}>
                SOLO FOUNDER · SF
              </div>
            </div>

            {/* Tech Stack FUI */}
            <div className={cn('border p-3', mode.color.border.default)}>
              <div className={cn('flex items-center gap-2 text-xs', mode.font, mode.color.text.muted)}>
                <span className={mode.color.text.accent}>●</span> STACK
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'Tailwind', 'Prisma', 'Auth.js'].map((tech) => (
                  <span key={tech} className={cn('border px-2 py-0.5 text-xs', mode.color.border.default, mode.font)}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OPTION E: Bracket FUI (like the reference) */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION E: BRACKET FUI</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Corner brackets, dot grid, centered content, minimal
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Bracket Card 1 - Pricing */}
            <div className={cn('relative border p-4', mode.color.border.default)}>
              {/* Corner brackets */}
              <div className="pointer-events-none absolute inset-0">
                <div className={cn('absolute top-1 left-1 h-3 w-3 border-t border-l', mode.color.border.default)} />
                <div className={cn('absolute top-1 right-1 h-3 w-3 border-t border-r', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 left-1 h-3 w-3 border-b border-l', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 right-1 h-3 w-3 border-b border-r', mode.color.border.default)} />
              </div>
              {/* Top indicators */}
              <div className="mb-4 flex items-center justify-between">
                <span className={cn('text-[10px]', mode.font, mode.color.text.muted)}>01</span>
                <div className="flex items-center gap-1">
                  <span className={cn('h-1.5 w-1.5 rounded-full', mode.color.text.accent)} style={{ background: 'currentColor' }} />
                  <span className={cn('h-1 w-6', mode.color.text.accent)} style={{ background: 'currentColor', opacity: 0.5 }} />
                </div>
              </div>
              {/* Centered content */}
              <div className="py-4 text-center">
                <div className={cn('text-3xl font-bold', mode.font)}>$199</div>
                <div className={cn('mt-1 text-[10px]', mode.font, mode.color.text.muted)}>ONE-TIME</div>
              </div>
            </div>

            {/* Bracket Card 2 - Stat */}
            <div className={cn('relative border p-4', mode.color.border.default)}>
              {/* Corner brackets */}
              <div className="pointer-events-none absolute inset-0">
                <div className={cn('absolute top-1 left-1 h-3 w-3 border-t border-l', mode.color.border.default)} />
                <div className={cn('absolute top-1 right-1 h-3 w-3 border-t border-r', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 left-1 h-3 w-3 border-b border-l', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 right-1 h-3 w-3 border-b border-r', mode.color.border.default)} />
              </div>
              {/* Top indicators */}
              <div className="mb-4 flex items-center justify-between">
                <span className={cn('text-[10px]', mode.font, mode.color.text.muted)}>02</span>
                <div className="flex gap-0.5">
                  <span className={cn('h-1.5 w-1.5 rounded-full', mode.color.text.accent)} style={{ background: 'currentColor' }} />
                  <span className={cn('h-1.5 w-1.5 rounded-full opacity-30', mode.color.text.accent)} style={{ background: 'currentColor' }} />
                  <span className={cn('h-1.5 w-1.5 rounded-full opacity-30', mode.color.text.accent)} style={{ background: 'currentColor' }} />
                </div>
              </div>
              {/* Centered content */}
              <div className="py-4 text-center">
                <div className={cn('text-3xl font-bold', mode.font, mode.color.text.accent)}>77+</div>
                <div className={cn('mt-1 text-[10px]', mode.font, mode.color.text.muted)}>COMPONENTS</div>
              </div>
            </div>

            {/* Bracket Card 3 - Feature */}
            <div className={cn('relative border p-4', mode.color.border.default)}>
              {/* Corner brackets */}
              <div className="pointer-events-none absolute inset-0">
                <div className={cn('absolute top-1 left-1 h-3 w-3 border-t border-l', mode.color.border.default)} />
                <div className={cn('absolute top-1 right-1 h-3 w-3 border-t border-r', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 left-1 h-3 w-3 border-b border-l', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 right-1 h-3 w-3 border-b border-r', mode.color.border.default)} />
              </div>
              {/* Top indicators */}
              <div className="mb-4 flex items-center justify-between">
                <span className={cn('text-[10px]', mode.font, mode.color.text.muted)}>03</span>
                <span className={cn('text-[10px]', mode.font, mode.color.text.accent)}>AUTH</span>
              </div>
              {/* Centered content */}
              <div className="py-2 text-center">
                <div className={cn('text-xs', mode.font)}>OAuth · Magic Links</div>
                <div className={cn('mt-1 text-xs', mode.font)}>JWT · Rate Limit</div>
                <div className={cn('mt-1 text-xs', mode.font)}>RBAC</div>
              </div>
            </div>
          </div>

          {/* More bracket examples */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Testimonial */}
            <div className={cn('relative border p-4', mode.color.border.default)}>
              <div className="pointer-events-none absolute inset-0">
                <div className={cn('absolute top-1 left-1 h-3 w-3 border-t border-l', mode.color.border.default)} />
                <div className={cn('absolute top-1 right-1 h-3 w-3 border-t border-r', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 left-1 h-3 w-3 border-b border-l', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 right-1 h-3 w-3 border-b border-r', mode.color.border.default)} />
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span className={cn('text-[10px]', mode.font, mode.color.text.muted)}>FEEDBACK</span>
                <span className={cn('text-[10px]', mode.font, mode.color.text.accent)}>★★★★★</span>
              </div>
              <div className={cn('text-center text-sm', mode.font)}>
                "Saved me 3 weeks."
              </div>
              <div className={cn('mt-3 text-center text-[10px]', mode.font, mode.color.text.muted)}>
                SOLO FOUNDER
              </div>
            </div>

            {/* CTA */}
            <div className={cn('relative border p-4', mode.color.border.default)}>
              <div className="pointer-events-none absolute inset-0">
                <div className={cn('absolute top-1 left-1 h-3 w-3 border-t border-l', mode.color.border.default)} />
                <div className={cn('absolute top-1 right-1 h-3 w-3 border-t border-r', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 left-1 h-3 w-3 border-b border-l', mode.color.border.default)} />
                <div className={cn('absolute bottom-1 right-1 h-3 w-3 border-b border-r', mode.color.border.default)} />
              </div>
              <div className="flex h-full flex-col items-center justify-center py-4">
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>READY TO SHIP?</div>
                <div className={cn('mt-2 border px-4 py-1 text-xs', mode.color.border.default, mode.font)}>
                  GET FABRK →
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPTION F: Dashed/Blueprint */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION F: BLUEPRINT</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Dashed borders, technical drawing feel
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className={cn('border border-dashed p-4', mode.color.border.default)}>
              <div className={cn('text-[10px]', mode.font, mode.color.text.muted)}>// PRICING</div>
              <div className={cn('mt-3 text-2xl font-bold', mode.font)}>$199</div>
              <div className={cn('text-[10px]', mode.font, mode.color.text.muted)}>one-time payment</div>
            </div>
            <div className={cn('border border-dashed p-4', mode.color.border.default)}>
              <div className={cn('text-[10px]', mode.font, mode.color.text.muted)}>// COMPONENTS</div>
              <div className={cn('mt-3 text-2xl font-bold', mode.font, mode.color.text.accent)}>77+</div>
              <div className={cn('text-[10px]', mode.font, mode.color.text.muted)}>ui primitives</div>
            </div>
            <div className={cn('border border-dashed p-4', mode.color.border.default)}>
              <div className={cn('text-[10px]', mode.font, mode.color.text.muted)}>// FEATURES</div>
              <div className={cn('mt-3 space-y-1 text-xs', mode.font)}>
                <div>- auth</div>
                <div>- payments</div>
                <div>- multi-tenant</div>
              </div>
            </div>
          </div>
        </section>

        {/* OPTION G: Left Accent Bar */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION G: ACCENT BAR</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Thick left border accent, clean interior
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className={cn('border-l-2 bg-card/50 p-4', mode.color.border.default)} style={{ borderLeftColor: 'var(--accent)' }}>
              <div className={cn('text-[10px] uppercase', mode.font, mode.color.text.muted)}>Pricing</div>
              <div className={cn('mt-2 text-2xl font-bold', mode.font)}>$199</div>
            </div>
            <div className={cn('border-l-2 bg-card/50 p-4', mode.color.border.default)} style={{ borderLeftColor: 'var(--accent)' }}>
              <div className={cn('text-[10px] uppercase', mode.font, mode.color.text.muted)}>Components</div>
              <div className={cn('mt-2 text-2xl font-bold', mode.font, mode.color.text.accent)}>77+</div>
            </div>
            <div className={cn('border-l-2 bg-card/50 p-4', mode.color.border.default)} style={{ borderLeftColor: 'var(--accent)' }}>
              <div className={cn('text-[10px] uppercase', mode.font, mode.color.text.muted)}>Auth</div>
              <div className={cn('mt-2 text-xs', mode.font)}>OAuth · JWT · RBAC</div>
            </div>
          </div>
        </section>

        {/* OPTION H: ASCII Box */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION H: ASCII BOX</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Text-based borders, pure terminal aesthetic
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className={cn('p-1', mode.font)}>
              <pre className={cn('text-xs', mode.color.text.muted)}>
{`┌─ PRICING ──────────┐
│                    │
│       $199         │
│     one-time       │
│                    │
└────────────────────┘`}
              </pre>
            </div>
            <div className={cn('p-1', mode.font)}>
              <pre className={cn('text-xs', mode.color.text.muted)}>
{`┌─ COMPONENTS ───────┐
│                    │
│        77+         │
│    ui primitives   │
│                    │
└────────────────────┘`}
              </pre>
            </div>
            <div className={cn('p-1', mode.font)}>
              <pre className={cn('text-xs', mode.color.text.muted)}>
{`┌─ FEATURES ─────────┐
│  > auth            │
│  > payments        │
│  > multi-tenant    │
│  > 77+ components  │
└────────────────────┘`}
              </pre>
            </div>
          </div>
        </section>

        {/* OPTION I: Double Border */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION I: DOUBLE BORDER</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Nested borders, layered depth
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className={cn('border p-1', mode.color.border.default)}>
              <div className={cn('border p-4', mode.color.border.default)}>
                <div className={cn('text-[10px] uppercase', mode.font, mode.color.text.muted)}>Pricing</div>
                <div className={cn('mt-2 text-2xl font-bold', mode.font)}>$199</div>
              </div>
            </div>
            <div className={cn('border p-1', mode.color.border.default)}>
              <div className={cn('border p-4', mode.color.border.default)}>
                <div className={cn('text-[10px] uppercase', mode.font, mode.color.text.muted)}>Components</div>
                <div className={cn('mt-2 text-2xl font-bold', mode.font, mode.color.text.accent)}>77+</div>
              </div>
            </div>
            <div className={cn('border p-1', mode.color.border.default)}>
              <div className={cn('border p-4', mode.color.border.default)}>
                <div className={cn('text-[10px] uppercase', mode.font, mode.color.text.muted)}>Features</div>
                <div className={cn('mt-2 text-xs', mode.font)}>Auth · Pay · RBAC</div>
              </div>
            </div>
          </div>
        </section>

        {/* OPTION J: Top Line Only */}
        <section className="mb-16">
          <h2 className={cn('mb-2 text-lg font-bold', mode.font)}>OPTION J: TOP LINE</h2>
          <p className={cn('mb-6 text-sm', mode.color.text.muted, mode.font)}>
            Single top border, ultra minimal
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className={cn('border-t-2 pt-4', mode.color.border.default)} style={{ borderTopColor: 'var(--accent)' }}>
              <div className={cn('text-[10px] uppercase', mode.font, mode.color.text.muted)}>Pricing</div>
              <div className={cn('mt-1 text-2xl font-bold', mode.font)}>$199</div>
              <div className={cn('text-[10px]', mode.font, mode.color.text.muted)}>one-time</div>
            </div>
            <div className={cn('border-t-2 pt-4', mode.color.border.default)} style={{ borderTopColor: 'var(--accent)' }}>
              <div className={cn('text-[10px] uppercase', mode.font, mode.color.text.muted)}>Components</div>
              <div className={cn('mt-1 text-2xl font-bold', mode.font, mode.color.text.accent)}>77+</div>
              <div className={cn('text-[10px]', mode.font, mode.color.text.muted)}>ui primitives</div>
            </div>
            <div className={cn('border-t-2 pt-4', mode.color.border.default)} style={{ borderTopColor: 'var(--accent)' }}>
              <div className={cn('text-[10px] uppercase', mode.font, mode.color.text.muted)}>Features</div>
              <div className={cn('mt-1 text-xs', mode.font)}>Auth · Payments · RBAC</div>
              <div className={cn('text-[10px]', mode.font, mode.color.text.muted)}>production ready</div>
            </div>
          </div>
        </section>

      </Container>
    </div>
  );
}
