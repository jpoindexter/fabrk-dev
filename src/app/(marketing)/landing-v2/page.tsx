'use client';

/**
 * Landing V2 - FUI Design Exploration
 *
 * 21 FUI styles that work WITH the design system:
 * - Uses existing theme tokens (--primary, --foreground, --background, --border)
 * - Applies structural differences (typography, spacing, decorations)
 * - Compatible with all 12 color themes
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
  { id: 'bracket-corners', name: 'Bracket Corners', description: 'Elegant L-brackets, thin typography' },
  { id: 'corner-ticks', name: 'Corner Ticks', description: 'Compact, dense, small tick marks' },
  { id: 'wireframe', name: 'Wireframe', description: 'Ultra thin, maximum spacing' },
  { id: 'oblivion', name: 'Oblivion', description: 'Grid overlay, tech coordinates' },
  { id: 'remote-link', name: 'Remote Link', description: 'Header bars, status panels' },
  { id: 'tread', name: 'Tread FX-D', description: 'Progress bars, industrial' },
  { id: 'jarvis', name: 'JARVIS', description: 'Elegant glow, circular elements' },
  { id: 'lcars', name: 'LCARS', description: 'Rounded panels, Star Trek style' },
  { id: 'cortana', name: 'Cortana', description: 'Holographic glow effects' },
  { id: 'pacific-rim', name: 'Pacific Rim', description: 'Heavy industrial, thick borders' },
  { id: 'alien', name: 'Alien Isolation', description: 'Retro CRT, scanlines' },
  { id: 'dead-space', name: 'Dead Space', description: 'Health bar spine, indicators' },
  { id: 'mass-effect', name: 'Mass Effect', description: 'Chamfered corners, holographic' },
  { id: 'deus-ex', name: 'Deus Ex', description: 'Augmented vision, scan lines' },
  { id: 'ghost-shell', name: 'Ghost in Shell', description: 'Cyberbrain, dual-tone' },
  { id: 'tron', name: 'Tron Legacy', description: 'Glowing edges, neon' },
  { id: 'avatar', name: 'Avatar HUD', description: 'Military targeting, minimal' },
  { id: 'blade-runner', name: 'Blade Runner', description: 'Neon noir, contrast' },
  { id: 'interstellar', name: 'Interstellar', description: 'NASA minimal, monochrome' },
  { id: 'iron-man', name: 'Iron Man HUD', description: 'Detailed, circular HUD' },
  { id: 'wakanda', name: 'Wakanda Tech', description: 'Holographic, angular' },
];

/**
 * Generate FUI CSS that uses design system tokens
 * Uses oklch(var(--token)) to reference existing theme colors
 */
const generateFuiCSS = (styleId: string): string => {
  const root = `[data-fui="${styleId}"]`;
  const card = `${root} [data-slot="card"]`;
  const btn = `${root} [data-slot="button"], ${root} button:not(.fui-dropdown)`;
  const section = `${root} section`;
  const h1 = `${root} h1`;
  const h2 = `${root} h2`;
  const h3 = `${root} h3`;
  const p = `${root} p`;
  const input = `${root} input, ${root} textarea, ${root} select`;
  const badge = `${root} [data-slot="badge"], ${root} span[class*="badge"]`;
  const nav = `${root} nav, ${root} header`;
  const footer = `${root} footer`;
  const li = `${root} li`;
  const ul = `${root} ul, ${root} ol`;

  // Common base - uses design system tokens
  const baseStyles = `
    ${root} { font-family: var(--font-jetbrains-mono), ui-monospace, monospace !important; }
    ${root} * { border-radius: 0 !important; }
  `;

  switch (styleId) {
    // BRACKET CORNERS - Thin, wide letter-spacing, elegant L-brackets
    case 'bracket-corners':
      return `
        ${baseStyles}
        ${h1} { font-size: 3rem !important; font-weight: 200 !important; letter-spacing: 0.4em !important; text-transform: uppercase !important; line-height: 1.2 !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 300 !important; letter-spacing: 0.3em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 2 !important; font-weight: 300 !important; letter-spacing: 0.05em !important; }
        ${card} { padding: 40px !important; position: relative !important; }
        ${card}::before, ${card}::after { content: '' !important; position: absolute !important; width: 30px !important; height: 30px !important; border-color: oklch(var(--primary)) !important; }
        ${card}::before { top: 0 !important; left: 0 !important; border-top: 2px solid !important; border-left: 2px solid !important; border-color: inherit !important; }
        ${card}::after { bottom: 0 !important; right: 0 !important; border-bottom: 2px solid !important; border-right: 2px solid !important; border-color: inherit !important; }
        ${btn} { padding: 16px 40px !important; font-size: 10px !important; letter-spacing: 0.3em !important; text-transform: uppercase !important; font-weight: 400 !important; }
        ${section} { padding: 100px 0 !important; }
        ${input} { padding: 14px 20px !important; font-size: 12px !important; letter-spacing: 0.1em !important; }
        ${badge} { padding: 8px 16px !important; font-size: 9px !important; letter-spacing: 0.2em !important; }
        ${nav} { padding: 24px 0 !important; }
        ${footer} { padding: 80px 0 !important; }
        ${ul} { font-size: 12px !important; }
        ${li} { margin-bottom: 12px !important; letter-spacing: 0.08em !important; }
      `;

    // CORNER TICKS - Compact, dense, small tick marks
    case 'corner-ticks':
      return `
        ${baseStyles}
        ${h1} { font-size: 2rem !important; font-weight: 600 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.1rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 0.85rem !important; font-weight: 600 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${p} { font-size: 11px !important; line-height: 1.6 !important; font-weight: 400 !important; }
        ${card} { padding: 20px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 4px !important; left: 4px !important; width: 8px !important; height: 8px !important; border-top: 1px solid oklch(var(--primary)) !important; border-left: 1px solid oklch(var(--primary)) !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: 4px !important; right: 4px !important; width: 8px !important; height: 8px !important; border-bottom: 1px solid oklch(var(--primary)) !important; border-right: 1px solid oklch(var(--primary)) !important; }
        ${btn} { padding: 10px 20px !important; font-size: 9px !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; font-weight: 600 !important; }
        ${section} { padding: 50px 0 !important; }
        ${input} { padding: 8px 12px !important; font-size: 11px !important; }
        ${badge} { padding: 4px 10px !important; font-size: 8px !important; letter-spacing: 0.1em !important; }
        ${nav} { padding: 12px 0 !important; }
        ${footer} { padding: 40px 0 !important; }
        ${ul} { font-size: 11px !important; }
        ${li} { margin-bottom: 6px !important; }
      `;

    // WIREFRAME - Ultra thin, maximum spacing
    case 'wireframe':
      return `
        ${baseStyles}
        ${h1} { font-size: 4rem !important; font-weight: 100 !important; letter-spacing: 0.5em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.8rem !important; font-weight: 200 !important; letter-spacing: 0.4em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1.1rem !important; font-weight: 300 !important; letter-spacing: 0.3em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 2.2 !important; font-weight: 200 !important; letter-spacing: 0.08em !important; }
        ${card} { padding: 50px !important; background: transparent !important; }
        ${btn} { padding: 18px 50px !important; font-size: 9px !important; letter-spacing: 0.4em !important; text-transform: uppercase !important; font-weight: 300 !important; background: transparent !important; }
        ${section} { padding: 120px 0 !important; border: 1px solid oklch(var(--border)) !important; margin: 10px !important; }
        ${input} { padding: 16px 24px !important; font-size: 11px !important; letter-spacing: 0.15em !important; background: transparent !important; }
        ${badge} { padding: 10px 20px !important; font-size: 8px !important; letter-spacing: 0.25em !important; background: transparent !important; }
        ${nav} { padding: 30px 0 !important; }
        ${footer} { padding: 100px 0 !important; }
        ${ul} { font-size: 11px !important; letter-spacing: 0.1em !important; }
        ${li} { margin-bottom: 16px !important; }
      `;

    // OBLIVION - Grid overlay, medium weight, tech coordinates
    case 'oblivion':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(90deg, transparent 99%, oklch(var(--border)) 99%) 0 0 / 60px 60px, linear-gradient(0deg, transparent 99%, oklch(var(--border)) 99%) 0 0 / 60px 60px !important; pointer-events: none !important; opacity: 0.3 !important; z-index: 0 !important; }
        ${h1} { font-size: 2.8rem !important; font-weight: 200 !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; position: relative !important; z-index: 1 !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 300 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 400 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.9 !important; font-weight: 300 !important; letter-spacing: 0.03em !important; }
        ${card} { padding: 35px !important; position: relative !important; z-index: 1 !important; }
        ${card}::before, ${card}::after { content: '' !important; position: absolute !important; width: 20px !important; height: 20px !important; }
        ${card}::before { top: -1px !important; left: -1px !important; border-top: 2px solid oklch(var(--primary)) !important; border-left: 2px solid oklch(var(--primary)) !important; }
        ${card}::after { bottom: -1px !important; right: -1px !important; border-bottom: 2px solid oklch(var(--primary)) !important; border-right: 2px solid oklch(var(--primary)) !important; }
        ${btn} { padding: 14px 32px !important; font-size: 11px !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; font-weight: 400 !important; }
        ${section} { padding: 90px 0 !important; position: relative !important; z-index: 1 !important; }
        ${section}::after { content: '172' !important; position: absolute !important; top: 30px !important; right: 40px !important; font-size: 48px !important; font-weight: 200 !important; opacity: 0.1 !important; letter-spacing: 0.1em !important; color: oklch(var(--primary)) !important; }
        ${input} { padding: 12px 18px !important; font-size: 12px !important; }
        ${badge} { padding: 6px 14px !important; font-size: 9px !important; letter-spacing: 0.15em !important; }
        ${nav}, ${footer} { position: relative !important; z-index: 1 !important; padding: 24px 0 !important; }
      `;

    // REMOTE LINK - Header bars, status panels, bold
    case 'remote-link':
      return `
        ${baseStyles}
        ${h1} { font-size: 2.2rem !important; font-weight: 700 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.3rem !important; font-weight: 600 !important; letter-spacing: 0.06em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 700 !important; letter-spacing: 0.05em !important; text-transform: uppercase !important; color: oklch(var(--primary)) !important; }
        ${p} { font-size: 12px !important; line-height: 1.7 !important; font-weight: 400 !important; }
        ${card} { padding: 28px !important; padding-top: 40px !important; position: relative !important; overflow: hidden !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 5px !important; background: oklch(var(--primary)) !important; }
        ${card}::after { content: 'ENABLED' !important; position: absolute !important; top: 12px !important; right: 14px !important; font-size: 8px !important; color: oklch(var(--primary)) !important; letter-spacing: 0.15em !important; font-weight: 600 !important; }
        ${btn} { padding: 14px 28px !important; font-size: 11px !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; font-weight: 700 !important; }
        ${section} { padding: 70px 0 !important; position: relative !important; }
        ${section}::before { content: '| FEED STATUS' !important; position: absolute !important; top: 20px !important; left: 20px !important; font-size: 9px !important; color: oklch(var(--primary)) !important; letter-spacing: 0.12em !important; font-weight: 600 !important; }
        ${input} { padding: 12px 16px !important; font-size: 12px !important; }
        ${badge} { padding: 6px 12px !important; font-size: 9px !important; font-weight: 700 !important; }
        ${nav} { padding: 16px 0 !important; border-bottom-width: 2px !important; }
        ${footer} { padding: 50px 0 !important; border-top-width: 2px !important; }
      `;

    // TREAD FX-D - Progress bars, industrial
    case 'tread':
      return `
        ${baseStyles}
        ${h1} { font-size: 2.5rem !important; font-weight: 300 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 0.95rem !important; font-weight: 600 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 1.75 !important; font-weight: 400 !important; }
        ${card} { padding: 28px !important; padding-left: 40px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 6px !important; height: 100% !important; background: linear-gradient(180deg, oklch(var(--primary)) 0%, oklch(var(--primary)) 65%, transparent 65%) !important; }
        ${card}::after { content: 'AMP' !important; position: absolute !important; top: 10px !important; right: 14px !important; font-size: 9px !important; letter-spacing: 0.2em !important; opacity: 0.5 !important; font-weight: 600 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 14px 30px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 800 !important; }
        ${section} { padding: 80px 0 !important; position: relative !important; }
        ${section}::after { content: 'SECTOR' !important; position: absolute !important; bottom: 20px !important; right: 30px !important; font-size: 11px !important; letter-spacing: 0.25em !important; opacity: 0.25 !important; font-weight: 600 !important; color: oklch(var(--primary)) !important; }
        ${input} { padding: 12px 16px !important; font-size: 12px !important; }
        ${badge} { padding: 6px 14px !important; font-size: 9px !important; font-weight: 800 !important; letter-spacing: 0.1em !important; }
        ${nav} { padding: 20px 0 !important; }
        ${footer} { padding: 60px 0 !important; }
      `;

    // JARVIS - Elegant, glowing, circular elements
    case 'jarvis':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at 50% 50%, oklch(var(--primary) / 0.04) 0%, transparent 50%) !important; pointer-events: none !important; }
        ${h1} { font-size: 3.2rem !important; font-weight: 200 !important; letter-spacing: 0.3em !important; text-transform: uppercase !important; text-shadow: 0 0 40px oklch(var(--primary) / 0.3) !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 300 !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; text-shadow: 0 0 20px oklch(var(--primary) / 0.2) !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 400 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.9 !important; font-weight: 300 !important; letter-spacing: 0.04em !important; }
        ${card} { padding: 36px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: -1px !important; left: 25px !important; right: 25px !important; height: 1px !important; background: linear-gradient(90deg, transparent, oklch(var(--primary)), transparent) !important; }
        ${card}::after { content: 'J.A.R.V.I.S.' !important; position: absolute !important; top: 10px !important; right: 14px !important; font-size: 7px !important; letter-spacing: 0.35em !important; opacity: 0.35 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 15px 36px !important; font-size: 10px !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; font-weight: 400 !important; }
        ${btn}:hover { box-shadow: 0 0 25px oklch(var(--primary) / 0.3) !important; }
        ${section} { padding: 95px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 50px !important; width: 80px !important; height: 80px !important; border: 1px solid oklch(var(--border)) !important; border-radius: 50% !important; opacity: 0.15 !important; transform: translateY(-50%) !important; }
        ${input} { padding: 14px 20px !important; font-size: 12px !important; letter-spacing: 0.08em !important; }
        ${badge} { padding: 7px 16px !important; font-size: 9px !important; letter-spacing: 0.18em !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; }
      `;

    // LCARS - Star Trek, rounded panels
    case 'lcars':
      return `
        ${baseStyles}
        ${h1} { font-size: 2.4rem !important; font-weight: 700 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 600 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.06em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.7 !important; font-weight: 500 !important; }
        ${card} { padding: 28px !important; padding-left: 70px !important; margin-left: 15px !important; position: relative !important; border: none !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 55px !important; height: 100% !important; background: oklch(var(--primary)) !important; border-radius: 28px 0 0 28px !important; }
        ${card}::after { content: '47' !important; position: absolute !important; top: 50% !important; left: 14px !important; transform: translateY(-50%) !important; font-size: 16px !important; font-weight: 800 !important; color: oklch(var(--background)) !important; }
        ${btn} { padding: 14px 28px !important; font-size: 12px !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; font-weight: 700 !important; border-radius: 22px !important; }
        ${section} { padding: 70px 0 !important; border-left: 10px solid oklch(var(--primary)) !important; margin: 25px 0 !important; padding-left: 25px !important; }
        ${input} { padding: 12px 18px !important; font-size: 13px !important; border-width: 3px !important; border-radius: 12px !important; }
        ${badge} { padding: 8px 16px !important; font-size: 10px !important; font-weight: 700 !important; border-radius: 12px !important; }
        ${nav} { padding: 20px 0 !important; border-bottom-width: 5px !important; }
        ${footer} { padding: 50px 0 !important; border-top-width: 5px !important; }
        ${ul} { font-size: 13px !important; }
        ${li} { margin-bottom: 10px !important; }
      `;

    // CORTANA - Holographic glow
    case 'cortana':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, oklch(var(--primary) / 0.06) 0%, transparent 65%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.8rem !important; font-weight: 300 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; text-shadow: 0 0 30px oklch(var(--primary) / 0.5) !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 400 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; text-shadow: 0 0 15px oklch(var(--primary) / 0.3) !important; }
        ${h3} { font-size: 1rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.85 !important; font-weight: 300 !important; }
        ${card} { padding: 34px !important; position: relative !important; box-shadow: 0 0 35px oklch(var(--primary) / 0.12), inset 0 0 35px oklch(var(--primary) / 0.03) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 2px !important; background: linear-gradient(90deg, transparent, oklch(var(--primary)), transparent) !important; }
        ${card}::after { content: 'UNSC' !important; position: absolute !important; bottom: 10px !important; right: 14px !important; font-size: 9px !important; letter-spacing: 0.25em !important; opacity: 0.3 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 14px 32px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 600 !important; box-shadow: 0 0 20px oklch(var(--primary) / 0.4) !important; }
        ${btn}:hover { box-shadow: 0 0 30px oklch(var(--primary) / 0.6) !important; }
        ${section} { padding: 85px 0 !important; }
        ${input} { padding: 13px 18px !important; font-size: 12px !important; box-shadow: 0 0 12px oklch(var(--primary) / 0.15) !important; }
        ${badge} { padding: 7px 14px !important; font-size: 9px !important; font-weight: 600 !important; box-shadow: 0 0 12px oklch(var(--primary) / 0.4) !important; }
        ${nav}, ${footer} { padding: 24px 0 !important; }
      `;

    // PACIFIC RIM - Heavy industrial, thick borders
    case 'pacific-rim':
      return `
        ${baseStyles}
        ${h1} { font-size: 2.6rem !important; font-weight: 900 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 800 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1.1rem !important; font-weight: 700 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.7 !important; font-weight: 500 !important; }
        ${card} { border-width: 4px !important; padding: 32px !important; position: relative !important; }
        ${card}::before { content: 'JAEGER' !important; position: absolute !important; top: -14px !important; left: 18px !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 800 !important; letter-spacing: 0.2em !important; background: oklch(var(--background)) !important; color: oklch(var(--primary)) !important; }
        ${card}::after { content: '' !important; position: absolute !important; top: 14px !important; right: 14px !important; width: 45px !important; height: 45px !important; border: 3px solid oklch(var(--primary)) !important; border-radius: 50% !important; opacity: 0.3 !important; }
        ${btn} { border-width: 4px !important; padding: 16px 32px !important; font-size: 12px !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; font-weight: 900 !important; }
        ${section} { padding: 80px 0 !important; border: 3px solid oklch(var(--border)) !important; margin: 20px 10px !important; }
        ${input} { border-width: 3px !important; padding: 14px 18px !important; font-size: 13px !important; font-weight: 600 !important; }
        ${badge} { border-width: 3px !important; padding: 8px 16px !important; font-size: 10px !important; font-weight: 900 !important; }
        ${nav} { padding: 22px 0 !important; border-bottom-width: 4px !important; }
        ${footer} { padding: 60px 0 !important; border-top-width: 4px !important; }
      `;

    // ALIEN ISOLATION - Retro CRT, scanlines
    case 'alien':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: repeating-linear-gradient(0deg, transparent 0px, transparent 2px, oklch(var(--background)) 2px, oklch(var(--background)) 4px) !important; pointer-events: none !important; z-index: 100 !important; opacity: 0.15 !important; }
        ${h1} { font-size: 2.2rem !important; font-weight: 600 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; text-shadow: 0 0 15px oklch(var(--primary)) !important; }
        ${h2} { font-size: 1.3rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; text-shadow: 0 0 10px oklch(var(--primary)) !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 1.7 !important; font-weight: 400 !important; }
        ${card} { border-width: 2px !important; padding: 28px !important; position: relative !important; z-index: 1 !important; }
        ${card}::before { content: '>' !important; position: absolute !important; top: 12px !important; left: 14px !important; font-size: 16px !important; animation: blink 1s step-end infinite !important; color: oklch(var(--primary)) !important; }
        ${card}::after { content: 'SEVASTOPOL' !important; position: absolute !important; bottom: 10px !important; right: 14px !important; font-size: 8px !important; letter-spacing: 0.18em !important; opacity: 0.4 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 13px 28px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 700 !important; }
        ${section} { padding: 70px 0 !important; position: relative !important; z-index: 1 !important; }
        ${input} { border-width: 2px !important; padding: 12px 16px !important; font-size: 12px !important; }
        ${badge} { padding: 6px 12px !important; font-size: 9px !important; font-weight: 700 !important; }
        ${nav}, ${footer} { padding: 20px 0 !important; position: relative !important; z-index: 1 !important; }
        @keyframes blink { 50% { opacity: 0; } }
      `;

    // DEAD SPACE - Health bar spine
    case 'dead-space':
      return `
        ${baseStyles}
        ${h1} { font-size: 2.4rem !important; font-weight: 400 !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.35rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.8 !important; font-weight: 400 !important; }
        ${card} { padding: 30px !important; padding-left: 45px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 12px !important; left: 12px !important; width: 8px !important; height: calc(100% - 24px) !important; background: linear-gradient(180deg, oklch(var(--primary)) 0%, oklch(var(--primary)) 75%, oklch(var(--destructive)) 75%, oklch(var(--destructive)) 100%) !important; }
        ${card}::after { content: 'RIG' !important; position: absolute !important; top: 10px !important; right: 14px !important; font-size: 11px !important; letter-spacing: 0.25em !important; opacity: 0.35 !important; color: oklch(var(--primary)) !important; }
        ${btn} { border-width: 2px !important; padding: 14px 30px !important; font-size: 11px !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; font-weight: 500 !important; }
        ${btn}:hover { box-shadow: 0 0 20px oklch(var(--primary)) !important; }
        ${section} { padding: 85px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; right: 25px !important; top: 50% !important; transform: translateY(-50%) !important; width: 10px !important; height: 70px !important; background: linear-gradient(180deg, oklch(var(--primary)) 0%, oklch(var(--primary)) 85%, transparent 85%) !important; opacity: 0.25 !important; }
        ${input} { border-width: 2px !important; padding: 13px 18px !important; font-size: 12px !important; }
        ${badge} { padding: 7px 14px !important; font-size: 9px !important; font-weight: 600 !important; }
        ${nav}, ${footer} { padding: 24px 0 !important; }
      `;

    // MASS EFFECT - Chamfered corners
    case 'mass-effect':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, oklch(var(--primary) / 0.04) 0%, transparent 55%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.5rem !important; font-weight: 500 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 600 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.75 !important; font-weight: 400 !important; }
        ${card} { padding: 32px !important; position: relative !important; clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px)) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; right: 0 !important; border: 18px solid transparent !important; border-top-color: oklch(var(--primary)) !important; border-right-color: oklch(var(--primary)) !important; }
        ${card}::after { content: 'N7' !important; position: absolute !important; bottom: 12px !important; right: 18px !important; font-size: 14px !important; font-weight: 800 !important; opacity: 0.25 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 14px 30px !important; font-size: 11px !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; font-weight: 700 !important; clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%) !important; }
        ${section} { padding: 85px 0 !important; }
        ${input} { padding: 13px 18px !important; font-size: 12px !important; }
        ${badge} { padding: 7px 14px !important; font-size: 9px !important; font-weight: 700 !important; }
        ${nav}, ${footer} { padding: 24px 0 !important; }
      `;

    // DEUS EX - Augmented vision, scan lines
    case 'deus-ex':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: repeating-linear-gradient(90deg, transparent 0px, transparent 4px, oklch(var(--primary) / 0.015) 4px, oklch(var(--primary) / 0.015) 5px) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.6rem !important; font-weight: 300 !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 1.85 !important; font-weight: 400 !important; letter-spacing: 0.03em !important; }
        ${card} { padding: 34px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 4px !important; background: linear-gradient(90deg, oklch(var(--primary)), transparent) !important; }
        ${card}::after { content: 'AUGMENTED' !important; position: absolute !important; top: 12px !important; right: 14px !important; font-size: 7px !important; letter-spacing: 0.25em !important; opacity: 0.35 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 15px 34px !important; font-size: 10px !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; font-weight: 500 !important; }
        ${section} { padding: 90px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; bottom: 0 !important; left: 30px !important; right: 30px !important; height: 1px !important; background: linear-gradient(90deg, transparent, oklch(var(--border)), transparent) !important; }
        ${input} { padding: 14px 20px !important; font-size: 12px !important; letter-spacing: 0.08em !important; }
        ${badge} { padding: 7px 15px !important; font-size: 9px !important; font-weight: 600 !important; letter-spacing: 0.12em !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; }
      `;

    // GHOST IN SHELL - Cyberbrain
    case 'ghost-shell':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(180deg, oklch(var(--primary) / 0.03) 0%, transparent 45%, oklch(var(--secondary) / 0.03) 100%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.7rem !important; font-weight: 400 !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.45rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.8 !important; font-weight: 400 !important; }
        ${card} { padding: 32px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 10px !important; left: 10px !important; width: 10px !important; height: 10px !important; border: 2px solid oklch(var(--primary)) !important; border-radius: 50% !important; }
        ${card}::after { content: 'SECTION 9' !important; position: absolute !important; bottom: 10px !important; right: 14px !important; font-size: 8px !important; letter-spacing: 0.18em !important; opacity: 0.35 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 14px 30px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 600 !important; }
        ${btn}:hover { box-shadow: 0 0 25px oklch(var(--primary) / 0.4) !important; }
        ${section} { padding: 85px 0 !important; }
        ${input} { padding: 13px 18px !important; font-size: 12px !important; }
        ${badge} { padding: 7px 14px !important; font-size: 9px !important; font-weight: 600 !important; }
        ${nav}, ${footer} { padding: 24px 0 !important; }
      `;

    // TRON LEGACY - Glowing edges
    case 'tron':
      return `
        ${baseStyles}
        ${h1} { font-size: 3rem !important; font-weight: 300 !important; letter-spacing: 0.35em !important; text-transform: uppercase !important; text-shadow: 0 0 30px oklch(var(--primary)) !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 400 !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; text-shadow: 0 0 15px oklch(var(--primary)) !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 500 !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.85 !important; font-weight: 300 !important; letter-spacing: 0.04em !important; }
        ${card} { padding: 36px !important; position: relative !important; box-shadow: 0 0 15px oklch(var(--primary) / 0.2), inset 0 0 15px oklch(var(--primary) / 0.05) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: -2px !important; left: 20% !important; right: 20% !important; height: 2px !important; background: oklch(var(--primary)) !important; box-shadow: 0 0 15px oklch(var(--primary)), 0 0 30px oklch(var(--primary)) !important; }
        ${card}::after { content: 'GRID' !important; position: absolute !important; bottom: 10px !important; right: 14px !important; font-size: 11px !important; letter-spacing: 0.35em !important; opacity: 0.25 !important; color: oklch(var(--primary)) !important; }
        ${btn} { border-width: 2px !important; padding: 15px 36px !important; font-size: 10px !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; font-weight: 400 !important; box-shadow: 0 0 12px oklch(var(--primary) / 0.3) !important; }
        ${btn}:hover { box-shadow: 0 0 30px oklch(var(--primary)), 0 0 50px oklch(var(--primary)) !important; }
        ${section} { padding: 95px 0 !important; }
        ${input} { border-width: 2px !important; padding: 14px 20px !important; font-size: 12px !important; box-shadow: 0 0 8px oklch(var(--primary) / 0.2) !important; }
        ${badge} { padding: 8px 16px !important; font-size: 9px !important; font-weight: 600 !important; box-shadow: 0 0 12px oklch(var(--primary)) !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; }
      `;

    // AVATAR - Military HUD, targeting
    case 'avatar':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at center, transparent 25%, oklch(var(--background) / 0.5) 100%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.3rem !important; font-weight: 600 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.35rem !important; font-weight: 600 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 1.7 !important; font-weight: 500 !important; }
        ${card} { padding: 30px !important; position: relative !important; }
        ${card}::before { content: '+' !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; font-size: 40px !important; opacity: 0.08 !important; pointer-events: none !important; color: oklch(var(--primary)) !important; }
        ${card}::after { content: 'RDA' !important; position: absolute !important; top: 10px !important; right: 14px !important; font-size: 10px !important; letter-spacing: 0.18em !important; opacity: 0.35 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 13px 28px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 700 !important; }
        ${section} { padding: 75px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 25px !important; left: 25px !important; width: 35px !important; height: 35px !important; border: 1px solid oklch(var(--primary)) !important; border-radius: 50% !important; opacity: 0.2 !important; }
        ${input} { padding: 12px 16px !important; font-size: 12px !important; }
        ${badge} { padding: 6px 12px !important; font-size: 9px !important; font-weight: 700 !important; }
        ${nav}, ${footer} { padding: 20px 0 !important; }
      `;

    // BLADE RUNNER - Neon noir
    case 'blade-runner':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(180deg, oklch(var(--primary) / 0.03) 0%, transparent 25%, oklch(var(--secondary) / 0.03) 100%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.8rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 500 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.8 !important; font-weight: 400 !important; }
        ${card} { padding: 34px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 25px !important; width: 70px !important; height: 2px !important; background: oklch(var(--primary)) !important; }
        ${card}::after { content: 'REPLICANT' !important; position: absolute !important; bottom: 12px !important; right: 18px !important; font-size: 8px !important; letter-spacing: 0.25em !important; opacity: 0.28 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 14px 32px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 600 !important; }
        ${btn}:hover { box-shadow: 0 0 25px oklch(var(--primary) / 0.4) !important; }
        ${section} { padding: 90px 0 !important; }
        ${input} { padding: 14px 20px !important; font-size: 12px !important; }
        ${badge} { padding: 7px 14px !important; font-size: 9px !important; font-weight: 600 !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; }
      `;

    // INTERSTELLAR - NASA minimal, monochrome
    case 'interstellar':
      return `
        ${baseStyles}
        ${h1} { font-size: 3.2rem !important; font-weight: 200 !important; letter-spacing: 0.35em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.6rem !important; font-weight: 300 !important; letter-spacing: 0.28em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1.1rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 2 !important; font-weight: 300 !important; letter-spacing: 0.05em !important; }
        ${card} { padding: 40px !important; position: relative !important; }
        ${card}::before { content: 'TARS' !important; position: absolute !important; top: 12px !important; right: 18px !important; font-size: 11px !important; letter-spacing: 0.35em !important; opacity: 0.25 !important; color: oklch(var(--foreground)) !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: 14px !important; left: 18px !important; width: 50px !important; height: 1px !important; background: oklch(var(--foreground)) !important; opacity: 0.3 !important; }
        ${btn} { padding: 16px 40px !important; font-size: 10px !important; letter-spacing: 0.28em !important; text-transform: uppercase !important; font-weight: 300 !important; background: transparent !important; }
        ${section} { padding: 100px 0 !important; }
        ${input} { padding: 15px 22px !important; font-size: 12px !important; letter-spacing: 0.1em !important; background: transparent !important; }
        ${badge} { padding: 8px 18px !important; font-size: 9px !important; letter-spacing: 0.2em !important; background: transparent !important; }
        ${nav}, ${footer} { padding: 30px 0 !important; }
      `;

    // IRON MAN HUD - Detailed, circular HUD elements
    case 'iron-man':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at 30% 30%, oklch(var(--primary) / 0.04) 0%, transparent 35%), radial-gradient(circle at 70% 70%, oklch(var(--primary) / 0.04) 0%, transparent 35%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.9rem !important; font-weight: 300 !important; letter-spacing: 0.22em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 400 !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.85 !important; font-weight: 300 !important; letter-spacing: 0.03em !important; }
        ${card} { padding: 36px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 12px !important; right: 12px !important; width: 55px !important; height: 55px !important; border: 1px solid oklch(var(--border)) !important; border-radius: 50% !important; opacity: 0.25 !important; }
        ${card}::after { content: 'STARK INDUSTRIES' !important; position: absolute !important; bottom: 10px !important; left: 14px !important; font-size: 7px !important; letter-spacing: 0.18em !important; opacity: 0.28 !important; color: oklch(var(--primary)) !important; }
        ${btn} { padding: 15px 34px !important; font-size: 10px !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; font-weight: 400 !important; }
        ${btn}:hover { box-shadow: 0 0 20px oklch(var(--primary) / 0.3) !important; }
        ${section} { padding: 90px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 50px !important; width: 90px !important; height: 90px !important; border: 1px dashed oklch(var(--border)) !important; border-radius: 50% !important; transform: translateY(-50%) !important; opacity: 0.12 !important; }
        ${input} { padding: 14px 20px !important; font-size: 12px !important; }
        ${badge} { padding: 7px 15px !important; font-size: 9px !important; letter-spacing: 0.15em !important; }
        ${nav} { padding: 24px 0 !important; }
        ${footer} { padding: 60px 0 !important; }
      `;

    // WAKANDA TECH - Holographic, angular
    case 'wakanda':
      return `
        ${baseStyles}
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, oklch(var(--primary) / 0.06) 0%, transparent 55%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.8rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; text-shadow: 0 0 25px oklch(var(--primary) / 0.4) !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 500 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; text-shadow: 0 0 12px oklch(var(--primary) / 0.3) !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.85 !important; font-weight: 400 !important; }
        ${card} { padding: 36px !important; position: relative !important; box-shadow: 0 0 35px oklch(var(--primary) / 0.15), inset 0 0 35px oklch(var(--primary) / 0.04) !important; }
        ${card}::before { content: 'VIBRANIUM' !important; position: absolute !important; top: 10px !important; left: 14px !important; font-size: 8px !important; letter-spacing: 0.22em !important; opacity: 0.35 !important; color: oklch(var(--primary)) !important; }
        ${card}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 18px !important; width: 45px !important; height: 45px !important; border: 1px solid oklch(var(--primary)) !important; transform: translateY(-50%) rotate(45deg) !important; opacity: 0.2 !important; }
        ${btn} { padding: 15px 34px !important; font-size: 11px !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; font-weight: 600 !important; box-shadow: 0 0 25px oklch(var(--primary) / 0.35) !important; }
        ${btn}:hover { box-shadow: 0 0 35px oklch(var(--primary) / 0.55) !important; }
        ${section} { padding: 90px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 25px !important; right: 25px !important; width: 70px !important; height: 70px !important; background: conic-gradient(from 0deg, transparent, oklch(var(--border)), transparent) !important; border-radius: 50% !important; opacity: 0.25 !important; }
        ${input} { padding: 14px 20px !important; font-size: 12px !important; box-shadow: 0 0 12px oklch(var(--primary) / 0.2) !important; }
        ${badge} { padding: 7px 15px !important; font-size: 9px !important; font-weight: 600 !important; box-shadow: 0 0 12px oklch(var(--primary) / 0.4) !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; }
      `;

    default:
      return baseStyles;
  }
};

export default function LandingV2Page() {
  const [activeStyle, setActiveStyle] = useState('oblivion');
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
            <div className="bg-card/95 border-border absolute right-0 top-full mt-1 max-h-[70vh] w-64 overflow-y-auto border backdrop-blur-sm">
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
