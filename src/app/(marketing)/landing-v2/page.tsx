'use client';

/**
 * Landing V2 - FUI Design Exploration
 * 27 styles with DRAMATIC structural differences
 * - Typography: sizes, weights, spacing
 * - Components: padding, borders, shapes
 * - Layout: section gaps, card sizes
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

const FUI_STYLES = [
  { id: 'bracket-corners', name: 'Bracket Corners', color: '#00ffff' },
  { id: 'corner-ticks', name: 'Corner Ticks', color: '#ff8800' },
  { id: 'wireframe', name: 'Wireframe', color: '#00ccff' },
  { id: 'oblivion', name: 'Oblivion', color: '#00d4d4' },
  { id: 'remote-link', name: 'Remote Link', color: '#ff6600' },
  { id: 'tread', name: 'Tread FX-D', color: '#ccff00' },
  { id: 'jarvis', name: 'JARVIS', color: '#00bfff' },
  { id: 'lcars', name: 'LCARS', color: '#ff9900' },
  { id: 'cortana', name: 'Cortana', color: '#00aaff' },
  { id: 'pacific-rim', name: 'Pacific Rim', color: '#ffaa00' },
  { id: 'alien', name: 'Alien Isolation', color: '#33ff33' },
  { id: 'dead-space', name: 'Dead Space', color: '#00ccff' },
  { id: 'mass-effect', name: 'Mass Effect', color: '#ff6600' },
  { id: 'deus-ex', name: 'Deus Ex', color: '#ffcc00' },
  { id: 'ghost-shell', name: 'Ghost in Shell', color: '#ff0066' },
  { id: 'tron', name: 'Tron Legacy', color: '#00ffff' },
  { id: 'avatar', name: 'Avatar HUD', color: '#00ff00' },
  { id: 'blade-runner', name: 'Blade Runner', color: '#ff0055' },
  { id: 'interstellar', name: 'Interstellar', color: '#aaaaaa' },
  { id: 'iron-man', name: 'Iron Man HUD', color: '#00ddff' },
  { id: 'wakanda', name: 'Wakanda Tech', color: '#aa55ff' },
];

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

  switch (styleId) {
    // BRACKET CORNERS - Thin, wide letter-spacing, elegant
    case 'bracket-corners':
      return `
        ${root} { --fui: #00ffff; --fui-dim: #003333; --fui-bg: #020808; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${h1} { font-size: 3rem !important; font-weight: 200 !important; letter-spacing: 0.4em !important; text-transform: uppercase !important; line-height: 1.2 !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 300 !important; letter-spacing: 0.3em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 2 !important; font-weight: 300 !important; letter-spacing: 0.05em !important; }
        ${card} { background: var(--fui-bg) !important; border: 1px solid var(--fui-dim) !important; padding: 40px !important; position: relative !important; }
        ${card}::before, ${card}::after { content: '' !important; position: absolute !important; width: 30px !important; height: 30px !important; }
        ${card}::before { top: 0 !important; left: 0 !important; border-top: 2px solid var(--fui) !important; border-left: 2px solid var(--fui) !important; }
        ${card}::after { bottom: 0 !important; right: 0 !important; border-bottom: 2px solid var(--fui) !important; border-right: 2px solid var(--fui) !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 16px 40px !important; font-size: 10px !important; letter-spacing: 0.3em !important; text-transform: uppercase !important; font-weight: 400 !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${section} { padding: 100px 0 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 14px 20px !important; font-size: 12px !important; letter-spacing: 0.1em !important; }
        ${badge} { background: var(--fui) !important; color: var(--fui-bg) !important; padding: 8px 16px !important; font-size: 9px !important; letter-spacing: 0.2em !important; }
        ${nav} { padding: 24px 0 !important; border-bottom: 1px solid var(--fui-dim) !important; }
        ${footer} { padding: 80px 0 !important; border-top: 1px solid var(--fui-dim) !important; }
        ${ul} { font-size: 12px !important; }
        ${li} { margin-bottom: 12px !important; letter-spacing: 0.08em !important; }
      `;

    // CORNER TICKS - Compact, dense, small text
    case 'corner-ticks':
      return `
        ${root} { --fui: #ff8800; --fui-dim: #331a00; --fui-bg: #080400; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${h1} { font-size: 2rem !important; font-weight: 600 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.1rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 0.85rem !important; font-weight: 600 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${p} { font-size: 11px !important; line-height: 1.6 !important; font-weight: 400 !important; }
        ${card} { background: var(--fui-bg) !important; border: 1px solid var(--fui-dim) !important; padding: 20px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 4px !important; left: 4px !important; width: 8px !important; height: 8px !important; border-top: 1px solid var(--fui) !important; border-left: 1px solid var(--fui) !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: 4px !important; right: 4px !important; width: 8px !important; height: 8px !important; border-bottom: 1px solid var(--fui) !important; border-right: 1px solid var(--fui) !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 10px 20px !important; font-size: 9px !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; font-weight: 600 !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${section} { padding: 50px 0 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 8px 12px !important; font-size: 11px !important; }
        ${badge} { background: var(--fui) !important; color: var(--fui-bg) !important; padding: 4px 10px !important; font-size: 8px !important; letter-spacing: 0.1em !important; }
        ${nav} { padding: 12px 0 !important; }
        ${footer} { padding: 40px 0 !important; }
        ${ul} { font-size: 11px !important; }
        ${li} { margin-bottom: 6px !important; }
      `;

    // WIREFRAME - Ultra thin, maximum spacing
    case 'wireframe':
      return `
        ${root} { --fui: #00ccff; --fui-dim: #002233; --fui-bg: #010404; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${h1} { font-size: 4rem !important; font-weight: 100 !important; letter-spacing: 0.5em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.8rem !important; font-weight: 200 !important; letter-spacing: 0.4em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1.1rem !important; font-weight: 300 !important; letter-spacing: 0.3em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 2.2 !important; font-weight: 200 !important; letter-spacing: 0.08em !important; }
        ${card} { background: transparent !important; border: 1px solid var(--fui-dim) !important; padding: 50px !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 18px 50px !important; font-size: 9px !important; letter-spacing: 0.4em !important; text-transform: uppercase !important; font-weight: 300 !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${section} { padding: 120px 0 !important; border: 1px solid var(--fui-dim) !important; margin: 10px !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 16px 24px !important; font-size: 11px !important; letter-spacing: 0.15em !important; }
        ${badge} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 10px 20px !important; font-size: 8px !important; letter-spacing: 0.25em !important; }
        ${nav} { padding: 30px 0 !important; }
        ${footer} { padding: 100px 0 !important; }
        ${ul} { font-size: 11px !important; letter-spacing: 0.1em !important; }
        ${li} { margin-bottom: 16px !important; }
      `;

    // OBLIVION - Grid overlay, medium weight, tech labels
    case 'oblivion':
      return `
        ${root} { --fui: #00d4d4; --fui-dim: #003333; --fui-bg: #020606; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(90deg, transparent 99%, var(--fui-dim) 99%) 0 0 / 60px 60px, linear-gradient(0deg, transparent 99%, var(--fui-dim) 99%) 0 0 / 60px 60px !important; pointer-events: none !important; opacity: 0.3 !important; z-index: 0 !important; }
        ${h1} { font-size: 2.8rem !important; font-weight: 200 !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; position: relative !important; z-index: 1 !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 300 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 400 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.9 !important; font-weight: 300 !important; letter-spacing: 0.03em !important; }
        ${card} { background: rgba(2,6,6,0.95) !important; border: 1px solid var(--fui-dim) !important; padding: 35px !important; position: relative !important; z-index: 1 !important; }
        ${card}::before, ${card}::after { content: '' !important; position: absolute !important; width: 20px !important; height: 20px !important; }
        ${card}::before { top: -1px !important; left: -1px !important; border-top: 2px solid var(--fui) !important; border-left: 2px solid var(--fui) !important; }
        ${card}::after { bottom: -1px !important; right: -1px !important; border-bottom: 2px solid var(--fui) !important; border-right: 2px solid var(--fui) !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 14px 32px !important; font-size: 11px !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; font-weight: 400 !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${section} { padding: 90px 0 !important; position: relative !important; z-index: 1 !important; }
        ${section}::after { content: '172' !important; position: absolute !important; top: 30px !important; right: 40px !important; font-size: 48px !important; font-weight: 200 !important; opacity: 0.1 !important; letter-spacing: 0.1em !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 12px 18px !important; font-size: 12px !important; }
        ${badge} { background: var(--fui) !important; color: var(--fui-bg) !important; padding: 6px 14px !important; font-size: 9px !important; letter-spacing: 0.15em !important; }
        ${nav}, ${footer} { position: relative !important; z-index: 1 !important; padding: 24px 0 !important; }
      `;

    // REMOTE LINK - Orange header bars, status panels, bold
    case 'remote-link':
      return `
        ${root} { --fui: #ff6600; --fui-dim: #331400; --fui-bg: #0a0604; background: var(--fui-bg) !important; }
        ${root} * { border-color: var(--fui-dim) !important; }
        ${root} p, ${root} span, ${root} li { color: #999 !important; }
        ${h1} { font-size: 2.2rem !important; font-weight: 700 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; color: #fff !important; }
        ${h2} { font-size: 1.3rem !important; font-weight: 600 !important; letter-spacing: 0.06em !important; text-transform: uppercase !important; color: #fff !important; }
        ${h3} { font-size: 1rem !important; font-weight: 700 !important; letter-spacing: 0.05em !important; text-transform: uppercase !important; color: var(--fui) !important; }
        ${p} { font-size: 12px !important; line-height: 1.7 !important; font-weight: 400 !important; }
        ${card} { background: #0f0a06 !important; border: 1px solid var(--fui-dim) !important; padding: 28px !important; padding-top: 40px !important; position: relative !important; overflow: hidden !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 5px !important; background: var(--fui) !important; }
        ${card}::after { content: 'ENABLED' !important; position: absolute !important; top: 12px !important; right: 14px !important; font-size: 8px !important; color: var(--fui) !important; letter-spacing: 0.15em !important; font-weight: 600 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; padding: 14px 28px !important; font-size: 11px !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; font-weight: 700 !important; color: #000 !important; }
        ${btn}:hover { background: #ff8833 !important; }
        ${section} { padding: 70px 0 !important; position: relative !important; }
        ${section}::before { content: '| FEED STATUS' !important; position: absolute !important; top: 20px !important; left: 20px !important; font-size: 9px !important; color: var(--fui) !important; letter-spacing: 0.12em !important; font-weight: 600 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 12px 16px !important; font-size: 12px !important; color: #fff !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; padding: 6px 12px !important; font-size: 9px !important; font-weight: 700 !important; }
        ${nav} { padding: 16px 0 !important; border-bottom: 2px solid var(--fui-dim) !important; }
        ${footer} { padding: 50px 0 !important; border-top: 2px solid var(--fui-dim) !important; }
      `;

    // TREAD FX-D - Yellow/lime, progress bars, industrial
    case 'tread':
      return `
        ${root} { --fui: #ccff00; --fui-dim: #2a3300; --fui-bg: #050600; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${h1} { font-size: 2.5rem !important; font-weight: 300 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; color: #fff !important; }
        ${h3} { font-size: 0.95rem !important; font-weight: 600 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 1.75 !important; font-weight: 400 !important; }
        ${card} { background: var(--fui-bg) !important; border: 1px solid var(--fui-dim) !important; padding: 28px !important; padding-left: 40px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 6px !important; height: 100% !important; background: linear-gradient(180deg, var(--fui) 0%, var(--fui) 65%, transparent 65%) !important; }
        ${card}::after { content: 'AMP' !important; position: absolute !important; top: 10px !important; right: 14px !important; font-size: 9px !important; letter-spacing: 0.2em !important; opacity: 0.5 !important; font-weight: 600 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; padding: 14px 30px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 800 !important; color: #000 !important; }
        ${btn}:hover { background: #e6ff33 !important; }
        ${section} { padding: 80px 0 !important; position: relative !important; }
        ${section}::after { content: 'SECTOR' !important; position: absolute !important; bottom: 20px !important; right: 30px !important; font-size: 11px !important; letter-spacing: 0.25em !important; opacity: 0.25 !important; font-weight: 600 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 12px 16px !important; font-size: 12px !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; padding: 6px 14px !important; font-size: 9px !important; font-weight: 800 !important; letter-spacing: 0.1em !important; }
        ${nav} { padding: 20px 0 !important; }
        ${footer} { padding: 60px 0 !important; }
      `;

    // JARVIS - Elegant, glowing, circular elements
    case 'jarvis':
      return `
        ${root} { --fui: #00bfff; --fui-dim: #002940; --fui-bg: #020a10; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at 50% 50%, rgba(0,191,255,0.04) 0%, transparent 50%) !important; pointer-events: none !important; }
        ${h1} { font-size: 3.2rem !important; font-weight: 200 !important; letter-spacing: 0.3em !important; text-transform: uppercase !important; text-shadow: 0 0 40px rgba(0,191,255,0.3) !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 300 !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; text-shadow: 0 0 20px rgba(0,191,255,0.2) !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 400 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.9 !important; font-weight: 300 !important; letter-spacing: 0.04em !important; }
        ${card} { background: rgba(2,10,16,0.85) !important; border: 1px solid var(--fui-dim) !important; padding: 36px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: -1px !important; left: 25px !important; right: 25px !important; height: 1px !important; background: linear-gradient(90deg, transparent, var(--fui), transparent) !important; }
        ${card}::after { content: 'J.A.R.V.I.S.' !important; position: absolute !important; top: 10px !important; right: 14px !important; font-size: 7px !important; letter-spacing: 0.35em !important; opacity: 0.35 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 15px 36px !important; font-size: 10px !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; font-weight: 400 !important; }
        ${btn}:hover { background: rgba(0,191,255,0.15) !important; box-shadow: 0 0 25px rgba(0,191,255,0.3) !important; }
        ${section} { padding: 95px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 50px !important; width: 80px !important; height: 80px !important; border: 1px solid var(--fui-dim) !important; border-radius: 50% !important; opacity: 0.15 !important; transform: translateY(-50%) !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 14px 20px !important; font-size: 12px !important; letter-spacing: 0.08em !important; }
        ${badge} { background: rgba(0,191,255,0.15) !important; border: 1px solid var(--fui) !important; padding: 7px 16px !important; font-size: 9px !important; letter-spacing: 0.18em !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; border-bottom: 1px solid var(--fui-dim) !important; }
      `;

    // LCARS - Star Trek, rounded panels, multi-color
    case 'lcars':
      return `
        ${root} { --fui: #ff9900; --fui-dim: #332000; --fui-bg: #000000; background: var(--fui-bg) !important; }
        ${root} * { border-color: var(--fui-dim) !important; }
        ${h1} { font-size: 2.4rem !important; font-weight: 700 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; color: #ff9900 !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 600 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; color: #cc99ff !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.06em !important; text-transform: uppercase !important; color: #99ccff !important; }
        ${p} { font-size: 13px !important; line-height: 1.7 !important; font-weight: 500 !important; color: #ff9900 !important; }
        ${card} { background: #000 !important; border: none !important; padding: 28px !important; padding-left: 70px !important; margin-left: 15px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 55px !important; height: 100% !important; background: var(--fui) !important; border-radius: 28px 0 0 28px !important; }
        ${card}::after { content: '47' !important; position: absolute !important; top: 50% !important; left: 14px !important; transform: translateY(-50%) !important; font-size: 16px !important; font-weight: 800 !important; color: #000 !important; }
        ${btn} { background: #cc99ff !important; border: none !important; padding: 14px 28px !important; font-size: 12px !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; font-weight: 700 !important; color: #000 !important; border-radius: 22px !important; }
        ${btn}:hover { background: #ddaaff !important; }
        ${section} { padding: 70px 0 !important; border-left: 10px solid #9999ff !important; margin: 25px 0 !important; padding-left: 25px !important; }
        ${input} { background: transparent !important; border: 3px solid var(--fui) !important; padding: 12px 18px !important; font-size: 13px !important; color: var(--fui) !important; border-radius: 12px !important; }
        ${badge} { background: #99ccff !important; color: #000 !important; padding: 8px 16px !important; font-size: 10px !important; font-weight: 700 !important; border-radius: 12px !important; }
        ${nav} { padding: 20px 0 !important; border-bottom: 5px solid #cc99ff !important; }
        ${footer} { padding: 50px 0 !important; border-top: 5px solid #9999ff !important; }
        ${ul} { font-size: 13px !important; color: var(--fui) !important; }
        ${li} { margin-bottom: 10px !important; color: var(--fui) !important; }
      `;

    // CORTANA - Holographic blue glow
    case 'cortana':
      return `
        ${root} { --fui: #00aaff; --fui-dim: #002244; --fui-bg: #000510; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, rgba(0,170,255,0.06) 0%, transparent 65%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.8rem !important; font-weight: 300 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; text-shadow: 0 0 30px rgba(0,170,255,0.5) !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 400 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; text-shadow: 0 0 15px rgba(0,170,255,0.3) !important; }
        ${h3} { font-size: 1rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.85 !important; font-weight: 300 !important; }
        ${card} { background: rgba(0,5,16,0.75) !important; border: 1px solid var(--fui) !important; padding: 34px !important; position: relative !important; box-shadow: 0 0 35px rgba(0,170,255,0.12), inset 0 0 35px rgba(0,170,255,0.03) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 2px !important; background: linear-gradient(90deg, transparent, var(--fui), transparent) !important; }
        ${card}::after { content: 'UNSC' !important; position: absolute !important; bottom: 10px !important; right: 14px !important; font-size: 9px !important; letter-spacing: 0.25em !important; opacity: 0.3 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; padding: 14px 32px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 600 !important; color: #000 !important; box-shadow: 0 0 20px rgba(0,170,255,0.4) !important; }
        ${btn}:hover { background: #33bbff !important; box-shadow: 0 0 30px rgba(0,170,255,0.6) !important; }
        ${section} { padding: 85px 0 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 13px 18px !important; font-size: 12px !important; box-shadow: 0 0 12px rgba(0,170,255,0.15) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; padding: 7px 14px !important; font-size: 9px !important; font-weight: 600 !important; box-shadow: 0 0 12px rgba(0,170,255,0.4) !important; }
        ${nav}, ${footer} { padding: 24px 0 !important; }
      `;

    // PACIFIC RIM - Heavy industrial, thick borders
    case 'pacific-rim':
      return `
        ${root} { --fui: #ffaa00; --fui-dim: #332200; --fui-bg: #080400; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${h1} { font-size: 2.6rem !important; font-weight: 900 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 800 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1.1rem !important; font-weight: 700 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.7 !important; font-weight: 500 !important; }
        ${card} { background: #0a0600 !important; border: 4px solid var(--fui-dim) !important; padding: 32px !important; position: relative !important; }
        ${card}::before { content: 'JAEGER' !important; position: absolute !important; top: -14px !important; left: 18px !important; background: var(--fui-bg) !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 800 !important; letter-spacing: 0.2em !important; }
        ${card}::after { content: '' !important; position: absolute !important; top: 14px !important; right: 14px !important; width: 45px !important; height: 45px !important; border: 3px solid var(--fui) !important; border-radius: 50% !important; opacity: 0.3 !important; }
        ${btn} { background: var(--fui) !important; border: 4px solid #996600 !important; padding: 16px 32px !important; font-size: 12px !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; font-weight: 900 !important; color: #000 !important; }
        ${btn}:hover { background: #ffcc33 !important; }
        ${section} { padding: 80px 0 !important; border: 3px solid var(--fui-dim) !important; margin: 20px 10px !important; }
        ${input} { background: transparent !important; border: 3px solid var(--fui) !important; padding: 14px 18px !important; font-size: 13px !important; font-weight: 600 !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; padding: 8px 16px !important; font-size: 10px !important; font-weight: 900 !important; border: 3px solid #996600 !important; }
        ${nav} { padding: 22px 0 !important; border-bottom: 4px solid var(--fui-dim) !important; }
        ${footer} { padding: 60px 0 !important; border-top: 4px solid var(--fui-dim) !important; }
      `;

    // ALIEN ISOLATION - Retro CRT, scanlines, blinking cursor
    case 'alien':
      return `
        ${root} { --fui: #33ff33; --fui-dim: #0a330a; --fui-bg: #010401; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px) !important; pointer-events: none !important; z-index: 100 !important; }
        ${h1} { font-size: 2.2rem !important; font-weight: 600 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; text-shadow: 0 0 15px var(--fui) !important; }
        ${h2} { font-size: 1.3rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; text-shadow: 0 0 10px var(--fui) !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 1.7 !important; font-weight: 400 !important; }
        ${card} { background: rgba(1,4,1,0.97) !important; border: 2px solid var(--fui) !important; padding: 28px !important; position: relative !important; z-index: 1 !important; }
        ${card}::before { content: '>' !important; position: absolute !important; top: 12px !important; left: 14px !important; font-size: 16px !important; animation: blink 1s step-end infinite !important; }
        ${card}::after { content: 'SEVASTOPOL' !important; position: absolute !important; bottom: 10px !important; right: 14px !important; font-size: 8px !important; letter-spacing: 0.18em !important; opacity: 0.4 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; padding: 13px 28px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 700 !important; color: #000 !important; }
        ${btn}:hover { background: #66ff66 !important; }
        ${section} { padding: 70px 0 !important; position: relative !important; z-index: 1 !important; }
        ${input} { background: transparent !important; border: 2px solid var(--fui) !important; padding: 12px 16px !important; font-size: 12px !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; padding: 6px 12px !important; font-size: 9px !important; font-weight: 700 !important; }
        ${nav}, ${footer} { padding: 20px 0 !important; position: relative !important; z-index: 1 !important; }
        @keyframes blink { 50% { opacity: 0; } }
      `;

    // DEAD SPACE - Health bar spine, blue glow
    case 'dead-space':
      return `
        ${root} { --fui: #00ccff; --fui-dim: #002833; --fui-bg: #020608; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${h1} { font-size: 2.4rem !important; font-weight: 400 !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.35rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.8 !important; font-weight: 400 !important; }
        ${card} { background: rgba(2,6,8,0.92) !important; border: 1px solid var(--fui-dim) !important; padding: 30px !important; padding-left: 45px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 12px !important; left: 12px !important; width: 8px !important; height: calc(100% - 24px) !important; background: linear-gradient(180deg, var(--fui) 0%, var(--fui) 75%, #ff3300 75%, #ff3300 100%) !important; }
        ${card}::after { content: 'RIG' !important; position: absolute !important; top: 10px !important; right: 14px !important; font-size: 11px !important; letter-spacing: 0.25em !important; opacity: 0.35 !important; }
        ${btn} { background: transparent !important; border: 2px solid var(--fui) !important; padding: 14px 30px !important; font-size: 11px !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; font-weight: 500 !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; box-shadow: 0 0 20px var(--fui) !important; }
        ${section} { padding: 85px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; right: 25px !important; top: 50% !important; transform: translateY(-50%) !important; width: 10px !important; height: 70px !important; background: linear-gradient(180deg, var(--fui) 0%, var(--fui) 85%, transparent 85%) !important; opacity: 0.25 !important; }
        ${input} { background: transparent !important; border: 2px solid var(--fui) !important; padding: 13px 18px !important; font-size: 12px !important; }
        ${badge} { background: var(--fui) !important; color: var(--fui-bg) !important; padding: 7px 14px !important; font-size: 9px !important; font-weight: 600 !important; }
        ${nav}, ${footer} { padding: 24px 0 !important; }
      `;

    // MASS EFFECT - Orange holographic, chamfered corners
    case 'mass-effect':
      return `
        ${root} { --fui: #ff6600; --fui-dim: #331400; --fui-bg: #050200; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, rgba(255,102,0,0.04) 0%, transparent 55%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.5rem !important; font-weight: 500 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 600 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.08em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.75 !important; font-weight: 400 !important; }
        ${card} { background: rgba(5,2,0,0.85) !important; border: 1px solid var(--fui) !important; padding: 32px !important; position: relative !important; clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px)) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; right: 0 !important; border: 18px solid transparent !important; border-top: 18px solid var(--fui) !important; border-right: 18px solid var(--fui) !important; }
        ${card}::after { content: 'N7' !important; position: absolute !important; bottom: 12px !important; right: 18px !important; font-size: 14px !important; font-weight: 800 !important; opacity: 0.25 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; padding: 14px 30px !important; font-size: 11px !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; font-weight: 700 !important; color: #000 !important; clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%) !important; }
        ${btn}:hover { background: #ff8833 !important; }
        ${section} { padding: 85px 0 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 13px 18px !important; font-size: 12px !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; padding: 7px 14px !important; font-size: 9px !important; font-weight: 700 !important; }
        ${nav}, ${footer} { padding: 24px 0 !important; }
      `;

    // DEUS EX - Gold augmented vision, scan lines
    case 'deus-ex':
      return `
        ${root} { --fui: #ffcc00; --fui-dim: #332800; --fui-bg: #080600; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(255,204,0,0.015) 4px, rgba(255,204,0,0.015) 5px) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.6rem !important; font-weight: 300 !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.4rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 1.85 !important; font-weight: 400 !important; letter-spacing: 0.03em !important; }
        ${card} { background: rgba(8,6,0,0.92) !important; border: 1px solid var(--fui-dim) !important; padding: 34px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 4px !important; background: linear-gradient(90deg, var(--fui), transparent) !important; }
        ${card}::after { content: 'AUGMENTED' !important; position: absolute !important; top: 12px !important; right: 14px !important; font-size: 7px !important; letter-spacing: 0.25em !important; opacity: 0.35 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 15px 34px !important; font-size: 10px !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; font-weight: 500 !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${section} { padding: 90px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; bottom: 0 !important; left: 30px !important; right: 30px !important; height: 1px !important; background: linear-gradient(90deg, transparent, var(--fui-dim), transparent) !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 14px 20px !important; font-size: 12px !important; letter-spacing: 0.08em !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; padding: 7px 15px !important; font-size: 9px !important; font-weight: 600 !important; letter-spacing: 0.12em !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; }
      `;

    // GHOST IN SHELL - Cyberbrain, pink/cyan
    case 'ghost-shell':
      return `
        ${root} { --fui: #ff0066; --fui-dim: #330014; --fui-bg: #080004; background: var(--fui-bg) !important; }
        ${root} * { border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(180deg, rgba(255,0,102,0.03) 0%, transparent 45%, rgba(0,255,255,0.03) 100%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.7rem !important; font-weight: 400 !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; color: var(--fui) !important; }
        ${h2} { font-size: 1.45rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; color: #00ffff !important; }
        ${h3} { font-size: 1rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; color: #fff !important; }
        ${p} { font-size: 13px !important; line-height: 1.8 !important; font-weight: 400 !important; color: var(--fui) !important; }
        ${card} { background: rgba(8,0,4,0.92) !important; border: 1px solid var(--fui-dim) !important; padding: 32px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 10px !important; left: 10px !important; width: 10px !important; height: 10px !important; border: 2px solid var(--fui) !important; border-radius: 50% !important; }
        ${card}::after { content: 'SECTION 9' !important; position: absolute !important; bottom: 10px !important; right: 14px !important; font-size: 8px !important; letter-spacing: 0.18em !important; opacity: 0.35 !important; color: var(--fui) !important; }
        ${btn} { background: var(--fui) !important; border: none !important; padding: 14px 30px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 600 !important; color: #fff !important; }
        ${btn}:hover { background: #ff3388 !important; box-shadow: 0 0 25px rgba(255,0,102,0.4) !important; }
        ${section} { padding: 85px 0 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 13px 18px !important; font-size: 12px !important; color: var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #fff !important; padding: 7px 14px !important; font-size: 9px !important; font-weight: 600 !important; }
        ${nav}, ${footer} { padding: 24px 0 !important; }
        ${li} { color: var(--fui) !important; }
      `;

    // TRON LEGACY - Glowing edges, neon
    case 'tron':
      return `
        ${root} { --fui: #00ffff; --fui-dim: #003333; --fui-bg: #000505; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${h1} { font-size: 3rem !important; font-weight: 300 !important; letter-spacing: 0.35em !important; text-transform: uppercase !important; text-shadow: 0 0 30px var(--fui) !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 400 !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; text-shadow: 0 0 15px var(--fui) !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 500 !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.85 !important; font-weight: 300 !important; letter-spacing: 0.04em !important; }
        ${card} { background: #000 !important; border: 1px solid var(--fui) !important; padding: 36px !important; position: relative !important; box-shadow: 0 0 15px rgba(0,255,255,0.2), inset 0 0 15px rgba(0,255,255,0.05) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: -2px !important; left: 20% !important; right: 20% !important; height: 2px !important; background: var(--fui) !important; box-shadow: 0 0 15px var(--fui), 0 0 30px var(--fui) !important; }
        ${card}::after { content: 'GRID' !important; position: absolute !important; bottom: 10px !important; right: 14px !important; font-size: 11px !important; letter-spacing: 0.35em !important; opacity: 0.25 !important; }
        ${btn} { background: transparent !important; border: 2px solid var(--fui) !important; padding: 15px 36px !important; font-size: 10px !important; letter-spacing: 0.25em !important; text-transform: uppercase !important; font-weight: 400 !important; box-shadow: 0 0 12px rgba(0,255,255,0.3) !important; }
        ${btn}:hover { background: var(--fui) !important; color: #000 !important; box-shadow: 0 0 30px var(--fui), 0 0 50px var(--fui) !important; }
        ${section} { padding: 95px 0 !important; border-bottom: 1px solid var(--fui-dim) !important; }
        ${input} { background: transparent !important; border: 2px solid var(--fui) !important; padding: 14px 20px !important; font-size: 12px !important; box-shadow: 0 0 8px rgba(0,255,255,0.2) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; padding: 8px 16px !important; font-size: 9px !important; font-weight: 600 !important; box-shadow: 0 0 12px var(--fui) !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; }
      `;

    // AVATAR - Military HUD, targeting
    case 'avatar':
      return `
        ${root} { --fui: #00ff00; --fui-dim: #003300; --fui-bg: #010400; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.5) 100%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.3rem !important; font-weight: 600 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.35rem !important; font-weight: 600 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1rem !important; font-weight: 600 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
        ${p} { font-size: 12px !important; line-height: 1.7 !important; font-weight: 500 !important; }
        ${card} { background: rgba(1,4,0,0.92) !important; border: 1px solid var(--fui-dim) !important; padding: 30px !important; position: relative !important; }
        ${card}::before { content: '+' !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; font-size: 40px !important; opacity: 0.08 !important; pointer-events: none !important; }
        ${card}::after { content: 'RDA' !important; position: absolute !important; top: 10px !important; right: 14px !important; font-size: 10px !important; letter-spacing: 0.18em !important; opacity: 0.35 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 13px 28px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 700 !important; }
        ${btn}:hover { background: var(--fui) !important; color: #000 !important; }
        ${section} { padding: 75px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 25px !important; left: 25px !important; width: 35px !important; height: 35px !important; border: 1px solid var(--fui) !important; border-radius: 50% !important; opacity: 0.2 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 12px 16px !important; font-size: 12px !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; padding: 6px 12px !important; font-size: 9px !important; font-weight: 700 !important; }
        ${nav}, ${footer} { padding: 20px 0 !important; }
      `;

    // BLADE RUNNER - Neon noir, pink/cyan/yellow
    case 'blade-runner':
      return `
        ${root} { --fui: #ff0055; --fui-dim: #330011; --fui-bg: #050002; background: var(--fui-bg) !important; }
        ${root} * { border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(180deg, rgba(255,0,85,0.03) 0%, transparent 25%, rgba(0,200,255,0.03) 100%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.8rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; color: var(--fui) !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 500 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; color: #00c8ff !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 500 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; color: #ffcc00 !important; }
        ${p} { font-size: 13px !important; line-height: 1.8 !important; font-weight: 400 !important; color: #888 !important; }
        ${card} { background: rgba(5,0,2,0.96) !important; border: 1px solid var(--fui-dim) !important; padding: 34px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 25px !important; width: 70px !important; height: 2px !important; background: var(--fui) !important; }
        ${card}::after { content: 'REPLICANT' !important; position: absolute !important; bottom: 12px !important; right: 18px !important; font-size: 8px !important; letter-spacing: 0.25em !important; opacity: 0.28 !important; color: var(--fui) !important; }
        ${btn} { background: var(--fui) !important; border: none !important; padding: 14px 32px !important; font-size: 11px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; font-weight: 600 !important; color: #fff !important; }
        ${btn}:hover { background: #ff3377 !important; box-shadow: 0 0 25px rgba(255,0,85,0.4) !important; }
        ${section} { padding: 90px 0 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 14px 20px !important; font-size: 12px !important; color: var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #fff !important; padding: 7px 14px !important; font-size: 9px !important; font-weight: 600 !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; }
        ${li} { color: #888 !important; }
      `;

    // INTERSTELLAR - NASA minimal, monochrome
    case 'interstellar':
      return `
        ${root} { --fui: #aaaaaa; --fui-dim: #222222; --fui-bg: #000000; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${h1} { font-size: 3.2rem !important; font-weight: 200 !important; letter-spacing: 0.35em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.6rem !important; font-weight: 300 !important; letter-spacing: 0.28em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1.1rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 2 !important; font-weight: 300 !important; letter-spacing: 0.05em !important; }
        ${card} { background: #050505 !important; border: 1px solid var(--fui-dim) !important; padding: 40px !important; position: relative !important; }
        ${card}::before { content: 'TARS' !important; position: absolute !important; top: 12px !important; right: 18px !important; font-size: 11px !important; letter-spacing: 0.35em !important; opacity: 0.25 !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: 14px !important; left: 18px !important; width: 50px !important; height: 1px !important; background: var(--fui) !important; opacity: 0.3 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 16px 40px !important; font-size: 10px !important; letter-spacing: 0.28em !important; text-transform: uppercase !important; font-weight: 300 !important; }
        ${btn}:hover { background: var(--fui) !important; color: #000 !important; }
        ${section} { padding: 100px 0 !important; border-top: 1px solid var(--fui-dim) !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui-dim) !important; padding: 15px 22px !important; font-size: 12px !important; letter-spacing: 0.1em !important; }
        ${badge} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 8px 18px !important; font-size: 9px !important; letter-spacing: 0.2em !important; }
        ${nav}, ${footer} { padding: 30px 0 !important; }
      `;

    // IRON MAN HUD - Detailed cyan, circular HUD elements
    case 'iron-man':
      return `
        ${root} { --fui: #00ddff; --fui-dim: #002d33; --fui-bg: #010608; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at 30% 30%, rgba(0,221,255,0.04) 0%, transparent 35%), radial-gradient(circle at 70% 70%, rgba(0,221,255,0.04) 0%, transparent 35%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.9rem !important; font-weight: 300 !important; letter-spacing: 0.22em !important; text-transform: uppercase !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 400 !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.85 !important; font-weight: 300 !important; letter-spacing: 0.03em !important; }
        ${card} { background: rgba(1,6,8,0.88) !important; border: 1px solid var(--fui-dim) !important; padding: 36px !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 12px !important; right: 12px !important; width: 55px !important; height: 55px !important; border: 1px solid var(--fui-dim) !important; border-radius: 50% !important; opacity: 0.25 !important; }
        ${card}::after { content: 'STARK INDUSTRIES' !important; position: absolute !important; bottom: 10px !important; left: 14px !important; font-size: 7px !important; letter-spacing: 0.18em !important; opacity: 0.28 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 15px 34px !important; font-size: 10px !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; font-weight: 400 !important; }
        ${btn}:hover { background: rgba(0,221,255,0.12) !important; box-shadow: 0 0 20px rgba(0,221,255,0.3) !important; }
        ${section} { padding: 90px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 50px !important; width: 90px !important; height: 90px !important; border: 1px dashed var(--fui-dim) !important; border-radius: 50% !important; transform: translateY(-50%) !important; opacity: 0.12 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 14px 20px !important; font-size: 12px !important; }
        ${badge} { background: rgba(0,221,255,0.15) !important; border: 1px solid var(--fui) !important; padding: 7px 15px !important; font-size: 9px !important; letter-spacing: 0.15em !important; }
        ${nav} { padding: 24px 0 !important; border-bottom: 1px solid var(--fui-dim) !important; }
        ${footer} { padding: 60px 0 !important; }
      `;

    // WAKANDA TECH - Purple holographic, vibranium
    case 'wakanda':
      return `
        ${root} { --fui: #aa55ff; --fui-dim: #2a1144; --fui-bg: #0a0510; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, rgba(170,85,255,0.06) 0%, transparent 55%) !important; pointer-events: none !important; }
        ${h1} { font-size: 2.8rem !important; font-weight: 400 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; text-shadow: 0 0 25px rgba(170,85,255,0.4) !important; }
        ${h2} { font-size: 1.5rem !important; font-weight: 500 !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; text-shadow: 0 0 12px rgba(170,85,255,0.3) !important; }
        ${h3} { font-size: 1.05rem !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; }
        ${p} { font-size: 13px !important; line-height: 1.85 !important; font-weight: 400 !important; }
        ${card} { background: rgba(10,5,16,0.88) !important; border: 1px solid var(--fui) !important; padding: 36px !important; position: relative !important; box-shadow: 0 0 35px rgba(170,85,255,0.15), inset 0 0 35px rgba(170,85,255,0.04) !important; }
        ${card}::before { content: 'VIBRANIUM' !important; position: absolute !important; top: 10px !important; left: 14px !important; font-size: 8px !important; letter-spacing: 0.22em !important; opacity: 0.35 !important; }
        ${card}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 18px !important; width: 45px !important; height: 45px !important; border: 1px solid var(--fui) !important; transform: translateY(-50%) rotate(45deg) !important; opacity: 0.2 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; padding: 15px 34px !important; font-size: 11px !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; font-weight: 600 !important; color: #fff !important; box-shadow: 0 0 25px rgba(170,85,255,0.35) !important; }
        ${btn}:hover { background: #bb77ff !important; box-shadow: 0 0 35px rgba(170,85,255,0.55) !important; }
        ${section} { padding: 90px 0 !important; position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 25px !important; right: 25px !important; width: 70px !important; height: 70px !important; background: conic-gradient(from 0deg, transparent, var(--fui-dim), transparent) !important; border-radius: 50% !important; opacity: 0.25 !important; }
        ${input} { background: transparent !important; border: 1px solid var(--fui) !important; padding: 14px 20px !important; font-size: 12px !important; box-shadow: 0 0 12px rgba(170,85,255,0.2) !important; }
        ${badge} { background: var(--fui) !important; color: #fff !important; padding: 7px 15px !important; font-size: 9px !important; font-weight: 600 !important; box-shadow: 0 0 12px rgba(170,85,255,0.4) !important; }
        ${nav}, ${footer} { padding: 26px 0 !important; }
      `;

    default:
      return `
        ${root} { --fui: #00ffff; --fui-dim: #003333; --fui-bg: #020808; background: var(--fui-bg) !important; }
        ${root}, ${root} * { color: var(--fui) !important; }
      `;
  }
};

export default function LandingV2Page() {
  const [activeStyle, setActiveStyle] = useState('oblivion');
  const [isOpen, setIsOpen] = useState(false);

  const currentStyle = FUI_STYLES.find(s => s.id === activeStyle);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: generateFuiCSS(activeStyle) }} />

      {/* Dropdown Selector */}
      <div className="fixed top-4 right-4 z-[200]">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fui-dropdown flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider border bg-black/90 backdrop-blur-sm"
            style={{ borderColor: currentStyle?.color || '#333', color: currentStyle?.color || '#00ffff' }}
          >
            <span className="opacity-50">FUI:</span>
            <span>{currentStyle?.name}</span>
            <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 mt-1 w-52 border bg-black/95 backdrop-blur-sm max-h-[70vh] overflow-y-auto" style={{ borderColor: '#333' }}>
              {FUI_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => { setActiveStyle(style.id); setIsOpen(false); }}
                  className={`fui-dropdown w-full text-left px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 ${
                    activeStyle === style.id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                  style={{ color: style.color }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: style.color }} />
                  {style.name}
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
