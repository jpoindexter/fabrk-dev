'use client';

/**
 * Landing V2 - FUI Design Exploration
 * 27 actual FUI styles based on sci-fi movie interfaces
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
  // SAVED (user approved)
  { id: 'bracket-corners', name: 'Bracket Corners', color: '#00ffff' },
  { id: 'corner-ticks', name: 'Corner Ticks', color: '#ff8800' },
  { id: 'wireframe', name: 'Wireframe', color: '#00ccff' },

  // FILM-INSPIRED
  { id: 'oblivion', name: 'Oblivion', color: '#00d4d4' },
  { id: 'remote-link', name: 'Remote Link', color: '#ff6600' },
  { id: 'milano', name: 'Milano', color: '#ff8c00' },
  { id: 'tread', name: 'Tread FX-D', color: '#ccff00' },

  // NEW - ACTUAL FUI STYLES
  { id: 'jarvis', name: 'JARVIS', color: '#00bfff' },
  { id: 'lcars', name: 'LCARS', color: '#ff9900' },
  { id: 'cortana', name: 'Cortana', color: '#00aaff' },
  { id: 'prometheus', name: 'Prometheus', color: '#00ffcc' },
  { id: 'pacific-rim', name: 'Pacific Rim', color: '#ffaa00' },
  { id: 'alien', name: 'Alien Isolation', color: '#33ff33' },
  { id: 'dead-space', name: 'Dead Space', color: '#00ccff' },
  { id: 'mass-effect', name: 'Mass Effect', color: '#ff6600' },
  { id: 'deus-ex', name: 'Deus Ex', color: '#ffcc00' },
  { id: 'ghost-shell', name: 'Ghost in Shell', color: '#ff0066' },
  { id: 'minority-report', name: 'Minority Report', color: '#aaccff' },
  { id: 'tron', name: 'Tron Legacy', color: '#00ffff' },
  { id: 'avatar', name: 'Avatar HUD', color: '#00ff00' },
  { id: 'edge-tomorrow', name: 'Edge of Tomorrow', color: '#ff4400' },
  { id: 'elysium', name: 'Elysium', color: '#ffffff' },
  { id: 'westworld', name: 'Westworld', color: '#cccccc' },
  { id: 'blade-runner', name: 'Blade Runner', color: '#ff0055' },
  { id: 'interstellar', name: 'Interstellar', color: '#aaaaaa' },
  { id: 'iron-man', name: 'Iron Man HUD', color: '#00ddff' },
  { id: 'wakanda', name: 'Wakanda Tech', color: '#aa55ff' },
];

const generateFuiCSS = (styleId: string): string => {
  const root = `[data-fui="${styleId}"]`;

  // Base styles for ALL themes - comprehensive element coverage
  const baseStyles = `
    ${root} { transition: all 0.3s ease; }
    ${root} * { transition: color 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s; }
    ${root} p { opacity: 0.85; line-height: 1.7; }
    ${root} a:not(.fui-dropdown) { text-decoration: none; }
    ${root} a:not(.fui-dropdown):hover { opacity: 0.8; }
    ${root} input, ${root} textarea, ${root} select {
      background: transparent;
      border-width: 1px;
      border-style: solid;
      padding: 8px 12px;
      font-family: inherit;
    }
    ${root} input:focus, ${root} textarea:focus, ${root} select:focus {
      outline: none;
      border-width: 2px;
    }
    ${root} [data-slot="badge"], ${root} span[class*="rounded"], ${root} span[class*="badge"] {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 4px 8px;
    }
    ${root} ul, ${root} ol { padding-left: 1.5em; }
    ${root} li { margin-bottom: 0.5em; }
    ${root} li::marker { color: inherit; }
    ${root} code { font-family: monospace; padding: 2px 6px; font-size: 0.9em; }
    ${root} hr { border-width: 1px; border-style: solid; opacity: 0.3; }
    ${root} blockquote { border-left-width: 3px; border-left-style: solid; padding-left: 1em; font-style: italic; }
    ${root} table { border-collapse: collapse; width: 100%; }
    ${root} th, ${root} td { padding: 8px 12px; border-width: 1px; border-style: solid; text-align: left; }
    ${root} nav { padding: 16px 0; }
    ${root} footer { padding: 40px 0; margin-top: 60px; }
    ${root} svg { fill: currentColor; }
    ${root} [class*="icon"] { opacity: 0.8; }
    ${root} label { text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em; }
  `;

  // Common selectors
  const card = `${root} [data-slot="card"]`;
  const btn = `${root} [data-slot="button"], ${root} button:not(.fui-dropdown)`;
  const section = `${root} section`;
  const h1 = `${root} h1`;
  const h2 = `${root} h2`;
  const h3 = `${root} h3`;
  const input = `${root} input, ${root} textarea, ${root} select`;
  const badge = `${root} [data-slot="badge"], ${root} span[class*="badge"]`;
  const nav = `${root} nav, ${root} header`;
  const footer = `${root} footer`;

  switch (styleId) {
    // === SAVED STYLES (USER APPROVED) ===
    case 'bracket-corners':
      return baseStyles + `
        ${root} { --fui: #00ffff; --fui-dim: #003333; --fui-bg: #020808; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: var(--fui-bg) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before, ${card}::after { content: '' !important; position: absolute !important; width: 24px !important; height: 24px !important; pointer-events: none !important; }
        ${card}::before { top: 0 !important; left: 0 !important; border-top: 2px solid var(--fui) !important; border-left: 2px solid var(--fui) !important; }
        ${card}::after { bottom: 0 !important; right: 0 !important; border-bottom: 2px solid var(--fui) !important; border-right: 2px solid var(--fui) !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; font-size: 11px !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${h1}, ${h2}, ${h3} { text-transform: uppercase !important; letter-spacing: 0.2em !important; font-weight: 300 !important; }
        ${input} { border-color: var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${section}::before { content: 'SYS.ACTIVE' !important; position: absolute !important; top: 10px !important; right: 15px !important; font-size: 8px !important; letter-spacing: 0.2em !important; opacity: 0.4 !important; }
      `;

    case 'corner-ticks':
      return baseStyles + `
        ${root} { --fui: #ff8800; --fui-dim: #331a00; --fui-bg: #080400; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: var(--fui-bg) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 6px !important; left: 6px !important; width: 10px !important; height: 10px !important; border-top: 1px solid var(--fui) !important; border-left: 1px solid var(--fui) !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: 6px !important; right: 6px !important; width: 10px !important; height: 10px !important; border-bottom: 1px solid var(--fui) !important; border-right: 1px solid var(--fui) !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.2em !important; font-size: 10px !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.15em !important; font-weight: 200 !important; }
        ${input} { border-color: var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: var(--fui-bg) !important; }
      `;

    case 'wireframe':
      return baseStyles + `
        ${root} { --fui: #00ccff; --fui-dim: #002233; --fui-bg: #010404; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: transparent !important; border: 1px solid var(--fui-dim) !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.25em !important; font-weight: 300 !important; font-size: 10px !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${h1}, ${h2}, ${h3} { text-transform: uppercase !important; letter-spacing: 0.3em !important; font-weight: 100 !important; }
        ${section} { border: 1px solid var(--fui-dim) !important; margin: 8px !important; }
        ${input} { border-color: var(--fui) !important; }
        ${badge} { background: transparent !important; border: 1px solid var(--fui) !important; }
      `;

    // === FILM-INSPIRED ===
    case 'oblivion':
      return baseStyles + `
        ${root} { --fui: #00d4d4; --fui-dim: #003333; --fui-bg: #020606; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(90deg, transparent 99%, var(--fui-dim) 99%) 0 0 / 60px 60px, linear-gradient(0deg, transparent 99%, var(--fui-dim) 99%) 0 0 / 60px 60px !important; pointer-events: none !important; z-index: 1 !important; opacity: 0.3 !important; }
        ${card} { background: rgba(2, 6, 6, 0.9) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; z-index: 2 !important; }
        ${card}::before, ${card}::after { content: '' !important; position: absolute !important; width: 20px !important; height: 20px !important; pointer-events: none !important; }
        ${card}::before { top: -1px !important; left: -1px !important; border-top: 2px solid var(--fui) !important; border-left: 2px solid var(--fui) !important; }
        ${card}::after { bottom: -1px !important; right: -1px !important; border-bottom: 2px solid var(--fui) !important; border-right: 2px solid var(--fui) !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.12em !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.2em !important; font-weight: 200 !important; }
        ${section} { position: relative !important; z-index: 2 !important; }
        ${section}::after { content: '172' !important; position: absolute !important; top: 20px !important; right: 30px !important; font-size: 32px !important; font-weight: 200 !important; opacity: 0.15 !important; letter-spacing: 0.1em !important; }
        ${input} { border-color: var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${nav}, ${footer} { position: relative !important; z-index: 2 !important; }
      `;

    case 'remote-link':
      return baseStyles + `
        ${root} { --fui: #ff6600; --fui-dim: #331400; --fui-bg: #0a0604; }
        ${root} { background: var(--fui-bg) !important; color: #ccc !important; }
        ${root} * { border-color: var(--fui-dim) !important; }
        ${root} p, ${root} span, ${root} li { color: #999 !important; }
        ${card} { background: #0f0a06 !important; border: 1px solid var(--fui-dim) !important; position: relative !important; padding-top: 32px !important; overflow: hidden !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 4px !important; background: var(--fui) !important; }
        ${card}::after { content: 'ENABLED' !important; position: absolute !important; top: 10px !important; right: 12px !important; font-size: 8px !important; color: var(--fui) !important; letter-spacing: 0.15em !important; opacity: 0.7 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #000 !important; text-transform: uppercase !important; font-weight: 600 !important; }
        ${btn}:hover { background: #ff8833 !important; }
        ${h1}, ${h2} { color: #fff !important; text-transform: uppercase !important; font-weight: 500 !important; }
        ${h3} { color: var(--fui) !important; font-weight: 600 !important; }
        ${section}::before { content: '| FEED STATUS' !important; position: absolute !important; top: 15px !important; left: 20px !important; font-size: 9px !important; color: var(--fui) !important; letter-spacing: 0.1em !important; opacity: 0.6 !important; }
        ${input} { border-color: var(--fui) !important; color: #fff !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; }
        ${nav}, ${footer} { border-color: var(--fui-dim) !important; }
      `;

    case 'milano':
      return baseStyles + `
        ${root} { --fui: #ff8c00; --fui-dim: #331c00; --fui-bg: #050302; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: var(--fui-bg) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '721' !important; position: absolute !important; top: 8px !important; right: 12px !important; font-size: 10px !important; opacity: 0.4 !important; letter-spacing: 0.1em !important; }
        ${card}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 0 !important; transform: translateY(-50%) !important; width: 3px !important; height: 30px !important; background: var(--fui) !important; opacity: 0.4 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.1em !important; font-weight: 300 !important; }
        ${input} { border-color: var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; }
      `;

    case 'tread':
      return baseStyles + `
        ${root} { --fui: #ccff00; --fui-dim: #2a3300; --fui-bg: #050600; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: var(--fui-bg) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; padding-left: 20px !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 4px !important; height: 100% !important; background: linear-gradient(180deg, var(--fui) 0%, var(--fui) 60%, transparent 60%) !important; }
        ${card}::after { content: 'AMP' !important; position: absolute !important; top: 8px !important; right: 10px !important; font-size: 9px !important; letter-spacing: 0.15em !important; opacity: 0.5 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #000 !important; text-transform: uppercase !important; font-weight: 700 !important; }
        ${btn}:hover { background: #e6ff33 !important; }
        ${h1} { text-transform: uppercase !important; letter-spacing: 0.15em !important; font-weight: 200 !important; }
        ${h2} { color: #fff !important; text-transform: uppercase !important; font-weight: 500 !important; }
        ${section}::before { content: 'SECTOR' !important; position: absolute !important; bottom: 15px !important; right: 20px !important; font-size: 10px !important; letter-spacing: 0.2em !important; opacity: 0.3 !important; }
        ${input} { border-color: var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; font-weight: 700 !important; }
      `;

    // === NEW FUI STYLES ===

    // JARVIS - Iron Man AI interface
    case 'jarvis':
      return baseStyles + `
        ${root} { --fui: #00bfff; --fui-dim: #002940; --fui-bg: #020a10; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at 50% 50%, rgba(0,191,255,0.03) 0%, transparent 50%) !important; pointer-events: none !important; }
        ${card} { background: rgba(2, 10, 16, 0.8) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: -1px !important; left: 20px !important; right: 20px !important; height: 1px !important; background: linear-gradient(90deg, transparent, var(--fui), transparent) !important; }
        ${card}::after { content: 'J.A.R.V.I.S.' !important; position: absolute !important; top: 8px !important; right: 12px !important; font-size: 7px !important; letter-spacing: 0.3em !important; opacity: 0.4 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; position: relative !important; overflow: hidden !important; }
        ${btn}::before { content: '' !important; position: absolute !important; top: 0 !important; left: -100% !important; width: 100% !important; height: 100% !important; background: linear-gradient(90deg, transparent, rgba(0,191,255,0.2), transparent) !important; transition: left 0.5s !important; }
        ${btn}:hover::before { left: 100% !important; }
        ${btn}:hover { background: rgba(0,191,255,0.1) !important; box-shadow: 0 0 20px rgba(0,191,255,0.3) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.2em !important; font-weight: 200 !important; text-shadow: 0 0 30px rgba(0,191,255,0.3) !important; }
        ${section} { position: relative !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 30px !important; width: 60px !important; height: 60px !important; border: 1px solid var(--fui-dim) !important; border-radius: 50% !important; opacity: 0.2 !important; transform: translateY(-50%) !important; }
        ${input} { border-color: var(--fui) !important; }
        ${badge} { background: rgba(0,191,255,0.2) !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; }
        ${nav}, ${footer} { border-bottom: 1px solid var(--fui-dim) !important; }
      `;

    // LCARS - Star Trek panel interface
    case 'lcars':
      return baseStyles + `
        ${root} { --fui: #ff9900; --fui-dim: #332000; --fui-bg: #000000; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { border-color: var(--fui-dim) !important; }
        ${card} { background: #000 !important; border: none !important; position: relative !important; padding-left: 60px !important; margin-left: 20px !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 50px !important; height: 100% !important; background: var(--fui) !important; border-radius: 25px 0 0 25px !important; }
        ${card}::after { content: '47' !important; position: absolute !important; top: 50% !important; left: 12px !important; transform: translateY(-50%) !important; font-size: 14px !important; font-weight: 700 !important; color: #000 !important; }
        ${btn} { background: #cc99ff !important; border: none !important; color: #000 !important; text-transform: uppercase !important; font-weight: 700 !important; border-radius: 20px !important; }
        ${btn}:hover { background: #ddaaff !important; }
        ${h1} { color: #ff9900 !important; text-transform: uppercase !important; font-weight: 700 !important; }
        ${h2} { color: #cc99ff !important; text-transform: uppercase !important; }
        ${h3} { color: #99ccff !important; }
        ${root} p { color: #ff9900 !important; }
        ${section} { border-left: 8px solid #9999ff !important; margin: 20px 0 !important; padding-left: 20px !important; }
        ${input} { border: 2px solid var(--fui) !important; border-radius: 10px !important; color: var(--fui) !important; }
        ${badge} { background: #99ccff !important; color: #000 !important; border-radius: 10px !important; }
        ${nav} { border-bottom: 4px solid #cc99ff !important; }
        ${footer} { border-top: 4px solid #9999ff !important; }
      `;

    // Cortana - Halo hologram
    case 'cortana':
      return baseStyles + `
        ${root} { --fui: #00aaff; --fui-dim: #002244; --fui-bg: #000510; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, rgba(0,170,255,0.05) 0%, transparent 70%) !important; pointer-events: none !important; }
        ${card} { background: rgba(0, 5, 16, 0.7) !important; border: 1px solid var(--fui) !important; position: relative !important; box-shadow: 0 0 30px rgba(0,170,255,0.1), inset 0 0 30px rgba(0,170,255,0.02) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 2px !important; background: linear-gradient(90deg, transparent, var(--fui), transparent) !important; }
        ${card}::after { content: 'UNSC' !important; position: absolute !important; bottom: 8px !important; right: 12px !important; font-size: 8px !important; letter-spacing: 0.2em !important; opacity: 0.3 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #000 !important; text-transform: uppercase !important; font-weight: 600 !important; box-shadow: 0 0 15px rgba(0,170,255,0.4) !important; }
        ${btn}:hover { background: #33bbff !important; box-shadow: 0 0 25px rgba(0,170,255,0.6) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.15em !important; text-shadow: 0 0 20px rgba(0,170,255,0.5) !important; }
        ${input} { border-color: var(--fui) !important; box-shadow: 0 0 10px rgba(0,170,255,0.2) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; box-shadow: 0 0 10px rgba(0,170,255,0.4) !important; }
      `;

    // Prometheus - Medical/scientific
    case 'prometheus':
      return baseStyles + `
        ${root} { --fui: #00ffcc; --fui-dim: #003328; --fui-bg: #020a08; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: rgba(2, 10, 8, 0.9) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: 'DAVID' !important; position: absolute !important; top: 8px !important; left: 12px !important; font-size: 8px !important; letter-spacing: 0.2em !important; opacity: 0.4 !important; }
        ${card}::after { content: '// ANALYSIS COMPLETE' !important; position: absolute !important; bottom: 8px !important; right: 12px !important; font-size: 7px !important; letter-spacing: 0.1em !important; opacity: 0.3 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.15em !important; font-weight: 300 !important; }
        ${section}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 50% !important; width: 1px !important; height: 30px !important; background: var(--fui) !important; opacity: 0.3 !important; }
        ${input} { border-color: var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: var(--fui-bg) !important; }
      `;

    // Pacific Rim - Jaeger cockpit
    case 'pacific-rim':
      return baseStyles + `
        ${root} { --fui: #ffaa00; --fui-dim: #332200; --fui-bg: #080400; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: #0a0600 !important; border: 3px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: 'JAEGER' !important; position: absolute !important; top: -12px !important; left: 15px !important; background: var(--fui-bg) !important; padding: 0 10px !important; font-size: 10px !important; font-weight: 700 !important; letter-spacing: 0.2em !important; }
        ${card}::after { content: '' !important; position: absolute !important; top: 10px !important; right: 10px !important; width: 40px !important; height: 40px !important; border: 2px solid var(--fui) !important; border-radius: 50% !important; opacity: 0.3 !important; }
        ${btn} { background: var(--fui) !important; border: 3px solid #996600 !important; color: #000 !important; text-transform: uppercase !important; font-weight: 900 !important; }
        ${btn}:hover { background: #ffcc33 !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; font-weight: 900 !important; letter-spacing: 0.1em !important; }
        ${section} { border: 2px solid var(--fui-dim) !important; margin: 15px !important; }
        ${input} { border: 2px solid var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; font-weight: 900 !important; border: 2px solid #996600 !important; }
      `;

    // Alien Isolation - Retro CRT
    case 'alien':
      return baseStyles + `
        ${root} { --fui: #33ff33; --fui-dim: #0a330a; --fui-bg: #010401; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px) !important; pointer-events: none !important; z-index: 100 !important; }
        ${card} { background: rgba(1, 4, 1, 0.95) !important; border: 2px solid var(--fui) !important; position: relative !important; z-index: 2 !important; }
        ${card}::before { content: '>' !important; position: absolute !important; top: 10px !important; left: 12px !important; font-size: 14px !important; animation: blink 1s step-end infinite !important; }
        ${card}::after { content: 'SEVASTOPOL' !important; position: absolute !important; bottom: 8px !important; right: 12px !important; font-size: 8px !important; letter-spacing: 0.15em !important; opacity: 0.4 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #000 !important; text-transform: uppercase !important; font-weight: 700 !important; }
        ${btn}:hover { background: #66ff66 !important; }
        ${h1}, ${h2}, ${h3} { text-transform: uppercase !important; text-shadow: 0 0 10px var(--fui) !important; }
        ${section} { position: relative !important; z-index: 2 !important; }
        ${input} { border: 2px solid var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; }
        @keyframes blink { 50% { opacity: 0; } }
      `;

    // Dead Space - Spine HUD
    case 'dead-space':
      return baseStyles + `
        ${root} { --fui: #00ccff; --fui-dim: #002833; --fui-bg: #020608; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: rgba(2, 6, 8, 0.9) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 10px !important; left: 10px !important; width: 6px !important; height: calc(100% - 20px) !important; background: linear-gradient(180deg, var(--fui) 0%, var(--fui) 70%, #ff3300 70%, #ff3300 100%) !important; }
        ${card}::after { content: 'RIG' !important; position: absolute !important; top: 8px !important; right: 12px !important; font-size: 10px !important; letter-spacing: 0.2em !important; opacity: 0.4 !important; }
        ${btn} { background: transparent !important; border: 2px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; box-shadow: 0 0 15px var(--fui) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.15em !important; }
        ${section}::after { content: '' !important; position: absolute !important; right: 20px !important; top: 50% !important; transform: translateY(-50%) !important; width: 8px !important; height: 60px !important; background: linear-gradient(180deg, var(--fui) 0%, var(--fui) 80%, transparent 80%) !important; opacity: 0.3 !important; }
        ${input} { border: 2px solid var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: var(--fui-bg) !important; }
      `;

    // Mass Effect - Orange holographic
    case 'mass-effect':
      return baseStyles + `
        ${root} { --fui: #ff6600; --fui-dim: #331400; --fui-bg: #050200; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, rgba(255,102,0,0.03) 0%, transparent 60%) !important; pointer-events: none !important; }
        ${card} { background: rgba(5, 2, 0, 0.8) !important; border: 1px solid var(--fui) !important; position: relative !important; clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px)) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; right: 0 !important; border: 15px solid transparent !important; border-top: 15px solid var(--fui) !important; border-right: 15px solid var(--fui) !important; }
        ${card}::after { content: 'N7' !important; position: absolute !important; bottom: 10px !important; right: 15px !important; font-size: 12px !important; font-weight: 700 !important; opacity: 0.3 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #000 !important; text-transform: uppercase !important; font-weight: 600 !important; clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%) !important; }
        ${btn}:hover { background: #ff8833 !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.1em !important; }
        ${input} { border: 1px solid var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; }
      `;

    // Deus Ex - Gold augmented
    case 'deus-ex':
      return baseStyles + `
        ${root} { --fui: #ffcc00; --fui-dim: #332800; --fui-bg: #080600; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,204,0,0.02) 3px, rgba(255,204,0,0.02) 4px) !important; pointer-events: none !important; }
        ${card} { background: rgba(8, 6, 0, 0.9) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 3px !important; background: linear-gradient(90deg, var(--fui), transparent) !important; }
        ${card}::after { content: 'AUGMENTED' !important; position: absolute !important; top: 10px !important; right: 12px !important; font-size: 7px !important; letter-spacing: 0.2em !important; opacity: 0.4 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; }
        ${btn}:hover { background: var(--fui) !important; color: var(--fui-bg) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.2em !important; font-weight: 300 !important; }
        ${h3} { font-weight: 600 !important; }
        ${section}::after { content: '' !important; position: absolute !important; bottom: 0 !important; left: 20px !important; right: 20px !important; height: 1px !important; background: linear-gradient(90deg, transparent, var(--fui-dim), transparent) !important; }
        ${input} { border: 1px solid var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; }
      `;

    // Ghost in the Shell - Cyberbrain
    case 'ghost-shell':
      return baseStyles + `
        ${root} { --fui: #ff0066; --fui-dim: #330014; --fui-bg: #080004; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(180deg, rgba(255,0,102,0.02) 0%, transparent 50%, rgba(0,255,255,0.02) 100%) !important; pointer-events: none !important; }
        ${card} { background: rgba(8, 0, 4, 0.9) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 8px !important; left: 8px !important; width: 8px !important; height: 8px !important; border: 2px solid var(--fui) !important; border-radius: 50% !important; }
        ${card}::after { content: 'SECTION 9' !important; position: absolute !important; bottom: 8px !important; right: 12px !important; font-size: 8px !important; letter-spacing: 0.15em !important; opacity: 0.4 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #fff !important; text-transform: uppercase !important; font-weight: 500 !important; }
        ${btn}:hover { background: #ff3388 !important; box-shadow: 0 0 20px rgba(255,0,102,0.4) !important; }
        ${h1} { color: var(--fui) !important; text-transform: uppercase !important; }
        ${h2} { color: #00ffff !important; text-transform: uppercase !important; }
        ${h3} { color: #fff !important; }
        ${input} { border: 1px solid var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #fff !important; }
      `;

    // Minority Report - Glass panels
    case 'minority-report':
      return baseStyles + `
        ${root} { --fui: #aaccff; --fui-dim: #223344; --fui-bg: #080a10; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: rgba(170, 204, 255, 0.05) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; backdrop-filter: blur(10px) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 40px !important; background: linear-gradient(180deg, rgba(170,204,255,0.1), transparent) !important; pointer-events: none !important; }
        ${card}::after { content: 'PRE-CRIME' !important; position: absolute !important; top: 10px !important; left: 15px !important; font-size: 8px !important; letter-spacing: 0.2em !important; opacity: 0.5 !important; }
        ${btn} { background: rgba(170, 204, 255, 0.2) !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; backdrop-filter: blur(5px) !important; }
        ${btn}:hover { background: rgba(170, 204, 255, 0.3) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.2em !important; font-weight: 200 !important; }
        ${section} { background: rgba(170, 204, 255, 0.02) !important; }
        ${input} { border: 1px solid var(--fui) !important; background: rgba(170, 204, 255, 0.05) !important; }
        ${badge} { background: rgba(170, 204, 255, 0.2) !important; border: 1px solid var(--fui) !important; }
      `;

    // Tron Legacy - Glowing edges
    case 'tron':
      return baseStyles + `
        ${root} { --fui: #00ffff; --fui-dim: #003333; --fui-bg: #000505; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: #000 !important; border: 1px solid var(--fui) !important; position: relative !important; box-shadow: 0 0 10px rgba(0,255,255,0.2), inset 0 0 10px rgba(0,255,255,0.05) !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: -2px !important; left: 20% !important; right: 20% !important; height: 2px !important; background: var(--fui) !important; box-shadow: 0 0 10px var(--fui), 0 0 20px var(--fui) !important; }
        ${card}::after { content: 'GRID' !important; position: absolute !important; bottom: 8px !important; right: 12px !important; font-size: 10px !important; letter-spacing: 0.3em !important; opacity: 0.3 !important; }
        ${btn} { background: transparent !important; border: 2px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.2em !important; box-shadow: 0 0 10px rgba(0,255,255,0.3) !important; }
        ${btn}:hover { background: var(--fui) !important; color: #000 !important; box-shadow: 0 0 20px var(--fui), 0 0 40px var(--fui) !important; }
        ${h1}, ${h2}, ${h3} { text-transform: uppercase !important; letter-spacing: 0.25em !important; text-shadow: 0 0 20px var(--fui) !important; }
        ${section} { border-bottom: 1px solid var(--fui-dim) !important; }
        ${input} { border: 2px solid var(--fui) !important; box-shadow: 0 0 5px rgba(0,255,255,0.2) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; box-shadow: 0 0 10px var(--fui) !important; }
      `;

    // Avatar - Military HUD
    case 'avatar':
      return baseStyles + `
        ${root} { --fui: #00ff00; --fui-dim: #003300; --fui-bg: #010400; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%) !important; pointer-events: none !important; }
        ${card} { background: rgba(1, 4, 0, 0.9) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '+' !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; font-size: 30px !important; opacity: 0.1 !important; pointer-events: none !important; }
        ${card}::after { content: 'RDA' !important; position: absolute !important; top: 8px !important; right: 12px !important; font-size: 9px !important; letter-spacing: 0.15em !important; opacity: 0.4 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; font-weight: 600 !important; }
        ${btn}:hover { background: var(--fui) !important; color: #000 !important; }
        ${h1}, ${h2}, ${h3} { text-transform: uppercase !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 20px !important; left: 20px !important; width: 30px !important; height: 30px !important; border: 1px solid var(--fui) !important; border-radius: 50% !important; opacity: 0.2 !important; }
        ${input} { border: 1px solid var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; }
      `;

    // Edge of Tomorrow - Exosuit
    case 'edge-tomorrow':
      return baseStyles + `
        ${root} { --fui: #ff4400; --fui-dim: #331100; --fui-bg: #080200; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: #0a0200 !important; border: 2px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: 'ARMED' !important; position: absolute !important; top: 8px !important; left: 12px !important; font-size: 9px !important; font-weight: 700 !important; letter-spacing: 0.15em !important; color: #ff0000 !important; animation: pulse 2s infinite !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: 0 !important; left: 0 !important; right: 0 !important; height: 4px !important; background: linear-gradient(90deg, var(--fui) 0%, var(--fui) 75%, transparent 75%) !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #fff !important; text-transform: uppercase !important; font-weight: 700 !important; }
        ${btn}:hover { background: #ff6622 !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; font-weight: 700 !important; }
        ${section} { border-left: 4px solid var(--fui) !important; padding-left: 20px !important; }
        ${input} { border: 2px solid var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #fff !important; font-weight: 700 !important; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `;

    // Elysium - Corporate medical
    case 'elysium':
      return baseStyles + `
        ${root} { --fui: #ffffff; --fui-dim: #333333; --fui-bg: #0a0a0a; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: #0f0f0f !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 3px !important; height: 100% !important; background: var(--fui) !important; }
        ${card}::after { content: 'ARMADYNE' !important; position: absolute !important; top: 10px !important; right: 15px !important; font-size: 8px !important; letter-spacing: 0.2em !important; opacity: 0.3 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #000 !important; text-transform: uppercase !important; font-weight: 500 !important; }
        ${btn}:hover { background: #ccc !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.15em !important; font-weight: 300 !important; }
        ${section} { border-bottom: 1px solid var(--fui-dim) !important; }
        ${input} { border: 1px solid var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #000 !important; }
      `;

    // Westworld - Tablet diagnostic
    case 'westworld':
      return baseStyles + `
        ${root} { --fui: #cccccc; --fui-dim: #2a2a2a; --fui-bg: #0a0a0a; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: #111 !important; border: 1px solid var(--fui-dim) !important; position: relative !important; border-radius: 4px !important; }
        ${card}::before { content: 'HOST' !important; position: absolute !important; top: 10px !important; left: 15px !important; font-size: 9px !important; letter-spacing: 0.15em !important; opacity: 0.4 !important; padding: 2px 8px !important; border: 1px solid var(--fui-dim) !important; border-radius: 2px !important; }
        ${card}::after { content: '// ANALYSIS MODE' !important; position: absolute !important; bottom: 10px !important; right: 15px !important; font-size: 8px !important; letter-spacing: 0.1em !important; opacity: 0.3 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; border-radius: 2px !important; }
        ${btn}:hover { background: var(--fui) !important; color: #000 !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.1em !important; font-weight: 400 !important; }
        ${input} { border: 1px solid var(--fui-dim) !important; border-radius: 2px !important; }
        ${badge} { background: var(--fui-dim) !important; border-radius: 2px !important; }
      `;

    // Blade Runner - Neon noir
    case 'blade-runner':
      return baseStyles + `
        ${root} { --fui: #ff0055; --fui-dim: #330011; --fui-bg: #050002; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: linear-gradient(180deg, rgba(255,0,85,0.02) 0%, transparent 30%, rgba(0,200,255,0.02) 100%) !important; pointer-events: none !important; }
        ${card} { background: rgba(5, 0, 2, 0.95) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 0 !important; left: 20px !important; width: 60px !important; height: 2px !important; background: var(--fui) !important; }
        ${card}::after { content: 'REPLICANT' !important; position: absolute !important; bottom: 10px !important; right: 15px !important; font-size: 8px !important; letter-spacing: 0.2em !important; opacity: 0.3 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #fff !important; text-transform: uppercase !important; }
        ${btn}:hover { background: #ff3377 !important; box-shadow: 0 0 20px rgba(255,0,85,0.4) !important; }
        ${h1} { color: var(--fui) !important; text-transform: uppercase !important; }
        ${h2} { color: #00c8ff !important; text-transform: uppercase !important; }
        ${h3} { color: #ffcc00 !important; }
        ${root} p { color: #888 !important; }
        ${input} { border: 1px solid var(--fui) !important; color: var(--fui) !important; }
        ${badge} { background: var(--fui) !important; color: #fff !important; }
      `;

    // Interstellar - NASA minimal
    case 'interstellar':
      return baseStyles + `
        ${root} { --fui: #aaaaaa; --fui-dim: #222222; --fui-bg: #000000; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${card} { background: #050505 !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: 'TARS' !important; position: absolute !important; top: 10px !important; right: 15px !important; font-size: 10px !important; letter-spacing: 0.3em !important; opacity: 0.3 !important; }
        ${card}::after { content: '' !important; position: absolute !important; bottom: 10px !important; left: 15px !important; width: 40px !important; height: 1px !important; background: var(--fui) !important; opacity: 0.3 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.2em !important; font-weight: 300 !important; }
        ${btn}:hover { background: var(--fui) !important; color: #000 !important; }
        ${h1}, ${h2}, ${h3} { text-transform: uppercase !important; letter-spacing: 0.25em !important; font-weight: 200 !important; }
        ${section} { border-top: 1px solid var(--fui-dim) !important; }
        ${input} { border: 1px solid var(--fui-dim) !important; }
        ${badge} { background: transparent !important; border: 1px solid var(--fui) !important; }
      `;

    // Iron Man HUD - Detailed
    case 'iron-man':
      return baseStyles + `
        ${root} { --fui: #00ddff; --fui-dim: #002d33; --fui-bg: #010608; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(circle at 30% 30%, rgba(0,221,255,0.03) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(0,221,255,0.03) 0%, transparent 40%) !important; pointer-events: none !important; }
        ${card} { background: rgba(1, 6, 8, 0.85) !important; border: 1px solid var(--fui-dim) !important; position: relative !important; }
        ${card}::before { content: '' !important; position: absolute !important; top: 10px !important; right: 10px !important; width: 50px !important; height: 50px !important; border: 1px solid var(--fui-dim) !important; border-radius: 50% !important; opacity: 0.3 !important; }
        ${card}::after { content: 'STARK INDUSTRIES' !important; position: absolute !important; bottom: 8px !important; left: 12px !important; font-size: 7px !important; letter-spacing: 0.15em !important; opacity: 0.3 !important; }
        ${btn} { background: transparent !important; border: 1px solid var(--fui) !important; color: var(--fui) !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; }
        ${btn}:hover { background: rgba(0,221,255,0.1) !important; box-shadow: 0 0 15px rgba(0,221,255,0.3) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.15em !important; font-weight: 300 !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 40px !important; width: 80px !important; height: 80px !important; border: 1px dashed var(--fui-dim) !important; border-radius: 50% !important; transform: translateY(-50%) !important; opacity: 0.15 !important; }
        ${input} { border: 1px solid var(--fui) !important; }
        ${badge} { background: rgba(0,221,255,0.2) !important; border: 1px solid var(--fui) !important; }
        ${nav} { border-bottom: 1px solid var(--fui-dim) !important; }
      `;

    // Wakanda Tech - Purple hologram
    case 'wakanda':
      return baseStyles + `
        ${root} { --fui: #aa55ff; --fui-dim: #2a1144; --fui-bg: #0a0510; }
        ${root} { background: var(--fui-bg) !important; color: var(--fui) !important; }
        ${root} * { color: var(--fui) !important; border-color: var(--fui-dim) !important; }
        ${root}::before { content: '' !important; position: fixed !important; inset: 0 !important; background: radial-gradient(ellipse at center, rgba(170,85,255,0.05) 0%, transparent 60%) !important; pointer-events: none !important; }
        ${card} { background: rgba(10, 5, 16, 0.85) !important; border: 1px solid var(--fui) !important; position: relative !important; box-shadow: 0 0 30px rgba(170,85,255,0.15), inset 0 0 30px rgba(170,85,255,0.03) !important; }
        ${card}::before { content: 'VIBRANIUM' !important; position: absolute !important; top: 8px !important; left: 12px !important; font-size: 8px !important; letter-spacing: 0.2em !important; opacity: 0.4 !important; }
        ${card}::after { content: '' !important; position: absolute !important; top: 50% !important; right: 15px !important; width: 40px !important; height: 40px !important; border: 1px solid var(--fui) !important; transform: translateY(-50%) rotate(45deg) !important; opacity: 0.2 !important; }
        ${btn} { background: var(--fui) !important; border: none !important; color: #fff !important; text-transform: uppercase !important; font-weight: 500 !important; box-shadow: 0 0 20px rgba(170,85,255,0.3) !important; }
        ${btn}:hover { background: #bb77ff !important; box-shadow: 0 0 30px rgba(170,85,255,0.5) !important; }
        ${h1}, ${h2} { text-transform: uppercase !important; letter-spacing: 0.15em !important; text-shadow: 0 0 20px rgba(170,85,255,0.4) !important; }
        ${section}::after { content: '' !important; position: absolute !important; top: 20px !important; right: 20px !important; width: 60px !important; height: 60px !important; background: conic-gradient(from 0deg, transparent, var(--fui-dim), transparent) !important; border-radius: 50% !important; opacity: 0.3 !important; }
        ${input} { border: 1px solid var(--fui) !important; box-shadow: 0 0 10px rgba(170,85,255,0.2) !important; }
        ${badge} { background: var(--fui) !important; color: #fff !important; box-shadow: 0 0 10px rgba(170,85,255,0.4) !important; }
      `;

    default:
      return baseStyles;
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
