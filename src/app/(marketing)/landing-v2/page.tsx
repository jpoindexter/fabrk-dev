'use client';

/**
 * Landing V2 - FUI Design Exploration
 *
 * 21 FUI styles that work WITH the design system:
 * - Uses existing theme tokens (--primary, --foreground, --background, --border)
 * - Applies structural differences (typography, spacing, decorations)
 * - Compatible with all 12 color themes
 * - Reasonable sizing that doesn't bloat components
 */

import { useState } from 'react';
import { HeroSection } from '@/components/marketing/hero-section';
import { HeroPlaygroundFull } from '@/components/marketing/hero-playground-full';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';
import { StatsSection } from '@/components/marketing/stats-section';
import { UseCasesSection } from '@/components/marketing/use-cases-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { WhatsIncludedSection } from '@/components/marketing/whats-included-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { FinalCTASection } from '@/components/marketing/final-cta-section';

// FUI styles - structural variations that work with any theme color
const FUI_STYLES = [
  { id: 'none', name: 'None (Default)', description: 'No FUI modifications' },
  { id: 'bracket-corners', name: 'Bracket Corners', description: 'L-bracket corner decorations' },
  { id: 'corner-ticks', name: 'Corner Ticks', description: 'Small tick mark corners' },
  { id: 'wireframe', name: 'Wireframe', description: 'Thin borders, transparent' },
  { id: 'oblivion', name: 'Oblivion', description: 'Grid overlay, corner brackets' },
  { id: 'remote-link', name: 'Remote Link', description: 'Top bar accent, status labels' },
  { id: 'tread', name: 'Tread FX-D', description: 'Left progress bar indicator' },
  { id: 'jarvis', name: 'JARVIS', description: 'Subtle glow effects' },
  { id: 'lcars', name: 'LCARS', description: 'Left panel accent, Star Trek' },
  { id: 'cortana', name: 'Cortana', description: 'Holographic glow' },
  { id: 'pacific-rim', name: 'Pacific Rim', description: 'Thick borders, industrial' },
  { id: 'alien', name: 'Alien Isolation', description: 'CRT scanlines' },
  { id: 'dead-space', name: 'Dead Space', description: 'Health bar spine' },
  { id: 'mass-effect', name: 'Mass Effect', description: 'Chamfered corners' },
  { id: 'deus-ex', name: 'Deus Ex', description: 'Top gradient bar' },
  { id: 'ghost-shell', name: 'Ghost in Shell', description: 'Circle indicator' },
  { id: 'tron', name: 'Tron Legacy', description: 'Glowing top edge' },
  { id: 'avatar', name: 'Avatar HUD', description: 'Targeting crosshair' },
  { id: 'blade-runner', name: 'Blade Runner', description: 'Top accent bar' },
  { id: 'interstellar', name: 'Interstellar', description: 'Minimal, thin' },
  { id: 'iron-man', name: 'Iron Man HUD', description: 'Circle HUD element' },
  { id: 'wakanda', name: 'Wakanda Tech', description: 'Angular diamond' },
];

/**
 * Generate FUI CSS that uses design system tokens
 * IMPORTANT: Only style decorative elements, DON'T override core sizing
 */
const generateFuiCSS = (styleId: string): string => {
  if (styleId === 'none') return '';

  const root = `[data-fui="${styleId}"]`;
  const card = `${root} [data-slot="card"]`;
  const section = `${root} section`;

  // Base: just ensure mono font and no border radius
  const baseStyles = `
    ${root} { font-family: var(--font-jetbrains-mono), ui-monospace, monospace !important; }
    ${root} * { border-radius: 0 !important; }
  `;

  switch (styleId) {
    // BRACKET CORNERS - Corner L-brackets on cards
    case 'bracket-corners':
      return `
        ${baseStyles}
        ${card} { position: relative !important; }
        ${card}::before, ${card}::after { content: '' !important; position: absolute !important; width: 20px !important; height: 20px !important; pointer-events: none !important; }
        ${card}::before { top: 0 !important; left: 0 !important; border-top: 2px solid oklch(var(--primary)) !important; border-left: 2px solid oklch(var(--primary)) !important; }
        ${card}::after { bottom: 0 !important; right: 0 !important; border-bottom: 2px solid oklch(var(--primary)) !important; border-right: 2px solid oklch(var(--primary)) !important; }
      `;

    // CORNER TICKS - Small tick marks at corners
    case 'corner-ticks':
      return `
        ${baseStyles}
        ${card} { position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 4px !important; left: 4px !important; width: 6px !important; height: 6px !important; border-top: 1px solid oklch(var(--primary)) !important; border-left: 1px solid oklch(var(--primary)) !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: 4px !important; right: 4px !important; width: 6px !important; height: 6px !important; border-bottom: 1px solid oklch(var(--primary)) !important; border-right: 1px solid oklch(var(--primary)) !important; }
      `;

    // WIREFRAME - Transparent backgrounds, thin borders
    case 'wireframe':
      return `
        ${baseStyles}
        ${card} { background: transparent !important; border: 1px solid oklch(var(--border)) !important; }
        ${section} { border: 1px solid oklch(var(--border) / 0.3) !important; margin: 4px !important; }
      `;

    // OBLIVION - Grid overlay + corner brackets
    case 'oblivion':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(90deg, transparent 98%, oklch(var(--border) / 0.15) 98%) 0 0 / 50px 50px, linear-gradient(0deg, transparent 98%, oklch(var(--border) / 0.15) 98%) 0 0 / 50px 50px !important; pointer-events: none !important; z-index: 0 !important; }
        ${card} { position: relative !important; z-index: 1 !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: -1px !important; left: -1px !important; width: 16px !important; height: 16px !important; border-top: 2px solid oklch(var(--primary)) !important; border-left: 2px solid oklch(var(--primary)) !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: -1px !important; right: -1px !important; width: 16px !important; height: 16px !important; border-bottom: 2px solid oklch(var(--primary)) !important; border-right: 2px solid oklch(var(--primary)) !important; }
        ${section} { position: relative !important; z-index: 1 !important; }
      `;

    // REMOTE LINK - Top accent bar + status label
    case 'remote-link':
      return `
        ${baseStyles}
        ${card} { position: relative !important; overflow: hidden !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 3px !important; background: oklch(var(--primary)) !important; }
        ${card}::after { content: 'ACTIVE' !important; position: absolute !important; top: 8px !important; right: 8px !important; font-size: 8px !important; color: oklch(var(--primary)) !important; letter-spacing: 0.1em !important; font-weight: 600 !important; }
      `;

    // TREAD FX-D - Left progress bar
    case 'tread':
      return `
        ${baseStyles}
        ${card} { position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 8px !important; left: 0 !important; width: 4px !important; height: calc(100% - 16px) !important; background: linear-gradient(180deg, oklch(var(--primary)) 0%, oklch(var(--primary)) 70%, transparent 70%) !important; }
        ${card}::after { content: 'AMP' !important; position: absolute !important; top: 8px !important; right: 8px !important; font-size: 8px !important; letter-spacing: 0.15em !important; opacity: 0.4 !important; color: oklch(var(--primary)) !important; }
      `;

    // JARVIS - Subtle glow on cards
    case 'jarvis':
      return `
        ${baseStyles}
        ${card} { position: relative !important; box-shadow: 0 0 20px oklch(var(--primary) / 0.08), inset 0 0 20px oklch(var(--primary) / 0.02) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: -1px !important; left: 20% !important; right: 20% !important; height: 1px !important; background: linear-gradient(90deg, transparent, oklch(var(--primary) / 0.5), transparent) !important; }
      `;

    // LCARS - Left panel accent (Star Trek)
    case 'lcars':
      return `
        ${baseStyles}
        ${card} { position: relative !important; margin-left: 12px !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: -12px !important; width: 8px !important; height: 100% !important; background: oklch(var(--primary)) !important; border-radius: 4px 0 0 4px !important; }
      `;

    // CORTANA - Holographic glow
    case 'cortana':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, oklch(var(--primary) / 0.04) 0%, transparent 60%) !important; pointer-events: none !important; }
        ${card} { position: relative !important; box-shadow: 0 0 25px oklch(var(--primary) / 0.1), inset 0 0 25px oklch(var(--primary) / 0.02) !important; z-index: 1 !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 1px !important; background: linear-gradient(90deg, transparent, oklch(var(--primary) / 0.6), transparent) !important; }
      `;

    // PACIFIC RIM - Thick borders
    case 'pacific-rim':
      return `
        ${baseStyles}
        ${card} { border-width: 3px !important; position: relative !important; }
        ${card}::before { content: 'JAEGER' !important; position: absolute !important; top: -10px !important; left: 12px !important; padding: 0 8px !important; font-size: 9px !important; font-weight: 700 !important; letter-spacing: 0.15em !important; background: oklch(var(--background)) !important; color: oklch(var(--primary)) !important; }
        ${section} { border: 2px solid oklch(var(--border)) !important; margin: 8px 4px !important; }
      `;

    // ALIEN ISOLATION - CRT scanlines
    case 'alien':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: repeating-linear-gradient(0deg, transparent 0px, transparent 2px, oklch(var(--background)) 2px, oklch(var(--background)) 4px) !important; pointer-events: none !important; z-index: 100 !important; opacity: 0.1 !important; }
        ${card} { position: relative !important; z-index: 1 !important; border-width: 2px !important; }
        ${card}::before { content: '>' !important; position: absolute !important; top: 8px !important; left: 8px !important; font-size: 12px !important; animation: blink 1s step-end infinite !important; color: oklch(var(--primary)) !important; }
        @keyframes blink { 50% { opacity: 0; } }
      `;

    // DEAD SPACE - Health bar spine
    case 'dead-space':
      return `
        ${baseStyles}
        ${card} { position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 8px !important; left: 8px !important; width: 6px !important; height: calc(100% - 16px) !important; background: linear-gradient(180deg, oklch(var(--primary)) 0%, oklch(var(--primary)) 80%, oklch(var(--destructive)) 80%) !important; }
        ${card}::after { content: 'RIG' !important; position: absolute !important; top: 6px !important; right: 8px !important; font-size: 9px !important; letter-spacing: 0.2em !important; opacity: 0.3 !important; color: oklch(var(--primary)) !important; }
      `;

    // MASS EFFECT - Chamfered corners
    case 'mass-effect':
      return `
        ${baseStyles}
        ${card} { position: relative !important; clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; right: 0 !important; border: 12px solid transparent !important; border-top-color: oklch(var(--primary) / 0.5) !important; border-right-color: oklch(var(--primary) / 0.5) !important; }
      `;

    // DEUS EX - Top gradient bar
    case 'deus-ex':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: repeating-linear-gradient(90deg, transparent 0px, transparent 3px, oklch(var(--primary) / 0.01) 3px, oklch(var(--primary) / 0.01) 4px) !important; pointer-events: none !important; }
        ${card} { position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 3px !important; background: linear-gradient(90deg, oklch(var(--primary)), transparent) !important; }
      `;

    // GHOST IN SHELL - Circle indicator
    case 'ghost-shell':
      return `
        ${baseStyles}
        ${card} { position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 8px !important; left: 8px !important; width: 8px !important; height: 8px !important; border: 2px solid oklch(var(--primary)) !important; border-radius: 50% !important; }
        ${card}::after { content: 'SEC 9' !important; position: absolute !important; bottom: 6px !important; right: 8px !important; font-size: 8px !important; letter-spacing: 0.15em !important; opacity: 0.3 !important; color: oklch(var(--primary)) !important; }
      `;

    // TRON LEGACY - Glowing top edge
    case 'tron':
      return `
        ${baseStyles}
        ${card} { position: relative !important; box-shadow: 0 0 12px oklch(var(--primary) / 0.15), inset 0 0 12px oklch(var(--primary) / 0.03) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: -1px !important; left: 15% !important; right: 15% !important; height: 2px !important; background: oklch(var(--primary)) !important; box-shadow: 0 0 10px oklch(var(--primary)), 0 0 20px oklch(var(--primary)) !important; }
      `;

    // AVATAR - Targeting crosshair
    case 'avatar':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at center, transparent 30%, oklch(var(--background) / 0.3) 100%) !important; pointer-events: none !important; }
        ${card} { position: relative !important; z-index: 1 !important; }
        ${card}::before { content: '+' !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; font-size: 24px !important; opacity: 0.06 !important; pointer-events: none !important; color: oklch(var(--primary)) !important; }
      `;

    // BLADE RUNNER - Top accent bar
    case 'blade-runner':
      return `
        ${baseStyles}
        ${card} { position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 16px !important; width: 50px !important; height: 2px !important; background: oklch(var(--primary)) !important; }
        ${card}::after { content: 'REPL' !important; position: absolute !important; bottom: 8px !important; right: 12px !important; font-size: 8px !important; letter-spacing: 0.2em !important; opacity: 0.25 !important; color: oklch(var(--primary)) !important; }
      `;

    // INTERSTELLAR - Minimal, thin
    case 'interstellar':
      return `
        ${baseStyles}
        ${card} { position: relative !important; background: transparent !important; border: 1px solid oklch(var(--border) / 0.5) !important; }
        ${card}::before { content: 'TARS' !important; position: absolute !important; top: 8px !important; right: 12px !important; font-size: 9px !important; letter-spacing: 0.25em !important; opacity: 0.2 !important; color: oklch(var(--foreground)) !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: 10px !important; left: 12px !important; width: 30px !important; height: 1px !important; background: oklch(var(--foreground) / 0.25) !important; }
      `;

    // IRON MAN HUD - Circle HUD element
    case 'iron-man':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at 25% 25%, oklch(var(--primary) / 0.03) 0%, transparent 30%), radial-gradient(circle at 75% 75%, oklch(var(--primary) / 0.03) 0%, transparent 30%) !important; pointer-events: none !important; }
        ${card} { position: relative !important; z-index: 1 !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 8px !important; right: 8px !important; width: 35px !important; height: 35px !important; border: 1px solid oklch(var(--border) / 0.4) !important; border-radius: 50% !important; }
        ${card}::after { content: 'STARK' !important; position: absolute !important; bottom: 6px !important; left: 10px !important; font-size: 7px !important; letter-spacing: 0.15em !important; opacity: 0.25 !important; color: oklch(var(--primary)) !important; }
      `;

    // WAKANDA TECH - Angular diamond
    case 'wakanda':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, oklch(var(--primary) / 0.04) 0%, transparent 50%) !important; pointer-events: none !important; }
        ${card} { position: relative !important; box-shadow: 0 0 25px oklch(var(--primary) / 0.1), inset 0 0 25px oklch(var(--primary) / 0.03) !important; z-index: 1 !important; }
        ${card}::before { content: 'VIB' !important; position: absolute !important; top: 6px !important; left: 10px !important; font-size: 7px !important; letter-spacing: 0.18em !important; opacity: 0.3 !important; color: oklch(var(--primary)) !important; }
        ${card}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 12px !important; width: 25px !important; height: 25px !important; border: 1px solid oklch(var(--primary) / 0.4) !important; transform: translateY(-50%) rotate(45deg) !important; }
      `;

    default:
      return baseStyles;
  }
};

export default function LandingV2Page() {
  const [activeStyle, setActiveStyle] = useState('none');
  const [isOpen, setIsOpen] = useState(false);

  const currentStyle = FUI_STYLES.find((s) => s.id === activeStyle);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: generateFuiCSS(activeStyle) }} />

      {/* Dropdown Selector - uses design system tokens */}
      <div className="fixed right-4 top-4 z-[200]">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fui-dropdown bg-card/90 border-border text-foreground flex items-center gap-2 border px-3 py-2 font-mono text-xs uppercase tracking-wider backdrop-blur-sm"
          >
            <span className="text-muted-foreground">FUI:</span>
            <span className="text-primary">{currentStyle?.name}</span>
            <svg
              className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="bg-card/95 border-border absolute right-0 top-full mt-1 max-h-[70vh] w-56 overflow-y-auto border backdrop-blur-sm">
              {FUI_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    setActiveStyle(style.id);
                    setIsOpen(false);
                  }}
                  className={`fui-dropdown flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left font-mono transition-colors ${
                    activeStyle === style.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                  }`}
                >
                  <span
                    className={`text-xs uppercase tracking-wider ${activeStyle === style.id ? 'text-primary' : 'text-foreground'}`}
                  >
                    {style.name}
                  </span>
                  <span className="text-muted-foreground text-[10px]">{style.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 z-[199]" onClick={() => setIsOpen(false)} />}

      <div data-fui={activeStyle}>
        <HeroSection />
        <HeroPlaygroundFull />
        <FeaturesShowcase />
        <StatsSection />
        <UseCasesSection />
        <PricingSection />
        <WhatsIncludedSection />
        <FAQSection />
        <FinalCTASection />
      </div>
    </>
  );
}
